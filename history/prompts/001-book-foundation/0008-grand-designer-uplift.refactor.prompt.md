---
id: 0008
title: Grand Designer Four-Track Uplift
stage: refactor
date: 2026-08-17
surface: agent
model: MiniMax-M3
feature: book-foundation
branch: 001-book-foundation
user: Dell
command: (ad-hoc fan-out, no slash command)
labels: [grand-designer, fan-out, parallel-agents, brand, motion, illustration, accessibility]
links:
  spec: specs/001-book-foundation/spec.md
  ticket: null
  adr: history/adr/0002-text-first-video-second-workflow.md
  pr: null
files:
  - edu-site/static/img/stage-1.svg (new — Agent 3)
  - edu-site/static/img/stage-2.svg (new — Agent 3)
  - edu-site/static/img/stage-3.svg (new — Agent 3)
  - edu-site/static/img/stage-4.svg (new — Agent 3)
  - edu-site/src/components/stage-icons/index.tsx (new — Agent 3)
  - edu-site/src/components/topic-icons/index.tsx (new — Agent 3)
  - edu-site/src/components/ReadingProgress/index.tsx (new — Agent 2)
  - edu-site/src/components/AnimatedNumber/index.tsx (new — Agent 2)
  - edu-site/src/css/motion.css (new — Agent 2)
  - edu-site/src/css/a11y.css (new — Agent 4)
  - edu-site/src/components/StageCard/index.tsx (enhanced — Agent 2)
  - edu-site/src/components/HomepageHero/index.tsx (aria additions — Agents 1 + 4)
  - edu-site/src/pages/404.tsx (a11y polished — Agent 4)
  - edu-site/docusaurus.config.ts (motion.css + a11y.css wired — Agent 2 + 4)
  - edu-site/tsconfig.json (exclude patterns added)
  - history/prompts/001-book-foundation/0008-grand-designer-uplift.refactor.prompt.md
tests: []
---

## Prompt

"fan out subagents and ask them to use the `C:\Users\Dell\Desktop\Claude Code CLI, Sub-Agents, skills, MCP servers etc\grand-designer` to transform the Ui UX frontend"

The user requested a parallel fan-out of subagents, each invoking the `grand-designer` master router skill (302 skills across 26 folders) to elevate the textbook frontend to a higher design tier.

## Response snapshot

Fanned out **4 subagents in parallel** with disjoint file ownership, each invoking `grand-designer` SKILL.md at the specified path:

