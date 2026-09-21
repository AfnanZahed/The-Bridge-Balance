---
id: 0118
title: Four ADRs for the September 20 decision cluster
stage: plan
date: 2026-09-20
surface: agent
model: claude-opus-5
feature: none
branch: none
user: afnanzahed@gmail.com
command: /sp.adr
labels: ["adr", "constitution", "architecture", "lesson-spine-authoring", "components", "owner-gates"]
links:
  spec: null
  ticket: null
  adr: history/adr/0006-beginner-first-content-integrity.md
  pr: null
files:
 - history/adr/0006-beginner-first-content-integrity.md
 - history/adr/0007-lesson-spine-becomes-book-specific.md
 - history/adr/0008-chapter-component-palette-is-open.md
 - history/adr/0009-owner-input-gates.md
 - history/adr/0004-two-skill-content-split.md
 - history/adr/README.md
 - curriculum-state/canon/corrections.md
tests:
 - "every ADR cross-link resolved against the filesystem - 10 links, 0 broken"
 - "every canon-to-ADR link resolved - 4 links, 0 broken"
 - "npm run build - 9 chapters, 0 errors, site compiled"
 - "constitution version claim verified against the file - v2.3.0 -> v3.0.0, last amended 2026-09-20"
---

## Prompt

> doo the ADRs needed for our recent work

## Response snapshot

Invoked `/sp.adr`. Two deviations from the skill's workflow, both forced by the
repo:

- **Step 1 expects a feature `plan.md`.** This work is repo-wide governance with
  no feature directory, the same situation as ADR-0004 (*"Feature: none - repo-wide
  content-track architecture"*). The planning artifacts used instead were
  `curriculum-state/canon/corrections.md` §§8-23 and PHRs 0113-0117.
- **Step 5's `create-adr.sh` does not exist** in this repo - `.specify/scripts/`
  carries PowerShell only, and no ADR creator among them. Fell back to
  agent-native creation against `.specify/templates/adr-template.md`, matching
  the house style established by ADR-0004 and ADR-0005.

**Clustering (step 2).** Roughly a dozen decisions were made across 20 September.
They were grouped into four clusters rather than written atomically. The
judgment call worth recording: **naming Rule 3 and the model-choice rule were
not given separate ADRs.** Alone, each looked like process trivia. Together they
are one architectural pattern - points where the pipeline must stop for a
decision only the owner can make - and that pattern is the direct answer to
PHR 0113's second root-cause finding. They became ADR-0009 with the pre-existing
comparative-study gate, which is the same mechanism and had been working
unremarked for weeks.

**Significance test (step 4).** All four clusters pass impact, alternatives and
scope. Three candidates were rejected as over-granular and left as PHR/canon
notes: the `heading-no-why` gate check (one check in one file), the
`intro-1..5` retention decision (`corrections.md` §20, no alternatives with
real tradeoffs), and the Stage 0 rename (a naming choice, not an architecture).

**Created.**

- **ADR-0006 - Beginner-First Content Integrity (Constitution v3.0.0).** The
  senior reader withdrawn for Stages 0-2, Principle VIII narrowed to expression,
  Principle III's four fixed sections replaced. Four alternatives considered,
  including the one still open (withdrawing the senior reader from Stages 3-4),
  recorded as *undecided because it is the owner's call* rather than guessed.
- **ADR-0007 - `lesson-spine-authoring` becomes Bridge Balance-specific.**
  Supersedes ADR-0004's genericness clause only. Carries the migration
  discipline the owner asked for, and one hard constraint: **one source of truth
  per rule** - a rule that moves is removed from its old home, never copied.
- **ADR-0008 - The chapter component palette is open.** Documents the four-layer
  provenance of a constraint nobody decided, and draws the boundary that keeps
  the 2026-09-06 decision intact: *a component that lays out content is not a
  component that draws one.* Flags that Constitution Principle III needs a
  wording amendment.
- **ADR-0009 - Owner Input Gates.** Names the class, lists the three gates in
  force, and is honest in Consequences about the cost: gates spend the owner's
  time, which is the project's scarce resource, and two of the three cannot be
  enforced mechanically.

**Index and supersession.** `history/adr/README.md` gained the four rows and two
new status vocabulary entries - **superseded in part** and **migration not
started** - because neither existed and both were needed to describe this
cluster honestly. ADR-0004's status line now names ADR-0007 and states exactly
which clause it loses. Five `corrections.md` sections gained "Recorded as"
pointers, so canon and the ADRs reference each other in both directions.

## Outcome

- Impact: the four decisions that reshaped the book's governance now have their
  reasoning, their rejected alternatives and their costs on the record, rather
  than living in a conversation.
- Tests: 14 cross-links verified against the filesystem, 0 broken; build green;
  the constitution version claim checked against the file rather than asserted.
- Files: 4 created, 3 modified.
- Next prompts: ADR-0007's migration has not started and the repo does not match
  it yet; Principle III's wording amendment (ADR-0008); the owner's per-topic
  why; the first component batch.
- Reflection: writing the Consequences sections was the part that earned its
  cost. ADR-0006's negatives name a real gap (Stages 3-4 have no reader model)
  and ADR-0009's name a real risk (a gate that fires too often gets routed
  around) that neither `corrections.md` entry had admitted to.

## Evaluation notes (flywheel)

- Failure modes observed: the skill's workflow assumes a feature-directory
  project and a shell script that this repo does not have. Both fallbacks are
  documented in the skill, and both were needed.
- Graders run: link resolution over every relative path in the four new files
  and every canon-to-ADR pointer; the full build; a check of the constitution's
  stated version against the constitution itself. All pass.
- Next experiment: when an ADR records a decision whose migration has not
  happened, say so in the index status, not only in the body - a reader scanning
  the table should be able to see which accepted decisions the repo does not yet
  implement.
