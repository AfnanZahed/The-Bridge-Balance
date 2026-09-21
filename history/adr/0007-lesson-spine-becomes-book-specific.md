# ADR-0007: `lesson-spine-authoring` Becomes Bridge Balance-Specific

> **Scope**: This supersedes one clause of ADR-0004 — the deliberate genericness of the teaching-framework skill. The two-skill split itself is unchanged and remains in force.

- **Status:** Accepted
- **Date:** 2026-09-20
- **Feature:** none — repo-wide content-track architecture
- **Context:** See below.

## Context

[ADR-0004](./0004-two-skill-content-split.md) split content authoring into
`chapter-production` (the contract: research, scope, file, gate, ledgers) and
`lesson-spine-authoring` (the craft: the Name-First spine of twelve stations,
and every sentence). That split was correct and is not in question.

One clause of it was not. ADR-0004 made the craft skill **deliberately generic**
— *"it is not specific to this book... general teaching craft rather than Bridge
Balance policy"* — and `CLAUDE.md` still describes it that way. The reasoning at
the time was sound: the framework was the owner's own intellectual work, it was
850 lines across five files, and it had nearly been lost in a session-scoped
temp directory.

The structural consequence surfaced in PHR 0113's root-cause analysis. **Because
the skill must stay book-agnostic, this book's decisions are architecturally
forbidden from living inside the file that writes every sentence.** They live in
`curriculum-state/canon/`, which the skill reads *after* its own generic rules.
So a generic instruction ("draft the spine straight through, at full pace",
"every paragraph carries something new") is encountered first and in the
skill's own voice, and the book's correction arrives second, as a pointer to
another file.

`corrections.md` §17 item 3, written the same week, states the rule this
violates: **a decision that binds must live where drafting actually reads.** For
this skill, that was not allowed.

The owner resolved it directly: *"Because I didn't planned to sell this skill,
this skill is for my personal use, so make it the Bridge balance only. in this
way, the documentation and rule managing and other file related things will also
get easier."* They attached a condition: *"this step MUST be highly carefull,
becuase the skill is already big and you must avoid any conflicts or chaos in
files or folders, ultra organization is required for this task."*

## Decision

**1. Supersede ADR-0004's genericness clause only.** The two-skill split, the
station framework, and the `chapter-production` boundary all stand unchanged.

**2. `lesson-spine-authoring` becomes Bridge Balance-specific.** It may name
this book, its five stages, its reader, and its canon files directly. Its
vocabulary no longer needs the generic-to-specific translation layer
(`CLAUDE.md` currently explains that the skill's "lesson" means this book's
"Chapter").

**3. Canon rules may move *into* the skill** rather than being pointed at from
outside — with one hard constraint: **one source of truth per rule.** A rule must
not end up stated in both `canon/` and the skill in wordings that can drift
apart. Every rule that moves is removed from its old home and replaced with a
pointer, or stays put and is pointed at. Never both.

**4. Migration discipline, before any file moves:**

- Write the plan first and name every file that changes.
- Enumerate every rule that moves, with its old and new home.
- Confirm who executes per `corrections.md` §19 (the owner picks the model).
- Nothing is moved in passing, as a side effect of another task.
- The build, the gate and a full authoring dry-run must pass afterwards.

**5. Preserve the generic framework as a record.** ADR-0004's third reason for
existing was that the framework had almost been lost. Specialising it must not
delete the general form; it is archived before the first edit.

## Consequences

### Positive

- **The owner's decisions can live inside the writer.** The single structural
  reason corrections kept arriving second is removed.
- **Fewer cross-file pointers.** Today a drafter is sent between the skill, six
  canon files and a drafting plan; rules can consolidate.
- **Documentation and rule-management get simpler** — the owner's stated
  motivation, and a real one: `corrections.md` alone is now 23 sections.
- **Stage-scoped rules become expressible directly**, instead of as exceptions
  layered onto generic prose.

### Negative

- **Portability is lost, permanently.** The skill will not be usable for another
  book or shareable as general teaching craft. The owner has accepted this
  explicitly; it is a real cost, not a nominal one.
- **Rule duplication is the main migration risk.** A rule copied rather than
  moved creates two sources of truth that drift — the exact class of problem
  that produced the five-day failure.
- **The skill is large and load-bearing.** It is loaded by `chapter-production`
  at step 3 and holds through step 5. A botched merge breaks all chapter
  authoring, not one chapter.
- **ADR-0004 becomes partially superseded**, so future readers must read both to
  know what is in force. Mitigated by marking it in the index and in its header.

## Alternatives Considered

