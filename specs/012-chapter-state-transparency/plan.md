# Implementation Plan: Chapter State Transparency

**Branch**: `012-chapter-state-transparency` | **Date**: 2026-08-25 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/012-chapter-state-transparency/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

The feature surfaces two honest signals about a chapter's real state that the
current site does not show: a designed "not yet written" badge on every
placeholder chapter (15 of 17 real doc pages), and a per-chapter "N/9 modes
available" count inside the `ReaderControls` card on `text-ready` chapters
(2 of 17 today).

The technical approach is the smallest viable one: reuse existing plumbing
rather than invent it. For item 3 (placeholder badges), the wiring already
exists — `edu-site/src/theme/MDXComponents.tsx`'s `ChapterHeading` calls
`useDoc()` and renders `<ChapterState state={state} />` above every chapter
`<h1>`, and `<ChapterState />` itself already implements the generic
`STATE_META` mapping for `placeholder`/`text-ready`/`video-published` with
the required `.tbb-chapter-state--*` CSS classes. The work for item 3 is
therefore (a) verifying all 15 placeholder pages carry
`chapter_state: placeholder` in their frontmatter, and (b) tightening the
existing CSS so the placeholder badge renders honestly (no fixed
chapter-count language anywhere, no chrome that implies a final book
length).

For item 9 (the completeness count), the data is already computed at
runtime — `ReaderControls/index.tsx` populates
`authored.combinations: Set<string>` via `inferAuthoredCombinations(rootRef.current)`,
and `authored.combinations.size` is the 1–9 count we need to display. The
work is a single small `<p>` element inside the existing card, plus an
SSR/no-JS graceful-degradation strategy, plus the visual-distinctness rule
from FR-009 (it must read as a different piece of information than the
existing `substitutionNote`).

Both indicators live within the existing ADR-0003 adaptive-reader-controls
architecture. No new components, no new dependencies, no new theme
overrides, no Phase B/C surface. Apple-Design Purity (Principle VII) is
preserved by reusing existing CSS tokens only.

## Technical Context

**Language/Version**: TypeScript / React (functional components + hooks),
inside the existing Docusaurus v3.x site. No new language surface
introduced.

**Primary Dependencies**: None new. The feature reuses:
- `edu-site/src/components/ChapterState/index.tsx` (already implements
  `STATE_META` and `.tbb-chapter-state--*` modifier classes).
- `edu-site/src/components/ReaderControls/index.tsx` (already exposes
  `authored.combinations.size` from `inferAuthoredCombinations`).
- `edu-site/src/components/ReaderControls/ReaderControls.module.css`
  (existing tokens — `.cue`, `.substitution`, `.combinationDescription`,
  surface-glass, etc.).
- `edu-site/src/css/custom.css` (already defines
  `.tbb-chapter-state--placeholder`, `--text-ready`, `--video-published`,
  `--unknown` at lines 961–1008).
- `edu-site/src/theme/MDXComponents.tsx` (already injects
  `<ChapterState>` and `<ReaderControls>` from `ChapterHeading` via
  `useDoc().frontMatter.chapter_state`).

**Storage**: N/A. The placeholder badge is derived from frontmatter; the
completeness count is computed at render time from DOM attributes the
existing authoring primitives (`<Beginner>`, `<Advanced>`, etc.) already
emit (`data-arc-*`). Nothing is persisted; nothing is fetched.

**Testing**: Existing quality gates only —
- `edu-site/scripts/check-frontmatter.mjs` (must remain green).
- `edu-site/scripts/check-chapter-quality.mjs` (must remain green).
- `npm run build` (must remain green; transitively runs
  `check:frontmatter` and the search-index step).
- Existing axe accessibility test (FR-012 — SC-005 requires zero new
  violations).
No new test scripts introduced; the change is presentational and
deterministic, and existing validators are sufficient.

**Target Platform**: Docusaurus static site, deployed to
`thebridgebalance.app`. Mobile + desktop web. No native, no SSR runtime
new surface (Docusaurus already SSRs to static HTML — our SSR concerns
reduce to "what does the static HTML render before React hydrates").

**Project Type**: Single, web, frontend-only. Strictly scoped to
`edu-site/`. No backend changes (the `api/` subtree is untouched).

**Performance Goals**: Zero regressions. Specifically:
- No new bundle-size budget impact: the new `<p>` for the completeness
  count is a few characters of JSX; the placeholder-badge verification
  pass adds nothing to the JS bundle.
- No LCP regressions: both indicators are above-the-fold supplementary
  chrome (rendered above the `<h1>`), which is the same position the
  existing `<ReaderControls>` already occupies — its LCP contribution is
  unchanged.
- No new HTTP requests.

**Constraints**:
- Apple-Design Purity (Principle VII). Existing tokens only; existing
  blur+elevation pattern; `prefers-reduced-motion` collapse preserved.
- Phase A only (per `stack.md`). No Stripe / R2 / Inngest / Resend / DB
  auth surfaces. This feature introduces none of them.
- "No fixed chapter list or count, ever" (locked decision D5).
  Verified by SC-002: zero doc pages may display a specific total
  chapter count or "chapter N of M" framing in the new indicators.

**Scale/Scope**: 17 doc pages in scope today (2 text-ready + 15
placeholder + 4 stage-index overviews). Of these, 15 receive the
placeholder badge and 2 receive the completeness indicator; 4 (the
stage-index overviews) receive nothing and are visually unchanged. Total
code surface area touched: ~3 files (`custom.css` CSS-only verification,
`ReaderControls/index.tsx` one small insertion, possibly a new
`ReaderControls.module.css` class for the indicator).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Evaluated against `.specify/memory/constitution.md` v2.1.1 (the seven
ratified principles):

