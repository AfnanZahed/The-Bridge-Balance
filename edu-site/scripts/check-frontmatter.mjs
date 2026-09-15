#!/usr/bin/env node
/**
 * Frontmatter validator for the textbook.
 *
 * Walks every .md / .mdx file under edu-site/docs/ and ensures the required
 * frontmatter keys are present per the contract in
 * `specs/001-book-foundation/contracts/content-schema.md`.
 *
 * Required keys (all files):
 *   - sidebar_label
 *   - sidebar_position
 *   - title
 *   - description
 *   - chapter_state    (only required for chapter files; stages may omit)
 *
 * State validation (chapter_state):
 *   - Must be one of: "placeholder" | "text-ready" | "video-published"
 *   - If "video-published", `video_url` MUST be present and non-empty
 *
 * Optional pair (chapter files, both or neither):
 *   - content_kind         one of: "theory" | "practice"
 *   - content_kind_reason  short free text; required when content_kind is set
 *
 * Exits 0 on success; 1 on any violation.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOT = path.resolve(process.cwd(), "docs");
const REQUIRED_KEYS = [
  "sidebar_label",
  "sidebar_position",
  "title",
  "description",
];
// Docs-root reference pages: real docs, but not chapters, so no chapter_state.
// Every entry must be a file that exists under docs/ - a stale entry silently
// exempts nothing and hides the fact that the page is gone.
// (`intro.md` was removed 2026-09-10 in the intro resequence; the five
// intro-1..intro-5 files are chapters and carry chapter_state, so none of them
// belongs here.)
const STAGE_FILES = [
  "glossary.md",
  "perf-targets.md",
  "changelog.md",
  "faq.md",
  "code-of-conduct.md",
  "accessibility.md",
];
const VALID_STATES = ["placeholder", "text-ready", "video-published"];
const VALID_CONTENT_KINDS = ["theory", "practice"];

/** @type {string[]} */
const errors = [];

/**
 * Walk a directory and yield file paths.
 * @param {string} dir
 * @returns {AsyncIterable<string>}
 */
async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (/\.(md|mdx)$/i.test(entry.name)) {
      yield full;
    }
  }
}

/**
 * Parse the YAML frontmatter from a Markdown file.
 * Returns an object with the parsed keys, or null if there's no frontmatter.
 * @param {string} text
 */
function parseFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) return null;
  const yaml = match[1];
  /** @type {Record<string, string>} */
  const result = {};
  for (const line of yaml.split(/\r?\n/)) {
    const m = line.match(/^([a-zA-Z_][\w-]*):\s*(.*?)\r?$/);
    if (m) {
      let v = m[2].trim();
      // strip surrounding quotes
      if (
        (v.startsWith('"') && v.endsWith('"')) ||
        (v.startsWith("'") && v.endsWith("'"))
      ) {
        v = v.slice(1, -1);
      }
      result[m[1]] = v;
    }
  }
  return result;
}

/**
 * @param {string} file
 */
async function checkFile(file) {
  const rel = path.relative(process.cwd(), file);
  const text = await fs.readFile(file, "utf8");
  const fm = parseFrontmatter(text);

  if (!fm) {
    errors.push(`${rel}: missing frontmatter block (--- ... ---)`);
    return;
  }

  for (const key of REQUIRED_KEYS) {
    if (!(key in fm) || fm[key] === "") {
      errors.push(`${rel}: missing required frontmatter key "${key}"`);
    }
  }

  // chapter_state required unless this is a stage overview file
  const basename = path.basename(file);
  const isStageOverview = basename === "index.md" && /stage-\d{2}-/.test(rel);
  const isNonChapterDoc = STAGE_FILES.includes(basename);

  if (!isStageOverview && !isNonChapterDoc) {
    if (!("chapter_state" in fm)) {
      errors.push(
        `${rel}: chapter file missing "chapter_state" frontmatter key`,
      );
    } else if (!VALID_STATES.includes(fm.chapter_state)) {
      errors.push(
        `${rel}: invalid chapter_state "${fm.chapter_state}" (must be one of: ${VALID_STATES.join(", ")})`,
      );
    } else if (
      fm.chapter_state === "video-published" &&
      !(fm.video_url && fm.video_url !== "")
    ) {
      errors.push(
        `${rel}: chapter_state is "video-published" but video_url is empty`,
      );
    }

    // content_kind / content_kind_reason — optional for now, so chapters
    // without the key pass exactly as before. A chapter that declares its kind
    // must use one of the two VALUES and record the reason, the same
    // required-together pattern as scope_multiplier/scope_reason.
    const contentKind = (fm.content_kind ?? "").trim();
    if (contentKind !== "") {
      if (!VALID_CONTENT_KINDS.includes(contentKind)) {
        errors.push(
          `${rel}: invalid content_kind "${fm.content_kind}" (must be one of: ${VALID_CONTENT_KINDS.join(", ")})`,
        );
      }
      if ((fm.content_kind_reason ?? "").trim() === "") {
        errors.push(
          `${rel}: content_kind is "${contentKind}" but content_kind_reason is missing or empty`,
        );
      }
    }
  }
}

/**
 * A stale entry in an exemption list exempts nothing, and hides the fact that
 * the page it names is gone. Nothing verified these lists against the
 * filesystem, and dead entries survived in them for exactly that reason.
 * @param {Iterable<string>} names
 * @param {string} label
 * @param {string} dir
 */
async function assertExemptionsExist(names, label, dir) {
  const dead = [];
  for (const name of names) {
    try {
      await fs.access(path.join(dir, name));
    } catch {
      dead.push(name);
    }
  }
  if (dead.length > 0) {
    console.error(
      `${label} names ${dead.length} file(s) that do not exist under docs/: ${dead.join(", ")}`,
    );
    console.error("  Remove them - an exemption for a missing page is dead config.");
    process.exit(1);
  }
}

async function main() {
  try {
    await fs.access(ROOT);
  } catch {
    console.error(`docs/ not found at ${ROOT}`);
    process.exit(1);
  }

  await assertExemptionsExist(STAGE_FILES, "STAGE_FILES", ROOT);

  for await (const file of walk(ROOT)) {
    await checkFile(file);
  }

  if (errors.length > 0) {
    console.error("Frontmatter validation FAILED:\n");
    for (const e of errors) console.error(`  ✗ ${e}`);
    console.error(`\n${errors.length} error(s).`);
    process.exit(1);
  } else {
    console.log("Frontmatter validation passed ✓");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
