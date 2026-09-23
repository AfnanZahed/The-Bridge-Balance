# Canon — the shape of the course

*Created 21 September 2026, at the owner's request: "make a new md file for these type of decisions like stages, content changing, hierarchy, chapters, lessons, parts, stages, learning first naming or learners first naming etc, because these decisions are going to be update continuously with time, and in a proper file this will be written and update to make it easy, to prevent changing 10s of files for these organizational decisions."*

*Updated later on 21 September 2026, after the owner's second round of answers. The change log (section 8) says what changed.*

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

**Confirmed again later on 21 September.** The owner: *"yes, one reader, but make it expert. it will be beginner -> Expertise, gradually."* They also said that who reads the last stages *"doesn't matter anymore, because the whole curriculum is going to be redesigned"*, so CS-2 stands for every stage the redesign produces.

**Why this needed saying.** "The content is for beginners" has two meanings that are completely different. It can mean *the reader is a beginner when they start* (this book). Or it can mean *the content stays at beginner level* (not this book). Earlier records only said "beginners", and the second meaning was never ruled out. CS-1 rules it out.

**What stays the same.** Stages 0 to 1 still assume a reader who has never programmed (`audience.md`, `corrections.md` §8). Stage 2 stays parked, as the owner decided on 20 September. This file does not reopen it. *(22 September 2026: the numbering changed — there is no Stage 3 or 4 now; see section 5. The floor's own wording is CS-Q7 in section 6.)* **(22 September 2026, later: this sentence read "Stages 0 to 2 still assume a reader who has never programmed … Stages 3 and 4 stay parked". The floor is now Stages 0–1 and the parked stage is Stage 2 — CS-31; the owner's 20 September parking decision is otherwise unchanged.)**

**Claude's reading, to confirm in the redesign (not a decision):** a later stage may use what the earlier stages taught, because its reader has finished them. It still explains every new word and never tells any reader to skip.

## 2. The levels of the course today

*The records describe the levels in two slightly different ways, and that was the source of the confusion. The owner settled it on 21 September (CS-8, just below the table). The redesign may still change every row (CS-6).*

| Level | The owner's final call, 14 September 2026 (`curriculum-state/proposals/whole-book-redesign-record-2026-09-14.md`) | What readers are told today (`welcome.md`, `corrections.md` §5) |
|---|---|---|
| **Stage** | One big part of the journey. Five today, numbered 0 to 4, always in the same order. *(Superseded 22 September 2026: three stages now, plus a parallel Credentials track — section 5.)* | The same. The number five is under review (CS-6). |
| **Chapter** | The second level. | One complete sitting, start to finish, in one file. Most of the book lives here. |
| **Lesson** | The third level. | The exception: a topic that is too big or too mixed for one sitting splits into a Lesson or a Part. |
| **Part** | An optional fourth level, used only inside a Lesson that is too long or mixed to stay one unit. | Named together with Lesson ("Lesson or Part"), as one slot with two words. |

Rules that hold at every level, whatever the names become: a chapter is one continuous read; no fixed chapter list or chapter count is ever written down (`CLAUDE.md`, locked decision D5); every name follows `naming.md`.

| # | Decision | Status | Date |
|---|---|---|---|
| CS-8 | **The levels are Stage → Course → Chapter → Lesson → Part (if any).** A stage can hold more than one subject, so a Course sits between Stage and Chapter. Inside a chapter, a Lesson is a smaller unit, and a Part exists only inside a Lesson that is too long or too mixed to stay one unit. | DECIDED (the shape). The braided-learning problem (CS-Q5) may change what a Course is. | 21 Sep 2026 |

The owner's words: *"Ok, I accept the Stage → Course → Chapter."* For the inside of a chapter, *"Chapter → Lesson → Part (if any)"*. The wording readers are told today ("Lesson or Part", right-hand column above) is replaced by CS-8. The site still says it, because the site changes when the redesign lands (section 7).

## 3. How things are named

| # | Decision | Status | Date |
|---|---|---|---|
| CS-3 | **Names are learning-first.** The name of a stage or a course says *what is learned* ("Introduction to Programming with Python"). It never says who the reader is ("Python for Beginners") or how hard it is ("Advanced Python"). | DECIDED | 21 Sep 2026 |

The owner's words: *"this will be a learning-first naming convention like introduction to SDE, introduction to programming with python, introduction to programming with javascript etc, not python-beginner level, advanced python when it Comes to stage"*.

`naming.md` already points the same way (Rule 2 uses *Introduction to Programming with Python* as its example). This file decides **what kind of name** each level gets. `naming.md` decides **how a name is written**: it explains itself, it reads like an international course, and it carries the why. All three of its rules still apply to every name.

## 4. Learner-level labels

| # | Decision | Status | Date |
|---|---|---|---|
| CS-4 | **Learner levels (Beginner, Intermediate, Advanced) are used inside a subject, on its chapters and sub-chapters. They are not used in stage or course names.** The purpose is motivation: the learner can see the road ahead and wants to reach the next step. | DECIDED. Labels are allowed, with no special rule. How a label looks is still OPEN (CS-Q4). | 21 Sep 2026 |

The owner's words: *"within the python chapters and subchapters, we will introduce the Learner's level like beginner, intermediate, and advanced, so that the students will be motivated and curios for new steps completing."*

