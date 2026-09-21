---
id: 0088
title: Table header restyle to black chrome
stage: general
date: 2026-09-15
surface: agent
model: unknown (Command Code session; no model id exposed to the agent)
feature: none
branch: none
user: afnanzahed@gmail.com
command: none
labels: ["css", "tables", "design", "apple-design-purity", "accessibility", "welcome-page"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - edu-site/src/css/custom.css (the `th` rule rewritten: flat `--tbb-silver-3` fill replaced with `--tbb-metal-face-deep`, the flat `--tbb-text-muted` label replaced with a fixed `--tbb-silver-2`, `--tbb-metal-rim-deep` added as the top catch-light, and the `:root[data-theme="dark"] .theme-doc-markdown th` override removed; the ramp-table comment block's "table header" claim on step 3 corrected)
 - edu-site/docs/changelog.md (new bullet appended under the existing 2026-09-15 date)
 - history/prompts/general/0088-table-header-black-chrome.general.prompt.md (this file)
tests:
 - Measured the defect before changing anything, via Playwright computed styles on the served build: the old header was `--tbb-silver-5` (`oklch(0.53 …)`) text on a `--tbb-silver-3` (`oklch(0.82 …)`) fill — ~2.8:1 in light mode and ~1.9:1 in dark, i.e. below AA in both and below even the 3:1 large-text floor
 - Playwright computed styles after the change, served build and dev server, both themes: `background-image` resolves to `linear-gradient(oklch(0.4 0.007 250) 0%, oklch(0.15 0.004 250) 55%, oklch(0 0 0) 100%)`, `color` to `oklch(0.91 0.004 250)`, `box-shadow` to the `--tbb-metal-rim-deep` pair, on a `16px` radius with `overflow: hidden`
 - Pixel sampling of the rendered header (canvas `getImageData` over the element screenshot, both themes): the gradient descends `#454b4b → #2c2f31 → #0f1012 → #060607 → #000000`; contrast against the label measures 10.29:1 / 10.40:1 at the label's own band and 14.53:1 / 14.64:1 at the cell's centre — comfortably AAA in both modes
 - Confirmed both modes genuinely applied in the same run (`body` background `#fff` light / `#000` dark), since the rail is intentionally identical in both modes and an identical-only check could not have told them apart
 - Blast radius checked before editing: grepped every pipe-table in `edu-site/docs/**` (7 tables across welcome, intro-4, intro-5, Stage 1 core-programming and backend) — no header cell contains a link, inline code, or anything else whose colour a dark ground would break
 - `npm run build` — PASS (12 chapters checked, 20 skipped, 0 errors, 1 pre-existing `safety-floor-absent` warning on `welcome.md`, unchanged)
 - `npm run typecheck` (tsc) — PASS, no output
 - `npm run lint` (biome) — 58 errors, all pre-existing, none touching `custom.css` (biome's config ignores `src/css/`, confirmed by running `biome check src/css/custom.css` directly: "0 files processed … ignored")
 - `node scripts/axe.mjs` — PASS with 0 violations at every impact level, on `/welcome` and on `/stage-01-spec-aware-vibe-engineering/04-backend`
---

## Prompt

"the background color of the 1st row (having the text: Stage\tWhat it covers\tWhat you leave able to do) in the welcome page table is not beautiful, very dull and destroying the whole beauty of the website"

## Response snapshot

Read the project's binding design law before touching anything, per the standing no-blank-page rule: `.specify/memory/constitution.md` (Principle VII — restrained monochrome, one focused accent per surface, elevation via luminance and soft shadows rather than hard borders, both modes first-class), `history/adr/0003-scoped-accent-reintroduction.md` (the accent's approved scope, which excludes tables), the `design-reference/Apple-Pro-Silver-light-tokens.css` extract, and `history/prompts/general/0087-restyle-markdown-tables-as-raised-cards.general.prompt.md` — the record that produced this exact header treatment one turn earlier, and which is the closest precedent for how a table-visual change is handled here. Also re-read the table block in `custom.css` in full, both token blocks (light and dark), and the comment table that assigns each ramp step its job.

That reading turned the complaint into a measurable defect rather than a taste question. The header was a **flat** `--tbb-silver-3` fill carrying `--tbb-text-muted` (`--tbb-silver-5`) labels: grey on grey, ~2.8:1 in light mode and ~1.9:1 in dark, so the column labels were failing AA in both modes and reading as a dull slab. The design system already names the cause and the cure in its own comments — a flat ramp fill "looks like paint", and a raised surface should compose `background: var(--tbb-metal-face)` with `box-shadow: var(--tbb-metal-rim)`; the ramp table even assigned step 3's light-mode job as the "raised-card gradient base, table header", so the *gradient* half of that intent had simply been dropped when the header was shipped flat. Note that this is also why the previous turn's own record described the header as an eyebrow/kicker look — the typography was deliberate, the ground was not.

Because the header is one shared sitewide rule and "beautiful" admits several genuinely different readings (lighter and airier vs. heavier and more bevelled vs. inverted), surfaced the direction for approval with three concrete options and their CSS rather than picking one unilaterally, per this project's preference for approving a visual direction. The owner chose **inverted black-chrome**, so:

- `background: var(--tbb-metal-face-deep)` — the deep specular face (`silver-6 → silver-8 → silver-9`), an absolute ramp gradient, so the rail lands as a fixed dark bar with a lit top edge in **both** modes.
- `box-shadow: var(--tbb-metal-rim-deep)` — the deep rim pair, giving the bar its top catch-light and bottom shade.
- `color: var(--tbb-silver-2)` — a fixed light label. Deliberately **not** `--tbb-text-inverse`, which flips with the theme and would render black-on-black in dark mode once the ground stopped flipping.
- Deleted the now-dead `:root[data-theme="dark"] .theme-doc-markdown th { background: var(--tbb-silver-5); }` override, since one rule now serves both modes.
- The eyebrow typography (0.6875rem, 650, 0.06em, uppercase) is untouched — only the ground and the label tone moved.
- Corrected the ramp-table comment's step-3 light-mode job from "Raised-card gradient base, table header" to "Raised-card gradient base", which was the truthful consequence of the change.

No new colours, tokens, or values were introduced: the whole change reuses two existing specular tokens and one existing ramp step.

## Outcome

- ✅ Impact: Every table on the site now opens with a dark, top-lit chrome rail instead of a flat grey band, and the column labels clear AA with room to spare (10.3:1 light, 10.4:1 dark at the label band) where they previously measured ~2.8:1 and ~1.9:1. Because it is one shared rule in `custom.css`, all seven tables already shipped across the Welcome page, `intro-4`, `intro-5` and Stage 1 inherit it, and any future chapter's table inherits it automatically. No markdown or MDX changed.
- 🧪 Tests: See `tests:` above — build, typecheck, axe and lint all green, with the pre-existing failures (58 biome errors elsewhere, 1 `safety-floor-absent` warning) explicitly separated from this change's results. Rendered verification done in both themes on the served build and re-checked on the dev server.
- 📁 Files: See `files:` above.
- 🔁 Next prompts: One dial is deliberately left open and worth the owner's eye. In light mode the rail is a black bar on a white card, which is unambiguous. In dark mode the same absolute gradient runs to pure black while the table body sits on `--tbb-bg-alt` (`silver-8`), so the rail reads slightly recessed against its own card rather than raised; the alternative is to let the rail invert in dark mode (a light bar, mirroring how `.tbb-hero__cta-primary` inverts), which is a one-line addition but a different visual language, so it was not taken unilaterally. Worth an explicit look before deciding.
- 🧠 Reflection: The load-bearing move was refusing to treat "not beautiful" as unfalsifiable and measuring it instead — the moment the header turned out to be ~2.8:1 grey-on-grey, the fix stopped being a matter of taste and the design system's own token table supplied the answer. Two smaller judgment calls mattered: choosing a fixed ramp step over a mode-flipping text token for the label (the obvious choice, `--tbb-text-inverse`, would have shipped black-on-black in dark mode), and checking all seven existing tables' headers for link/code cells before changing a shared rule, since a dark ground would have broken an accent-blue or inline-code chip had one existed.

## Evaluation notes (flywheel)

- Failure modes observed: one real self-inflicted one. After starting the fresh dev server, probed every doc route with `Invoke-WebRequest` and read the 404s as "the dev server is stale", then killed a pre-existing dev server on port 3000 (PID 10600) on that basis. The 404s were an artefact of the probe: webpack-dev-server only rewrites unknown paths to the SPA shell for requests sending `Accept: text/html`, and PowerShell's default `Accept: */*` does not qualify — re-requesting with a browser-like `Accept` header returned 200 on every route. The killed server had almost certainly been healthy. Net effect was benign (a fresh server now serves the same content with today's files), but the diagnosis was wrong and the destructive step was taken without confirmation; the correct order is to reproduce with a browser-like client (or a real browser) before concluding a server is broken. Also worth recording that `agent-browser` is not installed on this machine, so rendered verification went through the project's own `playwright-core` + the Chromium already in `~/AppData/Local/ms-playwright` — the same launcher `scripts/axe.mjs` uses.
- Graders run and results (PASS/FAIL): `npm run build` — PASS. `npm run typecheck` — PASS. `npm run lint` — PASS (0 new; 58 pre-existing elsewhere, CSS file not in biome's scope). `node scripts/axe.mjs /welcome` — PASS (0 violations, all impacts). `node scripts/axe.mjs /stage-01-spec-aware-vibe-engineering/04-backend` — PASS (0 violations).
- Prompt variant (if applicable): none. A one-question direction check with three CSS previews was used before implementation; the owner selected the third option.
- Next experiment (smallest change to try): when a shared visual rule changes, screenshot the *whole* reader-facing page in both themes and diff it against the previous build, rather than inspecting only the edited component — that would have caught the dark-mode "rail reads recessed rather than raised" nuance as a rendered fact instead of as a note in this record. Also: prefer Playwright (already a project dep) over `Invoke-WebRequest` for any future dev-server reachability check, since it is not fooled by the `Accept` header.
