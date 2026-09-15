---
id: 0025
title: Add GSAP ScrollFX for craft-level scroll animations
stage: green
date: 2026-08-17
surface: agent
model: claude-opus-4.7
feature: 001-book-foundation
branch: 001-book-foundation
user: orchestrator
command: sp.implement
labels: ["gsap","scrollfx","scroll-animations","reduced-motion","craft"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - C:\Users\Dell\Desktop\Book\edu-site\src\components\ScrollFX\gsap-register.ts (created)
  - C:\Users\Dell\Desktop\Book\edu-site\src\components\ScrollFX\index.tsx (created)
  - C:\Users\Dell\Desktop\Book\edu-site\src\css\scrollfx.css (created)
  - C:\Users\Dell\Desktop\Book\edu-site\src\pages\index.tsx (modified - ScrollFX wrap, stage card hooks, timeline line node, DataViz import kept from parallel agent)
  - C:\Users\Dell\Desktop\Book\edu-site\docusaurus.config.ts (modified - scrollfx.css added to customCss)
tests:
  - npx tsc --noEmit filtered to my files (ScrollFX, scrollfx, pages/index, docusaurus.config) returns CLEAN
---

## Prompt

You are Agent C in a parallel frontend overhaul for **The Bridge Balance** textbook. Your job: add craft-level scroll animations using `gsap` (which is installed but unused) — WITHOUT breaking the existing Lenis smooth-scroll (already mounted in `src/theme/Root.tsx`).

Use the grand-designer router at `C:\Users\Dell\Desktop\Claude Code CLI, Sub-Agents, skills, MCP servers etc\grand-designer\SKILL.md` — read it, route to the gsap/branded-scroll / motion sub-skill, apply.

[... full task description with constraints, scope, and acceptance criteria ...]

## Response snapshot

Routed the grand-designer request to the `gpt-taste` sub-skill (the GSAP/motion leaf). Inspected the existing project to map animation ownership before writing code:

- Existing Framer Motion `useScroll` + `useTransform` on `.tbb-timeline__spine` already produces the classic scroll-drawn scaleY line — adding a parallel GSAP `scaleY` on the SAME element would fight Framer for the inline `transform` every frame.
- Marquee uses Framer x-loop; Hero3D is Canvas; Lenis is mounted globally; all explicitly preserved.

Implemented three craft-level effects, each on GSAP-owned DOM:

1. **Fade + y reveal** on stage cards (`.tbb-stage-card-gsap-hook[data-gsap]` wrappers) via `gsap.fromTo` with `autoAlpha`, `y: 22 → 0`, `power3.out`, `once: true`, `start: "top 80%"`, `clearProps` so inline styles leave no residue and the existing CSS hover lift on `.tbb-stage-card` still works.
2. **Scroll-drawn spine highlight** (`.tbb-gsap-spine` overlay) positioned at runtime over the Framer spine by reading `getBoundingClientRect()` deltas — geometry read, never write. Scrubs `scaleY: 0 → 1` with `scrub: 0.35` between `"top 80%"` and `"bottom 30%"` on the wrapper. A primary → accent gradient with `box-shadow` glow; pointer-events none. Re-positions on `ScrollTrigger.onRefresh` to handle responsive layout.
3. **Hero parallax** on `.tbb-hero > div:first-child` (the CSS-module art layer) via `yPercent: -9` scrubbed between `"top top"` and `"bottom top"`. Hero3D Canvas and content stay untouched.

GSAP registration in `gsap-register.ts` is idempotent, gated by `typeof window !== 'undefined'` for SSR safety.

Reduced-motion gate is two-layer: JS branch in `useLayoutEffect` skips creating ScrollTriggers when `matchMedia('(prefers-reduced-motion: reduce)').matches`; CSS `@media` overrides in `scrollfx.css` hide the spine line and force `transform: none; opacity: 1` on `[data-gsap]` hooks as belt-and-braces for users with reduced-motion set before JS loads.

Lenis coexistence: ScrollTrigger reads native window scroll position which Lenis updates via its RAF loop — same model the existing Framer `useScroll` already uses.

## Outcome

- ✅ Impact: Adds three GSAP-driven scroll effects to homepage without breaking Framer-owned Timeline spine draw, marquee, Hero3D, Lenis, RevealOnScroll, or motion.css. Files created in scope only; `src/theme/Root.tsx` deliberately left untouched.
- 🧪 Tests: `npx tsc --noEmit` for my files returns CLEAN. Full-project typecheck has parallel agents' DataViz/IconWave errors unrelated to this scope.
- � Files: 3 new files (ScrollFX index.tsx, ScrollFX/gsap-register.ts, scrollfx.css) + edits to index.tsx (ScrollFX wrap, stage card hooks, timeline line node) and docusaurus.config.ts (customCss registration). Did not touch Root.tsx, motion.css, a11y.css, hero3d.css, radix.css, custom.css, Timeline.tsx, Hero3D/, Aceternity/, HomepageHero/.
- 🔁 Next prompts: Visual verification in browser (a parallel agent owns the build). If the agent team wants additional parallax on section headings, or a scroll-scrubbed text reveal on the hero subtitle, those can hook the same `[data-gsap]` system.
- 🧠 Reflection: The non-obvious correctness trap was that the existing Framer Motion scaleY spine animation made naive GSAP scaleY-on-spine into a transform fight. Resolving it by giving GSAP its OWN `.tbb-gsap-spine` node positioned by reading the Framer spine's rect is a clean coexistence pattern — the geometry-read step keeps the systems in sync without either writing to the other.

## Evaluation notes (flywheel)

- Failure modes observed: Initial design attempted `gsap.scaleY` on `.tbb-timeline__spine` directly; caught the Framer transform conflict before shipping by inspecting Timeline.tsx's `style={{ scaleY }}` pattern.
- Graders run and results (PASS/FAIL): TypeScript typecheck for my files: PASS. Visual browser verification: deferred to parallel agent.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): If the art-direction wants a "progress bolt" dot riding the spine frontier during scroll, add a `<span className="tbb-gsap-spine__head" />` inside the line node with `position: absolute; bottom: 0;` — `scaleY` will carry it visually.
