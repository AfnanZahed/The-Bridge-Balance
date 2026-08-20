---
id: 0003
title: Tasks for nine differentiated intros
stage: tasks
date: 2026-08-20
surface: agent
model: opus
feature: 009-differentiated-intros
branch: 009-differentiated-intros
user: Dell
command: /sp.tasks
labels: [tasks, intro, editorial, comparison-matrix, reader-controls]
links:
  spec: specs/009-differentiated-intros/spec.md
  plan: specs/009-differentiated-intros/plan.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/009-differentiated-intros/tasks.md

tests:
  - Task format validation — PASS (all 35 tasks follow checkbox + ID + [P]/[Story] + path format)
  - User story coverage — PASS (US1 P1, US2 P1, US3 P2, US4 P2 all mapped to phases)
  - Independence check — US1 and US3 inspection can run in parallel after Foundational
---

## Prompt

/sp.tasks

(no additional user input beyond the slash command)

## Response snapshot

**Setup**: ran `check-prerequisites.ps1 -Json`, parsed `FEATURE_DIR=specs/009-differentiated-intros` and `AVAILABLE_DOCS=[research.md, data-model.md, contracts/, quickstart.md]`. Loaded spec.md (4 user stories: US1 P1 mental model, US2 P1 real-world application, US3 P2 navigation, US4 P2 thesis coherence), plan.md (Docusaurus web project, content-only change), and tasks-template.md.

**Task layout** (35 tasks, no automated tests because spec doesn't request them):

- **Phase 1: Setup (T001–T002)** — comparison matrix skeleton + lens registry. Both parallelizable.
- **Phase 2: Foundational (T003–T012)** — author all nine Reading Contracts in parallel (T003–T011), then T012 verifies lens uniqueness. Blocks all user stories.
- **Phase 3: User Story 1 (T013–T022)** — rewrite the nine `<Version>` blocks in `edu-site/docs/intro.md` in parallel (T013–T021); T022 refreshes the Shared sources block.
- **Phase 4: User Story 2 (T023–T025)** — audit scenario + decision + takeaway; add explicit "What you can do next" closings; verify scenario attribution.
- **Phase 5: User Story 3 (T026–T028)** — inspect `ReaderControls` option model; conditionally add a description string per cell without a new control dimension.
- **Phase 6: User Story 4 (T029–T030)** — shared-thesis compliance check; resolve gaps.
- **Phase 7: Polish (T031–T035)** — fill comparison matrix verdict column; typecheck; build; live Playwright check (if reader-control changed); implementation PHR.

**Dependencies**:
- US1 prose must finish before US2 audits it.
- US4 thesis check requires US1 versions in place.
- US3 inspection (T026) precedes conditional edit (T027).
- Polish depends on all four user stories.

**Parallel opportunities identified**:
- T001/T002 (Setup).
- T003–T011 (Foundational contracts).
- T013–T021 (nine version rewrites on distinct `<Version>` blocks).
- T023 (US2 audit) + T026 (US3 inspection) can run together (different files).

**MVP scope**: US1 + US2 (Phases 3–4) deliver differentiated mental models with real-world scenarios and takeaways — already demonstrates the core user value.

## Outcome

- ✅ Impact: tasks.md gives an authoring team a deterministic path from contract-first design to verified publication with a comparison-matrix gate.
- 🧪 Tests: typecheck/build/Playwright pending /sp.implement; editorial matrix verdict gates publication.
- 📁 Files: `specs/009-differentiated-intros/tasks.md`.
- 🔁 Next prompts: `/sp.implement` to execute T001–T035, or `/sp.analyze` to confirm cross-artifact consistency.
- 🧠 Reflection: editorial features benefit from treating the matrix as a real artifact (not a checklist). Splitting "audit" (T023) from "fix" (T024) and "verify" (T025) gives clear reviewers and lets US1 finish before US2 closes the loop.
