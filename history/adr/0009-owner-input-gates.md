# ADR-0009: Owner Input Gates — Decisions the Pipeline Must Stop For

> **Scope**: This names a class of pipeline behaviour rather than a technology choice: the points where authoring must stop and request a decision from the project owner instead of inferring one. It generalises an existing mechanism and adds two members to it.

- **Status:** Accepted
- **Date:** 2026-09-20
- **Feature:** none — repo-wide authoring process
- **Context:** See below.

## Context

PHR 0113's root-cause analysis produced two findings. The first — owner
decisions stored where drafting never reads them — is addressed by ADR-0006 and
ADR-0007. The second has no owner yet:

**Where a decision is absent, the pipeline invents one, and the invention reads
plausibly.** Three instances are now recorded in `corrections.md`:

- **§3** — the owner's objection to an ugly grey paragraph under a chapter title
  was a *design* complaint. It was recorded as a *content* rule ("nothing sits
  between a chapter's title and its content"), propagated into canon, a skill,
  an assistant memory and eventually a build-failing gate check, and produced
  five days of cold chapter openings.
- **§18** — `canon/naming.md` Rule 3 required names to carry a "why". The why
  was invented, and came out as the subject's own significance (*"The Switch
  That Made Computers Small Enough to Own"*) rather than the reader's reason for
  reading it. The owner's actual meaning was the opposite kind entirely.
- **§21** — a build mechanic plus one narrow decision about AI-generated images
  became a permanent cap on how a page may be built (ADR-0008).

In all three the inference was confident, internally coherent, and wrong in a
way that reads fine. None was flagged as an inference at the time it was made.

The repo already contains one working instance of the opposite pattern.
`canon/research-and-comparison.md` requires the owner's own comparative study
before drafting, and states plainly that it **blocks** and is not substitutable
by the assistant's own research. That gate has held.

## Decision

Name the class — **Owner Input Gates** — and make membership explicit. A gate is
a named point where authoring **stops and asks**, rather than proceeding on the
most plausible reading.

**Three gates are in force.**

| Gate | Blocks | Recorded in |
|---|---|---|
| **The comparative study** — the owner's own review of several real courses or competing implementations | Drafting anything, content or platform | `canon/research-and-comparison.md` (pre-existing) |
| **The curriculum why, per topic** — why the owner put this content in this book, and what the step gives a reader on the way to the book's destination | Naming a stage, chapter, lesson, part or section | `canon/naming.md` Rule 3, `corrections.md` §18 |
| **The model choice, per content task** — which of Claude or DeepSeek plans, and which writes | Starting a content task | `corrections.md` §19, `CLAUDE.md` |

**The rules that make a gate a gate:**

1. **Stop and ask.** Never infer, never reconstruct from surrounding artifacts,
   never take the most plausible reading and proceed.
2. **Asking once does not cover the next unit of work.** The model choice is per
   task; the why is per topic. The owner is trading cost against quality, or
   stating intent, each time.
3. **Each gate owns a named slot in an artifact**, so an absent input is visible
   rather than silently filled. `brief-format.md` now carries `WHY IT IS IN THE
   CURRICULUM`, marked owner-supplied with an explicit STOP AND ASK; a blocked
   `NAME CHECK` reads "BLOCKED — awaiting the owner's why".
4. **Where mechanisable, a check exists** — but the check is a prompt to think,
   never proof. `heading-no-why` catches a bare noun phrase; it cannot catch the
   *wrong kind* of why, and its source comment says so.
5. **A new gate is added only by owner decision**, and must name what it blocks
   and what unblocks it.

## Consequences

### Positive

- **A recurring, expensive failure gets a structural answer** rather than a
  fourth instance-specific correction.
- **Absent inputs become visible.** A brief with a blocked slot shows the gap;
  prose written around the gap hides it.
- **The owner's authority is expressed in the pipeline**, not only in prose
  asking the assistant to be careful.
- **It is honest about cost.** The model-choice gate exists because the owner is
  paying, and only they can weigh cost against quality.

### Negative

- **Gates cost the owner time, which is the scarce resource.** They have already
  said answering forty-one files of questions "burned hours". Every gate spends
  that resource again.
- **A gate that fires too often gets routed around** — by the assistant
  batching, guessing, or asking in a way that invites a rubber stamp. Gate
  proliferation is the real risk, which is why rule 5 exists.
- **Two of the three are unenforceable mechanically.** "Stop and ask for the
  why" depends on the writer's honesty; no regex knows whether a why was
  supplied or invented.
- **Latency.** A chapter cannot be named until the owner supplies a why, so work
  can sit blocked on a one-line answer.

## Alternatives Considered

**A. Infer, then mark the inference for review.** Rejected: all three recorded
failures were inferences that read perfectly well. A reviewer skimming a
plausible inference approves it — §18's invented why survived review by the
person who wrote it, in the same session.

**B. Ask about everything.** Rejected: the owner's time is the binding
constraint on this project, and a pipeline that asks constantly trains them to
approve without reading, which is worse than inferring.

**C. Leave it as prose guidance in canon ("be careful; ask when unsure").**
Rejected: §3 and §18 were both produced by an assistant that had read exactly
that guidance. Unsureness is not the failure mode — *unwarranted confidence* is,
and guidance addressed to an assistant that knows it is unsure does not fire.

**D. Let the assistant propose and the owner approve or overrule** (a weaker
gate). Rejected for the why specifically, because a proposed why anchors the
answer; kept for *names*, where `naming.md`'s procedure is explicitly
propose-then-confirm once the why exists.

## References

- Feature Spec: none
- Implementation Plan: `curriculum-state/canon/corrections.md` §§18–19; `canon/naming.md` Rule 3; `canon/research-and-comparison.md`
- Related ADRs: [ADR-0006](./0006-beginner-first-content-integrity.md), [ADR-0008](./0008-chapter-component-palette-is-open.md) (the third recorded instance)
- Evaluator Evidence: [PHR 0113](../prompts/general/0113-file-by-file-walkthrough-of-content-rules.general.prompt.md), [PHR 0116](../prompts/general/0116-why-in-a-name-is-the-curriculums.general.prompt.md)
