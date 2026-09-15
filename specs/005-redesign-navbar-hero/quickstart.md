# Quickstart: Navbar + Hero Redesign

**Feature**: `005-redesign-navbar-hero`
**Date**: 2026-08-19

This runbook drives the built site through the four configurations in
`contracts/presentation-contract.md` and records the geometry, search behavior,
and screenshots used to verify SC-001..SC-010.

## Prerequisites

- Node ≥ 18 (`edu-site/package.json`).
- `cd edu-site && npm install` run (node_modules present).

## 1. Build

```bash
cd edu-site
npm run build                          # SC-008: must exit 0, no CSS/TS errors
```

## 2. Serve

```bash
npx serve build -l 4512 &
```

## 3. Navbar alignment + centered brand (C1–C4)

For each config, via Playwright evaluate:

```js
const center = (sel) => {
  const el = document.querySelector(sel);
  const r = el.getBoundingClientRect();
  return r.top + r.height / 2;
};
// Assert: |center(brand) - center(inner)| <= 2px (desktop)
// Assert: |center(left group) - center(right group)| <= 2px
// Assert: every interactive navbar element rect >= 44x44
```

## 4. Control parity

Compare the GitHub link, theme toggle, and search trigger computed style:
identical `height`, `padding-block`, `border-radius`, and `background`.

## 5. Search (FR-019)

- Open the search trigger → input is focused.
- Type a real curriculum term (e.g., "Git") → results appear within 200ms.
- ArrowDown → selection moves; Enter → navigates to the result route.
- Type nonsense → empty-state hint; Escape closes the panel.

## 6. Theme no-reflow (C2/C4)

Capture bounding boxes before/after a theme toggle → assert zero change for
navbar and hero elements (SC-007, navbar CLS = 0).

## 7. Hero mesh (C1/C2)

Assert no raster asset or external image request for the hero background
(network filter on `img`, `srcset`, `url()`), and that reduced-motion renders a
static mesh.

## 8. Focus + touch (all configs)

Tab through navbar + hero CTAs → Apple-blue focus rings, no layout shift; both
hero CTAs ≥44×44 CSS px.

## 9. Lighthouse

```bash
node scripts/lighthouse.mjs http://localhost:4512/   # SC-006: accessibility >= 95
```

## 10. Screenshots + report

- Capture before/after at C1–C4 under `specs/005-redesign-navbar-hero/verification/`.
- Report pass/fail per contract clause.

## Non-verification notes

- `edu-site/api` is untouched; no pytest tasks for this feature.
- The `better-auth` pyproject bug is out of scope (pre-existing).