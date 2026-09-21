# Conflict map — the writing skill against the canon

**Date:** 20 September 2026 · **Feeds:** the ADR-0007 migration plan · **Status:** complete and verified

Every one of the 324 canon rules in [`rule-inventory-canon.md`](./rule-inventory-canon.md) was compared
with the 311 skill rules in [`rule-inventory-skill.md`](./rule-inventory-skill.md). For each canon rule
the question was: does the skill state the same rule, and do the two agree? A disagreement is a live bug —
a writer who reads the skill gets one instruction, a writer who reads the canon gets another.

## How it was made

Seven DeepSeek V4.1 Flash calls at `--effort high`, one per topic cluster of 26–58 canon rows, each
forbidden to explore the repo and required to append to disk after every batch of about eight rows.
An earlier single call over all 635 rules at `max` effort stalled twice (9.7 MB of reasoning, four tool
calls, nothing written); splitting it is what worked. Two of the first four calls crashed at start-up
because `--effort` rewrites `~/.commandcode/config.json` and simultaneous starts race on it; launches are
now staggered 15 seconds apart with one retry. All seven finished, on the first attempt once staggered.

## Result

| Group | Topics | Canon rows | Agree | Differ | Contradict | Canon-only |
|---|---|---|---|---|---|---|
| A | audience, glossing | 26 | 23 | 1 | 1 | 1 |
| B | sentence-length, pace, density, bolding, examples, dates, statistics | 41 | 36 | 4 | 0 | 1 |
| C | headings, naming | 47 | 27 | 5 | 0 | 15 |
| D | openings, structure, shapes, stations | 53 | 31 | 5 | 0 | 17 |
| E | safety, research | 53 | 36 | 3 | 0 | 14 |
| F | other | 46 | 32 | 2 | 0 | 12 |
| G | process | 58 | 13 | 1 | 2 | 42 |
| | **Total** | **324** | **198** | **21** | **3** | **102** |

## What the numbers mean for the migration

- **198 rules agree — the same rule in both places.** These are the duplicates ADR-0007 exists to end. Each
  needs exactly one home; the other place becomes a pointer or loses the text.
- **102 canon rules the skill never states.** **46 are drafting rules** — a writer who reads only the skill
  will never see them (`thesis.md` 14, `corrections.md` 8, `audience.md` 6, `naming.md` 6, `integrity-floor.md` 6,
  `voice.md` 5, `research-and-comparison.md` 1). **56 are process rules** (who does what, when to stop and
  ask, what to record) and belong in canon. The 46 are the candidates to move into the skill.
- **24 rules were flagged as a disagreement.** Checked by hand below, they resolve to **3 confirmed
  contradictions** (5 rows), **11 confirmed differences** of detail, scope or vocabulary (15 rows), and
  **4 over-flagged rows** that are not conflicts.

## Verification (Claude, against the real files)

**Automated.** All 324 canon rows appear exactly once. No ID was invented. In groups A and G every quoted
string appears verbatim in the source files. In groups B–F several quotes are **paraphrased rather than
exact** (a quote with a word changed, or two sentences joined); the substance of each was checked by hand
against the real text, and the corrected wording is below. Treat the per-group tables at the end as a
finding list, not as citations.

**Line numbers.** The two inventories were built before the same-day sweep of `stations.md`, so their
`stations.md` line numbers follow the archived copy in
`history/archive/lesson-spine-authoring-generic-2026-09-20/`. The live file is 14 lines longer by
Station 7 and longer still after it. Citations in the verified sections of this report use live
numbering; every other file is unchanged since the inventories. **When acting on a `stations.md` row,
find it by its text, not by its line number.**

### Confirmed contradictions — 3

**K1. Audience labels: banned in the skill, allowed in the canon.** *Canon wins* (owner decision).
- `reference/language-register.md:228` — *"That is an audience label, and audience labels are banned everywhere in this curriculum for the same reason: they tell a reader which parts of the book were not written for them. See `mixed-audience.md` §5."*
- `corrections.md:253` (§13) — ***"Audience labels are allowed.** ‘If you’ve never programmed, don’t worry’ is now a permitted and often correct sentence. Owner: ‘the audience labels must be a must.’"*
- `SKILL.md:66` already says *"The old ban on audience labels is withdrawn"*, and the section `language-register.md:228` points to (`mixed-audience.md` §5) says the same. The one sentence that still bans them is stale.
- Effect: a writer following `language-register.md` deletes the welcome sentence the canon calls often correct.
- **Fixed 20 September 2026.** The false reason is removed; the rule against announcing a language level stays, with its reason corrected.

**K2. "Technical examples stay real and named": stale in the skill, withdrawn everywhere else.** *Canon wins.*
- `reference/language-register.md:147` — *"Technical examples stay real and named, as always: real tools, real companies, real incidents, real numbers. That rule does not change here."*
- `SKILL.md:162` — *"Examples must be concrete. They do not have to be real. (Revised 20 September 2026.)"* · `voice.md:179` — *"An invented example is fully allowed when it teaches better than a real one."* · `research-and-comparison.md:59` — *"Examples are ours, and may be invented."*
- DeepSeek rated this DIFFER; on reading both sides it is a straight contradiction with a rule revised the same day. It appears in exactly one file. **Fixed 20 September 2026:** the sentence is now a pointer to `SKILL.md` step 7, so the rule has one home.

