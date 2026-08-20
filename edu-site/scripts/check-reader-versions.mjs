#!/usr/bin/env node
/**
 * check-reader-versions.mjs
 * Pure Node inventory scanner for nine-version chapter authoring.
 *
 * Reads text-ready MDX chapters, parses <Version>/<Shared> blocks and
 * data-arc-* attributes, and reports per-chapter structural completeness.
 *
 * Exit codes: 0 = no structural errors; 1 = at least one error.
 * Usage: node check-reader-versions.mjs [--format json|markdown] [--chapter <path>]
 */

import fs from "fs";
import path from "path";

const DIFFICULTIES = ["beginner", "intermediate", "advanced"];
const LENGTHS = ["summary", "balanced", "detailed"];
const ALL_COMBINATIONS = DIFFICULTIES.flatMap((d) =>
  LENGTHS.map((l) => `${d}|${l}`),
);

const VISUAL_AID_PATTERNS = [
  { name: "comparison_table", re: /\|[^|\n]*\|[^|\n]*\|/ },
  { name: "definition_list", re: /<dl>|^  - /m },
  { name: "callout", re: /<Callout|<Info>|<Warning>|<KeyIdea>|<Definition>/ },
  { name: "code_block", re: /```|<code>/ },
  { name: "bullet_list", re: /^[-*+] .+\n([-*+] .+\n){3,}/m },
  { name: "diagram", re: /```mermaid|<pre>[^<]*[│├└┬┴]/ },
  { name: "key_terms", re: /Key Terms|Glossary|Vocabulary/i },
  { name: "before_after", re: /Before\s*\/\s*After|before.*after/i },
  { name: "outcome_list", re: /What you'?ll be able to do/i },
  { name: "forward_pointer", re: /Where this connects|Next up/i },
];

function parseFrontmatter(content) {
  // Handle both LF and CRLF
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const fm = {};
  match[1].split(/\r?\n/).forEach((line) => {
    const i = line.indexOf(":");
    if (i > 0) {
      const key = line.slice(0, i).trim();
      const val = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
      fm[key] = val;
    }
  });
  return fm;
}

function extractBlocks(body) {
  const blocks = [];
  let remaining = body;

  // Remove frontmatter if present (handles LF/CRLF)
  remaining = remaining.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");

  // Pattern 1: <Version difficulty="..." length="...">...</Version>
  const versionRe = /<Version\s+difficulty="([^"]+)"\s+length="([^"]+)">([\s\S]*?)<\/Version>/g;
  let m;
  while ((m = versionRe.exec(remaining)) !== null) {
    blocks.push({
      type: "version",
      difficulty: m[1].toLowerCase(),
      length: m[2].toLowerCase(),
      content: m[3],
    });
  }

  // Pattern 2: Existing single-axis authoring components from 007.
  // A missing axis uses the runtime defaults: Intermediate / Balanced.
  const singleAxis = [
    ["Beginner", "beginner", null],
    ["Intermediate", "intermediate", null],
    ["Advanced", "advanced", null],
    ["Summary", null, "summary"],
    ["Balanced", null, "balanced"],
    ["Detailed", null, "detailed"],
  ];
  for (const [tag, difficulty, length] of singleAxis) {
    const re = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, "g");
    while ((m = re.exec(remaining)) !== null) {
      blocks.push({
        type: "version",
        difficulty: difficulty ?? "intermediate",
        length: length ?? "balanced",
        content: m[1],
        legacy: true,
      });
    }
  }

  // Pattern 3: <Shared label="...">...</Shared>
  const sharedRe = /<Shared\s+label="([^"]+)">([\s\S]*?)<\/Shared>/g;
  while ((m = sharedRe.exec(remaining)) !== null) {
    blocks.push({
      type: "shared",
      label: m[1],
      content: m[2],
    });
  }

  // Pattern 3: Raw data-arc-block attributes (escape hatch)
  const arcRe = /<[^>]+data-arc-block[^>]*>/g;
  let arcMatch;
  while ((arcMatch = arcRe.exec(remaining)) !== null) {
    const tag = arcMatch[0];
    const diffMatch = tag.match(/data-arc-difficulty="([^"]*)"/);
    const lenMatch = tag.match(/data-arc-length="([^"]*)"/);
    const sharedMatch = tag.match(/data-arc-shared="true"/);
    const diff = diffMatch?.[1]?.toLowerCase() ?? "";
    const len = lenMatch?.[1]?.toLowerCase() ?? "";
    if (sharedMatch) {
      blocks.push({ type: "shared", label: "Shared", rawAttributes: true });
    } else if (diff || len) {
      blocks.push({
        type: "version",
        difficulty: diff || "intermediate",
        length: len || "balanced",
        rawAttributes: true,
      });
    }
  }

  return blocks;
}

