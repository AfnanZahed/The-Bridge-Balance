---
id: 0042
title: Eliminate dead-reference bug class
stage: general
date: 2026-09-07
surface: agent
model: claude-opus-5
feature: none
branch: a
user: Book
command: (follow-up to PHR 0041)
labels: [validators, dead-references, bug-class, ledgers, build-gate]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - edu-site/scripts/check-references.mjs (NEW - repo-wide reference validator; wired into build as check:refs)
  - edu-site/package.json (check:refs added to scripts and to the build chain)
  - README.md (dead llm-providers link; dead LICENCE link)
  - edu-site/README.md (../../ escaped the repo root; favicon.ico does not exist, it is .svg)
  - CLAUDE.md (dead PHR-template fallback path)
  - .claude/skills/.../curriculum-architect/SKILL.md (cited a decisions-locked file that does not exist)
  - curriculum-state/ledgers/concept-ledger.yaml (3 path fields carrying prose or retired cell names; 2 notes with tier words)
  - curriculum-state/ledgers/example-ledger.yaml (reserved_for tier word; notes archaeology)
  - PROJECT-MAP.md + reference/project-map.md + INSTALL.md (new script listed)
tests:
  - "npm run build - Frontmatter passed, Reference passed, 1 chapter checked 0 errors 1 warning, [SUCCESS]"
  - "negative test: injected a dead backticked path, a dead markdown link, and a dead ledger path - all three caught with file:line, exit 1"
  - "positive test after restore - exit 0"
  - "HAS_FILE_EXT regex unit-checked: foo.md true, fooxmd false, a.png true"
  - "tier-word sweep across skills, curriculum-state, CLAUDE.md, PROJECT-MAP.md, INSTALL.md, edu-site/scripts - NONE"
  - "all four ledgers parse after every edit"
---

## Prompt

> One thing worth noticing: the same bug — config naming a file that doesn't exist — showed up in three separate places today (research/, STAGE_FILES, NON_CHAPTERS). research/ survived three review passes because every check confirmed the references agreed with each other. They did. All of them pointed at nothing.

Then fix this AT ALL. No bug show be left at all. understood?

## Response snapshot

Treated it as a bug **class**, not a list. Wrote a scanner, hunted every instance,
fixed them, then built a permanent check so the class cannot return.

**First scan was wrong and had to be thrown away.** 205 "findings", almost all
false: a bare `` `evidence-ledger.yaml` `` resolves contextually to
`curriculum-state/ledgers/`, and the resolver did not know that. Rewrote it to
resolve by exact path, by suffix, and by basename anywhere in the repo. That is
the difference between a check people trust and one they learn to ignore.

**Eleven real dead references found and fixed:**

| Where | What |
|---|---|
| `README.md` | link to `edu-site/docs/llm-providers.md` — the same dead file as `STAGE_FILES` and `NON_CHAPTERS`, **third and fourth instances** |
| `README.md` | link to `edu-site/LICENCE`, which has never existed |
| `edu-site/README.md` | `../../.specify/…` — escapes the repo root entirely |
| `edu-site/README.md` | `img/favicon.ico` — the file is `favicon.svg` |
| `CLAUDE.md` | dead `templates/phr-template.prompt.md` fallback |
| `curriculum-architect/SKILL.md` | cited `claude/decisions-locked-2026-08-23.md`, absent |
| `concept-ledger.yaml` ×3 | `first_defined`/`used_in` holding prose or retired cell names |
| `example-ledger.yaml` + `concept-ledger.yaml` | four tier words surviving in notes |

**Three of those were retired-strategy residue that the "zero occurrences" sweep
missed** — `docs/intro.md - beginner/balanced`, `docs/intro.md - advanced/detailed`,
and `load-bearing Intermediate concept`. They survived because that sweep grepped
hyphenated cell names (`beginner-balanced`), and these use a slash or a bare
capitalised tier word. The new validator found the first two on its very first run,
by checking the *shape* of a path field rather than searching for known-bad text.

**The permanent fix — `check-references.mjs`, wired into `npm run build` as
`check:refs`.** It checks backticked paths, relative markdown links, and ledger
path fields across the documents this repo owns; skips `history/` and `specs/`
(historical records may name removed files), third-party skills, and generic
SpecKit templates. Docusaurus route links are skipped because Docusaurus already
fails the build on those. Tested by injecting one of each of the three kinds:
all three caught with exact `file:line`, exit 1; clean after restore.

**Found a bug in the bug-checker.** `new RegExp("\\.(?:" + …)` was written as
`"\."`, and in JS that is just `"."` — an unescaped dot matching any character, so
`fooxmd` passed as a file. Caught by unit-checking the regex rather than trusting
it. Hoisted to a named `HAS_FILE_EXT` constant with a comment saying exactly why
the escape matters.

## Outcome

- ✅ Impact: Eleven dead references gone. The class now fails the build rather than surviving review — the first check in this repo that compares documents against the filesystem instead of against each other. Three pieces of retired-strategy residue that two previous sweeps missed are gone with them.
- 🧪 Tests: `npm run build` green with all three validators. Negative test caught all three reference kinds with file:line; positive test clean. Regex unit-checked. Tier-word sweep now returns NONE. All four ledgers parse.
- 📁 Files: 1 new validator, 1 package.json, 9 edited, 1 PHR.
- 🔁 Next prompts: Author a chapter.
- 🧠 Reflection: The instruction was right and the earlier framing was too narrow. Three instances looked like three mistakes; they were one missing check. What made the class invisible is that every review verified internal consistency — the references agreed with each other perfectly, and all pointed at nothing. A grep can only find text you already suspect. A validator that resolves every path finds the ones nobody thought to suspect, which is why it caught residue two dedicated sweeps had walked past.

## Evaluation notes (flywheel)

- Failure modes observed: (1) The first scanner produced 205 findings that were 95% false, which would have trained anyone reading it to ignore the tool — a noisy check is worse than none. (2) The retired-strategy sweep in PHR 0037 searched for known-bad strings; the residue that survived used a different separator and a bare capitalised word. Searching for a bad *shape* (a path field that is not a path) found what searching for bad *text* could not. (3) I wrote an unescaped regex inside the validator built to catch exactly this kind of carelessness.
- Graders run and results (PASS/FAIL): Build PASS (3 validators). Reference negative test PASS ×3 kinds. Reference positive test PASS. Regex unit check PASS. Tier-word sweep PASS (none). Ledger parse PASS ×4. Exemption-list assertions PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): The remaining uncovered surface is CSS `url()`, component `import` paths, and `static/img` references from JSX — none are checked today. Extending `check-references.mjs` to those is the same pattern and would close the last place this class can live.
