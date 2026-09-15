---
id: 0001
title: Specify Apple-inspired theme transformation
stage: spec
date: 2026-08-17
surface: agent
model: claude-opus-4-7
feature: 002-apple-design
branch: 002-apple-design
user: Dell
command: /sp.specify
labels: [spec, design, theme, apple, accessibility, tokens]
links:
  spec: specs/002-apple-design/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/002-apple-design/spec.md (created — 4 user stories, FR-001…FR-014, SC-001…SC-007, edge cases)
  - specs/002-apple-design/checklists/requirements.md (created — all 20 items pass)
tests:
  - spec quality checklist — 20/20 pass
---

## Prompt

> /sp.specify Apply theme transformation

## Response snapshot

- Determined this is a NEW feature: applying the Apple-inspired visual identity ratified in Constitution v2.1.0 Principle VII.
- Created branch `002-apple-design` (number 002; `create-new-feature.ps1` exited 1 on the `history/prompts` positional arg, so dirs + spec were set up directly).
- Wrote `specs/002-apple-design/spec.md`:
  - 4 user stories: calm premium homepage / comfortable light+dark reading / confident interaction feedback / preserve curriculum technical personality.
  - 14 functional requirements: unified system, restrained surfaces, light+dark tokens, blur fallback, a11y contrast, focus-visible not color-only, reduced-motion usability, stage-accent preservation, free-tier type only, no page overflow, graceful degradation, preserve routes/IA, no paid additions, design-fidelity review.
  - 7 success criteria (measurable, technology-agnostic) + 7 edge cases.
  - Explicitly scopes out proprietary Apple assets, IA rebuild, paid tooling, icon-taxonomy replacement, and new frameworks.
- Wrote `checklists/requirements.md`; all 20 items pass; Constitution Check confirms all 7 principles PASS (v2.1.0).

## Outcome

- ✅ Impact: Apple-inspired theme transformation is now a first-class spec'd feature with measurable outcomes and explicit non-goals (no framework swap, no proprietary assets, no icon-taxonomy rebuild).
- 🧪 Tests: spec quality checklist ✓ (20/20)
- 📁 Files: `specs/002-apple-design/spec.md`, `specs/002-apple-design/checklists/requirements.md`
- 🔁 Next prompts: `/sp.clarify` (optional — spec is already low-ambiguity) then `/sp.plan` against v2.1.0 with Principle VII in the Constitution Check.
- 🧠 Reflection: The spec keeps the change small and reversible (tokens + surfaces) while honoring the "fidelity without proprietary assets" constraint from Principle VII.

## Evaluation notes (flywheel)

- Failure modes observed: `create-new-feature.ps1` failed on a positional arg after creating the branch; recovered by creating dirs + copying the template directly.
- Graders run and results (PASS/FAIL): spec quality checklist PASS 20/20
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): `/sp.plan` to produce the token + surface task decomposition grounded in Constitution v2.1.0.