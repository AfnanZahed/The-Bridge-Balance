#!/usr/bin/env node
/**
 * Reference validator — every path this repo's own documents name must exist.
 *
 * The bug this exists to prevent: config or documentation naming a file that is
 * not there. It is invisible to every other check, because consistency between
 * documents is not the same as correspondence with the filesystem — a set of
 * references can agree perfectly with each other and all point at nothing.
 *
 * What it checks, across the files this project actually owns:
 *   1. Backticked path-like tokens in markdown       `curriculum-state/canon/voice.md`
 *   2. Relative markdown links                       [text](./stack.md)
 *   3. Ledger path fields                            first_defined:, used_in:, path:
 *   4. JS/TS imports, relative and @site/            ./Foo, @site/src/x
 *   5. Package imports, against package.json         clsx, motion/react
 *   6. CSS url() and @import                         url("/img/x.svg")
 *   7. Site-absolute asset strings                   src="/img/x.svg"
 *
 * Docusaurus aliases (@theme, @theme-original, @docusaurus, @generated) are
 * skipped: they are resolved by Docusaurus, not by this repo's filesystem.
 * Route links with no file extension are skipped too — Docusaurus already fails
 * the build on a broken one.
 *
 * Deliberately NOT checked: history/ and specs/ (historical records, allowed to
 * name files that have since been removed), third-party skills under
 * mcclowes-skills-docusaurus/, SpecKit command and template files (generic, not
 * about this repo), and anything ignored by git.
 *
 * Zero dependencies. Node 18+.
 *
 * Usage:  node scripts/check-references.mjs
 * Exits 0 when every reference resolves; 1 otherwise.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";

const EDU = process.cwd();
const REPO = path.resolve(EDU, "..");

/** Directories never walked, and never scanned. */
const EXCLUDED = new Set([
  "node_modules", ".git", "build", ".docusaurus", "coverage", ".next",
  "_to_delete", ".tmp", ".agents", "dist",
]);

/** Paths (repo-relative) whose contents are not scanned for references. */
const NOT_SCANNED = [
  "history", "specs", "mcclowes-skills-docusaurus", ".specify",
  ".claude/commands", ".claude/worktrees", ".claude/skills/mmx-cli",
];

/** Files and directories whose references ARE checked. */
const SCANNED = [
  "CLAUDE.md", "README.md", "PROJECT-MAP.md", "PROJECT-REPORT.md",
  "INSTALL.md", "stack.md",
  ".claude/skills/bridge-balance-project-guide",
  ".claude/skills/lesson-spine-authoring",
  "curriculum-state",
  "edu-site/README.md",
  "edu-site/docs",
];

/**
 * Basenames that legitimately name files outside this repo. The sibling
 * `The Bridge Balance/Official docs/` folder holds the original planning
 * documents; they are genuine source material and deliberately not vendored.
 */
const EXTERNAL = new Set([
  "problem_statement.md", "solution_statement.md", "curriculum_1.md",
]);

/**
 * Files this repo names but deliberately does not contain. Each needs a reason,
 * and the reason has to survive scrutiny — this list is the escape hatch, so it
 * is the first place a real dead reference will try to hide.
 *   vercel.json          - named only to say Docusaurus needs no such file
 *   *-report.json etc.   - CI artifacts, produced by a workflow, never committed
 */
const NOT_IN_REPO = new Set([
  "vercel.json", "audit-summary.json", "lighthouse-report.json", "axe-report.json",
]);

const FILE_EXT = "md|mdx|yaml|yml|mjs|js|ts|tsx|json|css|py|svg|png|ico";
const BACKTICKED = new RegExp("`([A-Za-z0-9_][A-Za-z0-9_./@-]*\\.(?:" + FILE_EXT + "))`", "g");
const MD_LINK = new RegExp("\\]\\((\\.{0,2}/[^)\\s#]+|[A-Za-z0-9_][A-Za-z0-9_./-]*\\.(?:" + FILE_EXT + "))(?:#[^)]*)?\\)", "g");

