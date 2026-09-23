# Platform research + rough plan — auth, multi-agent RAG, payments

**Date:** 22 September 2026
**Owner decision this session:** Phases B and C are open, spec-first. No specs and no code
yet — this document is raw research and rough planning only, per the owner's instruction.
**Staging note:** this lives in `_scratch/` on purpose — it is not a spec. When specs begin,
each feature's section here is promoted into `specs/<NNN-feature>/research.md` and this file
can be retired.

---

## 0. The headline finding

**The corpus this RAG is meant to solve is 36,002 words across 31 files — not "too much".**

Measured directly from `edu-site/docs/`:

| Folder | Files | Words |
|---|---|---|
| `docs/` root (Stage 0 chapters + all reference pages) | 15 | 33,292 |
| `docs/intro-1-binary-to-programming/` | 1 | 2,022 |
| `docs/stage-01-sde-mastery-ai-driven/` | 11 | 481 |
| `docs/stage-02-sde-mastery-ai-native/` | 4 | 207 |
| **Total** | **31** | **36,002** |

36k words is roughly **48k tokens**. That is comfortably inside the context window of every
model under consideration, and the whole book embeds for about **one tenth of one cent** with
`text-embedding-3-small`. The entire Stage 1 and Stage 2 corpora are currently *placeholders*
(688 words between them).

**Consequence — and the owner corrected this framing on 2026-09-22, correctly.** This number
describes *today only*. The curriculum is heading for hundreds of thousands of words across many
chapters and lessons over the coming weeks and months, and **RAG is being built for that corpus,
not this one.** The measurement's real use is much narrower than this document first claimed: it
says the *first* version of the chat can be simple and cheap, while the architecture must be
designed for the target scale now so the corpus never has to be re-ingested on a rebuild. It does
**not** say RAG is unnecessary, and it must not be used to argue that.

---

## 1. How this research was produced, and one failure to report

