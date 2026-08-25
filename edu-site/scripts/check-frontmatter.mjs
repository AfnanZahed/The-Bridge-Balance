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
const STAGE_FILES = ["intro.md", "llm-providers.md", "glossary.md", "choose-your-path.md"]; // not chapter_state required
const VALID_STATES = ["placeholder", "text-ready", "video-published"];

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
  }
}

async function main() {
  try {
    await fs.access(ROOT);
  } catch {
    console.error(`docs/ not found at ${ROOT}`);
    process.exit(1);
  }

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
