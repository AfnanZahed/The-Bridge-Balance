# Visual Contract: Fix Navbar Alignment and Formatting

**Feature**: `004-fix-navbar-alignment`
**Date**: 2026-08-18
**Type**: Presentation contract (no HTTP/API surface — this feature ships CSS only)

## Purpose

There are no backend endpoints in this feature. Instead, the "contract" is the
**computed geometry and rendering behavior** of the navbar at the four required
configurations. This file defines the observable surface a verifier must
measure to prove the specification's success criteria.

## Configuration Matrix (SC-001)

Every measurement below is repeated at:

| Config | Viewport | Theme |
|--------|----------|-------|
| C1 | Desktop (≥ 996px) | Light |
| C2 | Desktop (≥ 996px) | Dark |
| C3 | Mobile (< 996px) | Light |
| C4 | Mobile (< 996px) | Dark |

## Observable Surface (per config)

### Vertical baseline

- `.navbar__brand` (logo + title), the Curriculum `.navbar__link`, the theme
  toggle `.clean-btn`, and the GitHub `.navbar__link` MUST share the same
  computed `top` + `height` (i.e., identical vertical center line).
  Tolerance: ≤ 2px center-line delta. (FR-001, FR-002)

### Control parity (desktop)

- Theme toggle and GitHub link MUST have identical computed `height`,
  `padding-block`, `border-radius`, and `background` treatment. (FR-004)

### Touch target (all configs)

- Every interactive navbar element MUST have a computed hit area ≥ 44×44 CSS px
  (`min-block-size` × `min-inline-size`, or rendered size, whichever is
  larger). (FR-005 / WCAG 2.2 SC 2.5.8)

### Theme transition (no reflow)

- Toggling theme MUST NOT change any navbar element's bounding box
  (width/height/position). CLS contribution from `.navbar` = 0. (FR-008, SC-004)

### Focus behavior (keyboard)

- Tabbing through navbar elements MUST produce the Apple-blue `:focus-visible`
  ring (`var(--tbb-accent)`), visible offset, and MUST NOT resize/relayout any
  element (outline must not participate in layout). (FR-006)

### Mobile drawer (mobile configs)

- The hamburger `.navbar__toggle` MUST share the brand baseline.
- Opening the drawer MUST NOT shift the navbar or page layout. (FR-007)

### Border (all configs)

- The navbar hairline border MUST render exactly once at the bottom edge, in
  both themes, without doubling. (FR-009)

## Non-Goals (out of contract)

- No HTTP endpoints, request/response schemas, or API versioning apply.
- No data model changes (see `../data-model.md` — presentation only).
