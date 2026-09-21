# ADR-0006: Beginner-First Content Integrity — Constitution v3.0.0

> **Scope**: This records the content-governance decision cluster of 20 September 2026 — who the book is written for, what may be learned from a studied source, what a finished chapter must contain, and where those rules are enforced. It amends three constitutional principles together because they were failing together.

- **Status:** Accepted
- **Date:** 2026-09-20
- **Feature:** none — repo-wide content-track governance
- **Context:** See below.

## Context

For five consecutive days the project owner rejected chapter openings as cold,
dense, and heavy with names and dates. Each rejection was met with a fix, and
each fix came undone. PHR 0113 was commissioned to find out why: a file-by-file
walkthrough of all 41 documents that shape a chapter, with measurements.

The finding was that there is **no single bad file**. Roughly thirty
instructions across more than twenty files each push a little toward cold,
reference-dense prose, and the few that push back are either labelled
non-binding or outranked. The measurements: `intro-4` ran 6.5 years per 1,000
words and opened 80% of its paragraphs in bold; `intro-5` opened with zero words
between its title and its first section.

**The root cause was constitutional.** Principle IX required that every chapter
serve a senior engineer *and* an absolute beginner in the same document, and the
constitution supersedes everything in the repo. Every rule the owner gave lower
down — "Stage 0 is beginner-only", "teach it with story and analogy, not
citations" — lost to it, because a careful session checking the hierarchy sides
with the constitution. The owner's light-register rule survived only inside
`proposals/`, a directory whose own README says nothing in it is read
automatically.

Principle IX also generated a chain of dependent rules that each looked
reasonable alone: *the senior quits at unrewarded sentences*; *every paragraph
carries something a senior did not already have*; *a number, an origin, a
failure mode, a reason*; *vocabulary left completely untouched*; and the
"mechanical tell" — delete any sentence, and if the six invariants survive, that
sentence was padding. That last rule classifies every warm or orienting sentence
in the book as padding.

Two further principles were failing independently. **Principle VIII**'s blanket
ban on "borrowed structure" had caused three separate refusals of the owner's
own instruction to follow a supplied reference's shape. **Principle III**
required four fixed chapter sections the book had stopped using; two shipped
chapters violated it while every mechanical check reported clean.

## Decision

Amend the constitution from **v2.3.0 to v3.0.0** (MAJOR — a redefinition that
invalidates prior judgments), and propagate the consequences through canon, the
skills, the drafting plan, the ledgers and the build gate in one pass.

**1. Principle IX: `Mixed-Audience Integrity` → `Beginner-First Integrity`.**
The senior engineer is **withdrawn as a required reader for Stages 0–2**, which
are written for someone who has never programmed and for nobody else. Stages 3–4
are deliberately left undecided pending the owner. Every dependent rule listed
above is removed, not softened.

**2. Principle VIII narrowed to expression.** A studied source may be learned
from completely — its structure, its tone, its sequencing, its examples. What is
never reproduced is its *expression*: sentences verbatim or lightly reworded,
and its exercises. Where the owner supplies a reference and asks for its shape,
the shape is used.

**3. Principle III's four fixed sections replaced.** A chapter is `text-ready`
when it is a complete continuous read — an opening that welcomes and orients, the
teaching, and a hand-forward. Shape is decided by `lesson-spine-authoring`, not
by a fixed heading list.

**4. Canon consequences,** recorded as `corrections.md` §§8–18:

- The six invariants are **stage-level**, not per-chapter; the mechanical tell is deleted.
- **Warmth is the house register everywhere**, and may get gentler where the material gets harder.
- **Vocabulary may be simplified; the truth may not.**
- **Research makes the writer correct; it is not the reader's diet.** A statistic reaches the page as a plain sentence with its source at the end.
- **Bold marks meaning, never the first sentence by position.** Flatness is fixed with structure.
- Audience labels, exclamation marks and decent emoji are allowed; the AI-slop set is not. English only.
- **Never explain the book's internal rules or vocabulary to the reader.**

**5. Enforcement moved into the build gate** (`check-chapter.mjs`): `cold-open`
as an error, plus `orientation-thin`, `orientation-no-why`, `date-density` and
`bold-lead` as warnings. Three `VOICE_TELLS` regexes banning natural opening
phrases were deleted.

**6. A second required audit.** The ten-angle comprehension audit checks only
understanding, and passed both rejected drafts. A **ten-angle
beginner-experience audit** is added alongside it, covering ease, speed,
welcome, why-before-what, dignity and the page itself.

## Consequences

### Positive

- **One reader model, and the rules now agree with it.** The contradiction that
  made every fix temporary is gone at its source.
- **The constitution stops overruling the owner.** The decisions that kept
  losing are now the ones in the top-ranking file.
- **Three failure modes became mechanical.** A cold opening now fails the build
  rather than depending on a reviewer noticing.
- **Supplied references are usable.** Three refused owner instructions would now
  be honoured.

### Negative

- **Stages 3–4 are unresolved.** The book has a reader model for its first three
  stages and an open question for its last two. This is a real gap, deferred
  deliberately rather than guessed.
- **Genuinely good material was withdrawn with the senior reader.** Real
  magnitudes, origins and named failure modes reward *any* engaged reader. They
  must be re-earned for Stages 3–4 rather than assumed.
- **MAJOR means prior judgments are invalid.** Every chapter assessed under
  v2.x was assessed against a reader who no longer exists.
- **Five live `intro-*` chapters now contradict canon** and are exempted from
  the new gate checks, so nothing flags them (see `corrections.md` §20).
- **A beginner-only book risks thinness** for the professional readership the
  project also wants. The mitigation is canon's "assume intelligence, never
  knowledge" — the material stays hard, the path in does not.

## Alternatives Considered

**A. Keep two readers; add a Stage 0 exception.** Rejected: an exception lives
in a lower-ranking file and loses to the constitution when a careful session
checks the hierarchy. That is precisely the failure being fixed — the exception
already existed, in `proposals/`, and lost for five days.

**B. Two editions, or a "basics" track inside each chapter.** Rejected: a
chapter is one continuous read (Principle III), the maintenance cost doubles,
and the owner never asked for it. `mixed-audience.md`'s foothold/depth-block
architecture was the in-document version of this and had pushed beginner
explanation *out* of the main text.

**C. Fix canon only, leave the constitution alone.** Rejected: this is what the
previous five attempts did. The constitution states that it wins on conflict, so
a canon-only fix is undone by the next session that reads the hierarchy.

**D. Withdraw the senior reader from the whole book, Stages 0–4.** Rejected —
not on merit, but because it is the owner's call and they have not made it.
Recording it as undecided is honest; guessing it would repeat the error this ADR
exists to correct.

## References

- Feature Spec: none — repo-wide governance
- Implementation Plan: `curriculum-state/canon/corrections.md` §§8–18
- Related ADRs: [ADR-0002](./0002-text-first-video-second-workflow.md) (the previous Principle III amendment), [ADR-0004](./0004-two-skill-content-split.md) (the two-reader architecture this supersedes in part), [ADR-0007](./0007-lesson-spine-becomes-book-specific.md)
- Evaluator Evidence: [PHR 0113](../prompts/general/0113-file-by-file-walkthrough-of-content-rules.general.prompt.md) (the diagnosis and measurements), [PHR 0114](../prompts/general/0114-owner-answers-applied-across-content-rules.general.prompt.md) (the application and graders)
