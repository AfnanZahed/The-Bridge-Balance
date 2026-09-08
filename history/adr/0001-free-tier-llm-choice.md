# ADR-0001: Free-Tier LLM Choice (No OpenAI Lock-in)

- **Status:** Accepted
- **Date:** 2026-08-17
- **Feature:** book-foundation
- **Context:** The Bridge Balance platform spec lists OpenAI as the default LLM and embedding provider (text-embedding-3-small, GPT-4o-class). The project owner has stated a hard constraint: every component must remain on a free tier (or paid only at scale), and OpenAI's per-token cost model is not acceptable as a default. A pluggable provider abstraction is required so the platform never depends on a single vendor.

<!-- Significance checklist
     1) Impact: locks in cost structure, vendor risk, and ability to negotiate — yes.
     2) Alternatives: 6+ providers considered with real tradeoffs — yes.
     3) Scope: cross-cuts chatbot, translation, personalization, embeddings — yes.
     All three true → ADR justified. -->

## Decision

1. **No OpenAI by default.** The shipped default is `LLM_PROVIDER=none`, which boots the backend but refuses every completion with HTTP 503 and a link to provider docs. OpenAI remains a *supported* provider, gated behind an explicit `LLM_PROVIDER=openai` setting and an env-var flag.
2. **Pluggable provider abstraction.** All chat / translation / personalization calls go through `app.llm.LLMClient.generate(...)`. Provider SDKs are imported lazily inside their modules — the app never requires an SDK it isn't using.
3. **Provider preference order** (chosen when LLM feature is in scope):
   1. **Ollama** (self-hosted, free; needs local RAM/VRAM).
   2. **Groq** (free tier, fast inference).
   3. **Gemini** (free tier, 15 RPM / 1M TPM / 1500 RPD).
   4. **Together** (free credits on signup; many open models).
   5. **DeepSeek** (very cheap, not free; useful fallback).
   6. **OpenAI** (last resort; only when a feature specifically requires it).
4. **Embeddings** follow the same pattern. Default is `EMBEDDING_PROVIDER=none`. First preference when wired up: **HuggingFace sentence-transformers** (free, self-hosted; `all-MiniLM-L6-v2`).
5. **Phase A**: the abstraction ships, but no provider is wired. The textbook is the deliverable; the LLM feature is deferred to Phase B.
6. **Introspection endpoints** (`GET /llm/status`, `GET /llm/providers`) expose which provider is active and the list of supported providers. This keeps the docs and the backend in sync.

## Consequences

### Positive

- **No surprise bills.** The default `none` provider cannot spend money. A misconfigured deployment fails closed, not open.
- **Vendor portability.** Switching providers is a config change, not a code change.
- **Negotiating power.** When/if we add a paid provider, the alternatives are visible and switchable.
- **Free-tier sustainability.** Realistic Phase A cost: $0/month. Phase B with <100 paying customers stays well inside free tiers across Groq / Gemini / Qdrant / Neon.

### Negative

- **Operational complexity.** Each provider has its own quirks (rate limits, model names, streaming APIs). The abstraction layer is the price of not committing.
- **Feature drift.** Some providers support tool calling, structured outputs, or streaming that others don't. The LLMClient interface stays narrow on purpose; richer features are added per-provider when needed.
- **Self-hosted Ollama burden.** If Ollama is the chosen provider, the dev/prod host needs RAM/VRAM — not free for everyone.
- **No single "official" provider** for marketing copy. The brand says "free," not "powered by X."

## Alternatives Considered

**Cluster A: lock-in to one vendor**
- *OpenAI-only* — fastest path; highest cost; rejected per project constraint.
- *Anthropic-only* — same shape; rejected.

**Cluster B: hosted aggregator**
- *OpenRouter* — single API for many models; pay-as-you-go; not strictly free. Useful as a future fallback but doesn't satisfy the "free default" requirement.
- *LiteLLM* — self-hosted proxy; adds an extra service to operate; deferred.

**Cluster C: free-first, multi-provider** *(chosen)*
- *Ollama + Groq + Gemini + Together + DeepSeek + OpenAI-as-last-resort.*
- *Pluggable abstraction with `none` default.* Ships today.
- Tradeoff: providers differ in quality, latency, and rate limits; we accept that in exchange for cost control.

**Cluster D: local-only**
- *Ollama-only.* Simplest; but limits quality on harder tasks (translation nuance, code reasoning). Rejected as a default; supported as an option.

## References

- Feature Spec: `specs/001-book-foundation/spec.md` (to be created via `/sp.specify`)
- Implementation Plan: `specs/001-book-foundation/plan.md` (to be created via `/sp.plan`)
- Provider matrix: `edu-site/docs/llm-providers.md` (rendered in the textbook)
- Live introspection: `GET /llm/status` and `GET /llm/providers`
