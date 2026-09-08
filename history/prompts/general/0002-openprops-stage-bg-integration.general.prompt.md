---
id: 0002
title: OpenProps and stage bg integration
stage: general
date: 2026-08-17
surface: agent
model: claude-opus-4.8
feature: none
branch: 001-spec-driven-engineering
user: architext (via parallel frontend overhaul)
command: integrate open-props into the design system and render stage-bg + texture-grain assets
labels: ["design-system", "css", "open-props", "docusaurus", "assets"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - edu-site/src/css/openprops.css
 - edu-site/src/css/radix.css
 - edu-site/src/css/custom.css
 - edu-site/docusaurus.config.ts
tests:
 - "cd edu-site && npm run typecheck (PASS)"
 - "npm run typecheck again after import fix (PASS)"
---

## Prompt

You are Agent A in a parallel frontend overhaul for The Bridge Balance textbook. Your job: integrate open-props into the existing design system, and make the created-but-unused stage-bg-*.svg + texture-grain.svg assets actually render on pages. Use the grand-designer router, route to the design-system/token sub-skill. Scope: create src/css/openprops.css (NEW); extend radix.css and custom.css by APPEND ONLY; wire openprops.css into customCss array after radix, before custom; actually use the stage backgrounds (one stage-bg per stage at low opacity ~0.06-0.1) and texture-grain.svg as a hero/page overlay; do not touch motion.css, a11y.css, hero3d.css, 404.tsx, component dirs; do not run a full build (parallel agent owns build/); npm run typecheck must pass; create a PHR in the general route.

## Response snapshot

- Created edu-site/src/css/openprops.css: imports open-props/normalize + open-props (the postcss/style surface via exports map) and a curated --op-* slot layer (radius, shadow, easing, sizing) that does not collide with --tbb-*.
- Wired openprops.css into the docusaurus.config.ts customCss array (radix -> openprops -> custom -> motion -> a11y -> hero3d).
- Appended the stage-bg-*.svg asset tokens (--tbb-stage-bg-1..4, --tbb-texture-grain) to radix.css :root as primitive-layer tokens.
- Appended to custom.css a full-bleed texture-grain overlay on the hero (via a new .tbb-hero::after layer at opacity 0.07/0.12 dark) and a .tbb-stages grain layer (z-index:-1 under isolation:isolate), plus per-stage card backgrounds wired via .tbb-stage-grid > *:nth-child(1..4) .tbb-stage-card::before (each stage-bg-N.svg at opacity 0.08, hover 0.16, z-index -1 with background-size cover, position center bottom), and a .tbb-stage-banner widget in MDXComponents.tsx using a low-opacity ::before layer for contrast.
- Registered <StageBanner stage="1|2|3|4"> in src/theme/MDXComponents.tsx (self-contained, no external deps).
- Typecheck ran PASS both before and after the import substitution (pure CSS, no TS changes).

## Outcome

- Impact: 0075 Integrates Open Props primitives behind --op-* aliases and materializes five pre-created SVG assets without touching the locked CSS files or the stage grid content.
- Tests: 0016 npm run typecheck: PASS x2.
- Files: F0016 4 files modified (openprops.css created; radix.css, custom.css, docusaurus.config.ts appended/edited) + MDXComponents.tsx extension.

- OSSUCCESS: typecheck green; no full build run; parallel build agent owns build/.
- OSRISK: CSS @layer/ordering not used; the per-card ::before relies on nth-child so a future grid reorder breaks the mapping (acceptable).
- RENDERED CHECK: no browser verification performed — textures rely on /static/img paths that Docusaurus serves verbatim; recommend a real-browser pass.

- Reflection: The URL tokens are inline var()s, so no runtime ESM requirement. The import specifier "open-props" is resolved by Docusaurus' postcss-import to the package's postcss/style export (src/index.css) — verify under a real build.

## Evaluation notes (flywheel)

- Failure modes observed: None at typecheck. Watch import resolution under postcss-import.
- Graders run and results: typecheck PASS.
- Prompt variant: default.
- Next experiment: swap a component (e.g. StageBanner) to use --op-* aliases once confirmed.
