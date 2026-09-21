---
id: 0091
title: Whether half ramp steps like silver-1.5 are possible
stage: explainer
date: 2026-09-15
surface: agent
model: unknown (Command Code session; no model id exposed to the agent)
feature: none
branch: none
user: afnanzahed@gmail.com
command: none
labels: ["design-tokens", "silver-ramp", "color-mix", "oklch", "reference"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/0091-half-ramp-steps.explainer.prompt.md (this file; no source file changed — this records an answer, not an edit)
tests:
 - Read the ramp's own definition and rationale in `edu-site/src/css/radix.css` (lines 22–63) and the ramp-job comment table in `edu-site/src/css/custom.css`
 - Rendered all ten steps plus two hypothetical half-steps plus the `color-mix()` equivalents as live swatches in Chromium 151 and sampled the centre pixel of each, to get real sRGB values rather than converting on paper
 - Verified all three candidate techniques actually resolve in this browser rather than assuming support: a literal `oklch()`, `color-mix(in oklab, …)`, `color-mix(in oklch, …)`, and CSS relative color syntax `oklch(from … calc(l - 0.0275) c h)`
 - Measured the adjacent-step OKLCH lightness gaps to establish where on the ramp a half-step would and would not be perceptible
---

## Prompt

"tell me whether the points are possible? like silver 1.5 or silver 8.5????"

## Response snapshot

Answered in three layers — whether the tokens exist, whether the colour can be produced, and whether it is worth producing — from rendered values rather than from reasoning about the palette.

**Not as tokens.** The ramp is ten hand-authored literals in `radix.css`, not a formula over an index, so there is no arithmetic that would make `--tbb-silver-1-5` resolve. It does not exist today, and nothing in the codebase reads a ramp step by number.

**But the colour is trivially producible, and all three routes were verified to work** (each rendering to `#E9EAEC`, the exact midpoint of silver-1 and silver-2):

- a literal — `oklch(0.9375 0.003 250)`
- `color-mix(in oklab, var(--tbb-silver-1), var(--tbb-silver-2))` — exact, not approximate, because OKLCH's L *is* OKLab's L, so mixing in either space interpolates lightness linearly; `in oklch` produced the identical value
- relative colour syntax — `oklch(from var(--tbb-silver-1) calc(l - 0.0275) c h)`

**Whether it is worth it depends entirely on where on the ramp, because the ramp is not evenly spaced.** The real adjacent-step lightness gaps are `0.035, 0.055, 0.090, 0.140, 0.150, 0.130, 0.130, 0.120, 0.150` — the light end is roughly four times tighter than the middle, not "near-linear, tightened slightly at the white end" as the ramp's own comment claims.

Rendered steps, measured:

| step | OKLCH L | sRGB |
|---|---|---|
| silver-0 | 1.00 | `#FFFFFF` |
| silver-1 | 0.965 | `#F2F3F5` |
| *silver-1.5* | *0.9375* | *`#E9EAEC`* |
| silver-2 | 0.91 | `#DFE1E4` |
| silver-3 | 0.82 | `#C1C4C8` |
| silver-4 | 0.68 | `#95999D` |
| silver-5 | 0.53 | `#686C70` |
| silver-6 | 0.40 | `#45484B` |
| silver-7 | 0.27 | `#242729` |
| silver-8 | 0.15 | `#0A0B0D` |
| *silver-8.5* | *0.075* | *`#010102`* |
| silver-9 | 0.00 | `#000000` |

So `silver-1.5` sits about 9 code values from each neighbour — invisible as a standalone surface. And `silver-8.5` is worse than that: the whole silver-8 → silver-9 step spans only about ten sRGB code values, because the ramp compresses hard near black, so a half-step there is roughly five and cannot be told apart from either end. The only place a half-step would actually buy something is the middle of the ramp — silver-3.5, 4.5 or 5.5 — where the gaps are 0.13–0.15, three to four times the light end's.

**Recommendation offered:** do not mint fractional ramp steps. `radix.css` states all ten steps are meant to be in active use rather than two or three doing all the work, and the comment table in `custom.css` assigns every step a named job; a `silver-1.5` has no job, and unnamed in-betweens are the drift that has already forced the ramp to be re-tuned more than once. For a one-off blend, use `color-mix()` — the technique the codebase already uses for `--tbb-border` and `--tbb-heading-ink`. If a new tone genuinely needs to exist permanently, give it a job-named token the way `--tbb-surface-emphasis` and `--tbb-code-bg` do, rather than a fractional index. If the middle of the ramp really needs finer spacing, the honest fix is re-tuning the ramp as a whole, which touches every surface on the site and so is a decision, not a tweak.

**Second stale comment found, not fixed:** the ramp's own rationale says "Spacing is near-linear, tightened slightly at the white end". The measured gaps range from 0.035 to 0.150, so the white end is about a quarter the width of the mid-ramp. This sits alongside the TOC comment flagged in PHR 0090 (`silver-6` stated, `silver-8` actual) as a second inaccurate ramp-step claim in the comments. Both are one-line fixes and both were raised rather than edited unasked.

## Outcome

- ✅ Impact: None on the shipped site — no file changed. This record preserves the measured ramp table and the supported-technique list so the question does not have to be re-derived.
- 🧪 Tests: See `tests:` above — swatches rendered and pixel-sampled in Chromium 151; all three candidate techniques confirmed to resolve rather than assumed; lightness gaps computed from the authored values.
- 📁 Files: This PHR only.
- 🔁 Next prompts: Two one-line comment corrections are now outstanding and related — the TOC's `silver-6`/`silver-8` claim (PHR 0090) and the ramp's "near-linear, tightened slightly" claim (this record). Worth doing together in one pass, and worth checking whether any other comment in `custom.css` or `radix.css` names a specific ramp step that has since moved.
- 🧠 Reflection: The thing worth keeping is that `color-mix(in oklab, …)` between two adjacent ramp steps lands on the exact OKLCH midpoint rather than an approximation. That makes half-steps a one-line expression the day one is genuinely needed, and it means the answer to "is 1.5 possible" is yes-if-you-want-it — which moved the real question to whether the ramp should stay a closed ten-step ladder, a design question rather than a technical one.

## Evaluation notes (flywheel)

- Failure modes observed: to avoid repeating PHR 0090's mistake, every technique was tested for *resolution* before being recommended — assigning the value and checking `style.background` came back non-empty and then sampling the rendered pixel. Two things this caught: the three routes converge on the identical hex (so the choice between them is legibility, not colour), and relative colour syntax returns a slightly different value depending on which neighbour it reads its chroma from (`#E8EAED` from silver-2 versus `#E9EAEC` from silver-1), which is the sort of detail that would otherwise have been asserted wrongly.
- Graders run and results (PASS/FAIL): Not applicable — no build or gate affected, since nothing shipped changed.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): the ramp-job comment table in `custom.css` is the best place to state, once, that the ramp is closed at ten and that in-between tones are expressed with `color-mix()` — a note there would answer this question for the next person without a round trip.
