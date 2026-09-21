# Canon — the shape of the course

*Created 21 September 2026, at the owner's request: "make a new md file for these type of decisions like stages, content changing, hierarchy, chapters, lessons, parts, stages, learning first naming or learners first naming etc, because these decisions are going to be update continuously with time, and in a proper file this will be written and update to make it easy, to prevent changing 10s of files for these organizational decisions."*

This is the one place where decisions about the **shape of the course** are written down: who the reader is, what the levels are, how they nest, what kind of name each level gets, what a learner-level label means, and what the stages are. These decisions will change often. That is why they have their own file.

**Read this file before** you name, rename, split or plan any stage, course, chapter or lesson, and before you write any sentence about who the book is for.

## How to use this file

1. **Change a decision here first.** Other files should point to this one. They should not repeat a decision. A file that repeats one is a copy, and section 7 lists the known copies.
2. **Every decision has a status.** *DECIDED* means the owner said it. *OPEN* means the owner has not chosen yet. *PROPOSED* means Claude suggested it and the owner has not chosen. Only the owner moves something to DECIDED.
3. **Nothing is deleted.** An old decision is marked *SUPERSEDED*, with the date and the number of the decision that replaced it. The change log (section 8) only grows.
4. **Claude proposes here. Claude does not decide here.** Section 6 holds options, and options are not decisions.
5. **The Constitution wins.** If a decision here disagrees with `.specify/memory/constitution.md`, the Constitution stands until it is amended (see its Governance section). Section 7 lists what needs an amendment.

## 1. Who the course is for

| # | Decision | Status | Date |
|---|---|---|---|
| CS-1 | **The reader is a beginner who starts from zero, and the book takes them to expert level.** "Beginner" names where the reader *starts*. It says nothing about how far the book goes. | DECIDED | 21 Sep 2026 |
| CS-2 | **There is no separate senior or experienced reader, in any stage.** The person who reads the last stage is the person who read the first one, further along the road. | DECIDED | 21 Sep 2026 |

The owner's words: *"the content is FOR beginners TO MAKE them EXPERTS. input is beginning, and output is expert/mastery level."* And: *"no senior level is no longer allowed, just beginner to senior."* (`corrections.md` §26 holds the full record.)

**Why this needed saying.** "The content is for beginners" has two meanings that are completely different. It can mean *the reader is a beginner when they start* (this book). Or it can mean *the content stays at beginner level* (not this book). Earlier records only said "beginners", and the second meaning was never ruled out. CS-1 rules it out.

**What stays the same.** Stages 0 to 2 still assume a reader who has never programmed (`audience.md`, `corrections.md` §8). Stages 3 and 4 stay parked, as the owner decided on 20 September. This file does not reopen them.

**Claude's reading, to confirm in the redesign (not a decision):** a later stage may use what the earlier stages taught, because its reader has finished them. It still explains every new word and never tells any reader to skip.

## 2. The levels of the course today

*The records describe the levels in two slightly different ways, and that is the source of the confusion. CS-Q3 is about settling one. The redesign may change every row (CS-6).*

| Level | The owner's final call, 14 September 2026 (`curriculum-state/proposals/whole-book-redesign-record-2026-09-14.md`) | What readers are told today (`welcome.md`, `corrections.md` §5) |
|---|---|---|
| **Stage** | One big part of the journey. Five today, numbered 0 to 4, always in the same order. | The same. The number five is under review (CS-6). |
| **Chapter** | The second level. | One complete sitting, start to finish, in one file. Most of the book lives here. |
| **Lesson** | The third level. | The exception: a topic that is too big or too mixed for one sitting splits into a Lesson or a Part. |
| **Part** | An optional fourth level, used only inside a Lesson that is too long or mixed to stay one unit. | Named together with Lesson ("Lesson or Part"), as one slot with two words. |

Rules that hold at every level, whatever the names become: a chapter is one continuous read; no fixed chapter list or chapter count is ever written down (`CLAUDE.md`, locked decision D5); every name follows `naming.md`.

## 3. How things are named

| # | Decision | Status | Date |
|---|---|---|---|
| CS-3 | **Names are learning-first.** The name of a stage or a course says *what is learned* ("Introduction to Programming with Python"). It never says who the reader is ("Python for Beginners") or how hard it is ("Advanced Python"). | DECIDED | 21 Sep 2026 |

The owner's words: *"this will be a learning-first naming convention like introduction to SDE, introduction to programming with python, introduction to programming with javascript etc, not python-beginner level, advanced python when it Comes to stage"*.

`naming.md` already points the same way (Rule 2 uses *Introduction to Programming with Python* as its example). This file decides **what kind of name** each level gets. `naming.md` decides **how a name is written**: it explains itself, it reads like an international course, and it carries the why. All three of its rules still apply to every name.

## 4. Learner-level labels

