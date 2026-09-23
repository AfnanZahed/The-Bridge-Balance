---
id: 0002
title: Subagent model and reasoning effort capability
stage: misc
date: 2026-09-23
surface: agent
model: deepseek/deepseek-v4.1-flash (Command Code)
feature: 012-chatbot-tutor
branch: main
user: owner
command: none (freeform chat — question about the harness, before step 0)
labels: ["subagents", "command-code", "reasoning-effort", "models"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - none (read-only response — no file was written or changed)
tests:
  - none
---

## Prompt

Ok, but before mw whether you can run your subagents with deepseek at MAX effort?

## Response snapshot

Checked the Command Code product knowledge rather than guessing (the `command-code-knowledge` skill), then answered from `reference/custom-agents.md` and `reference/models.md`:

- **Built-in General / Explore / Plan are read-only** — no model or effort can be pinned on them; they inherit the session.
- The `agent` tool accepts a per-run `model` override but has **no reasoning-effort parameter**, so effort cannot be set on the fly.
- A **custom agent file** in `.commandcode/agents/` (project) or `~/.commandcode/agents/` (personal) supports both fields: `model:` and `reasoningEffort:`.
- `deepseek/deepseek-v4.1-flash` is listed with efforts **low, high, max**, so `reasoningEffort: max` is a valid pin for it. An unsupported level falls back to the model default instead of erroring, and the file still loads. `maxTurns` defaults to 100; subagents are one level deep and cannot spawn their own.
- So "subagents on DeepSeek at MAX" requires a custom agent file; the built-ins cannot be configured that way.

Flagged two caveats: those subagent calls bill the owner's Command Code plan, entirely separate from the app's own $1/day provider-API cap; and if the session model is already DeepSeek V4.1 Flash at MAX, a subagent that inherits needs no file at all. Offered to create a MAX-effort DeepSeek agent before step 0, or to proceed.

## Outcome

- ✅ Impact: the owner learned what is and is not configurable about subagents before choosing a delegation strategy for the build.
- 🧪 Tests: none.
- 📁 Files: none — read-only.
- 🔁 Next prompts: "ok, start the chatbot engineering professionally" (record 0003), which settled the question by instructing per-task effort as needed rather than a single pinned agent.
- 🧠 Reflection: the correct answer was a documentation lookup, not an inference from tool schemas — the `agent` tool's own parameters alone would have implied effort was settable per run, which it is not.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): not run.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
