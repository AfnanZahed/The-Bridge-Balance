# Data Model: Fix Navbar Alignment and Formatting

**Feature**: `004-fix-navbar-alignment`
**Date**: 2026-08-18

## Scope Statement

This feature is a presentation-layer change. **No persistent entities, database
tables, migrations, API endpoints, or message schemas are introduced or
modified.** The design tokens used by the navbar already exist in the theme CSS.

## UI Entities (presentation only — no persistence)

These are the renderable navbar surfaces whose geometry this feature normalizes.
They are **not** stored entities; they are described here so the plan and tasks
can reference a stable vocabulary.

| Entity | Composition | Geometry contract |
|--------|-------------|-------------------|
| Navbar bar | `nav.navbar` | Height driven by content; `0.875rem` vertical padding retained; frosted-glass background with solid fallback (FR-003) |
| Brand | `.navbar__brand` (logo + `.navbar__title`) | `inline-flex`, centered; shared vertical baseline with primary nav (FR-001) |
| Primary nav | `.navbar__item` `.navbar__link` (Curriculum) | Left group; centered on the shared baseline (FR-001) |
| Theme toggle | `.colorModeToggle` / `.navbar__items .clean-btn` | Right group; shares control geometry with GitHub link (FR-004) |
| GitHub link | `.navbar__item` `.navbar__link` (external) | Right group; shares control geometry with theme toggle (FR-004) |
| Mobile drawer | `.navbar-sidebar` + `.navbar-sidebar__backdrop` | Slide-in glass panel; opens without layout shift (FR-007) |
| Hamburger toggle | `.navbar__toggle` | Mobile-only; aligned to brand baseline (FR-007) |

## State / Lifecycle

No lifecycle states beyond what Docusaurus already provides:

- **Theme**: `light` / `dark` (`data-theme` attribute on the root element).
- **Viewport**: desktop (≥ `996px`, Infima `--ifm-navbar-height` breakpoint) and
  mobile (< `996px`).
- **Mobile drawer**: `open` / `closed`.
- **Focus**: `:focus-visible` ring on every interactive navbar element (FR-006).

## Validation Rules (derived from the spec)

- Every interactive navbar element MUST have a `min-block-size` of `44px`
  (FR-005 / WCAG 2.2 SC 2.5.8).
- Left-group and right-group elements MUST share a common vertical baseline
  (FR-001, FR-002).
- Theme toggle and GitHub link MUST share identical height, vertical padding,
  radius, and background treatment (FR-004).
- Navbar border MUST render exactly once in both themes (FR-009).
- Site title MUST ellipsize rather than push or wrap when space runs out
  (FR-010).
