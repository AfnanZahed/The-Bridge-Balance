---
id: 0062
title: Fix chapter title typography — serif island to sans display headline
stage: misc
date: 2026-09-11
surface: agent
model: claude (Command Code agent)
feature: none (design fix — chapter reading page)
branch: none (no version control in this project)
user: afnanzahed@gmail.com
command: none (freeform chat — owner report that chapter headings read as ugly)
labels: ["design", "typography", "reading-page", "principle-vii", "custom-css"]
links:
  spec: null (single-rule fix inside the ratified type system; no spec opened)
  ticket: null
  adr: null
  pr: null
files:
  - edu-site/src/css/custom.css (`.theme-doc-markdown h1` retyped; type-scale table h1/h2/h3/h4 + dek rows corrected to implementation truth)
tests:
  - playwright probe — line count per font size on the 608px measure (40px = 3 lines, 42px = 4)
  - playwright computed-style capture, light + dark, `intro-1-binary-to-programming`
  - playwright render check on `stage-01-spec-aware-vibe-engineering/foundations` (14 h2s, h3 present)
  - npx biome check src/css/custom.css — biome config ignores CSS (0 files processed), so no lint gate applies
---

## Prompt

the headings' (e.g; From Electricity to Programming: Binary, Assembly, and High-Level Languages) Fonts and sizes and designing are making the chapter's core main ultra ugly

## Response snapshot

Diagnosed with real renders before touching anything (Playwright screenshots + computed styles against the running dev server, light and dark — images do not reach the model in this session, so judgement came from geometry and the owner's report).

**What was wrong.** The chapter h1 was set in Instrument Serif at 400 weight, `clamp(2.25rem, 4.2vw, 3.25rem)` (52px at 1440), line-height 1.06, tracking −0.032em:

1. **Off-system.** Constitution Principle VII and spec 002 T008 reserve Instrument Serif as the *italic display accent* for editorial moments only (`.tbb-hero__title-accent`, pull-quotes, brand mark) and explicitly strip serif from heading levels. The chapter title is reading content, not an accent.
2. **Inverted hierarchy.** At 400-weight serif the title rendered optically *lighter* than the 1.875rem/600 h2s beneath it — the page's largest text was its weakest mark.
3. **Wrap and leading.** 1.06 leading on a three-line display serif collides; long titles ("From Electricity to Programming: Binary, Assembly, and High-Level Languages", 82 characters) stack into a dense slab on the one screen every chapter opens with.

**The fix** (`.theme-doc-markdown h1`): heading sans (`--ifm-heading-font-family`), weight 600 — same voice as the h2s, hero and chrome — `clamp(2.25rem, 3.6vw, 2.5rem)`, line-height 1.12, tracking −0.026em. The 2.5rem (40px) cap is measured, not guessed: on the 608px measure 40px yields exactly three lines and 42px breaks to four, so 40px is the largest size that keeps long titles to a three-line block.

**Documentation corrected in the same file:** the type-scale table (the file's own reference) had drifted from the implementation on four rows — h1 still described the old serif display, h2 read 1.625rem against a 1.875rem implementation, h3 read 1.25rem against 1.375rem, h4 read 1.0625rem against its actual eyebrow treatment. All four rows plus the dek row now state what ships.

**Left alone deliberately:** h2 (1.875rem/600 with the mono section ordinal + opening hairline) and h3 (1.375rem/600) read correctly in the renders and are load-bearing parts of the chrome system (the ordinals match the sidebar's chapter numbering). The 231px dead gutter between the 38rem column and the TOC was noted as a layout observation, not a heading defect, and was not changed unasked.

## Outcome

- ✅ Impact: the chapter title now reads as a deliberate, solid headline in the site's own voice instead of a fashion-serif island, and the documented type scale matches the implementation again.
- 🧪 Tests: measured line counts per size; computed styles verified light + dark; second chapter verified (14 h2s + h3); CSS renders through the dev server (HMR applied, page served 200).
- 📁 Files: `edu-site/src/css/custom.css` only (one rule + one comment block + the reference table rows).
- 🔁 Next prompts: owner verdict on the new title in Edge; optional follow-ups offered — wider/outdented title, the 231px column gutter, or removing the numbered h2 ordinals.
- 🧠 Reflection: the complaint was reported as "fonts and sizes and design", and the evidence split cleanly into a real defect (off-system serif + inverted hierarchy) and things that were fine (h2/h3, ordinals) — measuring before editing kept the change to one rule.

## Evaluation notes (flywheel)

- Failure modes observed: first fix attempt used 46px, which made the wrap *worse* (4 lines, 206px) because sans semibold is far wider than Instrument Serif at the same size; caught only because line counts were measured rather than assumed. Lesson: verify wrap by measurement on the real measure, not by eye or by size ratio.
- Graders run and results (PASS/FAIL): three-line cap on the longest title — PASS; serif removed from heading levels per T008 — PASS; type table matches implementation — PASS; dark mode parity — PASS.
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): none.