**A. Keep it generic; keep the canon overlay (status quo).** Rejected: it is the
root cause under examination. Five days of corrections failed partly because of
it, and `corrections.md` §17 now forbids the pattern.

**B. Fork — keep a generic copy, specialise a Bridge Balance copy.** Rejected:
two copies drift, and the owner's stated goal was *fewer* files to manage, not
more. The generic form is archived instead of maintained.

**C. Merge it entirely into `chapter-production`, back to one skill.** Rejected:
this reverses ADR-0004's still-valid finding. Collapsing contract and craft into
one skill is what the 2026-09-05 system did, and the craft got four sentences.

**D. Keep it generic and raise canon above it in the reading order.** Rejected:
reading order was already canon-first as of 2026-09-19 and did not solve it. The
skill's own rules are stated in its own voice, in the file being executed; a
pointer to another file does not carry equal weight in practice.

## References

- Feature Spec: none
- Implementation Plan: [`migration-plan.md`](../reports/spine-migration-2026-09-20/migration-plan.md) (proposed 21 September 2026; nothing has moved), from `curriculum-state/canon/corrections.md` §22
- Related ADRs: [ADR-0004](./0004-two-skill-content-split.md) (**superseded in part** by this record), [ADR-0006](./0006-beginner-first-content-integrity.md)
- Evaluator Evidence: [PHR 0113](../prompts/general/0113-file-by-file-walkthrough-of-content-rules.general.prompt.md), [PHR 0117](../prompts/general/0117-component-palette-opened-spine-made-specific.general.prompt.md)

---

## Migration log

**Status: in progress.** The decision is accepted; the repo does not yet fully
match it. What has landed, in order:

### 1. The generic form is frozen (decision point 5) · 20 September 2026

`history/archive/lesson-spine-authoring-generic-2026-09-20/` holds all 7 files
as they stood before the first edit, checksum-verified byte-identical at copy
time. Its README states it is not a fallback and not a second source of truth.
Decision point 5 is satisfied.

### 2. The rule inventory (decision point 4, first requirement) · 20 September 2026

*"Enumerate every rule that moves, with its old and new home."* The enumeration
half is done; the homes are not assigned yet. Produced by DeepSeek V4.1 Flash at
`--effort max`, read-only, verified from the tool trace and by spot-checking
line numbers against the source files:

| Artifact | Contents |
|---|---|
| [`rule-inventory-skill.md`](../reports/spine-migration-2026-09-20/rule-inventory-skill.md) | 311 skill rules, each classed GENERIC / BOOK / MIXED, plus every generic-language site and every pointer out |
| [`rule-inventory-canon.md`](../reports/spine-migration-2026-09-20/rule-inventory-canon.md) | 324 canon rules, each tagged by topic and as DRAFTING or PROCESS |

**Two findings that change the plan.**

- **The skill is already a third book-specific.** 105 of its 311 rules are BOOK
  or MIXED — Pakistani readership, stage numbers, `curriculum-state/` paths,
  *"locked decision D5"*, the owner's rejections cited by date. **ADR-0004's
  genericness clause was already fiction.** This ADR is not changing the skill's
  nature; it is ending a pretence that was costing correctness (see item 3).
- **The canon splits cleanly.** 212 DRAFTING rules against 112 PROCESS rules.
  That is the natural seam for *one source of truth per rule*: DRAFTING rules
  are the move candidates, PROCESS rules (who does what, when to stop and ask,
  what to record) stay in canon. It is a cleaner cut than this ADR assumed.

### 3. A live bug found and fixed · 20 September 2026

Not migration work, but found by it, and shipping at the time.

Constitution v3.0.0 withdrew the two-reader model; `SKILL.md` recorded the
withdrawal at its steps 1 and 5. **`reference/stations.md` never got the sweep**
and still carried **nine live instructions** built on the withdrawn model —
including the station sheet in §5, which a drafter fills in before writing:

```
BOTH-AUDIENCE SET: [content new to a senior AND accessible to a beginner ...]
DEPTH BLOCKS:      [senior-only blocks ...]
```

`SKILL.md` requires `stations.md` be read **in full before drafting**. So a
writer read "the senior reader is withdrawn", then filled in a worksheet asking
for content that rewards a senior. The most damaging one was at S5: it sent the
keystroke-level walkthrough into an optional **foothold** so a senior could skim
it — demoting exactly the material a beginners-only book needs most. That
resolution is withdrawn; the walkthrough belongs in the spine.

All nine corrected, each marked where it stood, plus one matching site in
`SKILL.md` step 4 (*"which reader it primarily serves"*). This is
`corrections.md` §17 in its usual shape: the rule was fixed one layer up and the
layer below kept contradicting it.

### 4. The conflict map · 20 September 2026