/** True when a reference ends in a real file extension, so it names a file
 *  rather than a Docusaurus route. The dot is escaped: an unescaped one here
 *  matches any character, and would let `fooxmd` pass as a file. */
const HAS_FILE_EXT = new RegExp("\\.(?:" + FILE_EXT + ")$");

/** `<slug>`, `NN`, `0N`, `…` — a shape, not a path. */
const PLACEHOLDER = /[<>*{}]|\.\.\.|…|\bNN\b|0N\b/;

/** @type {{file: string, line: number, ref: string, kind: string}[]} */
const findings = [];

const isNotScanned = (rel) =>
  NOT_SCANNED.some((n) => rel === n || rel.startsWith(n + "/"));

/**
 * @param {string} dir absolute
 * @returns {AsyncIterable<string>} absolute file paths
 */
async function* walk(dir) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    if (EXCLUDED.has(e.name)) continue;
    const full = path.join(dir, e.name);
    const rel = path.relative(REPO, full).split(path.sep).join("/");
    if (isNotScanned(rel)) continue;
    if (e.isDirectory()) yield* walk(full);
    else yield full;
  }
}

/** @param {string} s @param {number} i */
const lineOf = (s, i) => s.slice(0, i).split("\n").length;

async function main() {
  // 1. Index every real file, by repo-relative path and by basename.
  /** @type {Set<string>} */ const paths = new Set();
  /** @type {Set<string>} */ const names = new Set();
  for await (const abs of walk(REPO)) {
    const rel = path.relative(REPO, abs).split(path.sep).join("/");
    paths.add(rel);
    names.add(path.basename(rel));
  }
  // .specify and .claude/commands are not scanned, but ARE legitimate targets.
  for (const extra of [".specify", ".claude/commands"]) {
    for await (const abs of walk(path.join(REPO, extra))) {
      const rel = path.relative(REPO, abs).split(path.sep).join("/");
      paths.add(rel);
      names.add(path.basename(rel));
    }
  }

  /** A reference resolves if it names a real file exactly, by suffix, or by basename. */
  const resolves = (ref) => {
    if (paths.has(ref)) return true;
    for (const p of paths) if (p.endsWith("/" + ref)) return true;
    return names.has(path.basename(ref));
  };

  // 2. Collect the files whose references we check.
  /** @type {string[]} */ const targets = [];
  for (const entry of SCANNED) {
    const abs = path.join(REPO, entry);
    let st;
    try {
      st = await fs.stat(abs);
    } catch {
      findings.push({ file: "check-references.mjs", line: 0, ref: entry, kind: "scan-root-missing" });
      continue;
    }
    if (st.isFile()) targets.push(abs);
    else for await (const f of walk(abs)) if (/\.(md|mdx|yaml)$/i.test(f)) targets.push(f);
  }

  // 3. Markdown references.
  for (const abs of targets.sort()) {
    const rel = path.relative(REPO, abs).split(path.sep).join("/");
    const src = await fs.readFile(abs, "utf8");

    for (const m of src.matchAll(BACKTICKED)) {
      const ref = m[1];
      if (PLACEHOLDER.test(ref) || EXTERNAL.has(path.basename(ref))) continue;
      if (NOT_IN_REPO.has(path.basename(ref))) continue;
      if (!resolves(ref)) {
        findings.push({ file: rel, line: lineOf(src, m.index ?? 0), ref, kind: "backticked-path" });
      }
    }

    for (const m of src.matchAll(MD_LINK)) {
      const ref = m[1];
      if (PLACEHOLDER.test(ref) || /^(https?:|mailto:)/.test(ref)) continue;
      if (EXTERNAL.has(path.basename(decodeURIComponent(ref)))) continue;
      if (NOT_IN_REPO.has(path.basename(decodeURIComponent(ref)))) continue;
      // A link with no file extension is a Docusaurus route, not a path.
      // Docusaurus resolves those itself and fails the build on a broken one.
      if (!HAS_FILE_EXT.test(ref)) continue;
      const target = decodeURIComponent(ref);
      // A site-absolute asset link resolves against static/, as Docusaurus serves it.
      const near = target.startsWith("/")
        ? path.join(EDU, "static", target.slice(1))
        : path.resolve(path.dirname(abs), target);
      let ok = false;
      try {
        await fs.stat(near);
        ok = near.startsWith(REPO); // a link that escapes the repo is still a defect
      } catch {
        ok = false;
      }
      if (!ok && !resolves(target.replace(/^\.\//, ""))) {
        findings.push({ file: rel, line: lineOf(src, m.index ?? 0), ref, kind: "markdown-link" });
      }
    }
  }

  // 4. Ledger path fields must name real chapter files.
  const LEDGERS = "curriculum-state/ledgers";
  for (const name of ["concept-ledger.yaml", "example-ledger.yaml", "prerequisite-graph.yaml"]) {
    const abs = path.join(REPO, LEDGERS, name);
    let src;
    try {
      src = await fs.readFile(abs, "utf8");
    } catch {
      continue;
    }
    // `first_defined:`, `path:`, `used_in: [a, b]` — quoted or bare.
    for (const m of src.matchAll(/^\s*(first_defined|path|used_in):\s*(.+)$/gm)) {
      const key = m[1];
      const raw = m[2].trim();
      if (raw === "null" || raw === "~" || raw === "") continue;
      const items = raw.replace(/^\[|\]$/g, "").split(",");
      for (const item of items) {
        const val = item.trim().replace(/^["']|["']$/g, "");
        if (!val || val === "null") continue;
        if (!/\.(md|mdx)$/.test(val)) {
          findings.push({
            file: `${LEDGERS}/${name}`, line: lineOf(src, m.index ?? 0),
            ref: val, kind: `${key}-not-a-path`,
          });
          continue;
        }
        // Ledger paths are edu-site-relative ("docs/intro.md").
        if (!paths.has("edu-site/" + val) && !paths.has(val)) {
          findings.push({
            file: `${LEDGERS}/${name}`, line: lineOf(src, m.index ?? 0),
            ref: val, kind: `${key}-missing`,
          });
        }
      }
    }
  }

  // 5. Source references: CSS url()/@import, JS/TS imports, static asset strings.
  //    Docusaurus resolves aliases and bundles assets, so a broken one here can
  //    fail at build time, at runtime, or silently render nothing.
  const SRC_ROOTS = [path.join(EDU, "src"), path.join(EDU, "docs")];
  const STATIC = path.join(EDU, "static");
  const pkgJson = JSON.parse(await fs.readFile(path.join(EDU, "package.json"), "utf8"));
  const declared = new Set([
    ...Object.keys(pkgJson.dependencies ?? {}),
    ...Object.keys(pkgJson.devDependencies ?? {}),
  ]);

  /** Try a module path with the extensions a bundler would add. */
  const resolvesModule = async (base) => {
    const tries = [base];
    for (const e of [".ts", ".tsx", ".js", ".jsx", ".mjs", ".css", ".json"]) tries.push(base + e);
    for (const e of ["index.ts", "index.tsx", "index.js", "index.jsx"]) tries.push(path.join(base, e));
    for (const t of tries) {
      try {
        const st = await fs.stat(t);
        if (st.isFile()) return true;
      } catch { /* next */ }
    }
    return false;
  };

  /**
   * A package import resolves when its root package is declared in package.json
   * and actually installed. Subpaths (`motion/react`) are NOT file-checked: they
   * are usually `exports`-map entries with no matching file on disk, so probing
   * the filesystem for them reports false failures. What this catches is the real
   * bug — importing a package nothing declares or installs.
   */
  const resolvesPackage = async (spec) => {
    const root = spec.startsWith("@") ? spec.split("/").slice(0, 2).join("/") : spec.split("/")[0];
    if (!declared.has(root)) return false;
    try {
      return (await fs.stat(path.join(EDU, "node_modules", root))).isDirectory();
    } catch {
      return false;
    }
  };

  /** `/img/x.svg` is served from static/. */
  const resolvesStatic = async (ref) => {
    try {
      return (await fs.stat(path.join(STATIC, ref.replace(/^\//, "")))).isFile();
    } catch {
      return false;
    }
  };

  for (const root of SRC_ROOTS) {
    for await (const abs of walk(root)) {
      if (!/\.(tsx?|jsx?|mjs|css|mdx?)$/i.test(abs)) continue;
      const rel = path.relative(REPO, abs).split(path.sep).join("/");
      const src = await fs.readFile(abs, "utf8");
      const at = (m) => lineOf(src, m.index ?? 0);

      // import x from "..." / export … from "..." / import("...")
      // Code files only: prose containing `from "…"` is an English sentence,
      // not a module specifier, and scanning markdown for it reports nonsense.
      const isCode = /\.(tsx?|jsx?|mjs)$/i.test(abs);
      for (const m of isCode ? src.matchAll(/(?:from|import)\s*\(?\s*["']([^"']+)["']/g) : []) {
        const spec = m[1];
        if (/^(@theme|@theme-original|@docusaurus|@generated)(\/|$)/.test(spec)) continue; // Docusaurus aliases
        if (/^(https?:|data:)/.test(spec)) continue;
        let ok;
        if (spec.startsWith(".")) ok = await resolvesModule(path.resolve(path.dirname(abs), spec));
        else if (spec.startsWith("@site/")) ok = await resolvesModule(path.join(EDU, spec.slice("@site/".length)));
        else ok = await resolvesPackage(spec);
        if (!ok) findings.push({ file: rel, line: at(m), ref: spec, kind: "import-unresolved" });
      }

      // CSS url(...) and @import "..."
      for (const m of src.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)) {
        const ref = m[1].trim();
        if (/^(data:|https?:|#)/.test(ref)) continue;
        const ok = ref.startsWith("/")
          ? await resolvesStatic(ref)
          : await resolvesModule(path.resolve(path.dirname(abs), ref));
        if (!ok) findings.push({ file: rel, line: at(m), ref, kind: "css-url-missing" });
      }
      for (const m of src.matchAll(/@import\s+(?:url\()?\s*["']([^"']+)["']/g)) {
        const ref = m[1].trim();
        if (/^(https?:|data:)/.test(ref)) continue;
        // Unlike JS, a CSS package import is a plain path with no exports map
        // behind it, so the subpath itself must exist on disk.
        const ok = ref.startsWith(".")
          ? await resolvesModule(path.resolve(path.dirname(abs), ref))
          : (await resolvesPackage(ref)) && (await resolvesModule(path.join(EDU, "node_modules", ref)));
        if (!ok) findings.push({ file: rel, line: at(m), ref, kind: "css-import-unresolved" });
      }

      // Site-absolute asset strings: src="/img/x.svg", "/fonts/y.woff2"
      for (const m of src.matchAll(/["'`](\/(?:img|fonts|files|assets)\/[^"'`)\s]+\.[A-Za-z0-9]{2,5})["'`]/g)) {
        const ref = m[1];
        if (!(await resolvesStatic(ref))) {
          findings.push({ file: rel, line: at(m), ref, kind: "static-asset-missing" });
        }
      }
    }
  }

  if (findings.length > 0) {
    console.error("Reference validation FAILED — these name files that do not exist:\n");
    for (const f of findings) {
      console.error(`  ✗ ${f.file}:${f.line}  [${f.kind}]  ${f.ref}`);
    }
    console.error(`\n${findings.length} dead reference(s).`);
    console.error("A document naming a file that is not there is a bug, not a typo:");
    console.error("nothing else in this repo can catch it.");
    process.exit(1);
  }
  console.log("Reference validation passed ✓");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
