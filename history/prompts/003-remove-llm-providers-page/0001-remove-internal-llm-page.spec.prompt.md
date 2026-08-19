---
id: 0001
title: Remove internal LLM providers page
stage: spec
date: 2026-08-18
surface: agent
model: MiniMax-M3
feature: 003-remove-llm-providers-page
branch: 003-remove-llm-providers-page
user: Dell
command: /sp.specify (whythe LLM providers page listed in the web? it's an internal website archtectural chatbot (which will be built later) decision.)
labels: [spec, content-removal, navigation, internal-decision, llm-providers, chatbot]
links:
  spec: specs/003-remove-llm-providers-page/spec.md
  ticket: null
  adr: history/adr/0001-free-tier-llm-choice.md (cross-ref, preserved)
  pr: null
files:
  - specs/003-remove-llm-providers-page/spec.md
  - specs/003-remove-llm-providers-page/checklists/requirements.md
tests:
  - null
---

## Prompt

> whythe LLM providers page listed in the web? it's an internal website archtectural chatbot (which will be built later) decision.

## Response snapshot

- Interpreted the request: the LLM providers page (`docs/llm-providers.md`) is public-facing but documents an internal architecture decision (future chatbot provider selection). It should be removed from the public site while preserving the underlying provider architecture and decision internally.
- **Discovery scan** (before writing the spec) found the page is wired into three public surfaces:
  1. `docusaurus.config.ts:79-81` — navbar entry ("LLM providers" → `/llm-providers`)
  2. `docusaurus.config.ts:105` — footer link ("LLM providers" → `/llm-providers`)
  3. `docs/llm-providers.md` — the page itself (sidebar_label, title "LLM providers — free-tier comparison", provider matrix, preference order, embeddings, how-to-switch, decision triggers)
- Also referenced from `api/README.md:30` and `api/README.md:88` as the source-of-truth doc for the LLM comparison.
- Homepage (`src/pages/index.tsx`) has no direct `llm-providers` reference (only a Stage 4 curriculum line mentioning OpenAI Agents SDK / LangGraph — that's a curriculum topic, not a link, and stays).
- Created feature branch `003-remove-llm-providers-page` (number 3 — next after 001-book-foundation, 002-apple-design; no prior branches with this short-name existed) and scaffolded `specs/003-remove-llm-providers-page/`.
- Wrote `spec.md` with one P1 user story (keep internal architecture out of public navigation), edge cases (stale cache/index, dangling cross-references, backend untouched), FR-001..FR-006 (no public page generated, no navigation entry, standard 404 for former route, internal decision preserved, backend interfaces unchanged, no public links), and 4 measurable SCs (fresh build emits no route, zero public links, backend source unchanged, maintainer can locate decision).
- Wrote `checklists/requirements.md` — all Content Quality, Requirement Completeness, Feature Readiness, and Constitution Compliance items pass; notes enumerate the concrete removal targets for the plan.

## Outcome

- ✅ Impact: Spec written for removing the internal LLM-provider decision from the public textbook while preserving the backend provider abstraction and ADR-0001 internally. One independently-testable P1 user story; no [NEEDS CLARIFICATION] markers — the scope is clear (public exposure removal only).
- 🧪 Tests: none run — this is a spec-writing stage; runtime verification (fresh build emits no `/llm-providers` route, 404 on former route, navbar/footer clean) belongs to `/sp.plan` → `/sp.tasks` → `/sp.implement`.
- 📁 Files: `specs/003-remove-llm-providers-page/spec.md`, `specs/003-remove-llm-providers-page/checklists/requirements.md`.
- 🔁 Next prompts: run `/sp.clarify` (no critical ambiguities expected) then `/sp.plan` to detail the removal (delete `docs/llm-providers.md`, remove navbar/footer entries in `docusaurus.config.ts`, fix `api/README.md` references, verify 404 on fresh build).
- 🧠 Reflection: The scope is deliberately narrow — "remove public exposure, preserve the decision." The discovery scan was essential: without it the navbar/footer entries and the `api/README.md` cross-reference would have been missed. ADR-0001 and all backend provider files stay untouched.

## Evaluation notes (flywheel)

- Failure modes observed: `create-new-feature.ps1` emitted a positional-parameter error for the feature description (the script accepted `-Json -Number -ShortName` but the trailing positional arg didn't bind), yet still created the branch and spec scaffold successfully. Non-blocking, but worth noting the script's arg contract is strict.
- Graders run and results (PASS/FAIL): n/a — no runtime surface; spec/checklist authored.
- Prompt variant (if applicable): n/a.
- Next experiment (smallest change to try): after implementation, run a fresh `npm run build` and confirm `/llm-providers` is absent and returns the standard not-found page; grep the built `static/` output for `llm-providers` to confirm zero traces.
