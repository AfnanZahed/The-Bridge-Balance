---
description: "Task list for Apple-Inspired Theme Transformation (002-apple-design)"
---

# Tasks: Apple-Inspired Theme Transformation

**Input**: Design documents from `/specs/002-apple-design/`
**Prerequisites**: plan.md (required), spec.md (4 user stories), research.md (R-001…R-007), data-model.md (Design Token / Surface / ThemeModeState / StageAccent / InteractionState), contracts/design-system.md, quickstart.md
**Tests**: Not requested in spec — no test tasks generated. FR-014 design-fidelity review is the acceptance gate.
**Branch**: `002-apple-design`

## Format: `- [ ] [TaskID] [P?] [Story?] Description with file path`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm branch, baseline build, and tooling before any migration.

- [ ] T001 Confirm branch `002-apple-design` is checked out and clean (`git status`)
- [ ] T002 Capture current baseline: run `cd edu-site && npm run build`, `npx tsc --noEmit`, `node scripts/check-frontmatter.mjs`; record any pre-existing failures so they aren't blamed on the migration
- [ ] T003 [P] Verify Apple-blue and stage tokens preview by adding temporary debug block in `edu-site/src/css/radix.css` (revert before commit) — confirms Radix teal/amber/indigo/plum and Apple `#0071e3`/`#0a84ff` resolve

---

## Phase 2: Foundational — Token & Type Foundation (BLOCKING)

**Purpose**: Land every shared visual token before any surface migration. All user-story work depends on this phase.

**Checkpoint**: Tokens defined in `:root` + `[data-theme="dark"]`; typography scale committed; no surface yet references them — verified by `npm run build`.

- [ ] T004 Replace four saturated stage accents with muted Apple-grade scales in `edu-site/src/css/radix.css` — Stage 1 teal (`--teal-9`/`--teal-11`), Stage 2 ochre (`--amber-10`/`--amber-11`), Stage 3 lilac (`--indigo-9`/`--indigo-11`), Stage 4 dusty rose (`--plum-9`/`--plum-11`)
- [ ] T005 [P] Define Apple-system blue primary accent tokens in `edu-site/src/css/radix.css` — `--tbb-accent: #0071e3` light / `#0a84ff` dark, `--tbb-accent-hover: #005bb5` / `#409cff`, `--tbb-accent-subtle: rgba(0,113,227,0.08)` / `rgba(10,132,255,0.12)`, `--tbb-focus-ring: 0 0 0 3px rgba(0,113,227,0.35)` / `rgba(10,132,255,0.45)`
- [ ] T006 [P] Define glass and surface tokens in `edu-site/src/css/radix.css` — `--tbb-surface`, `--tbb-surface-elevated`, `--tbb-surface-glass` (with explicit opaque `--tbb-surface-solid` fallback token), `--tbb-border-subtle`, light + dark values for each
- [ ] T007 [P] Tune typography scale in `edu-site/src/css/custom.css` per R-004 — hero `clamp(2.5rem, 5.5vw, 4.25rem)` weight 700 / `-0.035em` / 1.08, h2 `clamp(1.75rem, 3.5vw, 2.5rem)` weight 700 / `-0.025em` / 1.15, h3 1.25rem weight 600, body 1.0625rem line-height 1.68, eyebrow 0.75rem uppercase letter-spacing 0.08em
- [ ] T008 [P] Reserve Instrument Serif (`--tbb-font-display`) for editorial-only moments in `edu-site/src/css/custom.css` — apply only to `.tbb-hero__title`, `.tbb-editorial-quote`, brand-mark — strip serif from all h2/h3/card titles
- [ ] T009 Add 2px Apple-blue focus ring in `edu-site/src/css/a11y.css` — `:focus-visible` selector using `--tbb-focus-ring` shadow + 2px offset, applied to links/buttons/sidebar items/chart bars; never `outline: none`
- [ ] T010 [P] Prune `edu-site/src/css/openprops.css` to tokens actually consumed after migration — keep `--shadow-color`, `--shadow-strength` + 1/2/3/4/5/6/10 variants, `--radius-2/3/round`, `--ease-out-3`, `--ease-in-out-2`, `--size-content-2`, `--size-fluid-3`, `--size-7`; remove unused families to reduce CSS payload

**Checkpoint**: `npm run build` exits 0. Open DevTools, toggle dark mode, confirm new tokens resolve and `:focus-visible` renders Apple-blue ring.

---

## Phase 3: User Story 1 — Calm, Premium Homepage (Priority: P1) 🎯 MVP

