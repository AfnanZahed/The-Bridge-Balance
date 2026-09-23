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
- Implementation Plan: [`migration-plan.md`](../reports/spine-migration-2026-09-20/migration-plan.md) (written 21 September 2026 and run that evening: section 8), from `curriculum-state/canon/corrections.md` §22
- Related ADRs: [ADR-0004](./0004-two-skill-content-split.md) (**superseded in part** by this record), [ADR-0006](./0006-beginner-first-content-integrity.md)
- Evaluator Evidence: [PHR 0113](../prompts/general/0113-file-by-file-walkthrough-of-content-rules.general.prompt.md), [PHR 0117](../prompts/general/0117-component-palette-opened-spine-made-specific.general.prompt.md)

---

## Migration log

**Status: in progress, nearly closed.** The decision is accepted, and the skill and
the pointer layer now match it. What is left is under "Still outstanding". What has
landed, in order:

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

### 8. The plan was run · 21 September 2026, evening

The owner answered the four open decisions (plan section 0) and wrote *"migration plan: DO IT NOW using deepseek with max effort"* and *"the 198 rule: do them"*. All four phases ran that evening.

| Phase | Result |
|---|---|
| 1. Repair | **Done.** K3 was ruled: yes, "ask every time" covers research. `corrections.md` §30 says so, six places are reworded, and the constitution is **v3.0.2** (Principle VIII: the model is asked every time, research included; Principle IX: one reader in every stage). The nine small fixes are applied; D8 and D9 wait for the shape redesign. `faq.md` line 52 and `glossary.md` line 34 no longer promise old rules. |
| 2. Coverage | **Done.** The eight canon rules a writer never saw now have a home: six in `language-register.md`, one in `SKILL.md` (C7-33), one in `chapter-production/SKILL.md` (C7-25). |
| 3. Duplication | **Partly done.** Skill side: 104 edits across the seven skill files, each restatement turned into a pointer, a split or a merge. Canon side: 9 merges, and 22 tombstone lines against the 63 the plan counted (`voice.md` 14 of 41, `audience.md` 8 of 22). |
| 4. Framing | **Done.** `SKILL.md` "Before you start" now says the skill is written for this book and that the project guide loads first. Its title and description name the book. `CLAUDE.md`, the project guide, `PROJECT-MAP.md` and `curriculum-state/README.md` no longer call it general craft. |

**The vocabulary layer** was done the same day, as its own task (the owner: *"fix this problem properly using the deepseek with high effort"*). DeepSeek decided what each "lesson" meant, a script made the swaps, and the risky places were read by hand: 234 words changed in 20 files. The two skill folder names still say "lesson".

**How it ran.** Claude wrote one worksheet per file by script from the plan's Appendix A. DeepSeek V4.1 Flash at `--effort max` (the owner's choice for this job) edited one file per job and could write only to that file and its own log. Jobs were cut to seven items or fewer after connection errors ended the first, larger ones. Four jobs that were resumed after a crash logged "needs a human" for 23 items without editing; the resume message was fixed and those items were re-run in smaller jobs. Every trace was audited by script: reads in scope, writes only to the target and the log. One job (`T-audience-2`) also wrote 11 scratch text files in Command Code's own temp folder and nothing in the project. Per file, scripts checked that the headings are the same, that every path a pointer names exists, that every section title it quotes exists in that file, and that the line endings did not change. `check-references` passes. `check-chapter` reports 0 errors and the same 6 warnings the owner told me to ignore.

**What the checks found.**