| # | Principle | Status | Note |
|---|---|---|---|
| I | Free-Tier by Default | PASS | No paid surface introduced. Both indicators are pure presentational chrome. |
| II | Pluggable Provider Abstraction | PASS | No new provider or integration introduced. |
| III | Co-Authored Text, Video-Second Delivery | PASS | This feature extends the `placeholder → text-ready → video-published` chapter lifecycle presentation; it does not change authoring rules. The `STATE_META` mapping is generic over future values (FR-003). |
| IV | Spec-Driven Development (NON-NEGOTIABLE) | PASS | This file is the explicit `/sp.plan` deliverable. Stage=plan PHR will be created before tasks stage. |
| V | Smallest Viable Change | PASS | Reuses existing plumbing (frontmatter → `useDoc()` → `<ChapterState>`, `inferAuthoredCombinations` → `authored.combinations.size`). No new components, hooks, themes, or dependencies. |
| VI | Free, Open Curriculum | PASS | No paid gating, no membership check, no copy change to the book itself. |
| VII | Apple-Design Purity | PASS | Existing CSS tokens only (`--tbb-text-muted`, `--tbb-text-faint`, `--tbb-surface-emphasis`, `.combinationDescription` pattern). No new color, typography, or motion system. `prefers-reduced-motion` collapse already established in `ReaderControls.module.css:209-214` covers any new transitions. |

**Result**: Clean pass on all seven principles. No violations to justify
in Complexity Tracking.

### Constitution Check · post-design re-evaluation (after Phase 1)

Re-evaluated after Phase 0 (`research.md`) and Phase 1
(`data-model.md`, `contracts/`, `quickstart.md`) resolved the four
remaining micro-design questions:

- **Principle V (Smallest Viable Change)**: confirmed — no new
  components, files, or hooks introduced by Phase 1. The only
  implementation-surface addition is one new `.completeness` CSS class
  in `ReaderControls.module.css` (R-004) and one new `<p>` insertion
  in `ReaderControls/index.tsx` (R-001). Three-line CSS, four-line
  JSX.
- **Principle VII (Apple-Design Purity)**: confirmed — every
  resolved design decision (R-001 placement, R-003 ARIA, R-004
  styling) reuses existing tokens (`--tbb-text-muted`,
  `--tbb-accent-subtle`, the `.cue` typography pattern, the
  `prefers-reduced-motion` collapse block). No new visual language.
- **Principle IV (SDD, NON-NEGOTIABLE)**: confirmed — this stage=plan
  PHR is being created immediately after Phase 1, before
  `/sp.tasks`.

**Result**: Clean pass on all seven principles, post-design.
No violations introduced by the design phase.

## Project Structure

### Documentation (this feature)

```text
specs/012-chapter-state-transparency/
├── plan.md                # This file (/sp.plan command output)
├── research.md            # Phase 0 output (/sp.plan command)
├── data-model.md          # Phase 1 output (/sp.plan command)
├── quickstart.md          # Phase 1 output (/sp.plan command)
├── contracts/             # Phase 1 output (/sp.plan command) — empty/
│                           this is a pure presentational feature, no new
│                           API contracts
└── tasks.md               # Phase 2 output (/sp.tasks command — NOT
                            created by /sp.plan)
```

### Source Code (repository root)

Strictly scoped to `edu-site/`. No new directories. All changes land in
existing files:

```text
edu-site/
├── docs/                              # 17 MDX chapters in scope; 15 carry
│   │                                   chapter_state: placeholder, 2
│   │                                   carry chapter_state: text-ready,
│   │                                   4 stage-index overviews have no
│   │                                   chapter_state field. NO content
│   │                                   edits — only frontmatter audit.
├── src/
│   ├── components/
│   │   ├── ChapterState/
│   │   │   ├── index.tsx              # EXISTS — already implements
│   │   │   │                            STATE_META + .tbb-chapter-state--*
│   │   │   │                            modifier classes. NO code edits
│   │   │   │                            unless verification reveals a
│   │   │   │                            visual gap (then CSS-only polish).
│   │   │   └── ChapterState.module.css  # Verify exists; CSS-only polish
│   │   │                                if needed.
│   │   └── ReaderControls/
│   │       ├── index.tsx              # INSERT one <p> inside the card
│   │       │                            for the "N/9 modes available"
│   │       │                            indicator, adjacent to (not
│   │       │                            duplicating) substitutionNote.
│   │       └── ReaderControls.module.css  # Add ~1 small class for the
│   │                                       new indicator (visual
│   │                                       distinctness from
│   │                                       .substitution per FR-009).
│   ├── css/
│   │   └── custom.css                 # VERIFY .tbb-chapter-state--*
│   │                                    lines 961–1008 cover all
│   │                                    placeholder chrome needs; CSS-
│   │                                    only polish if needed.
│   └── theme/
│       └── MDXComponents.tsx          # VERIFY ChapterHeading still
│                                       correctly gates <ChapterState>
│                                       on chapter_state presence
│                                       (so stage-index overviews skip
                                       it). NO edits expected.
└── scripts/
    ├── check-frontmatter.mjs          # GATE — must remain green.
    └── check-chapter-quality.mjs      # GATE — must remain green.
```

**Structure Decision**: Option 1 (Single project), scoped to `edu-site/`
only. No backend, no mobile, no new top-level directories. The
`contracts/` directory under `specs/012-chapter-state-transparency/` is
intentionally empty — this is a pure presentational feature with no new
APIs, schemas, or external interfaces.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| (none) | — | — |

No violations. Constitution Check passes cleanly on all seven principles.
