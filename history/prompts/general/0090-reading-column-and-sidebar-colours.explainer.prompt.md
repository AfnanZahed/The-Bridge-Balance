---
id: 0090
title: Which colours the reading column and the sidebars actually use
stage: explainer
date: 2026-09-15
surface: agent
model: unknown (Command Code session; no model id exposed to the agent)
feature: none
branch: none
user: afnanzahed@gmail.com
command: none
labels: ["design-tokens", "colors", "silver-ramp", "sidebar", "reference"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/0090-reading-column-and-sidebar-colours.explainer.prompt.md (this file; no source file was changed — this records an answer, not an edit)
tests:
 - Read the tokens in `edu-site/src/css/radix.css` (`--tbb-silver-0..9`) and both blocks of `edu-site/src/css/custom.css` (`:root` and `:root[data-theme="dark"]`) rather than answering from memory
 - Sampled the real rendered pixels off the running dev server (localhost:3000/welcome) for `body`, `article`, `.theme-doc-sidebar-container` and `.table-of-contents`, in both themes
 - Queried `getComputedStyle().backgroundColor` on `html`, `body`, `main`, `article`, `.theme-doc-markdown`, `.theme-doc-sidebar-container`, `.tbb-sb`, `.table-of-contents` and `nav.navbar`, in both themes, to establish which surfaces actually paint a fill and which stay transparent
---

## Prompt

"also, tell me what colors the main chapter's content background have? and also the sidebards backgrounds colors please? whether they are silver or grey?"

## Response snapshot

Answered from the real tokens and the real rendered pixels, not from memory. Findings:

**Reading column (main chapter content).** It has no background of its own — `main`, `article` and `.theme-doc-markdown` all compute to `rgba(0, 0, 0, 0)`. What shows through is the page ground, `body { background: var(--tbb-bg) }`: `--tbb-bg` = `--tbb-silver-0` in light (`oklch(1 0 0)`, renders `#ffffff`) and `--tbb-silver-9` in dark (`oklch(0 0 0)`, renders `#000000`). So the content ground is pure white / pure black, and it is the only surface on the page at a ramp extreme.

**Left sidebar.** `.theme-doc-sidebar-container { background: var(--tbb-sidebar-bg) }` — `--tbb-sidebar-bg` = `--tbb-silver-1` light / `--tbb-silver-7` dark. Renders `#f2f3f5` light, `#242729` dark.

**Right-hand TOC ("On this page").** `.table-of-contents { background: var(--tbb-toc-bg) }` — `--tbb-toc-bg` = `--tbb-silver-1` light / `--tbb-silver-8` dark. Renders `#f2f3f5` light, `#0a0b0d` dark.

**Silver or grey?** Silver is the project's name for it, and the name is accurate in a specific sense rather than a marketing one. There is exactly one neutral ramp — `--tbb-silver-0` through `--tbb-silver-9` — and every chrome surface above is a step on it. It is authored in OKLCH with a deliberately tiny chroma (0.002 at the light end rising to a peak of 0.008 through the mid-steps) at hue 250, so the steps are near-neutral with a faint cold/blue-grey cast rather than chroma-0 grey. That cast is visible in the rendered hex — `#f2f3f5` is 3 points higher in blue than in red, `#242729` runs R < G < B. The extremes are absolute and chroma-free by design: `silver-0` is `#ffffff` and `silver-9` is `#000000`. `radix.css` states the cap explicitly — at 0.008 the eye reads "cold metal", not "blue", and the ramp's chroma is not to be raised. So: "silver" names the ramp and the specular treatment built on it; the individual surfaces are near-neutral cool greys, and the reading column's white/black are neutral by definition.

For completeness, the other chrome fills on the page: navbar `--tbb-navbar-glass` = `oklch(1 0 0 / 0.8)` light / `oklch(0 0 0 / 0.8)` dark (frosted), code blocks `--tbb-code-bg` = `silver-2` / `silver-6`, tables `--tbb-bg-alt` = `silver-1` / `silver-8`, and the table header rail is the deep specular face (`silver-6 → silver-8 → silver-9`), the last of which was landed in PHR 0088.

**One latent defect surfaced while reading, not fixed.** The comment above the TOC rule in `custom.css` (the block beginning "Receded a notch further than the sidebar") states `--tbb-toc-bg = silver-1 light / silver-6 dark`. The dark value is stale — `custom.css` line 363 sets `--tbb-toc-bg: var(--tbb-silver-8)`, and the live token read confirms `oklch(0.15 0.004 250)`, which is `silver-8`. Left unedited because the owner asked a question rather than requesting a change; raised so it can be corrected deliberately. One-line fix.

## Outcome

- ✅ Impact: None on the shipped site — no file changed. This record exists so the answer, and the stale-comment finding, are traceable.
- 🧪 Tests: See `tests:` above — tokens read from source, colours confirmed by sampling rendered pixels and by computed-style queries in both themes.
- 📁 Files: This PHR only.
- 🔁 Next prompts: The `silver-6` → `silver-8` correction in the TOC comment is the obvious one-line follow-up if the owner wants it. A broader sweep for other stale ramp-step references in comments may be worth a pass at some point, since comments here name specific ramp steps and the ramp has been re-tuned more than once.
- 🧠 Reflection: The instructive part is that the two sidebars are *not* the same tone in dark mode even though they are identical in light mode — both are `silver-1` in light, but the sidebar is `silver-7` while the TOC is `silver-8` in dark, so the TOC sits a step closer to the black page. That asymmetry is deliberate (the TOC is the least important chrome) but it is exactly the kind of thing that reads as a mystery later unless the comment beside it is right, which is why the stale `silver-6` mattered enough to flag.

## Evaluation notes (flywheel)

- Failure modes observed: none in the answer. One methodological note worth keeping: the first attempt to resolve tokens to sRGB by assigning each custom property to a probe element and reading `backgroundColor` back did not work — Chromium returned the `oklch()` string unresolved instead of normalising to `rgb()`. Sampling the actual rendered pixels of each surface was the reliable method and should be the default for any future "what colour is this" question.
- Graders run and results (PASS/FAIL): Not applicable — no build or gate was affected, since nothing shipped changed.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): when a design question is answered from tokens, check whether the comments near those tokens still name the same ramp steps. Two of the three surfaces touched here had been re-tuned since their comments were written, and one of those comments had drifted.
