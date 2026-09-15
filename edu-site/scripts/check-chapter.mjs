#!/usr/bin/env node
/**
 * check-chapter.mjs — editorial gate for chapters.
 *
 * Chapters ship as one continuous read; this gate checks a chapter file
 * against the contract before it goes live.
 *
 * WHAT THIS DOES NOT DO
 * ---------------------
 * It does not police length. Chapter length is judged per topic, per chapter,
 * as the material needs — there is no band to hit and padding to reach one is
 * the failure this omission prevents. What it does instead is make the length
 * VISIBLE and ATTRIBUTED: it measures and reports reading time, and it fails
 * only when `scope_reason` is missing or generic, so every chapter's size is a
 * recorded decision rather than an accident.
 *
 * A NOTE ON IMAGES
 * ----------------
 * Chapter prose is authored by Claude Code; every image is the project owner's,
 * generated externally in ChatGPT or MiniMax and dropped into static/img/.
 * Nothing here asks Claude to make a picture, and the compiled-figure pipeline
 * that once did was deleted on 2026-09-06. What this checks is everything about
 * an image that IS text: that the file a chapter points at exists, and that its
 * alt text actually replaces the picture for a reader who cannot see it.
 *
 * Errors (exit 1):
 *   1.  frontmatter completeness, and a valid chapter_state
 *   2.  scope_reason present and specific
 *   3.  unregistered components and unknown frontmatter keys
 *   4.  an image reference pointing at a file that does not exist
 *   5.  alt text missing, generic, or too thin to replace the picture
 *   6.  a safety-floor callout that is not the exact fixed form
 *   7.  heading hierarchy — one h1, no skipped levels
 *
 * Warnings (never fail):
 *   voice tells from canon/voice.md, a bolded statistic with no source named
 *   in its paragraph, missing safety floor, over-wide code lines, an h1 that
 *   disagrees with frontmatter `title`.
 *
 * Chapters still at `placeholder` are skipped — but the summary SAYS SO by
 * name, so a clean run on an unflipped chapter can never look like proof.
 *
 * Zero dependencies. Node 18+.
 *
 * Usage:
 *   node scripts/check-chapter.mjs                       # every shipped chapter
 *   node scripts/check-chapter.mjs --chapter docs/x.md   # just one
 *   node scripts/check-chapter.mjs --format json
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const DOCS = path.join(ROOT, "docs");

/** contracts/calibration.md — Pakistani-English, comprehension-focused. */
const BASELINE_WPM = 150;

/** States whose files are real, shipped prose and must pass this gate. */
const SHIPPED = ["text-ready", "video-published"];
const VALID_STATES = ["placeholder", ...SHIPPED];

const REQUIRED_FM = [
  "sidebar_label",
  "sidebar_position",
  "title",
  "description",
  "chapter_state",
];

/**
 * Reference-page docs that are not chapters and carry no scope fields.
 * Every entry must name a file that exists under docs/ - a stale entry exempts
 * nothing and hides the fact that the page is gone.
 */
const NON_CHAPTERS = new Set(["glossary.md", "perf-targets.md"]);

