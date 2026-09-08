# Specification Quality Checklist: Fix Navbar Alignment and Formatting

**Purpose**: Validate specification completeness and quality before proceeding to planning
**Created**: 2026-08-18
**Feature**: [spec.md](../spec.md)

## Content Quality

- [x] No implementation details (languages, frameworks, APIs)
- [x] Focused on user value and business needs
- [x] Written for non-technical stakeholders
- [x] All mandatory sections completed

**Notes**: Requirements describe user-visible alignment and formatting outcomes (baseline alignment, glass treatment, touch targets, focus rings, theme smoothness). The plan will detail the specific CSS and Docusaurus overrides needed.

## Requirement Completeness

- [x] No [NEEDS CLARIFICATION] markers remain
- [x] Requirements are testable and unambiguous
- [x] Success criteria are measurable
- [x] Success criteria are technology-agnostic (no implementation details)
- [x] All acceptance scenarios are defined
- [x] Edge cases are identified
- [x] Scope is clearly bounded
- [x] Dependencies and assumptions identified

**Notes**: 
- Two user stories, both P1 and P2 with clear priority ranking.
- Ten functional requirements cover alignment, glass treatment, touch targets, focus rings, theme transition, mobile drawer, and title truncation.
- Five success criteria include screenshot diff, touch-target check, Lighthouse score, CLS, and build pass.
- Discovery scan found the navbar config (logo + title on left, "Curriculum" sidebar item, GitHub link on right; theme toggle is the default Docusaurus colorMode toggle), the glass treatment in `custom.css:359-371`, the focus ring and touch-target rules in `a11y.css:86-93, 304-321`, and the mobile drawer treatment in `custom.css:1207-1216`.

## Feature Readiness

- [x] All functional requirements have clear acceptance criteria
- [x] User scenarios cover primary flows
- [x] Feature meets measurable outcomes defined in Success Criteria
- [x] No implementation details leak into specification

## Constitution Compliance

Cross-checked against `.specify/memory/constitution.md` (v2.1.1):

- [x] **I. Free-Tier by Default** — No new paid assets or services; visual polish only.
- [x] **II. Pluggable Provider Abstraction** — N/A; no service boundary changes.
- [x] **III. Co-Authored Text, Video-Second** — N/A; no content workflow changes.
- [x] **IV. Spec-Driven Development (NON-NEGOTIABLE)** — Spec + checklist precede code.
- [x] **V. Smallest Viable Change** — Scope bounded to navbar styling; no IA, content, or stack rebuild.
- [x] **VI. Free, Open Curriculum** — Improves learner-facing chrome without content change.
- [x] **VII. Apple-Design Purity** — The driving principle: aligned baselines, frosted glass with fallback, focus rings with Apple-blue accent, minimal visual noise.

## Notes

- All items pass. The spec is ready for `/sp.plan`.
- The `/sp.plan` invocation MUST reference Constitution v2.1.1 in its Constitution Check section.
- Plan must address: per-element alignment overrides in `custom.css` (navbar inner, brand, items, colorModeToggle, GitHub link), height and padding parity between theme toggle and GitHub link, mobile drawer baseline alignment with the hamburger toggle, and a verification flow covering 4 screenshot configurations (desktop/mobile × light/dark).
