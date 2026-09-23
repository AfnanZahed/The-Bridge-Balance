---
id: 0142
title: Gate-2 research verified, rough plan drafted
stage: general
date: 2026-09-22
surface: agent
model: claude-sonnet-5
feature: none
branch: main
user: owner
command: none
labels: ["auth", "rag", "payments", "research-and-comparison", "verification", "paddle", "lemon-squeezy", "neon-auth", "corpus-size"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - _scratch/platform-research/00-CONSOLIDATED-RESEARCH-AND-ROUGH-PLAN.md
  - _scratch/platform-research/pass1-rag.md
  - _scratch/platform-research/repo-state-before.txt
  - _scratch/platform-research/repo-state-after.txt
  - history/prompts/general/0142-gate-2-research-verified-rough-plan.general.prompt.md
tests:
  - none
---

## Prompt

the answer to your question: nothing is going to be built yet, not even the specs are going to be written, just raw research and my own understadning of things. and rough planning.

my research with gemini (gate 2): ""is there any easy to use framework or tool, 100% free, beginner friendly, which I can use for the 'RAG' in my chatbot, the docs from where the chatbot will speak are toooo much. but i don't know rag. actually, I am building my own custom agent chatbot with OpenAI Agents SDK, tell me the solution for that.

[Full Gemini conversation supplied, covering: Embedchain + Pinecone + OpenAI Agents SDK for RAG; LlamaIndex + Pinecone as the alternative; Pinecone free-tier claims; Clerk / Supabase / Streamlit as account options; better-auth as a Vercel microservice with a fastapi-betterauth Python bridge, plus Neon Auth and Clerk as fallbacks; and payment via a manual Easypaisa/JazzCash "TRX ID" flow because Stripe does not operate in Pakistan. Reproduced in full in the conversation, not truncated here.]

## Response snapshot

No code and no specs were written. Scope was held to raw research plus rough planning, as instructed.

**Pass 1 (DeepSeek via Command Code) largely failed and I fell back to direct work.** Six delegated
research runs were attempted; one returned usable output (RAG), and it was truncated mid-sentence.
Auth failed four times (three distinct prompts, one run solo) and payments twice, all with exit code 7
and no stdout or stderr. Two early captures produced 505 MB and 577 MB NDJSON logs, because the CLI
re-serialises the entire accumulated message on every token delta; both were deleted, freeing over 1 GB.
No delegated run wrote to the repository — verified by diffing `git status --porcelain` snapshots taken
before and after, which is the check this project has needed since a delegated run previously fabricated
a PHR into the repo.

**Pass 2 (the owner's Gemini research) was verified claim by claim, and several load-bearing claims are
wrong:**

- Embedchain — the first recommendation — is **deprecated** (mem0ai/mem0 issue #3740, closed wontfix).
- The OpenAI Agents SDK code samples use an API that does not exist (`openai_agents_sdk`, a `Tool(...)`
  class with `input_schema`/`handler`). The real API is `from agents import Agent, Runner, function_tool`.
- "You must go manual because Pakistan cannot use Stripe" is **overturned**: Paddle supports sellers
  "anywhere in the world" except a listed set that omits Pakistan, and Lemon Squeezy lists Pakistan
  under supported bank-payout countries. Both are merchant-of-record, so global tax is handled.
- Verified as correct: `fastapi-betterauth` exists; Neon Managed Better Auth exists (Beta); Clerk's free
  tier is 50,000 monthly retained users; Stripe does not support Pakistan; the offline-ingestion /
  online-serving split is the right shape.

**Headline finding, measured locally and present in neither research pass:** the corpus is
**36,002 words across 31 files** (`edu-site/docs/`), roughly 48k tokens, with Stage 1 and Stage 2
existing only as 688 words of placeholders. The RAG problem the research set out to solve does not yet
exist; full-context retrieval with prompt caching is simpler, cheaper and more accurate than a vector
pipeline at this size, and the vector index can arrive behind a seam when the corpus grows.

Also captured: the OpenAI Agents SDK is provider-agnostic, so it does not commit the project to paying
OpenAI — which contradicts the research's cost framing and matters given ADR-0001 gates OpenAI last.

Seven owner decisions were left open in the write-up (auth provider, phase boundary for Resend, payment
rail, RAG shape, meaning of "multi-agent", `stack.md` self-contradictions, do-not-add conflicts).

## Outcome

- ✅ Impact: Three features researched rather than built; one false premise (corpus size) and one false blocker (Pakistan cannot take automated payments) removed before any architecture was chosen.
- 🧪 Tests: none — no code changed and no repo gate was run.
- 📁 Files: consolidated research + rough plan in `_scratch/platform-research/`, the one usable pass-1 dossier alongside it, repo-state snapshots, and this PHR. No file under `edu-site/`, `specs/`, `curriculum-state/` or `history/adr/` was touched.
- 🔁 Next prompts: owner answers D1–D7; then spec work, with each feature's research promoted into `specs/<NNN>/research.md`.
- 🧠 Reflection: the most valuable output of this exchange was a measurement, not a research pass — 36k words. Both research passes (mine delegated, and the owner's) had accepted "the docs are too much" as a given and built elaborate architecture on top of it.

## Evaluation notes (flywheel)

- Failure modes observed: (1) Command Code delegated research is unreliable here for long jobs — 5 of 6 runs died with exit 7 and no output; (2) `--output-format json` is unusable for long outputs at this size, producing quadratic megabyte-scale logs; (3) merging stderr with `2>&1` makes PowerShell treat the CLI's banner as a terminating error; (4) a model-supplied research pass contained fabricated library APIs and a deprecated library as its primary recommendation.
- Graders run and results (PASS/FAIL): not run.
- Prompt variant (if applicable): the auth brief was shortened on the fourth attempt in case prompt content was the trigger; it failed identically, so content was not the cause.
- Next experiment (smallest change to try): run one delegated research job at a time in `--output-format json`, filtering the stream to the final `result` line only, so the trace survives without the quadratic log — then confirm whether exit 7 is a concurrency, quota or timeout condition.
