# Research: Redesign Top-of-Page Chrome (Navbar + Hero Top) from Scratch

**Feature**: `005-redesign-navbar-hero`
**Date**: 2026-08-19

## R-001 — Centered-brand navbar without swizzling

- **Decision**: Keep the Docusaurus/Infima navbar markup. Center the brand with CSS by taking `.navbar__brand` out of flow (`position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%)`) inside a `position: relative` `.navbar__inner`, and give the left nav group / right action group auto margins so the centered brand never collides.
- **Rationale**: Infima ships the brand inside the *left* `.navbar__items` container; the DOM order is `[left items + brand, right items]`. Reordering requires a swizzle. Pure-CSS absolute centering preserves markup (Constitution V — smallest viable change, no new React component), keeps the mobile drawer wiring intact, and matches the Apple-style centered-brand pattern.
- **Alternatives considered**:
  - Grid on `.navbar__inner` (`1fr auto 1fr`) with the brand moved into a middle slot — requires restructuring children and risks breaking Infima's responsive toggling; rejected.
  - Swizzle `Navbar` theme component for a true three-column layout — heavier, version-coupled, unnecessary; rejected.

## R-002 — Client-side curriculum search (no external service, no new dependency)

- **Decision**: Build-time `scripts/generate-search-index.mjs` walks `docs/**/*.md*`, extracts per-doc route, title, headings, and stripped content, and writes `static/search-index.json`. A custom `src/theme/SearchBar/index.tsx` component fetches that index and presents a debounced, keyboard-accessible results dropdown. Registered as `{ type: "search", position: "right" }` in the navbar config; Docusaurus's `src/theme/*` shadowing makes it the `@theme/SearchBar` without a full navbar swizzle.
- **Rationale**: The spec requires *in-page client-side search* with *no external search service dependency* (FR-019). The curriculum is small (~50 docs), so a simple hand-rolled scorer (case-insensitive substring over title/heading, then content, with exact-title and heading-prefix boosts) is fast enough and keeps zero new runtime dependencies. The `src/theme/SearchBar` override is the documented Docusaurus search extension point and needs no config swizzle.
- **Alternatives considered**:
  - Algolia DocSearch — external service; requires an index + approval; conflicts with "no external search service dependency"; rejected.
  - `@easyops-cn/docusaurus-search-local` / `docusaurus-lunr-search` — third-party dependency with its own index pipeline; adds a stack entry (needs `stack.md` + ADR per constitution); heavier than needed; rejected.
  - `fuse.js` client-side fuzzy search — small but still a new dependency; a hand-rolled scorer avoids the dependency; rejected for now (revisit if search quality needs it, then it's an ADR-sized stack addition).

## R-003 — Hero mesh gradient with pure CSS OKLCH

- **Decision**: Replace the wall-scale `HeroSpan` arch SVG with a pure-CSS **Apple-style soft mesh gradient**: a stack of large `radial-gradient()` layers in OKLCH (Apple Pro blue `--tbb-accent` at low alpha + neutral atmospheric tones over `--tbb-bg`), rendered by the existing `.tbb-hero` background layer. Light and dark each get their own mesh stack using the per-theme tokens already in `custom.css`.
- **Rationale**: FR-018 mandates "no new raster assets or external image dependencies" and FR-016 restricts the redesign to the existing free-tier toolchain. Pure CSS gradients are resolution-independent, theme-switchable with the existing token mirror, and cheap (no network requests). This mirrors the existing `.tbb-hero::before` radial treatment but scaled into the fuller mesh the user chose.
- **Alternatives considered**:
  - Inline SVG mesh with `<radialGradient>` — viable but adds markup; CSS layers are simpler to theme; rejected.
  - Raster image mesh (WebP/AVIF) — paid-free but an asset dependency and not token-driven; rejected.
  - Keep the arch SVG but restyle — contradicts "replace everything"; rejected.

## R-004 — Retain BrandMark as the identity glyph

- **Decision**: Keep `<BrandMark />` (the tied-arch logo) in the hero and navbar. "Replace everything" is scoped to the hero *artwork* (the wall-scale arch SVG) and the *deck composition* (mark placement, eyebrow, headline, subtitle, CTA row, meta row); the logo itself is the brand identity used in the navbar, favicon, and footer and is not redesigned here.
- **Rationale**: The spec's intent (FR-001..FR-018) is a top-of-page chrome redesign, not a rebrand. Changing the logo is an ADR-level branding decision (Constitution III/VII). Keeping the mark preserves identity while the hero artwork and composition change entirely.
- **Alternatives considered**: Full logo redesign — out of scope, would ripple to favicon/footer/OG image; rejected.

## R-005 — Verification harness (reuse feature 004's approach)

- **Decision**: Reuse the verified harness from feature `004-fix-navbar-alignment`: serve the production build, drive it with Playwright at desktop/mobile × light/dark, assert geometry (≤2px center-line delta), theme-toggle no-reflow (CLS=0), search dropdown behavior, and capture before/after screenshots; run Lighthouse accessibility (≥95) against the served homepage; confirm `npm run build` is idempotent.
- **Rationale**: SC-001..SC-010 are measurable only by runtime observation; the harness is already proven in this repo and needs no new tooling.
- **Alternatives considered**: Screenshot-only review — cannot prove geometry or search interaction; rejected.

## R-006 — New navbar + hero tokens stay within the existing token set

- **Decision**: No new `--tbb-*` tokens. The centered brand, search control, mesh gradient, and redesigned CTAs reuse `--tbb-accent`, `--tbb-surface-glass`/`--tbb-surface-solid`, `--tbb-radius-*`, `--tbb-a11y-touch-target`, `--tbb-a11y-focus-*`, `--tbb-border`, `--tbb-shadow-*`, and the type stack.
- **Rationale**: Constitution VII and the Operational Standards design-fidelity audit require one token system; introducing new tokens without a design-system feature would violate smallest-viable-change.
- **Alternatives considered**: A dedicated `--tbb-mesh-*` token group for the hero mesh — unnecessary indirection; inline values on the mesh layers are fine and auditable; rejected.
