# Quickstart — Apple-Inspired Theme Transformation

**Feature**: `002-apple-design`
**Audience**: Project owner (approval) and Claude Code (migration).

## 1. What this feature is

A presentation-layer transformation of the Docusaurus textbook to the
Apple-inspired visual language (Constitution Principle VII), per the 5
clarifications in the spec.

## 2. Non-goals / freeze list

Do NOT change without a follow-up spec:

- Curriculum routes, sidebar order, chapter content, frontmatter contract.
- Icon taxonomy (Phosphor / Lucide / Tabler).
- LLM provider architecture (Pluggable Provider Abstraction).
- Backend / auth / payments / RAG.
- Free-tier or $0 hosting commitment.

## 3. Migration commands

```bash
cd edu-site
# Phase 1 — tokens + type
# edit src/css/radix.css + custom.css (see contracts/design-system.md)

# Phase 2 — surfaces + components
# restyle: HomepageHero (static), StageCard, ChapterState, DataViz (single accent + neutrals)

# Phase 3 — motion removal
npm remove lenis gsap @react-three/fiber @react-three/drei @react-three/rapier three
# remove ScrollFX/ and Hero3D/; drop their imports from src/pages/index.tsx
# remove Lenis init from src/theme/Root.tsx
# prune src/css/scrollfx.css + hero3d.css from docusaurus.config.ts customCss

# Phase 4 — verify
node scripts/check-frontmatter.mjs
npx tsc --noEmit
npx docusaurus build
npm run test:audit   # Lighthouse + axe
```

## 4. Acceptance walk

1. `npm run build` exits 0.
2. Homepage hero renders statically (no WebGL canvas).
3. Stage cards use muted accents; primary CTA + links are Apple-blue.
4. Keyboard tab reaches navbar/sidebar/chapters with visible focus rings.
5. Toggle light/dark — both render every surface intentionally.
6. Enable `prefers-reduced-motion` — only entrance reveals remain; content usable instantly.
7. `Ctrl+Shift+M` / DevTools responsive: no horizontal scroll at 320 / 768 / 1440.
8. Disable `backdrop-filter` (or use a browser where unsupported) — solid surfaces render.
9. Charts show legend/label meaning without relying on color.

## 5. Rollback

The transformation is CSS + one static hero swap + dependency removal. To
rollback, restore `src/css/`, `src/pages/index.tsx`, `Root.tsx`, and reinstall
the removed deps from `git revert` of the motion-dep branch. No data migration.

## 6. If something fails

- Build step fails on a removed dep → prune the import + `package.json` entry;
  re-run `npm install`.
- Focus ring not visible → check `a11y.css` `:focus-visible` tokens.
- Chart unreadable → verify DataViz uses `--tbb-accent` + neutral steps, labels visible.
- Fidelity review (contract) fails → fix the specific surface, re-run the walk.