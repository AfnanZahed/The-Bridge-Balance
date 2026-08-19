---
id: 0003
title: Plan Apple-inspired theme transformation
stage: plan
date: 2026-08-17
surface: agent
model: claude-opus-4-7
feature: 002-apple-design
branch: 002-apple-design
user: Dell
command: /sp.plan
labels: [plan, design, apple, motion-removal, tokens, accessibility]
links:
  spec: specs/002-apple-design/spec.md
  ticket: null
  adr: history/adr/0001-free-tier-llm-choice.md (cross-ref); ADR-0002 (cross-ref)
  pr: null
files:
  - specs/002-apple-design/plan.md (created — Technical Context, Constitution Check v2.1.0 PASS, Project Structure, Phases 1-4, Complexity empty, References)
  - specs/002-apple-design/research.md (created — R-001 muted accents, R-002 Apple-blue, R-003 motion strip, R-004 type tuning, R-005 chart palette, R-006 blur, R-007 focus)
  - specs/002-apple-design/data-model.md (created — Design Token, Surface, ThemeModeState, StageAccent, InteractionState, lifecycle)
  - specs/002-apple-design/contracts/design-system.md (created — token scope, surface contract, motion contract, a11y contract, responsive contract, degrading components, review checklist)
  - specs/002-apple-design/quickstart.md (created — migration commands, acceptance walk, rollback)
  - CLAUDE.md (agent-context update by update-agent-context.ps1)
tests:
  - spec quality checklist — all 20 pass (post-clarify session)
  - constitution check — all 7 principles PASS v2.1.0
---

## Prompt

> /sp.plan

## Response snapshot

- Ran `setup-plan.ps1 -Json` → got `FEATURE_SPEC`, `IMPL_PLAN`, `SPECS_DIR`, `BRANCH` for `002-apple-design`. Plan template copied.
- Loaded active spec (5 user stories, 14 FRs, 7 SCs, 5 clarifications resolved) and Constitution v2.1.0 (7 principles, Apple-Design Purity now Principle VII).
- **Phase 0 — Research**: All 5 clarifications already resolved, so no NEEDS CLARIFICATION remaining. Wrote `research.md` with 7 decisions (R-001…R-007) and per-decision rationale + alternatives.
- **Phase 1 — Design**: 
  - Wrote `data-model.md` (entities: Design Token, Surface, ThemeModeState, StageAccent, InteractionState, lifecycle, invariants).
  - Wrote `contracts/design-system.md` (token scope + surface contract + motion contract + a11y contract + responsive contract + degradation map + FR-014 review checklist).
  - Wrote `quickstart.md` (4-phase migration commands, 9-step acceptance walk, rollback path).
  - Wrote `plan.md` with Technical Context (TStack, removed-deps list: `lenis`/`gsap`/`@react-three/*`/`three`), Constitution Check against v2.1.0 (all 7 PASS), 4-phase implementation order, complexity tracking (empty — no violations).
- Ran `update-agent-context.ps1 -AgentType claude` → CLAUDE.md updated.

## Outcome

- ✅ Impact: Plan is the binding execution document for the Apple-design transformation — token → surface → motion-removal → fidelity-review phases against Constitution v2.1.0. No `NEEDS CLARIFICATION`, all gates PASS.
- 🧪 Tests: spec quality checklist (20/20 post-clarify) · Constitution Check (7/7 v2.1.0)
- 📁 Files: `plan.md`, `research.md`, `data-model.md`, `contracts/design-system.md`, `quickstart.md`, plus `CLAUDE.md` agent-context sync
- 🔁 Next prompts: `/sp.tasks` to generate the dependency-ordered task breakdown against the 4 phases; then implementation.
- 🧠 Reflection: The "Strip to static" decision (Q3) flipped the Phase 3 order — we now *remove* dependencies first instead of *adding* them, which is the smallest-viable-change Principle V paying off in practice.

## Evaluation notes (flywheel)

- Failure modes observed: `setup-plan.ps1` exited 0 cleanly; template copied; `update-agent-context.ps1` reported "No language information found in plan" but completed (WARNING, not blocking).
- Graders run and results (PASS/FAIL): Constitution Check PASS · no `[NEEDS CLARIFICATION]` PASS · 5 clarifications propagated PASS
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): `/sp.tasks` to emit the dependency-ordered task list grouped by the 4 implementation phases.