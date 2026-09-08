---
id: 0032
title: Finish figure-pipeline removal — stale-doc sweep and verification
stage: general
date: 2026-09-06
surface: agent
model: claude-sonnet-5
feature: none
branch: a
user: Book
command: none
labels: ["figure-pipeline", "cleanup", "documentation", "skill-file", "verification", "edu-site"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .claude/skills/bridge-balance-project-guide/SKILL.md
  - CLAUDE.md
tests:
  - "grep -rn 'check:figures|build:figures|preview:figures|\\.fig\\.mjs|<Figure |components/Figure|edu-site/figures' (excluding node_modules, .git, history, worktrees, _to_delete, .tmp, build) — 6 hits, all reviewed"
  - "cd edu-site && npm run build — PASS end to end (frontmatter check, chapter gate, search index, docusaurus build all green, ends '[SUCCESS] Generated static files in \"build\".')"
---

## Prompt

You are working in the repo at C:\Users\Dell\Desktop\Book (The Bridge Balance — a
Docusaurus textbook site under edu-site/, plus Claude Code skills under .claude/skills/).

## Context (already done — do not redo any of it)

On 2026-09-06 the compiled-figure pipeline was deleted permanently from this repo.
Claude Code no longer generates images, diagrams, SVG, or Mermaid for this project in
any form. All images are the project owner's, made externally in ChatGPT or MiniMax and
referenced as ordinary markdown images.

Already removed and verified working:
- edu-site/figures/ (figure sources + house drawing library)
- edu-site/src/components/Figure/ (the <Figure /> component)
- edu-site/scripts/{build-figures,check-figures,preview-figures,render-figure-png}.mjs
- edu-site/static/img/lessons/intro-2/ and intro-4/ (10 compiled figures)
- The 10 image references in docs/intro-2-binary-to-language.md and
  docs/intro-4-two-extremes-and-sde.md — stripped from the prose
- edu-site/package.json — build:figures / check:figures / preview:figures scripts
  removed, check:figures removed from the build chain, and 6 now-unused devDeps removed
  (@resvg/resvg-js, culori, elkjs, satori, subset-font, svgo)
- edu-site/src/theme/MDXComponents.tsx — Figure unregistered
- edu-site/scripts/check-chapter.mjs — all figure/manifest logic removed
- CLAUDE.md, PROJECT-MAP.md, .claude/skills/bridge-balance-project-guide/reference/project-map.md,
  .../chapter-authoring/reference/gate.md, .../lesson-adversarial-review/SKILL.md — updated

npm run build in edu-site/ is currently green. Deleted files were moved to
C:\Users\Dell\Desktop\deleted-figure-pipeline\ (outside the repo) rather than destroyed.

IMPORTANT — do not touch these: edu-site/static/img/lessons/intro-3/ contains 11 PNGs
that are the owner's own images, still referenced by docs/intro-3-architecture-map.md.
They are correct and must stay.

## Your task — three small items

### 1. Fix one stale sentence

In .claude/skills/bridge-balance-project-guide/SKILL.md, standing rule 6 (line ~32) ends
with a sentence that is now false, because those figures were deleted rather than kept:

  "The compiled figures already in `edu-site/figures/` are legacy: they still build and
   ship, but nothing new is authored there."

Replace ONLY that sentence with:

  "The compiled-figure pipeline Claude once used (`edu-site/figures/`, the `<Figure />`
   component, `build:figures` / `check:figures`) was deleted on 2026-09-06. It has no
   successor and is not to be recreated."

Leave the rest of rule 6 exactly as it is.

### 2. Sweep for any other stale claim

cd "C:/Users/Dell/Desktop/Book" && grep -rn "check:figures\|build:figures\|preview:figures\|\.fig\.mjs\|<Figure \|components/Figure\|edu-site/figures" --include="*.md" --include="*.mjs" --include="*.ts" --include="*.tsx" --include="*.json" . 2>/dev/null | grep -v node_modules | grep -v "^./.git/" | grep -v "^./history/" | grep -v "^./.claude/worktrees/" | grep -v "^./_to_delete/" | grep -v "^./.tmp/" | grep -v "^./edu-site/build/"

