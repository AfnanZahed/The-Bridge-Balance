# Research: Fix Navbar Alignment and Formatting

**Feature**: `004-fix-navbar-alignment`
**Date**: 2026-08-18

## R-001 — Keep the existing Docusaurus navbar structure

- **Decision**: Preserve the stock Docusaurus/Infima navbar markup and implement the fix as a narrowly scoped CSS layer in `edu-site/src/css/custom.css`, with accessibility refinements in `edu-site/src/css/a11y.css` only where needed.
- **Rationale**: The current configuration already provides the required brand, Curriculum doc-sidebar link, GitHub link, and color-mode toggle. Avoiding swizzling or a custom React navbar minimizes the diff, preserves upgrade compatibility, and follows Principle V (Smallest Viable Change).
- **Alternatives considered**:
  - Swizzle the navbar theme component — rejected because it adds maintenance and is unnecessary for alignment.
  - Replace the navbar with a custom React component — rejected because it expands scope and risks regressions in mobile drawer and color-mode behavior.

## R-002 — Use one shared navbar control geometry

- **Decision**: Establish a shared visual baseline and control geometry for `.navbar__link`, the color-mode button, and the brand; use `inline-flex`, centered alignment, explicit `min-block-size: 44px`, and shared radius/padding tokens.
- **Rationale**: Infima renders links and the color-mode toggle through different selectors. A shared geometry layer removes the source of vertical drift while retaining the existing semantic elements and focus behavior.
- **Alternatives considered**:
  - Per-element pixel offsets — rejected because they are brittle across fonts and breakpoints.
  - Reduce controls below 44px and rely on padding — rejected because the hit-area contract must remain explicit and measurable.

## R-003 — Retain glass with a solid fallback

- **Decision**: Keep the existing `--tbb-navbar-glass` and `--tbb-surface-solid` tokens, backdrop blur, and `@supports` fallback; add only border/transition details required for parity.
- **Rationale**: This is already the project’s Apple-Pro visual language and is explicitly required by FR-003 and Constitution Principle VII. The fallback keeps the navbar usable where `backdrop-filter` is unavailable.
- **Alternatives considered**:
  - Opaque navbar in every browser — rejected because it removes the intended visual treatment.
  - JavaScript feature detection — rejected because CSS `@supports` is simpler and avoids runtime work.

## R-004 — Verify at the four required viewport/theme combinations

- **Decision**: Use the existing Docusaurus development/build surface and browser automation to inspect desktop light, desktop dark, mobile light, and mobile dark. Measure control boxes and keyboard focus at runtime; use the production build as the final static validation.
- **Rationale**: The defect is visual and responsive. Runtime observation at the actual rendered surface catches baseline, drawer, theme, and layout-shift issues that source inspection cannot prove.
- **Alternatives considered**:
  - CSS-only snapshot review — rejected because it cannot validate computed geometry or drawer behavior.
  - Unit tests for CSS selectors — rejected because there is no meaningful unit boundary for this presentation behavior.

## R-005 — Keep scope limited to navbar presentation

- **Decision**: Do not change route configuration, content, backend code, design tokens unrelated to navbar, or dependencies.
- **Rationale**: The specification is a bounded visual hygiene fix. Existing tokens and accessibility rules are reused rather than redesigned.
- **Alternatives considered**:
  - Global typography/token refactor — rejected as unrelated and contrary to the smallest viable change constraint.
