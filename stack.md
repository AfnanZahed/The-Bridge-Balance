# The Bridge Balance — Complete Stack

> Source of truth. Last updated 2026-08-17.

This stack is based on Panaversity Hackathon I, with surgical additions for running a paid digital-products business alongside the curriculum.

| # | Layer | Tech | Role |
|---|---|---|---|
| 1 | Textbook frontend | **Docusaurus is 3.10.2** (TypeScript, MDX) | 4-stage curriculum, product catalog pages |
| 2 | Static hosting | **GitHub Pages** or **Vercel** | Serve the Docusaurus build |
| 3 | Backend API | **FastAPI** (Python 3.12) | RAG chat, product API, checkout, webhooks, license endpoints |
| 4 | ORM + migrations | **SQLAlchemy 2.x + Alembic** | DB layer for FastAPI |
| 5 | Database | **Neon Serverless Postgres** | Users, products, orders, licenses, translation cache |
| 6 | Vector search | **Qdrant Cloud** (Free Tier) | RAG over MDX chapters |
| 7 | LLM + embeddings | **OpenAI Python SDK** | Chat, translation, personalization, `text-embedding-3-small` |
| 8 | Auth | **better-auth.com** | Sign-up, sign-in, profile collection (hardware/software background) |
| 9 | Payments | **Stripe** | Checkout, subscriptions, customer portal, webhooks |
| 10 | Object storage | **Cloudflare R2** | Downloadable product files (sub-agents, skills, MCP, plugins) — $0 egress |
| 11 | Transactional email | **Resend** | Receipts, license keys, password reset |
| 12 | Background jobs | **Inngest** | Translation queue, re-embed, async email |
| 13 | License keys | **DIY** (FastAPI + Neon) | Phase C only — sign + verify per-product licenses |
| 14 | Authoring method | **Spec-Kit Plus** + **Claude Code** | Spec-driven book writing with slash commands |
| 15 | Version control | **Git + GitHub** | Source of truth, public repo for submission/hiring signal |

**Total: 15 components. All have free tiers sufficient for the first 1k paying customers.**

---

## Runtime surface

```
                        ┌─────────────────────┐
   Browser ───────────► │  Docusaurus (static)│  GitHub Pages or Vercel
                        │  - Curriculum pages │
                        │  - Product catalog  │
                        │  - Chatbot widget   │
                        │  - Checkout button  │
                        └──────────┬──────────┘
                                   │ HTTPS
                                   ▼
                        ┌─────────────────────┐
                        │  FastAPI container  │  Render / Railway / Fly.io
                        │  /chat /products     │
                        │  /checkout /webhook │
                        └────┬───┬───┬───┬────┘
                             │   │   │   │
              ┌──────────────┘   │   │   └──────────────┐
              ▼                  ▼   ▼                  ▼
        ┌──────────┐      ┌──────────┐  ┌──────────┐  ┌──────────┐
        │  Neon    │      │  Qdrant  │  │  Stripe  │  │ Cloudflare│
        │ Postgres │      │  Cloud   │  │  + Resend│  │    R2     │
        └──────────┘      └──────────┘  └──────────┘  └──────────┘
                             ▲
                             │ async events
                        ┌────┴────────┐
                        │   Inngest   │  (translation, re-embed, email)
                        └─────────────┘
```

---

## Free-tier cost ceiling

| Service | Free tier | When you start paying |
|---|---|---|
| Docusaurus → GitHub Pages | ∞ free | never |
| FastAPI on Render | 750 hrs/mo free | >1 always-on instance |
| Neon | 0.5 GB Postgres | 2nd branch or >0.5 GB |
| Qdrant Cloud | 1 GB vectors, free forever | >1 GB |
| OpenAI | $5 credit for new accounts | real usage |
| Stripe | pay-as-you-go, no monthly fee | per-transaction % |
| Cloudflare R2 | 10 GB storage + 10M reads/mo | bigger catalog |
| Resend | 3k emails/mo, 100/day | >100 emails/day |
| Inngest | 25k function runs/mo | >25k jobs/mo |
| better-auth | free (self-hosted) | never |

**Realistic Phase A cost at <100 paying customers: $0–$5/month.** Mostly OpenAI tokens.

---

## Phased rollout

| Phase | Goal | Stack additions |
|---|---|---|
| **A — Curriculum live** | Docusaurus + RAG chat working on real chapters | nothing new; what we have today |
| **B — First sale** | One product purchasable end-to-end | + Stripe Checkout (hosted page) + Neon tables for `products`, `orders` + a single Cloudflare R2 bucket + Resend for the receipt email |
| **C — Catalog of 5+** | Catalog page, multiple products, license keys, versioned downloads | + R2 signed URLs + license-key generator (DIY) + Inngest for async email |
| **D — Polish** | Refunds, customer portal, version updates, reviews | + Stripe Customer Portal + Stripe Tax + Resend drip campaigns |

---

## Do-not-add list

Temptations explicitly rejected during planning:

- ~~Next.js storefront~~ — Docusaurus covers the storefront as React components
- ~~Supabase~~ — overlaps Neon + better-auth + R2
- ~~Tailwind + shadcn~~ — Docusaurus uses Infima; fighting the framework loses
- ~~Prisma~~ — wrong ecosystem; use SQLAlchemy
- ~~Bun / Deno runtime~~ — Node is fine for a docs site
- ~~Vercel Functions / Cloudflare Workers for backend~~ — breaks the moment you need >10s jobs
- ~~Custom admin panel~~ — `psql` + Drizzle Studio, that's it
- ~~tRPC / GraphQL~~ — REST + OpenAPI is enough
- ~~Third-party license-key service~~ — buy only if Phase C needs it

---

## Top 3 risks

1. **Become a teacher before a marketplace.** Phase A (curriculum) is what makes the products worth buying.
2. **Licensing is a tax on growth.** Phase B sells without license keys (signed download URL is enough). Add keys in Phase C only if people are sharing links.
3. **OpenAI dependency.** Have a fallback (Ollama / DeepSeek / Anthropic) before you reach 1k paying customers.
