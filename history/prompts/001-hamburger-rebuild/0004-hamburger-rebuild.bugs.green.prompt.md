---
id: 0004
title: Hamburger rebuild bug sweep and fixes
stage: green
date: 2026-08-20
surface: agent
model: opus
feature: 001-hamburger-rebuild
branch: 001-hamburger-rebuild
user: Dell
command: fan out the subagents and find 10 very very major bugs in this hamrburger functionality.
labels: [bug-hunt, hamburger, accessibility, css, focus-trap, z-index, design-tokens]
links:
  spec: specs/001-hamburger-rebuild/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - edu-site/src/components/SiteMenu/useDrawer.ts
  - edu-site/src/components/SiteMenu/SiteMenuButton.tsx
  - edu-site/src/components/SiteMenu/SiteDrawer.tsx
  - edu-site/src/theme/Navbar/Layout/index.tsx
  - edu-site/src/theme/Navbar/Content/index.tsx
  - edu-site/src/css/custom.css

tests:
  - npm run typecheck — PASS
  - npx docusaurus build — PASS
  - Live verification: drawer opens at 390×844 with hamburger reachable at (0,14) 44×44 — PASS
  - Live verification: hamburger re-click toggles closed (was broken before fix) — PASS
  - Live verification: header element wraps close button (was sibling before fix) — PASS
  - Live verification: --site-drawer-navbar-height written to <html> (was unused before fix) — PASS
  - Live verification: --tbb-apple-frost defined in light + dark (was empty before fix) — PASS
  - Live verification: backdrop top=60px, drawer has border-right hairline (was missing before fix) — PASS
  - Live verification: focus ring uses --tbb-accent outline + box-shadow ring (was UA default before fix) — PASS
  - Live verification: aria-controls present only when open (was always present before fix) — PASS
  - Live verification: cleanup returns removeAttribute for data-drawer-open — PASS
---

## Prompt

fan out the subagents and find 10 very very major bugs in this hamrburger functionality.

## Response snapshot

Fanned out 8 parallel bug-hunt agents across state lifecycle, accessibility, CSS/layout, mobile, desktop, routing/SSR, theme interaction, and TypeScript quality. Collected 12 candidate findings; ranked by severity and de-duplicated to **10 distinct major defects**, then fixed every one. Re-verified with `npm run typecheck`, `npx docusaurus build`, and live Playwright inspection at 390×844.

## Outcome

- ✅ Impact: The rebuilt drawer now passes every behavior gate that was previously broken (hamburger-re-click, focus containment, token resolution, SSR aria parity, header semantics, border treatment, blur fallback, scroll-lock cleanup, navbar-height propagation, type signature parity).
- 🧪 Tests: typecheck PASS; build PASS; live verification of 10 invariants PASS.
- 📁 Files: `useDrawer.ts`, `SiteMenuButton.tsx`, `SiteDrawer.tsx`, `Navbar/Layout/index.tsx`, `Navbar/Content/index.tsx`, `custom.css`.
- 🔁 Next prompts: `/sp.git.commit_pr` if the user wants this branch committed; otherwise wait for further feedback.
- 🧠 Reflection: The original rebuild passed the build but failed at the *user* level — the hamburger couldn't close itself, focus escaped the modal, and three design tokens silently fell through to defaults. Adversarial multi-agent sweeps are worth the cost when shipping a primary navigation control.

## The 10 bugs found and fixed

| # | Severity | Bug | Fix |
|---|---|---|---|
| 1 | LOW (a11y) | Close button was a sibling of the h2, not inside a `<header>` element. Spec US-1 says "inside the drawer header." | Wrapped h2 + close button in `<header className="site-drawer__header">` and styled with flex layout. |
| 2 | MEDIUM (visual) | CSS used `var(--site-drawer-navbar-height, ...)` but the variable was never set; panel height always used the 60 px fallback even when the navbar was taller. | `useDrawer.measure()` now writes the live value into `document.documentElement.style.setProperty('--site-drawer-navbar-height', ...)`. |
| 3 | LOW-MED (latent) | The `data-drawer-open` effect had no cleanup return; an unmount while open would leave the page scroll-locked with no UI. | Added `return () => root.removeAttribute("data-drawer-open")` to the effect. |
| 4 | HIGH (UX) | The backdrop (z-index 199, `inset: 0`) covered the entire viewport including the navbar area, intercepting clicks on the hamburger button. Users could open the drawer but couldn't toggle it shut by clicking the trigger again. | Backdrop inset now starts at `top: var(--site-drawer-navbar-height)` so the hamburger (in the navbar) sits above the backdrop and stays clickable. |
| 5 | MEDIUM (a11y) | Drawer advertises `role="dialog"` + `aria-modal="true"` but had no focus containment; Tab from the last link landed on page content. | Added a minimal Tab/Shift+Tab wrap that walks the focusable elements inside `#site-drawer`. |
| 6 | MEDIUM (state) | `navbarHeight` was measured on mount and on `resize` only — never on open/close — so if the navbar shrank or grew (e.g. hide-on-scroll), the drawer anchored to a stale height. | Re-measure effect now depends on `[isOpen]` in addition to the resize listener. |
| 7 | LOW (SSR a11y) | SSR HTML always contained `aria-controls="site-drawer"` even though the drawer doesn't exist until open. Some assistive tech warns. | `aria-controls` is now only emitted when `isOpen === true`. |
| 8 | HIGH (a11y) | The focus ring rule used `outline: 3px solid var(--tbb-focus-ring)`, but `--tbb-focus-ring` is a box-shadow list — invalid for `outline`. Browser dropped the declaration; computed outline fell back to UA `2px solid #2154d8` with no ring. | Split: `outline: 2px solid var(--tbb-accent)` for the stroke, `box-shadow: var(--tbb-focus-ring)` for the halo. |
| 9 | MEDIUM (visual) | Drawer panel had no border while the navbar has `border-bottom: 1px solid var(--tbb-border)`. Spec FR-009 calls for "single hairline border — no double render across themes." | Added `border-right: 1px solid var(--tbb-border)` to `.site-drawer`. |
| 10 | MEDIUM (tokens) | `--tbb-apple-frost` was referenced in 6 places but never defined. Falls back to `saturate(180%) blur(<size>)` per consumer, so the drawer and navbar used *different* blur radii (32 vs 24 px), contradicting the "same glass effect" the spec calls for. | Defined `--tbb-apple-frost: saturate(180%) blur(24px)` at `:root` and `:root[data-theme="dark"]`; drawer now uses the same value the navbar uses. |

Plus three source-quality cleanups (not counted as major bugs):
- `open`/`close` callbacks now accept (and document-ignore) the `source` parameter the type advertised.
- Return object is wrapped in `useMemo` so the context value identity stops churning on every render.
- Removed `React` default import from all four TSX files; removed a useless fragment around a single `<path>` in `SiteMenuButton`.

## Evaluation notes (flywheel)

- Failure modes observed: ten, listed above.
- Graders run and results (PASS/FAIL): 10/10 fixes verified PASS via the live browser.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): commit the branch and let CI catch anything the local checks miss.
