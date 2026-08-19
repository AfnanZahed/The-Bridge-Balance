---
id: 0005
title: Analyze Apple-design artifacts for consistency
stage: misc
date: 2026-08-17
surface: agent
model: claude-opus-4-7
feature: 002-apple-design
branch: 002-apple-design
user: Dell
command: /sp.analyze
labels: [analyze, consistency, coverage, constitution, apple-design, read-only]
links:
  spec: specs/002-apple-design/spec.md
  ticket: null
  adr: history/adr/0001-free-tier-llm-choice.md (cross-ref)
  pr: null
files:
  - (read-only analysis; no feature files modified)
  - history/prompts/002-apple-design/0005-analyze-apple-design-consistency.misc.prompt.md (created)
tests:
  - coverage map — 20/21 requirements mapped to tasks (95.2%)
  - constitution alignment — 1 CRITICAL (stale bridge-cyan accent parenthetical in Principle VII embodiment)
---

## Prompt

> /sp.analyze

## Response snapshot

- Ran `.specify/scripts/powershell/check-prerequisites.ps1 -Json -RequireTasks -IncludeTasks` (full path; initial relative invocation failed with CommandNotFoundException, fixed with `&` call operator + absolute path). Confirmed FEATURE_DIR `specs/002-apple-design` and AVAILABLE_DOCS now include `tasks.md`.
- Loaded Constitution v2.1.0 (7 principles) + all feature artifacts (spec, plan, tasks, research, data-model, contracts) and built a requirements inventory (14 FR + 7 SC), user-story inventory (US1–US4), task-coverage mapping, and constitution rule set.
- Ran 6 detection passes — duplication, ambiguity, underspecification, constitution alignment, coverage gaps, inconsistency — producing 7 findings (1 CRITICAL, 2 HIGH, 2 MEDIUM, 2 LOW).
- **C-1 (CRITICAL):** Constitution Principle VII embodiment still names "bridge-cyan --tbb-accent" while spec FR-002 / research R-002 ratify Apple-system blue; constitution snapshot text is stale → needs a PATCH governance amendment (v2.1.1) so compliance-review item (e) can't cite it.
- **H-1 (MEDIUM):** SC-005 ("90% reviewers identify purpose in 30s") has no implementing/measurement task → coverage 95.2%.
- **H-2 (HIGH):** T047 invites docs content edits while FR-012 freezes content contracts → reword to read-only verification.
- **M-1:** no grep task for legacy saturated stage hexes.
- **M-2:** T017 references unnamed Docusaurus theme surfaces.
- **L-1:** T033 doesn't explicitly preserve ReadingProgress.
- Output: full analysis report with finding table, coverage summary, constitution alignment issues, unmapped-tasks (none), metrics (21 requirements / 48 tasks / 95.2% coverage / 1 critical).

## Outcome

- ✅ Artifact-readiness: spec+plan+tasks internally consistent; 20/21 requirements covered; no unmapped tasks.
- 🧪 Gates: baseline build capture task in place; FR-014 fidelity review (T044) and constt gates preserved.
- 📁 Files touched: none (read-only by design); PHR written to 002-apple-design route.
- 🔁 Next prompts (owner decides): `<C-1>` Run `/sp.constitution` (PATCH v2.1.1) to replace bridge-cyan parenthetical with Apple-blue; optionally hand-edit `tasks.md` (H-1 SC-005 task, H-2 T047 reword); then `/sp.implement`.

## Evaluation notes (flywheel)

- Failure modes observed: relative `.specify/...` script path failed under PowerShell (resolved with `& "...\check-prerequisites.ps1"`); content already in context from prior turns — no re-read needed.
- Graders run and results: coverage grader 95.2% PASS (threshold ≥90%); constitution-alignment grader 1 CRITICAL flagged as require-amendment-not-dilution.
- Next experiment: after constitution PATCH, re-run `/sp.analyze` to confirm C-1 clears in one iteration.