**K3. Who does the research: a DeepSeek default in three places, and "ask every time" in two.** *Needs the owner’s ruling.*
- Default stated in `SKILL.md:100` (*"Delegated to DeepSeek through `command-code-delegation` around 95% of the time"*), `CLAUDE.md:52` (same words), and Constitution Principle VIII, line 390 (*"in the large majority of cases"*).
- Against it: `corrections.md` §19 — *"Before any content task starts, ask which model does which part — planning, drafting, research, revision — and wait for the answer. There is no default"* — and `CLAUDE.md:73`, which limits the non-applicability of the 95% figure to *"reader-facing prose"*.
- The tension is real and it is not a wording slip: §19 lists **research** among the parts to ask about, while three other places default research to DeepSeek. One of them has to yield, and one of them is the constitution. **Question for the owner:** does "ask every time" cover Pass-1 standards research too?
- DeepSeek reported this as two rows (C7-80, C7-81) pointing at the same skill line.

### Confirmed differences — 11 issues, 15 rows

| # | Issue | Canon | Skill | Rows |
|---|---|---|---|---|
| D1 | Spelling | `audience.md:156` — *Spelling: British.* | `language-register.md:153` — *"Pick one convention... Either is defensible"* | C3-13, C1-31 |
| D2 | Rule 3's reference-page exemption | `naming.md:148–151`, `corrections.md` §18: glossary, changelog, FAQ, code of conduct are exempt | `SKILL.md:128` states the why-rule for every heading with no exemption | C3-25, C7-75 |
| D3 | Chapter count in a title | `naming.md:191` — *No "Chapter 7 of 20" in a title.* | `stations.md:312` bans a count only on a front door | C3-32 |
| D4 | Exclamation marks | `naming.md:41` — none in a title | `language-register.md:203` — allowed in prose; silent on titles | C3-11 |
| D5 | Unverifiable claims | `thesis.md`: stop, surface it, fall back to the official docs | `SKILL.md`: say so in the lesson, or drop it | C4-30 |
| D6 | Adopting a source's structure | `research-and-comparison.md:57`: structure, ordering, tone and pacing may all be studied and adopted | `SKILL.md:107`: states only the case where the owner supplies a reference | C5-16, C7-60 |
| D7 | How long before a welcome style repeats | `voice.md`, `corrections.md`: "four or five chapters later" | `SKILL.md:119` says the same; its checklist (`:315`) and audit (`beginner-experience-audit.md:61`) say "the last four" | C2-13, C7-28 |
| D8 | Lesson-shape vocabulary and weights | `voice.md`: "Practice-classified", "Theory-classified" | `stations.md`: shapes are Concept, Tool, Practice, Procedure, FrontDoor — there is no Theory | C2-65 |
| D9 | The front-door skeleton | `corrections.md` §1: ten slots, in this order | `stations.md`: a list of contents, no fixed order | C7-09 |
| D10 | Phone line length | `audience.md`: keep lines under roughly 60 characters | `beginner-experience-audit.md`: asks about wide tables and long paragraphs; no character target | C1-13 |
| D11 | What outranks a hard-to-read sentence | `corrections.md:302`: the test outranks specificity, concision **and** elegance | `SKILL.md:255`: names only elegance | C7-69 |

D8 and D9 sit in the territory of the five lesson shapes, which the owner has said are provisional
(`corrections.md` §23); they should be settled by the shape redesign, not by this migration.

### Over-flagged — 4 rows that are not conflicts

- **C2-35** (warmth vs Latinate). `language-register.md:115` is a word-swap list (*utilize → use*). `voice.md:165` says cut words that carry nothing but keep words that carry warmth. Different rules; a writer obeys both.
- **C2-44** (recap endings). The skill’s *"Delete it wherever it appears"* (`stations.md:245`) is about the *"In this lesson we learned that…"* ending. `voice.md` welcomes a recap that does new work. The wording is broad enough to misread; it is not a conflict.
- **C2-48** (contrast pair). *"Not just X, but Y"* (allowed once per chapter) and *"It’s not X — it’s Y"* (the false pivot) are different constructions.
- **C7-68** (reading aloud). The canon says read every opening aloud; the skill says read the whole draft aloud. The skill’s is a superset.

## Per-group output, as DeepSeek produced it (unedited)

Quotes in groups B–F are partly paraphrased. The verified findings above take precedence.


### Group A — audience, glossing