**Goal**: First-time visitor lands on a calm, premium, statically-composed hero that communicates purpose without animation.

**Independent Test**: Open `/` at 320/768/1440px widths in light and dark modes; identify hero message, primary CTA, and four stages without scrolling animation; toggle `prefers-reduced-motion`; verify no WebGL canvas.

- [ ] T011 [US1] Replace `edu-site/src/components/HomepageHero/index.tsx` with a static CSS hero — pure typography + generous spacing + subtle static gradient + Apple-blue primary CTA; no canvas, no R3F, no scroll-driven transforms
- [ ] T012 [P] [US1] Restyle `edu-site/src/components/HomepageHero/styles.module.css` — single static panel using `--tbb-surface-elevated`, hero title uses Instrument Serif reserved slot, eyebrow uses uppercase 0.75rem token, CTA uses `--tbb-accent` background with `--tbb-accent-hover` state
- [ ] T013 [P] [US1] Update `edu-site/src/pages/index.tsx` to import the new static hero, drop `Hero3D` and `ScrollFX` references (keep the motion-removal step in Phase 7), and ensure `<HomepageHero />` is rendered above the stages grid
- [ ] T014 [US1] Add `@supports not (backdrop-filter: blur(1px))` solid-surface fallback in `edu-site/src/components/HomepageHero/styles.module.css` for any translucent hero layer — fallback uses `--tbb-surface-solid`

**Checkpoint**: At 320/768/1440px in both modes, the hero renders statically with no `canvas` element, primary CTA reaches Apple-blue hover state, and `prefers-reduced-motion: reduce` makes the page instantly usable.

---

## Phase 4: User Story 2 — Read Comfortably Across Light and Dark Modes (Priority: P1)

**Goal**: A learner can read a long lecture in their preferred appearance mode without losing legibility on text, code, callouts, or charts.

**Independent Test**: Open `/docs/introduction` and one Stage 1 chapter; toggle the theme switcher; inspect body text, headings, links, code blocks, callouts, and DataViz chart legends in both modes; disable `backdrop-filter` and confirm solid fallbacks appear.

- [ ] T015 [US2] Audit and restyle `edu-site/src/css/custom.css` for mode parity — every semantic surface (`.tbb-card`, `.tbb-callout`, markdown `blockquote`, `pre`, `table`, `kbd`, `details`) defines explicit light + dark `background`, `color`, and shadow using tokens from Phase 2
- [ ] T016 [P] [US2] Wire `edu-site/src/components/Callout/index.tsx` to read semantic tokens only — replace any inline hex values with `--tbb-accent-subtle` + `--tbb-text-strong`; ensure 4.5:1 contrast in both modes
- [ ] T017 [P] [US2] Add a `prefers-color-scheme: dark` override layer in `edu-site/src/css/custom.css` (or `radix.css`) so the navbar announcement bar, MDX footer, and reading-progress rail all have intentional dark variants
- [ ] T018 [P] [US2] Add `@supports not (backdrop-filter: blur(1px))` fallback rules in `edu-site/src/css/custom.css` for every `.tbb-glass`, `.tbb-surface-glass`, or translucent layer — fallback is solid `--tbb-surface-solid`
- [ ] T019 [US2] Harden `edu-site/src/components/DataViz/dataviz.css` for mode parity — tooltip background, grid lines, axis labels, and legend chips all have explicit light + dark values using `--tbb-accent` + `--tbb-text-muted` + `--tbb-border-subtle`
- [ ] T020 [US2] Verify forced-colors / high-contrast mode in `edu-site/src/css/a11y.css` — `@media (forced-colors: active)` keeps borders, focus rings, and chart labels perceivable without depending on background images

**Checkpoint**: Walk every primary reading surface in both modes; confirm no unstyled region and WCAG AA contrast (4.5:1 body, 3:1 large).

---

## Phase 5: User Story 3 — Navigate and Interact with Confident Feedback (Priority: P1)

**Goal**: Every interactive element communicates state through subtle, consistent, accessible feedback.

**Independent Test**: Tab through homepage, sidebar, introduction, and one chapter; verify focus ring on every interactive; resize to 320/768/1440 and confirm no horizontal overflow; toggle current-page state on sidebar items.

