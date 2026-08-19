---
id: 0026
title: Refresh book-foundation spec with latest changes
stage: spec
date: 2026-08-17
surface: agent
model: claude-opus-4-7
feature: 001-book-foundation
branch: 001-book-foundation
user: Dell
command: /sp.specify
labels: [spec, refresh, introduction, dataviz, icons, biome, sidebar]
links:
  spec: specs/001-book-foundation/spec.md
  ticket: null
  adr: history/adr/0001-free-tier-llm-choice.md
  pr: null
files:
  - specs/001-book-foundation/spec.md (rewritten — US1 Introduction, US3 DataViz, US4 icon taxonomy, FR-001…FR-012, SC-001…SC-006)
  - specs/001-book-foundation/checklists/requirements.md (refreshed — all pass)
tests:
  - spec quality checklist — all 20 items pass (x)
  - (verification of the site the spec describes) — see PHR-0024/0025: frontmatter ✓ tsc ✓ docusaurus build ✓
---

## Prompt

> /sp.specify update with the latest changes

## Response snapshot

- Determined "update with the latest changes" targets the existing feature's spec on `001-book-foundation` (already checked out, no new branch warranted).
- Read the pre-refresh spec (5 US / FR-001…FR-014 / SC-001…SC-007), the spec-checklist, and the live content inventory (`find edu-site/docs`) plus `sidebars.ts` to ground the refresh in what actually shipped.
- Rewrote `spec.md` into the refreshed spec:
  - US1 = Story-driven Introduction (`/introduction`, sourced from official foundation documents)
  - US2 = Chapter state badge pipeline (`placeholder` → `text-ready` → `video-published`)
  - US3 = Interactive Curriculum dashboard (BarChart / Donut / KPIGrid, 15 chapters, 4 stages, 2 certs, ~48h, $0)
  - US4 = Multi-library semantic icon taxonomy (Phosphor / Lucide / Tabler)
  - US5 = Quality gate CD (Biome lint, frontmatter validation, tsc, build, Vercel atomic)
  - Rebalanced FR set (FR-001…FR-012) and SC set (SC-001…SC-006, now pegging performance/a11y at measurable thresholds)
  - Edge cases extended: placeholder/text-ready/video-published, tabler brand-icon fallback, reduced-motion, JS-off
  - Out of Scope reaffirmed (RAG / auth / payments / translation / analytics)
- Refreshed `checklists/requirements.md` against Constitution v2.0.0 — all six principles PASS; no [NEEDS CLARIFICATION] markers remain; spec-quality gate all [x].

## Outcome

- ✅ Impact: Spec now records what the branch <em>actually</em> ships (story intro → 3D hero → dashboard → icon system → quality gates), not the earlier minimal Docusaurus scaffold. Planning and tasks can re-derive from ground truth.
- 🧪 Tests: Spec quality checklist ✓ (20/20); no build changes made (verification carried by PHR-0024/0025 which ran `check-frontmatter.mjs`, `tsc --noEmit`, `docusaurus build` — all green).
- 📁 Files: `specs/001-book-foundation/spec.md`, `specs/001-book-foundation/checklists/requirements.md`.
- 🔁 Next prompts: refresh `plan.md` + `tasks.md` to match the refreshed spec (`.specify/scripts/powershell/setup-plan.ps1` + `/sp.plan`), then optionally run `/sp.tasks`.
- 🧠 Reflection: The spec was previously written for the *first-deployable-slice* framing; this refresh pulls the shipped work (introduction chapter, DataViz, icon system, ScrollFX, Biome) into the authoritative record so future planning targets what exists, not what was envisioned.

## Evaluation notes (flywheel)

- Failure modes observed: Initial `check-frontmatter.mjs` run in PHR-0024 failed once on missing `chapter_state` — fixed. No failure modes observed in this refresh.
- Graders run and results (PASS/FAIL): spec-quality checklist PASS (all [x])
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): Re-run `/sp.plan` against the refreshed spec to regenerate plan.md/tasks.md so the "update with the latest changes" intention is fully propagated.