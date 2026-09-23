# The Bridge Balance

> Student-oriented platform for spec-driven AI agent engineering. 3 stages. 100% free.

This repo is the **spec-driven development** workspace for **The Bridge Balance**. The platform itself is a Docusaurus textbook paired with a FastAPI backend and a paid catalog of Claude Code sub-agents, skills, MCP servers, and plugins.

## What's here

```
.
├── edu-site/              # the textbook (Docusaurus) + the backend (FastAPI)
│   ├── docs/              # MDX curriculum content (Stages 0–2)
│   ├── src/               # Docusaurus theme + pages
│   └── api/               # FastAPI app (RAG chat, products, auth)
├── specs/                 # Feature specs (Spec-Kit Plus)
│   └── 001-book-foundation/
├── history/               # PHRs and ADRs
│   ├── prompts/           # Prompt History Records
│   └── adr/               # Architecture Decision Records
├── .specify/              # Spec-Kit Plus templates + scripts
├── .claude/commands/      # /sp.* slash commands
├── CLAUDE.md              # Agent project rules
├── stack.md               # Source-of-truth stack reference
└── README.md              # ← you are here
```

## Phase A status (now)

| Workstream | Status | Notes |
|---|---|---|
| Docusaurus book | ✅ scaffolded | Stage 0 chapters at the docs root; Stages 1 and 2 indexed |
| FastAPI backend | ✅ scaffolded | `/health` works; Phase B routes return 501 |
| LLM provider abstraction | ✅ shipped | Default `none` — refuses to spend money |
| Free-tier services | ✅ documented | Neon + Qdrant + Groq/Gemini + R2 + Inngest |
| Lecture content | ⏳ pending | You deliver; text is the second medium after video |
| RAG chat | 🔜 Phase B | Qdrant + LLM + embeddings wiring |
| Translation / personalization | 🔜 Phase B | Per-chapter buttons |
| Auth | 🔜 Phase B | better-auth.com |
| Payments | 🔜 Phase C | Stripe + R2 + Resend |
| Paid product catalog | 🔜 Phase C | Sub-agents, skills, MCP, plugins |

See [`stack.md`](./stack.md) for the full stack reference.

## Run the book locally

```bash
cd edu-site
npm install
npm start
# → http://localhost:3000
```

Requires Node 18+.

## Run the backend locally

```bash
cd edu-site/api
python -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
cp .env.example .env        # then fill in credentials (Phase B+ only)
uvicorn app.main:app --reload --port 8000
# → http://localhost:8000/docs
```

Requires Python 3.12+.

Phase A runs the backend with **no credentials at all** — `/health` returns 200, `/llm/status` shows `provider=none`, and the Phase B routes return 501 with a "wired in Phase B" message.

## Free-tier constraint

Every component runs on a free tier until usage justifies a paid tier. See [`stack.md`](./stack.md) for the per-component free tiers and where each one starts costing money, and [ADR-0001](./history/adr/0001-free-tier-llm-choice.md) for the LLM choice.

## Where to start

1. **Read the platform spec:** [`The Bridge Balance - Platform Spec.docx`](./The%20Bridge%20Balance%20-%20Platform%20Spec.docx).
2. **Understand the stack:** [`stack.md`](./stack.md).
3. **See architectural decisions:** [`history/adr/`](./history/adr/).
4. **Run the book:** `cd edu-site && npm install && npm start`.
5. **Next workflow step:** once you're ready to define a feature formally, run `/sp.specify <feature>` (the slash command is wired at `.claude/commands/sp.specify.md`).

## Conventions

- **Spec-Driven Development.** Every feature starts as a spec → plan → tasks → implement. See `specs/README.md`.
- **Prompt History Records.** Every meaningful exchange with the AI is recorded at `history/prompts/`.
- **ADRs.** Architectural decisions are documented at `history/adr/` after user consent (never auto-created).
- **Smallest viable change.** No unrelated edits. No invented APIs.
- **Free-tier by default.** New components MUST be on a free tier unless the platform has paying users to justify the cost.

## License

TBD. No licence file has been added yet; the textbook content is free to read
(Constitution Principle VI) but the terms are not formally stated.
