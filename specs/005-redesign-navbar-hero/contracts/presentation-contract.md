# Presentation Contract: Navbar + Hero Redesign

**Feature**: `005-redesign-navbar-hero`
**Date**: 2026-08-19
**Type**: Presentation contract (visual + client-side static search — no HTTP API surface)

## Purpose

This feature has no backend endpoints. The "contract" is the **observable
rendering, geometry, and behavior** of the redesigned navbar, search panel, and
hero across the four required configurations. A verifier measures these to prove
the spec's success criteria.

## Configuration matrix (SC-001/SC-003/SC-007)

| Config | Viewport | Theme |
|---|---|---|
| C1 | Desktop ≥ 996px | Light |
| C2 | Desktop ≥ 996px | Dark |
| C3 | Mobile < 996px | Light |
| C4 | Mobile < 996px | Dark |

## Navbar — observable surface

- **Centered brand**: the brand (logo + title) center line is within ≤2px of the
  navbar inner vertical center on desktop; left nav and right actions share one
  baseline (FR-001, FR-012).
- **Control parity**: GitHub link, theme toggle, and the search trigger share
  height, padding-block, border-radius, and material (FR-004).
- **Touch targets**: every interactive navbar element ≥44×44 CSS px (FR-006).
- **Focus**: Apple-blue `:focus-visible` ring, no layout shift (FR-007).
- **Theme transition**: no bounding-box change on toggle; navbar CLS = 0 (FR-008).
- **Border**: one hairline at the bottom edge in both themes (FR-009).
- **Title**: ellipsizes rather than wraps or pushes (FR-010).
- **Mobile drawer**: opens without page-layout shift (FR-011).

## Search panel — observable surface (FR-019)

- Opened from a navbar search trigger; focus lands in the input.
- Typing a query shows results (or an empty-state hint) in a panel anchored
  under the trigger; debounce ≤ 200ms.
- Results are keyboard-navigable: ArrowDown/ArrowUp move selection, Enter
  navigates to the result route, Escape closes the panel.
- Result hit areas ≥44px; the panel is clipped to the viewport on mobile.
- No network dependency: index is static; search is client-side only.

## Hero — observable surface (FR-014..FR-018)

- A new mesh-gradient background (no raster asset, no external image request)
  that renders differently from the old arch artwork.
- Mark, eyebrow, headline, subtitle, CTA row, and meta row render the approved
  copy with the new composition; primary CTA is visually dominant.
- Both CTAs ≥44×44 CSS px with Apple-blue focus rings (FR-015).
- Reduced-motion: mesh and any reveals are static.
- Theme toggle changes no hero bounding box (CLS = 0 contribution).

## Non-goals (out of contract)

- No HTTP endpoints, request/response schemas, or API versioning.
- No DB entities or migrations (see `../data-model.md`).
- No changes to doc/chapter pages, footer, backend, IA, or content copy.
