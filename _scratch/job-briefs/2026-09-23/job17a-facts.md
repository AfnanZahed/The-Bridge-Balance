# Job 17a — fact sheet for the intro video script

Every fact carries its source file and line, read from the live repo on 23 Sep 2026. Canon first, then the site, then `CLAUDE.md`/constitution. Quotes in “ ” are canon’s or the site’s own words.

## 1. The two problems, and the book’s answer to each (item 1)

**Problem 1 — reading literacy.** Of everything the book covers, “only **Programming** is where the two extremes actually fight” (`curriculum-state/canon/thesis.md:61`); the failure mode upstream of both is “**specification poverty**” (`thesis.md:65`). External courses are “aimed at producing a programmer who can type the solution” (`canon/research-and-comparison.md:41`); “External sources typically teach a learner to write the thing; this curriculum teaches a reader to **read it and judge it**” (`.specify/memory/constitution.md:484`).
**Answer 1.** Reading and Understanding Literacy — “the ability to read code — whoever or whatever wrote it — and judge it well enough to verify it and take ownership”; “Spec-Driven Engineering cannot be completed without it” (`thesis.md:63`). Stage 0 introduces it beside SDE, before any code is written (`thesis.md:67`).

**Problem 2 — how the stages are learned.** Owner’s words: “it is claiming the balance but it is not creating the balance by just focusing one thing at one time, if we first have to learn the git and github and other programming things and then the AI, what’s the difference between us and others?” (`canon/course-structure.md:118`).
**Answer 2.** “**Learning is parallel, not one thing after another.** Programming, AI-agent skills and the tools around them (Git, GitHub, the AI’s context window, tokens) are learned together, in the same chapter” (CS-9, `course-structure.md:101`).

## 2. The reading literacy, plainly, and its names (item 2)

In one paragraph: the habit of reading code — anyone’s, or any agent’s — closely enough to check it against what was asked, and to own the result. Canon gives it two roots: “Hoare’s 1969 … paper established that a specification is a first-class object code can be checked against” and “Parnas’s 1972 … paper established that a module’s interface, not its internals, is what makes another party’s code … comprehensible” (`thesis.md:65`).
**Name canon allows in front of a reader: none of the internal ones, yet.** “These are internal names, not reader-facing ones … **Never put one in front of a reader without deciding deliberately what to call it for them, and asking the owner first**” (`thesis.md:69-76`). A reader-facing name must be chosen and approved by the owner before it ships (`canon/corrections.md:211`).
**Names canon forbids in reader-facing text:** *Reading and Understanding Literacy*, *specification poverty*, *station*, *spine*, *register*, *shape*, *front door*, *invariant*, *safety floor* as a label (`corrections.md:208`; `canon/naming.md:190-191`). **Live violation not to repeat:** the internal name is on the homepage today (`edu-site/src/pages/index.tsx:34`; also `src/components/DataViz/CurriculumDonut.tsx:66`, `CurriculumBarChart.tsx:72`).

## 3. What “braided” (parallel) stage learning means for a student (item 3)

One chapter teaches a programming idea and an agent skill together (CS-9, `course-structure.md:101`); a **Course** is a difficulty band inside a stage, so “the next Course moves every subject up together” (`course-structure.md:276`).
Every SE topic is taught first and to full depth, then applied inside a real agent — “when the two compete for depth, SE wins” (CS-19, `course-structure.md:137`; “Agentic AI is not a separate discipline”, CS-12, line 130). The student “writes it by hand first, then builds it with a coding agent” (CS-20, `course-structure.md:138`), on “real, working agents from day one … on free providers” (CS-23, line 141).

## 4. The three stages (item 4)

| 0 | **Introduction to SDE** | theory and the first practical basics — the terminal, an editor/IDE, first programming (`thesis.md:131`; CS-11/CS-13, `course-structure.md:103,131`) |
| 1 | **SDE Mastery (AI-Driven)** | basic-to-intermediate SE with basic-to-intermediate agentic applications (`thesis.md:132`; CS-14, line 132) |
| 2 | **SDE Mastery (AI-Native)** | advanced SE with advanced agentic applications (`thesis.md:133`; CS-15, line 133) |

Credentials (CS50P + CS50W) is a **parallel track, not a stage, and is disabled for now** (`thesis.md:135`; CS-16, `course-structure.md:134`). Whether reader-facing pages may promise it while disabled is an OPEN question (`course-structure.md:303`).

## 5. The homepage (item 5) — `edu-site/src/components/HomepageHero/index.tsx`

Hero heading: **“Lead AI agents with engineering judgment.”** — “engineering judgment.” is the serif accent span (lines 62-65).
Eyebrow (three dot-separated items): **“100% free” · “3 stages” · “2 Harvard certificates”** (lines 48-60).
Subheading: “The Bridge Balance is the textbook for students learning spec-driven AI agent engineering — a complete 3-stage curriculum with two Harvard certificates (CS50P + CS50W), built so you ship agents, not chase prompts.” (lines 67-72).
Buttons: **“Start with Stage 1”** (line 81) and **“Jump to AI agents”** (line 94); both point at `/stage-01-sde-mastery-ai-driven/` (lines 76-96). Meta row: “Built for working developers” (101 — a claim canon now forbids), “CS50P + CS50W credentials” (105), “Free-tier stack, forever” (109). Closing button **“Begin Stage 1”** (`src/pages/index.tsx:290`).

## 6. The Welcome page (item 6)

