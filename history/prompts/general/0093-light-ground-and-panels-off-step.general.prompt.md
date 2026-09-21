---
id: 0093
title: Light-mode page ground to silver-0.75 and both panels to silver-1.5
stage: general
date: 2026-09-15
surface: agent
model: unknown (Command Code session; no model id exposed to the agent)
feature: none
branch: none
user: afnanzahed@gmail.com
command: none
labels: ["design-tokens", "silver-ramp", "color-mix", "sidebar", "toc", "light-mode", "accessibility"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - edu-site/src/css/custom.css (light block: `--tbb-bg` set to `color-mix(in oklab, var(--tbb-silver-0) 25%, var(--tbb-silver-1) 75%)` and both `--tbb-sidebar-bg` / `--tbb-toc-bg` to `color-mix(in oklab, var(--tbb-silver-1) 50%, var(--tbb-silver-2) 50%)`; `--tbb-sb-quiet` light value moved to the silver-5/silver-6 mix; new panel-scoped `--tbb-toc-quiet` added on `.table-of-contents` with a dark override, now read by the TOC eyebrow and the nested links; the ramp-job comment table updated for steps 0, 1, 6, 7 plus a new note on the three off-ladder grounds; four ratio figures corrected across three comments)
 - edu-site/docs/changelog.md (new bullet appended under the existing 2026-09-15 date)
 - history/prompts/general/0093-light-ground-and-panels-off-step.general.prompt.md (this file)
tests:
 - Measured both candidate tones before touching the file, by rendering them and reading the pixel: silver-0.75 = `#F5F6F7`, silver-1.5 = `#E9EAEC`
 - Identified the contrast consequence before implementing it: the panels' small text reads `--tbb-text-muted` (silver-5), which measures 4.77:1 on silver-1 but **4.40:1** on silver-1.5 — under AA's 4.5, and invisible to axe because a `color-mix()` ground returns an incomplete result rather than a violation
 - After implementing, verified every ink/ground pair on the changed surfaces by sampling rendered pixels and resolving colours through a canvas: light panels `#E9EAEC` with sidebar quiet at 5.78:1, TOC quiet 5.78:1, TOC top-level link 17.45:1; light reading column `#F5F6F7`; dark panels `#0E0F11` with sidebar quiet 10.96:1, TOC quiet 6.69:1, TOC top-level 19.18:1; dark reading column `#000000` (unchanged, as asked)
 - Also confirmed the reading-column ground landed at `#F5F6F7` in light and `#000000` in dark, by pixel-sampling the rendered page rather than trusting the token
 - `node scripts/axe.mjs` equivalent run with the theme forced, on the built site, both themes, on `/welcome` and `/stage-01-spec-aware-vibe-engineering/04-backend`: 0 violations at every impact level in all four runs
 - `npm run build` — PASS (12 chapters checked, 20 skipped, 0 errors, 1 pre-existing `safety-floor-absent` warning on `welcome.md`)
 - `npm run typecheck` (tsc) — PASS, no output
 - Grepped every consumer of the tokens touched before changing them: `--tbb-sidebar-bg` feeds the sidebar container plus its translucent 72% header mix (follows automatically), `--tbb-toc-bg` feeds only `.table-of-contents`, and `--tbb-bg` feeds the body ground
---

## Prompt

"also, in the light mode, make the sidebar's backgrounds silver 1.5 and overall chapter's background 0.75 in light mode and 9 in dark mode"

## Response snapshot

Read the request as: light-mode panel grounds to silver-1.5 (both panels, matching the pairing established in the previous turn, since the request says "backgrounds" plural), and the reading ground to silver-0.75 in light. The dark reading ground was already silver-9 — the absolute black end of the ramp — so that half of the request was already satisfied and nothing changed there. Flagged the both-panels reading explicitly rather than assuming it silently.

**Measured the consequences before editing anything**, which is what made this worth a question rather than a commit. Two things fall out of those two tones:

1. **The panels' labels drop below AA.** Both panels' small text reads `--tbb-text-muted` (silver-5): 4.77:1 on today's silver-1, but **4.40:1** on silver-1.5. Under the 4.5 floor. Worth stating plainly: **axe cannot catch this** — a `color-mix()` background makes axe return the pair as "incomplete" rather than as a violation, so the automated gate stays green either way and only the measurement guards it.
2. **Cards get much softer.** Tables, callouts and every silver-1 surface sit ΔL\* 4.2 above the white page today. Against a silver-0.75 ground that becomes ΔL\* 1.0 — roughly three-quarters of their tonal lift gone, with the border and shadow left to carry the separation.

Surfaced both with the measured numbers and offered four resolutions. The owner chose to keep his tones and nudge the panel label ink, so:

- light `--tbb-bg` → the silver-0/silver-1 mix at 25/75, i.e. silver-0.75
- light `--tbb-sidebar-bg` and `--tbb-toc-bg` → the silver-1/silver-2 mix at 50/50, i.e. silver-1.5
- light `--tbb-sb-quiet` → the silver-5/silver-6 mix at 50/50, i.e. silver-5.5, taking the sidebar's labels from 4.40:1 to 5.78:1
- a new panel-scoped `--tbb-toc-quiet` on `.table-of-contents` (light: the same silver-5.5; dark: `--tbb-text-muted`, i.e. silver-4) now read by the TOC eyebrow **and** the nested links — the eyebrow was a second failing site that only turned up while auditing which inks sit on that ground, and fixing only the nested links would have left a real AA failure behind

Dark mode was left alone entirely: its panels stay at silver-7.85 and its page at silver-9.

All three off-step tones are written as `color-mix()` between the two ramp steps either side, so the ladder stays closed at ten and each follows automatically if the ramp is re-tuned.

**Comment maintenance, again the bulk of the work.** The ramp-job table in `custom.css` enumerates what each ramp step is *for*, so moving two grounds falsified it: steps 0 and 1 no longer describe the reading-column and panel grounds. Steps 6 and 7 turned out to be stale too — they still named the sidebar and TOC grounds that the *previous* turn had already moved, which I had missed. Corrected all four, and added a note that three grounds now sit deliberately off-ladder (light column 0.75, light panels 1.5, dark panels 7.85) so they appear in no row. Three ratio figures that quoted the old ground were also corrected: `--tbb-text-subtle` on the light panel measures 2.38:1 now, not 2.58:1, in the quiet-ink rationale, the small-text note, and the chapter-state promotion note (which also quoted "4.77:1 or better" for rows that now sit at 5.78:1).

## Outcome

- ✅ Impact: Light mode's reading ground is off-white (`#F5F6F7`) and both document panels sit at silver-1.5 (`#E9EAEC`), with the panels' small labels nudged one half-step to stay above AA at 5.78:1. Dark mode is untouched. Every ink/ground pair on the changed surfaces verified against real rendered pixels, in both themes, and all clear AA.
- 🧪 Tests: See `tests:` above — build, typecheck and axe (both themes, forced) all green, plus targeted pixel-measured contrast for the six pairs the change affects.
- 📁 Files: See `files:` above.
- 🔁 Next prompts: Two things worth the owner's eye on the rendered light-mode page. (1) The ΔL\* 1.0 between the page and its cards is a real softening — the tables and callouts now depend on their border and shadow rather than their fill, which may be exactly the intent, but it is a bigger change than the two numbers suggest. (2) Pure white is now unused as a ground anywhere, so if any surface was relying on white reading as "the page", it will have moved with it. Also still outstanding from earlier: the "near-linear, tightened slightly at the white end" claim in `radix.css`, and a full pass over the ramp-job table for any remaining drift.
- 🧠 Reflection: Measuring first was the whole value of this turn. Two lines of CSS produced an accessibility regression that the automated gate is structurally unable to see, and a knock-on to every card on the site; neither is visible from reading the diff. The pattern worth keeping is the order — measure the consequences of a requested value, surface them, then commit — because the requested value here was easy and its side effects were not.

## Evaluation notes (flywheel)

- Failure modes observed: two, both in the verification tooling rather than the change. First, I attempted a generic contrast sweep of every text node in each region instead of the targeted pair measurement that had already proven itself; it went through three iterations and was never trustworthy — it flagged false positives from gradient backgrounds and from ancestor-painted backgrounds (the collapse handle's pill), then, once made alpha-aware, silently measured nothing at all ("checked 0, skipped 36") because a parse guard I added rejected every value. It was abandoned in favour of (a) the canvas-based pair measurement, which agreed with hand-computed ratios to two decimals earlier in the session, and (b) a static audit of which tokens are actually read on each panel ground. The lesson: when a verification tool's output changes character after a fix, suspect the tool before believing the result — "ALL PASS" from a sweep that skipped every node is not a pass. Second, a small one: a pixel sample of `body` at 90% width to get the "page ground" actually sampled the right-hand TOC panel sitting over it, which is a useful reminder that sampling a ground by element selector beats sampling by screen position.
- Graders run and results (PASS/FAIL): `npm run build` — PASS. `npm run typecheck` — PASS. axe (light + dark, `/welcome` and a chapter page) — PASS, 0 violations in all four runs. Pixel-measured contrast for the six affected pairs — PASS.
- Prompt variant (if applicable): none. One question was asked before implementation, with measured consequences and four resolutions; the owner chose to keep both tones and nudge the panel label ink.
- Next experiment (smallest change to try): a small reusable script that takes a list of (ink token, ground token) pairs and prints measured ratios for both themes — the pairing question comes up every time a ground moves, and a checked-in version would replace the ad-hoc scripts rebuilt each turn.