| Canon ID | Skill ID(s) | Verdict | Evidence |
|---|---|---|---|
| C1-01 | F3-01, F1-07 | AGREE | - |
| C1-02 | F1-08, F3-01 | AGREE | - |
| C1-03 | F1-07, F3-01 | AGREE | - |
| C1-04 | F1-08, F2-13 | AGREE | - |
| C1-05 | F3-38, F3-12, F3-14, F6-12 | AGREE | - |
| C1-09 | F3-03, F3-21, F4-07 | AGREE | - |
| C1-10 | F1-09, F3-02 | AGREE | - |
| C1-11 | F4-08, F3-48 | AGREE | - |
| C1-15 | F1-14, F3-27 | AGREE | - |
| C1-16 | F1-14, F3-30 | AGREE | - |
| C1-17 | F3-40 | AGREE | - |
| C1-19 | F1-13, F3-20, F3-22, F1-14 | AGREE | - |
| C1-20 | F1-15, F1-74, F3-34, F3-36 | AGREE | - |
| C1-32 | NONE | CANON-ONLY | - |
| C2-27 | F1-68, F4-35 | AGREE | - |
| C2-60 | F4-08 | AGREE | - |
| C2-62 | F1-14, F3-27 | AGREE | - |
| C2-63 | F1-14, F3-30 | AGREE | - |
| C2-64 | F1-15, F3-34 | AGREE | - |
| C7-37 | F3-01, F1-07 | AGREE | - |
| C7-38 | F1-08, F2-13 | AGREE | - |
| C7-39 | F1-08, F7-30 | AGREE | - |
| C7-50 | F5-06, F1-68 | AGREE | - |
| C7-52 | F1-51, F2-48, F4-08 | AGREE | - |
| C7-54 | F1-12, F3-42, F4-46 | CONTRADICT | Canon (`corrections.md` 253): "**Audience labels are allowed.** *\"If you've never programmed, don't worry\"* is now a permitted and often correct sentence." Skill F4-46 (`language-register.md` 228): "That is an audience label, and audience labels are banned everywhere in this curriculum". A writer obeying the skill bans every audience label and deletes the welcome sentence the canon says is often correct. |
| C7-69 | F1-68, F4-35 | DIFFER | Canon (`corrections.md` 302): "This test outranks specificity, concision and elegance. Every time." Skill F1-68 (`SKILL.md` 255): "**A sentence that needs a second read.** However elegant." The canon's test outranks three qualities; the skill names only elegance, so a writer can keep a sentence defended on specificity or concision grounds that still fails a beginner's first read. |

#### Skill rules on these topics that matched no canon row
F1-16, F1-17, F1-56, F1-57, F1-66, F1-67, F1-75, F1-76, F3-04, F3-05, F3-06, F3-07, F3-08, F3-09, F3-10, F3-13, F3-23, F3-24, F3-26, F3-28, F3-29, F3-31, F3-32, F3-33, F3-35, F3-37, F3-39, F3-41, F3-43, F3-44, F3-45, F3-46, F5-11, F5-12, F6-06, F6-10

#### DONE


### Group B — sentence-length, pace, density, bolding, examples, dates, statistics

| Canon ID | Skill ID(s) | Verdict | Evidence |
|---|---|---|---|
| C1-06 | F3-03, F4-07 | AGREE | - |
| C1-07 | F3-04, F6-07 | AGREE | - |
| C1-12 | F6-13 | AGREE | - |
| C1-13 | F6-13 | DIFFER | Canon: "Keep lines under roughly 60 characters where the language allows, and wrap every wide table in a horizontal scroll container." Skill: "On a phone: any wide code, any wide table, any paragraph over four lines?" A writer following the skill has no character target, so can ship a line the canon's 60-character gate flags. |
| C1-25 | F1-78, F4-37, F6-13 | AGREE | - |
| C1-33 | F2-14, F4-23, F4-24, F4-20 | AGREE | - |
| C2-25 | F2-28, F2-16 | AGREE | - |
| C2-26 | F2-05, F2-28 | AGREE | - |
| C2-33 | F1-11, F4-09, F4-10, F4-12 | AGREE | - |
| C2-34 | F1-80, F4-32, F4-38 | AGREE | - |
| C2-35 | F4-19 | DIFFER | Canon: "Cut words that carry nothing. Do not cut words that carry warmth." Skill: "Cut Latinate padding and use the short equivalents listed." A writer obeying the skill's fixed Latinate list has no warmth exception and no general empty-word test, so can strip a warm word the canon protects while leaving empty words the canon cuts. |
| C2-36 | NONE | CANON-ONLY | - |
| C2-37 | F3-08, F6-11 | AGREE | - |
| C2-38 | F1-43, F4-39, F4-25 | DIFFER | Canon: "An invented example is fully allowed when it teaches better than a real one." Skill: "Technical examples stay real and named, as always: real tools, real companies, real incidents, real numbers." A writer following the canon could invent a technical example (a fake tool or company) that the skill requires to stay real and named. |
| C2-39 | F3-08, F2-10 | AGREE | - |
| C2-40 | F2-31, F7-06, F6-11, F3-08 | AGREE | - |
| C2-41 | F2-14, F4-23, F4-24, F4-20 | AGREE | - |
| C2-49 | F1-78, F4-37, F6-13 | AGREE | - |
| C2-59 | F3-45 | AGREE | - |
| C3-30 | F2-04, F1-77 | AGREE | - |
| C4-31 | F2-28, F2-16, F2-02, F1-45 | AGREE | - |
| C4-32 | F2-28, F2-16 | AGREE | - |
| C4-33 | F2-05, F2-28, F1-71 | AGREE | - |
| C4-34 | F2-05 | AGREE | - |
| C4-35 | F2-28, F2-16 | AGREE | - |
| C4-36 | F2-04 | AGREE | - |
| C4-37 | F2-05, F2-28 | AGREE | - |
| C5-12 | F1-21 | AGREE | - |
| C5-18 | F1-43, F1-22, F1-70, F4-25 | DIFFER | Canon: "Examples are ours and may be invented; the source's own example is never lifted wholesale." Skill: "Technical examples stay real and named, as always: real tools, real companies, real incidents, real numbers." A writer following the canon's blanket permission could invent a technical example that the skill requires to stay real and named. |
| C7-10 | F1-50, F2-47, F1-30, F2-04, F1-77, F7-12 | AGREE | - |
| C7-11 | F1-79, F6-13, F3-05 | AGREE | - |
| C7-24 | F2-04 | AGREE | - |
| C7-45 | F2-05, F2-28 | AGREE | - |
| C7-46 | F2-28, F2-16, F2-05 | AGREE | - |
| C7-49 | F4-06, F4-47 | AGREE | - |
| C7-51 | F3-45 | AGREE | - |
| C7-55 | F1-78, F4-37 | AGREE | - |
| C7-56 | F1-78, F4-37, F6-13 | AGREE | - |
| C7-65 | F1-68, F4-35, F6-06 | AGREE | - |
| C7-66 | F5-14, F5-15, F6-06 | AGREE | - |
| C7-67 | F4-12, F4-13, F4-16, F5-17, F1-73 | AGREE | - |

