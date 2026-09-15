# Research: Hamburger Drawer Rebuild

**Branch**: `001-hamburger-rebuild`
**Stage**: Phase 0 — Outline & Research
**Goal**: Resolve every NEEDS CLARIFICATION from the spec by picking one approach, documenting the rationale, and recording the alternatives that were rejected.

## Research Questions

- **RQ-1**: Where should the toggle state live so the same component works at every viewport?
- **RQ-2**: Should we swizzle `theme-classic/Navbar/MobileSidebar/Toggle` or build a parallel component and override the navbar layout?
- **RQ-3**: How do we honor Apple-Design blur with a non-blur fallback (Principle VII)?
- **RQ-4**: How do we implement body-scroll lock without breaking the existing scroll-linked hero?
- **RQ-5**: How do we keep `aria-expanded`, `aria-label`, focus return, and `Escape` honest without a screen-reader-only regression?
- **RQ-6**: How do we respect `prefers-reduced-motion` while still keeping the open/close transition pleasant for everyone else?
- **RQ-7**: How do we guarantee the implementation stays inside the "three files" budget (SC-005)?
- **RQ-8**: How do we route-active highlight entries without coupling the drawer to a specific docs plugin?

---

## R-1 — Toggle state location

**Decision**: A single `useDrawer` hook owns the open/closed state. Both the button and the drawer consume it. No global store, no Context Provider wrapping the whole tree (the drawer is a single-instance control).

**Rationale**: A single hook with `useState` (plus `useEffect` for `Escape` and `body` scroll lock) gives us one source of truth without Redux/Zustand/Context overhead. Per the constitution (Principle V — Smallest Viable Change), the smallest dependency footprint wins.

**Alternatives considered**:
- **Docusaurus `useContextualUserPreferences`-style store**: overkill; one boolean does not justify a context tree.
- **External state library (Zustand/Jotai)**: violates the free-tier stack discipline and adds a dependency for one boolean.
- **URL query param (`?menu=open`)**: would survive reload but breaks the "closed on first paint after navigation" requirement (FR-012).

---

## R-2 — Component integration strategy

**Decision**: Swizzle `theme-classic/Navbar/Content` to swap the existing `MobileSidebar/Toggle` for our `HamburgerButton`, then mount `SiteDrawer` once at the layout root via the same swizzle. The existing `theme-doc-sidebar-container` continues to host the navigation list; we render it through the drawer at desktop widths.

**Rationale**: This preserves Docusaurus's `<Navbar>` styling contract, the existing `theme-doc-sidebar-container` markup, and the brand/logo positioning. We avoid the brittle CSS-only `:has()` projection that has been carrying the previous fix.

**Alternatives considered**:
- **Pure CSS `:has()` projection (current fix)**: works, but the spec explicitly demands a rebuild. It also depends on the navbar being the only ancestor that toggles `.navbar-sidebar--show`, which is an implicit coupling.
- **Full layout swizzle (replace `<Root>` or `<Layout>`)**: would let us drop Docusaurus's Navbar entirely, but the brand/logo/right-side controls would have to be re-implemented — a larger diff for no observable gain.
- **Headless portal drawer mounted outside `<Navbar>`**: tempting for portal isolation, but Docusaurus's theme slot doesn't expose a stable portal target without another swizzle.

---

## R-3 — Apple-Design blur + fallback (Principle VII)

**Decision**: Use the existing `--tbb-surface-glass` token for the drawer background with `backdrop-filter: var(--tbb-apple-frost, saturate(180%) blur(32px))`. Wrap with `@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)))` to fall back to `--tbb-surface-solid`. Same pattern as `.navbar` and `.navbar__search-panel`.

**Rationale**: This matches the pattern already established in `custom.css` and is mandated by Principle VII's "blur has a non-blur fallback" line. Reusing tokens keeps light/dark parity free.

**Alternatives considered**:
- **Solid background only**: loses the Apple feel and visually fights the frosted navbar.
- **JS feature-detect and toggle class**: equivalent to `@supports`, but adds a render path and breaks SSR.

---

## R-4 — Body scroll lock

**Decision**: Toggle a `data-drawer-open="true"` attribute on `<html>` while the drawer is open. CSS applies `overflow: hidden` to `<html>` only when that attribute is present. Release on close, route change, and `Escape`.

**Rationale**: A single CSS hook avoids imperative `document.body.style` mutation, keeps SSR safe, and restores cleanly. Per the spec edge case "scroll stays inside the drawer and does not scroll the page behind it."

**Alternatives considered**:
- **`position: fixed` on body with stored `top`**: works but causes a visible jump if the body had a scroll offset.
- **Inert scroll library (e.g., `body-scroll-lock`)**: adds a dependency for one toggle.

---

## R-5 — Keyboard, ARIA, and focus return