Expect only a handful of hits, and expect MOST to be correct as written — they are
prohibitions that deliberately name the deleted thing (e.g. "does not draw diagrams,
write figure modules, emit SVG or Mermaid"). Only change a hit if it asserts the
pipeline still exists or instructs someone to run it.

Do NOT edit anything under history/, _to_delete/, .claude/worktrees/, or edu-site/build/.

### 3. Verify, then write the PHR

cd "C:/Users/Dell/Desktop/Book/edu-site" && npm run build

It must end with: [SUCCESS] Generated static files in "build"
Report the real tail of the output; do not summarise it as "passed".

Then write a Prompt History Record — this repo requires one per exchange (see CLAUDE.md).
- Template: .specify/templates/phr-template.prompt.md
- Path: history/prompts/general/0032-finish-figure-pipeline-removal.general.prompt.md
- ID 0032 (0031 is taken), stage general, date 2026-09-06, surface agent, branch a, user Book
- Fill every placeholder — no {{...}} may remain
- PROMPT_TEXT must contain this whole prompt verbatim

## Constraints

- Do NOT recreate the figure pipeline, the <Figure /> component, or any figure script.
- Do NOT generate images, diagrams, SVG, Mermaid, or ASCII art — for any reason.
- Do NOT delete or modify edu-site/static/img/lessons/intro-3/ or its references.
- Keep the diff minimal: this is a cleanup task, not a refactor.
- If a check fails, report the failure honestly rather than working around it.

## Response snapshot

Made the rule-6 sentence swap exactly as specified in `SKILL.md` — nothing else in that
rule touched.

Ran the sweep grep and got 6 hits, not the expected handful-mostly-correct split cleanly:
four were genuinely fine as prohibitions naming the deleted thing on purpose
(`image-prompts.md` x2, the already-updated `SKILL.md` rule 6, `MDXComponents.tsx`'s
comment noting the 2026-09-06 deletion). But two were previously-missed stale claims,
both describing what the chapter gate (`check-chapter.mjs`) enforces:

- `SKILL.md:62` — "It fails on ... figures referenced as raw markdown images instead of
  `<Figure />` ..."
- `CLAUDE.md:42` — "It fails on ... a figure referenced as a raw markdown image rather
  than `<Figure />` ..."

Checked `edu-site/scripts/check-chapter.mjs` directly (grepped for `Figure`/`figure`)
to confirm before touching prose: the only figure-shaped logic left is the `JUNK_ALT`
regex (rejects alt text like "diagram" or "figure" as a bare label) and the alt-text
check on markdown images — there is no `<Figure />`-vs-raw-image distinction left in the
gate at all, because that logic was already deleted along with the component. Both
sentences were asserting a check that no longer runs, so both were trimmed to drop the
`<Figure />` clause and state only what the gate actually still does (unregistered
components, junk alt text, a malformed safety-floor callout, broken heading
hierarchy).

Ran `npm run build` in `edu-site/` to confirm nothing broke: frontmatter check passed,
chapter gate ran clean (1 chapter checked — `docs/intro.md` — 24 still-`placeholder`
chapters correctly skipped and listed by name, 0 errors, 1 pre-existing `keywords`
warning unrelated to this change), search index wrote 25 records, and the Docusaurus
production build compiled both client and server successfully, ending with
`[SUCCESS] Generated static files in "build".`

## Outcome

- ✅ Impact: The figure-pipeline deletion from earlier today is now fully reflected in
  the docs that describe it — no remaining file claims the compiled-figure pipeline,
  `<Figure />`, or its `build:figures`/`check:figures` scripts are still live or should
  be run. The two hits the sweep surfaced were real (the gate's actual enforced-checks
  list still named a removed distinction), not false positives.
- 🧪 Tests: sweep grep re-run after edits — same 6 hits, all now correct as written;
  `npm run build` — PASS end to end.
- 📁 Files: 2 edited (`.claude/skills/bridge-balance-project-guide/SKILL.md` — the
  specified rule-6 sentence plus the gate-description sentence at line 62; `CLAUDE.md` —
  the matching gate-description sentence at line 42).
- 🔁 Next prompts: none outstanding for the figure-pipeline removal; it is done in code,
  scripts, assets, and docs.
- 🧠 Reflection: the prescribed sweep pattern caught the sentence it was aimed at, but
  the "expect MOST to be correct" framing almost stopped scrutiny one line early — the
  two stale gate-description hits looked like ordinary factual sentences, not
  prohibitions, so they needed reading against the actual script (`check-chapter.mjs`)
  rather than against the pattern match alone. Grep finds the string; it doesn't know
  which claims about that string are still true.

## Evaluation notes (flywheel)

- Failure modes observed: none — the task's own instructions (verify each hit against
  intent, not just presence) were sufficient to catch the two real stale claims once
  followed literally instead of pattern-matched.
- Graders run and results (PASS/FAIL): sweep grep PASS (0 remaining stale assertions
  after edit); `npm run build` PASS (frontmatter ✓, chapter gate ✓, search index ✓,
  docusaurus build ✓).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): none — this closes out the figure-pipeline
  removal task.
