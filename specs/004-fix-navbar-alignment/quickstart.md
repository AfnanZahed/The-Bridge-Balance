# Quickstart: Fix Navbar Alignment and Formatting

**Feature**: `004-fix-navbar-alignment`
**Date**: 2026-08-18

This runbook drives the built site through the four configurations defined in
`contracts/visual-contract.md` and records the computed geometry. It is the
verification method for SC-001..SC-005.

## Prerequisites

- Node ≥ 18 (per `edu-site/package.json` engines).
- `cd edu-site && npm install` already run (node_modules present).

## 1. Inspect current computed geometry (before fix)

```bash
cd edu-site
npm start -- --port 4514 &
```

With Playwright at `https://localhost:4514` and `?theme=light` / `?theme=dark`
(or the color-mode toggle), evaluate, per config C1–C4:

```js
for (const sel of [".navbar__brand", ".navbar__link", ".navbar__items .clean-btn"]) {
  const el = document.querySelector(sel);
  const r = el.getBoundingClientRect();
  console.log(sel, r.top, r.height, r.width);
}
```

Record the values — they establish the "before" delta this feature removes.

## 2. Inspect control geometry parity

Compare `.navbar__items .clean-btn` (theme toggle) vs the right-group GitHub
`.navbar__link`:

```js
const t = document.querySelector("button.clean-btn[aria-label*='switch']");
const g = [...document.querySelectorAll(".navbar__link")].find(a => a.textContent.includes("GitHub"));
for (const [n, el] of [["toggle", t], ["github", g]]) {
  const s = getComputedStyle(el);
  console.log(n, el.getBoundingClientRect().height, s.paddingBlock, s.borderRadius, s.background);
}
```

## 3. Apply the CSS layer (during implementation)

Add the navbar geometry overrides to `edu-site/src/css/custom.css` (aligned with
`custom.css:358-371` navbar block and `a11y.css` touch/focus rules). No config,
content, or JS changes are expected.

## 4. Build and serve

```bash
cd edu-site
npm run build                                  # must exit 0 (SC-005)
npx serve build -l 4512 &                      # or: npm run serve
```

## 5. Verify the four configurations (SC-001)

For each of C1 (desktop/light), C2 (desktop/dark), C3 (mobile/light),
C4 (mobile/dark):

1. Navigate to the homepage.
2. Assert the shared vertical center line within ≤ 2px (baseline contract).
3. Assert theme toggle + GitHub parity (height, padding-block, radius,
   background) on desktop configs.
4. Assert every interactive navbar element ≥ 44×44 CSS px.
5. Toggle theme → capture bounding boxes before/after; assert no change
   (SC-004 CLS = 0).
6. Capture a screenshot per config for the regression artifact.

## 6. Keyboard focus (SC-003, FR-006)

Tab to each navbar element and assert the Apple-blue `:focus-visible` ring and
no layout shift on focus.

## 7. Mobile drawer (FR-007)

At C3/C4, open the drawer and assert no layout shift; the hamburger stays on
the brand baseline.

## 8. Report

- Screenshots: 4 (one per config) stored under the feature's verification dir
  (or inlined in the PHR if run in-session).
- Geometry table: element → top/height/width per config.
- Pass/fail per contract clause.

## Non-Verification Notes

- No backend tests: `edu-site/api` is untouched (spec has no API surface).
- The existing `pytest` smoke suite and its pre-existing `better-auth`
  pyproject bug are out of scope for this feature.