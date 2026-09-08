#!/usr/bin/env node
/**
 * Build-time search index generator for curriculum content.
 * Walks the docs directory, extracts title, route, headings, content, and excerpt.
 * Outputs static/search-index.json consumed by the client-side SearchBar.
 *
 * Usage: node scripts/generate-search-index.mjs
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { join, relative, extname, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..");
const DOCS_DIR = join(ROOT, "docs");
const OUT_FILE = join(ROOT, "static", "search-index.json");

// --- Utilities --------------------------------------------------------------

function walk(dir, files = []) {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip hidden and non-doc directories
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

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function extractFrontmatter(content) {
  const match = content.match(/^---([\s\S]*?)---/);
  if (!match) return {};
  const fm = match[1];
  const data = {};
  for (const line of fm.split("\n")) {
    const [key, ...rest] = line.split(":");
    if (key && rest.length) {
      data[key.trim()] = rest.join(":").trim().replace(/^["']|["']$/g, "");
    }
  }
  return data;
}

function stripMarkdown(content) {
  // Remove frontmatter
  let text = content.replace(/^---[\s\S]*?---/, "");
  // Remove code blocks
  text = text.replace(/```[\s\S]*?```/g, "");
  text = text.replace(/`[^`]+`/g, "");
  // Remove images: ![alt](url)
  text = text.replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1");
  // Remove links but keep text: [text](url) -> text
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  // Remove headings markers
  text = text.replace(/^#{1,6}\s+/gm, "");
  // Remove emphasis
  text = text.replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, "$1");
  // Normalize whitespace
  text = text.replace(/\s+/g, " ").trim();
  return text;
}

function extractHeadings(content) {
  const headings = [];
  const lines = content.split("\n");
  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      headings.push(match[2].trim());
    }
  }
  return headings;
}

function makeExcerpt(text, maxLen = 200) {
  const words = text.split(/\s+/);
  let result = "";
  for (const w of words) {
    if (result.length + w.length + 1 > maxLen) break;
    result += (result ? " " : "") + w;
  }
  return result + (result.length < text.length ? "…" : "");
}

// --- Main -------------------------------------------------------------------

function main() {
  if (!existsSync(DOCS_DIR)) {
    console.error(`Docs directory not found: ${DOCS_DIR}`);
    process.exit(1);
  }

  const files = walk(DOCS_DIR);
  console.log(`Found ${files.length} curriculum documents`);

  const records = [];

  for (const file of files) {
    const content = readFileSync(file, "utf-8");
    const fm = extractFrontmatter(content);
    const body = content.replace(/^---[\s\S]*?---/, "");
    const plain = stripMarkdown(body);
    const headings = extractHeadings(content);

    // Determine route from file path
    const rel = relative(DOCS_DIR, file);
    let route = "/" + rel.replace(/\.(md|mdx)$/i, "").replace(/\\/g, "/");
    if (route.endsWith("/index")) route = route.slice(0, -5) || "/";
    if (!route.startsWith("/")) route = "/" + route;

    const title = fm.title || basename(file, extname(file)).replace(/-/g, " ");
    const excerpt = makeExcerpt(plain, 200);
    const contentText = plain.slice(0, 2000); // cap stored content for index size

    records.push({
      title,
      route,
      headings,
      content: contentText,
      excerpt,
    });
  }

  // Deduplicate by route (keep first)
  const uniq = [];
  const seen = new Set();
  for (const r of records) {
    if (!seen.has(r.route)) {
      seen.add(r.route);
      uniq.push(r);
    }
  }

  // Ensure output directory exists (static/ is a standard Docusaurus dir)
  const outDir = dirname(OUT_FILE);
  if (!existsSync(outDir)) {
    throw new Error(`Output directory missing: ${outDir}`);
  }

  writeFileSync(OUT_FILE, JSON.stringify(uniq, null, 2), "utf-8");
  console.log(`Wrote ${uniq.length} records to ${OUT_FILE}`);
}

try {
  main();
} catch (err) {
  console.error(err);
  process.exit(1);
}