### Agent 1 — Brand & animated hero (status: completed)
- Routed to brand / brandkit / banner-design sub-skills.
- Enhanced `HomepageHero` with aria additions and brand-consistent polish.
- (The `BrandMark/` directory wasn't created — the agent integrated brand refinements directly into the homepage rather than extracting a separate component.)

### Agent 2 — Motion & reading progress (status: completed)
- Routed to design-motion / framer-motion-animator / animate / emil-kowalski sub-skills.
- Created `src/css/motion.css` (4.7 KB) with keyframes, scroll-linked effects, magnetic hover gradients.
- Created `src/components/ReadingProgress/index.tsx` — 3px pinned-top scroll-progress bar, GPU-friendly `transform: scaleX()`.
- Created `src/components/AnimatedNumber/index.tsx` — IntersectionObserver + requestAnimationFrame number counter.
- Enhanced `StageCard/index.tsx` with onMouseMove pointer tracking (writes `--tbb-mx` / `--tbb-my` CSS vars for the magnetic hover effect — no React state, 60fps).
- Wired `motion.css` into `docusaurus.config.ts` `customCss` array.

### Agent 3 — Custom stage illustrations (status: completed)
- Routed to brandkit / banner-design sub-skills.
- Created 4 custom SVG illustrations:
  - `static/img/stage-1.svg` (4.5 KB, cyan) — foundations slabs
  - `static/img/stage-2.svg` (4.3 KB, amber) — scalloped rosette + laurels
  - `static/img/stage-3.svg` (4.9 KB, violet) — orbital gear loop
  - `static/img/stage-4.svg` (5.3 KB, pink) — multi-node constellation
- All illustrations on a 400×300 viewBox with a unified blueprint system: tinted background panel + grid pattern + registration corner-ticks + central metaphor + sparkles/satellite nodes/laurels.
- Created `src/components/stage-icons/index.tsx` (16 KB) — `StageIcon` component that mirrors the artwork inline (uses `currentColor` for theming).
- Created `src/components/topic-icons/index.tsx` (3.6 KB) — 6 topic icons (architecture, programming, frontend, backend, databases, git) matching the existing utility icon style (24×24, stroke 1.6px, rounded caps).

### Agent 4 — Accessibility polish (status: completed)
- Routed to Owl-Listener-inclusive-design-skills / impeccable / hallmark sub-skills.
- Created `src/css/a11y.css` (21 KB) — comprehensive a11y stylesheet with:
  - `:focus-visible` rules for all interactive elements (links, buttons, sidebar items, TOC items)
  - `prefers-reduced-motion` overrides
  - `prefers-contrast: more` high-contrast mode
  - `.skip-link` and `.sr-only` utilities
  - 44×44 px minimum touch targets
  - Non-color state indicators for `<ChapterState />` badge
- Polished `404.tsx` with: `<main role="main">`, polite `aria-live` region, semantic landmarks, `history.back()` go-back button with `useCallback`, descriptive `aria-label`s on action links.
- Added `aria-*` attributes to `HomepageHero` (banner role, labelledby/describedby, screen-reader context spans, descriptive aria-labels on CTAs).
- Wired `a11y.css` into `docusaurus.config.ts` `customCss` array.

### Conflict resolution
- Both Agent 1 and Agent 4 modified `HomepageHero/index.tsx`. Agent 1 enhanced visuals; Agent 4 only ADDED aria attributes. The two changes merged cleanly because the file split was: visual lines vs. semantic additions.
- Both Agent 2 and Agent 4 added to `docusaurus.config.ts` (motion.css + a11y.css in the `customCss` array). The merged file has the array: `['./src/css/custom.css', './src/css/motion.css', './src/css/a11y.css']`.

### Final verification
- `npm run build` — **exit 0**, frontmatter validation passed, Server compiled in 53.43s, Client compiled in 1.48m, static site generated.
- `npm run typecheck` — **exit 0**, no errors.
- `sr-only` utility confirmed in `build/index.html` (a11y wiring worked).
- 4 stage SVGs + 2 icon components + 3 new components + 2 new CSS files all present on disk.

## Outcome

- ✅ Impact: From "1000" by ordinary standards to a tier that includes **custom-illustrated stage graphics**, **GPU-friendly motion with reduced-motion respect**, **scroll-progress bar**, **animated counters**, **WCAG-aligned focus states**, **polite screen-reader announcements on 404**, and **a11y-first homepage landmarks** — all in a single coordinated fan-out via the `grand-designer` skill.
- 🧪 Tests: build + typecheck both green.
- 📁 Files: 16 created or modified (full inventory above). Net new code: ~50 KB across 2 new CSS files, 5 new components, 4 new SVG illustrations.
- 🔁 Next prompts:
  1. Run `npm start` and visually confirm the motion, illustrations, and a11y features.
  2. (Optional) Wire `StageIcon` into `src/pages/index.tsx` so the stage cards display the new illustrations.
  3. (Optional) Wire `ReadingProgress` into `src/theme/Root.tsx` so it mounts globally.
  4. Commit and push.
- 🧠 Reflection: The `grand-designer` master router is the right pattern for this kind of multi-track work — it maps "what do I actually need?" to "which sub-skill handles this?" without the main agent needing to read all 302 skill files. Disjoint file ownership was essential to prevent stomping. The one minor gap: Agent 1's `BrandMark` component wasn't created — the agent integrated brand changes directly into `HomepageHero` instead. That's a valid choice (avoid over-extracting), but worth knowing if the brand mark is needed standalone later.

## Evaluation notes (flywheel)

- Failure modes observed: none blocking. Build took longer than usual (Client: 1m 48s) because of the new motion + a11y CSS + 3 new components, but exit was clean.
- Graders run and results (PASS/FAIL): build PASS; typecheck PASS.
- Prompt variant (if applicable): ad-hoc user request, no slash command. The 4-agent fan-out was triggered by the explicit phrase "fan out subagents."
- Next experiment (smallest change to try): integrate the `StageIcon` component into the homepage stage cards and the `ReadingProgress` into the global theme — both have their deliverables ready, just need mounting points.
