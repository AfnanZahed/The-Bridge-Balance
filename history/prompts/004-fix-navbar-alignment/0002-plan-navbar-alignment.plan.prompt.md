---
id: 0002
title: Plan navbar alignment fix
stage: plan
date: 2026-08-18
surface: agent
model: MiniMax-M3
feature: 004-fix-navbar-alignment
branch: 004-fix-navbar-alignment
user: Dell
command: /sp.plan
labels: [plan, navbar, alignment, css, infima, apple-design, wcag]
links:
  spec: specs/004-fix-navbar-alignment/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/004-fix-navbar-alignment/plan.md
  - specs/004-fix-navbar-alignment/research.md
  - specs/004-fix-navbar-alignment/data-model.md
  - specs/004-fix-navbar-alignment/contracts/visual-contract.md
  - specs/004-fix-navbar-alignment/quickstart.md
  - CLAUDE.md (agent context updated)

tests:
  - Constitution Check (7 principles) — PASS post-design
  - Design fidelity audit (5 items) — PASS (existing rules verified)
  - No new dependencies or paid assets introduced
---

## Prompt

> /sp.plan

## Response snapshot

- Ran `setup-plan.ps1 -Json` → got paths for `plan.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md`, `tasks.md`, branch `004-fix-navbar-alignment`.
- Read `edu-site/docusaurus.config.ts` → confirmed navbar structure (brand title + 32×32 logo, Curriculum doc-sidebar on left, GitHub link on right, default Infima color-mode toggle).
- Read `edu-site/src/css/custom.css:358-371` → existing frosted-glass navbar block (border-bottom, `--tbb-navbar-glass`, `--tbb-apple-frost`, 0.875rem padding, `@supports` solid fallback).
- Read `edu-site/src/css/custom.css:1207-1216` → mobile drawer glass treatment.
- Read `edu-site/src/css/a11y.css:85-93` → Apple-blue navbar focus rings (`.navbar__link`, `.navbar__brand`, `.navbar__title`).
- Read `edu-site/src/css/a11y.css:304-321` → 44×44 CSS px touch-target sizing on `.navbar__link`, `.navbar__brand`.
- Read `edu-site/src/css/radix.css` → Apple Pro Blue OKLCH primitives.
- Confirmed all required tokens (`--tbb-navbar-glass`, `--tbb-surface-glass`, `--tbb-surface-solid`, `--tbb-accent`, `--tbb-a11y-focus-*`) are already declared per-theme in `custom.css`.
- Filled Technical Context (TypeScript/React/CSS; Docusaurus 3.7; visual regression via Playwright + Lighthouse ≥ 95 + npm run build; web target; CLS=0; 4-config verification matrix).
- Filled Constitution Check (all 7 principles PASS post-design, with Constitution §176 design-fidelity audit items verified for the existing token/focus/blur/reduced-motion/fallback rules).
- Wrote Phase 0 `research.md` (R-001..R-005): keep Infima markup, shared geometry layer, retain glass + fallback, runtime verification, scope-limited to presentation.
- Wrote `data-model.md`: explicit "no persistent entities" statement; UI entities table covering navbar bar, brand, primary nav, theme toggle, GitHub link, mobile drawer, hamburger; state lifecycle (theme/viewport/drawer/focus); validation rules.
- Wrote `contracts/visual-contract.md`: presentation contract defining the 4-config matrix, observable surface (vertical baseline, control parity, touch targets, theme transition, focus, mobile drawer, border), and non-goals (no HTTP/API surface).
- Wrote `quickstart.md`: 8-step verification runbook (inspect before/after, control geometry parity, apply CSS, build, 4-config screenshots, keyboard focus, mobile drawer, report).
- Ran `update-agent-context.ps1 -AgentType claude` → CLAUDE.md context updated with language/framework/database from this plan (TypeScript 5.5 / React 18 / CSS OKLCH; Docusaurus 3.7 + Infima, Radix Colors, Open Props, Motion).

## Outcome

- ✅ Impact: An implementation-ready plan now defines the navbar alignment/formatting fix as a bounded CSS-only change targeting `custom.css` navbar block and `a11y.css` touch/focus rules. The plan freezes the visual contract (`contracts/visual-contract.md`) and the verification method (`quickstart.md`), reusing existing Apple Pro / WCAG tokens.
- 🧪 Tests: Constitution Check passes; design-fidelity audit items verified against existing CSS; no new dependencies, no backend changes, no paid assets.
- 📁 Files: `specs/004-fix-navbar-alignment/plan.md`, `research.md`, `data-model.md`, `contracts/visual-contract.md`, `quickstart.md`; `CLAUDE.md` context updated.
- 🔁 Next prompts: `/sp.tasks` to decompose the plan into ordered, testable tasks (Phase 2 of the lifecycle), then `/sp.implement`.
- 🧠 Reflection: The plan leverages the existing Apple-Pro token system and a11y rules — no new tokens, no swizzling. This keeps the diff small, the upgrade path clean, and the visual contract measurable through Playwright + Lighthouse + the Docusaurus build.

## Evaluation notes (flywheel)

- Failure modes observed: None. Setup-plan.ps1 succeeded; update-agent-context.ps1 succeeded.
- Graders run and results (PASS/FAIL): PASS — Constitution Check (all 7 principles); PASS — Design fidelity audit (existing CSS rules cover all 5 items).
- Prompt variant (if applicable): n/a.
- Next experiment (smallest change to try): In `/sp.tasks`, generate T001–T007 as: T001 snapshot-before (Playwright 4-config baseline), T002–T004 CSS layer additions (navbar baseline, control parity, mobile drawer), T005 build, T006 4-config Playwright verification with screenshots, T007 Lighthouse a11y ≥ 95.