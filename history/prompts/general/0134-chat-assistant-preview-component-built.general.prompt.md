---
id: 0134
title: Chat assistant preview component built
stage: general
date: 2026-09-22
surface: agent
model: command-code-agent
feature: none
branch: none
user: Afnan Zahed
command: none
labels: ["ui", "component", "design-system", "chat-assistant", "preview", "accessibility", "stage-restructure"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - edu-site/src/components/ChatAssistant/index.tsx
  - edu-site/src/components/ChatAssistant/styles.module.css
  - edu-site/src/theme/Root.tsx
  - edu-site/src/css/custom.css
tests:
  - "npx tsc --noEmit — PASS"
  - "npx biome check src/components/ChatAssistant — PASS (clean, no fixes applied)"
  - "npm run build -> check:frontmatter — PASS"
  - "npm run build -> check:refs — PASS"
  - "npm run build -> check:chapter — PASS (0 errors, 6 pre-existing warnings)"
  - "npm run build -> docusaurus build — BLOCKED, pre-existing (sidebars.ts stage-rename ids), not this change"
  - "axe (agent-browser a11y) on localhost:3000/welcome with the panel open — 0 violations from this component; 1 pre-existing image-redundant-alt on a doc <img>"
  - "Rendered verification: light + dark desktop 1440x900, mobile 390x844, prefers-reduced-motion: reduce"
---

## Prompt

You are building a single, self-contained, ultra-premium chat-assistant UI component for a real education website called "The Bridge Balance." This is a VISUAL/INTERACTION PREVIEW ONLY — it must not call any real API, and it must never pretend to answer real questions with fabricated AI-sounding text.

## Design system to match exactly (do not invent new colors or fonts)

Palette: pure silver/black, OKLCH color space — "industrial premium." A ten-step neutral silver ramp runs from near-white to near-black (dark mode reads the same ramp inverted: raised surfaces are lighter in dark mode).

One single accent color exists in the whole system, used sparingly, only on interactive/active elements:
--accent: oklch(0.40 0.08 245)            /* muted steel-blue, low chroma */
--accent-hover: oklch(0.32 0.075 245)
--accent-subtle: oklch(0.40 0.08 245 / 0.08)
--focus-ring: 0 0 0 3px oklch(0.40 0.08 245 / 0.35)

Everything else — backgrounds, panels, text, icons — stays strictly neutral silver/black. No new hue may appear anywhere.

Typography: Inter (UI text, weights 400–900), Instrument Serif italic (ONE display moment only — a headline or opening line), Geist Mono (anything that reads as code or a technical readout).

Surface language: frosted glass / backdrop-blur panels, soft elevation shadows, hairline borders (never heavy strokes), 1rem corner radius as the base unit. Everything should read as material catching light, not flat solid cards.

Both light mode and dark mode are first-class — design and deliver both, not one auto-inverted by a filter.

Motion: smooth, physical, premium easing — but every animation must collapse to an instant, motion-free state under prefers-reduced-motion.

## What to build

A chat-assistant entry point that starts as a small, beautiful floating trigger (bottom corner) and, on click, EXPANDS dramatically — not into a small sidebar, but into a large, maximized, immersive surface (most or all of the viewport, or a very large centered panel over a dimmed/blurred backdrop). It should feel like opening something powerful, not a small widget.

Inside the expanded state:
1. A confident opening line in Instrument Serif italic (you choose the exact wording — short and confident).
2. A row of 6 capability chips/cards, glass-surfaced, each with a short label and one-line description, in plain language:
   - Deep Research — digs through a topic properly before answering
   - Deep Think — reasons through hard questions instead of guessing
   - Document Writer — drafts real documents and notes for you
   - Note Taker — turns a conversation into organised notes
   - Book-Aware — understands and quotes anything from this book
   - World-Aware — understands and explains things outside the book too
3. A single generous input box with a send button using the one accent color.
4. On any action that would normally send a message (clicking send, pressing Enter): do NOT fabricate a response. Transition smoothly into a good-looking, honest "Under Development" state — a short, warm message making clear this is a preview of what's coming, not a working assistant yet — plus a way to close back to the small trigger.
5. A close/minimize control that smoothly collapses back to the small floating trigger.

## Hard constraints

- No real API calls. No fake AI-sounding responses presented as real. The only honest outcome of a real interaction is the "Under Development" reveal.
- No color outside the tokens above. No new hue, no gradient introducing a new hue family.
- Must work in both light and dark mode, and must be responsive (usable on a phone, not just desktop).
- Respect prefers-reduced-motion.
- Deliver as a single, self-contained component (React + TypeScript preferred, plain HTML/CSS/JS acceptable), no external UI library dependency beyond what is idiomatic for a modern React/TypeScript project.

## What "ultra-premium" means here

Reference feeling: the teaser for a product launch of something expensive and considered — not a generic chatbot widget. Take real craft risks in the expand animation, the glass layering, the depth and light on hover — but never break the neutral-silver-with-one-accent rule above.

## Response snapshot

Built the component against the site's real token layer rather than the literal names in the brief: the accent values given (`--accent`, `--accent-hover`, `--accent-subtle`, `--focus-ring`) already exist as `--tbb-accent` / `--tbb-accent-hover` / `--tbb-accent-subtle` / `--tbb-focus-ring` in `edu-site/src/css/custom.css`, so nothing new was declared. Dark mode already carries brighter accent siblings (L 0.75 vs L 0.40), which is why the send button and the primary reveal button ink themselves with `--tbb-text-inverse` — white over the dark light-mode accent, black over the bright dark-mode one, one declaration holding contrast in both.

Delivered `ChatAssistant/index.tsx` + `styles.module.css`, mounted once in the swizzled `theme/Root.tsx` so the trigger is site-wide, plus one line in `custom.css` extending the existing `data-*` scroll-lock rule (the pattern the drawer and Spotlight already use; a CSS module cannot reach `html`).

Design decisions worth recording: the panel unfolds from the trigger's own bottom-right corner (scale + rise + `rotateX` under a transform-carried perspective) so opening reads as the button becoming the surface; one specular sweep crosses it on entry, behind the content rather than over it; the six chips are single-select toggles whose selection is the second and last place the accent is allowed, and the field grows with the draft. The opening line is "Ask the book anything." — the single Instrument Serif moment; the reveal deliberately is not, because the display face is spent on the first line. The reveal states plainly that there is no model, no request, and that nothing typed left the page, and the header carries a `preview build` mono readout so the honesty starts at frame one rather than arriving as a surprise.

Three defects were found by looking at the rendered result and fixed: the panel sat at z-index 165 while the navbar's real value is Infima's `--ifm-z-index-fixed: 200`, so the header rendered behind the navbar on mobile (moved to 260, above every drawer layer); returning from the reveal left focus on the document body (the textarea now focuses through a callback ref, because `AnimatePresence mode="wait"` mounts it after the state change commits); and the 11px mono keyboard hint failed axe colour-contrast — it was removed rather than restyled, because no token in the ramp clears 4.5:1 against a 72%-transparent panel over the dim.

One temporary local change was made and reverted: the owner's in-progress `sidebars.ts` stage rename currently breaks the Docusaurus build (six stale `01-foundations`-style doc ids), which blocked rendering. It was backed up byte-exact, patched only to reach `localhost:3000`, and restored to a matching sha256 (`70e53928…`, 3807 bytes) before the server was stopped.

## Outcome

- Impact: a new, self-contained site-wide surface that makes the assistant's promise legible before it exists, with the honesty requirement implemented as the only outcome a real interaction can produce.
- Tests: typecheck and biome clean on the new files; three content gates pass; the Docusaurus build is blocked by a pre-existing stage-rename breakage (below), so the axe run was done against the live dev server, and the component contributes zero violations.
- Files: see front matter.
- Next prompts: decide whether this ships live; fix the six stale sidebar ids so the site builds again; decide whether a reader-facing changelog entry is honest for a preview that answers nothing.
- Reflection: the brief's token names did not match the repo's, and reading the real token layer first was worth more than any code written afterwards — it supplied the dark-mode accent siblings and the glass fallback the brief never mentioned.

## Evaluation notes (flywheel)

- Failure modes observed: (1) inferred the z-index registry from a grep and got it wrong — the navbar's 200 comes from Infima, not from a local rule, so it must be read from the rendered page, not the stylesheet; (2) trusted `edit_file`'s line-ending preservation and briefly suspected Root.tsx of a CRLF regression — `git diff --stat` settled it (7 lines, no churn) and the real cause is the repo's `core.autocrlf=true`; (3) the biome `useExhaustiveDependencies` rule correctly rejected an effect depending on a ref, which is what pushed the field-resize logic into the change handler where it belonged.
- Graders run and results (PASS/FAIL): typecheck PASS; biome PASS on the new files; check:frontmatter PASS; check:refs PASS; check:chapter PASS (0 errors); docusaurus build FAIL — pre-existing, six stale sidebar doc ids from the in-progress stage rename. Repo-wide `npm run lint` fails on 65 files (CRLF vs `lineEnding: "lf"` under `core.autocrlf=true`) — also pre-existing, on untouched files.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): read z-index values off the rendered page (`getComputedStyle` in the browser) before choosing a layer for any new overlay, instead of grepping the stylesheets for them.
