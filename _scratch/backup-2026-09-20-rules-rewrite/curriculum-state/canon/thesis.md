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

## Engineering over development

**Development** is producing the implementation — the syntax, the working
code. **Engineering** is the judgment around it: specify, bound, verify, own.
AI has made Development cheap. It has not made Engineering cheap, and no
lesson may imply otherwise.

The reader's own stage is Engineering. AI's stage is wider — it contributes
to Development by implementing, and contributes to Engineering by drafting
and proposing — but ownership of Engineering's judgment stays with the
reader, regardless of what a lesson's own framework for the loop looks like.

This corrects a specific, common misconception: that competence in this
field means fast, confident typing at a keyboard. Source:
`The Bridge Balance/Official docs/solution_statement.md`, Part I, "The
Learning Model — Engineering Over Development" — coding syntax is being
commoditized; specification and system design are not.

Every lesson that discusses what the work actually is carries this
distinction — not as a slogan, but as the reason the six invariants put
judgment on one side of the loop and execution on the other.

## The two extremes

The site is named for the bridge between them. A lesson that shows only one
failure mode teaches half a discipline.

- **Over-caution.** Refusing agentic AI outright, and losing the leverage the
  discipline exists to capture.
- **Over-trust.** Handing an agent the keys with no spec and no verification —
  vibe coding without the engineering half.

A short chapter may compress both into one contrasting sentence. Neither may be
dropped.

## Reading and understanding literacy

Of everything this book covers, only **Programming** is where the two extremes actually fight. MCP servers, agentic AI, certifications, and the history of the field are comparatively uncontroversial; the tension over-caution and over-trust create is concentrated almost entirely in the act of writing and shipping code.

**Reading and Understanding Literacy** is this book's resolution for that specific fight: the ability to read code — whoever or whatever wrote it — and judge it well enough to verify it and take ownership. It keeps over-trust's real argument (AI implements faster than a human typing) without its failure mode (shipping what was never checked), and it keeps over-caution's real argument (rigor matters) without its failure mode (refusing the leverage AI offers). Spec-Driven Engineering cannot be completed without it: a spec you cannot verify against is a spec you are trusting blindly, which is over-trust wearing a different name.

The literacy has two roots, not one. Source: `The Bridge Balance/Official docs/solution_statement.md`, which already names the traditionalist trap (over-caution) and the vibe-coder trap (over-trust), and names **specification poverty** — lacking the vocabulary and system literacy to articulate intent — as the failure mode upstream of both. Hoare's 1969 axiomatic-basis paper established that a specification is a first-class object code can be checked against; that is the half of this literacy that compares output to stated intent. Parnas's 1972 boundaries paper established that a module's interface, not its internals, is what makes another party's code — a colleague's, or an agent's — comprehensible at all; that is the half that makes reading possible in the first place. Neither stands alone as this literacy's sole ancestor.

Stage 0 introduces both SDE and this literacy as a paired philosophy, before any code is written. Stage 1 is where it is exercised, not re-taught: every technical skill in Stage 1 assumes the reader is building the habit of reading before trusting. Stage 2 depends on the same habit to pass certification work that is graded, not merely reviewed.

## The stages

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
| 0 | Orientation Through Computing History | The history of computing and software, read chronologically from binary through today's AI-coding-agent era; Spec-Driven Engineering and Reading & Understanding Literacy as the philosophy Stage 1 depends on. |
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
| **Stage reference** — which stage this belongs to | A phrase is enough |
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

Cite only the canonical source list in `edu-site/docs/intro-5-spec-driven-engineering.md` and the three
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