#### Skill rules on these topics that matched no canon row
F1-10, F1-12, F1-13, F1-14, F1-39, F1-40, F1-44, F1-46, F1-57, F2-11, F2-13, F2-25, F2-27, F2-29, F2-42, F2-45, F2-54, F3-09, F3-10, F3-14, F3-25, F3-38, F4-04, F4-05, F4-08, F4-22, F4-27, F4-28, F4-29, F4-30, F4-31, F4-33, F4-34, F4-43, F6-15, F7-25

#### DONE


### Group C — headings, naming

| Canon ID | Skill ID(s) | Verdict | Evidence |
|---|---|---|---|
| C1-35 | NONE | CANON-ONLY | - |
| C2-66 | F1-28 | AGREE | - |
| C2-67 | F1-29 | AGREE | - |
| C3-01 | F1-28 | AGREE | - |
| C3-02 | F1-28 | AGREE | - |
| C3-03 | NONE | CANON-ONLY | - |
| C3-04 | F1-41, F1-64, F1-67 | AGREE | - |
| C3-05 | F1-28 | AGREE | - |
| C3-06 | NONE | CANON-ONLY | - |
| C3-07 | F1-28 | AGREE | - |
| C3-08 | NONE | CANON-ONLY | - |
| C3-09 | NONE | CANON-ONLY | - |
| C3-10 | F1-28 | AGREE | - |
| C3-11 | F4-41 | DIFFER | canon: "No marketing voice, no hype, no exclamation in a title." (naming.md:41) vs skill: "Exclamation marks are allowed where a real person would use one" (language-register.md:203). A writer obeying the skill could put an exclamation mark in a chapter or section title, which the canon bans. |
| C3-12 | NONE | CANON-ONLY | - |
| C3-13 | F4-26 | DIFFER | canon: "British spelling (`audience.md`), and the same capitalisation style across every level." (naming.md:44) vs skill: "Pick one convention and hold it across the whole book... Either is defensible; mixing them is not." (language-register.md:153). A writer obeying the skill could settle on American spelling and hold it consistently — satisfying the skill while using the spelling the canon forbids in a title. |
| C3-14 | F1-28 | AGREE | - |
| C3-15 | F1-29 | AGREE | - |
| C3-16 | F1-28 | AGREE | - |
| C3-17 | F1-29 | AGREE | - |
| C3-18 | F1-29 | AGREE | - |
| C3-19 | F1-29 | AGREE | - |
| C3-20 | F1-28 | AGREE | - |
| C3-21 | F1-29 | AGREE | - |
| C3-22 | F1-29 | AGREE | - |
| C3-23 | F1-29 | AGREE | - |
| C3-24 | F1-29 | AGREE | - |
| C3-25 | F1-28 | DIFFER | canon: "Every stage, chapter, lesson, part and section heading. It stops at reference pages - *Glossary*, *Changelog*, *FAQ*, *Code of Conduct* ... There Rule 1 alone governs, and a why would be noise." (naming.md:148-151) vs skill: "the lesson's title and every section heading say what this is and why this reader is reading it" (SKILL.md:128). A writer obeying the skill would demand a why in a Glossary or FAQ heading, which the canon exempts. |
| C3-26 | NONE | CANON-ONLY | - |
| C3-27 | NONE | CANON-ONLY | - |
| C3-28 | F1-28, F1-29 | AGREE | - |
| C3-29 | F1-29 | AGREE | - |
| C3-31 | F1-41, F1-64, F1-67, F3-46 | AGREE | - |
| C3-32 | F2-50 | DIFFER | canon: "A name is not a promise of a count. No 'Chapter 7 of 20' in a title." (naming.md:191) vs skill: "may never state a chapter count (locked decision D5)" (stations.md:312). The skill scopes the ban to a FrontDoor, so a writer obeying only the skill could put a count in a stage 1-4 chapter title the canon forbids. |
| C3-33 | NONE | CANON-ONLY | - |
| C3-34 | NONE | CANON-ONLY | - |
| C3-35 | NONE | CANON-ONLY | - |
| C3-36 | NONE | CANON-ONLY | - |
| C3-37 | NONE | CANON-ONLY | - |
| C3-38 | NONE | CANON-ONLY | - |
| C4-09 | F1-67, F3-46, F4-36 | AGREE | - |
| C4-12 | F1-28 | AGREE | - |
| C7-14 | NONE | CANON-ONLY | - |
| C7-41 | F1-67, F3-46, F4-36 | AGREE | - |
| C7-75 | F1-28 | DIFFER | canon: "Every stage, chapter, lesson, part and section heading answers two questions at once: what is this, and why would I want it... Reference pages (glossary, changelog, FAQ) are exempt" (corrections.md:345-349) vs skill: "the lesson's title and every section heading say what this is and why this reader is reading it - in three seconds, to someone holding no context at all." (SKILL.md:128). A writer obeying the skill would apply the why-rule to reference-page headings the canon exempts, and would miss the stage and part levels the canon names. |
| C7-76 | F1-29 | AGREE | - |
| C7-77 | F1-28 | AGREE | - |

