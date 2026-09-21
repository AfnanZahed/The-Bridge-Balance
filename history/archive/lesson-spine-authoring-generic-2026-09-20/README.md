# Archive — `lesson-spine-authoring`, the generic form

**Frozen:** 20 September 2026, immediately before the first edit of the
ADR-0007 migration. **Do not edit anything in this folder.**

## Why this exists

[ADR-0007](../../adr/0007-lesson-spine-becomes-book-specific.md) makes
`lesson-spine-authoring` specific to The Bridge Balance. Its decision point 5
requires the generic form to be preserved first:

> **Preserve the generic framework as a record.** ADR-0004's third reason for
> existing was that the framework had almost been lost. Specialising it must not
> delete the general form; it is archived before the first edit.

That is what this folder is. It is the last state of the skill in which the
Name-First spine was written as **general teaching craft**, usable for any book
— before this book's stages, readers, canon files and owner decisions were
allowed to live inside it.

## What is here

Seven files, byte-identical to `.claude/skills/lesson-spine-authoring/` as it
stood on 20 September 2026 (verified by checksum at copy time):

| File | Lines | What it carries |
|---|---|---|
| `SKILL.md` | 327 | The entry point: the twelve-station spine, the lesson shapes, the drafting order |
| `reference/stations.md` | 373 | Each station in full — what it asks, what a good answer looks like |
| `reference/mixed-audience.md` | 382 | The two-reader architecture and its six consequences |
| `reference/language-register.md` | 251 | Sentence length, humanising, the machine-cadence tics |
| `reference/comprehension-audit.md` | 231 | The ten-angle audit |
| `reference/beginner-experience-audit.md` | 176 | The beginner-experience audit |
| `reference/name-registers.md` | 211 | Naming registers for lessons and sections |

1,951 lines in total.

## What this folder is not

- **Not a fallback.** The live skill is the one that runs. Nothing loads from
  here, and nothing should be restored from here without a decision that
  reverses ADR-0007.
- **Not a second source of truth.** ADR-0007's hard constraint is **one source
  of truth per rule**. A rule quoted from this folder is a rule quoted from a
  superseded document. If the two disagree, the live skill wins, always.
- **Not maintained.** It will drift from the live skill immediately and by
  design. That is the point of a freeze.

## The intellectual claim being preserved

The framework is the project owner's own work — the reordering of 5W2H into a
learning sequence, the etymological decomposition at Station 0, and the
two-reader architecture. Specialising the skill attaches that work to one book.
This folder keeps the form that does not.