- **Two merges copied a withdrawn rule.** The 20 September detail check said all images are made outside; that was reopened later. Both merges were reverted and the stale claim in `audience.md` fixed by hand. Every merge was read after that.
- **A wrong tombstone.** The persona rule (C2-03) in `voice.md` had been replaced by a pointer to text that does not state it.
- **The survivor check undid most of the canon tombstones.** For every place where words were removed, it measures how many of the removed three-word runs still appear anywhere else in the skill. It sent 24 of 38 changed places back to their old text: `voice.md` 16 of 23, `audience.md` 8 of 15. It is strict about wording, so some of those may have been fine. Putting text back loses nothing; it only leaves a rule stated twice. It is also blunt: it passed one place at 59% overlap (the exclamation-mark, emoji and "AI-slop" bullets) that a reviewer then showed had lost three details, and that place was restored too.
- **Independent reviewers** (DeepSeek calls at max effort that read every changed place and open each pointer's target) checked 116 changed places in nine files and found four problems: a lost sentence in `name-registers.md`, the word "lesson" left in one `SKILL.md` pointer, the word "code" lost from the phone check in `beginner-experience-audit.md`, and the `voice.md` place above. All four are fixed. A stale line in `mixed-audience.md` ("no expert assumed in Stages 3–4") the reviewer did not flag; I found it and fixed it by hand.

**The dry run** (plan section 7, item 6). A read-only DeepSeek call at max effort followed the skill's own steps for a sample Stage 0 topic (*"What is a terminal, and why do we type commands?"*). It opened every file and pointer in the order the skill gives and wrote nothing except its findings; the trace shows 26 file reads, 8 searches and no write. It reported 10 problems. I checked each against the files, and all 10 were real. Eight are fixed:

- the anchor-tier order in `stations.md`, which still put universal examples first after `corrections.md` §29 made them Pakistani-first;
- three places that still said every image is made outside the project (two found by the dry run, one by my search): `CLAUDE.md`, the project guide's folder tree and `gate.md` line 16;
- three places that still called the Stage 3–4 reader undecided: the project guide, `stations.md` and `mixed-audience.md`;
- two research checklists that still assumed delegation without asking (`research-and-comparison.md` and `research.md`), a leftover of K3;
- the ledgers protocol, which listed four ledgers while the folder and the README have five, and never told a drafter to write `term-ledger.yaml`; three files that said "the four ledgers" now say "the ledgers".

The other two wait for the shape redesign (D8): `voice.md` line 278 speaks of a "Theory-classified" chapter, and `corrections.md` §23 is titled with "lesson shapes". Most of the ten were leftovers from earlier decisions that no file-by-file sweep had reached. The dry run found them because it followed the reading order, which is what the ADR asked for.

**The word proofread and the final sweep.** Two more read-only checks ran at high effort after the dry run.

- **The proofread of the lesson-to-chapter word changes** (192 rows) found 2 problems: the two project maps said the skill "does not write the lesson" right after the rename had changed "around the lesson" to "around the chapter". Both are fixed.
- **The final sweep.** Five DeepSeek sessions each read part of the rule files (30 files in all: the skill, the canon, `CLAUDE.md`, `PROJECT-MAP.md`, the constitution) and looked for any sentence that still states an old rule as if it were current: two readers, banned audience labels, images made only outside the project, universal examples first, DeepSeek as the default for research, "lesson" for "chapter", and counts that had gone stale. They reported 28 places. I checked each one: 26 were real, 1 was a false alarm (`corrections.md` §28 item 3 already has a §29 note directly after the sentence), and 1 waits for D8 (`corrections.md` §23, line 541, "round a lesson to the nearest shape").

**How the fixing ran.** No new DeepSeek jobs were started. Each sweep's own session was resumed (`--session`), so the files it had read were already in its context, and it was told to fix only its own findings, in the listed files only. It made 24 edits. I backed up every file first, audited the five traces (no write outside the listed files; the only shell use was appending to its own log) and read every changed line against the backup. Line endings were unchanged in every file. I edited `corrections.md` by hand because it is the binding rulebook: two dated notes, on §8 (which still said Stages 3 and 4 were open) and on §26 (which still said two places described other readers, when both had been fixed).

**Three of DeepSeek's 24 edits I reworded.** In two places in `CLAUDE.md` it wrote that "drawing inside the chapter body" stays closed. The rule in `corrections.md` §21 is narrower: what stays closed is a drawing delivered as inline markup (`<Figure />`, inline SVG, inline Mermaid), and a drawing made through a connector is allowed as an ordinary image. In the project guide's map it wrote "does not write the chapter" in the same table cell that says the skill takes a topic to a shipped chapter; that now says "the chapter's teaching".

**A plain word search then found 3 more** that the sweep had not flagged, although it had flagged the same phrase in other files: "the seven ratified principles" in the guide's `SKILL.md` and in `PROJECT-MAP.md`, and "the approved 20-chapter Stage 0 ladder" in the guide's own map. All three are fixed. `check-references`, `check-frontmatter` and `check-chapter` pass (0 errors, the same 6 warnings the owner said to ignore).

**Honest results.**

- **The skill did not get shorter.** 4,403 words of restated rules came out and 6,293 went in (pointers, the seven new rules that live in these files, the reading table, the rewritten opening): net +1,890 words on 25,106, or +7.5%. The aim was one home per rule, not fewer words, but a pointer costs words too.
- **The canon is only partly de-duplicated.** Roughly 40 rules are still written out in full in `voice.md` and `audience.md` and also stated in the skill. The two agree today, and the reviewers checked that, but they can drift apart. To finish a rule, the skill has to gain the missing wording first (the plan's merge-first step, by hand) and only then can the canon get its tombstone. DeepSeek declined two rows for that reason: C1-26 (italics for gentle emphasis and the reader's inner voice) and C2-42 (the banned-phrase table).
- **The plan's row matching was loose in places.** Some rows matched a different rule that shares topic words, so a tombstone would have pointed at text that does not carry the rule. The jobs' own checks and the reviewers caught it; the plan did not.
- **The cost rule was judged, not counted.** Doing about 170 careful edits by hand means reading both copies of every rule. Delegated, Claude's part was the worksheets, the audits and reading only the flagged places. I did not count tokens, and the survivor check threw away more than half of the tombstone edits, so part of the max-effort work was wasted.
- **Every check found something the one before had missed.** The dry run found 10 leftovers, the final sweep 28 places (26 real), and a plain word search 3 more. The sweep flagged some copies of a phrase and not others, so its list was not complete. Nothing known is left except the places that wait for the redesign, but that does not prove that none remain.

### Still outstanding

- **The ~40 repeated canon rules: done, 22 September.** The owner ordered it finished now, at DeepSeek high effort, in 6 small jobs. The real count, checked against the live files rather than the old estimate, was 36: 17 needed a short addition to the skill first (the missing wording, copied from the canon's own sentence, not invented), 17 were already fully covered and only needed the canon tombstone, and 2 turned out already done from the first run. Backed up first; every job's trace audited (no write outside its own files); every changed line read against the backup; all three gates still pass (0 errors, the same 6 ignored warnings).
- **The constitution wording.** v3.0.2 was applied on the owner's yes. The exact sentences in Principles VIII and IX are worth a read.
- **The two skill folder names still say "lesson"** (`lesson-spine-authoring`, `lesson-adversarial-review`), and `mixed-audience.md` keeps its old name. Renaming is one script pass over many files and could disturb another open session, so it belongs at the end of the redesign.
- **The app's copy of the writing skill needs a lasting fix** in the app's skills settings. It is the owner's chore.
- **D8 and D9** (the five lesson shapes and the front-door skeleton) wait for the shape redesign, together with the places that still use the old shape words (`voice.md` line 278, and the title and one sentence, line 541, of `corrections.md` §23). So do the stage names, the levels and the question of what the front of the book is called: `course-structure.md` holds them.
- **Open items with the owner:** the redesign itself (questions A, B and C in `course-structure.md`), the palette, the WHY lines, the logo and the persona. All are on the live task page.