| # | Decision | Status | Date |
|---|---|---|---|
| CS-4 | **Learner levels (Beginner, Intermediate, Advanced) are used inside a subject, on its chapters and sub-chapters. They are not used in stage or course names.** The purpose is motivation: the learner can see the road ahead and wants to reach the next step. | DECIDED in principle. How a label looks and works is OPEN (CS-Q4). | 21 Sep 2026 |

The owner's words: *"within the python chapters and subchapters, we will introduce the Learner's level like beginner, intermediate, and advanced, so that the students will be motivated and curios for new steps completing."*

The owner's two kinds of "level", kept here because the whole decision rests on them:

| | What it describes | Example | Where it goes |
|---|---|---|---|
| **The learner's level** | The person's skill | "I am a beginner." | Labels on chapters (CS-4) |
| **The learning stage** | What the course is doing | "This course is an introduction to Python." | Names of stages and courses (CS-3) |

**A rule to settle first (CS-Q4).** The Constitution and the writing skill ban *audience labels* in reader-facing prose ("if you're new to this", "experienced readers will know"), because they tell some readers that part of the book is not theirs. A "Beginner" tag on a chapter can look like the same thing. Proposed way to keep both: *a level label says where a chapter sits on the road. It never says who should read it, and it never says who may skip it.* Until the owner decides, no chapter carries a level label.

## 5. The stages

*In force until the redesign lands (CS-6). The names are from `thesis.md`.*

| Stage | Name today |
|---|---|
| 0 | Introduction to Computing: From Switches to AI Agents |
| 1 | Spec-Aware Vibe Engineering Foundations |
| 2 | Credible Validation Through International Certification |
| 3 | Mastering AI Coding Agents |
| 4 | Engineering Autonomous AI Agents |

| # | Decision | Status | Date |
|---|---|---|---|
| CS-5 | **Stage 0 will be named "Introduction to SDE".** | DECIDED (the name). Applied when the redesign lands. | 21 Sep 2026 |
| CS-6 | **The whole curriculum is being rethought and replanned, not only the names.** The owner: *"Complete change is going to happen in curriculum."* | DECIDED (the direction). Not started. | 21 Sep 2026 |
| CS-7 | **Decisions of this kind are written in this file and changed here first.** Other files point here. | DECIDED | 21 Sep 2026 |