Every canon rule compared with every skill rule, to find where the same rule is
stated twice and whether the two statements agree. Full report, with the
verification: [`conflict-map.md`](../reports/spine-migration-2026-09-20/conflict-map.md).

| | Rows |
|---|---|
| Canon rules compared | 324 |
| **Agree** — the same rule in both places (the duplicates this ADR exists to end) | **198** |
| **Canon-only** — the skill never states them | **102** — 46 drafting rules, 56 process rules |
| Flagged as a disagreement | 24 — **3 confirmed contradictions** (5 rows), 11 confirmed differences (15 rows), 4 over-flagged |

**What it changes about the plan.**

- **The move set is small and well-bounded:** 46 canon drafting rules a writer
  reading only the skill never sees (`thesis.md` 14, `corrections.md` 8, `audience.md`
  6, `naming.md` 6, `integrity-floor.md` 6, `voice.md` 5, `research-and-comparison.md` 1).
  The 56 process rules stay in canon.
- **198 duplicates need one home each.** Which home is a design decision, put to
  the owner with the plan, not made here.
- **Three live contradictions**, found by the comparison and not by anyone
  looking for them: audience labels (`language-register.md:228` still bans what
  `corrections.md` §13 and `SKILL.md:66` permit), "technical examples stay real
  and named" (`language-register.md:147`, withdrawn everywhere else), and who does
  the research (a DeepSeek default in `SKILL.md`, `CLAUDE.md` and Constitution VIII
  against `corrections.md` §19's ask-every-time). The first two are one-line
  fixes to the skill; the third touches the constitution and needs the owner.

**On the tool, for the record.** The model's own labels were not trusted: four of
its 24 flags were not conflicts, one contradiction was rated only a difference, and
in five of seven groups some quotations were paraphrased rather than exact. Each
was checked against the real files, which is why the report has a verification
section and DeepSeek's tables are marked unedited and secondary. A first attempt
as one call over all 635 rules stalled at `max` effort and wrote nothing; seven
bounded calls at `high` worked. Two of the first four crashed because `--effort`
rewrites a shared config file at start-up, so launches are staggered.

### 5. The owner's answers, and what each did · 20–21 September 2026

Four questions were put on 20 September. The answers, in the owner's own words where they typed them:

| Question | Answer | What it did |
|---|---|---|
| Who plans, and who moves the rules? | Chose *"I plan, DeepSeek moves"*. On 21 September: *"use deepseek with high effort for most of your work to save your tokens"* | The plan is written (section 6). DeepSeek runs at `--effort high`, never max. |
| Depth blocks: remove them from the Stage 0–2 rules, or keep them? | Chose *"Keep them as optional extras"* | [`corrections.md` §25](../../curriculum-state/canon/corrections.md). `mixed-audience.md` §2–3 and the station sheet reworded; six pointer-layer files reworded. No shipped chapter carries a depth block. |
| Change `welcome.md` line 79? | Chose *"Yes, change it"* | One sentence changed: *"Every chapter is written for someone who has never programmed."* The bullet's second sentence is untouched. |
| Should "lesson" become "Chapter" inside the skill? | First: *"is lesson is being used for something that is not a lesson, then it should be replaced."* Then, on 21 September: *"in morning, I will understand the actual issue of lesson -> chapter thing, then I will direct you."* | **Nothing changed.** Not started, no correction written, and the plan is silent on it. On 21 September the owner made it a separate whole task, after the smaller ones, together with a complete redesign of the curriculum and its stages. The live task page explains the question in plain words. |

Also on 20 September, in reply to the audience question: the only audience is beginners, for Stages 0 to 2, and Stages 3 and 4 are parked. That is a standing instruction, not an open decision.

### 6. The plan · 21 September 2026

[`migration-plan.md`](../reports/spine-migration-2026-09-20/migration-plan.md) meets decision point 4's first three requirements. It is proposed, and nothing has moved. It rests on a second DeepSeek pass, the *detail check* (seven calls at `--effort high`, 198 rows, every trace audited: reads only in scope, writes only to each call's own output file).

What it found that changes this ADR's picture:

