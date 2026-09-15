#!/usr/bin/env node
/**
 * Build-time chapter-state manifest generator.
 *
 * Walks the docs directory and emits a typed TypeScript module mapping every
 * doc's Docusaurus id to its `chapter_state` frontmatter value. The doc
 * sidebar consumes it to render a per-chapter readiness dot, so a reader can
 * see which chapters are real before clicking (Constitution Principle III:
 * placeholder -> text-ready -> video-published).
 *
 * Emits TypeScript rather than JSON: `tsconfig.json` only extends
 * `@docusaurus/tsconfig` with a `baseUrl`, so `resolveJsonModule` is not
 * guaranteed, and a `.ts` file gets Biome formatting and type-checking free.
 *
 * The generated file is committed so `docusaurus start` works without a
 * pre-step; `npm run build` regenerates it.
 *
 * Usage: node scripts/generate-chapter-manifest.mjs
 */

import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, extname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..");
const DOCS_DIR = join(ROOT, "docs");
const OUT_DIR = join(ROOT, "src", "data");
const OUT_FILE = join(OUT_DIR, "chapterManifest.ts");

const VALID_STATES = new Set(["placeholder", "text-ready", "video-published"]);

/** Recursively collect every Markdown file under `dir`. */
function walk(dir, files = []) {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!entry.name.startsWith(".") && !entry.name.startsWith("_")) {
        walk(full, files);
      }
    } else if (entry.isFile()) {
      const ext = extname(entry.name).toLowerCase();
      if ([".md", ".mdx"].includes(ext)) {
        files.push(full);
      }
    }
  }
  return files;
}

/** Minimal frontmatter reader — same shape as generate-search-index.mjs. */
function extractFrontmatter(content) {
  const match = content.match(/^---([\s\S]*?)---/);
  if (!match) return {};
  const data = {};
  for (const line of match[1].split("\n")) {
    const [key, ...rest] = line.split(":");
    if (key && rest.length) {
      data[key.trim()] = rest
        .join(":")
        .trim()
        .replace(/^["']|["']$/g, "");
    }
  }
  return data;
}

/**
 * Reproduce Docusaurus's doc-id derivation. Both rules are confirmed against
 * the live sidebars.ts:
 *   - `01-foundations.md` -> `.../foundations`   (numeric prefix stripped from
 *     the basename only)
 *   - `index.md`          -> `.../index`         (kept, not collapsed)
 *
 * `relative()` returns platform-native separators, so splitting on `sep` is
 * both correct on Windows and portable to CI.
 */
function toDocId(absPath) {
  const segments = relative(DOCS_DIR, absPath).split(sep);
  const file = segments.pop().replace(/\.mdx?$/i, "");
  return [...segments, file.replace(/^\d+-/, "")].join("/");
}

/**
 * Biome's default `quoteProperties: "asNeeded"` strips quotes from keys that
 * are valid identifiers, so emit them that way or `npm run lint` fails on the
 * generated file.
 */
function formatKey(key) {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key) ? key : `"${key}"`;
}

function main() {
  const entries = [];
  const warnings = [];
  const allIds = [];

  for (const file of walk(DOCS_DIR).sort()) {
    const docId = toDocId(file);
    allIds.push(docId);
    const state = extractFrontmatter(readFileSync(file, "utf8")).chapter_state;
    if (!state) continue;
    if (!VALID_STATES.has(state)) {
      warnings.push(
        `${relative(ROOT, file)}: unknown chapter_state "${state}"`,
      );
      continue;
    }
    entries.push([docId, state]);
  }

  entries.sort((a, b) => a[0].localeCompare(b[0]));

  // A doc is a subchapter when another doc is its parent folder, e.g.
  //   intro-1-binary-to-programming/binary  -> parent `intro-1-...` is a doc
  // Stage leaves stay main: `stage-01-.../foundations`'s parent is not a doc
  // id (only `stage-01-.../index` exists), so it does not match.
  const idSet = new Set(allIds);
  const subIds = allIds
    .filter((id) => {
      const cut = id.lastIndexOf("/");
      return cut !== -1 && idSet.has(id.slice(0, cut));
    })
    .sort();

  // Match Biome's 80-column wrap, so the generated file passes `npm run lint`
  // without a second formatting pass.
  const body = entries
    .map(([id, state]) => {
      const line = `  ${formatKey(id)}: "${state}",`;
      return line.length <= 80 ? line : `  ${formatKey(id)}:\n    "${state}",`;
    })
    .join("\n");

  const kindBody = subIds.map((id) => `  ${formatKey(id)}: "sub",`).join("\n");

  const out = `// GENERATED FILE — do not edit by hand.
// Source: docs/**/*.{md,mdx} frontmatter \`chapter_state\` + folder nesting.
// Regenerate with: npm run gen:manifest

import type { ChapterStateValue } from "@site/src/components/ChapterState";

/** Docusaurus doc id -> authoring state. Docs without the key are omitted. */
export const CHAPTER_STATES: Record<string, ChapterStateValue> = {
${body}
};

/** Look up a doc's state. Returns undefined for unknown or stateless docs. */
export function getChapterState(
  docId: string | undefined,
): ChapterStateValue | undefined {
  return docId ? CHAPTER_STATES[docId] : undefined;
}

/** Docusaurus doc id -> kind. Only subchapters are listed; main is default. */
export const CHAPTER_KINDS: Record<string, "main" | "sub"> = {
${kindBody}
};

/**
 * A doc sitting inside another doc's folder is a subchapter; every other
 * chapter (a stage chapter, a stage index, an intro chapter) is a main
 * chapter. The two now differ only in h1 size — see the title block in
 * src/css/custom.css.
 */
export function getChapterKind(docId: string | undefined): "main" | "sub" {
  return docId && CHAPTER_KINDS[docId] === "sub" ? "sub" : "main";
}
`;

  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, out, "utf8");

  for (const warning of warnings) {
    console.warn(`  warn: ${warning}`);
  }
  console.log(
    `Chapter manifest: ${entries.length} states, ${subIds.length} subchapters -> ${relative(ROOT, OUT_FILE)}`,
  );
}

main();