function countVisualAids(content) {
  const found = new Set();
  for (const { name, re } of VISUAL_AID_PATTERNS) {
    if (re.test(content)) found.add(name);
  }
  return found.size;
}

function validateChapter(filePath, relPath) {
  const content = fs.readFileSync(filePath, "utf8");
  const fm = parseFrontmatter(content);
  if (fm.chapter_state !== "text-ready") {
    return null; // skip non-text-ready chapters
  }

  const blocks = extractBlocks(content);
  const authoredKeys = new Set();
  const sharedSections = [];
  const errors = [];
  const warnings = [];
  let duplicateCount = 0;

  for (const block of blocks) {
    if (block.type === "version") {
      const key = `${block.difficulty}|${block.length}`;
      if (authoredKeys.has(key)) {
        duplicateCount++;
        if (!block.legacy) {
          errors.push({
            kind: "duplicate-key",
            message: `Duplicate combination: ${key}`,
          });
        }
      } else {
        authoredKeys.add(key);
      }
      if (!DIFFICULTIES.includes(block.difficulty)) {
        errors.push({
          kind: "invalid-difficulty",
          message: `Invalid difficulty: ${block.difficulty} (expected ${DIFFICULTIES.join(", ")})`,
        });
      }
      if (!LENGTHS.includes(block.length)) {
        errors.push({
          kind: "invalid-length",
          message: `Invalid length: ${block.length} (expected ${LENGTHS.join(", ")})`,
        });
      }
    } else if (block.type === "shared") {
      if (!block.label || !block.label.trim()) {
        warnings.push({
          kind: "shared-no-label",
          message: "Shared section missing label",
        });
      }
      sharedSections.push(block.label || "Shared");
    }
  }

  const missingCombinations = ALL_COMBINATIONS.filter((k) => !authoredKeys.has(k));
  const visualAidCount = countVisualAids(content);

  const isFullyMigrated = authoredKeys.size === 9 && duplicateCount === 0;

  if (isFullyMigrated && missingCombinations.length > 0) {
    // shouldn't happen if authoredKeys.size === 9
  }

  return {
    chapterId: relPath,
    chapterState: "text-ready",
    authoredCount: authoredKeys.size,
    missingCombinations,
    unavailableCombinations: [],
    sharedSectionCount: sharedSections.length,
    sharedLabels: sharedSections,
    visualAidCoverage: visualAidCount,
    isFullyMigrated,
    errors,
    warnings,
  };
}

function main() {
  const args = process.argv.slice(2);
  const format = args.includes("--format") ? args[args.indexOf("--format") + 1] : "markdown";
  const targetChapter = args.includes("--chapter") ? args[args.indexOf("--chapter") + 1] : null;

  const docsDir = path.resolve("docs");
  if (!fs.existsSync(docsDir)) {
    console.error("docs/ directory not found");
    process.exit(1);
  }

  const allFiles = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".md")) allFiles.push(full);
    }
  }
  walk(docsDir);

  const results = [];
  for (const file of allFiles) {
    const rel = path.relative(process.cwd(), file).replace(/\\/g, "/");
    if (targetChapter && rel !== targetChapter) continue;
    const res = validateChapter(file, rel);
    if (res) results.push(res);
  }

  const textReadyChapters = results.length;
  const fullyMigrated = results.filter((r) => r.isFullyMigrated).length;
  const allErrors = results.flatMap((r) => r.errors);
  const allWarnings = results.flatMap((r) => r.warnings);

  const report = {
    generatedAt: new Date().toISOString(),
    totalChapters: allFiles.length,
    textReadyChapters,
    fullyMigratedChapters: fullyMigrated,
    perChapter: results,
    errors: allErrors,
    warnings: allWarnings,
  };

  if (format === "json") {
    console.log(JSON.stringify(report, null, 2));
  } else {
    // Markdown table
    console.log("| Chapter | State | Authored | Missing | Shared | Vis Aids | Fully Migrated |");
    console.log("|---|---|---:|---|---:|---:|---|");
    for (const r of results) {
      const missingStr = r.missingCombinations.length
        ? r.missingCombinations.join(", ")
        : "—";
      console.log(
        `| ${r.chapterId} | ${r.chapterState} | ${r.authoredCount} | ${missingStr} | ${r.sharedSectionCount} | ${r.visualAidCoverage} | ${r.isFullyMigrated ? "✓" : "✗"} |`,
      );
    }
    if (allErrors.length) {
      console.log("\n**Errors:**");
      for (const e of allErrors) console.log(`- ${e.kind}: ${e.message}`);
    }
    if (allWarnings.length) {
      console.log("\n**Warnings:**");
      for (const w of allWarnings) console.log(`- ${w.kind}: ${w.message}`);
    }
  }

  if (allErrors.length > 0) process.exit(1);
  process.exit(0);
}

main();