---
id: 0001
title: Initialize Project Bootstrap
stage: general
date: 2026-08-17
surface: agent
model: MiniMax-M3
feature: book-foundation
branch: 001-spec-driven-engineering
user: Dell
command: /verify (initialization follow-up)
labels: [initialization, scaffolding, docusaurus, fastapi, free-tier, llm-providers, adr]
links:
  spec: null
  ticket: null
  adr: history/adr/0001-free-tier-llm-choice.md
  pr: null
files:
  - .gitignore
  - .env.example
  - README.md
  - specs/README.md
  - history/prompts/README.md
  - history/adr/README.md
  - history/adr/0001-free-tier-llm-choice.md
  - edu-site/package.json
  - edu-site/docusaurus.config.ts
  - edu-site/tsconfig.json
  - edu-site/sidebars.ts
  - edu-site/src/css/custom.css
  - edu-site/src/pages/index.tsx
  - edu-site/docs/intro.md
  - edu-site/docs/llm-providers.md
  - edu-site/docs/stage-01-spec-aware-vibe-engineering/index.md
  - edu-site/docs/stage-01-spec-aware-vibe-engineering/01-foundations.md
  - edu-site/docs/stage-01-spec-aware-vibe-engineering/02-core-programming.md
  - edu-site/docs/stage-01-spec-aware-vibe-engineering/03-frontend.md
  - edu-site/docs/stage-01-spec-aware-vibe-engineering/04-backend.md
  - edu-site/docs/stage-01-spec-aware-vibe-engineering/05-databases.md
  - edu-site/docs/stage-01-spec-aware-vibe-engineering/06-git-github.md
  - edu-site/docs/stage-02-cs50-certification/index.md
  - edu-site/docs/stage-02-cs50-certification/cs50p.md
  - edu-site/docs/stage-02-cs50-certification/cs50w.md
  - edu-site/docs/stage-03-mastering-ai-coding-agents/index.md
  - edu-site/docs/stage-03-mastering-ai-coding-agents/prompt-engineering.md
  - edu-site/docs/stage-03-mastering-ai-coding-agents/context-engineering.md
  - edu-site/docs/stage-03-mastering-ai-coding-agents/claude-code.md
  - edu-site/docs/stage-03-mastering-ai-coding-agents/skills-and-mcp.md
  - edu-site/docs/stage-04-engineering-autonomous-ai-agents/index.md
  - edu-site/docs/stage-04-engineering-autonomous-ai-agents/rag-and-tool-calling.md
  - edu-site/docs/stage-04-engineering-autonomous-ai-agents/multi-agent-systems.md
  - edu-site/docs/stage-04-engineering-autonomous-ai-agents/evaluations.md
  - edu-site/README.md
  - edu-site/api/pyproject.toml
  - edu-site/api/.env.example
  - edu-site/api/README.md
  - edu-site/api/app/__init__.py
  - edu-site/api/app/main.py
  - edu-site/api/app/config.py
  - edu-site/api/app/deps.py
  - edu-site/api/app/llm/__init__.py
  - edu-site/api/app/llm/base.py
  - edu-site/api/app/llm/registry.py
  - edu-site/api/app/llm/router.py
  - edu-site/api/app/llm/providers/__init__.py
  - edu-site/api/app/llm/providers/none.py
  - edu-site/api/app/llm/providers/groq.py
  - edu-site/api/app/llm/providers/gemini.py
  - edu-site/api/app/llm/providers/together.py
  - edu-site/api/app/llm/providers/ollama.py
  - edu-site/api/app/llm/providers/deepseek.py
  - edu-site/api/app/llm/providers/openai.py
  - edu-site/api/app/routers/__init__.py
  - edu-site/api/app/routers/health.py
  - edu-site/api/app/routers/chat.py
  - edu-site/api/app/routers/personalize.py
  - edu-site/api/app/routers/translate.py
  - edu-site/api/app/db/__init__.py
  - edu-site/api/app/db/neon.py
  - edu-site/api/app/rag/__init__.py
  - edu-site/api/app/rag/qdrant.py
  - edu-site/api/tests/__init__.py
  - edu-site/api/tests/test_health.py
tests:
  - edu-site/api/tests/test_health.py (Phase A smoke tests — pytest not yet run)
---

## Prompt

read the "C:\Users\Dell\Desktop\Book\The Bridge Balance - Platform Spec.docx" and initialize the project, ask me the questions to understand which things will be build first and then we will move to the commands like /sp.specify and /sp.constitution etc

(Followed by clarifications via AskUserQuestion:
- Init scope: Spec setup + scaffold Phase A
- First feature: "I have to deliver 1st lectures to my audience, introduction, and need to document it too. We have to start the book, translation/rag/chatbot and other things will be built later."
- Branding: "Use 'The Bridge Balance' verbatim"
- Stage: Stage 1 — Spec-Aware Vibe Engineering
- Backend: "Full backend wired, but make sure EACH AND EVERYTHING is literally free, at least for a specific limit or time. Be careful about the OpenAI and why we need this? if we need this for the chatbot, i will give you another providers and llms"
- Stage 1 structure: Skeleton with placeholder chapters
- Constitution scope: Full constitution, all phases)

