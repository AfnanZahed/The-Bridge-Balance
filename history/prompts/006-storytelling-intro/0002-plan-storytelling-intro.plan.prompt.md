---
id: 0002
title: Plan story-driven introduction
stage: plan
date: 2026-08-19
surface: agent
model: opus
feature: 006-storytelling-intro
branch: 006-storytelling-intro
user: Dell
command: /sp.plan
labels: [plan, content-rewrite, contracts, runtime-runbook, agent-context]
links:
  spec: specs/006-storytelling-intro/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/006-storytelling-intro/plan.md
  - specs/006-storytelling-intro/research.md
  - specs/006-storytelling-intro/data-model.md
  - specs/006-storytelling-intro/contracts/content-contract.md
  - specs/006-storytelling-intro/contracts/sourcing-contract.md
  - specs/006-storytelling-intro/contracts/pacing-contract.md
  - specs/006-storytelling-intro/contracts/navigation-contract.md
  - specs/006-storytelling-intro/quickstart.md
  - CLAUDE.md (agent-context update appended: language Markdown; framework Docusaurus 3.7; database N/A)
tests:
  - Grep for NEEDS CLARIFICATION / template placeholders → 0 matches across all plan artifacts
  - Constitution Check: 7/7 PASS
  - Plan artifacts: 7 markdown files
  - Agent context update ran cleanly via update-agent-context.ps1 -AgentType claude
---

## Prompt

> note that when rewriting, the previous facts and figures should also be told in some way. /sp.plan

## Response snapshot