- [ ] T021 [US3] Apply the 2px Apple-blue focus ring (defined in T009) to all interactive components in `edu-site/src/components/HomepageHero/index.tsx`, `edu-site/src/components/StageCard/index.tsx`, `edu-site/src/components/ChapterState/index.tsx`, and chart hover regions — never `outline: none`
- [ ] T022 [P] [US3] Define hover / active / disabled / current-page styles in `edu-site/src/css/custom.css` for navbar links, sidebar items, primary/secondary buttons, and stage cards — restrained elevation (`translateY(-1px)` + soft shadow), no layout shift, current-page uses Apple-blue accent + neutral surface
- [ ] T023 [P] [US3] Audit responsive layout in `edu-site/src/css/custom.css` and `edu-site/src/components/HomepageHero/styles.module.css` — ensure no horizontal overflow at 320px; wide tables/charts in DataViz wrap inside `overflow-x: auto` containers; hit targets ≥ 44px on touch viewports
- [ ] T024 [P] [US3] Wrap `edu-site/src/components/DataViz/CurriculumBarChart.tsx`, `CurriculumDonut.tsx`, `KPIGrid.tsx`, and `LegendStrip.tsx` chart wrappers in `overflow-x: auto` containers with `min-width: 0` flex parents so wide legends scroll inside the chart, not the page
- [ ] T025 [US3] Wire the existing Docusaurus `colorMode` toggle in `edu-site/src/theme/Root.tsx` so theme persistence respects user choice (no FOUC); add `data-theme="dark"` attribute as the existing `ThemeProvider` expects

**Checkpoint**: Keyboard `Tab` order matches reading order; focus ring visible at every step; DevTools responsive at 320/768/1440 reports zero `document.scrollingElement.scrollWidth > clientWidth`.

---

## Phase 6: User Story 4 — Preserve the Curriculum's Technical Personality (Priority: P2)

**Goal**: The four stage accents, code-oriented content, provider/service identities, and chart semantics remain distinguishable inside the restrained Apple system.

**Independent Test**: Inspect `/docs`, `/docs/stage-1`, `/docs/stage-2`, `/docs/stage-3`, `/docs/stage-4`, provider chips, code blocks, co-authoring timeline, and `/curriculum` dashboard; confirm each stage has a distinct muted accent + label, charts read via labels not color.

- [ ] T026 [US4] Restyle `edu-site/src/components/StageCard/index.tsx` — categorical accent chip uses Stage 1–4 muted token (teal/ochre/lilac/dusty rose), card surface remains neutral, hover uses soft elevation only, no saturated fill
- [ ] T027 [P] [US4] Restyle `edu-site/src/components/ChapterState/index.tsx` — pill uses the muted stage token + contrast-safe text; ensure readability on light and dark surfaces (no `#fff` on light pill or `#000` on dark pill)
- [ ] T028 [P] [US4] Update `edu-site/src/components/stage-icons/index.tsx` fills to consume muted stage tokens (teal/ochre/lilac/dusty rose) — keep Lucide semantic icons and Phosphor UI icons unchanged
- [ ] T029 [P] [US4] Restyle `edu-site/src/components/DataViz/CurriculumBarChart.tsx` — single Apple-blue (`--tbb-accent`) for primary series, neutral grayscale steps for secondary, axes use `--tbb-text-muted`, tooltips use `--tbb-surface-glass` with blur fallback
- [ ] T030 [P] [US4] Restyle `edu-site/src/components/DataViz/CurriculumDonut.tsx` — segments step through `--tbb-accent` → `--gray-8` → `--gray-7` → `--gray-6`; each segment is paired with a label in `LegendStrip.tsx`
- [ ] T031 [US4] Update `edu-site/src/components/DataViz/LegendStrip.tsx` so stage identity is communicated by label first (Stage 1 / Stage 2 / Stage 3 / Stage 4 text) and muted-color dot second — never color-only meaning
- [ ] T032 [P] [US4] Confirm provider/service chips in `edu-site/src/components/icons/index.tsx` + topic-icons continue to use the Tabler identity icons without saturated fills; only the chip background uses neutral surface

**Checkpoint**: All four stages are visually distinct via muted accent + label; chart meaning survives if printed in grayscale.

---

## Phase 7: Motion Removal & Dependency Pruning (Cross-Cutting)

**Purpose**: Strip Lenis, GSAP, R3F, and `three` from runtime and dependencies. Safe to run *after* Phase 3 because the static hero is already wired into `src/pages/index.tsx`.

**Independent Test**: `git grep -nE 'lenis|gsap|ScrollTrigger|@react-three|three'` returns no source-code hits; `npm ls lenis gsap @react-three/fiber @react-three/drei @react-three/rapier three` returns empty; homepage still builds and renders statically.