#### Skill rules on these topics that matched no canon row
F7-01, F7-02, F7-03, F7-04, F7-05, F7-06, F7-07, F7-08, F7-09, F7-10, F7-11, F7-12, F7-13, F7-14, F7-15, F7-16, F7-17, F7-18, F7-19, F7-20, F7-21, F7-22, F7-23, F7-24, F7-25, F7-26, F7-27, F7-28, F7-29, F7-30

#### DONE


### Group D — openings, structure, shapes, stations

| Canon ID | Skill ID(s) | Verdict | Evidence |
|---|---|---|---|
| C1-21 | F1-25, F2-55, F4-42, F6-08 | AGREE | - |
| C1-22 | NONE | CANON-ONLY | - |
| C1-23 | F1-79, F3-05 | AGREE | - |
| C1-24 | F1-79, F6-13 | AGREE | - |
| C1-27 | F1-79, F6-13 | AGREE | - |
| C1-37 | NONE | CANON-ONLY | - |
| C2-11 | F1-24, F1-25, F2-55, F4-42, F6-08 | AGREE | - |
| C2-12 | F1-26, F4-42 | AGREE | - |
| C2-13 | F1-25, F6-08 | DIFFER | canon (voice.md 61-62) "may not reappear until four or five chapters later" vs skill F6-08 "uses a welcome style different from the last four chapters". A writer can re-use a welcome style exactly four chapters later and satisfy the canon while the skill's audit angle calls it a repeat. |
| C2-14 | F1-25, F6-09 | AGREE | - |
| C2-15 | F1-25, F2-55, F6-08 | AGREE | - |
| C2-16 | F1-27 | AGREE | - |
| C2-17 | NONE | CANON-ONLY | - |
| C2-18 | F1-30, F1-38, F6-09 | AGREE | - |
| C2-19 | F1-30 | AGREE | - |
| C2-43 | F1-26, F4-42 | AGREE | - |
| C2-44 | F1-62, F2-37 | DIFFER | canon (voice.md 215-218) "A chapter-level recap that does *new* work — retrieval questions, a what-you-can-now-do list — is not this, and is welcome" vs skill F2-37 "The recap ending must be deleted wherever it appears". A writer following the skill's blanket deletion would cut the chapter-level recap the canon explicitly welcomes. |
| C2-65 | F1-49, F2-41, F2-44 | DIFFER | canon (voice.md 289-293) "a Practice-classified lesson leans on How and Retrieve ... a Theory-classified lesson on Why and What" vs skill F2-44 "Weight S5 and S8 heavily, keep everything else short, and make S10 an actual rep". A writer working from the canon would lean a Practice lesson on Retrieve and never treat When (S8) as its other heavy station, and would look for a "Theory" shape the skill calls Concept. |
| C4-03 | NONE | CANON-ONLY | - |
| C4-06 | NONE | CANON-ONLY | - |
| C4-07 | NONE | CANON-ONLY | - |
| C4-08 | NONE | CANON-ONLY | - |
| C4-11 | NONE | CANON-ONLY | - |
| C4-13 | NONE | CANON-ONLY | - |
| C4-14 | NONE | CANON-ONLY | - |
| C4-15 | NONE | CANON-ONLY | - |
| C4-16 | F3-49 | AGREE | - |
| C4-17 | NONE | CANON-ONLY | - |
| C4-18 | NONE | CANON-ONLY | - |
| C4-19 | NONE | CANON-ONLY | - |
| C7-05 | F1-50, F2-47, F7-12 | AGREE | - |
| C7-06 | F4-34 | AGREE | - |
| C7-07 | F1-50, F2-47 | AGREE | - |
| C7-08 | F1-51, F2-48 | AGREE | - |
| C7-09 | F2-49, F2-57 | DIFFER | canon (corrections.md 31) "The page skeleton. Ten slots, in this order." vs skill (stations.md 343) "A stage's first position introduces the stage itself — what it is, what it covers, in what order, why that order, what it costs the reader, and where it ends." A writer working from the skill's item list would build a front door with no fixed slot order and none of the canon's worked-object, practical-honesty and one-real-risk slots. |
| C7-12 | F2-49, F2-50 | AGREE | - |
| C7-15 | F1-37, F7-24 | AGREE | - |
| C7-16 | NONE | CANON-ONLY | - |
| C7-25 | NONE | CANON-ONLY | - |
| C7-27 | F1-25, F2-55, F6-08 | AGREE | - |
| C7-28 | F1-25, F6-08 | DIFFER | canon (corrections.md 152) "Vary the wording — no welcome style reappears until four or five chapters later." vs skill F6-08 "uses a welcome style different from the last four chapters". A writer can bring a welcome style back after exactly four chapters and satisfy the canon while the skill's audit calls the style a repeat. |
| C7-29 | F1-25, F2-55, F6-08 | AGREE | - |
| C7-30 | F1-25 | AGREE | - |
| C7-31 | F1-25, F6-09 | AGREE | - |
| C7-32 | F1-26 | AGREE | - |
| C7-33 | NONE | CANON-ONLY | - |
| C7-34 | F1-27, F6-08 | AGREE | - |
| C7-35 | F1-79, F6-13 | AGREE | - |
| C7-36 | F1-27 | AGREE | - |
| C7-42 | F3-49 | AGREE | - |
| C7-57 | F1-78, F1-79 | AGREE | - |
| C7-92 | F1-48 | AGREE | - |
| C7-93 | F1-47, F1-48 | AGREE | - |

