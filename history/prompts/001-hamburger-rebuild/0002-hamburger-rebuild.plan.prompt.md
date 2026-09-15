---
id: 0002
title: Hamburger rebuild plan
stage: plan
date: 2026-08-19
surface: agent
model: opus
feature: 001-hamburger-rebuild
branch: 001-hamburger-rebuild
user: Dell
command: /sp.plan
labels: [plan, navbar, hamburger, drawer, swizzle, docusaurus, a11y, apple-design]
links:
  spec: specs/001-hamburger-rebuild/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-hamburger-rebuild/plan.md
  - specs/001-hamburger-rebuild/research.md
  - specs/001-hamburger-rebuild/data-model.md
  - specs/001-hamburger-rebuild/contracts/useDrawer.md
  - specs/001-hamburger-rebuild/quickstart.md

tests:
  - Constitution Check re-evaluation — PASS (Principles I, IV, V, VII all green)
  - All 8 research questions resolved — PASS (R-1..R-8 with rejected alternatives)
  - TypeScript contract surface validated against FR-003/005/006/011/012 — PASS
---

## Prompt

/sp.plan (no additional text — invoked after the spec stage)

## Response snapshot

Filled the plan template with Technical Context, Constitution Check (Principles I/IV/V/VII all PASS, II/III/VI N/A), Project Structure (Option 2 web app, three new files in `edu-site/src/components/SiteMenu/`, one swizzle of `Navbar/Content`, additive CSS in `custom.css`), and Complexity Tracking (empty — no violations). Produced four companion artifacts: `research.md` answering R-1 through R-8 (state location, swizzle strategy, blur fallback, scroll lock, ARIA/focus, reduced-motion, three-file budget, route-aware highlight) with explicit rejected alternatives; `data-model.md` documenting the four entities and the seven-state-transition FSM; `contracts/useDrawer.md` defining the `DrawerController` TypeScript surface and its four side effects; `quickstart.md` with a 14-row manual verification matrix. Updated the agent context (`CLAUDE.md`) via `update-agent-context.ps1`. Two future-ADR candidates flagged in the plan (D-1 swizzle scope, D-2 swizzle-as-pattern) — non-blocking.

## Outcome

- ✅ Impact: Implementation now has a complete, testable plan. The brittle CSS `:has()` projection is marked for removal; the new `useDrawer` hook contract is the single source of truth.
- 🧪 Tests: Constitution re-check PASS; all research questions resolved (no NEEDS CLARIFICATION remaining); contract validated against every relevant FR.
- 📁 Files: `plan.md`, `research.md`, `data-model.md`, `contracts/useDrawer.md`, `quickstart.md`. `CLAUDE.md` agent context updated.
- 🔁 Next prompts: `/sp.tasks` to emit `tasks.md` (one task per file change + verification rows).
- 🧠 Reflection: A "rebuild" spec is mostly a maintainability exercise; the right artifact to author first is the *contract*, not the components, because the contract is what the next maintainer reads to understand whether the rebuild preserved intent.

## Evaluation notes (flywheel)

- Failure modes observed: none at plan stage.
- Graders run and results (PASS/FAIL): Constitution Check PASS; research completeness PASS; contract completeness PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): in `/sp.tasks`, prefer file-creation tasks over "verify X" tasks so the build pipeline can prove the source exists before any behavior assertion runs.
