---
id: 0120
title: Two-reader remnants swept from stations.md
stage: refactor
date: 2026-09-20
surface: agent
model: claude-opus-5
feature: none
branch: none
user: afnanzahed@gmail.com
command: none
labels: ["lesson-spine-authoring", "adr-0007", "corrections-17", "audience", "constitution-v3", "deepseek"]
links:
  spec: null
  ticket: null
  adr: history/adr/0007-lesson-spine-becomes-book-specific.md
  pr: null
files:
 - .claude/skills/lesson-spine-authoring/reference/stations.md
 - .claude/skills/lesson-spine-authoring/SKILL.md
 - history/adr/0007-lesson-spine-becomes-book-specific.md
 - history/adr/README.md
 - history/reports/spine-migration-2026-09-20/rule-inventory-skill.md (new)
 - history/reports/spine-migration-2026-09-20/rule-inventory-canon.md (new)
tests:
 - "npm run build - 9 chapters, 0 errors, site compiled"
 - "grep sweep: every remaining 'senior' in stations.md is a withdrawal note, 0 live instructions"
 - "DeepSeek trace audit: 60 write events, all to the 2 output files, 0 to repo source"
 - "7/7 skill files checksummed against the frozen archive after the DeepSeek passes - byte-identical"
 - "6 inventory line numbers spot-checked against source files - all exact"
---

## Prompt

> fix the stations.md senior stuff first and then other things and let's windup
> all this work and move on.

## Response snapshot

**The bug.** Constitution v3.0.0 withdrew the two-reader model on 20 September.
`SKILL.md` recorded it at steps 1 and 5. **`reference/stations.md` never got the
sweep** and still carried nine live instructions built on the withdrawn
model - while `SKILL.md` requires that file be read **in full before drafting**.

The worst two were in the station sheet, the worksheet a drafter fills in before
writing a word:

```
BOTH-AUDIENCE SET: [content new to a senior AND accessible to a beginner ...]
DEPTH BLOCKS:      [senior-only blocks ...]
```

And one was a substantive rule, not a rationale. At **S5**, the spine sent the
keystroke-level walkthrough into an optional **foothold** *so a senior could
skim the block* - demoting exactly the material a beginners-only book needs
most. Withdrawn: the walkthrough belongs in the spine, and a foothold there must
pass the delete test like any other.

**Fixed: 10 sites in `stations.md`, 1 in `SKILL.md`.** Each marked where it
stood, in the file's existing withdrawal-note convention (line 87 set the
pattern), so the history stays readable. A header note records the sweep and
states the standing rule: **no rule in this file may assume a reader who already
knows the subject** - Stages 0-2 have never programmed, and Stages 3-4 are
undecided, so a senior may not be assumed there either.

Three sites kept a real kernel rather than being deleted: S0 (a decomposition
must *predict the design*, not produce trivia), S3 (the originating problem is
almost never told, so it must be reconstructed deliberately), S6 (blast radius
states cleanly at a beginner's level).

**One site was found only because it lacked the keyword.** `SKILL.md` step 4
said the station sheet records *"which reader it primarily serves"* - a
two-reader rule with no occurrence of "senior" in it. A keyword grep alone would
have left it. A second sweep on *both-audience / mixed-audience / which reader /
same reader / two readers / audience gap* caught it.

**How it was found.** Not by looking for it. The ADR-0007 rule inventory
(DeepSeek V4.1 Flash, `--effort max`, read-only) surfaced it as a row in the
generic-language table, and the claim was then verified line by line against the
source before anything was edited.

**Delegation notes.** The first inventory run was killed by a session compaction
after 13 model requests and 105 tool calls, having written nothing - it was
scoped as one call over 14 files with the write held to the end. Re-run as two
bounded passes, each forbidden to glob or explore and each required to append to
disk after every input file. Both completed: **635 rules inventoried**. A trace
audit of all 60 write events confirmed every one landed on the two output files;
the 7 skill files were then checksummed against the frozen archive and were
byte-identical.

## Outcome

- Impact: the file that specifies every lesson's structure stopped contradicting
  the constitution. Any chapter drafted before today's fix was written from a
  worksheet asking for withdrawn content.
- Tests: build green; sweep verified by grep; DeepSeek writes audited; checksums
  clean; 6 line numbers spot-checked.
- Files: 2 skill files corrected, 2 ADR files updated, 2 inventories created.
- Next prompts: the ADR-0007 migration plan (the conflict map feeding it is
  still running); the owner's per-topic why; the first component batch.
- Reflection: the inventory was commissioned to plan a migration and its first
  real payoff was a shipping bug it was not looking for. Reading a file
  exhaustively, with no hypothesis, finds things a targeted search cannot.

## Evaluation notes (flywheel)

- Failure modes observed: (1) a withdrawal applied to the top-level skill file
  and not to the specification it loads - `corrections.md` §17 for the fourth
  recorded time; (2) a keyword sweep missing a rule that stated the same
  assumption in different words; (3) a delegated task scoped too large, spending
  its whole budget on input and producing nothing.
- Graders run: grep sweep for live instructions, full build, trace audit of
  every delegated write, archive checksums, line-number spot checks.
- Next experiment: when a model is withdrawn, grep for its *consequences* as
  well as its name - the reader-role words ("which reader", "both audience")
  outlive the role's own name and carry the same rule.
