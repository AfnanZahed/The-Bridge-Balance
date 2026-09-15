---
id: 0005
title: Hamburger rebuild — round 2 bug sweep and architectural fix
stage: green
date: 2026-08-20
surface: agent
model: opus
feature: 001-hamburger-rebuild
branch: 001-hamburger-rebuild
user: Dell
command: (continuation of the previous bug-sweep conversation)
labels: [bug-hunt, hamburger, accessibility, focus, portal, z-index, structural]
links:
  spec: specs/001-hamburger-rebuild/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - edu-site/src/theme/Navbar/Layout/index.tsx
  - edu-site/src/components/SiteMenu/useDrawer.ts
  - edu-site/src/components/SiteMenu/SiteDrawer.tsx
  - edu-site/src/css/custom.css

tests:
  - npm run typecheck — PASS
  - npx docusaurus build — PASS
  - Live verification: backdrop covers full viewport (380×844 at 390 viewport) — PASS
  - Live verification: drawer offsetParent is no longer NAV (now document body) — PASS
  - Live verification: focus moves from trigger into drawer on open (active = .site-drawer__close) — PASS
  - Live verification: focus restores to hamburger on backdrop click, close-button click, and Escape — PASS
  - Live verification: aria-labels distinct ("Close menu" vs "Close site navigation") — PASS
  - Live verification: hamburger re-click toggles closed while drawer is open — PASS
  - Live verification: Tab from close button wraps to first link inside drawer — PASS
---

## Prompt

(continuation — the CSS-layout agent and the accessibility agent both reported after the initial 10-bug fix.)

## Response snapshot

The CSS-layout agent found that the Bug 4 fix (reducing the backdrop inset) only papered over the real problem: the drawer was mounted **inside** `<nav class="navbar">`, and the navbar's `backdrop-filter` made it a containing block for fixed descendants — so `position: fixed; inset: 0` resolved against the navbar, not the viewport. The accessibility agent then found that `aria-modal="true"` had no actual modal behavior (focus stayed on trigger after open; close button and backdrop dropped focus to body) and that the in-drawer close button duplicated the trigger's "Close menu" label.

**Architectural fix:** moved `<SiteDrawer />` from inside `<nav>` to be a sibling of `<nav>` in the swizzled `Layout`, so `position: fixed` resolves against the document viewport. Restored the backdrop's `inset: 0` (the inset reduction is no longer needed) and gave the open navbar `z-index: 202` so the hamburger remains above the backdrop.

**Modal-behavior fix:** added a focus-on-open effect that moves focus into `.site-drawer__close` when the drawer opens; modified `close()` to restore focus to the trigger on every path (button, backdrop, link, programmatic) except route-change.

**Label fix:** renamed the in-drawer close to `"Close site navigation"` so it no longer duplicates the trigger's `"Close menu"`.

## Outcome

- ✅ Impact: The drawer now behaves as a true modal — backdrop covers the full viewport, focus enters on open, focus restores on every close path, and the open navbar (with the hamburger) sits above the backdrop so the hamburger can always re-toggle the drawer shut.
- 🧪 Tests: 8/8 invariants PASS via Playwright at 390×844; typecheck PASS; build PASS.
- 📁 Files: `theme/Navbar/Layout/index.tsx` (drawer mounted as sibling of `<nav>`), `useDrawer.ts` (focus-on-open, `close()` always restores focus), `SiteDrawer.tsx` (label disambiguation), `custom.css` (backdrop inset restored to `inset: 0`; `.navbar.navbar-sidebar--show` gets `z-index: 202`).
- 🔁 Next prompts: `/sp.git.commit_pr` whenever ready.
- 🧠 Reflection: The original hamburger bug (PHR 0006) was caused by `backdrop-filter` creating a containing block for `position: fixed` descendants. The rebuild initially re-introduced the same root cause by mounting the drawer inside the filtered navbar; the first round of fixes only masked the symptom. Moving the drawer out of the navbar is the architectural fix.

## What changed since the round-1 PHR (0004)

| Round-1 fix | Round-1 effect | Round-2 fix | Round-2 effect |
|---|---|---|---|
| Bug 4 — backdrop intercepts hamburger clicks | Reduced backdrop inset to `top: var(--site-drawer-navbar-height)` | Mount `<SiteDrawer />` outside `<nav>`; restore `inset: 0`; raise open navbar to `z-index: 202` | Backdrop covers viewport; hamburger stays above backdrop and is clickable |
| (new) Modal focus on open | `useEffect` only handled Escape | Added focus-on-open effect → `.site-drawer__close` | Focus enters dialog on open |
| Bug 5 — close-button/backdrop drop focus | Only Escape restored focus | `close()` always restores focus to trigger | Every dismissal path restores focus |
| (new) Duplicate "Close menu" labels | Both buttons shared the label | In-drawer close renamed to "Close site navigation" | Distinct labels |

## Evaluation notes (flywheel)

- Failure modes observed: 3 additional P1/P2 defects surfaced after round-1.
- Graders run and results (PASS/FAIL): 8/8 PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): commit and let CI catch anything the local checks miss.
