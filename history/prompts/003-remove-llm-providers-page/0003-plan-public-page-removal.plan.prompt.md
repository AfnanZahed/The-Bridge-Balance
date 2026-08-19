---
id: 0003
title: Plan public page removal
stage: plan
date: 2026-08-18
surface: agent
model: MiniMax-M3
feature: 003-remove-llm-providers-page
branch: 003-remove-llm-providers-page
user: Dell
command: /sp.plan
labels: [plan, content-removal, navigation, static-build, internal-architecture]
links:
  spec: specs/003-remove-llm-providers-page/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/003-remove-llm-providers-page/plan.md
  - specs/003-remove-llm-providers-page/research.md
  - specs/003-remove-llm-providers-page/data-model.md
  - specs/003-remove-llm-providers-page/contracts/documentation-boundary.md
  - specs/003-remove-llm-providers-page/quickstart.md
  - CLAUDE.md (agent-context update script invoked; no new technology added)
tests:
  - Placeholder scan over all plan artifacts — PASS (no unresolved placeholders)
  - Prerequisite path check — PASS
---

## Prompt

> /sp.plan

## Response snapshot

- Ran `.specify/scripts/powershell/setup-plan.ps1 -Json` from the repository root.
- Confirmed branch `003-remove-llm-providers-page`, feature directory, spec, and plan paths.
- Loaded the feature spec and Constitution v2.1.1.
- Filled `plan.md` with the smallest viable approach:
  - Delete `edu-site/docs/llm-providers.md`.
  - Remove the navbar and footer `/llm-providers` entries from `edu-site/docusaurus.config.ts`.
  - Update `edu-site/api/README.md` so it no longer references the removed public page.
  - Preserve ADR-0001 and all `edu-site/api/app/llm/**` provider code.
  - Verify source absence, fresh static build, generated route absence, 404 behavior, and preservation.
- Evaluated the Constitution Check against v2.1.1: Principles I, II, IV, V, and VI pass; III is not impacted; VII is N/A because no visual surface changes.
- Documented Phase 0 research in `research.md` with four decisions and alternatives:
  route/navigation source, internal artifact preservation, README cross-reference handling, and removed-route verification.
- Created `data-model.md`: explicitly records no new entities, fields, relationships, migrations, or persistence changes.
- Created `contracts/documentation-boundary.md`: records no API changes and the public/internal documentation boundary contract.
- Created `quickstart.md`: source grep, fresh `npm run build`, served former-route check, ADR/provider preservation, and README-reference verification.
- Ran `update-agent-context.ps1 -AgentType claude`; it completed successfully. The script emitted a warning that its parser found no language information, although the plan contains the language field; no context changes requiring manual follow-up were identified.
- Placeholder scan across all generated artifacts passed.

## Outcome

- ✅ Impact: Implementation-ready plan and supporting research/design artifacts exist for removing the internal LLM-provider page from the public textbook without touching the future chatbot architecture.
- 🧪 Tests: No application tests run; planning-stage artifact validation only. Runtime/build checks are specified in `quickstart.md` and belong to implementation/verification.
- 📁 Files: `plan.md`, `research.md`, `data-model.md`, `contracts/documentation-boundary.md`, `quickstart.md`, and the agent-context update target.
- 🔁 Next prompts: run `/sp.tasks` to generate ordered implementation tasks, then `/sp.implement` after reviewing the task checklist.
- 🧠 Reflection: The plan intentionally treats the public page, navigation entries, and stale README references as one boundary cleanup. Removing only the links would leave a direct route; deleting provider code would destroy the future chatbot foundation. The plan preserves both correctness and the smallest diff.

## Evaluation notes (flywheel)

- Failure modes observed: The agent-context updater reported `No language information found in plan` despite the plan's `Language/Version` field; it still completed successfully. This is a script-parser quirk and does not block planning because no new technology was introduced.
- Graders run and results (PASS/FAIL): PASS — prerequisite JSON/path check; PASS — unresolved-placeholder scan.
- Prompt variant (if applicable): n/a.
- Next experiment (smallest change to try): generate tasks and implement the four-file cleanup, then run the quickstart against a fresh build and served former route.
