# Chatbot — decisions brief for an architecture + planning pass

**Written:** 22 September 2026
**Status:** decisions are settled; no code and no spec exist yet.
**What this document is for:** hand this to a planning agent to produce the chatbot's
architecture and plan (spec → plan → tasks, per this repo's SDD flow). Execution then returns to
the original agent.
**What this document is not:** a plan, a spec, or a wish list. It is the set of decisions already
made, so the planner does not relitigate them.
**Read first:** `CLAUDE.md`, `stack.md`, `.specify/memory/constitution.md`.

---

## 1. What is being built

A grounded question-answering chatbot for the book at `thebridgebalance.app`. It answers student
questions, primarily from the book's own chapters, and shows where each answer came from.

**This is the first of three features.** Auth and payments are decided in principle and are out of
scope for this planning pass — **do not design them here**, but do not design anything that
forbids them either (§5 explains the seam).

**Not in scope for this pass:** login, the free-question gate, the paywall, saving chat history,
exams, progress tracking. All four arrive later.

---

## 2. Locked decisions — do not relitigate

| # | Decision | Notes |
|---|---|---|
| L1 | **Not multi-agent.** Six modes implemented as settings/variants on one agent. | The owner asked for "100% real multi agent", was shown that this option is explicitly *not* multi-agent, and chose it anyway. Upgradeable later; must not require a rewrite. |
| L2 | **Search/store: Qdrant.** | Already named in `stack.md`. Free tier: 1GB RAM, 4GB disk. Open source, so no lock-in. |
| L3 | **Model: DeepSeek v4.1 Flash, reached through the Command Code API key.** | Command Code exposes an **OpenAI-compatible** endpoint, so a Python backend can call it normally. Verified, not assumed. |
| L4 | **Build the brain first; the gate later.** | The grounded answering service is built and tested with no login in front of it. The login door, free counter and paywall are added afterwards. |
| L5 | **The student picks the mode per question**, and the mode decides whether the answer draws on the book or on general knowledge. | So the six modes are the product surface, not decoration. |
| L6 | **Every answer drawn from the book must show its source.** | This is already promised to readers in the existing preview UI and must be honoured. |
| L7 | **Eventually: login required, 10–20 free questions, only the cheap modes free.** | Deep Research and Deep Think are Pro-only, because they cost many times more per question. **Not built in this pass** — but the design must make it addable. |
| L8 | **Chat history is saved for paying users only.** | Arrives after payments. Not this pass. |
| L9 | **Pro sells features, never a chapter.** | Constitution Principle VI: the textbook is free forever, no paywall on content. |

---

## 3. Assumptions — correct these if wrong, otherwise treat as decided

- **A1 — Index everything published:** the chapters, plus the reference pages (glossary, FAQ,
  welcome). **Exclude `edu-site/parked/`** entirely — the credentials track is unpublished.
- **A2 — Re-indexing is a script you re-run** when chapters change. No automatic/CI pipeline yet.
- **A3 — The free allowance resets monthly.**
- **A4 — The corpus is small today and will grow by orders of magnitude.** 36,002 words across 31
  files right now (Stage 1 and Stage 2 are placeholders). The owner expects hundreds of thousands
  of words over the coming months. **Design for the target, ship something that works at today's
  size.**
- **A5 — No custom admin panel** (`stack.md` do-not-add list).

---

## 4. Open for the planner to decide

These are engineering calls, deliberately left to the architecture pass:

- Chunking strategy, chunk size, overlap, and whether headings are embedded as context.
- Embedding model and provider — note `text-embedding-3-small` is what `stack.md` currently names,
  but ADR-0001 gates OpenAI as *last resort* and prefers free tiers, so this is a genuine conflict
  to resolve rather than assume.
- Whether retrieval is dense-only or hybrid (dense + keyword), and whether reranking is worth it.
- Ingestion shape: where the offline ingest script lives, how it is run, and how the index is
  rebuilt.
- The retrieval seam — one interface in front of search, so Qdrant can be swapped or the corpus
  can outgrow a single context window without a rewrite.
- How the six modes are expressed: prompt variants, parameters, or tools.
- Prompt design, and how "show me your source" is represented in the API response.
- How the existing preview UI (`edu-site/src/components/ChatAssistant/`) is wired to a real API
  without breaking its current honesty guarantees.
- Rate limiting and abuse control at the API boundary.
- Evaluation: what minimal check proves answers are grounded and not invented.

---

## 5. Constraints from this repo the plan must respect

**Architecture and conventions**
- LLM access goes through the existing provider abstraction — `edu-site/api/app/llm/`
  (`base.py`, `registry.py`, `router.py`, `providers/*.py`). Routers get a client via
  `get_llm_client()`. **Extend this; do not replace it.** Provider SDKs are imported lazily.
- A new provider touches five files; `edu-site/api/README.md` lists them in order.
- `app/main.py` already wires a `chat` router. **Phase B routers currently raise
  `HTTPException(501)` with their Pydantic models already defined. Fill in the handler body in
  place — do not restructure the router or its models.**
- All config flows through `app/config.py` (Pydantic Settings). No environment reads in business
  code, no hardcoded model names, URLs or thresholds.
- Secrets never in code. `.env.example` documents every variable.
- Errors: named, typed, mapped to HTTP statuses at the router boundary.

**Product and governance**
- **Free tier is mandatory** (Constitution Principle I). Every component needs a documented free
  tier and a "when you would start paying" line.
- **Provider abstraction, no lock-in** (Principle II).
- **Do-not-add list is normative:** no Next.js storefront, no Supabase, no Tailwind/shadcn, no
  Prisma, no Bun/Deno, no Vercel Functions or Workers as backend, no custom admin panel, no
  tRPC/GraphQL, no third-party license-key service.
- **Apple-Design Purity** (Principle VII) for anything visible: tokens already live in
  `edu-site/src/css/` — match them, do not invent a new visual language.
- **Smallest viable change** (Principle V). No drive-by refactors.
- **Principle VIII (NON-NEGOTIABLE):** nothing is designed before two research passes. Pass 1
  (standards research) is done and summarised below. **Pass 2 — the owner's own hands-on
  comparison — is still outstanding** (§7). The plan should say plainly what it is waiting on.

**The existing frontend contract**
`edu-site/src/components/ChatAssistant/index.tsx` is a finished design with **deliberately no API
call anywhere**, and a comment saying there must not be one until the phase that owns it opens.
Phase B is now open, so it is being wired up — but note what it currently promises readers:
six modes with one-line descriptions; "Ask the book anything"; answers that show where they came
from; and an honest reveal that says nothing is transmitted while it is not switched on. **The
honesty behaviour must not become a lie** — if something is unimplemented, it must still say so.

**Quality gates — the plan's tasks must include these**
- Frontend: `npm run build` (a five-gate chain: `check:frontmatter` → `check:refs` →
  `check:chapter` → chapter manifest → search index → `docusaurus build`), plus `npm run typecheck`
  and `npm run lint`.
- Backend: `pytest -q`, `ruff check .`, `mypy app`.
- Both must be green before anything is considered done.

---

## 6. What pass 1 (standards research) established

- "Multi-agent RAG" names three different things, and conflating them causes bad design:
  orchestrator+specialists (truly multi-agent); one pipeline parameterised by mode (routing, not
  agents); and a single agent in a tool-use loop (also not multi-agent). **L1 chose the second.**
- Evidence for extra agents is narrower than the marketing. Anthropic's multi-agent system beat a
  single agent by 90.2% on their internal eval, but their own analysis attributes **80% of the
  variance to token spend alone**, and they note multi-agent systems use ~15× the tokens of chat
  and are a poor fit where agents must share context. OpenAI's guidance: *"maximize a single
  agent's capabilities first."*
- Sources: `anthropic.com/engineering/building-effective-agents`,
  `anthropic.com/engineering/multi-agent-research-system`,
  `anthropic.com/engineering/contextual-retrieval`,
  `openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/`.
- A fuller write-up, including the discarded options and the verification of the owner's own
  research, is in `_scratch/platform-research/00-CONSOLIDATED-RESEARCH-AND-ROUGH-PLAN.md`.

---

## 7. What is still outstanding before a spec can be finalised

**The owner's own hands-on comparison (research pass 2).** The owner is going to use real products
hands-on and hand over their notes. Until that lands, the spec is provisional — this is the repo's
own rule, not a preference. Their shortlist is NotebookLM, Claude/ChatGPT with the chapters
uploaded, Perplexity, Khanmigo, and a dev-docs assistant (Mintlify, ReadMe's Ask AI, Fern's Ask
Fern, or Kapa.ai).

**Not a blocker for planning.** The plan can be written now; the spec's design details should be
revisited when the notes arrive.

---

## 8. What the planner should produce

1. A **spec** for the chatbot only, at `specs/<next-number>-chatbot/spec.md`, following
   `.specify/templates/spec-template.md` and the repo's conventions (`specs/README.md`).
2. A **plan** at `specs/<next-number>-chatbot/plan.md` addressing scope, key decisions with
   trade-offs, interfaces/API contracts, non-functional requirements, data management, risks, and
   evaluation — per the architect guidelines in `CLAUDE.md`.
3. **Tasks** at `specs/<next-number>-chatbot/tasks.md`, ordered and testable, each small enough to
   execute and verify, with the quality gates from §5 wired in.
4. **One ADR** for the chatbot's search/retrieval architecture, since that is an
   architecturally significant, long-lived choice.

**Do not:** write code, modify the site or backend, relitigate §2, design auth or payments, or
assume the owner's outstanding research has been done.

---

## 9. Decision log (for traceability)

Everything in §2 was decided by the owner on 22 September 2026, in a structured question round
covering auth, chatbot, payments and process. The chatbot-relevant answers were:

- Search system → Qdrant.
- Models → DeepSeek v4.1 Flash via the Command Code API key (for this month; the key changes next
  month, so it must be a config value, never hardcoded).
- Multi-agent meaning → six modes as settings on one agent.
- Chatbot scope → the student chooses each time; the mode decides book vs general knowledge.
- Who can chat → logged-in students, some free questions then paid.
- Free allowance → 10–20 questions, cheap modes only.
- Build order → the brain first, the login/paywall gate after.
- Chat history → paying users only.
- Spec layout → three separate specs (auth, chatbot, payments); this is the chatbot's.
- Exams and progress tracking → deferred.
