---
id: 0010
title: Author SDE Intro chapters to the site
stage: general
date: 2026-09-03
surface: agent
model: claude-sonnet-5
feature: none
branch: a
user: Book
command: null
labels: [curriculum, sde-intro, docusaurus, chapter-authoring, mermaid]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - edu-site/docs/intro-2-binary-to-language.md (new)
 - edu-site/docs/intro-3-architecture-map.md (new)
 - edu-site/docs/intro-4-two-extremes-and-sde.md (new)
 - edu-site/sidebars.ts (3 new doc ids inserted flat after "intro")
 - curriculum-state/ledgers/prerequisite-graph.yaml (s0-02/03/04 renamed to intro-2/intro-3/intro-4, paths corrected, status planned -> placeholder, "Stage 0" section comment reworded)
 - curriculum-state/proposals/stage-00-sde-intro-2026-09-03.md (top note added pointing to the real files and explaining the filename predates the "no Stage 0" correction)
 - .claude/launch.json (added autoPort: true to the edu-site config - port 3000 was held by another chat's server)
tests:
 - node scripts/check-frontmatter.mjs (from edu-site/) - passed
 - python yaml.safe_load against prerequisite-graph.yaml - parses clean, no duplicate ids, no dangling `requires`
 - docusaurus dev server (autoPort, port 59482) - compiled with no errors; all three new pages fetched via get_page_text and confirmed rendering with correct title/content; read_console_messages - no errors
---

## Prompt

I meant that add this content into the site itself, i will revew the content in the localhost. also, rebrand the stage 0 as intro, there is no official stage 0.

## Response snapshot

Corrected course from the prior turn: "the list" meant the live Docusaurus
site, not prerequisite-graph.yaml alone. Researched the actual current
contract before writing anything - discovered curriculum-state/contracts/
output-contract.md and its validator are both stale, still
describing a removed authoring contract (would falsely fail even
against the already-shipped docs/intro.md if run as originally documented
in CLAUDE.md). The real gate is check-frontmatter.mjs (wired into `npm run
build`), confirmed by reading it directly plus two real current examples
(docs/intro.md and stage-01's index.md/foundations.md).

Rewrote all three lecture parts as genuine reader-facing chapter prose
(not the teacher's lecture-note bullets from the proposal file) - second
person, terms glossed inline at first use, no banned voice.md phrases,
matching intro.md's actual register. Added a Mermaid
diagram to Part 3 assembling the frontend/API/backend/database/auth/git/
deployment boxes. Set chapter_state: "placeholder" on all three (content
is complete but unreviewed and the site's only three states don't have a
"drafted, pending review" option - placeholder is the honest one until
the user reviews and decides to flip it, and it also correctly causes the
stale validator to skip these files entirely rather than
falsely erroring on them).

Renamed the graph rows (s0-02/03/04 -> intro-2/intro-3/intro-4), fixed
paths to the real files, changed status planned -> placeholder now that
files actually exist, and removed "Stage 0" branding from the section
comment per the user's correction - kept the numeric `stage: 0` field
itself since that's docs/intro.md's own pre-existing internal value, not
new branding. Updated sidebars.ts to insert the three new doc ids flat
after "intro" (no category wrapper, so no visual "stage" banner).

Started the dev server (existing edu-site config in .claude/launch.json)
to let the user review on localhost as they asked; port 3000 was held by
another chat's server, so added autoPort: true and got assigned 59482.
Verified all three pages compile and render via get_page_text and
read_console_messages (clean). Discovered mid-verification that Mermaid
is not configured anywhere in docusaurus.config.ts, so the new Part 3
diagram (and, it turns out, docs/intro.md's own pre-existing diagram)
renders as raw flowchart syntax instead of an actual chart - a real,
pre-existing site gap, not something introduced this turn. Did not
install @docusaurus/theme-mermaid to fix it, since that changes the
dependency tree - flagged it for the user to approve instead of doing it
unprompted.

## Outcome

- Impact: three full chapters live on the dev server for the user's own review, wired into navigation and the prerequisite graph, with the "no official Stage 0" branding corrected throughout
- Tests: check-frontmatter.mjs passed; graph YAML re-parsed clean (no dup ids, no dangling requires); dev server compiled with zero errors, all three pages confirmed rendering with correct content via get_page_text, console clean
- Files: see files list above
- Next prompts: user review on localhost is the explicit next step; if they want the Mermaid diagram to actually render, that needs @docusaurus/theme-mermaid added (affects docs/intro.md too) - approval needed before installing; if/when the user is satisfied, flipping chapter_state to text-ready is their call, not an automatic next step
- Reflection: reading the actual validator scripts directly (not trusting CLAUDE.md's or output-contract.md's description of "the" quality gate) caught a real staleness problem before it caused a false failure report - worth doing by default when a documented gate is about to be invoked as a completion check, not just when something looks off

## Evaluation notes (flywheel)

- Failure modes observed: CLAUDE.md's own content-track validation instruction pointed at a stale script; would have produced a misleading failure report if followed literally without checking the script's actual behavior first
- Graders run and results (PASS/FAIL): check-frontmatter.mjs - PASS; YAML integrity check - PASS; console-error check - PASS (none found)
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): consider flagging to the user, separately from this task, that the stale validator and output-contract.md need a real update pass rather than staying silently stale