The owner's two kinds of "level", kept here because the whole decision rests on them:

| | What it describes | Example | Where it goes |
|---|---|---|---|
| **The learner's level** | The person's skill | "I am a beginner." | Labels on chapters (CS-4) |
| **The learning stage** | What the course is doing | "This course is an introduction to Python." | Names of stages and courses (CS-3) |

**No rule stands in the way (corrected 21 September).** An earlier version of this file said the Constitution and the writing skill still ban *audience labels*, and that a "Beginner" tag might break the ban. That was wrong. The ban was withdrawn on 20 September: `corrections.md` §13, `CLAUDE.md` and the writing skill all say audience labels are allowed and often right, and Constitution Principle IX no longer mentions it. The owner confirmed on 21 September: *"the ban to audience labels should be removed, remove it. labels are allow."* So a Beginner, Intermediate or Advanced label on a chapter needs no special rule.

## 5. The stages

*In force until the redesign lands (CS-6). The names are from `thesis.md`. **Superseded 22 September 2026** — see the note under the table.*

| Stage | Name today |
|---|---|
| 0 | Introduction to Computing: From Switches to AI Agents |
| 1 | Spec-Aware Vibe Engineering Foundations |
| 2 | Credible Validation Through International Certification |
| 3 | Mastering AI Coding Agents |
| 4 | Engineering Autonomous AI Agents |

*Superseded 22 September 2026 — this five-stage list was replaced first by the four-stage list below, then by the Agentic-inside-SE decision (CS-12 to CS-16, at the end of this section). Kept as the record.*

