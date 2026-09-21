# Canon — thesis, stages, invariants

Read this before drafting anything. It is short because it is the part that must
never drift.

> **Revised 2026-09-20.** Three rules in this file were reversed by the owner:
> the six invariants no longer bind every chapter, the "mechanical tell" that
> classified every warm sentence as padding is deleted, and statistics no longer
> carry their year inline in the prose. `corrections.md` §10–§13 has the record.

## The thesis

> AI has made implementation cheap. Engineering still decides what should be
> built, what may be changed, how failure is contained, and who owns the result.
> The discipline that bridges the two is **Spec-Driven Engineering**: the
> engineer specifies intent and boundaries, the AI implements within them, and a
> human verifies before ownership.

This is the book's claim. **It is not a sentence that must appear in every
chapter.** Where and how the reader meets it is a placement decision, made per
stage — see "The six invariants" below.

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

A lesson that discusses what the work actually is carries this distinction. A
lesson about how a switch holds a number does not.

## The two extremes

The site is named for the bridge between them.

- **Over-caution.** Refusing agentic AI outright, and losing the leverage the
  discipline exists to capture.
- **Over-trust.** Handing an agent the keys with no spec and no verification —
  vibe coding without the engineering half.

**Where they belong.** In the chapters that are actually about working with AI.
Forcing both extremes into a chapter about binary, or about what a compiler
does, is what produced beginner pages carrying sentences about agent keys and
shipping unverified output. A stage must teach both extremes somewhere; a
chapter must not be bent to carry them.

## Reading and understanding literacy

Of everything this book covers, only **Programming** is where the two extremes actually fight. MCP servers, agentic AI, certifications, and the history of the field are comparatively uncontroversial; the tension over-caution and over-trust create is concentrated almost entirely in the act of writing and shipping code.

**Reading and Understanding Literacy** is this book's resolution for that specific fight: the ability to read code — whoever or whatever wrote it — and judge it well enough to verify it and take ownership. It keeps over-trust's real argument (AI implements faster than a human typing) without its failure mode (shipping what was never checked), and it keeps over-caution's real argument (rigor matters) without its failure mode (refusing the leverage AI offers). Spec-Driven Engineering cannot be completed without it: a spec you cannot verify against is a spec you are trusting blindly, which is over-trust wearing a different name.

The literacy has two roots, not one. Source: `The Bridge Balance/Official docs/solution_statement.md`, which already names the traditionalist trap (over-caution) and the vibe-coder trap (over-trust), and names **specification poverty** — lacking the vocabulary and system literacy to articulate intent — as the failure mode upstream of both. Hoare's 1969 axiomatic-basis paper established that a specification is a first-class object code can be checked against; that is the half of this literacy that compares output to stated intent. Parnas's 1972 boundaries paper established that a module's interface, not its internals, is what makes another party's code — a colleague's, or an agent's — comprehensible at all; that is the half that makes reading possible in the first place. Neither stands alone as this literacy's sole ancestor.

Stage 0 introduces both SDE and this literacy as a paired philosophy, before any code is written. Stage 1 is where it is exercised, not re-taught. Stage 2 depends on the same habit to pass certification work that is graded, not merely reviewed.

> **These are internal names, not reader-facing ones.** "Reading and
> Understanding Literacy", "specification poverty", "Hoare's 1969 axiomatic-basis
> paper", "Parnas's 1972 boundaries paper" are this project's own vocabulary for
> its own ideas. **Never put one in front of a reader without deciding
> deliberately what to call it for them, and asking the owner first.** A chapter
> that says "it ends there with a second thing beside it: reading and
> understanding literacy" has handed the reader an internal label and explained
> nothing. `corrections.md` §9 is the general rule.

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
| 0 | Introduction to Computing: From Switches to AI Agents | The history of computing and software, read chronologically from binary through today's AI-coding-agent era; Spec-Driven Engineering and Reading & Understanding Literacy as the philosophy Stage 1 depends on. |
| 1 | Spec-Aware Vibe Engineering Foundations | Architecture, dev environment, core programming, packages, OOP, Git/GitHub, frontend, UI/UX, backend, auth, async/realtime, databases, personal branding |
| 2 | Credible Validation Through International Certification | Harvard CS50P and CS50W |
| 3 | Mastering AI Coding Agents | "OpenClaw, coding agents like Claude Code, OpenCode, and AI-first IDEs like Antigravity"; prompt / context / loop engineering; CLAUDE.md, AGENTS.md; skills, MCP servers, workflows |
| 4 | Engineering Autonomous AI Agents | AI agents, RAG, tool calling, task automation, LLM integration, evaluations, MCP, frameworks (OpenAI Agents SDK, Claude Agents SDK, LangGraph), multi-agent systems |

> **Stage 0 was renamed on 2026-09-20.** It was "Orientation Through Computing
> History". The owner rejected "Orientation" as too hard a word for a reader who
> has never programmed, on 14 September; the table kept it anyway and pushed it
> into chapter prose and into the site's own chapter header. Every stage,
> chapter and lesson name now obeys `canon/naming.md`. Stages 1–4 keep their
> official-doc titles for now, and are re-checked against `naming.md` before
> each stage opens.