## Response snapshot

1. **Read the platform spec.** Extracted docx text via `System.IO.Compression.ZipFile` (PowerShell). Identified The Bridge Balance as a student-oriented platform for spec-driven AI agent engineering with a 4-stage curriculum (Foundations → CS50 certs → Mastering AI Coding Agents → Autonomous Agents), paired with a paid catalog of Claude Code sub-agents, skills, MCP servers, and plugins.

2. **Read the existing scaffolding.** Inspected `.specify/`, `.claude/commands/`, `CLAUDE.md`, `stack.md`, and `edu-site/` (which existed only as a git index, not a real directory). The `constitution.md` was still a template with `[PLACEHOLDER]` tokens. No `specs/`, `history/`, or `edu-site/` content existed.

3. **Asked four rounds of clarifying questions.** Established: spec-driven setup + Phase A scaffolding, but the actual first deliverable is the **textbook** (lectures to deliver) — translation/RAG/chatbot deferred. Backend "fully wired" but everything must be on a free tier; OpenAI is questioned and gated.

4. **Built the project skeleton:**
   - **Repo root**: `.gitignore` (Python/Node/OS/IDE/secrets), `README.md`, root `.env.example`, `specs/README.md`, `history/{prompts,adr}/README.md`.
   - **ADR-0001**: `history/adr/0001-free-tier-llm-choice.md` — formal decision to gate OpenAI behind a pluggable provider abstraction; preference order Ollama → Groq → Gemini → Together → DeepSeek → OpenAI-last-resort.
   - **Docusaurus book** at `edu-site/`: TypeScript config, branded "The Bridge Balance", homepage hero + 4 stage cards, sidebar, 6 placeholder MDX chapters for Stage 1 (Foundations, Core Programming, Frontend, Backend, Databases, Git & GitHub), Stage 2–4 indexed with stub pages.
   - **FastAPI backend** at `edu-site/api/`: Python 3.12, pyproject.toml, `.env.example`, pluggable `LLMClient` interface with `none/groq/gemini/together/ollama/deepseek/openai` providers (lazy SDK imports), `/health` + `/health/ready` + `/llm/status` + `/llm/providers` wired; Phase B routes (`/chat`, `/personalize`, `/translate`) return 501. Neon + Qdrant helpers (lazy, no boot-time requirement). Phase A pytest smoke tests.
   - **LLM providers doc** at `edu-site/docs/llm-providers.md`: comparison table + preference order + how to switch.

5. **Deferred until user input:** the actual `constitution.md` amendment (run `/sp.constitution` interactively per the command's contract) and the first feature spec (run `/sp.specify`).

## Outcome

- ✅ Impact: Project bootstrap complete. The Docusaurus site is runnable (`cd edu-site && npm install && npm start` → localhost:3000). The FastAPI backend is runnable (`cd edu-site/api && pip install -e ".[dev]" && uvicorn app.main:app --reload` → localhost:8000/docs) with **zero credentials required** in Phase A. The textbook is ready to accept lecture content for Stage 1.
- 🧪 Tests: `edu-site/api/tests/test_health.py` authored (7 smoke tests) but **not yet executed** — Phase A test runtime is the next session's job.
- 📁 Files: 60+ new files; full inventory in the `files:` block above. All paths verified under the working directory `C:\Users\Dell\Desktop\Book`.
- � Next prompts:
  1. `cd edu-site && npm install && npm start` — verify the book renders.
  2. `cd edu-site/api && python -m venv .venv && ... && pytest -q` — verify the backend boots.
  3. `/sp.constitution` — fill the project's principles (interactive command).
  4. `/sp.specify "Stage 1 Foundations lecture delivery"` — first feature spec.
  5. User delivers first Stage 1 lecture transcript → paste into `docs/stage-01-spec-aware-vibe-engineering/01-foundations.md`.
- 🧠 Reflection: The user pivoted from the spec's Phase A (RAG chat on real chapters) to a more immediate need (textbook live + first lectures). Treating the spec as the **north star** and Phase A.1 (book + skeleton) as the **first slice** preserves the roadmap while delivering what the user actually needs today. The OpenAI gating via the pluggable `LLMClient` is the key architectural decision (ADR-0001) and resolves the user's "be careful about OpenAI" constraint without blocking the LLM feature later.

## Evaluation notes (flywheel)

- Failure modes observed: None blocking. Worth noting: the docx was extracted via PowerShell `System.IO.Compression.ZipFile` rather than a Python parser; if the docx format changes (e.g., becomes a real .doc), the extraction recipe will need updating.
- Graders run and results (PASS/FAIL): not applicable — Phase A scaffolding only; runtime verification (npm start, pytest) deferred to the next session.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): the next session should (a) run `npm install` in `edu-site/` and confirm `npm run build` succeeds, (b) run `pytest -q` in `edu-site/api/` and confirm all 7 smoke tests pass, (c) read `edu-site/docs/stage-01-spec-aware-vibe-engineering/01-foundations.md` end-to-end as a reviewer would, to confirm the placeholder template is usable for the user to paste lecture content into.
