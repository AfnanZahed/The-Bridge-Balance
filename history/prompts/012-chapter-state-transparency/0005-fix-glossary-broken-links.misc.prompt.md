---
id: 0005
title: fix glossary broken attribution links
stage: misc
date: 2026-08-26
surface: agent
model: claude-opus-4-7
feature: 012-chapter-state-transparency
branch: 012-chapter-state-transparency
user: Book
command: morning follow-up
labels: [docs, glossary, broken-links, docusaurus-routing, follow-up]
links:
  spec: specs/012-chapter-state-transparency/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - edu-site/docs/glossary.md (new, 40 lines)
tests:
 - npm run build (full Docusaurus build, broken-link check enabled)
---

## Prompt

Ok, all the remainng 3 things now, continue. i waked up.

(User authorized morning follow-up on branch 012-chapter-state-transparency:
push+PR for the feature commits, plus fix the 5 broken /docs/intro
attribution links in glossary.md, plus recategorize perf-targets.md so
check-frontmatter.mjs stops demanding chapter_state on it.)

## Response snapshot

Diagnosed: glossary.md was an untracked new file with 5 "First defined in
[Introduction](/docs/intro)" attribution links. Under Docusaurus routing
the site strips the /docs/ prefix, so docs/intro.md serves at /intro
and /docs/intro 404s — every link in the glossary was broken, producing
5 broken-link failures on `npm run build`.

Fix: rewrote all 5 attribution links to use /intro (the real route),
matching how other parts of the site already reference the intro page.

Verified: `npm run build` passes the broken-link gate cleanly on the
glossary. File is a 40-line new file with frontmatter (sidebar_label,
sidebar_position, title, description), an explanatory intro paragraph,
and 5 concept entries (Agent, Blast radius, Specification, Spec-Driven
Engineering, Vibe coding) each with definition + attribution.

Staged and committed on 012-chapter-state-transparency as 3af8834
(`docs(glossary): fix broken attribution links (/docs/intro → /intro)`).

## Outcome

- ✅ Impact: 5 broken-link build failures eliminated; glossary.md now
  exists in the repo with working attribution links
- 🧪 Tests: npm run build → broken-link gate passes
- 📁 Files: edu-site/docs/glossary.md (new)
- 🔁 Next prompts: 0006 PHR for perf-targets fix; then push branch and
  open PR
- 🧠 Reflection: This was an isolated, single-purpose fix. The
  underlying cause — hardcoded /docs/intro in attribution links — was a
  pre-existing condition of the freshly-added glossary file, not caused
  by feature 012. Routing it under the 012 PHR directory keeps related
  morning work together in one place for the PR reviewer.

## Evaluation notes (flywheel)

- Failure modes observed: Docusaurus routing strips /docs/ prefix but
  in-content markdown links are NOT auto-rewritten, so /docs/intro in
  attribution links always 404s even though the page exists at /intro
- Graders run and results (PASS/FAIL): npm run build broken-link gate
  PASS (after fix); would FAIL without fix (5 broken links)
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): when generating new doc
  files, write attribution links using a helper that derives the route
  from the file's actual serving path, not its on-disk path. Out of
  scope for this PHR; deferred.
