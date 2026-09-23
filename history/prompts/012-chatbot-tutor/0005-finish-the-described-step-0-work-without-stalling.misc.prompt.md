---
id: 0005
title: Finish the described Step 0 work without stalling
stage: misc
date: 2026-09-23
surface: agent
model: deepseek/deepseek-v4.1-flash (Command Code)
feature: 012-chatbot-tutor
branch: main
user: owner
command: none (freeform chat — instruction to act rather than restate a plan)
labels: ["012", "step-0", "probe", "dependencies", "verification"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - edu-site/api/pyproject.toml (modified — the better-auth line deleted; the `chat` extra added; qdrant-client floor raised to >=1.16.0)
  - edu-site/api/scripts/probe_provider.py (new — the kept provider probe)
  - edu-site/package.json, edu-site/package-lock.json (modified — react-markdown and remark-gfm)
  - specs/012-chatbot-tutor/research.md (modified — section 1 filled from the probe's real output)
  - specs/012-chatbot-tutor/progress.md (modified — rows 0.3, 0.4, 0.5, 0.6)
tests:
  - cd edu-site/api && .venv\Scripts\python.exe -m pip install -e ".[dev,chat]" — exit 0, no conflict
  - cd edu-site/api && .venv\Scripts\python.exe -m pip check — No broken requirements found.
  - cd edu-site/api && .venv\Scripts\python.exe -m pytest -q — 7 passed, exit 0
  - cd edu-site/api && .venv\Scripts\python.exe scripts\probe_provider.py — EXITCODE=0, all eight sections produced results
  - cd edu-site/api && .venv\Scripts\python.exe -m ruff check scripts\probe_provider.py — All checks passed!
  - cd edu-site && npm install — exit 0; npm ls react-markdown remark-gfm — both at intended versions
  - cd edu-site && npm run typecheck — exit 0
---

## Prompt

You ended your turn right after saying you were about to do something, without doing it. Do it now — make the tool calls or produce the output you described; do not restate the plan. If the task is actually complete, state the final result instead.

## Response snapshot

Acted rather than re-planning, and finished the described work: 0.3, 0.5 and 0.6 are now done.

**Unblocking change (made without prior approval — flagged for CP0 ratification).** The line `"better-auth>=0.4.0",` was deleted from `pyproject.toml`. It was verified unsatisfiable (`pip index versions better-auth` → `No matching distribution found`; every release requires Python ≤3.11) and verified unused (`grep -i better[_-]auth` across `edu-site/` shows no module importing it — only settings fields and `.env.example` placeholders). Reversible with one line; the constitution's `better-auth.com (Phase B)` intent is unaffected.

**0.3 backend.** `pip install -e ".[dev]"` then succeeded (`Successfully installed … bridge-balance-api-0.1.0 …`, exit 0). `pytest -q` → **7 passed**, exit 0. The baseline needed `LLM_PROVIDER=none` in the process environment, because 0.4 had been completed early and `.env`'s `commandcode` value is rejected by the current enum until §7.3 adds it.

**0.6 dependencies.** The `chat` extra was added and installed — openai-agents 0.22.3, openai 3.19.1, llama-index-core 0.14.25, llama-index-vector-stores-qdrant 0.10.3, llama-index-embeddings-fastembed 0.7.0, fastembed 0.8.1, qdrant-client 1.19.1, SQLAlchemy 2.0.54, asyncpg 0.31.0, alembic 1.20.0, tzdata 2026.4 — with `pip check` reporting `No broken requirements found.` and fastapi/starlette untouched. `react-markdown@^10.1.0` and `remark-gfm@^4.0.1` were added to the frontend after a registry check proved React 18 compatibility.

**0.5 probe.** `edu-site/api/scripts/probe_provider.py` written, run and kept. All eight sections produced results. The two findings that change §7.4: `tool_choice: "required"` returns 400 `Thinking mode does not support this tool_choice`, so the modes' "search the book first" requirement must ride in the instructions; and `reasoning_tokens` are charged against `max_tokens`, so `max_output_tokens` must leave room for reasoning above the visible answer. Also: `reasoning_content` is absent — the provider uses `reasoning` + `reasoning_details`.

**The record was corrected by verification, not by assumption.** An independent verifier found that `research.md` §1 cited an effort run (`low 37 / high 13`) present in no captured artifact; the file now states only the captured run (35 vs 34) and marks the control's effect unproven. It also found the progress ledger had no 0.5 row, which was added.

## Outcome

- ✅ Impact: Step 0 is complete apart from CP0 itself, and the probe's real constraints on tool choice and token budgeting are recorded before any code is written against them.
- 🧪 Tests: all seven listed above; `pip check` clean, `pytest` 7 passed, probe exit 0, ruff clean, npm install/typecheck exit 0.
- 📁 Files: eight new/modified paths, listed above. Nothing committed yet.
- 🔁 Next prompts: CP0 sign-off, then the spec (CP1).
- 🧠 Reflection: the owner's nudge was correct — the blocker had a verified, one-line, reversible answer, and stopping to ask cost more than acting and flagging would have. The verification pass also proved its worth twice: it caught an unverifiable number in the research record and a missing ledger row.

## Evaluation notes (flywheel)

- Failure modes observed: (1) an unverifiable figure reached `research.md` from a subagent's narrative rather than its captured output; (2) the progress ledger skipped a step; (3) `set VAR=value && …` in `cmd.exe` captured a trailing space into the value and produced a false pytest failure that looked like a real enum rejection.
- Graders run and results (PASS/FAIL): independent verification of the probe record — a/d/e/f/g/h CONFIRMED, sections 2–4 CONFIRMED unchanged, secret containment CONFIRMED, one claim UNVERIFIED and fixed.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): require every subagent to write its raw output to a file and cite that file for each claim, so a narrative figure can never be recorded without an artifact behind it.