#### Skill rules on these topics that matched no canon row
F1-28, F1-29, F1-31, F1-32, F1-33, F1-34, F1-35, F1-36, F1-41, F1-42, F1-52, F1-54, F1-55, F1-57, F1-58, F1-59, F1-63, F1-64, F1-69, F1-82, F2-01, F2-02, F2-03, F2-04, F2-05, F2-06, F2-07, F2-08, F2-09, F2-10, F2-11, F2-12, F2-13, F2-14, F2-15, F2-16, F2-17, F2-18, F2-19, F2-20, F2-21, F2-22, F2-23, F2-24, F2-25, F2-26, F2-27, F2-28, F2-29, F2-30, F2-31, F2-32, F2-33, F2-34, F2-35, F2-36, F2-38, F2-39, F2-40, F2-42, F2-43, F2-45, F2-46, F2-51, F2-52, F2-53, F2-54, F2-56, F2-58, F2-59, F3-11, F3-12, F3-13, F3-14, F3-15, F3-16, F3-17, F3-18, F3-19, F6-14, F6-15, F7-03, F7-04, F7-05, F7-06, F7-07, F7-08, F7-23, F7-25, F7-26, F7-27, F7-28, F7-29, F7-30

#### DONE


### Group E — safety, research

| Canon ID | Skill ID(s) | Verdict | Evidence |
|---|---|---|---|
| C2-21 | NONE | CANON-ONLY | - |
| C2-23 | F1-19 | AGREE | - |
| C2-24 | F1-22, F2-04 | AGREE | - |
| C4-20 | F2-50 | AGREE | - |
| C4-23 | F2-50 | AGREE | - |
| C4-24 | F1-10 | AGREE | - |
| C4-25 | NONE | CANON-ONLY | - |
| C4-26 | NONE | CANON-ONLY | - |
| C4-27 | F3-03, F4-07 | AGREE | - |
| C4-28 | NONE | CANON-ONLY | - |
| C4-29 | F1-19, F1-72 | AGREE | - |
| C4-30 | F1-45, F1-46 | DIFFER | Canon: "If a source is unavailable, stale, disputed, or retracted: stop and surface it. Fall back to the official docs." Skill F1-46: "Where a fact cannot be verified, say so in the lesson or drop it." A writer obeying the skill keeps the unverifiable claim in the lesson with a note instead of stopping, surfacing it and falling back to the official docs. |
| C5-01 | F1-19 | AGREE | - |
| C5-02 | NONE | CANON-ONLY | - |
| C5-05 | F1-19 | AGREE | - |
| C5-06 | F1-20 | AGREE | - |
| C5-07 | F1-05, F1-19 | AGREE | - |
| C5-08 | F1-19 | AGREE | - |
| C5-10 | F1-05, F1-19 | AGREE | - |
| C5-11 | F1-21 | AGREE | - |
| C5-13 | F1-21 | AGREE | - |
| C5-14 | F1-21, F1-22 | AGREE | - |
| C5-15 | F1-22 | AGREE | - |
| C5-16 | F1-22 | DIFFER | Canon: a source's "structure, its ordering, its tone, the kind of example it reaches for, its interface decisions and its pacing may all be studied and adopted". Skill F1-22: "structure and pattern may be reused where the owner supplies a reference and asks for its shape". A writer obeying the canon adopts a source's structure freely; obeying the skill, only when the owner has supplied a reference. |
| C5-17 | F1-22 | AGREE | - |
| C5-19 | F1-22, F2-16 | AGREE | - |
| C5-20 | F1-22 | AGREE | - |
| C5-21 | F1-05, F1-23 | AGREE | - |
| C6-01 | F1-05 | AGREE | - |
| C6-02 | NONE | CANON-ONLY | - |
| C6-04 | NONE | CANON-ONLY | - |
| C6-07 | NONE | CANON-ONLY | - |
| C6-08 | NONE | CANON-ONLY | - |
| C6-09 | NONE | CANON-ONLY | - |
| C6-10 | NONE | CANON-ONLY | - |
| C6-11 | NONE | CANON-ONLY | - |
| C6-13 | NONE | CANON-ONLY | - |
| C6-14 | F1-22 | AGREE | - |
| C6-15 | F1-22 | AGREE | - |
| C6-16 | F1-19 | AGREE | - |
| C6-17 | F1-19 | AGREE | - |
| C6-18 | F1-46 | AGREE | - |
| C6-19 | F2-34 | AGREE | - |
| C6-20 | F2-34 | AGREE | - |
| C6-21 | F2-34 | AGREE | - |
| C7-13 | NONE | CANON-ONLY | - |
| C7-23 | F1-77, F2-04 | AGREE | - |
| C7-43 | F1-19, F1-23 | AGREE | - |
| C7-44 | F2-02, F1-40 | AGREE | - |
| C7-60 | F1-22 | DIFFER | Canon: "Study a source for everything it can teach ... Adopt what is good." Skill F1-22: "structure and pattern may be reused where the owner supplies a reference and asks for its shape". A writer obeying the canon adopts whatever a studied source does well; obeying the skill, only an owner-supplied reference's shape may be reused. |
| C7-61 | F1-19 | AGREE | - |
| C7-62 | F1-22 | AGREE | - |
| C7-63 | F2-16 | AGREE | - |

