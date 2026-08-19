---
id: 0004
title: Plan Book Foundation
stage: plan
date: 2026-08-17
surface: agent
model: MiniMax-M3
feature: book-foundation
branch: 001-book-foundation
user: Dell
command: /sp.plan
labels: [plan, docusaurus, vercel, ci, mdx, co-authoring, constitution-v2]
links:
  spec: specs/001-book-foundation/spec.md
  ticket: null
  adr: history/adr/0002-text-first-video-second-workflow.md
  pr: null
files:
  - specs/001-book-foundation/plan.md
  - specs/001-book-foundation/research.md
  - specs/001-book-foundation/data-model.md
  - specs/001-book-foundation/contracts/content-schema.md
  - specs/001-book-foundation/quickstart.md
  - history/prompts/001-book-foundation/0004-plan-book-foundation.plan.prompt.md
tests: []
---

## Prompt

/sp.plan (invoked by user; empty $ARGUMENTS). Generate the implementation plan for feature `001-book-foundation` after the spec was finalized (5 clarifications answered) and the constitution was amended to v2.0.0.

## Response snapshot

1. **Setup.** Ran `.specify/scripts/powershell/setup-plan.ps1 -Json`. Confirmed `FEATURE_SPEC`, `IMPL_PLAN`, `SPECS_DIR`, `BRANCH=001-book-foundation`, `HAS_GIT=true`. Plan template was copied to `specs/001-book-foundation/plan.md`.

2. **Loaded context.** Read the spec (final, post-Q1–Q5) and the constitution v2.0.0 in context. Loaded the plan template (already in context from earlier reading).

3. **Phase 0 — Research.** Wrote `research.md` with 9 resolved unknowns (R-001 through R-009):
   - R-001: Docusaurus 3.7.x (current 3.x major; TypeScript-native)
   - R-002: Vercel auto-detect (no `vercel.json` needed)
   - R-003: Images under `static/img/<chapter-slug>/`
   - R-004: GitHub Actions CI = `npm run build`
   - R-005: `<ChapterState />` React component for the state badge
   - R-006: MDX frontmatter contract with `chapter_state` key
   - R-007: File-based sidebar (Stage 1 expanded, 2–4 collapsed)
   - R-008: Smoke-only testing (no Vitest/Playwright in Phase A)
   - R-009: Branch protection: CI required, no reviewers, admin self-merge
   Each entry: Decision / Rationale / Alternatives considered.

4. **Phase 1 — Design.**
   - `data-model.md` — 4 entities (Stage, Chapter, Lecture, Image) with frontmatter schemas, state machine for Chapter (`placeholder → text-ready → video-published`), and cross-entity invariants.
   - `contracts/content-schema.md` — frontmatter shape per file type (stage overview vs chapter), image reference syntax, build-time validation rules, state→badge color mapping.
   - `quickstart.md` — 7-step developer onboarding: clone/install, run dev server, add/edit chapter, image integration, build & verify, deploy to Vercel, "what's NOT in this quickstart."

5. **Phase 1 — Agent context update.** Ran `.specify/scripts/powershell/update-agent-context.ps1 -AgentType claude`. Updated `CLAUDE.md` with the new tech stack entries (Docusaurus 3.7.x, Vercel, GitHub Actions).

6. **Plan written.** `plan.md` includes:
   - **Technical Context**: TypeScript 5.5.x, Node ≥ 18, Docusaurus 3.7.x, MDX 3.x, React 18, no DB, smoke tests only, Vercel free tier.
   - **Constitution Check**: against v2.0.0 — all 6 principles evaluated; Principles I, III, IV, V, VI PASS; Principle II N/A (no LLM in Phase A). No violations.
   - **Project Structure**: docs tree (intro + llm-providers + 4 stages), source tree (Docusaurus config + new `src/components/ChapterState/` + new `scripts/check-frontmatter.mjs` + new `.github/workflows/ci.yml`), explicitly notes backend out of Phase A scope.
   - **Design Decisions**: 9 rows linking back to R-001…R-009.
   - **Implementation Phases**: 5 phases (Setup / Foundational / Build&Deploy / Co-authoring / Polish) — to be broken into tasks by `/sp.tasks`.
   - **Complexity Tracking**: empty (no violations).
   - **Open Questions**: none (Q1–Q5 all resolved; constitution v2.0.0).

## Outcome

- ✅ Impact: Complete implementation plan for `001-book-foundation`. All unknowns resolved; constitution v2.0.0 respected; spec, research, data-model, contracts, and quickstart all live under the feature dir. Ready for `/sp.tasks`.
- 🧪 Tests: smoke-only for Phase A — no test framework added. Per R-008.
- 📁 Files: 5 generated artifacts (`plan.md`, `research.md`, `data-model.md`, `contracts/content-schema.md`, `quickstart.md`) + this PHR.
- 🔁 Next prompts:
  1. `/sp.tasks` — break the 5 implementation phases into dependency-ordered, testable tasks.
  2. Once tasks exist, `/sp.implement` (or work the tasks manually).
  3. End-to-end verification: run `npm install && npm start` in `edu-site/`; click through US-1 (read a chapter); confirm `<ChapterState />` badge renders.
- 🧠 Reflection: The plan is intentionally Phase-A-tight: 5 phases, no test framework, no backend wiring. The Constitution Check explicitly notes that Principle II (Pluggable Provider Abstraction) is N/A — Phase A has no LLM, no DB, no SDKs to gate. The data-model.md's state machine encodes the co-authoring workflow (Constitution v2.0.0 Principle III) into the file format itself: every chapter carries its `chapter_state` frontmatter key, and the badge component reads it. This makes the workflow enforceable at build time (R-006 frontmatter validator) and visible to readers (R-005 badge).

## Evaluation notes (flywheel)

- Failure modes observed: none. The setup-plan script worked; the update-agent-context script produced one WARNING ("No language information found in plan") — cosmetic; the update still completed.
- Graders run and results (PASS/FAIL): Constitution Check: all applicable principles PASS; Principle II N/A (correctly scoped).
- Prompt variant (if applicable): n/a — empty `$ARGUMENTS`.
- Next experiment (smallest change to try): `/sp.tasks` should produce a `tasks.md` organized by user story. Tasks should be small, file-path-precise, and parallelizable where independent (e.g., the CI workflow and the ChapterState component can land in any order; the build script depends on both).