A lesson names its stage at least once, in plain words a reader can act on. A
reader arriving from a shared link or a search result has no site chrome to
orient them.

## The six invariants

**These six are stage-level commitments, not a per-chapter checklist.**

Until 2026-09-20 the rule read "Every chapter carries all six, or it is not
publishable". That is what forced a chapter about switches and binary to also
carry the AI argument, both extremes and a verification warning — the direct
cause of alien vocabulary landing on page one of a beginner's first chapter.

| Invariant | Where it must be satisfied |
|---|---|
| **Thesis** — specify, bound, verify, own | Somewhere in each stage, in the chapters that are actually about the work. Never forced into a chapter that is not. |
| **Problem** — the misconception this chapter corrects | Per chapter, **placed where it belongs** — at the point the reader would otherwise form the wrong idea. Not automatically in the opening. |
| **Two extremes** — over-caution and over-trust | Per stage, in the AI-facing chapters. Never bent into an unrelated topic. |
| **Solution** — the specific SDE move | Wherever a tension was actually raised. No tension, no move. |
| **Stage reference** | Per chapter, in plain words. |
| **Safety floor** | Per chapter **where the topic warrants one** — execution, deployment, credentials, or anything a reader could ship without checking. Unchanged. |

**How to check a chapter.** Ask whether the chapter teaches its own subject
completely and honestly. Then ask which of the six this chapter is the right
home for. A chapter that carries two of them well is finished; a chapter that
carries all six by force is the failure this change exists to stop.

**The mechanical tell is deleted.** It read: *"Delete any sentence from the
draft. If all six are still present, that sentence was padding and should
already have been gone."* Read literally, every welcome, every bridge, every
reassurance and every gentle explanation is padding, because none of them
carries an invariant. It was a direct instruction to strip warmth out of the
book, and it did.

## The safety floor

A `<Callout type="warning" title="Safety floor">` wherever the topic touches
execution, deployment, credentials, or anything a reader could ship without
checking. Fixed component, fixed title, so the gate can prove it survived.

**The claim is fixed. The wording is not.** Softening the *claim* is a violation
— "verify before shipping" becoming "consider reviewing" is a different claim,
not a gentler one. Rewriting the *sentence* so the reader actually understands
it is required, not permitted.

**Stages 0–2 — the plain wording.** Use this, or something equally plain:

> Whatever the AI writes for you, it is not finished until you have checked it
> yourself. The AI cannot tell whether its answer is right — it can only produce
> one. And if something breaks later, "the AI wrote it" is not an answer anyone
> will accept. The work is yours.

**Stages 3–4 — the original wording**, which assumes the vocabulary by then:

> Whatever the agent writes, it isn't done until you have checked it. Agent
> output is unverified by construction, and "the agent generated it" is not an
> acceptable postmortem finding.

*"Unverified by construction" and "postmortem finding" are engineering phrases.
The old rule froze them into every chapter including the first one a total
beginner ever reads. The owner approved that wording on the Stage 0 intro
without noticing it; on review, it is exactly what Stage 0 exists to avoid.*

## Source discipline

Cite only the canonical source list in `edu-site/docs/intro-5-spec-driven-engineering.md` and the three
official docs (`problem_statement.md`, `solution_statement.md`,
`curriculum.pdf`). A newly-found source may be *proposed* with a one-clause
rationale for what it establishes that nothing on the list does — it is a
proposal for the editor, never a unilateral addition.

Never invent a statistic, incident, citation, or claim about what an official
doc says. If a source is unavailable, stale, disputed, or retracted: stop and
surface it. Fall back to the official docs.

## Statistics and their sources

**Every statistic is researched, verified and recorded in
`evidence-ledger.yaml` with its year and source. That has not changed and never
will — a wrong number lives in this book for years.**

**What changed is how it reaches the reader.** The old rule — *"Every statistic
carries its year inline in the body: 'Veracode's 2025 report found…', not '45%
of AI code…'"* — put a citation inside the sentence every time, and taught every
drafting session that this is how the book sounds.

From 2026-09-20:

- **The prose carries the plain sentence.** "Nearly half of AI-written code
  ships with a security flaw."
- **The source travels with it as a Source chip** — a small, clickable marker
  immediately after the sentence that expands to show the exact figure, the
  year, the organisation and the link. Nothing is hidden from the reader and
  nothing is unverifiable; the citation simply stops sitting in the middle of a
  sentence a beginner is trying to read.
- **Staleness stays visible** — the chip carries the year, and the ledger stays
  the source of truth for when a figure was last checked.
- Where a name or a year genuinely *is* the teaching — the chapter is about that
  report, that incident, that person — it belongs in the prose. The chip is for
  the other case, which is most of them.

> **Implementation note.** The Source chip is an MDX component to be built on
> the platform track, and it is not registered yet. It is part of the component-palette
> work the owner opened on 2026-09-20 (`canon/corrections.md` §21, candidate list at
> `curriculum-state/proposals/chapter-component-palette-2026-09-20.md`), not a
> separate task, and it is one of the few candidates that already has a written spec. Until it ships, a statistic
> in a Stage 0–2 chapter is written as the plain sentence with its source in a
> short parenthetical at the **end** of the sentence, never mid-sentence — and
> the full entry goes in `evidence-ledger.yaml` as always.
