---
id: 0141
title: Open phases, launch pass-1 research
stage: general
date: 2026-09-22
surface: agent
model: claude-sonnet-5
feature: none
branch: main
user: owner
command: none
labels: ["auth", "rag", "payments", "phase-b", "phase-c", "research-and-comparison", "spec-driven"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/general/0141-open-phases-launch-pass1-research.general.prompt.md
tests:
  - none
---

## Prompt

Hi there, I am going to do 3 big things in the website, 1. auth, 2. 100% real multi agent Rag chatbot, 3. payment system. add these things into the live artifact

## Response snapshot

The request lands on three phase gates at once, so nothing was built. Raised four decision
points and the owner answered:

1. **Phase gate** → "Open B and C, spec-first." Phases B (auth, RAG chat) and C (payments)
   are opened, and the constitution's spec → plan → tasks → implement flow is followed
   before code lands.
2. **Research gate** (Principle VIII) → "DeepSeek does pass 1, my study follows." Pass 1
   delegated to DeepSeek; the owner's own comparative study remains the blocking pass 2.
3. **Auth mechanism** → the owner will supply their own research, done with Gemini, which
   serves as the pass-2 comparative study for auth and settles the better-auth-versus-
   FastAPI-native question when it arrives.
4. **Multi-agent RAG** → architecture to be defined in the spec, after research.

Findings reported before the questions: all three features are phase-gated in `stack.md`
and `CLAUDE.md`; `stack.md`'s Phase A goal line contradicts its own phase table by placing
RAG chat in Phase A; and `edu-site/src/components/ChatAssistant/index.tsx` already exists
as a deliberate no-API preview whose own comment forbids a network call before Phase B.

Three pass-1 DeepSeek research jobs launched read-only via `command-code` (background tasks
s0k7ngpk auth, s173afyt multi-agent RAG, s21gpoi5 payments), each instructed to name sources
with URLs, close on what the sources missed, and write nothing. Blocked pending the owner's
Gemini research.

## Outcome

- ✅ Impact: Phases B and C opened by owner decision; the three features enter the SDD flow at the research stage rather than as ad-hoc code. No repository code changed.
- 🧪 Tests: none run — no code changed, and the site/backend gates were not exercised this exchange.
- 📁 Files: this PHR only. Research output is still live in the background task logs, not yet placed in the repo.
- 🔁 Next prompts: owner hands over the Gemini research; then `/sp.specify` for each of the three features.
- 🧠 Reflection: the phase gate is the whole story here — the request reads as "add a login and a checkout", and both `stack.md` and `CLAUDE.md` name exactly that phrasing as the thing not to do without opening the phase first.

## Evaluation notes (flywheel)

- Failure modes observed: none yet; the pass-1 jobs are unverified until their traces are checked for unauthorized writes, which `command-code-delegation`'s reference documents as a real and previously-observed failure (a delegated run fabricated a PHR and wrote it into the repo).
- Graders run and results (PASS/FAIL): not run.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): verify each pass-1 trace with `grep -ao '"name":"[a-z_]*"'` before trusting any of its output.
