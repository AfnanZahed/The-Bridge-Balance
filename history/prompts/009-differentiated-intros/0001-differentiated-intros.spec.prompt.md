---
id: 0001
title: Nine differentiated intro reading paths
stage: spec
date: 2026-08-20
surface: agent
model: opus
feature: 009-differentiated-intros
branch: 009-differentiated-intros
user: Dell
command: /sp.specify
labels: [spec, intro, editorial, differentiation, reader-controls]
links:
  spec: specs/009-differentiated-intros/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/009-differentiated-intros/spec.md
  - specs/009-differentiated-intros/checklists/requirements.md

tests:
  - Quality checklist review — PASS (all 30 items pass on initial review)
  - [NEEDS CLARIFICATION] markers — 0 (defaults documented in Assumptions)
  - Acceptance scenarios mapped to FRs — PASS (FR-001 through FR-015)
---

## Prompt

There is no as much difference in the 9 versions of intro as much it should be, plan a proper difference in a way each one must give it's unique real world value and understanding to the viewer

## Response snapshot

**Diagnosis**: The existing `edu-site/docs/intro.md` (already in place from 006-storytelling-intro) carries nine `<Version>` blocks organized as 3 difficulties (beginner/intermediate/advanced) × 3 lengths (summary/balanced/detailed). On inspection, the differences are largely verbal: every version tells the same surrender-pole-vs-resistance-pole story, cites the same incidents, and reaches the same "specification-driven engineering" conclusion. Length labels and difficulty vocabulary change, but the lens does not.

**Plan**: Make the nine combinations deliver nine **distinct reading contracts**, each defined by a unique audience, mental model, real-world scenario, decision value, and actionable takeaway. The nine contracts must cover these lenses exactly once (FR-003):
1. beginner/summary — *safety rule* for trusting AI-generated change
2. beginner/balanced — *everyday analogy* between assistant and accountable engineer
3. beginner/detailed — *boundary checklist* before letting an agent change a project
4. intermediate/summary — *decision framework* across the two failure poles
5. intermediate/balanced — *responsibility map* across specify/design/implement/verify
6. intermediate/detailed — *experiment-to-system transition* awareness
7. advanced/summary — *strategic scarcity of intent and verification*
8. advanced/balanced — *governance and trust-boundary analysis*
9. advanced/detailed — *scalable human-ownership architecture* for retrieval, tools, multi-agent

**Spec outcome**: 4 user stories (US1 unique-mental-model, US2 real-world application, US3 navigation without confusion, US4 coherent curriculum thesis), 15 functional requirements, 5 edge cases, 4 key entities, and 7 measurable success criteria including SC-002 (≥90% blind-match lens from opening alone) and SC-005 (no duplicate verdict on lens/scenario/structure/takeaway across pairs).

**Quality checklist**: created at `specs/009-differentiated-intros/checklists/requirements.md` — all 30 quality items PASS on initial review; no [NEEDS CLARIFICATION] markers required; no implementation details leaked (Docusaurus-specifics stay out of the spec).

## Outcome

- ✅ Impact: spec turns an editorial differentiation problem into a set of explicit reading contracts, success criteria, and rejection rules so subsequent authoring cannot regress to paraphrased duplicates.
- 🧪 Tests: editorial comparison matrix (FR-012, FR-013, SC-005) gates publication.
- 📁 Files: `specs/009-differentiated-intros/spec.md`, `specs/009-differentiated-intros/checklists/requirements.md`.
- 🔁 Next prompts: `/sp.plan` to design the editorial comparison matrix and reader-control labels that expose each version's lens and practical value before selection.
- 🧠 Reflection: the surface label (beginner/intermediate/advanced × summary/balanced/detailed) was being mistaken for differentiation. Real differentiation lives in the lens, scenario, and takeaway; the spec now makes that explicit.