/** canon/voice.md — "banned outright, not discouraged." */
const VOICE_TELLS = [
  [/\bin this (lesson|chapter),? we('| wi)ll\b/i, 'open on the actual question, not "in this lesson we will"'],
  [/\bit'?s important to (understand|note) that\b/i, "just say the thing"],
  [/\blet'?s (dive in|get started)\b/i, "start"],
  [/\bin today'?s fast-paced world\b/i, "delete the sentence"],
  [/\bat its core,? \w+ is\b/i, '"X is…", not "at its core, X is…"'],
  [/\bit'?s worth noting that\b/i, "note it"],
  [/\b(simply put|put simply)\b/i, "put it simply the first time"],
  [/\bthe key takeaway is\b/i, "the takeaway should already be obvious"],
  [/\bwhether you'?re a (beginner|newcomer|seasoned|experienced)\b/i, "write for this chapter's actual reader"],
  [/\bdelve\b/i, "plain words"],
  [/\b(leverages|leveraged|leveraging|to leverage)\b/i, 'plain words — "leverage" as a verb (the noun is fine)'],
  [/\butilis[ez](s|d|ing)?\b/i, 'plain words — "use"'],
  [/\brobust\b/i, "plain words"],
  [/\bseamless(ly)?\b/i, "plain words"],
  [/\bgame[- ]changer\b/i, "plain words"],
  [/\bso what does this mean for you\?/i, "rhetorical question as a transition"],
];

/** Alt text that exists but says nothing. */
const JUNK_ALT = /^(image|img|diagram|figure|chart|graph|screenshot|photo|picture|illustration|graphic)[.\s]*$/i;

/** scope_reason boilerplate that records no actual judgment. */
const GENERIC_REASON =
  /^(n\/a|na|none|tbd|todo|default|standard|normal|average|reference|reference scope|see above|as needed|it depends|-+)?$/i;

const args = process.argv.slice(2);
const asJson = args.includes("--format") && args[args.indexOf("--format") + 1] === "json";
const only = args.includes("--chapter") ? args[args.indexOf("--chapter") + 1] : null;

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (/\.(md|mdx)$/i.test(entry.name)) yield full;
  }
}

/**
 * Parse frontmatter. Scalars only, plus a `key:` with no value so that block
 * keys outside the chapter contract are still seen and can be rejected
 * rather than silently ignored.
 */
function parseFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) return { fm: null, body: text, raw: "" };
  const raw = match[1];
  const fm = {};
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^([a-zA-Z_][\w-]*):\s*(.*?)\r?$/);
    if (!m) continue;
    let v = m[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    fm[m[1]] = v;
  }
  return { fm, body: text.slice(match[0].length), raw };
}

/** Body with code fences removed, for checks that must not read code. */
function stripCode(body) {
  return body.replace(/^```[\s\S]*?^```/gm, "").replace(/`[^`\n]*`/g, "");
}

/** Words a reader actually reads: no code, no JSX, no URLs, no alt text. */
function countWords(body) {
  const prose = stripCode(body)
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_~|-]/g, " ");
  return prose.split(/\s+/).filter((w) => /[a-zA-Z0-9]/.test(w)).length;
}

function readingMinutes(words) {
  return Math.round((words / BASELINE_WPM) * 10) / 10;
}

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function checkChapter(file) {
  const rel = path.relative(ROOT, file).replace(/\\/g, "/");
  const errors = [];
  const warnings = [];
  const push = (list, code, message) => list.push({ code, message });

  const text = await fs.readFile(file, "utf8");
  const { fm, body, raw } = parseFrontmatter(text);

  if (!fm) {
    push(errors, "frontmatter-missing", "no frontmatter block");
    return { file: rel, state: null, errors, warnings, words: 0, minutes: 0 };
  }

  const state = fm.chapter_state ?? null;
  const base = path.basename(file);
  const isChapter = !NON_CHAPTERS.has(base) && !/(^|\/)index\.md$/.test(rel);

  // Not shipped yet: report the skip, check nothing else.
  if (!SHIPPED.includes(state)) {
    return { file: rel, state, skipped: true, errors, warnings, words: 0, minutes: 0 };
  }

  // --- 1. frontmatter completeness ----------------------------------------
  for (const key of REQUIRED_FM) {
    if (!fm[key]) push(errors, "fm-missing", `frontmatter \`${key}\` missing or empty`);
  }
  if (state && !VALID_STATES.includes(state)) {
    push(errors, "state-invalid", `chapter_state "${state}" is not one of ${VALID_STATES.join(" | ")}`);
  }
  if (state === "video-published" && !fm.video_url) {
    push(errors, "video-url-missing", "chapter_state is video-published but video_url is empty");
  }
  if (isChapter && !fm.keywords) {
    push(warnings, "keywords-missing", "no `keywords` — they feed the search index");
  }

  // --- 2. scope_reason present and specific -------------------------------
  if (isChapter) {
    if (!fm.scope_multiplier) {
      push(errors, "scope-multiplier-missing", "frontmatter `scope_multiplier` missing — every chapter declares its own scope");
    }
    const reason = (fm.scope_reason ?? "").trim();
    if (!reason) {
      push(errors, "scope-reason-missing", "frontmatter `scope_reason` missing — length is judged per chapter, so the judgment must be recorded");
    } else if (GENERIC_REASON.test(reason) || reason.split(/\s+/).length < 4) {
      push(errors, "scope-reason-generic", `scope_reason "${reason}" records no actual judgment — say what about THIS topic sets its size`);
    }
  }

  // --- 3. unregistered components ------------------------------------------
  // src/theme/MDXComponents.tsx registers exactly these for a chapter body.
  // Anything else fails the Docusaurus build; catching it here first gives a
  // clearer message than the build's own stack trace.
  const REGISTERED = new Set(["Callout", "StageBanner"]);
  const seenComponents = new Set();
  for (const m of stripCode(body).matchAll(/<\/?([A-Z][A-Za-z0-9]*)[\s/>]/g)) {
    if (!REGISTERED.has(m[1]) && !seenComponents.has(m[1])) {
      seenComponents.add(m[1]);
      push(errors, "unregistered-component", `<${m[1]}> is not registered and will fail the build`);
    }
  }

  // --- 4. images -----------------------------------------------------------
  const noCode = stripCode(body);

  // Chapter prose is authored by Claude; the IMAGES are the project owner's,
  // generated externally. So the failure that matters most here is a reference
  // to a file nobody has made yet — a chapter ships with the images it actually
  // has, never with a placeholder pointing at nothing.
  for (const m of noCode.matchAll(/!\[([^\]]*)\]\((\/[^)\s]+)\)/g)) {
    const rel = decodeURI(m[2].split("#")[0].split("?")[0]);
    if (!(await exists(path.join(ROOT, "static", rel)))) {
      push(errors, "image-missing", `image ${m[2]} does not exist at static${rel}`);
    }
  }

  // --- 5. alt text on every markdown image ---------------------------------
  // Alt text is prose, so it is authored here even when the picture is not.
  for (const m of noCode.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)) {
    const alt = m[1].trim();
    if (!alt) push(errors, "alt-missing", `image ${m[2]} has empty alt text`);
    else if (JUNK_ALT.test(alt)) push(errors, "alt-junk", `image ${m[2]} alt text says nothing: "${alt}"`);
    else if (alt.split(/\s+/).length < 5) {
      push(errors, "alt-thin", `image ${m[2]} alt text is too thin to replace the picture: "${alt}"`);
    }
  }

  // --- 6. safety floor -----------------------------------------------------
  const floors = [...noCode.matchAll(/<Callout\s+([^>]*)>([\s\S]*?)<\/Callout>/g)].filter((m) =>
    /safety/i.test(m[1]),
  );
  if (floors.length === 0) {
    push(warnings, "safety-floor-absent", "no safety-floor callout — most chapters carry one; confirm this is deliberate");
  }
  for (const m of floors) {
    const attrs = m[1];
    const ok = /type=["']warning["']/.test(attrs) && /title=["']Safety floor["']/.test(attrs);
    if (!ok) {
      push(
        errors,
        "safety-floor-form",
        `safety-floor callout must be exactly <Callout type="warning" title="Safety floor"> — found: <Callout ${attrs.trim()}>`,
      );
    }
    if (m[2].trim().split(/\s+/).length < 8) {
      push(errors, "safety-floor-thin", "safety-floor callout body is too short to say anything");
    }
  }

  // --- 7. heading hierarchy ------------------------------------------------
  const headings = [...noCode.matchAll(/^(#{1,6})\s+(.+?)\s*$/gm)].map((m) => ({
    level: m[1].length,
    text: m[2],
  }));
  const h1s = headings.filter((h) => h.level === 1);
  if (h1s.length === 0) push(errors, "h1-missing", "no h1 — the chapter title heading is required");
  if (h1s.length > 1) push(errors, "h1-multiple", `${h1s.length} h1 headings — the chapter title is the only one`);
  if (h1s.length === 1 && fm.title && h1s[0].text.trim() !== fm.title.trim()) {
    push(warnings, "h1-title-mismatch", `h1 "${h1s[0].text}" differs from frontmatter title "${fm.title}"`);
  }
  let prev = 0;
  for (const h of headings) {
    if (prev && h.level > prev + 1) {
      push(errors, "heading-skip", `heading level jumps h${prev} -> h${h.level} at "${h.text}"`);
    }
    prev = h.level;
  }

  // --- warnings: voice tells ----------------------------------------------
  for (const [re, fix] of VOICE_TELLS) {
    const hit = noCode.match(re);
    if (hit) push(warnings, "voice-tell", `"${hit[0]}" — ${fix}`);
  }

  // --- warnings: an unattributed statistic ---------------------------------
  // A statistic is a percentage or a multiplier — NOT any bold text that
  // happens to contain a digit, which would flag "**Stage 1**" forever and
  // train everyone to ignore this warning.
  const STAT = /\*\*[^*\n]*?(\d[\d,.]*\s*%|\d[\d,.]*\s*(?:x|×|times)\b)[^*\n]*\*\*/;
  // Attribution counts whether the source is named or referred back to
  // ("the same study found"), since the book attributes both ways.
  const ATTRIBUTED =
    /\b(study|studies|report|survey|research|analysis|benchmark|data|findings?|found|according to|per)\b/i;
  // The window is this paragraph plus the one before it: the book routinely
  // introduces the source in one paragraph and the number in the next.
  const paras = noCode.split(/\n\s*\n/);
  for (let i = 0; i < paras.length; i++) {
    const stat = paras[i].match(STAT);
    if (!stat) continue;
    const window = `${paras[i - 1] ?? ""}\n${paras[i]}`;
    if (!ATTRIBUTED.test(window)) {
      push(warnings, "stat-unattributed", `statistic ${stat[0].trim()} with no source or study named in it or the paragraph before`);
    }
  }

  // --- warnings: over-wide code lines --------------------------------------
  for (const block of body.matchAll(/^```[^\n]*\n([\s\S]*?)^```/gm)) {
    for (const line of block[1].split(/\r?\n/)) {
      if (line.length > 80) {
        push(warnings, "code-width", `code line ${line.length} chars — wraps or scrolls on mobile`);
        break;
      }
    }
  }

  const words = countWords(body);
  return { file: rel, state, errors, warnings, words, minutes: readingMinutes(words) };
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
  await assertExemptionsExist(NON_CHAPTERS, "NON_CHAPTERS", DOCS);

  const files = [];

  if (only) {
    files.push(path.resolve(ROOT, only));
  } else {
    for await (const f of walk(DOCS)) files.push(f);
  }

  const results = [];
  for (const f of files.sort()) results.push(await checkChapter(f));

  const checked = results.filter((r) => !r.skipped);
  const skipped = results.filter((r) => r.skipped);
  const errorCount = checked.reduce((n, r) => n + r.errors.length, 0);
  const warnCount = checked.reduce((n, r) => n + r.warnings.length, 0);

  if (asJson) {
    console.log(JSON.stringify({ checked, skipped, errorCount, warnCount }, null, 2));
    process.exit(errorCount > 0 ? 1 : 0);
  }

  for (const r of checked) {
    const head = `${r.errors.length ? "FAIL" : "ok  "}  ${r.file}`;
    const size = `${r.words.toLocaleString()} words  ~${r.minutes} min`;
    console.log(`  ${head}${" ".repeat(Math.max(2, 58 - head.length))}${size}`);
    for (const e of r.errors) console.log(`          [${e.code}] ${e.message}`);
    for (const w of r.warnings) console.log(`          warn  [${w.code}] ${w.message}`);
  }

  if (skipped.length) {
    console.log(`\n  Not checked — still \`placeholder\`, so this run proves nothing about them:`);
    for (const r of skipped) console.log(`    - ${r.file}`);
  }

  const n = checked.length;
  console.log(
    `\n${n} chapter${n === 1 ? "" : "s"} checked, ${skipped.length} skipped, ` +
      `${errorCount} error${errorCount === 1 ? "" : "s"}, ${warnCount} warning${warnCount === 1 ? "" : "s"}`,
  );
  if (n === 0) {
    console.log("Nothing was checked. A clean run here means nothing is shipped, not that everything passes.");
  }

  process.exit(errorCount > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