**Two notes about CS-5 (Claude's, not decisions).** First, `naming.md` Rule 1 says a name must explain itself to someone who has never programmed. "SDE" alone does not. In this book it means Spec-Driven Engineering, but in job adverts "SDE" usually means Software Development Engineer. The safe form is the full name in the title ("Introduction to Spec-Driven Engineering") with "SDE" used as the short form after it has been explained and linked to the glossary. Second, the owner also said *"the first 3 stages will be Introduction to SDE"*. Does the name belong to Stage 0 alone, or to Stages 0 to 2 together? That is CS-Q2.

## 6. Open questions, with Claude's options

*None of this is decided. Each question says what the owner needs to choose.*

### CS-Q1. Can one stage hold more than one subject?

The owner's examples, *Introduction to Programming with Python* and *Introduction to Programming with JavaScript*, sound like subjects. If one stage holds several subjects, the structure needs a level between Stage and Chapter.

| Option | Levels, outside to inside | Good | Watch out |
|---|---|---|---|
| **A. Keep the outer levels as they are** | Stage → Chapter | The simplest. The files and the site already work this way. | A subject such as Python must become a whole stage, or a loose run of chapters. |
| **B. Add a Course level** *(Claude leans here)* | Stage → Course → Chapter | Matches the owner's examples. Readers think in subjects. Five of the eight programs studied below have four or more levels. | One more level, and longer file paths. A reader still sees only three at a time (Stage, Course, Chapter), because lessons and parts exist only when a chapter splits. |
| **C. Make the learner levels folders** | Stage → Level (Beginner / Intermediate / Advanced) → Chapter | The road is very easy to see. | It builds a person's skill into the structure of the book, which mixes the two kinds of level in section 4. Renaming a level means moving files. Claude does not recommend it. |

**Claude's lean and why.** B if any stage holds more than one subject. A if every stage is one subject. In both, the learner-level label goes on the chapter as a small tag (CS-4), never in the folder structure, so it can change without moving a file.

### CS-Q2. What does "Introduction to SDE" name?

Stage 0 alone, or Stages 0 to 2 together? And is the title spelled out (see the first note under CS-5)?

### CS-Q3. What are the levels inside a chapter, and how many?

The owner's own words for the finished shape were *"stage -> chapter -> lessons -> parts (if any)"*, which is the 14 September call. Readers are told something different today ("Lesson or Part"). Three options:

| Option | Inside a stage | Good | Watch out |
|---|---|---|---|
| **1. Two inner levels, words kept apart** *(the owner's 14 September call)* | Chapter → Lesson → Part (if any) | The finest splits, which the owner reads as more professional (`corrections.md` §5). Each level has one job. | Three levels inside a stage. Lesson and Part each need a one-line job, so they are never used for the same thing. |
| **2. One inner level** | Chapter → Lesson | Only one word to learn. Enough for a real seam. | A very large lesson has nowhere to split again. |
| **3. What readers are told today** | Chapter → "Lesson or Part" | Nothing to change. | One slot with two words. A reader cannot tell which to expect. Claude does not recommend it. |

**Claude's lean.** Option 1 if the owner wants the finest splits, option 2 if simplicity matters more. Either way, the word "Lesson" depends on the lesson → Chapter task below, because the writing skill uses "lesson" for what the book calls a Chapter.

### CS-Q4. How does a learner-level label work?

- **Meaning.** Proposed wording rule: *a label says where a chapter sits on the road. It never says who should read it or who may skip it* (section 4).
- **Where it sits.** The owner said chapters and sub-chapters. In the programs studied below, the label sits on the whole course or path, never on every small unit. Both can hold if a chapter's label comes from the band of chapters it belongs to, so renaming a band is one change.
- **The feeling of moving up.** The programs that motivate best add something the learner *earns* (mastery levels, badges, points). This site tracks nothing about a reader (`welcome.md`). Claude's proposal (PROPOSED, not from the research): a short *"You can now..."* checkpoint at the end of each band gives the same feeling with no tracking.

### The lesson → Chapter task

The writing skill uses "lesson" for what this book calls a Chapter. It is a separate task and it waits for the owner (*"in morning, I will understand the actual issue of lesson -> chapter thing, then I will direct you"*). Nothing about it has started, and no correction has been written for it.

### How well-known programs do it

Gathered by DeepSeek from each program's own pages on 21 September 2026. Every fact in the table was checked by script against the text of the pages it fetched (one fact it reported, a "weeks" level for CS50, was not found there and is left out). The full record is in [`level-naming-research.md`](../../history/reports/course-structure-2026-09-21/level-naming-research.md).

| Program | Levels, biggest to smallest | Difficulty label | Earned progress |
|---|---|---|---|
| Harvard CS50x and CS50P | Course → numbered problem sets (Problem Set 0, 1, 2 ...) | None found. The pages state who the course is for in one sentence | Certificates |
| freeCodeCamp | Certification → module → lesson / workshop / lab | None found | A free verified certification |
| The Odin Project | Path → course → section / lesson → project | None found | None. Readers tick off their own progress |
| Khan Academy | Course → unit → lesson or skill → practice | None found | Mastery levels on each skill: Not started, Attempted, Familiar, Proficient, Mastered |
| Coursera | Specialization → course → module → items | "Beginner level" on the course | Certificates |
| Microsoft Learn | Learning path → module → unit | Beginner, intermediate and advanced, on paths and modules | XP, badges for modules, trophies for paths |
| Codecademy | Career path → skill path → course → unit → lesson | "Skill level Beginner" on the career path | Badges, streaks, XP, certificates |
| MDN Learn web development | Learn → module groups (Getting started, Core, Extension) → modules → articles | Tiers by module group, without the words Beginner / Intermediate / Advanced | None found |

Three things stand out. **The top names say what is taught** (*Introduction to Programming with Python*, *Responsive Web Design Certification*, *Full Stack JavaScript*), which supports CS-3. **The number of levels runs from three to five** (five of the eight programs have four or more), so three levels is normal and four is common. **Where a Beginner / Intermediate / Advanced label exists, it sits on the subject-sized unit** (the course, the path or the module), not on every small unit.

## 7. Files that still say something different

Each row is a copy or a claim that this file may overtake. None is changed yet. When the redesign lands, each one is either changed to match or turned into a pointer to this file.

| File | What it says now | Decision it disagrees with |
|---|---|---|
| `.specify/memory/constitution.md`, Principle IX | The audience is beginners only | CS-1 and CS-2 need saying in its own words. This is an amendment: it needs a written proposal and the owner's consent. |
| `curriculum-state/canon/audience.md`, "The named groups" table | Rows 2 to 5 list four other readers as *"Later stages, undecided"* | CS-2 |
| `curriculum-state/canon/thesis.md`, the stage table | The five stage names above | CS-5 and CS-6 |
| `edu-site/docs/welcome.md` and `edu-site/docs/faq.md` ("What are the five stages?") | Five stages; the levels in section 2 | CS-6 |
| `CLAUDE.md` | The five stage folders; the paragraph that translates "lesson" into Chapter | CS-6 and the lesson → Chapter task |
| `.claude/skills/lesson-spine-authoring/` | The word "lesson" 133 times for the chapter-sized unit | The lesson → Chapter task |
| `edu-site/sidebars.ts`, `edu-site/scripts/check-frontmatter.mjs` (`STAGE_FILES`) | The folder and file structure | Any change to the levels in section 2 |

## 8. Change log

Newest last. Never edit an old line.

- **21 September 2026.** File created. CS-1 to CS-7 entered from the owner's messages of 21 September. CS-Q1 to CS-Q4 and the comparison table entered as Claude's proposals. Nothing outside this file was changed to match.
