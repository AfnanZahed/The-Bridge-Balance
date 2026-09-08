---
id: 0003
title: Plan navbar and hero redesign
stage: plan
date: 2026-08-19
surface: agent
model: MiniMax-M3
feature: 005-redesign-navbar-hero
branch: 005-redesign-navbar-hero
user: Dell
command: /sp.plan
labels: [plan, navbar, hero, redesign, search, mesh-gradient, centered-brand, client-side-search]
links:
  spec: specs/005-redesign-navbar-hero/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/005-redesign-navbar-hero/plan.md
  - specs/005-redesign-navbar-hero/research.md
  - specs/005-redesign-navbar-hero/data-model.md
  - specs/005-redesign-navbar-hero/contracts/presentation-contract.md
  - specs/005-redesign-navbar-hero/quickstart.md
  - CLAUDE.md (agent context updated)

tests:
  - Constitution Check (7 principles) — PASS post-design
  - Design fidelity audit (5 items) — PASS (existing rules verified; new artifacts covered)
  - No new dependencies, no external search service, no paid assets
  - All Phase 0 research items resolved
---

## Prompt

> /sp.plan

## Response snapshot

- Ran `setup-plan.ps1 -Json` → `plan.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md`, branch `005-redesign-navbar-hero`.
- Read spec.md, existing CSS (`custom.css` navbar block from feature 004), `BrandMark` component, `HomepageHero` component + styles, `docusaurus.config.ts`, `package.json`, `stack.md`, and the Constitution v2.1.1.
- Filled Technical Context: TypeScript 5.5 / React 18 / CSS OKLCH; Docusaurus 3.7 + Infima; static site + build-time search index; Playwright + Lighthouse + build verification; desktop ≥ 996px / mobile < 996px; CLS=0, 200ms theme toggle; ~50 pages, 1 hero.
- Constitution Check: all 7 principles PASS; Design Fidelity (5 items) verified against existing tokens and planned new artifacts.
- Phase 0 research completed (`research.md`): R-001 centered-brand via absolute-centering CSS; R-002 client-side search via build-time index + `src/theme/SearchBar`; R-003 hero mesh via pure CSS OKLCH radial gradients; R-004 BrandMark retained; R-005 verification harness reused; R-006 no new tokens.
- Phase 1 artifacts generated: `data-model.md` (presentation entities, search index schema, UI state transitions), `contracts/presentation-contract.md` (4-config observable surface), `quickstart.md` (runtime verification runbook).
- Updated `CLAUDE.md` agent context with feature stack.
- All Constitution gates pass; no violations.

## Outcome

- ✅ Impact: The implementation plan is complete and design-frozen. It defines a centered-brand navbar with client-side curriculum search, a hero with a new mesh-gradient background and redesigned deck, and inherits the accessibility contract from feature 004. All decisions use the existing Apple Pro token system and free-tier toolchain.
- 🧪 Tests: Constitution Check PASS; Design Fidelity audit PASS; no new dependencies, no external search service, no paid assets.
- 📁 Files: `specs/005-redesign-navbar-hero/{plan.md,research.md,data-model.md,quickstart.md,contracts/presentation-contract.md}`; `CLAUDE.md` updated.
- 🔁 Next prompts: `/sp.tasks` to decompose into ordered, dependency-aware tasks, then `/sp.implement`.
- 🧠 Reflection: The plan is tightly scoped to two surfaces (navbar + hero top) with clear priorities (US1 + US2 as P1 MVP slices). The centered-brand + search + mesh-gradient direction maximizes perceived change while staying within the free-tier Apple Pro toolchain. The client-side search design (build-time index + `src/theme/SearchBar` override) is the only behavioral change beyond styling.

## Evaluation notes (flywheel)

- Failure modes observed: None. `setup-plan.ps1` and `update-agent-context.ps1` succeeded.
- Graders run and results (PASS/FAIL): PASS — Constitution Check (all 7 principles); PASS — Design Fidelity audit.
- Prompt variant (if applicable): n/a.
- Next experiment (smallest change to try): In `/sp.tasks`, generate tasks that sequence: build-time search indexer → CSS navbar overrides → `src/theme/SearchBar` override → hero deck + mesh CSS → config registration → verification harness.