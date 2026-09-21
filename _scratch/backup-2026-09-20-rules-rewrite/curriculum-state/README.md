# Curriculum State Layer

The Bridge Balance has no fixed chapter list and no fixed count. The official
curriculum sets five stages (0 through 4); it does not fix how many chapters each stage
becomes, what each one is titled, or what it covers — that is decided per
topic, at the time it's actually researched and authored, and it changes as
understanding changes. What's fixed is that a chapter ships as one continuous read. `prerequisite-graph.yaml` below is a snapshot of what's been decided *so far*, not a plan the rest of the book is
executing against — expect it to gain entries, lose entries, and have existing
entries retitled or rescoped as chapters actually get written. No single
authoring session can hold everything every other chapter has already decided,
however many there turn out to be. This directory is the book's memory for
that, not a table of contents fixed in advance.

**Every authoring skill reads this directory before drafting and writes to it
before finishing.** A skill that skips the read will redefine terms already
defined, reuse an example already spent, and open on an incident that already
opened other chapters. That is how a book becomes a pile of disconnected
essays that don't know about each other, and this layer is the only thing
preventing it — regardless of how many chapters it ends up being.

## Layout

```
curriculum-state/
├── canon/           Facts about the project that never change per lesson.
│   ├── thesis.md            Thesis, the stages, two extremes, reading and understanding literacy, safety floor.
│   ├── audience.md          Who reads this and under what conditions.
│   ├── voice.md             How the book sounds.
│   ├── corrections.md       Mistakes already made once, with the owner's own words. Read before drafting anything.
│   ├── integrity-floor.md   Rules that outrank the curriculum docs.
│   └── research-and-comparison.md  Nothing is written from a blank page — the
│                            two passes that run before any drafting.
├── contracts/       Machine-checkable output rules.
│   └── calibration.md       Reading-time baseline and the scope_multiplier
│                            anchor.
├── ledgers/         Mutable state. Append as the book grows.
│   ├── concept-ledger.yaml      Every term: where first defined, how.
│   ├── evidence-ledger.yaml     Every source: what each chapter asks of it.
│   ├── example-ledger.yaml      Worked examples already spent.
│   ├── prerequisite-graph.yaml  Lesson order and dependencies — a snapshot of
│   │                            what's decided so far, never a fixed plan.
│   └── term-ledger.yaml      Every glossary term, its anchor, and the chapter
│                            allowed to introduce it first.
└── proposals/       Non-binding planning output from `curriculum-architect`.
                     Stage-level structure sketches; nothing here is decided
                     until a human reviews it and, if they agree, acts on it.
```

## Reading order for a skill

1. `canon/` — all six files, `corrections.md` first. Small, and they change the shape of everything.
2. `contracts/calibration.md` — before estimating any length.
3. The ledgers relevant to the task — this varies by which protocol is running,
   not a fixed subset:
   - `chapter-production` and `lesson-adversarial-review` — all five.
   - `book-coherence-audit` — all five, corpus-wide rather than one lesson.
   - `curriculum-architect` — `prerequisite-graph.yaml` always; `concept-` and
     `evidence-ledger.yaml` when producing a lesson brief (Mode 2).

## Writing rules

- **Append, do not rewrite.** A ledger entry records a decision that has already
  shipped. Changing it silently makes published chapters wrong.
- **One canonical definition per term.** If a term needs a different wording in a
  different context, add a register variant under the same entry — never a
  second entry.
- **Record the omission too.** An entry saying an example was considered and
  rejected is worth as much as one saying it was used.
- **Update before handoff, not after.** A skill that finishes a lesson and does
  not update the ledgers has not finished the lesson.

## Provenance

Seeded 2026-08-23 from the intro chapter, which was then the only text-ready
chapter. That file was retired in the 2026-09-10 intro resequence; its content
now lives in `edu-site/docs/intro-5-spec-driven-engineering.md`, awaiting its
real authoring pass. See
`curriculum-state/proposals/stage-00-intro-resequence-2026-09-10.md`.

## Install

Copy this directory to the repository root: `Book/curriculum-state/`.