#### Skill rules on these topics that matched no canon row
F1-39, F2-03, F2-05, F2-28, F3-09, F6-05, F7-09, F7-10, F7-11, F7-12, F7-13, F7-14, F7-15, F7-16, F7-17

#### DONE


### Group F — other

| Canon ID | Skill ID(s) | Verdict | Evidence |
|---|---|---|---|
| C1-14 | F1-05 | AGREE | - |
| C1-26 | F1-14, F3-27, F3-28 | AGREE | - |
| C1-28 | F4-41 | AGREE | - |
| C1-29 | F1-79, F6-13 | AGREE | - |
| C1-31 | F4-26 | DIFFER | Canon: "Spelling: British"; skill: "Pick one convention and hold it across the whole book ... Either is defensible". A writer obeying only the skill may pick American spelling, which the canon calls "a defect, not a preference". |
| C1-36 | NONE | CANON-ONLY | - |
| C1-38 | NONE | CANON-ONLY | - |
| C1-39 | NONE | CANON-ONLY | - |
| C2-02 | F1-24, F1-51, F2-48 | AGREE | - |
| C2-03 | F1-12, F4-41 | AGREE | - |
| C2-04 | F4-31, F4-38 | AGREE | - |
| C2-05 | F1-10, F4-04 | AGREE | - |
| C2-06 | F4-41 | AGREE | - |
| C2-07 | F1-12, F4-31 | AGREE | - |
| C2-09 | NONE | CANON-ONLY | - |
| C2-20 | F4-40 | AGREE | - |
| C2-22 | F1-46, F4-41 | AGREE | - |
| C2-32 | F1-11, F4-11 | AGREE | - |
| C2-42 | F3-47, F4-19, F4-45 | AGREE | - |
| C2-45 | F1-80, F4-33 | AGREE | - |
| C2-46 | F1-80, F4-32 | AGREE | - |
| C2-47 | F1-46, F4-40 | AGREE | - |
| C2-48 | F1-80, F4-32 | DIFFER | Canon: "'Not just X, but Y' is a good sentence once per chapter and a verbal tic after that"; skill: "'it's not X — it's Y'" under "Machine cadence" and "The false pivot". A writer obeying the skill would strike the one contrast-pair the canon still permits once per chapter. |
| C2-50 | F1-67, F3-46, F4-36 | AGREE | - |
| C2-51 | NONE | CANON-ONLY | - |
| C2-52 | F4-41 | AGREE | - |
| C2-53 | F4-41 | AGREE | - |
| C2-54 | F4-41 | AGREE | - |
| C2-55 | NONE | CANON-ONLY | - |
| C2-56 | F1-51, F2-48, F3-45 | AGREE | - |
| C2-57 | F1-51, F3-45 | AGREE | - |
| C2-58 | F1-51, F2-48 | AGREE | - |
| C2-61 | F1-10, F4-04, F4-08 | AGREE | - |
| C4-02 | F2-04, F2-05, F2-28 | AGREE | - |
| C4-04 | NONE | CANON-ONLY | - |
| C4-05 | NONE | CANON-ONLY | - |
| C4-22 | NONE | CANON-ONLY | - |
| C7-40 | F1-67, F3-46, F4-36 | AGREE | - |
| C7-47 | F3-03, F4-06, F4-07, F4-19 | AGREE | - |
| C7-48 | F1-10, F4-04, F4-05 | AGREE | - |
| C7-53 | F4-41 | AGREE | - |
| C7-58 | F1-79, F6-13 | AGREE | - |
| C7-74 | NONE | CANON-ONLY | - |
| C7-83 | NONE | CANON-ONLY | - |
| C7-84 | NONE | CANON-ONLY | - |
| C7-85 | F1-05 | AGREE | - |

#### Skill rules on these topics that matched no canon row
F1-66, F1-68, F1-73, F1-77, F1-78, F3-05, F3-39, F3-41, F3-42, F3-43, F3-44, F4-09, F4-10, F4-12, F4-13, F4-14, F4-15, F4-16, F4-17, F4-18, F4-20, F4-21, F4-27, F4-28, F4-29, F4-30, F4-34, F4-35, F4-37, F4-39, F4-42, F4-43, F4-44, F4-46, F4-47, F6-06, F6-10, F7-12