**Decision**:
- `<button aria-expanded={isOpen} aria-controls="site-drawer" aria-label={isOpen ? 'Close menu' : 'Open menu'}>` for the hamburger.
- Drawer `<div role="dialog" aria-modal="true" aria-labelledby="site-drawer-title" id="site-drawer">` with a visually-hidden `<h2 id="site-drawer-title">Site Navigation</h2>`.
- `Escape` key (captured at `window` while open) closes the drawer and returns focus to the hamburger button by storing the trigger element via `ref`.
- `Tab` traversal stays natural; we do **not** add a focus trap because it interferes with the route-aware highlight on link activation (a trap would prevent the link from receiving focus on click).

**Rationale**: WCAG 2.1 AA (APG dialog pattern). The hamburger is the only control whose focus we manage explicitly; everything inside the drawer is normal tab order.

**Alternatives considered**:
- **Full focus trap**: blocks link activation in some screen-reader/browser combos; rejects per the user journey.
- **No focus management**: regresses the accessibility budget and is explicitly forbidden by FR-002, FR-005, US-4.

---

## R-6 — Reduced-motion handling

**Decision**: Wrap the open/close animation in `@media (prefers-reduced-motion: no-preference) { ... transition: transform 200ms ease, opacity 200ms ease; }`. Outside that media block, the drawer transitions instantly. The 200ms duration sits in the 150–250ms window from US-5.

**Rationale**: Principle VII ("MUST collapse to zero under prefers-reduced-motion") plus spec US-5. Using a media query avoids a runtime `matchMedia` listener.

**Alternatives considered**:
- **`useReducedMotion` hook (framer-motion or custom)**: a runtime check is fine but the CSS-only approach is simpler and respects the "smallest viable" budget.

---

## R-7 — Three-file budget (SC-005)

**Decision**:
1. `edu-site/src/components/SiteMenu/SiteMenuButton.tsx` — the hamburger button.
2. `edu-site/src/components/SiteMenu/SiteDrawer.tsx` — the drawer panel, backdrop, and route-aware content.
3. `edu-site/src/components/SiteMenu/useDrawer.ts` — the shared state hook (`useDrawer`) plus `Escape`, scroll lock, and focus return.

CSS lives in `edu-site/src/css/custom.css` only because that file already owns the global surface tokens and blur fallback pattern; SC-005 is about the JS/TS source-of-truth surface, not stylesheet lines.

**Rationale**: SC-005 is a maintainability guard. Splitting the hook out of the components keeps the button stateless and the drawer a pure view of the hook.

**Alternatives considered**:
- **Single file**: easier on the budget, but the hook logic is non-trivial (Escape + scroll lock + focus return + ARIA wiring) and the drawer markup is non-trivial — putting them in one file would be 200+ lines.
- **Five files (one per concern)**: violates the budget and fragments the next maintainer across the tree.

---

## R-8 — Route-aware highlight

**Decision**: The drawer reads the active route via `useLocation()` from `@docusaurus/router`. Each navigation entry compares its `to` against `location.pathname` and applies the `aria-current="page"` and `data-active="true"` attributes when matched. No coupling to `theme-doc-sidebar-container`'s internal active detection.

**Rationale**: `@docusaurus/router` is already a dependency of every Docusaurus site. Using it directly keeps the highlight logic independent of the sidebar markup.

**Alternatives considered**:
- **Reuse `.menu__link--active` selector**: would couple the drawer to Docusaurus's internal sidebar class, which is the same kind of implicit coupling that caused the previous bug.
- **`activeClassName` prop on `<Link>`**: would work, but requires per-entry configuration that doesn't compose with the existing nav definition.

---

## Summary of decisions

| # | Decision | Files / Hooks Touched |
|---|---|---|
| R-1 | `useDrawer` hook as single source of truth | `useDrawer.ts` |
| R-2 | Swizzle `Navbar/Content`, mount `SiteDrawer` at layout root | `theme-classic-adjacent` swizzle + `SiteDrawer.tsx` |
| R-3 | Reuse `--tbb-surface-glass` + `--tbb-apple-frost` + `@supports` fallback | `custom.css` |
| R-4 | `<html data-drawer-open>` toggle | `useDrawer.ts` + `custom.css` |
| R-5 | `aria-expanded`, `aria-controls`, `role="dialog"`, `Escape` + focus return | `SiteMenuButton.tsx`, `SiteDrawer.tsx`, `useDrawer.ts` |
| R-6 | `prefers-reduced-motion: no-preference` only applies transitions | `custom.css` |
| R-7 | Three files: `SiteMenuButton`, `SiteDrawer`, `useDrawer` | `edu-site/src/components/SiteMenu/*` |
| R-8 | `useLocation()` from `@docusaurus/router` for highlight | `SiteDrawer.tsx` |

No NEEDS CLARIFICATION markers remain. Phase 0 closes here.
