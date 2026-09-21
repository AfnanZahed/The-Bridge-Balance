---
id: 0119
title: Principle III amended, stale-worktree error corrected
stage: general
date: 2026-09-20
surface: agent
model: claude-opus-5
feature: none
branch: none
user: afnanzahed@gmail.com
command: none
labels: ["constitution", "adr-0008", "adr-0007", "corrections", "worktree", "provenance"]
links:
  spec: null
  ticket: null
  adr: history/adr/0008-chapter-component-palette-is-open.md
  pr: null
files:
 - .specify/memory/constitution.md
 - history/adr/0008-chapter-component-palette-is-open.md
 - history/adr/README.md
 - curriculum-state/canon/corrections.md
 - curriculum-state/proposals/chapter-component-palette-2026-09-20.md
 - history/archive/lesson-spine-authoring-generic-2026-09-20/ (8 files, new)
tests:
 - "npm run build - 9 chapters, 0 errors, 7 warnings, site compiled"
 - "20 relative links in changed files resolved against the filesystem - 0 broken"
 - "archive checksummed against the live skill - 7/7 byte-identical"
 - "ADR count verified repo-wide - 9 ADRs, 167 PHRs"
---

## Prompt

> about the ADR 07, start the migration using deepseek, very very carefully, and
> keep the deepseek on max effort, also, as I remember, there were hundreds of
> adrs, not 04-5, also, complete the ADR 8 amendment thing. I want finalization.

## Response snapshot

**The ADR count.** Nine ADRs (0001-0009); no other ADR store anywhere in the
repo. The "hundreds" is the PHR log: **167 PHRs** across 11 folders, 101 in
`general/` alone. Reported with the counts rather than a correction alone.

**The Principle III amendment (the asked-for task).** Step 3's closing clause
stopped enumerating `MDXComponents.tsx`'s registered set. The enumeration
existed to explain why inline markup fails the build; it was being read as
fixing the palette at three entries. Constitution **v3.0.0 -> v3.0.1** (PATCH,
per the constitution's own versioning rule), with a Sync Impact Report.

**The error found while doing it.** ADR-0008's decision point 2 asserted that
the 2026-09-06 *"Claude never draws"* restriction was **untouched**. It had been
**reversed on 2026-09-16** by Constitution v2.3.0, which reopened
structural/conceptual diagrams to Claude via a diagramming connector - four days
before ADR-0008 was written.

**Root cause: a stale worktree.** This session's project instructions load
`CLAUDE.md` from `.claude/worktrees/book-content-pipeline-mindmap-26fb57/`,
which predates the 2026-09-16 amendment. The live `CLAUDE.md` carries the
reopening at line 55. Nothing in the drafting checked the constitution itself,
which is the file that actually governs it. **The error reached three files from
one bad read** - ADR-0008, `corrections.md` §21, and the palette proposal - all
corrected here.

The substance of ADR-0008 survives: the registry is open, and *a component that
lays out content is not a component that draws one*. What was wrong was the
rule it attached that boundary to. Restated as a **delivery-mechanism** rule: a
diagram ships as a static image file, never as markup in a chapter body.

**Recorded as `corrections.md` §24** - a rule is read from the live repo, never
from a worktree copy; and for what is currently in force, read the constitution
first, because `CLAUDE.md` and the skills only summarise it.

**Bookkeeping.** `history/adr/README.md` gained a fourth status word,
**corrected** (distinct from *amended*: the decision did not change, only the
record's accuracy). ADR-0008's point 6 now reads "needed... now made".

**ADR-0007 prerequisite.** Decision point 5 requires the generic form of
`lesson-spine-authoring` be archived *before the first edit*. Done:
`history/archive/lesson-spine-authoring-generic-2026-09-20/`, 7 files
checksum-verified identical, plus a README stating it is not a fallback and not
a second source of truth.

## Outcome

- Impact: the constitution no longer contradicts ADR-0008, and a false rule that
  had propagated into three governance files is out of them.
- Tests: build green; 20 links resolved, 0 broken; archive checksums 7/7.
- Files: 5 modified, 8 created.
- Next prompts: the ADR-0007 migration plan; the owner's per-topic why; the
  first component batch.
- Reflection: the amendment was a five-minute wording fix. Reading the
  constitution to make it correctly is what surfaced a wrong rule sitting in an
  accepted ADR. Checking the governing document, not the summary of it, was the
  whole difference.

## Evaluation notes (flywheel)

- Failure modes observed: project instructions were loaded from a git worktree
  that predates the rules it states. The staleness is invisible from inside -
  the file reads as current and carries no date warning.
- Graders run: link resolution, the full build, archive checksums, and a
  repo-wide ADR/PHR census to check the owner's recollection rather than assert
  against it.
- Next experiment: when an ADR or canon entry cites a dated decision
  (*"the 2026-09-06 decision"*), check that date against the constitution's
  amendment history before writing it. A date attached to a rule is a claim
  about what is current.
