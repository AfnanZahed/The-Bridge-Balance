# Canon — thesis, stages, invariants

Read this before drafting anything. It is short because it is the part that must
never drift.

## The thesis

> AI has made implementation cheap. Engineering still decides what should be
> built, what may be changed, how failure is contained, and who owns the result.
> The discipline that bridges the two is **Spec-Driven Engineering**: the
> engineer specifies intent and boundaries, the AI implements within them, and a
> human verifies before ownership.

Every version of every lesson carries this claim. Register changes; the claim
does not.

## The two extremes

The site is named for the bridge between them. A lesson that shows only one
failure mode teaches half a discipline.

- **Over-caution.** Refusing agentic AI outright, and losing the leverage the
  discipline exists to capture.
- **Over-trust.** Handing an agent the keys with no spec and no verification —
  vibe coding without the engineering half.

A short chapter may compress both into one contrasting sentence. Neither may be
dropped.

## The four stages

Compiled from `The Bridge Balance/Official docs/curriculum_1.md`'s four stage
sections (`## STAGE_01 // FOUNDATIONS` through `## STAGE_04 // AUTONOMOUS
SYSTEMS`) — not a single table sitting verbatim anywhere in that file.
**Name** is each section's own stage title. **Focus** is usually that
section's `Topics Covered` list, condensed — except Stage 2, whose Focus is
its `the solution` paragraph (the two Harvard certs), not its own `Topics
Covered` list (CS50P/CS50W's syllabus items — functions, loops, HTML/CSS, and
so on — which describe what the certification courses cover, not what this
stage of *the book* is about). Stage 3 draws from both: the tool list is
quoted from `the solution`, the discipline list is condensed from `Topics
Covered`. **Re-derive the table from those sections; do not paraphrase it from
memory.** An earlier framework listed Stage 3 as "Cursor, Claude Code, Codex,
Antigravity" — Codex appears nowhere in the official doc and Cursor belongs to
Stage 1's tooling list.

| Stage | Name | Focus |
|---|---|---|
| 1 | Spec-Aware Vibe Engineering Foundations | Architecture, dev environment, core programming, packages, OOP, Git/GitHub, frontend, UI/UX, backend, auth, async/realtime, databases, personal branding |
| 2 | Credible Validation Through International Certification | Harvard CS50P and CS50W |
| 3 | Mastering AI Coding Agents | "OpenClaw, coding agents like Claude Code, OpenCode, and AI-first IDEs like Antigravity"; prompt / context / loop engineering; CLAUDE.md, AGENTS.md; skills, MCP servers, workflows |
| 4 | Engineering Autonomous AI Agents | AI agents, RAG, tool calling, task automation, LLM integration, evaluations, MCP, frameworks (OpenAI Agents SDK, Claude Agents SDK, LangGraph), multi-agent systems |

A lesson names its stage at least once. A reader arriving from a shared link or
a search result has no site chrome to orient them.

## The six invariants

Every chapter carries all six, or it is not publishable. The only question is
whether each one is present.

| Invariant | What it means here |
|---|---|
| **Thesis** — specify, bound, verify, own | Present in the chapter, not merely implied by the stage |
| **Problem** — the misconception this chapter corrects | May compress to a clause, never to zero. Station 0 usually locates it: a Register 4 name *is* the misconception |
| **Two extremes** — over-caution and over-trust, made concrete to this topic | May compress, never omit either side |
| **Solution** — the specific SDE move that resolves the tension | Stated, not gestured at |
| **Stage reference** — which of the four this belongs to | A phrase is enough |
| **Safety floor** — the chapter's non-negotiable responsibility statement | **Never** cut where the topic warrants one |

**Mechanical tell.** Delete any sentence from the draft. If all six are still
present, that sentence was padding and should already have been gone. If one
disappears, the draft was cutting the wrong thing.

## The safety floor

A `<Callout type="warning" title="Safety floor">` wherever the topic touches
execution, deployment, credentials, or anything a reader could ship without
checking. Fixed component, fixed title, so the gate can prove it survived.

**One wording, written for both readers.** There is one register, and softening is a violation rather than a
compression — "verify before shipping" becoming "consider reviewing" is a
different claim, not a gentler one.

The floor states the responsibility plainly enough that a beginner acts on it
and precisely enough that a senior cannot dismiss it as boilerplate. From the
intro:

> Whatever the agent writes, it isn't done until you have checked it. Agent
> output is unverified by construction, and "the agent generated it" is not an
> acceptable postmortem finding.

## Source discipline

Cite only the canonical source list in `edu-site/docs/intro.md` and the three
official docs (`problem_statement.md`, `solution_statement.md`,
`curriculum.pdf`). A newly-found source may be *proposed* with a one-clause
rationale for what it establishes that nothing on the list does — it is a
proposal for the editor, never a unilateral addition.

Never invent a statistic, incident, citation, or claim about what an official
doc says. If a source is unavailable, stale, disputed, or retracted: stop and
surface it. Fall back to the official docs.

Every statistic carries its year inline in the body — "Veracode's 2025 report
found…", not "45% of AI code…". Staleness then becomes visible to the reader
instead of accruing silently.