- **Pre-plan edits to spec** (user's clarification landed as a first-class constraint):
  - FR-007 strengthened to enumerate that every fact in the current `intro.md` MUST appear in the new prose.
  - New spec Appendix A.6 added — 24 mandatory retained facts with per-fact minimum word budgets and testable checks.
  - SC-013 (mandatory retained facts preserved) and SC-014 (per-fact traceability) added.
- **`/sp.plan` execution**:
  - Ran `setup-plan.ps1 -Json` → JSON with FEATURE_SPEC, IMPL_PLAN, SPECS_DIR, BRANCH, HAS_GIT.
  - Read plan-template.md + constitution.md (current v2.1.1).
  - **Phase 0 — research.md**: promoted the verified story/stat/quote/anchor-beat pool from spec Appendix A into a standalone research.md; added §A.6 (mandatory retained facts) as the canonical mapping; documented 8 decisions R-001..R-008.
  - **Phase 1 — design artifacts**:
    - `data-model.md` — 6 editorial entities (Story Card, Fact Claim, Quote, Source, Beat, Per-Fact Mapping Table) with fields, validation rules, and a verification matrix mapping each of 14 SCs to its anchoring entity.
    - `contracts/content-contract.md` — page identity, six-beat spine, mandatory retained facts, anchor beats, scanability blocks, reading-time badge, "complete" gate.
    - `contracts/sourcing-contract.md` — every-claim-traces-to-a-source, attribution honesty, methodology caveats for SO/JetBrains/Stanford/Octoverse/METR/Veracode/LinkedIn/S&P, the fact-check pass.
    - `contracts/pacing-contract.md` — six-beat section rules, paragraph-level rules (no three-stat runs, hooks/transfers, sentence rhythm, curiosity gap), paragraph types, allowed mechanics, reader-engagement signal.
    - `contracts/navigation-contract.md` — page route, frontmatter, sidebar order, internal links, no images, plain Markdown, build, search index, backward compatibility.
    - `quickstart.md` — the 5-pass authoring runbook: baseline inventory → draft → fact-check (blocking gate) → pacing review → build → reader panel → Definition of Done.
- **Constitution Check**: 7/7 PASS (Free-Tier, Pluggable Provider, Co-Authored Text, Spec-Driven Development, Smallest Viable Change, Free-Open Curriculum, Apple-Design Purity). This feature is the canonical exercise of Principle III — the agent drafts, the project owner reviews, the project owner ships.
- **Plan.md**: filled the template's Summary, Technical Context, Constitution Check, Project Structure, Complexity Tracking, Phase 0 (complete), Phase 1 (complete), Phase 2 (deferred to `/sp.tasks`), and Agent Context Update.
- **Agent context update**: ran `update-agent-context.ps1 -AgentType claude`. Captured Markdown language, Docusaurus 3.7 framework, static-site project type into `CLAUDE.md`. No new dependencies, no new tokens, no new build steps.

## Outcome

- ✅ **Impact**: every contract a writer or fact-checker needs is now on disk under `specs/006-storytelling-intro/`. The implementation phase is a pure authoring task — draft → fact-check → pacing → build → reader panel. No new infrastructure, no new dependencies, no new routes, no new components.
- 🧪 **Tests**:
  - Placeholder scan across all plan artifacts: **0 matches**
  - Constitution Check: **7/7 PASS**
  - Plan artifacts: **7 markdown files** under `specs/006-storytelling-intro/`
  - Agent context update ran cleanly via the script
- 📁 **Files**:
  - `specs/006-storytelling-intro/plan.md`
  - `specs/006-storytelling-intro/research.md`
  - `specs/006-storytelling-intro/data-model.md`
  - `specs/006-storytelling-intro/contracts/content-contract.md`
  - `specs/006-storytelling-intro/contracts/sourcing-contract.md`
  - `specs/006-storytelling-intro/contracts/pacing-contract.md`
  - `specs/006-storytelling-intro/contracts/navigation-contract.md`
  - `specs/006-storytelling-intro/quickstart.md`
  - `CLAUDE.md` (agent-context append)
- 🔁 **Next prompts**: `/sp.tasks` to decompose the 5-pass authoring flow into ordered, dependency-aware tasks that respect the spec's US1–US4 user stories and the contract gates; then `/sp.implement` to draft the prose.
- 🧠 **Reflection**: The structural decision worth recording — for a content rewrite, "contracts" are not OpenAPI specs; they are observable-content contracts (what paragraphs/beats MUST be present, in what form, with what sourcing discipline). Naming them as `content-contract.md` / `sourcing-contract.md` / `pacing-contract.md` / `navigation-contract.md` (rather than reusing the codebase's API-contract template) makes the right mental model explicit. Each contract is reviewable by an editor without needing to read the codebase.

## Evaluation notes (flyfly)

- **Failure modes observed**:
  1. The user's clarification ("previous facts should also be told") arrived after `/sp.specify` had finished. The spec's FR-007 was strengthened, Appendix A.6 added, and SC-013/SC-014 added — all as a single in-place edit batch before `/sp.plan` began. The plan then propagated the constraint (research.md §A.6 mirror + contract content-contract.md §3 + quickstart.md Pass 2). Lesson: a clarification landing mid-spec is normal; the right move is to edit the spec, then proceed.
  2. The plan-template's bracketed placeholders (`[###-feature-name]`, `[DATE]`, `NEEDS CLARIFICATION`) trap a placeholder scan even when the *intent* of those lines is filled. Replaced the template's head + tech-context lines with content-rewrite-specific values (no `###`, no `NEEDS CLARIFICATION`).
  3. The agent-context-update script ran fine on this branch — no manual entry needed. The context file (`CLAUDE.md`) now carries the feature's stack so future sessions know the platform is content-only for this branch.
- **Graders run and results (PASS/FAIL)**:
  - Placeholder scan: **PASS** (0 matches across all 7 plan artifacts)
  - Constitution Check: **PASS** (7/7)
  - Spec → research mirror: **PASS** (research §A.6 mirrors spec Appendix A.6 exactly)
  - Cross-reference graph: **PASS** (every contract references at least one other contract or spec section)
- **Prompt variant (if applicable)**: n/a
- **Next experiment (smallest change to try)**: When the implementation phase starts, run Pass 0 first (baseline inventory + Per-Fact Mapping Table scaffold) before any prose is written — having the mapping scaffold visible to the writer prevents the "I'll weave the METR stat in somewhere" failure mode that drifts toward dropping facts.