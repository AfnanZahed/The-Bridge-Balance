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
 *   8. Glossary links, against the page's anchors    /glossary#specification
 *   9. Major-term ordering                           term-ledger.yaml
 *
 * Checks 8 and 9 read term-ledger.yaml. 8 verifies every glossary link against
 * a real heading anchor on the glossary page. 9 fails a `major` term linked by
 * a chapter positioned before the chapter the ledger records as introducing
 * it. Docusaurus cannot see inside a URL hash, and ordering is not a build
 * concept at all, so nothing else catches either defect.
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

/**
 * Files that are still indexed (so live documents may point at them) but are
 * never scanned for their own references: non-binding planning artifacts. A
 * proposal's job is to name files that may not exist yet — or, later, files
 * that have since been retired — so checking it against the live filesystem
 * reports expected conditions as defects. `history/` and `specs/` are excluded
 * outright above instead, because nothing live points into them.
 */
const UNSCANNED_AS_SOURCE = ["curriculum-state/proposals"];

/** Files and directories whose references ARE checked. */
const SCANNED = [
  "CLAUDE.md", "README.md", "PROJECT-MAP.md",
  "history/reports/PROJECT-REPORT.md",
  "history/reports/INSTALL.md", "stack.md",
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

/** @type {{file: string, line: number, ref: string, kind: string,
 *  detail?: string}[]} */
const findings = [];

const isNotScanned = (rel) =>
  NOT_SCANNED.some((n) => rel === n || rel.startsWith(n + "/"));

const isUnscannedAsSource = (rel) =>
  UNSCANNED_AS_SOURCE.some((n) => rel === n || rel.startsWith(n + "/"));

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

/** Strip one layer of `"…"` or `'…'` YAML quoting from a scalar. */
const unquote = (s) => s.replace(/^["']|["']$/g, "");

/**
 * Entries from term-ledger.yaml: `- term:` starts an entry, then `slug`,
 * `weight` and `first_introduced` on the indented lines under it.
 * @returns {{term: string, slug: string, weight: string,
 *   firstIntroduced: string|null, line: number}[]}
 */
function parseTermLedger(src) {
  /** @type {{term: string, slug: string, weight: string,
   *   firstIntroduced: string|null, line: number}[]} */
  const terms = [];
  /** @type {{term: string, slug: string, weight: string,
   *   firstIntroduced: string|null, line: number}|null} */
  let current = null;
  src.split(/\r?\n/).forEach((line, i) => {
    const start = line.match(/^\s*-\s+term:\s*(.+?)\s*$/);
    if (start) {
      current = {
        term: unquote(start[1]),
        slug: "",
        weight: "minor",
        firstIntroduced: null,
        line: i + 1,
      };
      terms.push(current);
      return;
    }
    if (!current) return;
    const field = line.match(/^\s+(slug|weight|first_introduced):\s*(.*?)\s*$/);
    if (!field) return;
    const value = unquote(field[2]);
    if (field[1] === "slug") current.slug = value;
    else if (field[1] === "weight") current.weight = value;
    else if (value && value !== "null" && value !== "~") {
      current.firstIntroduced = value;
    }
  });
  return terms;
}

/**
 * `chapters:` from prerequisite-graph.yaml, in both shapes the file uses:
 * block entries (`- id: x` with indented fields) and one-line flow rows
 * (`- {id: x, path: docs/…, stage: 1, position: 2, …}`).
 * @returns {{id: string, path: string, stage: number, position: number}[]}
 */
function parsePrerequisiteGraph(src) {
  /** @type {{id: string, path: string, stage: number, position: number}[]} */
  const rows = [];
  /** @type {{id: string, path: string, stage: number,
   *   position: number}|null} */
  let current = null;
  const commit = () => {
    if (
      current?.path &&
      Number.isFinite(current.stage) &&
      Number.isFinite(current.position)
    ) {
      rows.push(current);
    }
    current = null;
  };
  for (const line of src.split(/\r?\n/)) {
    // A top-level key (non_lessons:, progress:) ends the chapters list.
    if (/^[A-Za-z_]/.test(line)) {
      commit();
      continue;
    }
    const flow = line.match(
      /^\s*-\s*\{\s*id:\s*([\w-]+).*\bpath:\s*([^,}\s]+).*\bstage:\s*(\d+).*\bposition:\s*(\d+)/,
    );
    if (flow) {
      commit();
      rows.push({
        id: flow[1],
        path: flow[2],
        stage: Number(flow[3]),
        position: Number(flow[4]),
      });
      continue;
    }
    const block = line.match(/^\s*-\s*id:\s*([\w-]+)\s*$/);
    if (block) {
      commit();
      current = { id: block[1], path: "", stage: NaN, position: NaN };
      continue;
    }
    if (!current) continue;
    const field = line.match(/^\s+(path|stage|position):\s*(\S+)/);
    if (!field) continue;
    if (field[1] === "path") current.path = unquote(field[2]);
    else if (field[1] === "stage") current.stage = Number(field[2]);
    else current.position = Number(field[2]);
  }
  commit();
  return rows;
}

/**
 * The anchors Docusaurus gives a page's headings: lowercase, punctuation
 * dropped, spaces to hyphens, repeats suffixed -1, -2. Matches the built
 * page's own ids — `### Specification (spec)` anchors at specification-spec.
 */
function headingAnchors(src) {
  const anchors = new Set();
  const seen = new Map();
  for (const m of src.matchAll(/^#{1,6}\s+(.+?)\s*$/gm)) {
    const base = m[1]
      .toLowerCase()
      .trim()
      .replace(/[^\p{L}\p{N}\s-]/gu, "")
      .replace(/\s+/g, "-");
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    anchors.add(n === 0 ? base : `${base}-${n}`);
  }
  return anchors;
}

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
    else
      for await (const f of walk(abs))
        if (/\.(md|mdx|yaml)$/i.test(f) && !isUnscannedAsSource(path.relative(REPO, f).split(path.sep).join("/"))) targets.push(f);
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

  // 6. Glossary links — the one page a chapter can link into by anchor.
  //    Two defects live here and nowhere else in the chain:
  //      a) a glossary link whose anchor does not exist on the page, and
  //      b) a MAJOR term used by a chapter that sits before the chapter the
  //         term ledger credits with introducing it.
  //    term-ledger.yaml carries the terms, anchors and weights; the ordering
  //    in (b) reads stage+position straight out of prerequisite-graph.yaml.
  //
  //    Both link forms are accepted: `/glossary#slug`, which is the route the
  //    site actually serves (docusaurus.config.ts sets routeBasePath to "/",
  //    so the docs root is the site root), and `/docs/glossary#slug`, the same
  //    intent written as a file path. Docusaurus cannot see inside a URL hash,
  //    which is why a wrong slug is invisible without this check.
  const GLOSSARY_LINK = /\]\((\/(?:docs\/)?glossary)#([^)\s]*)\)/g;

  /** Read a file, or return "" — used for inputs whose absence degrades. */
  const readOrEmpty = async (abs) => {
    try {
      return await fs.readFile(abs, "utf8");
    } catch {
      return "";
    }
  };

  const glossaryPage = "edu-site/docs/glossary.md";
  let glossarySrc = "";
  try {
    glossarySrc = await fs.readFile(
      path.join(EDU, "docs", "glossary.md"),
      "utf8",
    );
  } catch {
    // Without the page there is no anchor to resolve against, so every
    // glossary link in the book would read as broken; say the one true thing
    // instead of the hundred false ones it implies.
    findings.push({
      file: glossaryPage,
      line: 0,
      ref: glossaryPage,
      kind: "glossary-page-missing",
    });
  }
  const anchors = headingAnchors(glossarySrc);
  const terms = parseTermLedger(
    await readOrEmpty(path.join(REPO, LEDGERS, "term-ledger.yaml")),
  );
  const chapters = parsePrerequisiteGraph(
    await readOrEmpty(path.join(REPO, LEDGERS, "prerequisite-graph.yaml")),
  );
  const chapterById = new Map(chapters.map((c) => [c.id, c]));
  const chapterByPath = new Map(chapters.map((c) => [c.path, c]));
  const termBySlug = new Map(
    terms.filter((t) => t.slug).map((t) => [t.slug, t]),
  );

  // A first_introduced naming no chapter silently disables (b) for that term,
  // so it is reported once here, against the ledger that carries it.
  for (const t of terms) {
    if (t.firstIntroduced && !chapterById.has(t.firstIntroduced)) {
      findings.push({
        file: `${LEDGERS}/term-ledger.yaml`,
        line: t.line,
        ref: t.term,
        kind: "first-introduced-unknown",
        detail: `"${t.firstIntroduced}" is not a chapter id in prerequisite-graph.yaml`,
      });
    }
  }

  for (const abs of targets) {
    const rel = path.relative(REPO, abs).split(path.sep).join("/");
    if (!rel.startsWith("edu-site/docs/") || !/\.mdx?$/i.test(rel)) continue;
    const src = await fs.readFile(abs, "utf8");
    // The chapter this file IS, by the ledgers' own measure. A file that is
    // not a chapter (the glossary itself, perf-targets) has no position, so
    // the ordering check cannot apply to it.
    const here = chapterByPath.get(rel.slice("edu-site/".length));

    for (const m of src.matchAll(GLOSSARY_LINK)) {
      const slug = m[2];
      const link = `${m[1]}#${slug}`;
      const line = lineOf(src, m.index ?? 0);
      if (!anchors.has(slug)) {
        findings.push({
          file: rel,
          line,
          ref: link,
          kind: "glossary-anchor-missing",
          detail: `docs/glossary.md has no heading anchor "${slug}"`,
        });
        continue;
      }
      const term = termBySlug.get(slug);
      if (term?.weight !== "major" || !term.firstIntroduced || !here) {
        continue;
      }
      const intro = chapterById.get(term.firstIntroduced);
      if (!intro) continue; // already reported above
      const earlier =
        here.stage < intro.stage ||
        (here.stage === intro.stage && here.position < intro.position);
      if (earlier) {
        findings.push({
          file: rel,
          line,
          ref: link,
          kind: "term-used-before-introduction",
          detail:
            `"${term.term}" is a major term, introduced by ${intro.id} ` +
            `(${intro.path}), which this chapter precedes`,
        });
      }
    }
  }

  if (findings.length > 0) {
    console.error(
      "Reference validation FAILED — these point at something that does not exist:\n",
    );
    for (const f of findings) {
      console.error(`  ✗ ${f.file}:${f.line}  [${f.kind}]  ${f.ref}`);
      if (f.detail) console.error(`      ↳ ${f.detail}`);
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
