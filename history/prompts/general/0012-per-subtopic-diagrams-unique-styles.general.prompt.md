---
id: 0012
title: Per-subtopic diagrams with unique styles per chapter
stage: general
date: 2026-09-04
surface: agent
model: claude-sonnet-5
feature: none
branch: a
user: Book
command: null
labels: [curriculum, sde-intro, eraser, diagrams, chapter-authoring]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - edu-site/docs/intro-2-binary-to-language.md (3 diagrams embedded, one per previously-undiagrammed sub-topic)
 - edu-site/docs/intro-3-architecture-map.md (5 diagrams embedded, one per previously-undiagrammed sub-topic)
 - edu-site/docs/intro-4-two-extremes-and-sde.md (3 diagrams embedded, one per previously-undiagrammed sub-topic)
 - edu-site/static/img/lessons/intro-2/bits-bytes-ascii.png (new)
 - edu-site/static/img/lessons/intro-2/one-instruction-two-chips.png (new)
 - edu-site/static/img/lessons/intro-2/assembly-to-machine-code.png (new)
 - edu-site/static/img/lessons/intro-3/choosing-a-platform.png (new)
 - edu-site/static/img/lessons/intro-3/anatomy-of-the-frontend.png (new)
 - edu-site/static/img/lessons/intro-3/the-backends-job.png (new)
 - edu-site/static/img/lessons/intro-3/sql-vs-nosql-vs-redis.png (new)
 - edu-site/static/img/lessons/intro-3/from-laptop-to-live.png (new)
 - edu-site/static/img/lessons/intro-4/feels-faster-measured-slower.png (new)
 - edu-site/static/img/lessons/intro-4/two-ways-to-drift.png (new)
 - edu-site/static/img/lessons/intro-4/csv-export-four-stages.png (new)
tests:
 - node scripts/check-frontmatter.mjs (from edu-site/) - passed
 - dev server (port 58860) - zero console errors on all three pages; all 21 images (10 prior + 11 new) confirmed 200 OK with byte-exact content-length via in-page fetch() after navigation
 - visual inspection of all 11 new diagrams via Read tool before embedding, including two re-authored fix passes after visual defects were caught
---

## Prompt

"hmm, perform manual execution, and use the diagram for each sub topic. every diagram will have the different shapes, color, theme and beauty (uniqueness overall) from the previous ones."

## Response snapshot

Read all three chapters and the 10 existing diagrams to find every H2 sub-topic
still without its own diagram: intro-2 had 3 (bits/bytes/ASCII, machine-code
x86-vs-ARM, assembly-to-machine-code); intro-3 had 5 (platform choice, frontend
anatomy, backend/statelessness, SQL-vs-NoSQL-vs-Redis, deployment); intro-4 had
3 (the over-trust mechanism plus its two incidents, over-caution's cost curve,
the CSV-export worked example). Confirmed all 10 existing diagrams shared one
uniform visual theme (white background, pastel rounded rectangles, one shape
vocabulary) — this set the bar for "different" the new set had to clear.

Fetched an unrelated diagram left in the same Eraser file from an earlier
session to mine its JSON for schema features the manual path supports beyond
what was used previously: oval/diamond shapes, icons, numbered badges,
independent text blocks. Designed 11 diagrams, each a deliberately distinct
combination of palette, shape language, and layout metaphor: a dark cyan
"circuit" theme, an amber/teal duotone chip-split, a black-green terminal, a
coral device-choice row, an indigo layered frontend with a repeated-component
motif, a dark charcoal/magenta isolated-request-bubble backend, a tri-shape
database comparison (grid vs. blob cluster vs. single card), a sky-blue
deployment runway, a red/amber diverging-path incident diagram, a dark
EKG/time-axis drift comparison, and a multi-color sticky-note CSV walkthrough.

Authored the first diagram live as a calibration check (screenshot-verified
before continuing) rather than mass-producing blind. Caught and root-caused a
genuine renderer defect this way: `cornerRadius` values in roughly (0, 8) —
tested and confirmed broken at 2 and 6 — render as a giant crosshatch/hachure
placeholder instead of a filled rounded rectangle, while 0 and >=8 are
reliable; even then one shape (a wide, short rectangle) still broke at
cornerRadius 10 on one pass, so the final rule adopted was "0, or don't risk
it" for any shape with an extreme aspect ratio. Also found that icon names
outside Eraser's supported set ("cpu", "file-text") render the same giant
crosshatch rather than failing cleanly or omitting the icon — worked around by
sticking to icon names already confirmed to render (zap, type, hash, terminal,
globe, rocket) or omitting icons entirely. Fixed two diagrams that showed
defects on first render (a cornerRadius crosshatch, a text/connector-line
overlap) by re-authoring corrected versions rather than leaving the flaw in.

Exported and visually verified all 11 final diagrams via the Read tool,
downloaded each into its chapter's static/img/lessons/ folder, and inserted
each at the sub-topic paragraph it illustrates (verified against the actual
current file content, not memory, since the chapters were rewritten in the
prior turn). Started the dev server fresh, navigated to all three chapters,
and confirmed via in-page fetch() that every one of the 21 total images
(10 pre-existing + 11 new) returns 200 with a content-length matching the
local file exactly, plus zero console errors and a clean check-frontmatter
run.

## Outcome

- Impact: all three SDE Intro chapters now have a diagram for every taught
  sub-topic (21 total: 10 from the prior turn + 11 new), and no two diagrams
  in the set share a color palette, shape vocabulary, or layout style —
  directly fulfilling the uniqueness request rather than reusing one template
  with swapped colors
- Tests: check-frontmatter.mjs - PASS; console errors - none across all 3
  pages; all 21 images - 200 OK with byte-exact content-length; every new
  diagram visually inspected pre- and post-embed
- Files: see files list above
- Next prompts: none pending; chapters remain chapter_state: "placeholder"
  awaiting the user's own review on localhost before any are flipped to
  text-ready
- Reflection: authoring the first diagram of a batch as a live calibration
  check (not just once per tool, but once per turn even when the tool was
  used successfully last time) paid off again — it caught a renderer defect
  tied to a specific numeric range that would otherwise have silently
  corrupted several diagrams before being noticed

## Evaluation notes (flywheel)

- Failure modes observed: `cornerRadius` in (0, 8) and a small set of
  unsupported icon names both render as a giant crosshatch/hachure fallback
  with no error surfaced — a silent visual-defect class specific to this
  connector's manual JSON path, not caught by any tool-level validation
- Graders run and results (PASS/FAIL): check-frontmatter - PASS; image HTTP
  status + byte-size check - PASS (21/21); visual diagram review - PASS
  (11/11 correct after 2 corrective re-authors)
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): when authoring further Eraser
  freeform diagrams, default every Shape's cornerRadius to exactly 0 or >=16
  and every icon to a name already confirmed in this session's safe list
  (zap, type, hash, terminal, globe, rocket) — treat any new icon name as
  needing its own calibration check before use in a real diagram