- [ ] T033 Remove Lenis initialization from `edu-site/src/theme/Root.tsx` — delete the `new Lenis(...)` block, the `requestAnimationFrame` loop, and any related imports
- [ ] T034 [P] Delete `edu-site/src/components/Hero3D/` directory (`index.tsx`, `Bridge.tsx`, `r3f-types.d.ts`) — its replacement is the static `HomepageHero`
- [ ] T035 [P] Delete `edu-site/src/components/ScrollFX/` directory (`index.tsx`, `gsap-register.ts`) — ScrollFX wrapper no longer needed
- [ ] T036 [P] Delete obsolete motion CSS files — `edu-site/src/css/scrollfx.css`, `edu-site/src/css/hero3d.css`, `edu-site/src/css/motion.css`
- [ ] T037 Prune `edu-site/docusaurus.config.ts` `customCss` array — remove any entry pointing at the deleted CSS files
- [ ] T038 Run `cd edu-site && npm remove lenis gsap @react-three/fiber @react-three/drei @react-three/rapier three` and commit the resulting `package.json` + `package-lock.json`
- [ ] T039 [P] Verify `edu-site/src/components/motion/RevealOnScroll.tsx` honors `prefers-reduced-motion: reduce` (Framer Motion `useReducedMotion` + `MotionConfig reducedMotion="user"`) — set the global `MotionConfig` in `edu-site/src/theme/Root.tsx` so all entrance reveals collapse to zero motion
- [ ] T040 [P] Audit `edu-site/src/components/MagicUI/AnimatedList.tsx`, `Marquee.tsx`, `Timeline.tsx` and `src/components/Aceternity/*` — strip any GSAP, ScrollTrigger, or R3F usage; retain only Framer Motion entrance reveals that respect reduced-motion

**Checkpoint**: `git grep -nE 'lenis|gsap|ScrollTrigger|@react-three|\bthree\b'` returns no source-code matches; `npm run build` exits 0; bundle size shrinks.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Acceptance gates, design-fidelity review, and documentation sync.

- [ ] T041 Run `cd edu-site && npm run build` and fix any remaining failures (must exit 0)
- [ ] T042 [P] Run `cd edu-site && npx tsc --noEmit` and fix any type errors
- [ ] T043 [P] Run `cd edu-site && node scripts/check-frontmatter.mjs` and fix any frontmatter drift
- [ ] T044 Execute FR-014 design-fidelity review (use `specs/002-apple-design/contracts/design-system.md` checklist) — light + dark intentional, WCAG AA contrast, blur fallback, reduced-motion, keyboard reachability, responsive overflow at 320/768/1440, degraded WebGL/assets walk; record findings
- [ ] T045 [P] Run Lighthouse + axe audit (existing `npm run test:audit` or CI workflow) — confirm performance ≥ 90, accessibility ≥ 95 (SC-004 / SC-005)
- [ ] T046 [P] Confirm free-tier guarantee (Constitution Principle I) — `git diff origin/main..HEAD -- package.json` shows zero added paid deps; no proprietary Apple asset/font introduced (SC-006, FR-013)
- [ ] T047 Update `edu-site/docs/` site copy only if the user-facing "About" / "What this is" sections reference the old motion-heavy stack; otherwise leave content untouched per FR-012
- [ ] T048 Append a PHR entry to `history/prompts/002-apple-design/0004-implement-apple-design.tasks.prompt.md` summarizing the implementation pass with concrete file lists and any deviations from the plan

**Checkpoint**: All SC-001…SC-007 satisfied; merge-ready.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately.
- **Phase 2 (Foundational — Tokens)**: Depends on Phase 1. **BLOCKS** all user-story phases. No surface migration may begin before T009 lands.
- **Phase 3 (US1 — Homepage)**: Depends on Phase 2. Independently testable.
- **Phase 4 (US2 — Light/Dark reading)**: Depends on Phase 2. Independently testable; can run in parallel with Phase 3 if staffed.
- **Phase 5 (US3 — Interaction)**: Depends on Phase 2. Depends on Phase 4 for the focus-ring audit on reading surfaces.
- **Phase 6 (US4 — Curriculum personality)**: Depends on Phase 2. Independently testable; can run after Phase 3 because the homepage already references the static hero.
- **Phase 7 (Motion Removal)**: Depends on Phase 3 — the static hero must already be wired into `index.tsx` before Hero3D/ScrollFX are deleted.
- **Phase 8 (Polish)**: Depends on all of the above.

### User Story Dependencies

