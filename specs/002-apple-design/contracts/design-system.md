# Design System Contract — Apple-Inspired Theme Transformation

**Feature**: `002-apple-design`  
**Owner**: Claude Code (co-author) · Project Owner (approval)  
**Dates**: Created 2026-08-17

## Purpose

The contract that mechanical migration works against. A surface passes only when
it satisfies the token, mode, motion, focus, and overflow clauses below.

## Token Scope

Touched token families:

| Family | Scope |
|---|---|
| `--tbb-accent*` | Apple-system blue + variants. |
| `--tbb-stage-{1..4}*` | Muted stage accents (must remain muted; no saturated hex as general chrome). |
| `--tbb-surface*` | Light/dark surface tokens; glass variants require fallback. |
| `--ifm-*` typography | Bold display, tight tracking, generous leading per R-004. |
| `--op-*` | Self-contained tokens actually consumed by components. |

## Surface Contract

Every shared surface MUST satisfy all clauses in **both** modes:

1. **Mode parity**: `lightValue` and `darkValue` render intentionally; no surface is left unstyled or unreadable.
2. **Blur fallback**: if a surface uses `backdrop-filter`, `@supports not (backdrop-filter: blur(1px))` MUST provide a solid opaque `var(--tbb-surface-solid)` equivalent.
3. **Elevation over borders**: depth MUST come from luminance-differentiated surfaces + soft shadows, not hard 1px borders.
4. **Single accent**: no viewport uses more than two saturated hues (primary accent + at most one categorical mark).
5. **No color-only meaning**: any categorical color MUST be paired with a text label or an existing icon.

## Required Component Touch-Gates

| Component | Contract |
|---|---|
| `HomepageHero` | Static; no WebGL canvas; Apple-blue primary CTA; generous whitespace; static gradient optional. |
| `StageCard` | Muted accent chip only; elevation on hover; no layout shift; `:focus-visible` ring. |
| `ChapterState` | Muted pill; state text remains readable in light/dark. |
| `DataViz` | Single accent (`--tbb-accent`) + neutral steps; legends/labels carry meaning; bars/donut animate "auto" only. |
| `Root` / reading chrome | Lenis and GSAP init removed; ReadingProgress retained; entrance reveals remain reduced-motion-aware. |
| Navbar / sidebar / footer | Apple-blue active/current-page; neutral hover; focus ring. |

## Motion Contract

1. `Lenis` instance MUST NOT be created at runtime.
2. `ScrollTrigger` / GSAP MUST NOT be registered in app code.
3. `Hero3D` (r3f) MUST NOT render; a static CSS panel is the replacement.
4. The ONLY retained animation is `RevealOnScroll` (Framer Motion), which MUST:
   - collapse fully under `prefers-reduced-motion: reduce`;
   - not delay essential content;
   - not create layout overflow (use transforms, not width/height).
5. CSS transitions remain short (`≤ 0.25s`) and GPU-friendly.

## Accessibility Contract

1. Every focusable control MUST show a visible `:focus-visible` Apple-blue ring with offset (not outline: none).
2. Text MUST meet WCAG AA (4.5:1 body, 3:1 large) in both modes.
3. Forced-colors mode MUST keep borders, focus rings, and text perceivable; design MUST not depend on background images.
4. No information is conveyed by color alone.

## Responsive Contract

1. No page-level horizontal overflow at 320px, 768px, 1440px.
2. Wide tables/charts scroll inside their own `overflow-x: auto` container.
3. Controls remain reachable at touch sizes (minimum ~44px hit target where feasible).

## Degrading Components

| Degrading feature | Accepted fallback |
|---|---|
| `backdrop-filter` unsupported | Solid opaque surface token. |
| WebGL unsupported | Static CSS hero present in markup. |
| `prefers-reduced-motion: reduce` | All decorative motion collapses; content intact. |
| Remote font fails | `system-ui`, fallback stack renders. |
| Chart/asset fails | Adjacent labels/values/navigation usable. |

## Review Checklist (FR-014 Gate)

- [ ] Light + dark: each tested surface intentional, no unstyled region.
- [ ] Contrast: body/large-target text meets WCAG AA.
- [ ] Blur fallback: `@supports not (backdrop-filter)` renders solid surfaces.
- [ ] Reduced motion: primary navigation + reading journeys usable; no content behind animation.
- [ ] Keyboard: all primary controls reachable, visible `:focus-visible`.
- [ ] Responsive: no horizontal overflow at 320 / 768 / 1440.
- [ ] Degradation: disabled WebGL/blur/assets still render navigation + chapter text.
- [ ] Gates: `npm run build`, `npx tsc --noEmit`, `node scripts/check-frontmatter.mjs` pass.