#### DONE


### Group G — process

| Canon ID | Skill ID(s) | Verdict | Evidence |
|---|---|---|---|
| C1-08 | F6-01, F1-60, F5-02 | AGREE | - |
| C1-18 | F3-32, F3-37 | AGREE | - |
| C1-30 | F4-01 | AGREE | - |
| C1-34 | NONE | CANON-ONLY | - |
| C2-01 | NONE | CANON-ONLY | - |
| C2-08 | NONE | CANON-ONLY | - |
| C2-10 | NONE | CANON-ONLY | - |
| C2-28 | NONE | CANON-ONLY | - |
| C2-29 | NONE | CANON-ONLY | - |
| C2-30 | F1-21 | AGREE | - |
| C2-31 | F1-21 | AGREE | - |
| C4-01 | NONE | CANON-ONLY | - |
| C4-10 | F1-19, F1-45 | AGREE | - |
| C4-21 | NONE | CANON-ONLY | - |
| C5-03 | F1-23, F1-05 | AGREE | - |
| C5-04 | F1-19, F1-05 | AGREE | - |
| C5-09 | F1-19, F1-05 | AGREE | - |
| C5-22 | NONE | CANON-ONLY | - |
| C5-23 | NONE | CANON-ONLY | - |
| C5-24 | F1-61 | AGREE | - |
| C6-03 | NONE | CANON-ONLY | - |
| C6-05 | NONE | CANON-ONLY | - |
| C6-06 | NONE | CANON-ONLY | - |
| C6-12 | NONE | CANON-ONLY | - |
| C7-01 | NONE | CANON-ONLY | - |
| C7-02 | NONE | CANON-ONLY | - |
| C7-03 | F2-03 | AGREE | - |
| C7-04 | F1-04 | AGREE | - |
| C7-17 | NONE | CANON-ONLY | - |
| C7-18 | NONE | CANON-ONLY | - |
| C7-19 | NONE | CANON-ONLY | - |
| C7-20 | NONE | CANON-ONLY | - |
| C7-21 | NONE | CANON-ONLY | - |
| C7-22 | NONE | CANON-ONLY | - |
| C7-26 | NONE | CANON-ONLY | - |
| C7-59 | NONE | CANON-ONLY | - |
| C7-64 | NONE | CANON-ONLY | - |
| C7-68 | F4-44 | DIFFER | canon "Read every opening aloud. If you stumble, the reader stops." (corrections.md:301) vs skill "Read the draft aloud, or subvocalise it at speaking pace" (language-register.md:210). A writer obeying the canon reads only openings aloud and can ship a mid-chapter sentence they would stumble over. |
| C7-70 | NONE | CANON-ONLY | - |
| C7-71 | NONE | CANON-ONLY | - |
| C7-72 | NONE | CANON-ONLY | - |
| C7-73 | NONE | CANON-ONLY | - |
| C7-78 | NONE | CANON-ONLY | - |
| C7-79 | F1-28 | AGREE | - |
| C7-80 | F1-20 | CONTRADICT | canon "There is no default, and the 95% figure in `command-code-delegation` does not apply to this book's prose" (corrections.md:398-403) vs skill "Delegated to DeepSeek through `command-code-delegation` around 95% of the time" (SKILL.md:100). A writer obeying the skill hands the prose to DeepSeek at the standing 95% split without asking, which the canon forbids. |
| C7-81 | F1-20 | CONTRADICT | canon lists "Delegating the draft and rewriting it afterwards without having asked" as not a fix (corrections.md:407-409) vs skill "Delegated to DeepSeek through `command-code-delegation` around 95% of the time" (SKILL.md:100). A writer obeying the skill delegates the draft at the default 95% split without asking. |
| C7-82 | NONE | CANON-ONLY | - |
| C7-86 | NONE | CANON-ONLY | - |
| C7-87 | NONE | CANON-ONLY | - |
| C7-88 | NONE | CANON-ONLY | - |
| C7-89 | NONE | CANON-ONLY | - |
| C7-90 | NONE | CANON-ONLY | - |
| C7-91 | NONE | CANON-ONLY | - |
| C7-94 | NONE | CANON-ONLY | - |
| C7-95 | NONE | CANON-ONLY | - |
| C7-96 | NONE | CANON-ONLY | - |
| C7-97 | NONE | CANON-ONLY | - |
| C7-98 | NONE | CANON-ONLY | - |

#### Skill rules on these topics that matched no canon row
F1-01, F1-03, F1-07, F1-18, F1-22, F1-42, F1-46, F1-47, F1-48, F1-52, F1-53, F1-54, F1-56, F1-58, F1-81, F1-83, F2-02, F2-54, F2-58, F3-07, F3-19, F3-24, F3-50, F4-45, F4-48, F5-01, F5-07, F5-08, F5-09, F5-22, F5-23, F5-24, F6-04, F6-05, F6-16, F6-17, F7-09, F7-10, F7-11, F7-12, F7-13, F7-14, F7-15, F7-16, F7-17

#### DONE
