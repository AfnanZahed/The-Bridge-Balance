# Quickstart: Hamburger Drawer Rebuild

**Branch**: `001-hamburger-rebuild`
**Stage**: Phase 1 — Design & Contracts
**Goal**: Verify the rebuilt hamburger end-to-end in under 5 minutes on a local Docusaurus dev server.

---

## Prerequisites

- Local checkout on branch `001-hamburger-rebuild`.
- `edu-site/` dependencies installed (`npm ci` if needed).
- Production server already running on `http://127.0.0.1:4173/`. If not:
  ```bash
  cd edu-site
  npm run build
  npx docusaurus serve --port 4173 --host 127.0.0.1
  ```

---

## Verification Matrix

Each row maps to a US/FR/SC triple in `spec.md`. Run them in order; the matrix is the Definition of Done.

| # | Viewport | Step | Expected |
|---|---|---|---|
| 1 | 390 × 844 | Click hamburger | Drawer fills 844px height, top anchored at navbar bottom. `aria-expanded=true`. |
| 2 | 390 × 844 | Click hamburger again | Drawer hidden. `aria-expanded=false`. `<html>` has no `data-drawer-open`. |
| 3 | 390 × 844 | Open drawer → tap backdrop | Drawer closes. |
| 4 | 390 × 844 | Open drawer → tap in-drawer link | Drawer closes, browser navigates to that route, matching link is `aria-current="page"`. |
| 5 | 390 × 844 | Open drawer → press `Escape` | Drawer closes, focus returns to hamburger button. |
| 6 | 390 × 844 | Scroll inside drawer | Drawer content scrolls; page behind does not. |
| 7 | 1440 × 900 | Click hamburger | Drawer panel appears as overlay anchored under navbar; main content is not pushed horizontally. |
| 8 | 1440 × 900 | Open drawer → resize window | Drawer remains visible and re-anchors without flicker or layout break. |
| 9 | 1440 × 900 | Open drawer → press `Tab` repeatedly | Focus traverses drawer links in document order, then wraps out via the close affordance. |
| 10 | 768 × 1024 | Click hamburger | Drawer fills height, panel width caps at `min(20rem, 82vw)`. |
| 11 | 996 × 768 | Click hamburger | Drawer behaves identically to 1440px (above the Docusaurus breakpoint). |
| 12 | All sizes | Toggle OS-level reduced motion | No transition is applied; drawer opens/closes instantly. |
| 13 | All sizes | Light + dark theme | Drawer surface, text, divider, shadow use the existing tokens; nothing flat-on-flat. |
| 14 | DevTools | Inspect `<html>` while drawer is open | Attribute `data-drawer-open="true"` present. `<body>` overflow hidden via CSS. |

If all 14 rows pass, the rebuild is shippable.

---

## Manual Reproduction (Playwright MCP)

If using Playwright MCP for verification, the equivalent script:

```js
// 1. Resize to mobile
await page.setViewportSize({ width: 390, height: 844 });

// 2. Open the drawer
await page.locator('[aria-label="Open menu"]').click();

// 3. Read geometry
const drawer = page.locator('#site-drawer');
const box = await drawer.boundingBox();
console.log('drawer', box); // expect { width: 320ish, height: 844, y: 60 }

// 4. Confirm aria
await expect(page.locator('[aria-label="Close menu"]')).toBeVisible();

// 5. Dismiss with Escape
await page.keyboard.press('Escape');
await expect(page.locator('#site-drawer')).toBeHidden();

// 6. Confirm focus return
const focused = await page.evaluate(() => document.activeElement?.getAttribute('aria-label'));
console.log('focused label', focused); // expect "Open menu"
```

Run on every viewport from the matrix.

---

## Definition of Done Checklist

- [ ] Source code lives in exactly three files under `edu-site/src/components/SiteMenu/`.
- [ ] `npm run build` succeeds (no Docusaurus swizzle warnings introduced).
- [ ] `npm run typecheck` succeeds.
- [ ] All 14 rows in the verification matrix pass on a fresh build.
- [ ] `prefers-reduced-motion: reduce` is respected (manual toggle in DevTools).
- [ ] No new dependencies added to `package.json`.
- [ ] No leftover CSS `:has()` projection of `.theme-doc-sidebar-container` at desktop (the rebuild removes that hack).
- [ ] CHANGELOG / PHR entry recorded at `history/prompts/001-hamburger-rebuild/`.
