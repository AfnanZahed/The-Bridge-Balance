---
id: 0001
title: Ratify Initial Constitution v1.0.0
stage: constitution
date: 2026-08-17
surface: agent
model: MiniMax-M3
feature: none
branch: 001-spec-driven-engineering
user: Dell
command: /sp.constitution
labels: [constitution, principles, free-tier, llm, spec-driven, governance]
links:
  spec: null
  ticket: null
  adr: history/adr/0001-free-tier-llm-choice.md
  pr: null
files:
  - .specify/memory/constitution.md
  - history/prompts/constitution/0001-ratify-initial-constitution-v1.general.prompt.md
tests: []
---

## Prompt

/sp.constitution (invoked by user after project bootstrap; empty $ARGUMENTS, so all values derived from existing repo context — README, stack.md, ADR-0001, prior conversation).

## Response snapshot

Loaded `.specify/memory/constitution.md` (template with `[PRINCIPLE_1_NAME]` … `[PRINCIPLE_6_NAME]` placeholders) and the dependent templates (`.specify/templates/plan-template.md`, `spec-template.md`, `tasks-template.md`, plus `sp.phr.md`). Cross-referenced the project's actual constraints from the prior bootstrap conversation and ADR-0001:

- Free-tier is a hard rule (per user: "Make sure EACH AND EVERYTHING is literally free, at least for a specific limit or time").
- OpenAI must be gated behind a pluggable LLM abstraction (per ADR-0001).
- Textbook is the second medium after video lectures (per user: "I have to deliver 1st lectures to my audience… text based lecture as the second medium").
- Spec-Driven workflow with PHRs + ADRs is already mandated by CLAUDE.md.
- "Smallest viable change" and "do not invent APIs" are explicit project policies in CLAUDE.md.
- 100% free curriculum is the brand promise from the platform spec.

Drafted six project-specific principles:

1. **Free-Tier by Default** — every component on free tier until usage justifies paying.
2. **Pluggable Provider Abstraction (no vendor lock-in)** — embodies ADR-0001.
3. **Lecture-First, Text-Second Delivery** — video first, MDX second; orphan chapters are explicitly marked.
4. **Spec-Driven Development (NON-NEGOTIABLE)** — spec → plan → tasks → implement, with PHRs and ADRs.
5. **Smallest Viable Change** — smallest viable diff; clarify before implementing.
6. **Free, Open Curriculum** — 100% free content; only the catalog is paid.

Added three sections beyond the principles:

- **Stack Constraints** — anchors to `stack.md`; codifies the do-not-add list and phase discipline.
- **Operational Standards** — config via Pydantic, no hardcoded values, structured logging, named errors, `/health` vs `/health/ready`.
- **Security & Privacy** — no secrets in repo, no PII in logs, auth boundary at better-auth, edge validation, dependency supply-chain.

Governance section rewritten: semantic versioning rules, amendment procedure, compliance review, runtime guidance pointers.

Sync Impact Report prepended as HTML comment at the top of the file. Templates (`plan-template.md`, `spec-template.md`, `tasks-template.md`, `phr-template.prompt.md`) verified — no mandatory updates required; their existing "Constitution Check" gates align with Principle IV.

Version: **1.0.0** (initial ratified constitution, MAJOR bump from template). Ratified and last amended: **2026-08-17**.

## Outcome

- ✅ Impact: `.specify/memory/constitution.md` is no longer a template; it is the project's governing document. Six project-specific principles + three operational sections + governance are in place. Every PR must now self-check against these principles.
- 🧪 Tests: none — this is a documentation change. The principles' enforceability comes from PR review.
- 📁 Files: `.specify/memory/constitution.md` (updated); `history/prompts/constitution/0001-ratify-initial-constitution-v1.general.prompt.md` (this PHR).
- 🔁 Next prompts:
  1. `/sp.specify "book-foundation"` — first feature spec, derived from the constitution.
  2. `/sp.plan` — design the book-foundation architecture (Docusaurus build + deploy).
  3. `/sp.tasks` — break book-foundation into testable units.
  4. (Outside the slash-command flow) user delivers first Stage 1 lecture transcript → paste into `edu-site/docs/stage-01-spec-aware-vibe-engineering/01-foundations.md`.
- 🧠 Reflection: The template's six generic principles (Library-First, CLI Interface, Test-First, Integration Testing, Observability/Versioning/Simplicity) didn't fit the project shape (it's a web app, not a library; no CLI surface). The right move was to replace them with project-specific principles rather than retrofit. The Sync Impact Report makes the replacements explicit, so future constitution reviewers can see what changed and why.

## Evaluation notes (flywheel)

- Failure modes observed: none. The constitution template is generic on purpose; filling it with project-specific content is what `/sp.constitution` is designed for.
- Graders run and results (PASS/FAIL): not applicable for a docs change.
- Prompt variant (if applicable): n/a — empty `$ARGUMENTS`, values derived from repo context.
- Next experiment (smallest change to try): the next session should run `/sp.specify "book-foundation"` and see how the Constitution Check section in `spec-template.md` interacts with the new principles. If it asks for "evidence of free-tier compliance," that's Principle I doing its job.
