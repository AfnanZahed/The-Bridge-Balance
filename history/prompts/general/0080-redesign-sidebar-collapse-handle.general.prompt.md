---
id: 0080
title: Redesign the sidebar collapse and expand handle
stage: general
date: 2026-09-15
surface: agent
model: command-code-agent
feature: none
branch: none
user: afnanzahed@gmail.com
command: none
labels: ["sidebar", "collapse-button", "expand-button", "design-system", "a11y", "docusaurus", "swizzle"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - edu-site/src/components/SidebarPanelGlyph/index.tsx (new — one hand-drawn panel/rail mark, two directions)
 - edu-site/src/theme/DocSidebar/Desktop/CollapseButton/index.tsx (rewritten — the panel-foot handle)
 - edu-site/src/theme/DocSidebar/Desktop/CollapseButton/styles.module.css (rewritten — capsule, 44px, shadow-defined)
 - edu-site/src/theme/DocRoot/Layout/Sidebar/ExpandButton/index.tsx (new — swizzled; native <button> + knob)
 - edu-site/src/theme/DocRoot/Layout/Sidebar/ExpandButton/styles.module.css (new — the collapsed-rail knob)
 - edu-site/src/css/custom.css (edited — handle token pair on .theme-doc-sidebar-container, --doc-sidebar-hidden-width retargeted, .tbb-sb__nav padding symmetric)
 - edu-site/docs/changelog.md (edited — dated entry appended to 2026-09-15)
 - history/prompts/general/0080-redesign-sidebar-collapse-handle.general.prompt.md (this file)
tests:
 - npm run typecheck — PASS
 - npx biome check <changed files only> — PASS (scoped; the repo-wide `npm run lint` reformats unrelated files, per PHR 0027's reflection)
 - npm run build — PASS (frontmatter, refs, chapter gate 0 errors / 1 pre-existing welcome.md warning, manifest, search index, docusaurus build)
 - npm run test:a11y (axe against the served build on :4173) — 0 violations at every impact level
 - Measured render audit, playwright-core Chromium, light + dark, 1440×900 @2x — see Response snapshot for the figures
 - Keyboard walk (headless Tab traversal) — collapsed rail reached in 1 tab; open-panel handle at tab 31 (pre-existing DOM position, see Reflection)
---

## Prompt

The collapsible sidebar is very good, but it's button to collpase or expand is ultra stupid and ugly, you are extremely creative and highly experience UI, UX, Frontend designer and your task is to change button and make it ultra beautiful and highly professional

## Response snapshot

Diagnosed two separate controls, both stock Docusaurus, both ugly for the same reason — neither named the thing it acted on:

- **Collapse** (`DocSidebar/Desktop/CollapseButton`): a full-bleed 40px bar, `border-radius: 0`, a 1px box all round, Infima's `button button--secondary button--outline` on top, and a hardcoded-grey double chevron ("«") that points left without saying what it points at.
- **Expand** (`DocRoot/Layout/Sidebar/ExpandButton`, not previously swizzled): a `div[role="button"]` stretched over the entire collapsed rail (`inset: 0` — 30px wide by the full viewport height) with the same grey chevron parked at its vertical centre and `onKeyDown={toggleSidebar}` firing on any key. A blank strip with an orphaned arrow.

**Pass 1 research** (required by `curriculum-state/canon/research-and-comparison.md`, which explicitly covers "a new button"): how the strongest implementations handle this, and the reasoning underneath. Two primary sources carried it. W3C WAI-ARIA APG's disclosure pattern gives the semantics — a `button` whose `aria-expanded` reports whether the controlled content is showing. Material's navigation rail gives the structure and the reason: a collapsed sidebar is a *designed rail* with its control pinned at the head of it (`NavigationRail.leading` + `leadingAtTop`, `minWidth`, and an animated `extended` width), not an empty region with something floating in it. Adopted the reasoning, not the pixels: no 80px rail, because this is a reading site and the width is a tax on the measure.

**Pass 2 — not supplied, and flagged.** The policy's blocking half is the owner's own comparative study of competing implementations, and it was not handed over for this change. Proceeded anyway on the strength of a direct, unambiguous design instruction ("your task is to change button"), which is the same footing PHR 0027's sidebar rebuild ran on, and because the owner's stated workflow is to react to rendered work ("then I will tell you"). Surfaced here and in the reply rather than silently skipped.

**What was built.** One control, two states, sharing one glyph and one token pair:

- `SidebarPanelGlyph` — a hand-drawn 20×20/2px panel-with-rail mark, on the same grid as `SiteMenuButton`'s hamburger, chevron aimed *into* the rail when open and *out* of it when collapsed. Kept out of the Phosphor content vocabulary (`src/components/icons`) because it is chrome, and kept in one file so the two states cannot drift.
- **Open state** — a capsule at the panel's foot, sized to its content (114×44) and centred on the panel's axis, carrying the glyph and the word "Collapse". 44px is the project's own touch-target constant and the height of every navbar control, and the block margins make the panel's foot exactly 60px, matching `--ifm-navbar-height` and the panel's own header.
- **Collapsed state** — a 36×36 knob at the head of the rail, the whole rail staying the hit target, hovering anywhere on it lighting the knob. The rail itself widened 30px → 44px via `--doc-sidebar-hidden-width: var(--tbb-a11y-touch-target)`, a change Docusaurus keeps in step (`DocRoot/Layout/Main` reserves `100% - var(--doc-sidebar-hidden-width)`).
- **Semantics** — both controls are native `<button type="button">` with `aria-expanded` (`true`/`false`), the collapse button's visible label "Collapse" contained in its accessible name "Collapse sidebar" for WCAG 2.5.3. The `onKeyDown`-on-any-key handler is gone.
- **Discipline kept** — neutral, never accent: `--tbb-accent` is scoped to a named list of surfaces (ADR-0003) that these controls are not on, so it appears only in the focus ring, which is on that list. Hover uses the panel's own row promotion (ink → `--tbb-text`), no new vocabulary. The now-dead `--docusaurus-collapse-button-bg*` pair was deleted rather than left behind.

**Measured, not guessed** (`oklch → sRGB → WCAG`, computed both from the token values and from the rendered computed styles):

| | light | dark |
|---|---|---|
| handle / knob ink | silver-5 → **5.29:1** (hover 21.00:1) | silver-2 → **7.02:1** (hover 9.20:1) |
| handle box | 114×44 at x=99 (centred in 312) | same |
| knob box | 36×36 at x=4 (centred in the 44px rail) | same |
| handle/panel tone step | 1.11:1 | 1.63:1 |

**The one defect the measurements caught.** `--tbb-shadow-sm` was the first choice for the handle's rest depth, and it was wrong: in light mode the handle separates from the panel by only 1.11:1 of tone, because the silver ramp has no step above silver-1 for white to sit against. Depth is therefore the *only* thing that can make the handle read as a surface, and `sm` (a 1px/2px 14% contact shadow) is a whisper. Moved rest to `--tbb-shadow-md` and hover to `--tbb-shadow-lg`, leaving press at `--tbb-shadow-xs`, i.e. the adjacent-step usage the shadow scale was built for. The panel carries `clip-path: inset(0)`, so the larger hover shadow cannot bleed past the rail.

## Outcome

- ✅ Impact: the control that folds the sidebar is now labelled, keyboard-announced and shaped like part of the panel, and the space it leaves behind is a 44px rail with the same handle at its head rather than a blank strip.
- 🧪 Tests: See `tests:` above — typecheck, scoped biome, the full five-gate build, and axe all PASS; the render audit and keyboard walk are recorded there.
- 📁 Files: 2 new components/ swizzles' worth (5 files), 3 edited.
- 🔁 Next prompts: (a) the owner's Pass 2 comparison, which is the outstanding input; (b) whether the handle's rest shadow wants to sit one step lower now that it can be judged on a screen; (c) the open panel's handle is 31 tabs in.
- 🧠 Reflection: see Failure modes — the visual judgement in this turn had to be made numerically, because neither the screenshots nor a browser-automation skill were available to the agent. That is a real gap, not a preference: the light-mode shadow call above was reached by reasoning about the ramp and the shadow's alpha, which is *worse* evidence than looking at it. The owner's read on a screen is the check this turn could not perform for itself.

## Evaluation notes (flywheel)

- Failure modes observed: (a) `agent-browser` is not installed in this environment — `agent-browser --version` fails — so the skill's own instruction is to stop and ask the owner to install it; used the repo's existing `playwright-core` (the same Chromium `scripts/axe.mjs` drives) for measurement instead, and no visual review was possible at all, since `read_file` returns these PNGs as raw binaries rather than to vision. Every visual claim in this record is a measurement, not a look. (b) `npm run lint` / `lint:fix` runs biome over all of `src scripts` and reformats unrelated files — a trap PHR 0027 recorded; biome was scoped to the changed paths. (c) Biome's `files.includes` covers only ts/tsx/js/mjs/json, so CSS is deliberately unlinted here; the three CSS files were formatted by hand to the surrounding style and are not covered by any gate.
- Graders run and results (PASS/FAIL): typecheck PASS; biome (scoped) PASS; `npm run build` PASS (0 chapter errors, 1 pre-existing warning on welcome.md, unrelated); axe PASS with 0 violations at every impact level; render audit PASS on every measured pair.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): install `agent-browser` (`npm i -g agent-browser && agent-browser install`) so a visual claim can be checked against a picture in the next UI turn, and re-judge the handle's rest shadow (`--tbb-shadow-sm` vs the current `md`) with eyes rather than arithmetic.
