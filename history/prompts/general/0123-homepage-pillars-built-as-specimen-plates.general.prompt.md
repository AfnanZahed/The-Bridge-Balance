---
id: 0123
title: Homepage pillars built as specimen plates
stage: general
date: 2026-09-20
surface: agent
model: claude-sonnet-5
feature: none
branch: main
user: afnanzahed@gmail.com
command: none
labels: ["homepage", "design", "featuregrid", "adr-0003", "a11y", "build-gate"]
links:
  spec: specs/002-apple-design/contracts/design-system.md
  ticket: null
  adr: history/adr/0003-scoped-accent-reintroduction.md
  pr: null
files:
 - edu-site/src/components/Aceternity/FeatureGrid.tsx
 - edu-site/src/css/custom.css
 - edu-site/src/css/a11y.css
 - edu-site/src/pages/index.tsx
 - edu-site/docs/changelog.md
tests:
  - "npm run typecheck — clean"
  - "npm run build — SUCCESS after `npm run clear`; 9 chapters, 0 errors, 7 warnings (all pre-existing)"
  - "npm run test:a11y (axe, homepage on the served build) — 0 violations across all impact levels"
  - "Biome, per-file: FeatureGrid.tsx and index.tsx carry the same 2 pre-existing diagnostics (organizeImports + CRLF format) as their HEAD revisions — 0 new"
  - "Playwright, measured on the built site: body measure capped at 512px (32rem); chip 44x44; no horizontal overflow at 320/768/1440; heading ink light 0.311 / dark 0.659 — mode parity confirmed"
  - "Playwright hover probe: --tbb-spot-x tracks to 69.97% — cursor spotlight wired"
---

## Prompt

> There is no beauty at all for the text at home page: 01 Video + text, paired … 04 Specs, not prompts. research about how MAXIMUMLY it can be beautiful, don't ask me any question and implement the question, if any question is important, then after your, write down the open questions, i will see in the morning when wake up. good night

## Response snapshot

**The root cause was simpler than "not beautiful enough".** `.tbb-feature-card`
and its parts had **no CSS anywhere in the repo** — a grep for `tbb-feature`
across `edu-site` matched only the component file itself. The four pillars were
rendering as four unstyled `<div>`s: eight blocks of text in a vertical stack.
Nothing was decorated badly; nothing was decorated at all.

**What the four plates are now.** Each is one surface built from the site's own
specular set rather than a flat fill — `--tbb-metal-face` for the vertical light
ramp, `--tbb-metal-rim` for the bevel catching light, `--tbb-shadow-*` for depth.
The anatomy, top to bottom: a 3px rail in the card's own ramp step (solid for its
first fifth, dissolving by 60%), the icon in a 44px raised chip, the ordinal set
large in Geist Mono at 16% ink, then title and body. Putting the icon and the
ordinal on one row and the reading block under it is what turns eight loose
blocks into four objects.

**The design law did most of the deciding.** The Design System Contract requires
depth from "luminance-differentiated surfaces + soft shadows, not hard 1px
borders", one accent per surface, and light/dark both first-class — so the plates
are metal, the identity is a ramp step, and every value is stated once in `:root`
and inverts by itself. The four cards descend `--tbb-stage-1..4` exactly as the
five stage cards do, which is the page's existing visual metaphor for progression.

**One live rule violation found and fixed.** Pillar 3 was reading
`--tbb-accent`. ADR-0003 scopes that token to a named list of surfaces — article
links, the active sidebar/TOC item, the focus ring, the footer hover, the active
search row, the nav pill, the drawer's active link, the reading-progress bar —
and cards are not on it. It now reads `--tbb-stage-3`, the token that belongs.

**Two things were measured, not guessed.** The body is capped at 32rem (512px ≈
65 characters at 15px) so the measure stays inside the 45–75 band at the widest
container instead of running to ~75. The grid goes two-column at 900px because
below that a plate is under ~44 characters. Both are recorded in the CSS.

**One correction against myself.** Three rounds of "the rail is invisible" were
wrong. The computed style was well-formed the whole time (`rgb(104,108,112)`,
3px, topmost per `elementFromPoint`) and a forced-red test proved the geometry
painted. The problem was my own evidence: a 3px line does not survive being read
in a downsampled JPEG. A 10px-tall 1× pixel strip settled it in one shot. The
rail was strengthened once on the strength of the bad readings; the strip shows
the current value is right, so it stands.

**A red build gate, fixed.** `npm run build` failed with
`ENOENT … build/__server/server.bundle.js` *after* both bundles compiled
successfully. This was pre-existing — the identical failure is recorded in
`.local-logs/build.log` from an earlier session today. `npm run clear` plus
removing the stale `build/` directory restored it, and it has built cleanly twice
since.

## Outcome

- Impact: the homepage's four "why this book" pillars render as designed panels
  for the first time; one live ADR-0003 violation is out of the codebase; the
  repo-wide build gate is green again.
- Tests: typecheck clean; build SUCCESS; axe 0 violations at every impact level;
  0 new lint diagnostics; measure, chip size, overflow and mode parity measured
  in a real browser at 320/768/1440.
- Files: 3 source files changed, 1 content page, 1 PHR.
- Next prompts: (1) whether the pill's wording still matches what each card now
  claims — the plates make the four claims easier to compare side by side than
  the stacked paragraphs did; (2) whether the same plate treatment should reach
  the homepage's marquee and timeline sections, which are still on flat surfaces.
- Reflection: "this text is not beautiful" was not a stylistic complaint here, it
  was a missing-file report. Grepping for the class name before designing anything
  would have found it in one call.

## Evaluation notes (flywheel)

- Failure modes observed: (1) I designed a stronger treatment for a component
  whose problem was absence, not weakness — the first pass added a rail, a
  spotlight and a chip to markup that had no styling at all, which was right, but
  I could not tell whether it worked because I kept judging 3px details in
  downsampled screenshots; (2) three separate visual reads of the same artefact
  produced the same wrong conclusion, and I only broke the loop by measuring
  pixels and then forcing an unmistakable colour; (3) the site's own Spotlight
  overlay auto-opened over two rounds of captures before I thought to press
  Escape.
- Graders run and results: typecheck PASS · build PASS (after clear) · axe
  0 violations PASS · Biome per-file regression check PASS (0 new) · rendered
  measurement PASS.
- Prompt variant: none.
- Next experiment: when a visual property cannot be judged by eye in a delivered
  screenshot, measure it — computed style first, a forced-colour render second,
  and only then a magnified pixel crop. Never conclude "not rendering" from a
  downscaled image.
