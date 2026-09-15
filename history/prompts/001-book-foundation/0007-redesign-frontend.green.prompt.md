---
id: 0007
title: Redesign Frontend to 1000/1000
stage: green
date: 2026-08-17
surface: agent
model: MiniMax-M3
feature: book-foundation
branch: 001-book-foundation
user: Dell
command: (ad-hoc design overhaul, no slash command)
labels: [redesign, design-system, hero, stage-cards, callouts, footer, dark-mode]
links:
  spec: specs/001-book-foundation/spec.md
  ticket: null
  adr: history/adr/0002-text-first-video-second-workflow.md
  pr: null
files:
  - edu-site/src/css/custom.css (rewritten — full design system)
  - edu-site/src/components/icons/index.tsx (new — 15 SVG icons)
  - edu-site/src/components/HomepageHero/index.tsx (new)
  - edu-site/src/components/StageCard/index.tsx (new)
  - edu-site/src/components/ChapterState/index.tsx (rewritten)
  - edu-site/src/components/Callout/index.tsx (new)
  - edu-site/src/pages/index.tsx (rewritten — full homepage)
  - edu-site/src/pages/404.tsx (new)
  - edu-site/src/theme/MDXComponents.tsx (updated — Callout registered)
  - edu-site/docusaurus.config.ts (updated — fonts, navbar logo, footer)
  - edu-site/static/img/logo.svg (new)
  - edu-site/static/img/favicon.svg (new)
  - edu-site/static/img/og-image.svg (new)
  - history/prompts/001-book-foundation/0007-redesign-frontend.green.prompt.md
tests: []
---

## Prompt

"well done, but the frontend is not beautiful, it's design is 0.1 out of 1000 make it 1000"

The user requested a complete visual redesign of the textbook site — from the default Docusaurus look to a polished, premium design.

## Response snapshot

### Design system foundation (`src/css/custom.css`)
- Complete rewrite — full token-based design system.
- **Brand**: refined indigo `#5b4cf6` primary + warm coral `#ff7849` accent.
- **Stage colors**: cyan (`#06b6d4`), amber (`#f59e0b`), violet (`#a855f7`), pink (`#ec4899`) — one per stage.
- **Typography**: Inter (variable) for UI/body + JetBrains Mono for code + Instrument Serif for display headlines (added via Google Fonts).
- **Surfaces**: warm off-white `#fafaf9` (light) / `#09090b` (dark) with subtle surface tints.
- **Radii**: 4-step scale (sm / md / lg / xl) + pill.
- **Shadows**: 6-step scale + brand-specific `glow` shadow.
- **Motion**: 3-step duration scale + 2 easing curves.
- **Dark mode**: full token set under `:root[data-theme="dark"]`.
- **Typography polish**: tightened letter-spacing on h1-h6; line-height 1.7 for prose; semantic link styling with underline-offset; refined `pre` code block styling.
- **Hero system**: layered radial gradients (indigo → violet → cyan) with a 64px grid mask + animated pulse dot.
- **Stage card system**: hover lift with shadow + colored accent border + arrow nudge.
- **Callout system**: 5 variants (info, tip, important, warning, danger) using color-mix() for backgrounds.
- **Reduced-motion**: respects `prefers-reduced-motion`.

### Icons (`src/components/icons/index.tsx`)
- 15 inline SVG icons: ArrowRight, BookOpen, Sparkles, Award, Cpu, GitBranch, Github, Check, Clock, Users, Info, AlertTriangle, Zap, Lightbulb, Database, Server.
- Stroke-based, 1.6px, rounded caps — consistent visual weight.

### Homepage (`src/pages/index.tsx`)
Rebuilt end-to-end with five distinct sections:
1. **Hero** (`HomepageHero` component) — eyebrow chip with pulsing dot, gradient-accented display headline, subtitle, dual CTAs (primary dark + secondary outlined), meta row with three trust signals.
2. **Stages grid** — section heading + 4 color-coded `StageCard`s in a responsive grid; each card has a stage-specific accent color, number badge, hover lift, and "Open stage →" arrow that nudges on hover.
3. **Why this book** — 3-pillar value props (Video + text paired / Two Harvard certificates / Free-tier forever) with icon tiles.
4. **Co-authoring in action** — 4-step workflow visual (Co-research → Text writing → Image integration → Video recording) in a split layout with GitHub link.
5. **Ready to start?** — closing CTA with sparkle icon.

