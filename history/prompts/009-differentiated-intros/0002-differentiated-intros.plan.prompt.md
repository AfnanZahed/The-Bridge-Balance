---
id: 0002
title: Plan nine differentiated intros
stage: plan
date: 2026-08-20
surface: agent
model: opus
feature: 009-differentiated-intros
branch: 009-differentiated-intros
user: Dell
command: /sp.plan
labels: [plan, intro, editorial, reading-contracts, constitution-check]
links:
  spec: specs/009-differentiated-intros/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/009-differentiated-intros/plan.md
  - specs/009-differentiated-intros/research.md
  - specs/009-differentiated-intros/data-model.md
  - specs/009-differentiated-intros/quickstart.md
  - specs/009-differentiated-intros/contracts/reading-contracts.md
  - CLAUDE.md

tests:
  - Constitution Check (all seven principles) — PASS (I free-tier, IV SDD, V smallest viable change, VI free curriculum, VII Apple-Design all PASS; II N/A; III unaffected)
  - Typecheck, build, Playwright live checks — pending /sp.implement
  - Editorial matrix review — pending authoring
---

## Prompt

/sp.plan

(no additional user input beyond the slash command)

## Response snapshot

**Setup**: ran `setup-plan.ps1 -Json`, parsed `FEATURE_SPEC=specs/009-differentiated-intros/spec.md`, `IMPL_PLAN=specs/009-differentiated-intros/plan.md`, branch `009-differentiated-intros`.

**Constitution Check (pre-research)**: I free-tier (PASS — content-only), II pluggable providers (N/A — no provider change), III co-authored text (PASS — prose remains the primary authored artifact), IV SDD (PASS — plan derived from spec, PHRs in place), V smallest viable change (PASS — only `edu-site/docs/intro.md` and an optional reader-control description field), VI free curriculum (PASS — no paywall), VII Apple-Design (PASS — no new visual chrome).

**Phase 0 — Research** ([research.md](research.md)):
- R-001: define a reading contract (audience, lens, scenario, decision value, takeaway) before prose.
- R-002: preserve the 3 × 3 matrix; assign one lens per cell (C1 safety rule → C9 scalable ownership architecture).
- R-003: comparison matrix as the rejection gate; require lens/scenario/structure/takeaway columns.
- R-004: scope is editorial; minimal description field is the only allowed code change.
- All unknowns resolved. No NEEDS CLARIFICATION remains.

**Phase 1 — Design**:
- Data model ([data-model.md](data-model.md)): Reading Contract, Intro Version, Shared Thesis, Comparison Matrix, editorial state transitions.
- Contracts ([contracts/reading-contracts.md](contracts/reading-contracts.md)): Reading Contract Schema, Lens Assignment Table (C1–C9), Editorial Matrix schema, Reader-Control Positioning, Shared Thesis Compliance.
- Quickstart ([quickstart.md](quickstart.md)): author contract → author version → review matrix → optional reader-control description → verify → accept.
- Agent context: ran `update-agent-context.ps1 -AgentType claude`; CLAUDE.md updated; no new language/framework/database (all N/A for an editorial change).

**Plan.md**: written with Technical Context, Constitution Check, Phase 0 + Phase 1, Complexity Tracking empty (no violations), follow-ups + risks (editorial review cannot be automated; copy length must stay restrained; source list remains canonical).

## Outcome

- ✅ Impact: plan turns the spec's reading-contract idea into a concrete authoring and review process (contract → version → matrix → accept) with explicit gates and a minimal code surface.
- 🧪 Tests: typecheck and build pending /sp.implement; editorial matrix review pending authoring.
- 📁 Files: `specs/009-differentiated-intros/{plan.md, research.md, data-model.md, quickstart.md, contracts/reading-contracts.md}`, plus CLAUDE.md via agent-context script.
- 🔁 Next prompts: `/sp.tasks` to enumerate the authoring steps; `/sp.implement` to rewrite the nine `<Version>` blocks and (if needed) the reader-control description field.
- 🧠 Reflection: editorial differentiability is enforceable through the matrix, but the verdict still depends on human judgement. The plan keeps the smallest viable change by reusing the existing reader-control framework and limiting code edits to an optional description string.
