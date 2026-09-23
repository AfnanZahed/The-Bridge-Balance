# ADR-0010: Agentic AI Taught Inside Software Engineering: the Three-Stage Structure

> **Scope**: This records the curriculum-shape decision cluster of 22 September 2026 — how many stages the book has, what each one teaches, where agentic AI sits, how an agentic application attaches to a software-engineering topic, and which neighbouring structures were tried and dropped. It replaces, as the live structure, the stage counts recorded in canon earlier the same day.

- **Status:** Accepted
- **Date:** 2026-09-22
- **Feature:** `specs/011-curriculum-redesign/`
- **Context:** See below.

## Context

The book takes one reader — a beginner who starts from zero — to expert level, and there is no separate senior reader in any stage (`canon/course-structure.md` CS-1, CS-2). The shape of the course was re-planned twice in one day. The structures tried numbered the stages five, then four, and each carried agentic AI as a stage of its own. The question still open was **where agentic AI belongs.**

The project owner settled it on 22 September 2026: **agentic AI is not a separate discipline.** It is software engineering with an LLM as one component; everything else in an agentic system — functions, loops, APIs, databases, auth, async work, deployment — is ordinary SE (`canon/thesis.md`, "Agentic AI inside SE"). So agentic AI is taught inside SE, never as its own stage, and it runs through both mastery stages.

The decision also had to say what "inside" means, because teaching an SE topic and an agentic application together can thin both. The owner's answer was an order (SE first, at full depth) and a condition (only where the concept genuinely pairs), with the pairing types named so the two could be told apart.

## Decision

**The course has three stages. Agentic AI is taught inside software engineering, not as a stage of its own.** The decision is one cluster; its parts are:

**1. The three stages, by name.**

| Stage | Name | What it teaches |
|---|---|---|
| 0 | Introduction to SDE | Theory and the first practical basics (CS-11, CS-13) |
| 1 | SDE Mastery (AI-Driven) | Basic to intermediate SE, with basic to intermediate agentic applications (CS-14) |
| 2 | SDE Mastery (AI-Native) | Advanced SE, with advanced agentic applications (CS-15) |

The old "; Agentic AI" suffix is dropped from Stage 2, because agentic AI now runs through both mastery stages (CS-15).

**2. Agentic AI runs through Stages 1 and 2, and is never a stage** (CS-12).

**3. SE comes first, at full depth.** An agentic application is added only where the concept genuinely pairs; when the two compete for depth, SE wins (CS-19). This serves the triad the book is built on: using AI, building foundations, building AI (`canon/thesis.md`).

**4. Each pairing names its delta** — what is genuinely new about the agentic version (CS-32).

**5. The pairing types: Substrate, Surface and Practice** (CS-21) — a main philosophy of the book.

| Type | Meaning | Examples | How the topic is applied |
|---|---|---|---|
| Substrate | The SE concept is the machinery an agent is built from | Functions become tools; loops become the agent loop; databases become memory; authorization becomes tool permissions; async work becomes streaming | Built by hand in a manual project, then built as agent machinery |
| Surface | The SE concept is what you build around an agent | Chat interfaces; frontend-backend integration; deployment | Built by hand, then built again around an agent |
| Practice | No agentic twin exists | UI/UX, branding, Figma, logos, animation | Built by hand; AI appears only as the tool the student works with |

**6. The one exception: the LLM itself** (CS-22). It is the only component with no SE ancestor, so it is taught on its own terms.

**7. Credentials is a parallel track, not a stage** (CS-16). It maps third-party credentials to what is being learned, is disabled for now, and its design is postponed.

**8. The zero-knowledge floor names Stages 0–1** (CS-31). Stage 0 and Stage 1 assume a reader who has never programmed; Stage 2 builds on Stage 1.

**9. No separate SDK-specific Parts** (CS-33).

**10. Real agents from day one** — working agents, never toy versions, on free providers (Groq, OpenRouter, and others the project owner researches). No paid keys, no local models (CS-23).

**11. Building with models, not building models.** ML, DL and NLP (training, fine-tuning) are out of scope, at least for now (CS-27).

**12. Who writes the code.** Both, in order: the student writes it by hand first, then builds it with a coding agent (CS-20).

**13. "Using AI" becomes the working medium.** Old Stage 3 material (coding agents such as Claude Code and opencode; prompt and context engineering) becomes Stage 1's working medium, used for both SE and agentic implementation (CS-24).

**14. Navigation at Course level** — a difficulty band inside each stage (CS-17). The project owner places each topic in Stage 1 or Stage 2 at authoring time (CS-18); topics, sub-topics and technicalities are designed at authoring time, not now (CS-28).