Title: **“Welcome”** (`edu-site/docs/welcome.md:4`; the H1 is line 12). First three sentences, exactly (`welcome.md:14,16`):
1. “Welcome to The Bridge Balance — a free curriculum from zero programming background to engineering autonomous AI agents of your own.”
2. “Two genuine Harvard credentials sit inside that arc, midway through it.”
3. “One discipline carries you the whole way: Spec-Driven Engineering, software engineering plus AI.”

## 7. The sidebar (item 7) — `edu-site/sidebars.ts` + swizzled theme

Categories: **“Stage 0 — Introduction to SDE”** (line 21; **open by default**, `collapsed:false` line 22), **“Stage 1 — SDE Mastery (AI-Driven)”** (38; collapsed, 39), **“Stage 2 — SDE Mastery (AI-Native)”** (57; collapsed, 58), **“Reference”** (69; collapsed, 70).
Stage 0 expanded (lines 24-33): Introduction · From Binary to Programming · The Architecture Map · Editors and IDEs · Terminals and CLI Agents · Spec-Driven Engineering · How a Machine Holds a Number · How People Told a Machine What to Do (labels from each doc’s `sidebar_label`, e.g. `docs/ch00-introduction.md:2`, `docs/ch01-foundations.md:2`).
Stage 1 expanded (41-52): Foundations · Core Programming · Frontend · Backend · Databases · Git & GitHub · Prompt Engineering · Context Engineering · Claude Code · Skills & MCP.
Stage 2 expanded (60-64): RAG & Tool Calling · Multi-Agent Systems · Evaluations.
Badges: each row carries a state dot read from `chapter_state` (`src/theme/DocSidebarItem/Link/index.tsx:62,101-108`). Wording: **“Placeholder — awaiting text”** (`Link/index.tsx:36`; `src/components/ChapterState/index.tsx:29`) and **“Text ready”** (`Link/index.tsx:37`). Every Stage 1 and Stage 2 row (14 docs, indexes included) is `placeholder`; Stage 0 is `text-ready` (`src/data/chapterManifest.ts:9-31`).
Expanding on click: yes — the label is a link that navigates, and a separate caret button toggles the list (`theme/DocSidebarItem/Category/index.tsx:297,363`); an active category auto-expands (`…/Category/index.tsx:58,280`).

## 8. Videos, the free promise, the catalog, the learning assistant (item 8)

**Who teaches the videos:** the project owner records them, after Claude Code writes the text — “Claude Code authors the text; the project owner supplies images and records the video afterward” (`CLAUDE.md:58`; `constitution.md:420`; `docs/faq.md:83`). The video side is the owner’s own process and is outside the site’s accessibility measures (`docs/accessibility.md:65`).
**The free promise, exact wording:** “The textbook is **100% free** for students. There is no paywall on content, no premium chapter, no email-gated download. The only paid surfaces are the digital products in the catalog (Claude Code sub-agents, skills, MCP servers, plugins) — the curriculum itself stays free forever.” (`constitution.md:455`). Hero eyebrow: “100% free” (`HomepageHero/index.tsx:50`); welcome page: “this book’s text is free, forever” (`welcome.md:64`).
**The catalog — paid:** “The textbook is 100% free forever (Constitution Principle VI); the business is a **paid** catalog of Claude Code sub-agents, skills, MCP servers, and plugins sold alongside it” (`CLAUDE.md:22`).
**The learning assistant:** planned, not built — “**A help chatbot**, planned to answer from this book’s own chapters rather than general knowledge” (`welcome.md:96`); “it is not built” (`docs/faq.md:71`). A preview component exists that makes no API call (`src/components/ChatAssistant/`, mounted in `src/theme/Root.tsx`; `_scratch/job-briefs/2026-09-22/job15-facts.md:73`) — show it only as a clearly labelled preview.

## 9. Words and claims canon bans that a promo script might reach for (item 9)

- Internal names and internal rules in front of a reader: see §2; a reader “never learns … the project’s internal vocabulary” (`corrections.md:199-211`). Avoid canon’s shorthand “10x” (CS-26, `course-structure.md:144`).
- Stage and course names never name the reader or the difficulty: no “Python for Beginners”, no “Advanced Python” (CS-3, `course-structure.md:59`); “*Orientation*” is rejected (`naming.md:27`); no marketing voice, hype or exclamation in a title (Rule 2, `naming.md:33-50`).
- No separate senior/experienced reader, and no “built for working developers” claim (CS-1/CS-2, `course-structure.md:23-24`); the one reader “starts as a complete beginner and finishes as an expert” (CS-1).
- No fixed chapter list, count or total: “**No fixed chapter list or chapter count, ever**” (`CLAUDE.md:55`); the homepage’s “Est. Hours 48h” (`src/components/DataViz/KPIGrid.tsx:47`) is exactly such a claim. No empty placeholder examples (`foo`, Acme Corp, the generic to-do app) either (`CLAUDE.md:68`).
- Say **Spec-Driven Engineering**, not Spec-Driven Development — the welcome page opens on that exact difference (CS-Q6, `course-structure.md:293`).
- Never coach a reader through graded CS50 work; CS50 allows only its own Duck, and “Never AI producing work that gets submitted” (`canon/integrity-floor.md:41-61`); the Credentials track is disabled (CS-16, `course-structure.md:134`).
- Never invent a statistic or a source; a statistic reaches the reader as a plain sentence with its source at the end (`thesis.md:240-273`).