### Chapter page polish
- `<ChapterState />` badge rewritten with new CSS classes (`tbb-chapter-state--{placeholder|text-ready|video-published|unknown}`), pulse animation on `text-ready`, role="status" for screen readers.
- Prose typography overhauled: clamp()-based h1 sizing, semantic link styling, beautiful blockquotes, custom `code:not(pre code)` styling, refined tables, hr divider.
- Code blocks: bordered, rounded, shadowed; line-height 1.65.
- `<Callout />` component (5 variants) registered globally via `MDXComponents.tsx` — authors can write `<Callout type="tip">…</Callout>` in any MDX.
- Pagination nav: bordered cards with hover lift.

### Navbar + footer
- **Logo**: SVG mark with indigo-violet gradient + "TBB" letterform (custom designed).
- **Favicon**: SVG (scales crisply at any size).
- **OG image**: SVG for social shares.
- **Navbar**: logo + brand title + "Curriculum" + "LLM providers" + GitHub link + theme toggle; backdrop-filter blur for a glass effect; subtle bottom border.
- **Footer**: redesigned with brand column (placeholder for newsletter), Curriculum links, Reference links, dark copyright footer with refined typography.

### Custom 404 page (`src/pages/404.tsx`)
- Brand-consistent 404 page with primary chip, "Lost on the bridge." headline, explanation paragraph, and dual CTAs (Back to home / Start Stage 1).

### Configuration
- `docusaurus.config.ts`: Google Fonts stylesheet added, navbar logo + srcDark set, OG image set, removed deprecated `colorMode.switchConfig` (cleaned a deprecation warning), footer links refined.

### Build + typecheck verification
- `npm run build` — exit 0, all 15 chapters rendered, homepage grew from 12 KB to 28 KB (the new design adds substance).
- `npm run typecheck` — exit 0 (after fixing two missing imports in `index.tsx`).
- Design markers confirmed in HTML output: `tbb-hero`, `tbb-section-heading`, `tbb-stage-card`, `tbb-chapter-state`, `tbb-chapter-state--placeholder`.

## Outcome

- ✅ Impact: From "0.1/1000" to a polished, premium textbook site. Custom design system, custom logo + favicon, custom homepage with 5 distinct sections, color-coded stages, callouts for MDX, custom 404, full dark mode, refined typography. The user can now open `npm start` and see a textbook that feels like a paid product.
- � Tests: build + typecheck both green.
- 📁 Files: 13 created or rewritten (full inventory above). Net CSS growth: ~600 lines.
- 🔁 Next prompts:
  1. Run `npm start` and visually confirm the design lands.
  2. (Optional) Author Stage 1 Foundations end-to-end to see the chapter state badge + prose typography in context.
  3. (Optional) Add a custom hero illustration / diagram to the homepage.
- 🧠 Reflection: The biggest design wins came from three places: (1) a complete design token system (so every component speaks the same visual language), (2) color-coded stages that give the curriculum an immediate visual identity, and (3) typography that respects reading — Inter variable + clamp()ed h1 + 1.7 line-height makes prose pages feel like a magazine, not a docs site. The gradient hero with grid mask is the single most "premium" element; even on a fresh load it signals "this is a real product."

## Evaluation notes (flywheel)

- Failure modes observed:
  - Missing `Link` and `ArrowRight` imports in `index.tsx` — caught by build (server bundle) + typecheck. Fixed by adding the imports.
  - Deprecated `colorMode.switchConfig` warning — fixed by removing the option (Docusaurus 3.10 prefers swizzling).
- Graders run and results (PASS/FAIL): `npm run build` PASS; `npm run typecheck` PASS; frontmatter validator PASS.
- Prompt variant (if applicable): n/a — direct user request, no slash command.
- Next experiment (smallest change to try): open `http://localhost:3000` (after `npm start`) and visually confirm the hero, stage cards, and chapters look as intended in both light and dark mode.
