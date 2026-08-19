# Tasks: Redesign Top-of-Page Chrome (Navbar + Hero Top) from Scratch

**Input**: Design documents from `/specs/005-redesign-navbar-hero/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Verification tasks are REQUIRED by the spec's Success Criteria (SC-001..SC-010) — Playwright geometry + search interaction + screenshots, Lighthouse ≥ 95, build pass.

**Organization**: Three user stories — US1 (P1, navbar visual), US2 (P1, hero visual), US3 (P2, UX behaviors); tasks grouped into Setup → Foundational → US1 → US2 → US3 → Polish.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Repository State Verification)

**Purpose**: Confirm the working tree is clean and the feature branch is active

- [x] T001 Verify working directory is clean and on branch `005-redesign-navbar-hero`

---

## Phase 2: Foundational (Baseline Capture + Search Index)

**Purpose**: Capture the "before" screenshots/geometry of the current navbar and hero across the 4 configs (SC-002/SC-003 comparison baseline), and build the static search index (blocking prerequisite for the US1 search affordance)

- [x] T002 [P] Capture "before" baseline geometry + screenshots via Playwright at desktop light, desktop dark, mobile light, mobile dark: for `.navbar` elements and hero `.tbb-hero` elements record `top/height/width`; save 4 screenshots under `specs/005-redesign-navbar-hero/verification/before/`
- [x] T003 [P] Create `edu-site/scripts/generate-search-index.mjs` — a build-time indexer that walks `edu-site/docs/**/*.md*`, extracts per-doc `title`, `route`, `headings`, `content`, and `excerpt`, excludes hidden/non-doc assets, and writes `edu-site/static/search-index.json` with records unique by `route`

**Checkpoint**: Baseline captured and search index generator created (index output exercised once)

---

## Phase 3: User Story 1 - Fresh Navbar Visual Design (Priority: P1) 🎯 MVP

**Goal**: The navbar presents a new centered-brand design with client-side search — brand centered, nav left, actions right — across desktop/mobile × light/dark, with the inherited 44×44 touch targets, focus rings, glass fallback, and no-reflow contract

**Independent Test**: Build the site; via Playwright across the 4 configs assert the brand is centered (≤2px delta), left/right groups share one baseline, search opens and returns results, and the theme toggle changes no navbar bounding box (CLS = 0)

### Implementation for User Story 1

- [x] T004 [US1] Add centered-brand navbar CSS in `edu-site/src/css/custom.css` — `position: relative` on `.navbar__inner`, absolutely center `.navbar__brand` (`left: 50%; top: 50%; transform: translate(-50%, -50%)`), give left nav group and right action group auto margins so the centered brand never collides (FR-001, FR-012)
- [x] T005 [US1] Add the search trigger + control styling to `edu-site/src/css/custom.css` — the search trigger shares the action-group geometry (height, padding-block, border-radius, material) with GitHub and theme toggle (FR-004, FR-013)
- [x] T006 [US1] Create `edu-site/src/theme/SearchBar/index.tsx` — a client-side search component that fetches `/search-index.json`, debounces input (≤200ms), ranks results (title → heading → body), and renders a keyboard-accessible results dropdown (ArrowDown/Up, Enter, Escape, empty state, ≥44px hit areas) (FR-019)
- [x] T007 [US1] Register the search item in `edu-site/docusaurus.config.ts` navbar items — add `{ type: "search", position: "right" }` so Docusaurus serves the overridden `@theme/SearchBar` (FR-013)
- [x] T008 [P] [US1] Add search trigger + input + results focus-ring and touch-target rules to `edu-site/src/css/a11y.css` — Apple-blue `:focus-visible` ring with no layout shift, ≥44×44 hit areas (FR-006, FR-007)
- [x] T009 [US1] Wire the search-index generation into the build: add `node scripts/generate-search-index.mjs` to `edu-site/package.json` `build` script (before `docusaurus build`) so every build refreshes `static/search-index.json` (FR-019, SC-008)
- [x] T010 [US1] Run `cd edu-site && npm run build` and confirm exit 0 with a fresh `search-index.json` present (SC-008)
- [x] T011 [US1] Playwright verification across the 4 configs (served `build/`): assert brand centered (≤2px), left/right baseline parity, search trigger opens + returns results for a real curriculum term, theme toggle changes no navbar bounding box; save 4 screenshots under `specs/005-redesign-navbar-hero/verification/after/navbar/` (SC-001, FR-008, FR-019)

**Checkpoint**: User Story 1 complete when the build passes and all 4 configs show a centered-brand navbar with working search and zero theme/layout shift

---

## Phase 4: User Story 2 - Fresh Hero Top Section Design (Priority: P1)

**Goal**: The hero top presents a new mesh-gradient background and redesigned deck (mark, eyebrow, headline, subtitle, CTAs, meta row) across desktop/mobile × light/dark, with the primary CTA dominant and both CTAs ≥44×44

**Independent Test**: On the served homepage, assert the hero uses the new mesh background (no raster/external image request), the deck renders the approved copy with the primary CTA dominant, and both CTAs meet 44×44 with Apple-blue focus rings

### Implementation for User Story 2

- [x] T012 [US2] Replace the wall-scale arch artwork with a pure-CSS Apple-style soft mesh gradient in `edu-site/src/components/HomepageHero/index.tsx` — remove the `HeroSpan` SVG and render the mesh as layered CSS radial gradients (OKLCH blue `--tbb-accent` at low alpha + neutral atmospheric tones over `--tbb-bg`), with a solid fallback (FR-017, FR-018)
- [x] T013 [US2] Redesign the hero deck composition in `edu-site/src/components/HomepageHero/index.tsx` + `edu-site/src/components/HomepageHero/styles.module.css` — new layout/typography/spacing for the brand mark, eyebrow chip, headline + accent, subtitle, CTA row, and meta row, keeping the approved copy and the BrandMark identity mark (FR-014, FR-016, FR-004-BrandMark-retained)
- [x] T014 [P] [US2] Add hero mesh + deck + CTA focus-ring and touch-target rules to `edu-site/src/css/a11y.css` and/or `HomepageHero/styles.module.css` — Apple-blue focus rings with no layout shift; both CTAs ≥44×44 (FR-015)
- [x] T015 [US2] Run `cd edu-site && npm run build` and confirm exit 0 (SC-008)
- [x] T016 [US2] Playwright verification on served homepage across the 4 configs: assert mesh background (no `img`/external `url()` requests), deck renders approved copy with dominant primary CTA, both CTAs ≥44×44 + focus rings, theme toggle changes no hero bounding box; save 4 screenshots under `specs/005-redesign-navbar-hero/verification/after/hero/` (SC-003, SC-005, FR-015, FR-018)

**Checkpoint**: User Story 2 complete when the build passes and the hero renders the new mesh + deck across all 4 configs with accessible CTAs

---

## Phase 5: User Story 3 - UX Behaviors and Active-State Cohesion (Priority: P2)

**Goal**: The redesigned navbar and hero behave cohesively — active-section indication, predictable sticky behavior, working search keyboard navigation, and CTA → Stage 1 navigation with active state

**Independent Test**: Navigate between pages; verify the Curriculum link active state updates, the navbar stays available while scrolling, search results are keyboard-navigable, and the hero primary CTA lands on Stage 1 with the navbar reflecting the active state

### Implementation for User Story 3

- [x] T017 [US3] Add active-state indication CSS in `edu-site/src/css/custom.css` — `.navbar__link--active` (or the equivalent Docusaurus active class) gets a distinct treatment (color/underline/pill) consistent with the new design (FR-003, SC-009)
- [x] T018 [US3] Verify + adjust the sticky navbar behavior in `edu-site/src/css/custom.css` — the centered-brand navbar remains `position: sticky` without covering content; confirm anchor-link offset is handled (edge case: no hidden headings) (US3, SC-009)
- [x] T019 [US3] Playwright behavior verification on served site: navigate to a curriculum page → Curriculum link shows active state; scroll a long page → navbar stays available; open search → ArrowDown/Enter navigates to a result; click hero primary CTA → lands on Stage 1 with active state reflected (SC-009, US3)

**Checkpoint**: User Story 3 complete when active state, sticky behavior, keyboard search, and CTA navigation are verified

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Full verification runbook, automated audit, and idempotency

- [x] T020 [P] Run the full quickstart.md checklist from `specs/005-redesign-navbar-hero/quickstart.md` (build → serve → 4-config geometry → parity → search → theme no-reflow → hero mesh → focus/touch → Lighthouse → report)
- [x] T021 [P] Run the Lighthouse accessibility audit on the served homepage (light + dark) and confirm score ≥ 95 with no new navbar or hero violations (SC-006) — Accessibility 95, Best Practices 100, SEO 100
- [x] T022 [P] Run `cd edu-site && npm run build` a second time (idempotent output, refreshed search index) and record CLS = 0 across a theme toggle at mobile width (SC-007, SC-008)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: T002 + T003 parallel after T001; both must complete before US1 (T002 baseline-first; T003 index generator is a prerequisite for the search tasks)
- **User Story 1 (Phase 3)**: T004 → T005 sequential (same file `custom.css`); T006 search component (new file, can run after T003); T007 config registration (after T006); T008 [P] parallel (a11y.css); T009 package.json wiring (after T003); T010 build (after T004-T009); T011 verify (after T010)
- **User Story 2 (Phase 4)**: T012 → T013 sequential (HomepageHero files); T014 [P] parallel (a11y/styles); T015 build; T016 verify — can start after T010
- **User Story 3 (Phase 5)**: T017 → T018 sequential (custom.css); T019 verify — after T016
- **Polish (Phase 6)**: T020/T021/T022 parallel after T019

### Within a User Story

- US1: all navbar CSS + search edits land before first build (T010); T008 (a11y.css) is the one parallel task
- US2: HomepageHero edits sequential (T012 → T013); T014 parallel
- US3: active-state + sticky CSS sequential; verification last

### Parallel Opportunities

- T002 + T003 [P] in Foundational (baseline capture vs index generator)
- T008 [P] a11y.css while custom.css edits run
- T014 [P] hero a11y while HomepageHero edits run
- T020, T021, T022 [P] in Polish (read-only / different concerns)

---

## Parallel Example: User Story 1

```bash
# Sequential in custom.css:
Task: "Add centered-brand navbar CSS to edu-site/src/css/custom.css"   # T004
Task: "Add search trigger styling to edu-site/src/css/custom.css"       # T005
# Parallel (different file) while T004/T005 run:
Task: "Add search focus rings + touch targets to edu-site/src/css/a11y.css"  # T008 [P]
# After T003 (index) + T004-T009:
Task: "npm run build (fresh search-index.json)"                          # T010
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. T001: Verify branch clean
2. T002 + T003: Baseline capture + search index generator (parallel)
3. T004–T009: Centered-brand CSS + search trigger + SearchBar component + config registration + a11y + build wiring
4. T010–T011: Build + 4-config Playwright verification
5. **STOP and VALIDATE**: run quickstart.md search + geometry sections
6. Commit US1 alone (atomic P1 slice)

### Incremental Delivery

Ship US1 (P1 navbar) first and validate; then US2 (P1 hero) as the second independently testable slice; then US3 (P2 behaviors). Each slice builds green independently.

---

## Notes

- [P] tasks = different files / read-only, no dependencies
- [US1] label maps to P1 navbar story; [US2] to P1 hero story; [US3] to P2 behavior story
- Verification tasks REQUIRED because spec Success Criteria mandate Playwright geometry + search interaction + screenshots (SC-001..SC-005), Lighthouse (SC-006), CLS=0 (SC-007), build pass (SC-008), active state (SC-009), cohesion (SC-010)
- No contract tests (presentation + client-side search only; see `contracts/presentation-contract.md`)
- `edu-site/api` is out of scope; no backend edits or pytest tasks
- No new npm dependencies; search is a hand-rolled client-side indexer + scorer per research R-002
- Commit after T011 (US1 verified), after T016 (US2 verified), after T019 (US3 verified); final validation + commit after T022