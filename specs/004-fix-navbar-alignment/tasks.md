# Tasks: Fix Navbar Alignment and Formatting

**Input**: Design documents from `/specs/004-fix-navbar-alignment/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Visual-verification tasks are REQUIRED by the spec's Success Criteria
(SC-001..SC-005) — Playwright geometry + screenshots (4 configs), Lighthouse ≥ 95.

**Organization**: Two user stories — US1 (P1, visual alignment) → US2 (P2, control parity);
tasks grouped into Setup → Foundational → US1 → US2 → Polish.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Repository State Verification)

**Purpose**: Confirm the feature directory exists and the working copy is in a known-good state

- [x] T001 [P] Verify working directory is clean and on branch `004-fix-navbar-alignment`

---

## Phase 2: Foundational (Baseline Capture)

**Purpose**: Record the current ("before") navbar geometry across the 4 required
configurations before any CSS changes, so alignment deltas are measurable
(SC-001 comparison baseline; quickstart.md step 1)

- [x] T002 [P] Capture "before" baseline geometry via Playwright at desktop light, desktop dark, mobile light, mobile dark: for `.navbar__brand`, `.navbar__link`, `.navbar__items .clean-btn` record `top/height/width` from `getBoundingClientRect()`; save 4 screenshots under `specs/004-fix-navbar-alignment/verification/before/`

**Checkpoint**: Baseline captured — the "before" delta for each of the 4 configs is recorded

---

## Phase 3: User Story 1 - Consistent Navbar Visual Alignment (Priority: P1) 🎯 MVP

**Goal**: All left-group elements (logo, title, Curriculum) and all right-group elements
(theme toggle, GitHub) share a common vertical baseline on desktop and mobile, in
light and dark; the mobile hamburger aligns to the brand baseline; the drawer opens
without layout shift; theme toggling causes no reflow; the title truncates; the
glass treatment keeps its solid fallback

**Independent Test**: Build the site; via Playwright across the 4 configs assert every
navbar element shares a vertical center line (≤ 2px delta), theme toggle changes no
bounding box (CLS = 0), and 4 screenshots show zero baseline misalignment

### Implementation for User Story 1

- [x] T003 [US1] Add shared left-group + right-group vertical baseline overrides in `edu-site/src/css/custom.css` — enforce `inline-flex; align-items: center` on `.navbar__inner`, `.navbar__brand` (logo + title), `.navbar__items`, and `.navbar__items--right`, so logo/title/Curriculum (FR-001) and theme toggle/GitHub (FR-002) share one baseline; confirm the existing glass + `@supports` solid-fallback block at `custom.css:358-371` still applies (FR-003)
- [x] T004 [US1] In `edu-site/src/css/custom.css` add: (a) site-title ellipsis truncation on `.navbar__title` (`overflow: hidden; text-overflow: ellipsis; white-space: nowrap}`, with a fallback leaving the drawer title untouched) (FR-010); (b) a single bottom hairline border that does not double-render across themes (FR-009); (c) a `transition` + explicit token guard so theme toggling does not change any navbar bounding box (FR-008)
- [x] T005 [US1] In `edu-site/src/css/custom.css` add mobile-drawer alignment: `.navbar__toggle` aligned to the brand baseline and `.navbar-sidebar` (block at `custom.css:1207-1216`) opening without layout shift (FR-007)
- [x] T006 [P] [US1] In `edu-site/src/css/a11y.css` add `.navbar__toggle` to the `:where(...)` 44×44 CSS px touch-target sizing list (touch-sizing block at `a11y.css:304-321`) so the hamburger meets WCAG 2.2 SC 2.5.8 (FR-005)
- [x] T007 [US1] Run `cd edu-site && npm run build` and confirm exit 0 (SC-005 partial)
- [x] T008 [US1] Playwright verification across the 4 configs (served `build/`): assert vertical center-line delta ≤ 2px for all navbar elements, toggle theme and assert no element's bounding box changes (CLS = 0), open mobile drawer and assert no layout shift; save 4 screenshots under `specs/004-fix-navbar-alignment/verification/after/` (SC-001, FR-008)

**Checkpoint**: User Story 1 is complete when the build passes and all 4 configs show
aligned baselines with zero theme/layout shift in the Playwright run

---

## Phase 4: User Story 2 - Theme Toggle and GitHub Link Styling Parity (Priority: P2)

**Goal**: The theme toggle button and GitHub link appear as first-class, consistently
styled controls — identical height, vertical padding, border-radius, and background
treatment; matching Apple-blue focus rings; 44×44 touch targets

**Independent Test**: In both themes, compare the computed style of the theme toggle
and the GitHub link (block-size, padding-block, border-radius, background) — must be
identical; tabbing shows the Apple-blue focus ring on each with no layout shift

### Implementation for User Story 2

- [x] T009 [US2] In `edu-site/src/css/custom.css` add theming-toggle + GitHub control-parity rules: identical `height`, `padding-block`, `border-radius` (`var(--tbb-radius-md)`), and glass/background treatment between the color-mode `.clean-btn` and the right-group `.navbar__link` (FR-004)
- [x] T010 [P] [US2] In `edu-site/src/css/a11y.css` verify and extend the Apple-blue `:focus-visible` ring block (`.navbar__items .clean-btn` at `a11y.css:164-171` and `.navbar__link` at `a11y.css:85-93`) so the theme toggle and GitHub link share identical ring width, offset, radius, and no-layout-shift behavior (FR-006)
- [x] T011 [US2] Playwright verification on desktop light + dark: assert theme-toggle vs GitHub computed parity (`height`, `padding-block`, `border-radius`, `background`), assert 44×44 touch targets on both, tab between them and assert the Apple-blue ring + no layout shift (FR-004, FR-005, FR-006; SC-002)

**Checkpoint**: User Story 2 is complete when computed style parity and focus-ring
parity are verified in both themes

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Full verification runbook, automated audit, and idempotency

- [x] T012 [P] Run the full quickstart.md checklist from `specs/004-fix-navbar-alignment/quickstart.md` (inspect → apply → build → 4-config verify → focus → drawer → report)
- [x] T013 [P] Run the Lighthouse accessibility audit on the served homepage (light + dark) and confirm score ≥ 95 with no new navbar violations (SC-003) — accessibility = 100
- [x] T014 [P] Run `cd edu-site && npm run build` a second time (idempotent output) and record CLS = 0 across a theme toggle at mobile width (SC-004, SC-005)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: T002 after T001; must complete before T003 (baseline-first)
- **User Story 1 (Phase 3)**: T003 → T004 → T005 sequential (same file `custom.css`); T006 parallel (different file `a11y.css`); T007 after T003-T006; T008 after T007
- **User Story 2 (Phase 4)**: T009 after T005 (same file `custom.css`); T010 parallel (different file `a11y.css`); T011 after T009-T010
- **Polish (Phase 5)**: depends on T008 and T011 completing

### Within a User Story

- US1: all CSS edits land before first build; T006 (a11y.css) is the one parallel task
- US2: T009 (custom.css) sequential; T010 (a11y.css) parallel with T009

### Parallel Opportunities

- T002 [P] foundational (record-only, no file edits)
- T006 [P] a11y.css while custom.css edits run
- T010 [P] a11y.css while T009 custom.css edit runs
- T012, T013, T014 [P] in Polish (different concerns / read-only)

---

## Parallel Example: User Story 1

```bash
Task: "Add navbar baseline overrides to edu-site/src/css/custom.css"   # T003
Task: "Add navbar__toggle to touch targets in edu-site/src/css/a11y.css"  # T006 (parallel, different file)
# ...T004, T005 sequential in custom.css, then T007 build, T008 Playwright verify
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. T001: Verify branch clean
2. T002: Baseline capture (before screenshots + geometry)
3. T003–T006: Apply alignment + touch-target CSS
4. T007–T008: Build + 4-config Playwright verification
5. **STOP and VALIDATE**: run quickstart.md
6. Commit US1 alone if desired (atomic P1 slice)

### Incremental Delivery

Ship US1 (P1) first and validate; then US2 (P2) as the second, independently
testable slice. Each slice builds green independently.

---

## Notes

- [P] tasks = different files / read-only, no dependencies
- [US1] label maps to P1 visual alignment story; [US2] to P2 control-parity story
- Verification tasks are REQUIRED because the spec's Success Criteria mandate
  Playwright geometry + screenshots (SC-001), touch targets (SC-002), Lighthouse (SC-003),
  CLS=0 (SC-004), and build pass (SC-005)
- No contract tests (presentation-only feature; see `contracts/visual-contract.md`)
- `edu-site/api` is out of scope; no backend edits or pytest tasks
- Commit after T008 (US1 verified) and after T011 (US2 verified); final validation + commit after T014