---
id: 0001
title: Chatbot build prompt read and stack fixed
stage: misc
date: 2026-09-23
surface: agent
model: deepseek/deepseek-v4.1-flash (Command Code)
feature: 012-chatbot-tutor
branch: main
user: owner
command: none (freeform chat — the feature-012 kickoff message)
labels: ["chatbot", "012", "kickoff", "stack", "secrets"]
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

Read _scratch/platform-research/02-chatbot-1.0-build-prompt.md from start to end and follow it exactly, starting with section 0 and Step 0. Stop at every checkpoint and wait for my OK.

My Command Code API key, for my own testing only: [REDACTED]

Save it only in edu-site/api/.env as COMMANDCODE_API_KEY. Check that file is git-ignored, and never write the key anywhere else or show it back to me.


but before that, tell me what will be the exact stack on this chatbot?

## Response snapshot

Read the 797-line build prompt in full, then answered the stack question from §1, §2, §7 and §0.6 without starting any work. The stack: **backend** Python 3.12+ FastAPI + Uvicorn with settings through `app/config.py`, ruff/mypy/pytest; **agent layer** the OpenAI Agents SDK (Python), one agent, modes/levels as `ModeSpec` data, tracing always disabled; **model access** `deepseek/deepseek-v4.1-flash` through Command Code's provider API at `https://api.commandcode.ai/provider/v1` via `AsyncOpenAI` behind a `CommandCodeClient`, `LLM_API_STYLE=chat_completions` with `responses` as the fallback; **RAG** LlamaIndex + Qdrant (Cloud free tier / embedded local / `tmp_path` in tests) with local fastembed embeddings, dense `BAAI/bge-small-en-v1.5` plus sparse `Qdrant/bm25`, hybrid fusion at alpha 0.5; **web search** a free-tier provider chosen by RESEARCH-1 at CP2; **storage** Neon Postgres over async SQLAlchemy + asyncpg + Alembic behind a `ChatLogStore`; **frontend** the existing Docusaurus/React 18 site with `react-markdown` + `remark-gfm` and an SSE client; **hosting** a free Docker/Python host chosen by RESEARCH-2 at CP2 with the site staying on Vercel; **CI** a backend job in `ci.yml` plus a new `ingest.yml`. Confirmed the key-handling plan: it goes only into `edu-site/api/.env` as `COMMANDCODE_API_KEY`, verified git-ignored, never echoed.

## Outcome

- ✅ Impact: the owner got the exact stack before any work began, and the key-handling contract was restated before the secret was ever written.
- 🧪 Tests: none.
- 📁 Files: none — deliberately read-only; step 0.0 had not been authorised to start yet.
- 🔁 Next prompts: "ok, start the chatbot engineering professionally" (record 0003).
- 🧠 Reflection: the prompt's §0 rule — never guess, stop and ask on conflict — made the stack answer a read of the decided facts rather than a design proposal; that is why it could be given before raising a single tool.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): not run.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