## Consequences

### Positive

- **Agentic AI is taught where its machinery is actually learned.** Functions, loops, databases, auth and async work are SE the student builds by hand; the agentic version then reuses that understanding instead of replacing it (`canon/thesis.md`).
- **Depth is protected by a rule, not by judgement.** When an SE topic and its agentic twin compete for depth, SE wins (CS-19).
- **The two halves reinforce each other.** Every SE topic is practised in a manual project first, and the agentic application then shows what changes once an LLM is one of the components.
- **The one component with no SE ancestor still gets its own treatment.** The LLM is the single exception (CS-22).
- **The pairings are named, so they can be checked.** Substrate, Surface and Practice give authors a vocabulary, and CS-32 requires every Substrate and Surface pairing to name its delta.
- **Reachability.** Real agents on free providers (CS-23) keep every exercise runnable without a paid key.
- **One reader, three stages.** The three-stage list keeps the single-beginner model of CS-1 and CS-2 and removes a stage boundary that would have separated "SE" from "agentic AI".

### Negative

- **The CS50 promises on the reader pages now point at a disabled track.** With Credentials disabled (CS-16), pages that promise CS50 and Harvard credentials advertise something the book is not currently delivering. This is an open question, CS-Q8, postponed with the Credentials design.
- **The site must be restructured again, immediately.** The four-stage pass had just landed; the three-stage decision means the stage folders, the sidebar, the five hand-written stage lists, the stage icons and colours, and the ledger paths all change a second time in one day (the site pass, `specs/011-curriculum-redesign/tasks.md` T017 to T020).
- **Two layers per topic cost authoring effort.** Every concept now needs its SE treatment first and an agentic application second, only where it genuinely pairs — more work than teaching either alone.
- **Free providers set a ceiling.** The free tier (Groq, OpenRouter) bounds what the agents in the book can do, and the provider list is still to be researched (CS-23).
- **A structure fixed while its contents stay open.** Topics and sub-topics are placed at authoring time (CS-18, CS-28), so the shape is decided now and the contents are not.

## Alternatives Considered

**A. Agentic AI as a stage of its own (the old five-stage plan).** The five-stage list carried *Mastering AI Coding Agents* and *Engineering Autonomous AI Agents* as Stages 3 and 4. Rejected: it makes a discipline a stage when its components (functions, loops, APIs, databases, auth, async work, deployment) are ordinary SE. Teaching it separately either repeats the SE or teaches the agent with no SE beneath it.

**B. The four-stage structure decided and landed earlier the same day** — Stage 0 Introduction to SDE, Stage 1 SDE Mastery (AI-Driven), Stage 2 Credentials, Stage 3 SDE Mastery (AI-Native; Agentic AI). Superseded the same day: it kept agentic AI as a stage of its own (the "; Agentic AI" suffix on Stage 3) and kept Credentials as a stage. The decision dropped the suffix, moved Credentials to a parallel track, and folded agentic AI into both mastery stages.

**C. Separate SDK-specific Parts.** Rejected (CS-33), for the project owner's two reasons: someone who wants only SE content can already find it elsewhere, so the book's value is SE and agentic work taught together; and AI models and SDKs change so fast that syntax-specific content stops mattering after a while, so the book does not design around re-recording it.

## References

- Canon: `curriculum-state/canon/course-structure.md` §5, CS-12 to CS-33 (and the superseded notes above them); `curriculum-state/canon/thesis.md`, "Agentic AI inside SE"
- Feature Spec: [`spec.md`](../../specs/011-curriculum-redesign/spec.md)
- Implementation Plan: [`tasks.md`](../../specs/011-curriculum-redesign/tasks.md) T013 to T020
- Constitution: v3.1.0 (amended 2026-09-22)
- Related ADRs: none — the stage structure is recorded in canon, not in an earlier ADR
- Evaluator Evidence: [PHR 0135](../prompts/general/0135-fold-agentic-ai-into-se-stages.general.prompt.md), [PHR 0136](../prompts/general/0136-owner-answers-on-the-agentic-merge.general.prompt.md), [PHR 0137](../prompts/general/0137-finalize-the-agentic-inside-se-record.general.prompt.md), [PHR 0138](../prompts/general/0138-floor-delta-naming-and-agenda-update.general.prompt.md), [PHR 0139](../prompts/general/0139-continue-after-the-command-code-update.general.prompt.md), [PHR 0140](../prompts/general/0140-site-pass-go-ahead-and-adr-yes.general.prompt.md)
