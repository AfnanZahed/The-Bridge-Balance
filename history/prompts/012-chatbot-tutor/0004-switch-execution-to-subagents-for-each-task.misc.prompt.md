---
id: 0004
title: Switch execution to subagents for each task
stage: misc
date: 2026-09-23
surface: agent
model: deepseek/deepseek-v4.1-flash (Command Code)
feature: 012-chatbot-tutor
branch: main
user: owner
command: none (freeform chat — mid-Step-0 course correction)
labels: ["subagents", "delegation", "reasoning-effort", "012"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .commandcode/agents/tbb-mechanical.md (new — DeepSeek V4.1 Flash at reasoningEffort low)
  - .commandcode/agents/tbb-builder.md (new — reasoningEffort high)
  - .commandcode/agents/tbb-verifier.md (new — reasoningEffort max, read-only apart from running commands)
tests:
  - none (the delegation itself was verified by reading each subagent's returned evidence)
---

## Prompt

Use the Subagents for completing differnet tasks

## Response snapshot

Moved execution onto subagents for every substantial step, and recorded how effort is varied per task.

**Why agent files were needed at all.** The built-in `General`/`Explore`/`Plan` agents are read-only and cannot be given a model or an effort; the `agent` tool accepts a per-run `model` override but has no reasoning-effort parameter. The only mechanism that pins effort is a custom agent file's `reasoningEffort` frontmatter, so three were created in the project scope, each pinned to `deepseek/deepseek-v4.1-flash`: `tbb-mechanical` (low — run one already-decided command and report its output and exit code), `tbb-builder` (high — implement one bounded piece and prove it works), `tbb-verifier` (max — re-derive someone else's claim, read-only apart from running commands). They load on the next turn, so the first delegations in this same turn used the built-in `general` agent with an explicit model override.

**What was delegated, and what came back.** The frontend environment baseline (typecheck, lint, build) — 914,608 tokens of command output returned as a one-page summary. The backend baseline — which discovered the `better-auth` blocker. The PyPI version verification for every `chat`-extra pin, so that the build prompt's claim of `openai-agents` 0.22.3 was checked rather than trusted (it was correct, and its `starlette>=1.3.1` requirement was already satisfied). The `react-markdown`/`remark-gfm` React 18 compatibility check, which found `remark-gfm@4.0.1` already present transitively. The two installs. And the probe itself.

**Verification was delegated too.** An independent `tbb-verifier` with no shared context re-derived the probe's record against its captured output, confirmed `research.md` sections 2–4 were untouched, and ran the secret-containment checks. It found one real defect — `research.md` cited a first effort run (`low 37 / high 13`) that appears in no captured artifact — which was then corrected to the single captured run.

## Outcome

- ✅ Impact: the heavy, output-hungry steps now run in their own contexts and return only decisive evidence, and effort varies by task (low for mechanical, high for building, max for verification) as instructed.
- 🧪 Tests: none directly; every delegated step's own commands were reported with exit codes and quoted output.
- 📁 Files: three new agent definition files under `.commandcode/agents/` (currently untracked — flagged to the owner, who may not want them committed).
- 🔁 Next prompts: the nudge to finish the work described (record 0005).
- 🧠 Reflection: delegating the verification to an agent with no memory of producing the work is what made it useful — it re-derived each claim from the captured output and the repo, and caught an unsupported number that a self-check would have passed.

## Evaluation notes (flywheel)

- Failure modes observed: none in the delegation itself. One subagent reported exit codes as UNVERIFIED because the runner did not annotate them, which was handled by re-running the decisive command in a shell whose exit code was readable.
- Graders run and results (PASS/FAIL): the independent verifier's verdict on the probe record — CONFIRMED for a, d, e, f, g, h; sections 2–4 CONFIRMED unchanged; secret containment CONFIRMED; one claim UNVERIFIED (fixed).
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): give every delegated command an explicit exit-code capture in the prompt itself, since a subagent's shell is `cmd.exe` where `$LASTEXITCODE` does not exist.