- **US1 (P1)**: After Phase 2 — no other-story dependency.
- **US2 (P1)**: After Phase 2 — no other-story dependency; integrates with US1 only via the shared homepage reading chrome.
- **US3 (P1)**: After Phase 2 — depends on US2 focus-ring tokens (T009 / T021) being applied to reading surfaces; otherwise independent.
- **US4 (P2)**: After Phase 2 — no other-story dependency; can start in parallel with US1/US2/US3.

### Within Each User Story

- Token references first (Phase 2).
- Static / typography before interaction before data viz.
- Surface-level CSS before component wiring.
- Story complete before the next priority begins (if running solo).

---

## Parallel Opportunities

### Within Phase 2 (Foundational — Tokens)
- T005, T006, T007, T008, T010 all touch different selectors within `radix.css` / `custom.css` / `openprops.css` and can run as `[P]`.

### Within Phase 3 (US1 Homepage)
- T012 and T013 touch `HomepageHero/styles.module.css` and `src/pages/index.tsx` — can run as `[P]`.

### Within Phase 4 (US2 Light/Dark)
- T016, T017, T018 touch different files (`Callout/index.tsx`, `custom.css` dark layer, `custom.css` fallback rules) — `[P]`.

### Within Phase 5 (US3 Interaction)
- T022, T023, T024 touch `custom.css`, `HomepageHero/styles.module.css`, and `DataViz/*` wrappers — `[P]`.

### Within Phase 6 (US4 Curriculum Personality)
- T026, T027, T028, T029, T030, T032 touch different components — `[P]`.

### Within Phase 7 (Motion Removal)
- T034, T035, T036 are pure file deletions — `[P]`. T039 and T040 are read-only audits — `[P]`.

### Within Phase 8 (Polish)
- T042, T043, T045, T046, T047 are read-only or near-read-only — `[P]`.

---

## Parallel Example — Phase 6 (US4)

```bash
# Launch stage + chart restyle in parallel (different files):
Task: "Restyle StageCard with muted accent chip in edu-site/src/components/StageCard/index.tsx"
Task: "Restyle ChapterState pill in edu-site/src/components/ChapterState/index.tsx"
Task: "Update stage-icons fills in edu-site/src/components/stage-icons/index.tsx"
Task: "Restyle CurriculumBarChart single-accent palette in edu-site/src/components/DataViz/CurriculumBarChart.tsx"
Task: "Restyle CurriculumDonut neutral steps in edu-site/src/components/DataViz/CurriculumDonut.tsx"
Task: "Confirm provider chips in edu-site/src/components/icons/index.tsx remain neutral"
```

---

## Implementation Strategy

### MVP First (User Story 1 only)

1. Complete Phase 1 + Phase 2.
2. Complete Phase 3 (US1 — static homepage hero).
3. **STOP and VALIDATE**: Open `/`, confirm calm premium hero in both modes, no WebGL canvas, primary CTA Apple-blue. This is the smallest visible win.

### Incremental Delivery

1. Phase 1 + Phase 2 → Foundation ready.
2. Phase 3 (US1) → MVP deploy/demo (calm homepage).
3. Phase 4 (US2) → Light/dark reading parity deploy/demo.
4. Phase 5 (US3) → Confident keyboard/responsive navigation deploy/demo.
5. Phase 6 (US4) → Stage identity + single-accent charts deploy/demo.
6. Phase 7 → Motion strip-down (silent perf win, no visual change vs static hero).
7. Phase 8 → Polish + fidelity review + Lighthouse/axe gates.

### Parallel Team Strategy

With multiple contributors:
- Engineer A: Phase 2 tokens → Phase 3 US1 hero.
- Engineer B: Phase 4 US2 reading surfaces.
- Engineer C: Phase 6 US4 stage/chart palette (depends only on Phase 2).
- Engineer D (after US2/US4 land): Phase 5 US3 interaction layer.
- Engineer E (last, post-static-hero): Phase 7 motion removal + Phase 8 polish.

---

## Notes

- `[P]` tasks touch different files and have no unresolved dependencies.
- `[Story]` labels (US1…US4) trace each task back to its user story for spec-coverage review.
- This feature has **no API, no schema, no migrations** — every task is presentation-layer (CSS + component + dependency removal).
- Do **not** modify curriculum routes, sidebar order, chapter content, icon taxonomy, or frontmatter contract (FR-012).
- Do **not** add paid infrastructure, paid fonts, or proprietary Apple assets (FR-013, SC-006).
- The FR-014 design-fidelity review (T044) is the acceptance gate, not unit tests.
