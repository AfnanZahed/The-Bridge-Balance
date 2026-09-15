---
id: 0084
title: Logo AI prompt, color tokens only
stage: general
date: 2026-09-15
surface: agent
model: claude-sonnet-5
feature: none
branch: none
user: afnanzahed@gmail.com
command: none
labels: ["brand", "logo", "image-prompt", "color-tokens", "oklch"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files: []
tests:
 - No gate applies — chat-delivered text only, no repo files edited.
 - Verified rather than guessed: converted `--tbb-accent` (light and dark) and three `--tbb-silver` steps from OKLCH to sRGB hex with a real CSS-Color-4 conversion script (Node, run and discarded from the scratchpad), not eyeballed. Cross-checked two of the outputs (#45484B, #95999D) against literal hex already committed in the pre-existing `edu-site/static/img/logo.svg` — exact match, confirming the conversion is correct.
---

## Prompt

Turn 1 (verbatim): "Now, come to the logo designing of the bridge balance, you already know the details of the platform, write me AN AI prompt for the AI (image generator), to ask it to designultra attarctive, Highly professional, literally international level, and extremely great Logo, include all the details of the book and the main idea, also the color tokens of the book's website"

Turn 2 (verbatim): "the logo which is built by AI using YOUR prompt is actually the same as the logo we already have. I actually want a brand new, from scratch, 100 NEW logo." — followed immediately by: "you don't give any design related details to AI image geenrator, just the color tokens, not the design ones. leave 100% creativity to AI"

Turn 3 (verbatim): "In the prompt, tell them about both extremes and how we balance them"

## Response snapshot

**Turn 1.** Before writing anything, discovered the platform already has a real, hand-built identity system — not a blank page: `edu-site/src/components/BrandMark/index.tsx`, `static/img/logo.svg` / `logo-mark.svg`, and a stub `brandkit` skill. The existing mark is a "tied arch" (deck + two spans meeting at a keystone), documented in its own code comments as reading simultaneously as a bridge, a balance beam, and two converging paths — already the exact concept the name argues. Wrote a fully-specified prompt that asked the image generator to produce a premium render of *that same* existing concept, in its two already-committed color treatments (brushed-metal monochrome; violet-indigo `#5B4CF6` + coral keystone `#FF7849`), reasoning this satisfied "nothing from a blank page" by building on established work rather than restarting.

**Turn 2 — the read was wrong, corrected directly.** The owner tried the prompt (or judged it by inspection) and found the result indistinguishable from the mark that already exists — which is exactly what a prompt that re-specifies the existing geometry will produce. They want a **genuinely new** mark, and named the actual fix: strip every design instruction (shape, composition, style references, avoid-list) and hand the image generator **only the color tokens**, leaving concept/symbol/composition/style entirely to it. Rewrote from scratch on that basis. Also dropped the old mark's bespoke indigo/coral (colors chosen *for that specific design*, not general site tokens) in favor of the actual website design-system colors — `--tbb-accent` and the `--tbb-silver` neutral ramp — since those are what "the book's website's color tokens" from Turn 1 actually meant. Computed exact hex via a real OKLCH→sRGB conversion script rather than estimating, and cross-validated two outputs against literal hex already in the codebase (exact match).

**Turn 3.** Distinguished *meaning* from *design instruction*: naming the brand's actual idea (the two failure extremes with an AI coding agent — blind trust vs. blind rewriting — and the discipline that balances them) is context the generator can use to inform its own concept, not a prescription for what shape to draw. Added it as prose explaining what the name means, with no visual-metaphor language (no "arch," "scale," "path," "symbol," or similar) so the creative decision of *whether and how* to visualize it stays entirely with the model, honoring Turn 2's correction while answering Turn 3's actual ask.

## Outcome

- ✅ Impact: Owner has a color-tokens-only, fully open-creative logo prompt with the brand's real palette (verified hex) and its actual meaning, and no repeat of the existing mark's geometry.
- 🧪 Tests: See `tests:` above.
- 📁 Files: None — chat-delivered prompt text only, by design (this project's standing rule: Claude writes text, not images; the owner runs the generator).
- 🔁 Next prompts: None required. If the generated options are promising, a natural follow-up is deciding whether any of them replace `logo.svg`/`BrandMark` outright or stay marketing-only art alongside the existing coded, animated, theme-aware SVG mark — flagged once already in Turn 1's response, still an open decision for whenever real output exists to judge.
- 🧠 Reflection: Turn 1's failure mode is worth naming precisely: "include all the details of the book and the main idea" was read as license to over-specify, when paired with "you already know the details of the platform" it more likely meant *don't make me re-explain context you already have* — not *constrain the visual output with everything you know*. The correction in Turn 2 was really about that distinction, not about the specific concept chosen.

## Evaluation notes (flywheel)

- Failure modes observed: Turn 1 over-specified design (concept, composition, style references, avoid-list) when the owner wanted open creative exploration — corrected in Turn 2, recorded as a standing preference in memory (`logo-prompt-color-tokens-not-design`) so it does not recur on the next image-prompt request for this project.
- Graders run and results (PASS/FAIL): n/a — no code gate applies to this deliverable.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none pending.
