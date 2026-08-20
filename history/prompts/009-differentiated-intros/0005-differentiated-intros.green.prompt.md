---
id: 0005
title: Implement differentiated intro paths
stage: green
date: 2026-08-20
surface: agent
model: opus
feature: 009-differentiated-intros
branch: 009-differentiated-intros
user: Dell
command: /sp.implement
labels: [implement, intro, editorial, reader-controls, matrix]
links:
  spec: specs/009-differentiated-intros/spec.md
  plan: specs/009-differentiated-intros/plan.md
  ticket: null
  adr: null
  pr: null
files:
  - edu-site/docs/intro.md
  - edu-site/src/components/ReaderControls/types.ts
  - edu-site/src/components/ReaderControls/index.tsx
  - edu-site/src/components/ReaderControls/ReaderControls.module.css
  - specs/009-differentiated-intros/comparison-matrix.md
  - specs/009-differentiated-intros/lens-registry.md
  - specs/009-differentiated-intros/tasks.md
  - history/prompts/009-differentiated-intros/0005-differentiated-intros.green.prompt.md

tests:
  - npm run typecheck — PASS
  - npx docusaurus build — PASS
  - Comparison matrix: 9/9 rows verdict unique — PASS
  - Shared thesis compliance: all 9 versions — PASS
  - Reader-control description data: 9/9 combinations registered — PASS
  - Playwright live reader-control check — PENDING (T034; requires running site)
---

## Prompt

/sp.implement

(no additional user input beyond the slash command)

## Response snapshot

Implemented the editorial rewrite and reader-control positioning for all nine intro variants.

**Content**: Rewrote `edu-site/docs/intro.md` so each `<Version>` has a unique contract:
C1 safety rule, C2 everyday analogy, C3 boundary checklist, C4 decision framework, C5 responsibility map, C6 experiment-to-system transition, C7 strategic scarcity, C8 governance/trust boundaries, C9 scalable ownership architecture. Added the public compact “Choose your path” table with card-like content in each row, per clarification Q1/Q2. Kept all scenarios within the canonical Shared sources block per Q3. Every version has a concrete scenario, decision value, and explicit “What you can do next” takeaway.

**Reader controls**: Added `CombinationDescription` and all nine descriptions to `ReaderControls/types.ts`. Updated `ReaderControls/index.tsx` to surface the effective combination's lens, real-world use, and “Choose this if” value with `aria-describedby`, live updates, and a restrained popover-style note. Added matching Apple-aligned styles in `ReaderControls.module.css` with existing blur fallback and reduced-motion behavior preserved.

**Editorial gate**: Created `comparison-matrix.md` and `lens-registry.md`; all nine matrix rows now have `unique` verdicts and scenario/decision/takeaway notes.

**Verification**: Typecheck PASS; Docusaurus production build PASS. T034 (Playwright live reader-control check) remains pending because the implementation session did not start a server; it must be run before final closure. Q5's release policy is respected: any future duplicate verdict blocks the entire intro release.

## Outcome

- ✅ Impact: Nine versions now provide nine distinct real-world mental models rather than nine paraphrases; readers can choose by lens and practical outcome.
- 🧪 Tests: typecheck/build pass; matrix and thesis checks pass; one live UI check remains.
- 📁 Files: content, reader controls, CSS, editorial artifacts, tasks, PHR.
- 🔁 Next prompts: run T034 live check, then review/commit when ready.
- 🧠 Reflection: The content matrix is the anti-regression contract; reader-control descriptions make the distinction discoverable before selection.
