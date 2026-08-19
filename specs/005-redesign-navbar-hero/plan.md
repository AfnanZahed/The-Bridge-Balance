# Implementation Plan: Redesign Top-of-Page Chrome (Navbar + Hero Top) from Scratch

**Branch**: `005-redesign-navbar-hero` | **Date**: 2026-08-19 | **Spec**: specs/005-redesign-navbar-hero/spec.md
**Input**: Feature specification from `/specs/005-redesign-navbar-hero/spec.md`

## Summary

Redesign the top-of-page chrome — the persistent navbar and the hero top section — from scratch, keeping the existing free-tier Apple Pro toolchain. The navbar becomes a centered-brand arrangement with a client-side curriculum search affordance; the hero top is fully replaced with a new mesh-gradient background and a redesigned deck (mark, eyebrow, headline, subtitle, CTA row, meta row) while keeping the approved copy. The accessibility contract from feature 004 (44×44 touch targets, Apple-blue focus rings, glass fallback, no layout shift on theme change, WCAG 2.2) is inherited and preserved.

## Technical Context

**Language/Version**: TypeScript 5.5 / React 18 / CSS (OKLCH tokens)  
**Primary Dependencies**: Docusaurus 3.7 (Infima CSS framework), @radix-ui/colors, open-props, motion  
**Storage**: N/A — static site; client-side search uses a build-time generated JSON index  
**Testing**: Visual regression via Playwright (geometry + search interaction); Lighthouse accessibility ≥ 95; `npm run build` must pass; `npm run test:a11y` / `npm run test:perf` as defined in `package.json`  
**Target Platform**: Web (desktop ≥ 996px, mobile < 996px), modern browsers with backdrop-filter and @supports fallback  
**Project Type**: Web application (Docusaurus static site)  
**Performance Goals**: Theme toggle ≤ 200ms with zero layout shift (CLS navbar/hero = 0); search results debounced ≤ 200ms; production build passes  
**Constraints**:  
- Principle VII (Apple-Design Purity): frosted glass with solid fallback, Apple-blue accent focus rings, 44×44 touch targets, reduced-motion collapse, single accent per surface, mesh gradient from existing OKLCH tokens  
- Principle V (Smallest Viable Change): CSS-first overrides; `src/theme/SearchBar` override for search; no new React components for navbar; hero is an updated `<section class="tbb-hero">`  
- Constitution §176: Design fidelity audit — blur fallback, light/dark both render, prefers-reduced-motion, focus-visible, no hard borders replacing elevation  
- Free-tier only (Constitution I): no Algolia, no paid search, no new paid assets, fonts, or icon libraries  
**Scale/Scope**: Single navbar on ~50 textbook pages; single hero on homepage; search index covers ~50 curriculum docs

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|---|---|---|
| I. Free-Tier by Default | ✅ PASS | Client-side search uses build-time static index; no Algolia, no paid search service, no new paid assets |
| II. Pluggable Provider Abstraction | ✅ PASS | Search is an internal implementation; no external SDK |
| III. Co-Authored Text, Video-Second | ✅ PASS | Copy unchanged; no new content workflow |
| IV. Spec-Driven Development | ✅ PASS | Spec → Plan → Tasks → Implement lifecycle followed; PHRs recorded |
| V. Smallest Viable Change | ✅ PASS | CSS-first; `src/theme/SearchBar` for search; no new React components for navbar |
| VI. Free, Open Curriculum | ✅ PASS | No paywall on content; search is free-tier feature |
| VII. Apple-Design Purity | ✅ PASS | The driving principle: centered-brand navbar, mesh-gradient hero, shared materials, focus rings, 44px targets, reduced-motion |

**Design Fidelity (Operational Standards §183)** — audit items to verify at ship:
- (a) blur has non-blur fallback → `@supports not backdrop-filter` already in `custom.css`
- (b) light/dark both render every surface with defined tokens → `--tbb-navbar-glass`, `--tbb-surface-glass`, `--tbb-surface-solid`, `--tbb-bg` exist per theme
- (c) `prefers-reduced-motion: reduce` collapses decorative motion → global `a11y.css` covers this; new hero mesh and search panel must respect it
- (d) focus-visible states visible on every interactive element → `a11y.css` covers navbar; new search input and hero CTAs must use same ring
- (e) no hard borders replace missing elevation → hairline border via `--tbb-border`; new mesh layers use soft gradients

## Project Structure

### Documentation (this feature)

```text
specs/005-redesign-navbar-hero/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/
│   └── presentation-contract.md  # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
edu-site/
├── src/
│   ├── theme/
│   │   └── SearchBar/
│   │       └── index.tsx        # NEW — search control + dropdown (replaces default)
│   ├── components/
│   │   └── HomepageHero/
│   │       ├── index.tsx        # MODIFIED — new hero deck composition
│   │       └── styles.module.css # MODIFIED — new mesh-gradient + deck layout
│   └── css/
│       ├── custom.css           # MODIFIED — centered-brand, search control, hero mesh
│       └── a11y.css             # MODIFIED — search input + hero CTA focus rings
├── scripts/
│   └── generate-search-index.mjs # NEW — build-time indexer for curriculum docs
├── docusaurus.config.ts          # MODIFIED — register SearchBar in navbar items
└── package.json                  # reference only (scripts, deps)
```

**Structure Decision**: Single-project Docusaurus layout. The feature touches:
- Navbar presentation: `custom.css` (centered-brand, search styling)
- Search affordance: `src/theme/SearchBar/index.tsx` (new) + config registration
- Hero top: `components/HomepageHero/index.tsx` + `styles.module.css` (new mesh + deck)
- Search index: `scripts/generate-search-index.mjs` (new build step)
- All within the existing Docusaurus project; no new directories beyond `src/theme/SearchBar`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|---|---|---|
| (none) | — | — |

## Phase 0: Research → Complete

All technical unknowns resolved in `research.md`:
- R-001: Centered brand via absolute-centering CSS on existing Infima markup
- R-002: Client-side search via build-time index + `src/theme/SearchBar` override
- R-003: Hero mesh via pure CSS OKLCH radial gradients
- R-004: BrandMark identity mark retained (logo unchanged)
- R-005: Verification harness from feature 004 reused
- R-006: No new tokens

## Phase 1: Design & Contracts → Complete

- `data-model.md` — presentation entities, search index schema, UI state transitions
- `contracts/presentation-contract.md` — observable surface across 4 configs
- `quickstart.md` — runtime verification runbook

## Phase 2: Next Steps (generated by `/sp.tasks`)

The `/sp.tasks` command will decompose this plan into ordered, dependency-aware tasks for `/sp.implement`.

## Agent Context Update

```bash
.specify/scripts/powershell/update-agent-context.ps1 -AgentType claude
```
(Adds the feature's stack: Docusaurus 3.7, React 18, TypeScript 5.5, CSS/OKLCH tokens)