# Tasks: Hamburger Drawer Rebuild

**Input**: Design documents from `/specs/001-hamburger-rebuild/`
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/useDrawer.md`, `quickstart.md`
**Testing approach**: The spec requests measurable browser behavior, so Playwright verification tasks are included. No new test framework or dependency is introduced.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel when files and dependencies do not overlap.
- **[Story]**: Required for user-story tasks; maps to `spec.md` stories.
- Every task names the exact file or command surface it changes.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the bounded source surface and preserve the current implementation for comparison.

- [x] T001 Create `edu-site/src/components/SiteMenu/` and record the current hamburger behavior baseline in `specs/001-hamburger-rebuild/quickstart.md` before changing source files.
- [x] T002 [P] Inspect `edu-site/package.json`, `edu-site/docusaurus.config.ts`, and the active Docusaurus theme swizzle tree to confirm existing router imports and navbar item configuration; document any path mismatch in `specs/001-hamburger-rebuild/plan.md`.
- [x] T003 [P] Capture current CSS selectors for `.navbar__toggle`, `.navbar-sidebar`, `.navbar-sidebar__backdrop`, and the desktop `:has()` projection in `edu-site/src/css/custom.css` so removal does not delete unrelated navbar styling.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the single state contract and integration seam before story-specific presentation work.

- [x] T004 Define the shared `DrawerController` type and `useDrawer` state lifecycle in `edu-site/src/components/SiteMenu/useDrawer.ts`, including `isOpen`, `open`, `close`, `toggle`, trigger ref, `Escape`, route-change close, resize handling, and cleanup per `specs/001-hamburger-rebuild/contracts/useDrawer.md`.
- [x] T005 Implement the controller ownership seam in `edu-site/src/theme/Navbar/Content/index.tsx` so exactly one `useDrawer()` instance supplies the same controller to `SiteMenuButton` and `SiteDrawer`; do not create independent hook instances for the two views.
- [x] T006 Add the neutral global state hooks in `edu-site/src/css/custom.css`: `html[data-drawer-open]` scroll lock, non-blur fallback, focus-visible styling, and reduced-motion defaults. Preserve existing navbar selectors.
- [x] T007 Verify the default Docusaurus `MobileSidebar` and `MobileSidebar/Toggle` are no longer mounted as competing hamburger/drawer instances in `edu-site/src/theme/Navbar/Content/index.tsx`; retain only one button, one drawer, and one backdrop in the rendered tree.

**Checkpoint**: The shared controller exists, the navbar has one integration seam, CSS has safe defaults, and no competing Docusaurus drawer is mounted.

---

## Phase 3: User Story 1 — Open and Dismiss the Drawer (Priority: P1) 🎯 MVP

**Goal**: A reader can open and close one full-height drawer through every primary pointer dismissal path.

**Independent Test**: At 390×844 and 1440×900, click the hamburger, assert the drawer opens and `aria-expanded=true`, then close with the hamburger, close affordance, backdrop, and an in-drawer link.

### Implementation

- [x] T008 [US1] Implement the native button markup and toggle presentation in `edu-site/src/components/SiteMenu/SiteMenuButton.tsx`: 44×44px target, `aria-expanded`, `aria-controls="site-drawer"`, state-dependent accessible label, focus-visible state, and controller-driven click behavior.
- [x] T009 [US1] Implement the drawer shell in `edu-site/src/components/SiteMenu/SiteDrawer.tsx`: semantic drawer container, close affordance, backdrop click handler, panel pointer-event isolation, and controller-driven open/closed attributes.
- [x] T010 [US1] Add `.site-drawer`, `.site-drawer__backdrop`, `.site-drawer__panel`, and `.site-drawer__close` geometry rules in `edu-site/src/css/custom.css` so the drawer fills the viewport height, anchors below the measured navbar, and does not displace page content.
- [x] T011 [US1] Add the drawer's primary navigation entry rendering and link-close behavior in `edu-site/src/components/SiteMenu/SiteDrawer.tsx`, using the existing navbar navigation data rather than introducing a second taxonomy.

**Checkpoint**: User Story 1 works independently at mobile and desktop widths, with all pointer dismissal paths passing.

---

## Phase 4: User Story 2 — Navigate from the Drawer (Priority: P1)

**Goal**: Drawer links navigate correctly and expose the active route.

**Independent Test**: Open the drawer on the home page and a docs page, click a different entry, assert URL navigation and active-route semantics.

- [x] T012 [US2] Map the existing navbar entries into typed drawer navigation entries in `edu-site/src/components/SiteMenu/SiteDrawer.tsx`, preserving labels, destinations, ordering, and external-link behavior.
- [x] T013 [US2] Add `useLocation()` route matching and `aria-current="page"` / `data-active="true"` state to matching links in `edu-site/src/components/SiteMenu/SiteDrawer.tsx`, including parent-route matching for nested docs paths.
- [x] T014 [US2] Close the controller before internal navigation commits and verify route-change cleanup in `edu-site/src/components/SiteMenu/useDrawer.ts`, so destination pages paint closed and do not retain scroll lock.
- [x] T015 [US2] Verify docs and home navigation destinations against the current site routes in `edu-site/src/components/SiteMenu/SiteDrawer.tsx` and `edu-site/docusaurus.config.ts`; correct only the drawer mapping, not the site taxonomy.

**Checkpoint**: User Stories 1 and 2 both work; every visible entry navigates and active state is route-aware.

---

## Phase 5: User Story 3 — All Viewports and Resize (Priority: P2)

**Goal**: The same hamburger logic works at 360, 768, 996, and 1440px widths and survives resize while open.

**Independent Test**: Run the viewport rows in `specs/001-hamburger-rebuild/quickstart.md` and compare drawer geometry, button target, and content displacement.

- [x] T016 [US3] Implement measured navbar anchoring and resize remeasurement in `edu-site/src/components/SiteMenu/useDrawer.ts`, using the navbar bounding rectangle rather than a hard-coded 60px top value.
- [x] T017 [US3] Add responsive panel width and full-height rules in `edu-site/src/css/custom.css` for phone, tablet, breakpoint, and desktop ranges without reintroducing `.theme-doc-sidebar-container` projection.
- [x] T018 [US3] Remove the obsolete `.navbar-sidebar` viewport-anchor overrides and desktop `body:has(.navbar.navbar-sidebar--show) .theme-doc-sidebar-container` projection from `edu-site/src/css/custom.css` after the new drawer is mounted and verified as the sole overlay.
- [x] T019 [US3] Verify resize behavior at 360, 768, 996, and 1440px with the drawer open, including no horizontal layout shift, no pointer-event leak, and no body scroll leak; record results in `specs/001-hamburger-rebuild/quickstart.md`.

**Checkpoint**: User Stories 1–3 pass at all required widths and the old breakpoint-dependent drawer path is absent.

---

## Phase 6: User Story 4 — Keyboard and Assistive Technology (Priority: P2)

**Goal**: Keyboard and screen-reader users can operate the full drawer lifecycle.

**Independent Test**: Focus the button, use Enter/Space to open, Tab through links, press Escape, and assert focus returns to the button with honest ARIA state.

- [x] T020 [US4] Implement `Escape` listener, focus restoration, route-change cleanup, and effect teardown in `edu-site/src/components/SiteMenu/useDrawer.ts` with SSR-safe guards and no stale event listeners.
- [x] T021 [US4] Add dialog semantics to `edu-site/src/components/SiteMenu/SiteDrawer.tsx`: stable `id="site-drawer"`, `role="dialog"`, `aria-modal="true"`, labelled heading, and `aria-hidden`/visibility parity with controller state.
- [x] T022 [US4] Add keyboard and focus-visible styling in `edu-site/src/css/custom.css`, ensuring native button/link tab order remains usable and reduced-motion users do not lose focus during an instantaneous transition.
- [x] T023 [US4] Verify keyboard, Escape, focus return, accessible names, `aria-expanded`, `aria-controls`, and `aria-current` using the accessibility snapshot and browser keyboard flow; record results in `specs/001-hamburger-rebuild/quickstart.md`.

**Checkpoint**: User Stories 1–4 pass without a mouse and the drawer's accessibility tree matches its visual state.

---

## Phase 7: User Story 5 — Visual Polish and Motion (Priority: P3)

**Goal**: The rebuilt drawer matches Apple-Design tokens, light/dark themes, blur fallback, and motion preferences.

**Independent Test**: Inspect the open drawer in light and dark mode with motion enabled and reduced; verify surface contrast, fallback, and transition timing.

- [x] T024 [US5] Apply existing Apple-Design tokens to `.site-drawer__panel`, backdrop, close button, links, active link, divider, and shadow in `edu-site/src/css/custom.css`; do not add new color tokens or Tailwind classes.
- [x] T025 [US5] Add the `@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)))` solid-surface fallback and the `prefers-reduced-motion` transition override in `edu-site/src/css/custom.css`.
- [x] T026 [US5] Verify light/dark contrast, blur fallback, focus-visible rings, 150–250ms normal transition, and zero-transition reduced-motion behavior in `specs/001-hamburger-rebuild/quickstart.md`.

**Checkpoint**: All five user stories are independently demonstrable and the visual surface passes the constitution's design-fidelity audit.

---

## Phase 8: Polish & Cross-Cutting Validation

**Purpose**: Run the project gates, ensure the implementation remains within scope, and close documentation.

- [x] T027 [P] Run `npm run typecheck` from `edu-site/` and resolve only hamburger rebuild type errors in `edu-site/src/components/SiteMenu/` or `edu-site/src/theme/Navbar/Content/index.tsx`.
- [x] T028 [P] Run `npx docusaurus build` from `edu-site/` and resolve build/swizzle/SSR failures caused by this feature.
- [x] T029 [P] Verify no new packages, secrets, hard-coded credentials, or unrelated file changes were introduced; inspect `edu-site/package.json`, `edu-site/src/components/SiteMenu/`, and `git diff --stat`.
- [x] T030 Run every row of `specs/001-hamburger-rebuild/quickstart.md`, update its Definition of Done checkboxes, and attach PASS/FAIL evidence to the implementation PHR under `history/prompts/001-hamburger-rebuild/`.
- [x] T031 Update `specs/001-hamburger-rebuild/plan.md` and `specs/001-hamburger-rebuild/quickstart.md` with final file paths if Docusaurus's actual swizzle layout differs from the planned path; do not leave stale paths in the design artifacts.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 Setup**: No dependencies; inspect and scaffold first.
- **Phase 2 Foundational**: Depends on T001–T003; blocks all user-story work.
- **Phase 3 US1**: Depends on T004–T007; MVP begins at T008.
- **Phase 4 US2**: Depends on T009 and T011 because navigation lives in the drawer shell.
- **Phase 5 US3**: Depends on T010; removal of the old CSS path happens only after the new overlay exists.
- **Phase 6 US4**: Depends on T008–T010; keyboard semantics build on the final DOM shape.
- **Phase 7 US5**: Depends on T010 and T017; polish follows stable geometry.
- **Phase 8 Polish**: Depends on all desired stories; T027–T029 can run in parallel, T030–T031 follow their results.

### User Story Dependencies

- **US1 (P1)**: Independent after Foundational; recommended MVP.
- **US2 (P1)**: Depends on the US1 drawer shell but is independently testable after integration.
- **US3 (P2)**: Depends on the US1 geometry rules; no dependency on US2's route matching.
- **US4 (P2)**: Depends on the US1 DOM and controller; no dependency on US2's route data beyond link focus behavior.
- **US5 (P3)**: Depends on stable drawer geometry; no new runtime dependency.

### Parallel Opportunities

- T002 and T003 can run in parallel during Setup.
- After T004–T007, T008 (button), T009 (drawer shell), and T006 CSS groundwork must be sequenced by file ownership; do not edit the same file concurrently.
- T012 and T013 are sequential because route matching consumes the entry shape created by T012.
- T016 and T017 can run in parallel because they touch TypeScript and CSS respectively; T018 follows both.
- T020 and T021 can run in parallel after the DOM/controller seam exists; T022 follows their class/attribute decisions.
- T027, T028, and T029 can run in parallel after implementation; T030 is the final behavioral gate.

## Parallel Example: Cross-Cutting Validation

```text
Task: T027 — Run npm run typecheck from edu-site/
Task: T028 — Run npx docusaurus build from edu-site/
Task: T029 — Inspect package.json, git diff, and changed-file scope
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete T001–T007 (Setup + Foundational).
2. Complete T008–T011 (US1).
3. Run the US1 independent test at 390×844 and 1440×900.
4. Stop and validate before adding route highlighting, resize logic, keyboard enhancements, or polish.

### Incremental Delivery

1. Add US1: open/dismiss → validate and demonstrate.
2. Add US2: navigation/active route → validate and demonstrate.
3. Add US3: breakpoint/resize consistency → validate and demonstrate.
4. Add US4: keyboard and assistive technology → validate and demonstrate.
5. Add US5: visual/motion polish → run the constitution design-fidelity audit.
6. Run Phase 8 gates and complete the PHR.

### MVP Acceptance Gate

The MVP is complete only when:

- One click opens a visible, full-height drawer on both 390px and 1440px widths.
- Hamburger, close affordance, backdrop, and in-drawer link all dismiss it.
- `aria-expanded` and `data-drawer-open` agree with the visual state.
- `npm run typecheck` and `npx docusaurus build` pass.

## Notes

- Tasks use the exact checklist format: checkbox, sequential ID, optional `[P]`, required story label in story phases, and a concrete path/command.
- No API endpoint tasks are needed; `contracts/useDrawer.md` is a client-side TypeScript contract.
- Do not commit `.env` or unrelated generated build output.
- If implementation reveals that the planned Docusaurus swizzle path is invalid, update the plan and quickstart path references before marking T031 complete.