- **Pass 1 (standards research)** was delegated to DeepSeek v4.1 Flash via the Command Code
  CLI, as the owner asked (`command-code-delegation` skill, `--effort high`).
  **It largely failed, and I fell back to doing the work directly.** Six delegated research
  runs were attempted; one succeeded. The rest died with exit code 7, no stdout and no stderr:
  auth ×4 (three different prompts, including one run solo rather than concurrent), payments
  ×2. The one success (RAG) was **truncated mid-sentence**. A separate capture problem made
  the first attempts write 505 MB and 577 MB NDJSON logs — the CLI re-serialises the whole
  accumulated message on every token delta, so the log grows quadratically. I deleted those.
  **What I checked before trusting anything:** no delegated run wrote to the repository — I
  snapshotted `git status --porcelain` before the runs and diffed after. This matters here,
  because this project has already been burned once by a delegated run that fabricated a PHR
  and wrote it into the repo (documented in the skill's own reference file).
- **Pass 2 (the owner's own comparative study)** was supplied as the owner's Gemini
  conversation, covering all three features.
- **I verified the load-bearing claims in pass 2 directly**, because several were wrong.
  Findings below are labelled ✅ verified, ❌ wrong, ⚠️ needs care.

---

## 2. Auth

### What the owner's research said

Use better-auth as a separate TypeScript microservice (Hono or Vercel Functions) issuing JWTs; bridge to FastAPI with `fastapi-betterauth`; consider Neon Auth; fall back to Clerk if stuck.

### What I verified

| Claim | Verdict | Evidence |
|---|---|---|
| better-auth needs a TypeScript runtime, so a Python backend needs a bridge | ✅ | Architectural reality, not disputed |
| `fastapi-betterauth` exists and verifies better-auth JWTs | ✅ | Real: `lukonik/fastapi-betterauth` (PyPI + GitHub), JWKS/RS256 verification, exposes a FastAPI dependency |
| Neon hosts better-auth natively ("Neon Auth") | ✅ | Real: **Managed Better Auth** on Neon — stores users, sessions and auth config *directly in your Neon database*, and branches with it. Currently **Beta** |
| Clerk's free tier is 50,000 users | ✅ | True — 50,000 **monthly retained users**, free, no credit card. Changed from 10,000 on 5 February 2026 |

**Caveats the research missed:**
- `fastapi-betterauth` is a **small third-party package from a single maintainer**. For a route
  that decides who gets in, that is a supply-chain and bus-factor risk worth naming before
  adopting, thin as it is.
- Clerk is a **managed service metered on users**. It is free at 50k MRU, but it is a user
  paywall on the only axis this project cares about, and it is the opposite of
  Constitution Principle II (pluggable, no vendor lock-in). It is a real option, not a free one.
- **Neon Managed Better Auth is the resolution of the thing the research treated as a hard
  hurdle.** The whole objection to better-auth was "it needs a TS server and I write Python".
  Neon runs that server for you, against the database this project already uses. It is in Beta,
  which is the one real caveat.

### What the evidence supports (rough plan)

The four candidate shapes, cheapest-to-own first:

1. **Neon Managed Better Auth** — same auth library already named in `stack.md`, hosted by the
   database already named in `stack.md`, users and sessions in your own Postgres, nothing new
   to deploy or monitor. **This is the direction I would research first.** Beta is the risk.
2. **Clerk** — least work, best out-of-box UI, native FastAPI integration, but MAU-metered and
   lock-in.
3. **FastAPI-native sessions on Neon** — one language, no third party, full control, but you
   own password reset, email verification, session rotation and every security mistake.
4. **better-auth in a Vercel microservice** — what the research proposed. Most moving parts for
   the least gain now that option 1 exists.

**Cross-cutting consequence:** every option except Clerk's managed UI needs **transactional
email** for verification and password reset. Resend is currently a **Phase C** item. Opening
Phase B auth therefore pulls Resend into Phase B — a phase-boundary change the owner should
make deliberately, not discover mid-build.

---

## 3. Payments

### What the owner's research said

Drop Stripe (correct — Stripe does not operate in Pakistan). Use the manual "TRX ID" method:
display Easypaisa/JazzCash details, take the transaction ID, store it as `pending_verification`,
and approve by hand from the Neon dashboard. Upgrade to a local aggregator later.

### What I verified

| Claim | Verdict | Evidence |
|---|---|---|
| Stripe does not support Pakistan | ✅ | Stripe operates in ~46 countries; Pakistan is not among them |
| Manual mobile-wallet transfer is culturally normal in Pakistan | ✅ | Reasonable and consistent with the market |
| "You therefore need manual-only until you can afford an aggregator" | ❌ | **Overturned** — see below |

**The overturned claim, and it is the important one.** The research treated Stripe's absence as
forcing a manual-only start, and never considered **merchant-of-record** platforms in that light
even while naming the concept. Two of them work from Pakistan *today*:

- **Paddle** — primary source, Paddle Help Centre: *"Paddle works with software businesses
  anywhere in the world with the exception of the unsupported countries listed below."*
  Pakistan is **not** on that list. Paddle is merchant of record, so it calculates, collects and
  remits global sales tax; the seller has no sales-tax liability on Paddle transactions.
- **Lemon Squeezy** — primary source, `docs.lemonsqueezy.com/help/getting-started/supported-countries`:
  **Pakistan is explicitly listed** among countries with supported **bank payouts**. Also
  merchant of record.

Both mean: global card checkout for students, tax handled for you, no US/UK LLC, no foreign
bank account, **and no manual clicking**. That is strictly better than manual TRX for the
international audience, and it removes the "later upgrade" step entirely.

**Risks to carry:** Lemon Squeezy was acquired by Stripe and its own docs footnotes Stripe-dependent
payout mechanics — a continuity risk and a dependency worth knowing. Merchant-of-record also
means Paddle/LSQ is the seller of record to the customer, which changes branding and refund
handling. All of this needs checking against Paddle/LSQ onboarding requirements for a
CNIC-only, no-registered-business seller before it is treated as settled.

**Where the manual method still earns its place:** local Pakistani buyers who prefer wallet
transfer, and as a fallback if MoR onboarding refuses a seller without a registered business.
If kept, it must be approved from `psql` — a custom admin panel is on the `stack.md`
do-not-add list, and the research's implied "build a simple admin page" contradicts it.

### What the evidence supports (rough plan)

1. **Entitlement model first, payment rails second.** Products, orders, payments, entitlements —
   designed so a refund or a dispute revokes access without corrupting history, and so a manual
   approval and an automated webhook both write the same auditable record.
2. **Primary rail: Paddle or Lemon Squeezy** (merchant of record). Webhook-driven, signature
   verified, idempotent.
3. **Optional local rail: Safepay / PayFast** for PKR and local wallets — Safepay advertises
   per-transaction pricing with no setup or monthly fee.
4. **Fallback: manual Easypaisa/JazzCash TRX** with `psql` approval, adding a real audit trail
   (who approved, when, against which transaction ID).
5. **File delivery:** signed, expiring URLs from object storage. License keys remain a Phase C
   question; the research is right that they are a tax until link-sharing is observed.

---

## 4. RAG chat / "100% real multi-agent"

### What the owner's research said

Use Embedchain for ingestion (`.add()` / `.query()`), swap the local store for Pinecone for
deployment, wrap retrieval as a tool passed to an OpenAI Agents SDK agent, or use LlamaIndex +
Pinecone instead. Use `gpt-4o-mini` and `text-embedding-3-small` to keep cost near zero.

### What I verified

| Claim | Verdict | Evidence |
|---|---|---|
| Embedchain is the best free, beginner-friendly RAG framework | ❌ | **Deprecated.** Maintainers: *"Embedchain has been deprecated and is no longer actively maintained"* (mem0ai/mem0 issue #3740, closed wontfix); the project is now in maintenance mode inside Mem0 |
| The OpenAI Agents SDK code samples | ❌ | **The API does not exist as written.** There is no `openai_agents_sdk` module and no `Tool(name=..., input_schema=..., handler=...)` class. The real API is `from agents import Agent, Runner, function_tool` with a `@function_tool` decorator. Every sample the research gave would fail at import |
| Pinecone free tier: 2 GB, 1M reads/month, no credit card | ⚠️ | Outdated/imprecise. Pinecone has changed its free plan repeatedly (2025 changelog, "Opening up our free plan"); paid plans start around $20/mo. **More importantly it conflicts with `stack.md`, which specifies Qdrant** — adding it needs an ADR |
| Use `text-embedding-3-small` and a cheap model | ✅ | Correct and consistent with `stack.md` |
| Split ingestion (offline) from serving (deployed) | ✅ | Right shape, and the right instinct about ephemeral storage |

**The premise itself is wrong** — see §0. "The docs are tooooo much" is not true of this repo
yet: 36k words. The research was answering a question the project does not currently have.

### The genuinely useful standards research (from the one successful delegated run)

The RAG dossier that did come back is worth keeping, with its framing corrected (it was briefed
with my own wrong premise of "a few hundred thousand words", so its "you sit just above the
200k-token threshold" conclusion is wrong; its substance is sound):

- **"Multi-agent RAG" means three different things**, and conflating them is where the debate
  goes wrong: (1) orchestrator/router + narrow specialists; (2) one retrieval pipeline
  parameterised by mode — which is *not* multi-agent, it is routing; (3) a single agent in an
  agentic tool-use loop — also not multi-agent.
- **The evidence for extra agents is narrower than the marketing.** Anthropic's multi-agent
  research system beat single-agent Opus by **90.2%** on their internal eval — but their own
  analysis says **token usage alone explains 80% of the performance variance**, i.e. much of the
  gain is "spend more compute". They also state the counter-conditions: agents cost ~4× and
  multi-agent systems ~15× the tokens of chat, and multi-agent is a *bad fit* where agents must
  share context or where there are many dependencies between them.
- **OpenAI's guidance: "maximize a single agent's capabilities first."** Split into more agents
  when prompts fill with if/then branching, or when tools are overloaded — and the problem is
  tool *similarity*, not tool count.
- Sources: `anthropic.com/engineering/building-effective-agents`,
  `anthropic.com/engineering/multi-agent-research-system`,
  `anthropic.com/engineering/contextual-retrieval`,
  `openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/`.

### One synthesis the research missed entirely

**The OpenAI Agents SDK is provider-agnostic** — it supports the OpenAI APIs *and 100+ other
models*. That matters here because `stack.md` and ADR-0001 explicitly gate OpenAI as a
last-resort provider and prefer free tiers (Groq, Gemini, Together, Ollama). The owner's
instinct to use the Agents SDK does **not** commit the project to paying OpenAI, which the
research assumed it did when it said "the catch: OpenAI is not free".

### What the evidence supports (rough plan)

1. **Build RAG for the target corpus, not today's.** Hundreds of thousands of words is the
   corpus this is for. Ingestion, chunking and the vector-store choice are settled now, before
   there is a large corpus to re-ingest.
2. **Today's 36k words only mean the first version can be simple.** Full-context retrieval plus
   prompt caching gets a grounded chat in front of readers sooner without adding a vendor to
   `stack.md`, and 96 chunks retrieve well at this size. Keep retrieval behind one interface
   (the repo already has this pattern in `app/llm/registry.py`) so Qdrant — already named in
   `stack.md` — drops in behind it as the corpus grows, with no rewrite.
3. **Define "multi-agent" honestly.** The six UI modes map naturally to **routing over one
   pipeline**, which is what the UI already implies and what the evidence supports. A real
   orchestrator should be justified by prompts that branch or tools that overlap — not by the
   label. If the owner wants genuine multi-agent, the smallest honest version is one orchestrator
   plus specialised retrieval/generation agents behind it, with the routing-only version shipped
   first.
4. **Grounding and citation are non-negotiable regardless of architecture** — the preview UI
   already promises the reader "show you where every answer came from".

---

## 5. What is now blocked, and on what

- **Research pass 2 for all three features is thin in a specific way.** Pass 2 is defined as the
  *owner's own* comparative study — working through real products hands-on. What was supplied is
  model output from a single Gemini conversation, and several of its load-bearing specifics are
  demonstrably wrong (§2–§4). That is not a criticism of the owner; it is the exact failure mode
  Principle VIII exists to prevent, and it is why the principle makes the owner's own pass the
  blocking one and says a model's research is not a substitute for it.
- **Pass 1 could not be reliably delegated in this environment.** Six runs, one usable answer,
  and that one truncated. Either the CLI's long-research behaviour needs fixing, or the work
  goes to me directly. This needs the owner's call, because pass 1 was theirs to assign.

## 6. Decisions the owner needs to make

| # | Decision | Options | Why it gates |
|---|---|---|---|
| D1 | Auth provider | Neon Managed Better Auth (Beta) · Clerk · FastAPI-native · better-auth microservice | Sets the whole Phase B shape and whether a second runtime exists |
| D2 | Phase boundary | Is Resend pulled into Phase B for auth email? | Auth needs email; Resend is currently Phase C |
| D3 | Payment rail | MoR only (Paddle / Lemon Squeezy) · MoR + local gateway · manual-only | Determines whether the bookkeeping is automated or hand-clicked |
| D4 | RAG shape | Full-context first · vector index now | The corpus measurement makes "full-context first" the cheaper, more accurate start |
| D5 | "Multi-agent" meaning | Routing over one pipeline · genuine orchestrator + specialists | Prevents paying 15× tokens for a label |
| D6 | `stack.md` corrections | Fix the Phase A goal line (it promises RAG chat in Phase A; the table, README and CLAUDE.md all say Phase B); resolve the auth row; note that "Custom admin panel" rules out the manual-payment admin UI | `stack.md` is the source of truth; it currently contradicts itself |
| D7 | Do-not-add conflicts | The owner's research recommends **Supabase**, which `stack.md` explicitly bans, and adds **Pinecone** and **Clerk** | Each needs an ADR, not a default |

---

## 7. Provenance

- Corpus size: measured directly from `edu-site/docs/` this session.
- Stripe/Pakistan: Stripe global availability documentation; multiple 2026 country lists naming
  Pakistan as excluded.
- Paddle seller countries: `paddle.com/help/start/intro-to-paddle/which-countries-are-supported-by-paddle` (fetched, read directly).
- Lemon Squeezy payout countries: `docs.lemonsqueezy.com/help/getting-started/supported-countries` (fetched; Pakistan present).
- Clerk free tier: `clerk.com/pricing` and Clerk's own pricing-explained article (50,000 MRU; changed 5 Feb 2026).
- Neon Managed Better Auth: `neon.com/docs/auth/overview` (Beta).
- `fastapi-betterauth`: PyPI + `github.com/lukonik/fastapi-betterauth`.
- Embedchain deprecation: `github.com/mem0ai/mem0` issue #3740.
- OpenAI Agents SDK tool API: `openai.github.io/openai-agents-python/tools/`.
- Qdrant free tier: `qdrant.tech/pricing/` (1 GB RAM, 4 GB disk, free forever cluster).
- RAG architecture evidence: the Anthropic and OpenAI engineering sources cited in §4.