| # | Decision | Status | Date |
|---|---|---|---|
| CS-5 | **Stage 0 will be named "Introduction to SDE".** | DECIDED (the name). Applied when the redesign lands. | 21 Sep 2026 |
| CS-6 | **The whole curriculum is being rethought and replanned, not only the names.** The owner: *"Complete change is going to happen in curriculum."* | DECIDED (the direction). Not started. | 21 Sep 2026 |
| CS-7 | **Decisions of this kind are written in this file and changed here first.** Other files point here. | DECIDED | 21 Sep 2026 |
| CS-9 | **Learning is parallel, not one thing after another.** Programming, AI-agent skills and the tools around them (Git, GitHub, the AI's context window, tokens) are learned together, in the same chapter. | DECIDED (the direction). How chapters are built to do this is CS-Q5. | 21 Sep 2026 |
| CS-10 | **The old Stage 1 and Stage 3 merge into one stage.** The stage with the Harvard certificates (old Stage 2) and the stage on autonomous agents (old Stage 4) stay as they are. | DECIDED (the direction). The new stage's name, the numbering of the stages that remain, and every chapter come from the redesign. **SUPERSEDED 22 Sep 2026** by CS-12 to CS-16: the merge survives in CS-14, the Harvard credentials become a parallel track, not a stage (CS-16), and the agentic stage becomes Stage 2 (CS-15). | 21 Sep 2026 |
| CS-11 | **Stage 0 teaches the theory and the first practical basics**: the terminal, an editor or IDE, and the first programming, so a student touches real things early. | DECIDED (the direction). | 21 Sep 2026 |

**Answered 22 September.** The stage names, and the merge in CS-10, are now decided:

| Stage | Name | What it covers |
|---|---|---|
| 0 | Introduction to SDE | Theory and the first practical basics (CS-11) |
| 1 | SDE Mastery (AI-Driven) | The old Stage 1 and Stage 3, merged (CS-10) |
| 2 | Credentials | CS50P and CS50W today. More free-first certificates will be added over time, each with its own research and a study plan for the student — new scope, not in CS-10 |
| 3 | SDE Mastery (AI-Native; Agentic AI) | The old Stage 4 |

*Superseded 22 September 2026 — the same day — by the Agentic-inside-SE decision below (CS-12 to CS-16). Kept as the record: three stages, and Credentials is a parallel track, not a stage.*

**Not decided yet:** the chapters inside each stage, and the exact point the folders and the site are renamed to match — that is part of running the redesign, not this file. **22 September 2026:** the four-stage rename ran and was superseded the same day (CS-12 to CS-16); `specs/011-curriculum-redesign/tasks.md` carries its state.

**The owner's reasons for CS-9 and CS-10:** *"it is claiming the balance but it is not creating the balance by just focusing one thing at one time, if we first have to learn the git and github and other programming things and then the AI, what's the difference between us and others?"* and *"python at one time, javascript at one time, it can also be done by the other courses then why me?"* The redesign also takes in the twelve stations and the five chapter shapes, which `corrections.md` §23 calls provisional.

**Two notes about CS-5 (Claude's, not decisions).** First, `naming.md` Rule 1 says a name must explain itself to someone who has never programmed. "SDE" alone does not. In this book it means Spec-Driven Engineering, but in job adverts "SDE" usually means Software Development Engineer. The safe form is the full name in the title ("Introduction to Spec-Driven Engineering") with "SDE" used as the short form after it has been explained and linked to the glossary. Second, the owner also said *"the first 3 stages will be Introduction to SDE"*. Does the name belong to Stage 0 alone, or to Stages 0 to 2 together? That is CS-Q2.

### Agentic AI inside SE — decided 22 September 2026

*Decided by the project owner in discussion with Claude on 22 September 2026. It supersedes the four-stage structure recorded earlier in this section the same day (see the note on CS-10 above). Earlier decisions that still hold, and that this record relies on: the Stage → Course → Chapter → Lesson → Part hierarchy (CS-8), parallel and braided learning (CS-9), a Course as a difficulty band inside a stage (CS-Q5), learning-first naming (CS-3), the Stage 0 name Introduction to SDE (CS-5) and what Stage 0 teaches (CS-11).*

**The idea.** Agentic AI is not a separate discipline. It is software engineering with an LLM as one component; everything else in an agentic system (functions, loops, APIs, databases, auth, async work, deployment) is ordinary SE. So agentic AI is taught inside SE, not in a later stage of its own. Each SE topic is taught first and to full depth, practised in a manual project, and then, where the concept genuinely pairs, applied again inside a real agent. This serves the post-AI-era triad the book is built on: using AI, building foundations, building AI.

| # | Decision | Status | Date |
|---|---|---|---|
| CS-12 | **Direction.** Agentic AI is taught inside SE, never as its own stage | DECIDED | 22 Sep 2026 |
| CS-13 | **Stage 0.** Introduction to SDE (unchanged) | DECIDED | 22 Sep 2026 |
| CS-14 | **Stage 1.** SDE Mastery (AI-Driven): basic to intermediate SE, with basic to intermediate agentic applications | DECIDED | 22 Sep 2026 |
| CS-15 | **Stage 2.** SDE Mastery (AI-Native): advanced SE, with advanced agentic applications. The old "; Agentic AI" suffix is dropped, because agentic AI now runs through both stages | DECIDED | 22 Sep 2026 |
| CS-16 | **Credentials.** Not a stage. A parallel track that maps third-party credentials to what is being learned. Disabled for now; its design is postponed | DECIDED | 22 Sep 2026 |
| CS-17 | **Navigation.** Happens at Course level (difficulty bands) inside each stage | DECIDED | 22 Sep 2026 |
| CS-18 | **Stage placement.** The project owner decides, topic by topic at authoring time, what goes in Stage 1 and what goes in Stage 2 | DECIDED | 22 Sep 2026 |
| CS-19 | **Inside a topic.** SE comes first, at full depth. An agentic application is added only where the concept genuinely pairs. When the two compete for depth, SE wins | DECIDED | 22 Sep 2026 |
| CS-20 | **Who writes the code.** Both, in order: the student writes it by hand first, then builds it with a coding agent | DECIDED | 22 Sep 2026 |
| CS-21 | **Pairing types.** Substrate, Surface and Practice (defined below). A main philosophy of the book's thesis | DECIDED | 22 Sep 2026 |
| CS-22 | **The one exception.** The LLM itself. It is the only component with no SE ancestor, so it is taught on its own terms | DECIDED | 22 Sep 2026 |
| CS-23 | **Agents.** Real, working agents from day one, never toy versions, on free providers (Groq, OpenRouter, and others the project owner researches). No paid keys, no local models | DECIDED | 22 Sep 2026 |
| CS-24 | **"Using AI".** Old Stage 3 material (coding agents such as Claude Code and opencode; prompt and context engineering) becomes Stage 1's working medium, used for both SE and agentic implementation | DECIDED | 22 Sep 2026 |
| CS-25 | **The delta.** What is genuinely new once an LLM is inside a system: the same input can give different outputs; failures are wrong answers that look right, not crashes; testing means measuring many runs, not asserting one result; plain language can attack it (prompt injection); every call costs money and time. Basics in Stage 1, advanced in Stage 2, each placed where it is naturally needed | DECIDED | 22 Sep 2026 |
| CS-26 | **"10x".** Depth of understanding, from theory and practice done together, both manually and in agents. Less repetition across the book and an earlier first agent come with it | DECIDED | 22 Sep 2026 |
| CS-27 | **Scope.** Building with models, not building models. ML, DL and NLP (training, fine-tuning) are out of scope, at least for now | DECIDED | 22 Sep 2026 |
| CS-28 | **Topics and sub-topics.** Designed at authoring time, not now. Claude designs topics, sub-topics and technicalities; the project owner places each topic in a stage | DECIDED | 22 Sep 2026 |
| CS-29 | **The topic sketch.** A very rough idea, not a plan (the owner's rule, below) | DECIDED | 22 Sep 2026 |
| CS-30 | **Where it is written.** course-structure.md for the structure; thesis.md for the philosophy | DECIDED | 22 Sep 2026 |

**The owner's follow-up decisions, 22 September 2026.** Made after the record above was entered and verified. They answer CS-Q7 and CS-Q9 (section 6).

| # | Decision | Status | Date |
|---|---|---|---|
| CS-31 | **The zero-knowledge floor names Stages 0–1** (answers CS-Q7). Stage 0 and Stage 1 assume a reader who has never programmed; Stage 2 builds on Stage 1. Old Stage 3's material (coding agents, prompt and context engineering) now sits in Stage 1, so it falls under the floor. Where canon says "Stages 3 and 4 stay parked", it now reads "Stage 2 stays parked": Stage 2 holds what old Stage 4 held, and the owner's 20 September parking decision is otherwise unchanged | DECIDED | 22 Sep 2026 |
| CS-32 | **Every Substrate and Surface pairing names its delta** (answers the first half of CS-Q9): what is genuinely new about the agentic version | DECIDED | 22 Sep 2026 |
| CS-33 | **No separate SDK-specific Parts** (answers the second half of CS-Q9). Rejected, for the owner's two reasons: someone who wants only SE content can already find it elsewhere, so the book's value is SE and agentic work taught together; and AI models and SDKs change so fast that syntax-specific content stops mattering after a while anyway, so the book does not design around re-recording it | DECIDED | 22 Sep 2026 |

#### Pairing types: Substrate, Surface, Practice

Adopted by the project owner on 22 September 2026 as a main philosophy of the book.

| Type | Meaning | Examples | How the topic is applied |
|---|---|---|---|
| Substrate | The SE concept is the machinery an agent is built from | Functions become tools; loops become the agent loop; databases become memory; authorization becomes tool permissions; async work becomes streaming | Built by hand in a manual project, then built as agent machinery |
| Surface | The SE concept is what you build around an agent | Chat interfaces; frontend-backend integration; deployment | Built by hand, then built again around an agent |
| Practice | No agentic twin exists | UI/UX, branding, Figma, logos, animation | Built by hand; AI appears only as the tool the student works with |

#### The owner's rule for the topic sketch (22 September 2026)

> The values, things and topics written in this table are just a very, very rough idea, not a fixed plan. Everything will be researched, adjusted, updated and redesigned as needed when the time comes.

(The owner's words, lightly edited.) The sketch is not a chapter list. It fixes no chapter count and no order (locked decision D5).

#### Topic sketch — a very rough idea, not a plan

| Agentic topic | SE anchor | Type | Stage 1 (rough idea) | Stage 2 (rough idea) |
|---|---|---|---|---|
| The LLM itself | none | The exception | What a model call is; tokens, context, how it fails | Choosing and routing between models |
| Prompt and context engineering | Writing specs; configuration and state | Substrate | A prompt is a spec for a model | Prompts and context under measurement |
| Tool calling | Functions, schemas, validation | Substrate | Your own functions become tools | Tool design and permissions across many agents |
| Agent loop and SDK classes | Loops, conditionals, OOP | Substrate | A loop where the model picks the next step | Long-running, durable agents |
| Handoffs, then multi-agent | Routing; queues and distributed systems | Substrate | One agent hands off to another | Many agents: concurrency, failure, cost |
| Guardrails | Validation, middleware | Substrate | Check what goes in and what comes out | Defending against prompt injection |
| Memory | Sessions, databases | Substrate | Remember one conversation | Remember across users and time |
| RAG | Databases, search, indexing | Substrate | Answer from your own documents | Measure and improve retrieval |
| Streaming | Async, SSE, WebSockets | Substrate | Stream answers to the browser | Realtime and voice agents |
| Tracing | Logging | Substrate | Read what the agent did | Production observability |
| Evals | Testing (new to the SE topic list) | Substrate | Ten examples, pass or fail | Statistical evals, judge models, evals in CI |
| Cost and limits | Rate limiting, caching, Redis | Substrate | Surviving free-tier rate limits | Budgets, caching and routing at scale |
| Security and approval | Web security, authorization | Substrate | Tools get minimum permissions; ask before acting | Agents acting for a user; sandboxing |
| MCP and skills | APIs and protocols; packages | Substrate | Use MCP servers; build a small one | Production MCP: auth, remote servers |
| Agent interfaces | Frontend; frontend-backend integration | Surface | Chat UI, streaming, tool calls on screen | — |
| Deploying apps and agents | Hosting, domains, DNS, HTTPS | Surface | Deploy a web app and an agent on a free host, on your own domain | Separate development, staging and production |
| Secrets and configuration | Environment variables | Surface | API keys in environment variables, never in code or Git | Secret managers, key rotation |
| Containers | Docker | Surface | Package an agent service in a container | Orchestration (Kubernetes) |
| CI/CD | GitHub Actions | Surface | Test and deploy on every push | Evals as a release gate |
| Cloud platforms | Compute, storage, managed databases, access control | Surface | What free-tier platforms give you | AWS, GCP or Azure fundamentals |
| Serverless | Functions as a service | Surface | An agent as a serverless function, and its time limits | Why long agent runs outgrow serverless |
| Background work | Workers, queues, scheduled jobs | Substrate | An agent that runs on a schedule | Job queues and retries for agent work |
| Scaling | Load balancing, autoscaling | Surface | — | Scaling agents under concurrency and provider rate limits |
| Infrastructure as code | Terraform and similar | Practice | — | Infrastructure described in code, written with a coding agent |
| Managed AI on the cloud | Cloud platforms | Surface | — | Hosted models and managed agent runtimes |
| Production monitoring | Metrics, uptime, alerts | Surface | — | Alerts on agent failures, latency and spend |
| Coding agents | Development environment | The medium | The hands for everything | Coding agents inside pipelines |

### Certificates off the reader-facing site — decided 23 September 2026

| # | Decision | Status | Date |
|---|---|---|---|
| CS-34 | **Certificates are removed from the reader-facing site until a business-first and technical-first decision on CS50 and any other certificate is made. The Credentials track stays parked.** | DECIDED | 23 Sep 2026 |

The owner's decision, 23 September 2026. It supersedes nothing here — CS-16 already parked the Credentials track, and this says what happens to the certificates while it stays parked. It answers CS-Q8 (section 6).

**Applied the same day, in one pass over the reader-facing site:** the FAQ, the Welcome page, the Stage 0 introduction, the homepage and its hero, the KPI cards, the root `README.md`, the changelog (a dated entry), and eight `static/img/stage-*.svg` titles that still named old stages. The internal files are untouched: `integrity-floor.md` is a rule for authors, not a reader-facing page.

### The public name of the book's core skill — decided 23 September 2026

| # | Decision | Status | Date |
|---|---|---|---|
| CS-35 | **The skill canon calls "Reading and Understanding Literacy" is named for readers as Code Literacy.** At its first use on any page it is introduced as *Code Literacy: reading and judging code*; after that, *Code Literacy* alone. It means the ability to read code — whoever or whatever wrote it — and judge it well enough to verify it and own it. The owner keeps the word "literacy" deliberately, because it carries understanding and evaluating (the OECD PISA definition of reading literacy: *"understanding, using, evaluating, reflecting on and engaging with texts"*). This is the owner's deliberate exception to `naming.md` Rule 1. The internal name is unchanged. | DECIDED | 23 Sep 2026 |

The owner's decision, 23 September 2026. It changes the reader-facing name only. The first-use rule and the exception to Rule 1 are recorded in `naming.md`; the internal name stays beside the public one in `thesis.md` and is not renamed.

**Applied the same day:** the homepage and its two curriculum charts, the FAQ, the Welcome page, the glossary (a new entry, linked at first use) and the changelog (a dated entry).

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

**Answered 21 September.** Yes, one stage can hold more than one subject (*"Yes absolutely"*), and the owner accepted Option B, Stage → Course → Chapter (CS-8). One new problem came out of it: CS-Q5.

### CS-Q2. What does "Introduction to SDE" name, and where does it stop?

*The owner: "that's the exact fight my mind is stuck in."* Two things are tangled here: what the word "Introduction" promises, and how many stages carry the name.

**What the word promises (the "introduction paradox").** In Pakistan, "Introduction to X" means the basics of X. In Harvard's CS50P the same words head a course that is much harder than that. Both readings are real, so a bare "Introduction" misleads one of them. Claude's proposal (PROPOSED): *in this book, "Introduction to X" says where the learner starts, not how far the course goes.* It means "you can begin here with nothing". It does not promise that the content stays easy or short. How far a course climbs is shown by the level label on each chapter (Beginner, Intermediate, Advanced; CS-4), so the learner can see the climb. Say this once on the welcome page and once in the glossary, in plain words, so a reader who expects "basics only" is not surprised.

**Where the name stops.** Three options:

| Option | "Introduction to SDE" names | Good | Watch out |
|---|---|---|---|
| **1. Stage 0 only** *(Claude leans here)* | The first course, with a finish line a learner can test: *"you can open a terminal and an editor, ask an AI agent to build one small thing from a written spec, and read what it did."* | A short promise the book can keep. It matches what a Pakistani reader expects from "introduction". | The next stage needs its own honest name, for example the name of what it lets you build. |
| **2. Stages 0 to 2** | The whole road up to the two Harvard certificates | One name for the whole entry road | Too big to be an introduction. Readers would meet Advanced chapters under a name that says "basic". This is the CS50 confusion again. |
| **3. Every course a beginner can enter from zero** | Each entry course is "Introduction to ..." (Introduction to SDE, Introduction to Programming with Python, and so on) | It matches the owner's own examples. The word always means "start here". | Several "Introduction" names, so the map must say which to take first. |

**A test that gives an exact limit.** An "Introduction to X" course is over when the learner can do the smallest complete real thing with X on their own, and knows what comes next. The limit is about what the learner can do, not about how hard the material was. Option 1 fits this test best for SDE, and option 3 lets the same test apply to each subject.

**Spelled out or short?** The first note under CS-5 still applies: "SDE" alone does not explain itself to a beginner (`naming.md` Rule 1). The owner named Stage 0 "Introduction to SDE", so this file keeps that name. Either the title spells it out, or the first line under the title does.

**Answered 22 September: option 1.** "Introduction to SDE" names Stage 0 only. The owner gave the full stage list in the same answer (section 5, above).

### CS-Q3. What are the levels inside a chapter, and how many?

The owner's own words for the finished shape were *"stage -> chapter -> lessons -> parts (if any)"*, which is the 14 September call. Readers are told something different today ("Lesson or Part"). Three options:

| Option | Inside a stage | Good | Watch out |
|---|---|---|---|
| **1. Two inner levels, words kept apart** *(the owner's 14 September call)* | Chapter → Lesson → Part (if any) | The finest splits, which the owner reads as more professional (`corrections.md` §5). Each level has one job. | Three levels inside a stage. Lesson and Part each need a one-line job, so they are never used for the same thing. |
| **2. One inner level** | Chapter → Lesson | Only one word to learn. Enough for a real seam. | A very large lesson has nowhere to split again. |
| **3. What readers are told today** | Chapter → "Lesson or Part" | Nothing to change. | One slot with two words. A reader cannot tell which to expect. Claude does not recommend it. |

**Answered 21 September: option 1**, Chapter → Lesson → Part (if any) (CS-8).

**Claude's lean, before the answer.** Option 1 if the owner wants the finest splits, option 2 if simplicity matters more. Either way, the word "Lesson" depends on the lesson → Chapter task below, because the writing skill uses "lesson" for what the book calls a Chapter.

### CS-Q4. How does a learner-level label work?

- **Meaning. Answered 21 September.** Labels are allowed with no special rule (section 4). The wording rule Claude proposed earlier was dropped, because it was built on a ban that no longer exists.
- **Where it sits.** The owner said chapters and sub-chapters. In the programs studied below, the label sits on the whole course or path, never on every small unit. Both can hold if a chapter's label comes from the band of chapters it belongs to, so renaming a band is one change.
- **The feeling of moving up.** The programs that motivate best add something the learner *earns* (mastery levels, badges, points). This site tracks nothing about a reader (`welcome.md`). Claude's proposal (PROPOSED, not from the research): a short *"You can now..."* checkpoint at the end of each band gives the same feeling with no tracking.

### CS-Q5. How does "Stage → Course → Chapter" work when the learning is braided?

*The owner:* the merged stage will teach several things at once. One chapter covers prompt engineering and a Python idea. Another covers Git and GitHub, the AI's context window and tokens. *"then how will both be covered in one course??"* A Course that means one subject (Python) cannot hold that. Three options:

| Option | What a Course is | Good | Watch out |
|---|---|---|---|
| **A. A Course is something you build or can do at the end** *(Claude leans here)* | For example "Build your first program with an AI agent", or "Ship your first project" | The braid is natural: each chapter teaches whatever that step needs. The name says what you will be able to do, which is CS-3. Both examples above live in one Course. | Names must promise a result, not a subject. Subjects (Python, Git, prompting) become *threads*, small tags on each chapter, so a reader can still find "all the Git chapters". |
| **B. Keep the Course as a subject, and add a Path** | Subject courses (Python, JavaScript, Git and GitHub, AI agents) plus one ordered *Path* that visits chapters from several courses in a braided order | Subjects stay clean for reference, and the order stays braided. Microsoft Learn works this way (learning path → module → unit). | Two structures to keep. A chapter belongs to a course and to a path, and the sidebar must show the path order. |
| **C. No Course level in the braided stage** | Stage → Chapter → Lesson → Part, with subjects as tags | The simplest. Nothing new to explain. | The braided stage is one long list with nothing in the middle. A Course level then exists only where a stage is one subject, such as the two Harvard courses. |

**Claude's lean and why.** A. The owner's own point, *"the same lesson will cover the prompt engineering and a python concept"*, means the subject is no longer the natural unit. What the learner can do is. Each chapter then names its threads (for example *Python · Prompting*), so a reader can also see how far they have come in each thread. This was a lean, not a decision.

**Answered 22 September: none of A, B or C above.** The owner's own model, which replaces this question: **a Course is a difficulty band inside a stage, not a subject.** Every subject taught at that band is matched for how hard it is, so several subjects share the same chapters. The owner's own example of a Beginner Course: *"the python is easy to undrstand and learn, and in tools, the basic IDE's learning and 3-5 basic terminal commands, and very basic AI things like basic prompt engineering, context management, tokens' concept, llms and agent terms, and basic command code and claude's commands like /compact, /clear etc."* When that band is finished, the next Course moves every subject up together: *"the intermediate and advance level of javascript, python or their frameworks, the advance usage of git, github, deployment, AI tools mastery, and all the commands of opencode, claude code, asvanced prompt engineering, context engineering and loop engineering."* The owner's own limit on this: *"the topics and names i have used above are just examples, not just exact combos."* The exact subject list for each Course, in each stage, is chosen when that part of the book is written — this decision fixes the shape (a Course is a matched difficulty band), not the contents.

### CS-Q6. What is the front part of the book called, and what goes in it?

The owner has never written a book and asked Claude to help find the right words for what comes before the stages: what the book is, why it exists, a welcome, a thesis, an introduction.

| Word | What it is in a real book | What it would be here |
|---|---|---|
| **Preface** | The author says why the book exists, who it is for and how it is laid out | The welcome page (`welcome.md`) already does this: what it is, who it is for, how to use it |
| **Foreword** | Written by someone else, to vouch for the book | Not needed now. Later, a teacher or engineer the reader trusts could write one |
| **Introduction** | The first piece of the subject itself | The first course, "Introduction to SDE" (CS-5) |
| **Thesis** | The one claim the whole book argues | An internal word (`thesis.md`). Readers should see "Why this book", in plain words |
| **Prologue** | A story that opens a book of stories | Not used |
| **Course overview** | A course's summary of what you will be able to do | A short map of the stages, each with "after this, you can ..." |

Claude's proposal (PROPOSED, superseded below): three short pieces, in this order, before Stage 0. (1) **Welcome**: the promise, who it is for, how to read the book. One page. (2) **Why this book**: a few plain lines on the welcome page saying what is different (programming and AI are learned together). Only the *promise* goes here. (3) **The map**: the stages, each with what you can do afterwards. The full *argument* for Spec-Driven Engineering waits for the end of Stage 0, once the reader has met a terminal, an editor, a small program and an AI agent. Then the reader can understand *why*, not only *what*. This was the owner's own reason for putting the why inside Stage 0: *"the beginner who don't even the basics will not understand the WHY of SDE even if they understand the WHAT of SDE."*

**Answered 22 September.** One page, not three, before Stage 0. The owner: *"we will write the welcome/thesis ... which will be one page detailed problem and solution, and that page also will cover summary of our curriculum (not with exact stages, becuase we are going to be pedagogically update cotinously over the time), the reading and understanding literacy of programming and the exact difference betweent the spec driven development VS spec driven engineering."* Length and register, the owner's own words: *"a 30 min read, with medium level facts and figures."* The escape hatch, the owner's own words: *"if any one is unable to understand this page becuase it is beginner, it will be refer to complete the stage 0."*

**The page's name, checked against both words' plain meanings.** "Welcome" names a greeting and an orientation: it tells a stranger what this is, who it is for, how to read it. "Thesis" names a claim put forward and argued for: a formal word, and this project already keeps it as an internal file name only (`thesis.md`), never shown to a reader (the row above). **Claude's recommendation (PROPOSED):** call the reader-facing page **Welcome**, because a first-time stranger opening the book needs the greeting word, not the argument word — and let the page's own content carry the argument the owner described. The curriculum summary on this page names what a reader will be able to do at each step, not stage numbers or names, so it does not go stale as the redesign continues (matching D5, no fixed chapter list or count, extended here to stage names on this page).

### CS-Q7. What does the zero-knowledge floor say under the new numbering?

**Open, 22 September 2026.** The zero-knowledge floor is worded "Stages 0–2" (`thesis.md`, the safety floor; `audience.md`). Under the new numbering that would include the advanced Stage 2. Claude recommends "Stages 0–1". Waiting on the project owner.

**Answered 22 September 2026: Stages 0–1** (CS-31, section 5). Stage 0 and Stage 1 assume a reader who has never programmed; Stage 2 builds on Stage 1. Old Stage 3's material now sits in Stage 1, so it falls under the floor. The wording was applied across `canon/` in the same pass, and the parking sentence now names Stage 2.

### CS-Q8. Can the reader-facing pages promise CS50 and Harvard credentials while the Credentials track is disabled?

**Open, 22 September 2026.** Raised by the Credentials decision (CS-16). Postponed together with the Credentials design.

**Answered 23 September 2026: no** (CS-34, section 5). The certificates are removed from the reader-facing site until a business-first and technical-first decision on CS50 and any other certificate is made, and the Credentials track stays parked. No reader-facing page promises a certificate while the track is disabled.

### CS-Q9. Do Substrate and Surface pairings name their delta, and does SDK-specific code get its own Part?

**Open, 22 September 2026.** Proposed by Claude, not yet ruled on: every Substrate and Surface pairing names its delta; SDK-specific code sits in its own short Part so it can be re-recorded when the SDK changes.

**Answered 22 September 2026: the first half yes, the second half no.** Every Substrate and Surface pairing names its delta — what is genuinely new about the agentic version (CS-32, section 5). No separate SDK-specific Parts (CS-33), for the owner's two reasons: someone who wants only SE content can already find it elsewhere, so the book's value is SE and agentic work taught together; and AI models and SDKs change so fast that syntax-specific content stops mattering after a while anyway, so the book does not design around re-recording it.

### The lesson → Chapter task

The writing skill uses "lesson" for what this book calls a Chapter. The owner directed it on 21 September: *"A lesson is a lesson, a chapter is a chapter ... if anywhere chapter is listed as lesson, fix it."* and *"fix this problem properly using the deepseek with high effort."* **Done for the words, 21 September.** DeepSeek at high effort decided what each "lesson" meant and a script made the swaps: 234 words changed in 20 files (the writing skill, the project guide and its four protocols, `CLAUDE.md`, the project map and five canon files). A separate pass found the risky places, and each was read by hand. What it did not touch: the names of the two skill folders, which many files point at (a small question for the owner); the book's own *Lesson*, the level inside a chapter; trigger phrases a person may type, such as "write a lesson on X"; old records; and the words on the reader-facing pages, which the redesign decides.

### How well-known programs do it

Gathered by DeepSeek from each program's own pages on 21 September 2026. Every fact in the table was checked by script against the text of the pages it fetched (one fact it reported, a "weeks" level for CS50, was not found there and is left out). The full record is in [the full research record](../../history/reports/course-structure-2026-09-21/level-naming-research.md).

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

Each row is a copy or a claim that this file may overtake. Rows marked **Done** were brought into line on 21 September 2026. The others wait for the redesign, and when it lands each one is either changed to match or turned into a pointer to this file. **22 September 2026:** the rows about the four-stage migration are halted, not waiting — the migration was superseded the same day by the Agentic-inside-SE decision (CS-12 to CS-16); see the notes in the rows and `specs/011-curriculum-redesign/tasks.md`.

| File | What it says now | Decision it disagrees with |
|---|---|---|
| `.specify/memory/constitution.md`, Principle IX | **Done (v3.0.2, 21 September).** It says one reader in every stage, a beginner who becomes an expert | Nothing now. It does not name the levels; that waits for the redesign and is another amendment. |
| `curriculum-state/canon/audience.md`, "The named groups" table | **Done.** The table now says the founding brief named five readers and the book has one; rows 2 to 5 read *"Not a separate audience"* | Nothing now |
| `curriculum-state/canon/thesis.md`, the stage table | The five stage names above | CS-5 and CS-6. **Halted 22 September 2026** — the four-stage migration this row waited on was superseded the same day by the Agentic-inside-SE decision (CS-12 to CS-16); `thesis.md` now carries three stages. See `specs/011-curriculum-redesign/tasks.md` |
| `edu-site/docs/welcome.md` and `edu-site/docs/faq.md` ("What are the five stages?") | Five stages; the levels in section 2. The two sentences that promised the old reader rules were fixed on 21 September (`welcome.md` line 78, `faq.md` line 52) | CS-6, for the stage list. **Halted 22 September 2026** — the four-stage migration this row waited on was superseded the same day by the Agentic-inside-SE decision (CS-12 to CS-16). See `specs/011-curriculum-redesign/tasks.md` |
| `CLAUDE.md` | The five stage folders. The paragraph that translated "lesson" into Chapter is rewritten: the writing skill now says chapter itself, and a new bullet points here | CS-6, for the stage folders. **Halted 22 September 2026** — the four-stage migration this row waited on was superseded the same day by the Agentic-inside-SE decision (CS-12 to CS-16). See `specs/011-curriculum-redesign/tasks.md` |
| `.claude/skills/lesson-spine-authoring/` | **Done for the words** (234 changed in 20 files, 21 September). The two folder names still say "lesson" (`lesson-spine-authoring`, `lesson-adversarial-review`) | Only the folder names. Renaming them is one script pass, best done at the end of the redesign when no other session is open |
| `edu-site/sidebars.ts`, `edu-site/scripts/check-frontmatter.mjs` (`STAGE_FILES`) | The folder and file structure | Any change to the levels in section 2 |

## 8. Change log

Newest last. Never edit an old line.

- **21 September 2026.** File created. CS-1 to CS-7 entered from the owner's messages of 21 September. CS-Q1 to CS-Q4 and the comparison table entered as Claude's proposals. Nothing outside this file was changed to match.
- **21 September 2026, later.** The owner's second round of answers entered: CS-8 (the levels), CS-9 to CS-11 (the direction of the redesign), CS-4 confirmed, CS-Q1 and CS-Q3 answered. CS-Q2 rewritten with options; CS-Q5 and CS-Q6 added. **Corrected an error in section 4:** the file had said audience labels were still banned; that ban was withdrawn on 20 September. Section 7 is updated when the lesson → Chapter task is finished.
- **21 September 2026, evening.** Section 7 brought up to date: the constitution (v3.0.2), `audience.md`, `welcome.md`, `faq.md`, `CLAUDE.md` and the writing skill now agree with CS-1, CS-2 and the lesson → Chapter decision. The paragraph on the lesson → Chapter task now records the result. CS-Q2, CS-Q5 and CS-Q6 are still open and wait for the owner.
- **22 September 2026.** CS-Q2, CS-Q5 and CS-Q6 answered: the stage list is four stages with names (section 5); a Course is a difficulty band, not a subject (CS-Q5); one front page, "Welcome" (PROPOSED name), covers the problem, the solution, the curriculum summary and development-vs-engineering (CS-Q6). None of this is applied to the live site yet.
- **22 September 2026, later.** The Agentic-inside-SE decision entered (CS-12 to CS-30, section 5): agentic AI is taught inside SE, never as its own stage; three stages — *Introduction to SDE*, *SDE Mastery (AI-Driven)*, *SDE Mastery (AI-Native)* — with *Credentials* a parallel track, disabled for now; the pairing types Substrate, Surface and Practice; the owner's rule and the topic sketch. CS-10, the two stage tables in section 5 and one row in section 2 are marked SUPERSEDED, and the paragraph under CS-5 in section 1 and the pending list in section 5 carry dated notes. CS-Q7 to CS-Q9 added. Section 7's four-stage rows marked halted; a new task list replaces `specs/011-curriculum-redesign` T007–T012. `thesis.md` and `naming.md` were updated the same day.
- **22 September 2026, later still.** The owner's three follow-up decisions entered (CS-31 to CS-33, section 5): the zero-knowledge floor now names **Stages 0–1** — old Stage 3's material sits in Stage 1, so it falls under the floor — and the parked stage is **Stage 2**; every Substrate and Surface pairing names its delta; no separate SDK-specific Parts, rejected. CS-Q7 and CS-Q9 are marked answered with their question text kept, and the section 1 floor sentence is rewritten with its old wording kept as superseded. The floor wording is applied in the same pass to `thesis.md`, `audience.md`, `corrections.md`, `voice.md` and `integrity-floor.md`, and noted in `specs/011-curriculum-redesign/`. CS-Q8 stays open, postponed with the Credentials design.
- **23 September 2026.** CS-35 entered (section 5): the book's core skill, *Reading and Understanding Literacy* internally, is named for readers as **Code Literacy** — introduced as *Code Literacy: reading and judging code* at its first use on a page — with the owner's deliberate exception to `naming.md` Rule 1 recorded there and the public name noted beside the internal one in `thesis.md`. Applied the same day to the homepage, its two curriculum charts, the FAQ, the Welcome page, the glossary and the changelog.