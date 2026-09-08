# The Bridge Balance — FastAPI Backend

Backend for **The Bridge Balance**. RAG chat, product catalog, auth, payments — all served from one FastAPI app.

## Quick start

```bash
cd edu-site/api
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -e ".[dev]"
cp .env.example .env        # then fill in credentials
uvicorn app.main:app --reload --port 8000
```

Requires **Python 3.12+**.

## Free-tier services (no paid tier required for Phase A)

| Service | Free tier | When you need it |
|---|---|---|
| [Neon Postgres](https://neon.tech/) | 0.5 GB | Phase B — auth, profiles, orders |
| [Qdrant Cloud](https://cloud.qdrant.io/) | 1 GB vectors | Phase B — RAG over chapters |
| Groq / Gemini / Together / Ollama | free / free-credits | Phase B — LLM provider |
| [Resend](https://resend.com/) | 3k emails/mo | Phase C — receipts, password reset |
| [Cloudflare R2](https://cloudflare.com/products/r2/) | 10 GB storage | Phase C — downloadable product files |
| [Inngest](https://www.inngest.com/) | 25k function runs/mo | Phase C — async jobs |
| [Stripe](https://stripe.com/) | pay-as-you-go | Phase C — payments (no monthly fee) |

See **`history/adr/0001-free-tier-llm-choice.md`** (repo-internal) for the LLM provider decision.

## Layout

```
app/
├── main.py               # FastAPI app factory
├── config.py             # Pydantic settings, single source of truth
├── deps.py               # FastAPI dependencies
├── routers/              # one module per route group
│   ├── health.py         # /health, /health/ready
│   ├── chat.py           # /chat  (Phase B stub)
│   ├── personalize.py    # /personalize  (Phase B stub)
│   ├── translate.py      # /translate  (Phase B stub)
│   └── llm_router.py     # /llm/status, /llm/providers (introspection)
├── llm/                  # provider abstraction
│   ├── base.py           # LLMClient interface, LLMRequest/Response
│   ├── registry.py       # provider lookup
│   └── providers/        # one module per provider
│       ├── none.py       # default — refuses with a 503 hint
│       ├── groq.py
│       ├── gemini.py
│       ├── together.py
│       ├── ollama.py
│       ├── deepseek.py
│       └── openai.py     # gated — see ADR-0001
├── db/                   # SQLAlchemy + Alembic (Phase B)
│   └── neon.py           # lazy async engine
└── rag/                  # RAG utilities (Phase B)
    └── qdrant.py
tests/
└── test_health.py        # Phase A smoke tests
```

## Phase A status

- ✅ App boots; `/health` and `/health/ready` return 200.
- ✅ All Phase B routes return 501 with a "wired in Phase B" message.
- ✅ LLM provider abstraction in place — `LLM_PROVIDER=none` by default.
- ✅ Free-tier service config documented in `.env.example`.
- � No DB session, no Qdrant search, no LLM completion — those are Phase B.

## Testing

```bash
pytest -q
```

Phase A tests are smoke tests only: does the app boot, do the routes exist.
Real behavioural tests ship with each phase.

## Adding an LLM provider

1. Add the provider's enum value in `app/config.py:LLMProvider`.
2. Add its credential to `Settings`.
3. Create `app/llm/providers/<name>.py` implementing `LLMClient`.
4. Register it in `app/llm/registry.py:_build`.
5. Add a row in `app/llm/router.py:providers`.
6. Add the env var to `.env.example` and reference it in `history/adr/0001-free-tier-llm-choice.md`.

Provider SDKs are imported lazily inside each module — the app only requires
SDKs for providers it actually uses.
