---
id: 0006
title: recategorize perf-targets as non-chapter reference
stage: misc
date: 2026-08-26
surface: agent
model: claude-opus-4-7
feature: 012-chapter-state-transparency
branch: 012-chapter-state-transparency
user: Book
command: morning follow-up
labels: [docs, perf-targets, frontmatter, check-frontmatter, follow-up]
links:
  spec: specs/012-chapter-state-transparency/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - edu-site/docs/perf-targets.md (modified: removed chapter_state)
 - edu-site/scripts/check-frontmatter.mjs (modified: added perf-targets.md to STAGE_FILES)
tests:
 - node edu-site/scripts/check-frontmatter.mjs
 - node edu-site/scripts/check-chapter-quality.mjs
 - npm run build (full Docusaurus build)
---

## Prompt

Ok, all the remainng 3 things now, continue. i waked up.

(User authorized morning follow-up on branch 012-chapter-state-transparency:
push+PR for the feature commits, plus fix the 5 broken /docs/intro
attribution links in glossary.md, plus recategorize perf-targets.md so
check-frontmatter.mjs stops demanding chapter_state on it.)

## Response snapshot

Diagnosed: perf-targets.md had `chapter_state: "text-ready"` in its
frontmatter. The check-frontmatter.mjs script accepts that value, but
check-chapter-quality.mjs (the quality-contract validator) inspects
text-ready chapters for `<Version>`/`<Shared>` tags, per-cell
word-count bands, scope_multiplier, lenses, and a cells: frontmatter
block. perf-targets.md is a pure CI reference doc (Lighthouse + axe-core
score thresholds, gate mechanics, common violations and fixes) with
zero of those structures — so check-chapter-quality.mjs fails on it.

The two validators disagree about whether perf-targets.md is a chapter
or a stage file. The truth: it's a reference doc, not a chapter. The
right categorization is "stage file that doesn't need chapter_state",
sitting alongside intro.md, llm-providers.md, glossary.md, and
choose-your-path.md.

Fix:
- Removed `chapter_state: "text-ready"` from perf-targets.md frontmatter
- Added `"perf-targets.md"` to STAGE_FILES in check-frontmatter.mjs so
  check-frontmatter.mjs no longer demands chapter_state on it

Verified: all three checks now pass.
- node edu-site/scripts/check-frontmatter.mjs → PASS
- node edu-site/scripts/check-chapter-quality.mjs → PASS
- npm run build → PASS (full Docusaurus build, including broken-link
  gate, which also confirms the glossary fix from 0005)

Staged and committed on 012-chapter-state-transparency as 103aae4
(`docs(perf-targets): recategorize as non-chapter reference doc`).

Out of scope (deliberately not done):
- Did NOT touch edu-site/static/search-index.json, which was also
  modified in the working tree. The change came from a re-run of
  `generate-search-index.mjs`, which has a pre-existing Windows-CRLF
  bug in extractHeadings (lines 82-92 of the generator: splits on \n
  only; regex `^(#{1,6})\s+(.+)$` fails because CRLF lines keep trailing
  \r). The bug produces headings: [] for every doc, not just intro.
  Including the regenerated file would push broken headings data for
  the entire corpus. The generator bug is out of scope for this fix.
- Did NOT modify the search-index generator itself.

## Outcome

- ✅ Impact: check-chapter-quality.mjs and check-frontmatter.mjs now
  agree on perf-targets.md's categorization; npm run build is green
- 🧪 Tests: all three validators pass
- 📁 Files: edu-site/docs/perf-targets.md, edu-site/scripts/check-frontmatter.mjs
- 🔁 Next prompts: commit PHRs 0005 + 0006; push branch and open PR
- 🧠 Reflection: This was a categorization bug discovered while
  reviewing the feature's gate scorecard. The right answer wasn't to
  force-fit a reference doc into the chapter contract or to soften
  the contract — it was to recognize perf-targets.md for what it
  actually is and add it to the existing "stage file" exemption list.

## Evaluation notes (flywheel)

- Failure modes observed: two validators holding conflicting assumptions
  about a file's category — silently producing conflicting PASS/FAIL
  verdicts instead of a clear "this is neither chapter nor known stage
  file" error
- Graders run and results (PASS/FAIL):
  - check-frontmatter.mjs → PASS (after fix)
  - check-chapter-quality.mjs → PASS (after fix)
  - npm run build → PASS (after fix)
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): teach check-frontmatter.mjs
  to ERROR (not just to skip) when a file outside STAGE_FILES has no
  chapter_state and lacks any other classification marker. Would catch
  future categorization drift instead of papering over it. Out of scope
  here; deferred.
