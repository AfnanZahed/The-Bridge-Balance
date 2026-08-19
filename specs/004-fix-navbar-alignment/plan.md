# Implementation Plan: Fix Navbar Alignment and Formatting

**Branch**: `004-fix-navbar-alignment` | **Date**: 2026-08-18 | **Spec**: specs/004-fix-navbar-alignment/spec.md
**Input**: Feature specification from `/specs/004-fix-navbar-alignment/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Align the top navigation bar so that the logo, site title, Curriculum link, theme toggle, and GitHub link share a consistent visual baseline on desktop and mobile, in both light and dark modes. The fix is a narrowly scoped CSS layer in `edu-site/src/css/custom.css` (navbar glass block) and targeted accessibility refinements in `edu-site/src/css/a11y.css`. No Docusaurus swizzling, no React component changes, no configuration changes, no backend work. The existing design tokens (`--tbb-navbar-glass`, `--tbb-accent`, `--tbb-surface-*`, `--tbb-a11y-*`) and Infima markup are preserved.

## Technical Context

**Language/Version**: TypeScript 5.5 / React 18 / CSS (OKLCH tokens)  
**Primary Dependencies**: Docusaurus 3.7 (Infima CSS framework), @radix-ui/colors, open-props, motion  
**Storage**: N/A — static site, no database  
**Testing**: Visual regression via Playwright screenshots + computed geometry assertions; Lighthouse a11y ≥ 95; `npm run build` must pass  
**Target Platform**: Web (desktop ≥ 996px, mobile < 996px), modern browsers with backdrop-filter and @supports fallback  
**Project Type**: Web application (Docusaurus static site)  
**Performance Goals**: No layout shift on theme toggle (CLS navbar = 0); theme transition ≤ 200ms; production build passes  
**Constraints**:  
- Principle VII (Apple-Design Purity): frosted glass with solid fallback, Apple-blue accent focus rings, 44×44 touch targets, reduced-motion collapse, single accent per surface  
- Principle V (Smallest Viable Change): CSS-only overrides; no swizzle; no new dependencies; no backend changes  
- Constitution §176: Design fidelity audit — blur fallback, light/dark both render, prefers-reduced-motion, focus-visible, no hard borders replacing elevation  
**Scale/Scope**: Single navbar component across ~50 textbook pages; 4 visual configurations (desktop/mobile × light/dark)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Free-Tier by Default | ✅ PASS | No paid assets or services; CSS-only visual polish |
| II. Pluggable Provider Abstraction | ✅ PASS | N/A; no service boundary changes |
| III. Co-Authored Text, Video-Second | ✅ PASS | N/A; no content workflow changes |
| IV. Spec-Driven Development (NON-NEGOTIABLE) | ✅ PASS | Spec → Plan → Tasks → Implement lifecycle followed; PHRs recorded |
| V. Smallest Viable Change | ✅ PASS | Scope bounded to navbar styling; no IA, content, or stack rebuild |
| VI. Free, Open Curriculum | ✅ PASS | Improves learner-facing chrome without content change |
| VII. Apple-Design Purity | ✅ PASS | The driving principle: aligned baselines, frosted glass with fallback, focus rings with Apple-blue accent, minimal visual noise |

**Design Fidelity (Operational Standards §183)** — audit items to verify at ship:
- (a) blur has non-blur fallback → `@supports not backdrop-filter` already in `custom.css:367-371`
- (b) light/dark both render every surface with defined tokens → `--tbb-navbar-glass`, `--tbb-surface-glass`, `--tbb-surface-solid` exist per theme
- (c) `prefers-reduced-motion: reduce` collapses decorative motion → global `a11y.css` covers this
- (d) focus-visible states visible on every interactive element → `a11y.css:85-93`, `a11y.css:164-171`
- (e) no hard borders replace missing elevation → hairline border via `--tbb-border`; no new borders added

## Project Structure

### Documentation (this feature)

```text
specs/004-fix-navbar-alignment/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/
│   └── visual-contract.md  # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
edu-site/
├── src/
│   └── css/
│       ├── custom.css      # Navbar frosted glass block (lines 358-371) — primary edit target
│       ├── a11y.css        # Touch targets (304-321), navbar focus rings (85-93) — secondary edit target
│       ├── radix.css       # Design tokens (OKLCH, Apple-blue) — read-only reference
│       └── openprops.css   # Shadow/elevation tokens — read-only reference
├── docusaurus.config.ts    # Navbar config (brand, Curriculum, GitHub, colorMode) — read-only reference
└── package.json            # Build/test scripts — read-only reference
```

**Structure Decision**: Single-project Docusaurus layout. The fix targets two CSS files in `edu-site/src/css/`. No other directories change.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| (none) | — | — |