- **The move set is smaller than the conflict map said.** Of the 46 canon-only drafting rules, 8 need new text in a skill, 31 already live in a decision document or a gate check (a pointer is enough), 2 are withdrawn rules, 4 wait on the owner, and 1 folds into a fix.
- **"The same rule in both places" overstated the agreement.** Of the 198, 91 are identical, 130 are identical in effect, and 68 carry a detail with no equivalent on the other side. 18 of those block a conversion until the detail is merged.
- **A fourth contradiction, K4**, found by the detail check and fixed the same day: `SKILL.md` line 31 still called the drawing rule a hard prohibition, five days after Constitution v2.3.0 reopened structural diagrams. It now points at Principle III step 3 and does not restate it.
- **Six more live two-reader phrases**, fixed the same day: `SKILL.md` lines 158, 187 and 263, `name-registers.md` line 87, `language-register.md` line 3, and the project guide's line 19.
- **Two stale skill copies outside the repo**, not touched when the plan was written (both fixed later that day, section 7): the Claude app's copy of the writing skill (7 September; still a mixed audience) and the user-level `command-code-delegation` skill (still says maximum effort).
- **Seven decisions for the owner** (plan section 0; three were answered later that day, section 7). The largest is whether `corrections.md` is a rulebook or a history, which changes how many skill rules become pointers: 64 or 40.

### 7. The owner's answers, later on 21 September 2026

The owner read the status list and answered point by point. What each answer did:

| Question | Answer | What it did |
|---|---|---|
| Is `corrections.md` a rulebook or a history? (plan decision 2) | *"if claude will check if it is rulebook, then make it rulebook, the important thing is that the claude should read the corrections when needed."* | A rulebook. The plan now uses the rulebook figures: 64 skill rules become pointers (with 30 sentence-level splits), and the 53 duplicated `corrections.md` rows stay as the live text. The README already says the file is read first, always. |
| The two reader-facing pages (plan decision 5) | *"do it using the deepseek very carefully with max effort"* | DeepSeek edited `welcome.md` line 78 and the FAQ "Who is it for?" at `--effort max`, the owner's choice for this one job. The trace was read, both passages were checked against the intended text, and the line endings were confirmed. A sweep of 40 more pages found five sentences. They are listed in the plan (section 12) and left unchanged for the owner. |
| The two stale skill copies outside the repo (plan decision 7) | *"Fix both"* | The Claude app's cached copy of the writing skill now matches the repo, and the user-level `command-code-delegation` skill matches the repo copy. Both were backed up first. The app's copy is a skill in the owner's account, last updated 7 September, so the app may fetch the old one again. The lasting fix is in the app's skills settings, and it is an owner chore. |

Three rules were recorded at the same time (`corrections.md` §26 to §28): *"beginner"* means where the reader starts, and the book takes them to expert level; a hard English word that must stay is explained and linked to the glossary; and Claude recommends where an image or drawing belongs while the owner decides how each one is made. A new canon file, [`course-structure.md`](../../curriculum-state/canon/course-structure.md), now holds the decisions about the shape of the course: the levels, the naming rule, the level labels and the stages. The owner also said the whole curriculum and its stages will be redesigned, and that the *"lesson"* to *"Chapter"* question belongs to that separate task.

**The plan was proofread again**, in four bounded DeepSeek calls at `--effort high`. The first attempt, one call over the whole plan, died of a server error after eleven minutes and wrote nothing. The second found 19 problems, and every quote was verbatim in the plan. I checked each one in place and fixed all 19, including this log's own line that said both outside copies were untouched. The traces were audited: no call wrote anywhere except its own output file.

### Still outstanding

- **The plan awaits four decisions** (1, 3, 4 and 6 in [`migration-plan.md`](../reports/spine-migration-2026-09-20/migration-plan.md)). No rule has moved: nothing has been removed from canon and nothing added to the skill.
- **One contradiction remains: K3.** Whether *"ask which model, every time"* covers standards research needs the owner's ruling, because Constitution Principle VIII states a default. Five places carry the default wording (plan section 4). K1, K2 and K4 are fixed. The constitution change K3 needs (v3.0.2) can also carry the reader decision of `corrections.md` §26 (Principle IX), so the owner should see one proposed wording for both before anything is applied.
- **The vocabulary layer is untouched, and is now part of a bigger task.** The skill says "lesson" 133 times (counted 21 September) where this book says Chapter or Part, and `CLAUDE.md` still explains the translation. The owner will direct it as a separate whole task, together with the redesign of the curriculum and its stages. The levels and the naming decisions live in `course-structure.md`.
- **`mixed-audience.md` still carries its old name**, which its own header notes, because a dozen files point at it. Depth blocks stay as optional extras (`corrections.md` §25).
- **Five sentences on reader-facing pages may still promise old rules.** The sweep found them and plan section 12 lists them. One is a clear problem (`faq.md` line 52). Nothing is changed until the owner says.
- **The app's copy of the writing skill needs a lasting fix** in the app's skills settings.
- **The skill still describes itself as general teaching craft** (`SKILL.md` "Before you start", the project guide's line 19, `CLAUDE.md` line 47). That is phase 4 of the plan, and it goes with the vocabulary decision.
