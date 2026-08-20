---
id: 0002
title: Plan hardening and ship pass
stage: plan
date: 2026-08-20
surface: agent
model: opus
feature: 010-continue-intro-work
branch: 010-continue-intro-work
user: Dell
command: /sp.plan
labels: [plan, continue, harden, ship, audit, live-check, publication]
links:
  spec: specs/010-continue-intro-work/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/010-continue-intro-work/plan.md
  - specs/010-continue-intro-work/research.md
  - specs/010-continue-intro-work/data-model.md
  - specs/010-continue-intro-work/quickstart.md
  - specs/010-continue-intro-work/contracts/publication-readiness.md
  - CLAUDE.md

tests:
  - Constitution Check (all seven principles) — PASS (I free-tier, IV SDD, V smallest viable change, VI free curriculum, VII Apple-Design all PASS; II N/A; III N/A)
  - Phase 0 research — 4 decisions; no NEEDS CLARIFICATION
  - Phase 1 design — Audit Log, Live Check Result, Final PHR, Publication State modeled
---

## Prompt

/sp.plan

(no additional user input beyond the slash command)

## Response snapshot

**Setup**: ran `setup-plan.ps1 -Json`, parsed `FEATURE_SPEC=specs/010-continue-intro-work/spec.md`, `IMPL_PLAN=specs/010-continue-intro-work/plan.md`, branch `010-continue-intro-work`.

**Constitution Check (pre-research)**: I free-tier (PASS — verification uses shell, FS, and existing Playwright MCP), II pluggable providers (N/A), III co-authored text (N/A — verification pass), IV SDD (PASS — plan derived from spec, PHRs in place), V smallest viable change (PASS — no code changes, branch cleanliness enforced), VI free curriculum (PASS), VII Apple-Design (PASS — no new chrome).

**Phase 0 — Research** ([research.md](research.md)):
- R-001: reviewer-blind audit + pairwise duplicate check satisfies SC-001 (FR-001/002).
- R-002: Playwright preferred; static DOM inspection of `edu-site/build/` is the mandatory fallback (FR-003/004).
- R-003: typecheck + build + `git diff main --stat` mapping = deterministic PR-readiness signal (FR-005/007, SC-005).
- R-004: routing check is FS-based on `edu-site/build/<route>/index.html`; missing destinations get a documented fallback (FR-008, SC-006).

**Phase 1 — Design**:
- Data model ([data-model.md](data-model.md)): Audit Log, Live Check Result, Final PHR, Publication State machine.
- Contracts ([contracts/publication-readiness.md](contracts/publication-readiness.md)): Audit Log schema, Live Check Result schema, Routing Resolution schema, Final PHR schema, Branch Cleanliness rule.
- Quickstart ([quickstart.md](quickstart.md)): audit → live check → build → routing → diff → PHR → acceptance gate.
- Agent context: ran `update-agent-context.ps1 -AgentType claude`; CLAUDE.md updated; no new language/framework/database.

**Plan.md**: written with Technical Context, Constitution Check, Phase 0 + 1, Complexity Tracking empty (no violations), follow-ups + risks.

## Outcome

- ✅ Impact: plan turns the user's "continue" into a verification-first publication pass with explicit contracts for the audit log, live check, routing, and final PHR.
- 🧪 Tests: typecheck/build/routing/diff pending /sp.implement.
- 📁 Files: `specs/010-continue-intro-work/{plan.md, research.md, data-model.md, quickstart.md, contracts/publication-readiness.md}`, plus CLAUDE.md via agent-context script.
- 🔁 Next prompts: `/sp.tasks` to enumerate the verification steps; `/sp.implement` to run them.
- 🧠 Reflection: the simplest implementation pass is the one that produces no code changes — verification-only when the implementation is already correct.
