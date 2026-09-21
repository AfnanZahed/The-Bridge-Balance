---
id: 0092
title: Both dark-mode docs panels moved to silver-7.85
stage: general
date: 2026-09-15
surface: agent
model: unknown (Command Code session; no model id exposed to the agent)
feature: none
branch: none
user: afnanzahed@gmail.com
command: none
labels: ["design-tokens", "silver-ramp", "color-mix", "sidebar", "toc", "accessibility", "dark-mode"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - edu-site/src/css/custom.css (dark block: `--tbb-sidebar-bg` and `--tbb-toc-bg` both set to `color-mix(in oklab, var(--tbb-silver-7) 15%, var(--tbb-silver-8) 85%)`; four comments corrected — the light-block "docs-chrome grounds" note, the sidebar rule's ground reference, the panel quiet-ink rationale, and the TOC rule's ground reference)
 - edu-site/docs/changelog.md (new bullet appended under the existing 2026-09-15 date)
 - history/prompts/general/0092-both-dark-panels-silver-7-85.general.prompt.md (this file)
tests:
 - Verified the mix reproduces the intended ramp point exactly, by rendering it and sampling the pixel: `color-mix(in oklab, silver-7 15%, silver-8 85%)` renders `#0E0F11`, and an independent literal `oklch(0.168 0.0043 250)` renders the same — L 0.168 being 85% of the way from silver-7's 0.27 down to silver-8's 0.15
 - Confirmed both panel grounds actually changed to that value on the running dev server, by sampling rendered pixels: sidebar `#0E0F11`, TOC `#0E0F11` (were `#242729` / `#0A0B0D`), and confirmed light mode is untouched at `#F2F3F5` for both
 - Measured the ink that sits on each changed ground, resolving colours through a canvas rather than a positioned probe (a first attempt sampled through the fixed navbar and returned nonsense — see failure modes), then computing WCAG ratios. Dark mode before → after: sidebar quiet ink 8.59:1 → 10.96:1; TOC top-level link 19.18:1 unchanged in kind; TOC nested link 6.86:1 → 6.69:1. Every pair clears AA, and nothing regressed by more than 0.17
 - Computed the full before/after contrast grid from ramp hexes measured off a real render, which is what surfaced the pre-existing mislabel recorded under "Outcome" — silver-4 on silver-7 is 5.24:1, while the 2.84:1 the old comment attributed to silver-4 actually belongs to silver-5
 - `node scripts/axe.mjs` equivalent run with the theme forced, on the built site, both themes, on `/welcome` and `/stage-01-spec-aware-vibe-engineering/04-backend`: 0 violations at every impact level in all four runs. Run with dark forced deliberately, since the change is dark-only and the stock `scripts/axe.mjs` audits whatever theme the page defaults to
 - `npm run build` — PASS (12 chapters checked, 20 skipped, 0 errors, 1 pre-existing `safety-floor-absent` warning on `welcome.md`)
 - `npm run typecheck` (tsc) — PASS, no output
 - Grepped `src/` for every consumer of both tokens before changing them: `--tbb-sidebar-bg` feeds the sidebar container and its translucent 72% header mix (which follows automatically), `--tbb-toc-bg` feeds only `.table-of-contents`; neither is read anywhere else, so the blast radius was exactly the two panels
---

## Prompt

"then make the backgrounds of both the sidbars' backgrounds color in dark mode 7.85"

## Response snapshot

Took "7.85" literally and precisely rather than eyeballing a dark grey, because it is well-defined: the ramp runs 7 → L 0.27 and 8 → L 0.15, so 7.85 is L 0.168, and the midpoint chroma works out to 0.0043 at the ramp's own hue 250 — i.e. `oklch(0.168 0.0043 250)`.

Expressed it as `color-mix(in oklab, var(--tbb-silver-7) 15%, var(--tbb-silver-8) 85%)` rather than minting a `--tbb-silver-7-85` primitive. Two reasons: it derives from the two real ramp steps, so it follows automatically if the ramp is ever re-tuned; and it keeps the ladder closed at ten, which is the discipline the ramp's own comment asks for. Mixing in `oklab` is exact here, not approximate — OKLCH's L *is* OKLab's L, and both steps share hue 250, so the interpolation lands precisely on the intended oklch value. Verified by rendering: the mix and the literal both produce `#0E0F11`.

The value change is two lines. It landed on exactly the intended tone and touched only the two panels, since a grep showed neither token is consumed anywhere else (`--tbb-sidebar-bg` also feeds the sidebar header's translucent 72% mix, which follows on its own).

**The larger part of the work was the comments**, because the change falsified several of them and this codebase names specific ramp steps in prose:

- The light block claimed the TOC sat "a notch further" than the sidebar, which was already untrue — in light mode both are silver-1. Corrected.
- The sidebar rule named its dark ground as silver-7. Updated.
- The TOC rule named its dark ground as silver-6, which was wrong twice over (the token has said silver-8 for some time) and is now wrong in a third way since both panels share a tone. Rewritten.
- The panel quiet-ink rationale was rewritten around the new ground with verified numbers.

One correction is worth calling out because it was not cosmetic: the quiet-ink comment claimed "silver-4 on silver-7 measures 2.84:1, under AA". Measured, silver-4 on silver-7 is **5.24:1** — it passes. The 2.84:1 belongs to **silver-5**, which is what dark mode's `--tbb-text-subtle` resolves to. So the comment's stated conclusion held (something does fail on that ground, which is why the panel-scoped token and the step up to silver-3 exist) but the step it named was the wrong one, and the sibling comment about small text using 2.58:1 was the light-mode figure, not dark. The rewritten comment now carries the correct pairs for both modes: silver-3 at 10.96:1, silver-4 at 6.69:1, silver-5 at 3.62:1 on the dark panel, and 2.58:1 for the light one.

**Consequences the owner should be aware of, none of which blocked the change:**

- The deliberate tonal hierarchy between the two panels is gone in dark mode. That hierarchy was documented (the TOC "a notch further… the least important chrome"), and collapsing it was the explicit instruction, but the TOC is no longer the quieter of the two.
- The sidebar got substantially darker, not slightly: L 0.27 → 0.168, i.e. `#242729` → `#0E0F11`. It sits much closer to the black page ground now, so its separation from the page rests more on its `border-right` than on its tone. This is the opposite direction from the rest of the dark block, where raised surfaces get *lighter*; worth an eye on the rendered page before treating it as settled.
- The panel-scoped quiet-ink override is no longer load-bearing for `--tbb-text-muted` — on the darker ground silver-4 would clear AA at 6.69:1, where it used to be tuned against a lighter panel. It is kept, because silver-5 (text-subtle) still fails at 3.62:1 and because silver-3 is the panel's designed tone. Recorded in the comment rather than changed, since dropping it would visibly dim the sidebar and was not asked for.

## Outcome

- ✅ Impact: Both dark-mode docs panels now sit on one tone, the ramp point 85% of the way from silver-7 to silver-8, exactly as asked. Light mode is untouched. No accessibility regression: the sidebar's labels improved from 8.59:1 to 10.96:1 and the TOC's nested links moved from 6.86:1 to 6.69:1, both well clear of AA. Four comments that the change falsified were corrected, and one pre-existing mislabel found in the process (see the Response snapshot).
- 🧪 Tests: See `tests:` above — build, typecheck and axe all green (axe run with the theme forced, since the change is dark-only), and every changed surface verified by sampling rendered pixels rather than by trusting the stylesheet.
- 📁 Files: See `files:` above.
- 🔁 Next prompts: The stale "near-linear, tightened slightly at the white end" claim in `radix.css` (PHR 0091) is still outstanding, and could go in one pass with any further comment-truthfulness sweep. Separately, whether the sidebar's new darkness reads well against the black page is a judgement only the owner can make on the rendered site.
- 🧠 Reflection: The instruction was one number, and the number turned out to be the easy part — it is exactly definable and one line expresses it. What actually took the care was everything the number invalidated: four comments, one of which had been quietly wrong about which ramp step it was measuring. That is the recurring pattern in this codebase, because its comments name concrete values; changing a value is cheap, and leaving the prose beside it true is the real work.

## Evaluation notes (flywheel)

- Failure modes observed: one, caught and fixed within the turn. The first contrast measurement resolved the ink colours by painting them onto a `position: fixed; left: 0; top: 0` probe element and screenshotting it — which sits directly under the translucent fixed navbar, so every ink sampled came back contaminated (light-mode quiet ink read `#E0E1E3` instead of `#686C70`). Switching to resolving colours through a 1×1 canvas `fillStyle` removed layout from the question entirely and produced values that then agreed exactly with hand-computed ratios. For any future colour-resolution task, use the canvas; for a colour under a translucent overlay, a positioned probe is unsafe.
- Graders run and results (PASS/FAIL): `npm run build` — PASS. `npm run typecheck` — PASS. axe (light + dark, `/welcome` and a chapter page) — PASS, 0 violations in all four runs. Real-render pixel checks of both grounds and the three ink pairs — PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): when a design value changes, list the comments that name it *before* editing the value, as a checklist — four sites surfaced here and one of them concealed a second, older error that only appeared once the numbers were recomputed from measured hexes rather than trusted.
