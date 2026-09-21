---
id: 0096
title: Right rail made collapsible, and the reading measure inverted from a fixed width to a constant gap
stage: general
date: 2026-09-16
surface: agent
model: unknown (Command Code session; no model id exposed to the agent)
feature: none
branch: none
user: afnanzahed@gmail.com
command: none
labels: ["layout", "reading-measure", "toc", "swizzle", "collapse", "container-relative", "typo-measurement", "bug-found-by-measurement", "principle-vii", "adr-pending"]
links:
  spec: specs/001-book-foundation/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - edu-site/src/css/custom.css (the measure rule at `article` — `--tbb-prose-measure` inverted from `min(100%, 35rem)` to a constant-gap `min(100%, max(35rem, calc(100% - (2 * var(--tbb-prose-gap)))))`; the duplicate `max-width` removed from `.theme-doc-markdown`, which was a live bug (see below); the "ON THIS PAGE" `::before` retired; a new `@media (min-width: 997px)` block sizing the folded TOC column and lifting the article column's cap)
 - edu-site/src/theme/TOC/index.tsx (NEW — full eject of @theme/TOC 3.7.0. Panel shell, header row carrying the eyebrow and one handle, the collapsed rail, and the disclosure wiring.)
 - edu-site/src/theme/TOC/styles.module.css (NEW — the shell's sticky geometry, the panel ground repeated onto it for the new header row, the handle and its states, the folded state, the mobile hide, the reduced-motion override)
 - edu-site/src/theme/TOC/useTocCollapse.ts (NEW — the fold state, mirrored onto `<html data-tbb-toc-collapsed>` and persisted to sessionStorage under `tbb-toc-collapsed`)
 - edu-site/src/components/SidebarPanelGlyph/index.tsx (a `side?: "left" | "right"` prop, mirroring the whole mark about the viewBox axis, so the right rail reuses the house glyph instead of growing a parallel one)
 - edu-site/docs/changelog.md (two reader-facing bullets under 2026-09-16)
 - history/prompts/general/0096-toc-collapse-and-measure.general.prompt.md (this file)
tests:
 - `npm run typecheck` — PASS. Run before anything else specifically to find out whether `import type { Props } from "@theme/TOC"` resolves (the theme `.d.ts` files self-reference `@theme/X` for their Props, which looks circular); it does, so the swizzle follows the existing CollapseButton convention rather than inventing a local prop interface.
 - `npm run build` — PASS four times across the change (initial, after the double-constraint fix, after the hit-target change, after the eyebrow layout fix), all five content gates plus the Docusaurus build each time.
 - **Baseline measured, not remembered.** Ran the measurement harness against the LIVE deployed site first, which was still the pre-change state, so the before numbers come from the same instrument as the after numbers. This mattered: the obvious reading of the live site was "117px of margin at 1440px", and the harness returned col 791 / article 560 / gap 115 / 71 chars — plus the fact that made the whole complaint legible: collapsing the LEFT sidebar took the gap from 115px to **216px** while the article stayed pinned at 560px. The collapse was making the whitespace worse, not better.
 - Geometry across all four rail states at 1440px, live and local, identical in both: both open — col 791, article 623, gap 84, ~80 chars (para-median 78.4); left folded — col 992, article 824, gap 84 (99.7); right folded — col 1026, article 858, gap 84 (105), TOC column 44; both folded — col 1294, article 1126, gap 84 (131). Baseline for the first of those was article 560 / gap 115 / 71.
 - **No regression below the floor**, which is the risk a fluid measure carries: at 1280px the article is 560 / gap 55, at 1024px 479 / gap 0, at 390px 332 / gap 0 — every one identical to the live baseline, and the right rail reports 0 toggle buttons and 0 TOC column on mobile, so the swizzle is inert there.
 - **The animation is real, not assumed.** Sampled the article width every 40ms across the collapse: 738, 784, 823 on the way from 623 to 824 (and the same shape in the other direction). Confirms `max-width` actually interpolates `75% -> calc(100% - 44px)` rather than snapping, which is what makes the prose reflow in step with the rail instead of after it.
 - 18 automated checks on the deployed URL, all PASS — disclosure contract (`aria-expanded` true->false, `aria-controls` set and resolving to a real element, label switching to name the expand action, Enter re-expanding via native button activation, focus ring present at 2px accent); collapsed links leaving the tab order (`visibility: hidden` confirmed, and a collapsed link refusing focus); `<html data-tbb-toc-collapsed>` set; 44px hit area probed at all four corners of the target box; persistence (survives a chapter change, fresh session starts expanded); reduced motion (reflow snaps, visibility handoff delay is 0s); and axe clean in BOTH the expanded and collapsed states (0 violations each).
 - Screenshots read back and inspected in both themes, expanded and collapsed — which is how the invisible-handle bug below was caught after every programmatic check had already passed.
 - `git` not used at all except the read-only `remote -v` in PHR 0095. No commit, no branch.
---

## Prompt

"the main content's 2 sides have more free space, which is looking bad, reduce them by 50%, also auto expanding when any sidebar will collapse. also, make the right sidebar also collapsible as beautifull as the left one is"

Plan mode was entered and approved before any code was written, because this spanned files not yet read (the theme's sidebar machinery, the TOC, the layout CSS) and had genuine architectural choices in it. Three decisions were then put to the owner and locked:

| Question | Answer |
|---|---|
| Gap target | **Capped at ~80 characters.** Side gap 119px -> 84px at 1440px. ~30% off the gap, deliberately not the literal 50%. |
| Collapsed width | **Fill the freed space.** No ceiling. |
| Persistence | **Session only**, `sessionStorage`. |

## Response snapshot

Exploration first, and it changed the plan twice. Three findings mattered:

1. **The whitespace was a single dial, and it was the wrong kind of dial.** `custom.css:1385` set a FIXED measure — `min(100%, 35rem)`. A fixed width cannot do either of the two things being asked of it. It cannot halve a *gap*, because the gap is `(column - measure) / 2` and the column varies with the viewport: one rem value leaves 119px of dead space at 1440px, 59px at 1280px and none at 1024px. And it cannot reclaim collapsed space, because when a rail folds the column grows while the measure does not — which is precisely why folding the sidebar measured 216px of gap instead of 115px.

2. **So the fix was to invert it: hold the gap constant and let the measure fill the rest.** `min(100%, max(35rem, calc(100% - (2 * var(--tbb-prose-gap)))))`. `100%` resolves against the article's containing block, which is the box that already changes when either rail folds — so the prose grows to meet the space with no JavaScript, no state to sync, and no transition of its own. It moves in lockstep with the rail's 200ms width transition because its width is a function of that same box, which is also what the mid-transition sampling later confirmed. The `max(35rem, ...)` floor is what holds every narrow viewport exactly where it was.

3. **Auto-expand therefore needed no state at all for the left rail** — which is fortunate, because Docusaurus gives none. The left sidebar's collapsed flag is local `useState` inside `node_modules/@docusaurus/theme-classic/lib/theme/DocRoot/Layout`, carried in *hashed* CSS-module class names, with no hook, context or export reaching it. A `cqw` container-query measure was considered and rejected: it would also be fluid, but it needs `container-type: inline-size` injected into the theme's column, and a pure percentage cannot produce the constant-gap "fill" that was chosen.

The right rail was greenfield: `src/theme/` had no `TOC*` file at all, the rail being stock `@theme/TOC`, with its "ON THIS PAGE" eyebrow a pure-CSS `::before` that explicitly existed to avoid a swizzle. A collapse handle needs a row to sit in and a pseudo-element cannot host a button, so the eyebrow became markup and the type rules moved with it.

## Outcome

- ✅ Impact: **live at https://the-bridge-balance.vercel.app** (deployment `https://the-bridge-balance-9c16mxfnd-afnans-projects-3dde1fd5.vercel.app`). The reading column's side margins at 1440px are 84px against 115px before, the line carries ~80 characters against 71, and — the actual complaint — folding a rail now *shrinks* the margin instead of widening it: 115px -> 216px is gone, replaced by 560px -> 824px of text at a constant 84px margin. The right rail folds from 280px to a 44px rail carrying the same mark as the left rail's, on the same 200ms clock, persisted for the session.
- 🧪 Tests: See `tests:` above. The load-bearing ones are the live baseline measured with the same instrument as the result, the four-state geometry, the no-regression check at 1280/1024/390, the mid-transition sampling, and the 18 deployed checks.
- 📁 Files: Two new files under `src/theme/TOC`, one new hook, one extended component, and two blocks plus one deletion in `custom.css`.
- 🔁 Next prompts: (1) **ADR-0006 is still unwritten and now has more in it.** It was already owed for the heading-underline and blanket-emphasis decisions; this change *revises* one of them, so the measure decision belongs in the same record, and the "no ceiling when collapsed" choice is a second item that wants stating — it is an explicit, owner-approved departure from a measure that is otherwise held to ~80 characters. (2) The `.commandcode/taste/taste/taste.md` line claiming headings use Black Ops One/Oswald at weight 400 still contradicts the shipped code; taste files are machine-managed so it was only surfaced, never edited. (3) `npm run lint` still fails repo-wide on biome's `lineEnding: "lf"` against this CRLF repo — pre-existing, untouched.
- 🧠 Reflection: **measurement caught two bugs that reasoning did not, and one of them was introduced by the previous paragraph of reasoning.** The first: `.theme-doc-markdown` also set `max-width: var(--tbb-prose-measure)`, which was a harmless duplicate while the measure was a fixed value and became a real defect the moment it became a `calc()` — the variable is declared on `article`, so re-reading it on the descendant re-resolved the `100%` against the already-narrowed article and subtracted the gap twice. The article grew to 623px while the text stayed at 560px. What surfaced it was a *contradiction in the numbers*: chars-per-line came back identical at 560px and at 623px, which cannot happen with one font. Chasing the contradiction found the bug. The second: the eyebrow was hidden with `visibility` while collapsed, which leaves layout intact, so a ~70px eyebrow plus the handle overflowed a 43px rail and pushed the 36px handle to x=1437 — outside the rail that ends at 1430, off the viewport, and clipped. Every programmatic check had already passed by then, including the axe scan and the hit-area probe, because the DOM was correct and the button was focusable; only reading the rendered screenshot showed nothing there. Both bugs share a shape worth naming: **each was invisible to the check that seemed to cover it.** The assertion "the text is wider" was not in any test, only in the geometry; the assertion "the control is visible" was not in any test, only in the image. The lesson recorded three prompts running now holds in a new form: when a count disagrees with something you can see, suspect the count — and when every check passes, look at the thing.

## Evaluation notes (flywheel)

- Failure modes observed: three, and two of them were mine rather than the tooling's.
  First, **a biased instrument that reported a false regression.** The original chars-per-line estimator was `chars / round(height / lineHeight)`, which under-counts because a paragraph's last line is usually partial, and under-counts *more* as the column widens and each paragraph loses lines. Measured on the live site it read 82.8 at a 560px measure while the project's own historical figure for the same layout was 71 — a 15% spread that would have made any before/after claim meaningless if the two sides had been measured with different rulers. Replaced with a geometric measurement: the average character advance probed in the live computed font against a realistic sentence, divided into the measure. Both sides were then re-measured with the new ruler so the comparison is apples to apples. **The absolute number is instrument-dependent and both are reported**: 71 -> 78.4 on the paragraph-median ruler, 82.8 -> 92.0 on the geometric one. The *delta* is the same (~11%, matching the 11% width increase) and that is the honest claim.
  Second, **the double-subtracted measure**, described in Reflection above — a defect introduced by this change, found by a numeric contradiction, not by review.
  Third, **the overflowing collapsed handle**, also described above — a defect introduced by this change (the wrong CSS property for a piece of chrome that had to leave the flow), found by looking at a screenshot after 18 checks passed.
  There was also one near-miss worth recording: the plan asserted `max-width` would interpolate `75% -> calc(100% - 44px)`. That was a plausible reading of CSS Values 4 rather than a verified fact, and the whole "text reflows in lockstep" property depends on it. It was verified by sampling mid-transition (738, 784, 823 between 623 and 824) rather than left as an assumption in a comment.
- Graders run and results (PASS/FAIL): `npm run typecheck` — PASS. `npm run build` — PASS x4, all five gates each time. Vercel build — PASS. Live geometry at 1440 in four states — PASS, identical to local. Live geometry at 1280/1024/390 — PASS, byte-identical to the pre-change baseline. Mid-transition sampling — PASS (ANIMATES). Disclosure/a11y/persistence/reduced-motion/axe — PASS, 18/18, on the deployed URL. `npm run lint` — FAIL, pre-existing and repo-wide.
- Prompt variant (if applicable): one planning question set, three decisions, all answered before implementation. Nothing was asked during implementation; both bugs were mine to find and were found by measurement.
- Next experiment (smallest change to try): put the two assertions that had to be made by eye into the harness — "the prose measure grew by the same ratio as its container" and "the collapsed handle's box lies inside the rail's box". Both are one-liners against geometry already being collected, and each would have converted a manual catch into an automatic one. The general form worth trying: for any change to a width relationship, assert the *relationship* rather than the two endpoints, because both bugs here were relationship errors that every endpoint check accepted.
