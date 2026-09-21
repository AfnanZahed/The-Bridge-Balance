# Inventory B - the canon
Status: COMPLETE

## audience.md
Lines: 186

### Rules
| ID | Line(s) | Rule in one sentence | Topic | Scope |
|---|---|---|---|---|
| C1-01 | 21-24, 68 | Stages 0, 1 and 2 are written for absolute beginners and for no other reader. | audience | DRAFTING |
| C1-02 | 26-28 | No rule in the repo may assume a senior reader is present, and no draft may be shaped around one. | audience | DRAFTING |
| C1-03 | 26-29 | The Stage 3-4 audience is an open question the owner settles later, and nobody may re-derive a two-reader model in the meantime. | audience | PROCESS |
| C1-04 | 31-40 | The three senior-reader rules (unrewarded sentences, number/origin/failure-mode/reason, senior must gain something) are withdrawn, not softened, and must not be applied. | audience | DRAFTING |
| C1-05 | 42-46 | Continuity comes first: nothing skipped, nothing assumed, no leap taken over the reader's head. | audience | DRAFTING |
| C1-06 | 47-51 | Difficulty must match the beginner — it is a variable, and a hard word explained is still a hard word; ten in a page is a wall. | density | DRAFTING |
| C1-07 | 52-53 | Length a specialist would call thorough reads to a beginner as a stall. | pace | DRAFTING |
| C1-08 | 54-56 | Every Stage 0-2 draft passes the ten-angle beginner check in beginner-experience-audit.md before it is presented. | process | PROCESS |
| C1-09 | 58-59 | In Stages 0-2 a hard word or a named person must earn its place; if the idea works without it, leave it out. | glossing | DRAFTING |
| C1-10 | 74-75 | A Stage 1 chapter that assumes the reader already knows what a repository is has failed them silently. | audience | DRAFTING |
| C1-11 | 79-83 | Write plainly because the subject is new, not because the reader is slow. | audience | DRAFTING |
| C1-12 | 85-87 | A paragraph is whatever fits before the reader must scroll mid-thought — two to four lines on a phone viewport. | density | DRAFTING |
| C1-13 | 87-89 | Keep lines under roughly 60 characters where the language allows, and wrap every wide table in a horizontal scroll container (the gate warns past 80). | sentence-length | DRAFTING |
| C1-14 | 91-94 | Keep total chapter weight under 1.5 MB including images; every image is the owner's, generated externally and dropped into static/img/. | other | PROCESS |
| C1-15 | 96-97 | A term gets an inline explanation the first time the reader meets it, never a footnote. | glossing | DRAFTING |
| C1-16 | 99-103 | The 2-to-3-use rule: inline explanation for roughly the first two or three appearances in the book, then a bare glossary link with no inline explanation. | glossing | DRAFTING |
| C1-17 | 105-107 | The glossary never repeats — one term, one entry, one canonical wording, one anchor, for the whole book. | glossing | DRAFTING |
| C1-18 | 108-109 | term-ledger.yaml holds the anchors and check-references.mjs fails a link that does not resolve to one. | process | PROCESS |
| C1-19 | 111-114 | One-minute test: a term an absolute beginner can hold inside one minute is explained inline in twelve words or fewer and linked to the glossary. | glossing | DRAFTING |
| C1-20 | 114-117 | A term that needs longer than one minute cannot be glossed at all — it is taught in a passage of its own before it is used. | glossing | DRAFTING |
| C1-21 | 120-122 | The first screenful of every chapter tells the reader what the chapter is, why it comes now, and what they will have at the end. | openings | DRAFTING |
| C1-22 | 124-126 | The old first-screenful rule (thesis-linked claim plus one action) is replaced and must not be applied. | openings | PROCESS |
| C1-23 | 128-132 | Formatting is part of the teaching — not decoration, not optional. | structure | DRAFTING |
| C1-24 | 134-135 | Bullets, tables, short sections and callouts are first-class: reach for them before a long paragraph, not after one has failed. | structure | DRAFTING |
| C1-25 | 136-140 | Bold marks what matters wherever it sits, and is not the first sentence of every paragraph. | bolding | DRAFTING |
| C1-26 | 141-142 | Italics are for a term being introduced, for gentle emphasis, and for the reader's own inner voice. | other | DRAFTING |
| C1-27 | 143-144 | Keep sections short enough to see the end of; a wall of text with no visual landmark is where a beginner stops. | structure | DRAFTING |
| C1-28 | 145-147 | Decent, professional emoji and icons are allowed where they help; the AI-slop set is never allowed. | other | DRAFTING |
| C1-29 | 148-149 | The target is not "well formatted" but beautiful. | other | DRAFTING |
| C1-30 | 153-154 | language-register.md governs every sentence and is the authority; the two decisions it leaves to the project are decided in canon. | process | PROCESS |
| C1-31 | 156-161 | Spelling is British throughout; code, commands and tool names keep their own spelling; mixed spelling inside the book is a defect. | other | DRAFTING |
| C1-32 | 163-168 | English only — no Urdu anywhere; a hard term is fixed with a simpler English sentence, not a second language. | glossing | DRAFTING |
| C1-33 | 170-173 | Every analogy and everyday example must land for a Pakistani reader and a reader anywhere else at once — one example, not two versions. | examples | DRAFTING |
| C1-34 | 177-178 | Content should stop generating axe findings rather than relying on the audit to catch them. | process | PROCESS |
| C1-35 | 180-181 | Heading levels descend without skipping; the chapter h1 is the frontmatter title and sections start at h2. | headings | DRAFTING |
| C1-36 | 182-183 | Link text describes the destination — no naked URLs, no "click here", no "read more". | other | DRAFTING |
| C1-37 | 184 | Every table has real header cells. | structure | DRAFTING |
| C1-38 | 185 | Every image has real alt text describing what it shows and why it is there. | other | DRAFTING |
| C1-39 | 186 | Never encode meaning in colour alone. | other | DRAFTING |

### Pointers out
| Line | Points to (exact path or file name) |
|---|---|
| 8-10, 153 | .claude/skills/lesson-spine-authoring/reference/language-register.md |
| 8-10, 117-118 | .claude/skills/lesson-spine-authoring/reference/mixed-audience.md |
| 54-56 | .claude/skills/lesson-spine-authoring/reference/beginner-experience-audit.md |
| 92-94 | static/img/ |
| 108 | term-ledger.yaml |
| 108-109 | check-references.mjs |
| 156-161 | docs/ |
| 157-160 | language-register.md §5 |
| 173-174 | language-register.md §4 |
| 177-178 | src/css/a11y.css |

## voice.md
Lines: 304

### Rules
| ID | Line(s) | Rule in one sentence | Topic | Scope |
|---|---|---|---|---|
| C2-01 | 11-13 | If founder writing samples are later added under canon/voice-samples/, a sample beats a rule in this file where they disagree. | process | PROCESS |
| C2-02 | 15-19 | The rules that produced cold, dense, date-heavy openings are gone, not softened; warmth now belongs everywhere. | other | PROCESS |
| C2-03 | 23-25 | Write as a warm, expert teacher talking to one student they like. | other | DRAFTING |
| C2-04 | 27-29 | The voice has three properties — context-aware, humanised, emotionally intelligent — and the reader must feel spoken to, not processed. | other | DRAFTING |
| C2-05 | 31 | Warm is not soft: the teaching stays exact, the delivery stays kind. | other | DRAFTING |
| C2-06 | 32-33 | Encouragement, enthusiasm and exclamation marks are allowed where a real person would use one. | other | DRAFTING |
| C2-07 | 34-35 | Never sound like a specification, a syllabus, a vendor page, or a model summarising search results. | other | DRAFTING |
| C2-08 | 37-41 | The stance above is interim and binding; the owner's researched persona, when it arrives, replaces this section. | process | PROCESS |
| C2-09 | 43-48 | Book content is written in the content-track (teacher) persona and never in the engineering persona; platform work is the reverse. | other | DRAFTING |
| C2-10 | 46-48 | Check which track you are on before writing the first sentence. | process | PROCESS |
| C2-11 | 52-55 | Every chapter, lesson and part begins by welcoming the reader, saying where they are, what is coming and why it matters, then moves into the teaching — required, not permitted. | openings | DRAFTING |
| C2-12 | 57-58 | Natural opening phrases ("In this chapter we'll look at…", "Welcome to Chapter 4", "Let's start") are allowed and normal. | openings | DRAFTING |
| C2-13 | 61-62 | Vary the welcome: a given style may not reappear until four or five chapters later, and never in the same wording as the chapter before. | openings | DRAFTING |
| C2-14 | 63-64 | The opening carries the why, not just the what — a list of topics is half an opening. | openings | DRAFTING |
| C2-15 | 65-66 | The opening connects backwards, naming what the previous chapter left the reader holding and linking to it. | openings | DRAFTING |
| C2-16 | 67-70 | The move from opening into the first teaching section must be a slope, not a cliff; a warm opening into a cold heading and cold first sentence is the same failure. | openings | DRAFTING |
| C2-17 | 72-77 | The old "nothing between the title and the content" rule is replaced: anything the teaching needs may sit under the title, and it must be beautiful. | openings | DRAFTING |
| C2-18 | 80-84 | Give a reason to care before the mechanism — a problem the reader can feel or a short scene they can picture. | openings | DRAFTING |
| C2-19 | 86-90 | Never open on a dated artifact, a proper noun or a historical event because it is "concrete"; a date is not a hook, a problem the reader already has is. | openings | DRAFTING |
| C2-20 | 92-95 | Hold a position and say why; a lesson with no opinion in it is a reference page, and the position is held warmly. | other | DRAFTING |
| C2-21 | 97-101 | Label every claim as settled fact, current practice, or your own synthesis, with "as of now" visible for current practice. | research | DRAFTING |
| C2-22 | 103-106 | Say the hard part — say when something is confusing, say when you are uncertain, and say what "it depends" depends on. | other | DRAFTING |
| C2-23 | 108-111 | Every claim in the book is researched, sourced and verifiable — non-negotiable. | research | PROCESS |
| C2-24 | 113-116 | Research is how the writer becomes correct, not a list the reader must be told; the reader gets a number, name or year only when it carries the teaching. | research | DRAFTING |
| C2-25 | 118-121 | The old "real numbers with their year attached / vagueness is where AI prose is recognised" wording is withdrawn. | dates | DRAFTING |
| C2-26 | 122-124 | For a statistic a reader would otherwise take on faith, put the plain sentence in the prose and attach the source as a Source chip, not as a parenthetical year. | statistics | DRAFTING |
| C2-27 | 125-127 | Every word must make sense to the book's actual reader; a sentence needing a second read from an absolute beginner is not finished, and this test outranks specificity, elegance and concision. | audience | DRAFTING |
| C2-28 | 131-133 | Find-and-replace test, per teaching paragraph: if the paragraph could be about a different topic with the name swapped, it is generic and must be rewritten. | process | PROCESS |
| C2-29 | 135-140 | The find-and-replace test applies only to paragraphs whose job is to teach — not to openings, welcomes, bridges, reassurances or closings. | process | PROCESS |
| C2-30 | 142-144 | Anti-commodity test, per lesson: every lesson makes at least one signature contribution. | process | PROCESS |
| C2-31 | 146-152 | In Stages 0-2, making an absolute beginner genuinely understand is itself the signature contribution; a competent restatement of the common explanation does not count. | process | PROCESS |
| C2-32 | 156 | Second person and active voice: the reader does things, things do not get done. | other | DRAFTING |
| C2-33 | 157-160 | One idea per sentence, average 15-18 words, hard ceiling around 28, at most one subordinate clause. | sentence-length | DRAFTING |
| C2-34 | 161-164 | Vary sentence length so the prose breathes, but not by dropping to dramatic fragments; a short sentence is short because the idea is short. | sentence-length | DRAFTING |
| C2-35 | 165-169 | Cut words that carry nothing, but do not cut words that carry warmth; the old "cut every word that survives its own deletion" rule is withdrawn. | density | DRAFTING |
| C2-36 | 173-174 | An analogy is good when it makes the idea stick harder and bad when it is clever but makes the reader translate back. | examples | DRAFTING |
| C2-37 | 176-178 | Analogies, everyday examples and short stories are encouraged and a chapter may use several; the old "one analogy per concept" cap is withdrawn. | examples | DRAFTING |
| C2-38 | 179-182 | An invented example is fully allowed when it teaches better than a real one. | examples | DRAFTING |
| C2-39 | 183-184 | Draw an analogy from the topic's own mechanics where that works, and from ordinary life where that works better. | examples | DRAFTING |
| C2-40 | 185-186 | Drop an analogy the moment it stops mapping, and say where it breaks. | examples | DRAFTING |
| C2-41 | 187-190 | Anchors must land for a Pakistani reader and an international reader at the same time; anything needing local knowledge the sentence does not supply is not allowed. | examples | DRAFTING |
| C2-42 | 194-205 | The listed phrases ("It's important to understand that…", "In today's fast-paced world…", "At its core, X is…", "It's worth noting that…", "Simply put", "The key takeaway is…", "delve", "leverage", "utilise", "robust", "seamless", "game-changer") are banned outright. | other | DRAFTING |
| C2-43 | 207-211 | "In this lesson, we will explore…", "Let's dive in", "Let's get started" and "Whether you're a beginner or a seasoned pro…" are permitted again — natural lead-ins are wanted. | openings | DRAFTING |
| C2-44 | 215-218 | No closing restatement of a section; a chapter-level recap that does new work (retrieval questions, a what-you-can-now-do list) is welcome. | structure | DRAFTING |
| C2-45 | 219 | No triads — one adjective, chosen. | other | DRAFTING |
| C2-46 | 220-221 | No rhetorical questions as transitions; a real question the chapter then answers is fine. | other | DRAFTING |
| C2-47 | 222-223 | No hedge inflation — say what happens, or say you don't know. | other | DRAFTING |
| C2-48 | 224-225 | "Not just X, but Y" is allowed once per chapter and is a verbal tic after that. | other | DRAFTING |
| C2-49 | 226-228 | No bolded lead sentence in every paragraph; bold marks what matters, not reliably the first sentence. | bolding | DRAFTING |
| C2-50 | 229-233 | Never explain the book's own rules to the reader — internal vocabulary (stages, shapes, stations, registers, glossing practice) stays internal. | other | DRAFTING |
| C2-51 | 237-238 | The old ban on "performed enthusiasm" is withdrawn. | other | PROCESS |
| C2-52 | 240-241 | Exclamation marks are allowed where a real person would use one — not many per chapter, never to manufacture excitement. | other | DRAFTING |
| C2-53 | 242-243 | Emoji are allowed where they make a page clearer or more inviting (section marker, callout header, checklist). | other | DRAFTING |
| C2-54 | 244-246 | Never the AI-slop set — 🚀 and the launch/sparkle/fire family; decent and professional only. | other | DRAFTING |
| C2-55 | 247-248 | A mark from a professional icon set beats an emoji wherever the platform supports one. | other | DRAFTING |
| C2-56 | 252-254 | The old "one voice for every stage, warmth only at a front door, register must not shift" section is withdrawn. | other | PROCESS |
| C2-57 | 256-259 | The register follows the reader, not the file: Stages 0-2 are written gently, plainly and warmly throughout. | other | DRAFTING |
| C2-58 | 261-265 | Warmth is not positional — it belongs on a welcome page, a stage front door, chapter one, the middle of chapter fourteen and the last paragraph of the book. | other | DRAFTING |
| C2-59 | 266-269 | The register may get gentler when the material gets harder; slowing down, softening and adding a second explanation at the hardest point is good teaching. | pace | DRAFTING |
| C2-60 | 270-273 | "Writing down to a beginner is the one failure this book does not forgive" is withdrawn; the failure it does not forgive is leaving a beginner behind. | audience | DRAFTING |
| C2-61 | 275-276 | Writing plainly is not simpler thinking — same thinking, said in words the reader already has. | other | DRAFTING |
| C2-62 | 281-282 | A term a beginner can hold inside a minute is explained inline at first use in twelve words or fewer and marked `[*term*](/glossary#slug)`. | glossing | DRAFTING |
| C2-63 | 283-285 | Inline explanation runs for roughly the first two or three uses in the book, then the glossary link alone with no inline explanation. | glossing | DRAFTING |
| C2-64 | 286-287 | A term needing longer than a minute cannot be glossed at all — it is taught in a passage of its own before it is used. | glossing | DRAFTING |
| C2-65 | 289-293 | What legitimately varies beyond register is the weighting of the twelve stations — Practice leans How and Retrieve, Theory leans Why and What, Tool leans hardest on How and Cost. | stations | DRAFTING |
| C2-66 | 297-301 | Every stage, chapter, lesson and part name obeys naming.md: it explains itself to someone who has not read the content, reads like an international professional course title, and carries a why not only a what. | naming | DRAFTING |
| C2-67 | 301-303 | The why is the curriculum's, not the subject's, and the owner supplies it per topic; if it is missing, stop and ask. | naming | PROCESS |

### Pointers out
| Line | Points to (exact path or file name) |
|---|---|
| 46 | CLAUDE.md |
| 109-110 | evidence-ledger.yaml |
| 181-182 | example-ledger.yaml |
| 292-293 | .claude/skills/lesson-spine-authoring/reference/stations.md §3 |

## naming.md
Lines: 221

### Rules
| ID | Line(s) | Rule in one sentence | Topic | Scope |
|---|---|---|---|---|
| C3-01 | 8-9 | This file governs the name of every stage, chapter, lesson, part, section heading and reference page, and all three rules must hold. | naming | PROCESS |
| C3-02 | 13-15 | Rule 1: a reader who has not read the content must understand what the thing is about from the name alone. | naming | DRAFTING |
| C3-03 | 17-18 | Titles use plain words a beginner already owns; if a reader needs a dictionary, the title has failed. | naming | DRAFTING |
| C3-04 | 19-20 | A name says what the thing is about, not how the project thinks about it internally. | naming | DRAFTING |
| C3-05 | 21-23 | Clever, abstract or atmospheric titles are wrong however good they look. | naming | DRAFTING |
| C3-06 | 25 | "Orientation" is rejected and must not be reintroduced. | naming | DRAFTING |
| C3-07 | 27-29 | Test a title by showing it alone to someone who has never programmed; if they cannot answer or answer wrongly, rename it. | naming | PROCESS |
| C3-08 | 33-34 | Rule 2: naming and organisation follow international standards and ultra-professional wording, the way a recognised course names its parts. | naming | DRAFTING |
| C3-09 | 36-38 | Competitor titles set the register and standard to write to, never a source to copy. | naming | DRAFTING |
| C3-10 | 40 | Titles are sentence-clear and specific — "Introduction to Databases", not "Data, Deeply". | naming | DRAFTING |
| C3-11 | 41 | No marketing voice, no hype, no exclamation in a title. | naming | DRAFTING |
| C3-12 | 42-43 | Siblings keep a consistent shape: chapters within a stage read as a set, not a pile of one-off ideas. | naming | DRAFTING |
| C3-13 | 44-45 | Titles use British spelling and the same capitalisation style across every level. | naming | DRAFTING |
| C3-14 | 48-54 | Rule 3: names must give the WHAT and, for beginners, the WHY within the first three seconds. | naming | DRAFTING |
| C3-15 | 56-61 | The why is the curriculum designer's, stated in the owner's own natural language for why the content is included. | naming | PROCESS |
| C3-16 | 63-68 | A name answers both questions at once: what is this (Rule 1) and why is this reader reading it (Rule 3). | naming | DRAFTING |
| C3-17 | 70-79 | The why is the curriculum's, never the subject's — not the why of the invention or tool in isolation. | naming | DRAFTING |
| C3-18 | 81-85 | The why is why the curriculum designer put the topic in this book, connecting it to the book's destination. | naming | DRAFTING |
| C3-19 | 87-89 | The why changes completely for every topic: no template, no reusable phrase. | naming | DRAFTING |
| C3-20 | 93-94 | Three-second test: shown alone for three seconds, the name must let a reader say what it is and what they get from it. | naming | PROCESS |
| C3-21 | 106-112 | The why is an input owned by the curriculum designer; the writer engineers wording from it and never chooses the why. | naming | PROCESS |
| C3-22 | 114-119 | If the owner's why for a topic has not been supplied, stop and ask — do not infer it, reconstruct it from the stage table, or write a plausible one. | naming | PROCESS |
| C3-23 | 123-132 | A name usually connects the topic to one of thesis.md's four verbs (judge/verify, ask for precisely/specify, set/bound, take responsibility for/own), and the owner's own sentence outranks that table. | naming | DRAFTING |
| C3-24 | 136-142 | Not a why: a fact about the subject, excitement, urgency, or a claim that the subject is important. | naming | DRAFTING |
| C3-25 | 148-151 | Rule 3 reaches every stage, chapter, lesson, part and section heading, and stops at reference pages (Glossary, Changelog, FAQ, Code of Conduct), where Rule 1 alone governs. | naming | PROCESS |
| C3-26 | 155-158 | Long titles are not the goal, earned ones are; one clause is normally enough, and a name needing a whole sentence usually means the section is two sections. | naming | DRAFTING |
| C3-27 | 162-165 | Settle the three rules in the order 1 → 3 → 2: make it clear, give it a why, then check it reads like a serious course. | naming | PROCESS |
| C3-28 | 167-176 | Names that are atmospheric, marketing-voiced, excitement-led, internal-label-led or built on the subject's own why are rejected, and where the why is missing the correct state is to wait for the owner's why. | naming | DRAFTING |
| C3-29 | 178-180 | A name cannot be finished without the owner's why, and filling the gap with a confident guess is the failure this rule exists to stop. | naming | PROCESS |
| C3-30 | 184-187 | A date range after a Stage 0 chapter title is kept ("1 — Foundations · 1679–1948") because Stage 0 is read chronologically, and it does not license dates inside the prose. | dates | DRAFTING |
| C3-31 | 188-190 | Never put an internal label in a name — no station, spine, register, shape, front door, invariant or "Reading and Understanding Literacy". | naming | DRAFTING |
| C3-32 | 191 | A name is not a promise of a count — no "Chapter 7 of 20" in a title. | naming | DRAFTING |
| C3-33 | 195 | A rename starts by checking the rules and writing down the one-line reason the old name fails. | naming | PROCESS |
| C3-34 | 196-198 | Propose the new name to the owner before applying it. | naming | PROCESS |
| C3-35 | 199-201 | Once agreed, the rename lands everywhere in the same pass — the file, the frontmatter, prerequisite-graph.yaml, sidebars.ts, any stage table in canon/thesis.md, and every chapter that names it in prose. | naming | PROCESS |
| C3-36 | 205-208 | Names listed as awaiting confirmation are proposals, not applied changes. | naming | PROCESS |
| C3-37 | 210-215 | Those names are blocked, not pending: none can be renamed until the owner supplies the curriculum why, and the 20 September drafted renames are withdrawn. | naming | PROCESS |
| C3-38 | 217-221 | Stage 0's name was applied on 2026-09-20; Stage 1-4 official-doc titles are re-checked against both rules before each stage opens; existing Stage 0 chapter and section titles are re-checked during the Stage 0 rewrite. | naming | PROCESS |

### Pointers out
| Line | Points to (exact path or file name) |
|---|---|
| 200-201 | prerequisite-graph.yaml |
| 200-201 | sidebars.ts |

## thesis.md
Lines: 219

### Rules
| ID | Line(s) | Rule in one sentence | Topic | Scope |
|---|---|---|---|---|
| C4-01 | 3-4 | Read this file before drafting anything. | process | PROCESS |
| C4-02 | 6-9 | Three rules are reversed: the six invariants no longer bind every chapter, the mechanical tell is deleted, and statistics no longer carry their year inline. | other | PROCESS |
| C4-03 | 19-21 | The thesis is the book's claim, not a sentence that must appear in every chapter; where the reader meets it is a placement decision made per stage. | structure | PROCESS |
| C4-04 | 25-28 | No lesson may imply that AI has made Engineering (specify, bound, verify, own) cheap, only Development. | other | DRAFTING |
| C4-05 | 30-33 | Ownership of Engineering's judgment stays with the reader, whatever framework a lesson's own loop uses. | other | DRAFTING |
| C4-06 | 41-42 | A lesson that discusses what the work actually is carries the Development/Engineering distinction; a lesson about how a switch holds a number does not. | structure | DRAFTING |
| C4-07 | 53-57 | The two extremes belong in the chapters actually about working with AI — a stage must teach both somewhere, and a chapter must not be bent to carry them. | structure | DRAFTING |
| C4-08 | 67 | Stage 0 introduces SDE and Reading and Understanding Literacy as a paired philosophy before any code is written; Stage 1 exercises it rather than re-teaching it, and Stage 2 depends on the same habit. | structure | DRAFTING |
| C4-09 | 69-76 | Internal vocabulary (Reading and Understanding Literacy, specification poverty, the Hoare and Parnas papers) must never be put in front of a reader without deliberately deciding what to call it for them and asking the owner first. | naming | PROCESS |
| C4-10 | 80-93 | The stage table is re-derived from the four stage sections of the official curriculum doc, never paraphrased from memory. | process | PROCESS |
| C4-11 | 95-101 | The book runs Stages 0-4 with the names and foci in the table (Stage 0 history of computing, Stage 1 spec-aware foundations, Stage 2 Harvard certification, Stage 3 AI coding agents, Stage 4 autonomous agents). | structure | DRAFTING |
| C4-12 | 103-109 | Every stage, chapter and lesson name obeys canon/naming.md; Stages 1-4 keep their official-doc titles for now and are re-checked against naming.md before each stage opens. | naming | PROCESS |
| C4-13 | 111-113 | A lesson names its stage at least once, in plain words a reader arriving from a shared link can act on. | structure | DRAFTING |
| C4-14 | 117-122 | The six invariants are stage-level commitments, not a per-chapter checklist; the old "every chapter carries all six or it is not publishable" rule is withdrawn. | structure | PROCESS |
| C4-15 | 126 | Thesis invariant: satisfied somewhere in each stage, in the chapters actually about the work, never forced into a chapter that is not. | structure | DRAFTING |
| C4-16 | 127 | Problem invariant: per chapter, placed at the point the reader would otherwise form the wrong idea, not automatically in the opening. | structure | DRAFTING |
| C4-17 | 128 | Two extremes invariant: per stage, in the AI-facing chapters, never bent into an unrelated topic. | structure | DRAFTING |
| C4-18 | 129 | Solution invariant: wherever a tension was actually raised — no tension, no move. | structure | DRAFTING |
| C4-19 | 130 | Stage reference invariant: per chapter, in plain words. | structure | DRAFTING |
| C4-20 | 131 | Safety floor invariant: per chapter where the topic warrants one — execution, deployment, credentials, or anything a reader could ship without checking. | safety | DRAFTING |
| C4-21 | 133-136 | To check a chapter, ask whether it teaches its own subject completely and honestly, then which of the six it is the right home for; two carried well is finished, all six by force is the failure. | process | PROCESS |
| C4-22 | 138-143 | The mechanical tell is deleted — sentences are not padding because they carry no invariant. | other | DRAFTING |
| C4-23 | 147-149 | A `<Callout type="warning" title="Safety floor">` appears wherever the topic touches execution, deployment, credentials or anything a reader could ship unchecked, with the component and title fixed so the gate can prove it survived. | safety | DRAFTING |
| C4-24 | 151-154 | The safety claim is fixed and the wording is not: softening the claim is a violation, and rewriting the sentence so the reader actually understands it is required, not permitted. | safety | DRAFTING |
| C4-25 | 156-161 | Stages 0-2 use the plain safety wording given (or something equally plain). | safety | DRAFTING |
| C4-26 | 163-167 | Stages 3-4 use the original safety wording given, which assumes the vocabulary by then. | safety | DRAFTING |
| C4-27 | 169-172 | Freezing the engineering phrases ("unverified by construction", "postmortem finding") into every chapter, including a beginner's first, is the thing Stage 0 exists to avoid. | safety | PROCESS |
| C4-28 | 176-180 | Cite only the canonical source list in edu-site/docs/intro-5-spec-driven-engineering.md and the three official docs; a newly found source may be proposed with a one-clause rationale, never added unilaterally. | research | PROCESS |
| C4-29 | 182-183 | Never invent a statistic, incident, citation, or claim about what an official doc says. | research | DRAFTING |
| C4-30 | 183-184 | If a source is unavailable, stale, disputed or retracted: stop and surface it, and fall back to the official docs. | research | PROCESS |
| C4-31 | 188-190 | Every statistic is researched, verified and recorded in evidence-ledger.yaml with its year and source. | statistics | PROCESS |
| C4-32 | 192-195 | The old rule that every statistic carries its year inline in the body is replaced. | statistics | PROCESS |
| C4-33 | 199-200 | The prose carries the plain sentence, not the citation. | statistics | DRAFTING |
| C4-34 | 201-205 | The source travels as a Source chip immediately after the sentence, expanding to show the exact figure, the year, the organisation and the link. | statistics | DRAFTING |
| C4-35 | 206-207 | Staleness stays visible — the chip carries the year, and the ledger stays the source of truth for when a figure was last checked. | statistics | DRAFTING |
| C4-36 | 208-210 | Where a name or a year genuinely is the teaching, it belongs in the prose; the chip is for the other case. | statistics | DRAFTING |
| C4-37 | 212-219 | Until the Source chip component ships, a statistic in a Stage 0-2 chapter is the plain sentence with its source in a short parenthetical at the end of the sentence, never mid-sentence, with the full entry in evidence-ledger.yaml. | statistics | DRAFTING |

### Pointers out
| Line | Points to (exact path or file name) |
|---|---|
| 37-38, 65 | The Bridge Balance/Official docs/solution_statement.md |
| 80-82 | The Bridge Balance/Official docs/curriculum_1.md |
| 176-177 | edu-site/docs/intro-5-spec-driven-engineering.md |
| 177-178 | problem_statement.md |
| 177-178 | solution_statement.md |
| 177-178 | curriculum.pdf |
| 188-189, 219 | evidence-ledger.yaml |
| 214-216 | curriculum-state/proposals/chapter-component-palette-2026-09-20.md |

## research-and-comparison.md
Lines: 93

### Rules
| ID | Line(s) | Rule in one sentence | Topic | Scope |
|---|---|---|---|---|
| C5-01 | 3 | No claim in this project is made from memory or guesswork — every lesson, chapter, heading, feature, option and button is grounded in studied external practice and then deliberately taken further, on both the content and platform tracks. | research | PROCESS |
| C5-02 | 5 | The policy governs what is true, not how the writing sounds: a warm opening, a reassurance, an everyday analogy and human rhythm come from the writer and need no citation. | research | DRAFTING |
| C5-03 | 7 | This file is the authoritative statement, and CLAUDE.md, chapter-production and lesson-spine-authoring bind the obligation and point here rather than restating it. | process | PROCESS |
| C5-04 | 11 | Both research passes run before a word is written. | process | PROCESS |
| C5-05 | 15-18 | Pass 1 establishes the international standard (how the strongest sources actually teach, name, sequence or build it) and the philosophical standard (the reasoning, first principle, problem and cost underneath). | research | PROCESS |
| C5-06 | 20 | Pass 1 is run by Claude, ~95% of the time via Command Code's DeepSeek v4.1 Flash under the command-code-delegation skill; Claude decides what to ask and judges what returns, and a result is read from its actual trace, never its summary line. | research | PROCESS |
| C5-07 | 22-24 | Pass 2, the owner's comparative study, is the more important half and a blocking input. | research | PROCESS |
| C5-08 | 26-32 | The routine runs in order: owner studies multiple real sources, owner pastes their learnings and the points to carry, we extract major and minor teaching points, we learn everything and go further (what each source does well plus what all of them missed), we adjust. | research | PROCESS |
| C5-09 | 33 | Writing begins only after the adjustment step. | process | PROCESS |
| C5-10 | 35 | Nothing is drafted before the owner's study has been supplied — it is a missing required input, so stop and ask, never proceed from search results alone or substitute your own reading for theirs. | research | PROCESS |
| C5-11 | 39-41 | The transformation rule: source material teaches people to write code, ours teaches them to read and understand it, converting the one into the other non-cosmetically. | research | DRAFTING |
| C5-12 | 43-48 | Source activity converts to ours — produce the syntax becomes read it and say what it does; write a function becomes read this function and predict what it returns; fluency by repetition of writing becomes judgment by repetition of reading, checking and deciding; success becomes telling whether the code is right and saying why. | examples | DRAFTING |
| C5-13 | 50 | A chapter that walks its source's same path in the same order toward the same skill is a reproduction; a new work rebuilds what the source taught toward a different competence. | research | DRAFTING |
| C5-14 | 54 | Pasted material is input to understanding and is never a source to reproduce. | research | DRAFTING |
| C5-15 | 56 | Never reproduce any verbatim passage, lightly-reworded paragraph, lifted sequence of explanations, or copied exercise, problem set or assessment item — not from a transcript, a paid course or an open one. | research | DRAFTING |
| C5-16 | 57 | A source's structure, ordering, tone, example kind, interface decisions and pacing may be adopted; its expression — sentences, verbatim or lightly reworded — may not cross over. | research | DRAFTING |
| C5-17 | 58 | Where the owner supplies a reference and asks for its pattern, use its pattern; the withdrawn rule ("what does not survive is its wording, its structure, or its examples") no longer applies. | research | DRAFTING |
| C5-18 | 59 | Examples are ours and may be invented; the source's own example is never lifted wholesale. | examples | DRAFTING |
| C5-19 | 60 | Attribute where an idea is genuinely owed and where naming the source helps the reader, placed so it supports the sentence rather than interrupting it, never as a reflex that turns a teaching page into a bibliography. | research | DRAFTING |
| C5-20 | 61 | A paid or licensed course is studied, never redistributed — nothing in a chapter may function as a way around paying for it. | research | DRAFTING |
| C5-21 | 63 | The Stage 2 integrity floor overrides this policy: CS50 material may inform reading literacy and may never be adapted into anything that produces or completes graded CS50 work, with the boundary checked first and any conflict surfaced rather than worked around. | safety | PROCESS |
| C5-22 | 67 | Platform work — a new page, feature, setting, button or label — gets the same two passes; a button added because it seemed reasonable is the failure the policy exists to stop. | process | PROCESS |
| C5-23 | 69 | For platform work, Pass 1 means established interface conventions, accessibility practice and the named products that solve the same problem well; their reasoning, patterns and structure are adopted freely, and the visual language and the words stay ours. | process | PROCESS |
| C5-24 | 83-93 | Before work ships, the nine-item self-check must pass (Pass 1 run with reasoning, delegation traced, Pass 2 supplied or work stopped, major and minor points extracted with the universal gap named, transformation applied, everything learnable learned, no expression reproduced, owed ideas attributed, integrity floor checked where CS50 was studied). | process | PROCESS |

### Pointers out
| Line | Points to (exact path or file name) |
|---|---|
| 7 | CLAUDE.md |
| 7 | chapter-production (skill) |
| 7 | lesson-spine-authoring (skill) |
| 20, 86 | command-code-delegation (skill) |
| 69 | Constitution Principle VII (.specify/memory/constitution.md) |

## integrity-floor.md
Lines: 103

### Rules
| ID | Line(s) | Rule in one sentence | Topic | Scope |
|---|---|---|---|---|
| C6-01 | 3-5 | This file is the guardrail and it outranks the project's own curriculum documents. | safety | PROCESS |
| C6-02 | 9-12 | When a lesson touches an external credential, licence, examination or platform, that body's own published policy outranks the project's curriculum documents; where they conflict, stop and surface the conflict to the user, and never author through it. | safety | PROCESS |
| C6-03 | 14-17 | An authoring run that meets this condition halts, states the conflict in one paragraph and asks — it never resolves it by picking the curriculum's side or by quietly softening the lesson and proceeding. | process | PROCESS |
| C6-04 | 19-21 | The same rule covers platform terms of service, professional licensing bodies, academic institutions, certification providers and any published code of conduct a reader could be sanctioned under. | safety | PROCESS |
| C6-05 | 25-28 | The Stage 2 CS50 conflict is parked by the decision of 2026-08-23 and is not resolved, recorded so it cannot be forgotten. | process | PROCESS |
| C6-06 | 47-49 | When Stage 2 authoring begins, the skill halts on this file, presents the conflict and offers the compliant framing rather than writing either version unasked. | process | PROCESS |
| C6-07 | 51-53 | AI for understanding (concepts, lecture material, what a problem is asking, why an error occurred) is permitted and is the valuable skill the curriculum teaches. | safety | DRAFTING |
| C6-08 | 54 | CS50's own Duck is named explicitly as the permitted in-course tool. | safety | DRAFTING |
| C6-09 | 55 | Never AI producing work that gets submitted. | safety | DRAFTING |
| C6-10 | 56-58 | Stage 2's real thesis is that it proves the judgment Stage 1 built, without the tool — "A certificate earned by an agent certifies the agent." | safety | DRAFTING |
| C6-11 | 60-61 | Every Stage 2 body carries an academic-honesty callout at full force, under the safety-floor rules in canon/thesis.md. | safety | DRAFTING |
| C6-12 | 63-64 | The curriculum doc's own revision is the founder's task and must not be edited by a skill. | process | PROCESS |
| C6-13 | 68-72 | Security content is defensive only: no working instructions for credential theft, unauthorised access, evasion, denial-of-service or mass targeting — a lesson shows the boundary, not the exploit. | safety | DRAFTING |
| C6-14 | 74-75 | Licensing is checked before reproduction, and third-party content is described and linked rather than copied. | safety | PROCESS |
| C6-15 | 75-76 | Never reproduce an exam question, a problem-set specification, or substantial course text. | safety | DRAFTING |
| C6-16 | 78-80 | No claim about a person or organisation without a source — every named incident is cited to the canonical source list and described as the source describes it. | research | DRAFTING |
| C6-17 | 82-87 | Telling a real, sourced fact as a scene is allowed and encouraged; inventing detail is not — no added fact, detail, quote, motive or number the source does not support. | research | DRAFTING |
| C6-18 | 89-91 | Uncertainty is disclosed, not smoothed: where evidence is contested or practice unsettled, the lesson says so, and manufacturing false consensus is the same failure. | research | DRAFTING |
| C6-19 | 93-100 | In Stages 0-2 a dispute that does not change the point being taught stays in evidence-ledger.yaml, and the prose avoids asserting the contested detail. | research | DRAFTING |
| C6-20 | 101-102 | A dispute that does change the point is taught properly — what the two positions are and why it matters — never dropped in as a hedging clause. | research | DRAFTING |
| C6-21 | 103 | Stating a contested thing as settled is never acceptable. | research | DRAFTING |

### Pointers out
| Line | Points to (exact path or file name) |
|---|---|
| 30 | Official docs/curriculum_1.md |
| 35 | https://cs50.harvard.edu/x/honesty/ |
| 99 | evidence-ledger.yaml |

## corrections.md
Lines: 589

### Rules
| ID | Line(s) | Rule in one sentence | Topic | Scope |
|---|---|---|---|---|
| C7-01 | 5 | A correction that does not live in this repository has not been made. | process | PROCESS |
| C7-02 | 7 | When the owner rejects something and says why, the reason is appended to this file before the task is called finished, in the owner's own words where those words are the point. | process | PROCESS |
| C7-03 | 7 | Nothing in this file is optional or superseded by a later preference — if a later decision contradicts an entry, the entry is changed rather than worked around. | process | PROCESS |
| C7-04 | 7 | CLAUDE.md names this file as required reading for any content task. | process | PROCESS |
| C7-05 | 25 | A stage's opening page, and the first screenful of any page a reader meets before they are committed, says directly what this is and what it does for the reader — no artifact-first opening, no dated object as the first thing on the page. | openings | DRAFTING |
| C7-06 | 26 | No riddle, no guess-the-word device, no stacked metaphor; metaphor is allowed only once the reader has somewhere to hang it. | openings | DRAFTING |
| C7-07 | 27 | Short is correct here — a front door that runs long has imported a chapter's job into a page that does not have one. | openings | DRAFTING |
| C7-08 | 29 | The old "warmth and orientation outrank density at a front door / density is the house register for teaching material" sentence is withdrawn; what remains special about a front door is only its shape — short, no artifact-first opening, one call to action at the end. | openings | PROCESS |
| C7-09 | 31-42 | A front door follows the ten-slot page skeleton in order: greeting and promise; grouped outline of what the stage covers (never a chapter count); what the reader will do and what the stage does not ask; the worked object; practical honesty about credentials; the one real risk; the safety-floor callout in plain Stage 0-2 wording; why this stage comes first and is ordered as it is; how to read it; one call to action last. | structure | DRAFTING |
| C7-10 | 46 | A front door does not open on or hang itself from a dated artifact and carries no citation apparatus; a year or name the reader genuinely needs is allowed anywhere, but a page that leads with one or decorates itself with them to look rigorous is not. | dates | DRAFTING |
| C7-11 | 47 | Bullets and tables carry the density; paragraphs run one to three sentences. | density | DRAFTING |
| C7-12 | 48 | One call to action, at the true end, once. | structure | DRAFTING |
| C7-13 | 49 | Where a front door states the platform's own what and why, it is grounded in the pre-approved official docs (problem_statement.md, solution_statement.md). | research | DRAFTING |
| C7-14 | 50 | Sections that answer one underlying question are merged into one section with subheadings rather than several top-level headings answering fragments. | headings | DRAFTING |
| C7-15 | 51 | A guess-the-word device stays off a front door entirely, not merely out of the opening. | openings | DRAFTING |
| C7-16 | 53 | Copying the warmth and leaving the structure is not a fix — the supplied reference's skeleton is filled slot for slot. | structure | DRAFTING |
| C7-17 | 69 | Map the reference's slots to our content first, one line per slot, and write the mapping down before any prose is drafted. | process | PROCESS |
| C7-18 | 70 | A slot with nothing real to put in it is answered honestly, not skipped. | process | PROCESS |
| C7-19 | 71 | Conflicts are resolved at the slot, never by discarding the structure. | process | PROCESS |
| C7-20 | 72 | Do not accumulate a rejection list. | process | PROCESS |
| C7-21 | 90 | "Remove", "delete" and "exclude" are instructions to take something out, not to improve it — delete it everywhere it appears, say what was deleted, and name and ask about any load-bearing part. | process | PROCESS |
| C7-22 | 91 | Before writing any rejection into a rule file, decide whether it belongs to the content layer or the design layer; design findings must never become content rules, and if it is not obvious which, ask. | process | PROCESS |
| C7-23 | 97, 99 | Reader-facing prose carries the story and the reason, in every chapter and not only front doors, while citations, disputed-date armoury and institutional detail stay backstage in the dossiers and ledgers. | research | DRAFTING |
| C7-24 | 109, 111 | A date or a name earns its place only by being load-bearing to the point of the sentence that carries it; where the story works without the year, the year is furniture. | dates | DRAFTING |
| C7-25 | 117 | An honest seam in a chapter's material becomes a Lesson or Part rather than one long page — never compress two subjects into one file to keep a count down, and never invent a seam. | structure | DRAFTING |
| C7-26 | 121-136 | Corrections that exist only in assistant memory outside the repo are listed so they can be recovered, and until each is transcribed into this file it must be assumed not to bind. | process | PROCESS |
| C7-27 | 150-157 | Before any teaching, every chapter, lesson and part carries an opening that does four things in roughly this order — greet and place the reader, connect backwards, say what this one covers, say why it matters — and then moves into the teaching. | openings | DRAFTING |
| C7-28 | 152 | The opening greets the reader and places them in words a person would actually say, varying the wording so that no welcome style reappears until four or five chapters later. | openings | DRAFTING |
| C7-29 | 153 | The opening connects backwards with a link: what the previous chapter or the introduction left the reader holding. | openings | DRAFTING |
| C7-30 | 154 | The opening says what this one covers as a few grouped bullets — the real moves, not a copy of the headings. | openings | DRAFTING |
| C7-31 | 155 | The opening says why it matters, for each item or for the set — why this arrives now and what it unlocks — and the why is not optional. | openings | DRAFTING |
| C7-32 | 159 | No opening phrase is banned: "In this chapter we will learn…", "Let's start" and "Welcome to Chapter 4" are all allowed. | openings | DRAFTING |
| C7-33 | 161 | There is no word cap on the opening — it is as long as it needs to be to do the four things well and no longer. | openings | DRAFTING |
| C7-34 | 163 | The move from the opening into the first teaching section is gradual; a warm opening does not license a cold section, and every section, not only the first, starts by connecting to what the reader just read. | openings | DRAFTING |
| C7-35 | 165 | The opening must be beautiful — bullets, spacing, emphasis and a callout where one helps. | openings | DRAFTING |
| C7-36 | 167 | A single sentence of narrative connection is not a fix for a cold opening. | openings | DRAFTING |
| C7-37 | 171 | Stages 0-2 are written for absolute beginners and for nobody else. | audience | DRAFTING |
| C7-38 | 179-185 | The two-reader architecture and every rule built on it are withdrawn, including "the senior quits at unrewarded sentences", the number-origin-failure-mode-reason recipe, "every paragraph carries something a senior did not already have", "the variable is continuity, not difficulty", and the both-audience content recipe. | audience | PROCESS |
| C7-39 | 189 | No rule may assume a senior reader is present until the owner decides, and the two-reader model must not be quietly rebuilt. | audience | PROCESS |
| C7-40 | 193, 197-201 | A reader never learns how the book's terms, glossary, chapters or stages are constructed internally, the project's internal vocabulary (station, spine, register, shape, invariant, safety floor as a label, Reading and Understanding Literacy, specification poverty, front door), or why a page is structured the way it is. | other | DRAFTING |
| C7-41 | 203 | Where an internal idea genuinely has to reach the reader, work out what to call it for them and ask the owner first rather than shipping the internal label. | naming | PROCESS |
| C7-42 | 209-211 | The "every chapter carries all six, or it is not publishable" rule and the mechanical tell are deleted; each invariant is scoped in thesis.md, and the misconception stays per chapter but placed where the reader would otherwise form the wrong idea. | structure | PROCESS |
| C7-43 | 221 | Research, sourcing and verification stay mandatory and rigorous; nothing in this entry relaxes research-and-comparison.md, the evidence ledger, or the ban on invented figures. | research | PROCESS |
| C7-44 | 222 | What was researched is not automatically what gets written — the ledgers hold everything, the chapter holds what teaches. | research | DRAFTING |
| C7-45 | 223 | A statistic reaches the reader as a plain sentence with its source attached at the end, not as a mid-sentence citation. | statistics | DRAFTING |
| C7-46 | 224 | Four inline-citation rules are withdrawn: voice.md's "real numbers with their year attached", thesis.md's "every statistic carries its year inline", research.md's "citations appear inline, named, in the prose itself", and evidence-ledger.yaml's "every claim is cited inline in the prose". | statistics | PROCESS |
| C7-47 | 234-236 | For Stages 0-2, choose the simplest accurate word — if a plain word is true, use the plain word. | other | DRAFTING |
| C7-48 | 237 | The engineering stays true and the vocabulary does not stay fixed: never make a claim less correct to make it simpler, but do drop a technical term the sentence does not need. | other | DRAFTING |
| C7-49 | 238 | Balance both ways — prose too vague to teach anything and prose too dense to read are both failures. | density | DRAFTING |
| C7-50 | 239 | Every word must make sense to an absolute beginner on the first read. | audience | DRAFTING |
| C7-51 | 247, 249 | The register varies by reader and may and should get gentler where the material gets harder. | pace | DRAFTING |
| C7-52 | 248, 250 | Warmth is not a front-door-only permission, and "writing down to a beginner is the one failure this book does not forgive" is withdrawn — the unforgivable failure is leaving a beginner behind. | audience | DRAFTING |
| C7-53 | 251-252 | "Not a cheerleader" is withdrawn and the bans on exclamation marks and emoji are lifted — both allowed now, decent and professional only, never the AI-slop set. | other | DRAFTING |
| C7-54 | 253 | Audience labels are allowed — "If you've never programmed, don't worry" is a permitted and often correct sentence. | audience | DRAFTING |
| C7-55 | 265 | Bold is used heavily and deliberately — key phrases, rules, warnings, the answer a section was asked for — wherever in the paragraph they fall. | bolding | DRAFTING |
| C7-56 | 266 | Bold is never assigned by position; "first sentence of every paragraph" is withdrawn as a convention. | bolding | DRAFTING |
| C7-57 | 267 | Visual flatness is fixed with structure, not bold — bullets, tables, short sections, callouts, the opening block. | structure | DRAFTING |
| C7-58 | 268 | The standard is beauty. | other | DRAFTING |
| C7-59 | 269 | Before calling any recurring pattern a defect, grep changelog.md and history/prompts/ for an owner request that produced it. | process | PROCESS |
| C7-60 | 283 | Study a source for everything it can teach — structure, ordering, tone, example shape, interface decisions, what it left out, what it got wrong — and adopt what is good. | research | DRAFTING |
| C7-61 | 284 | Then go further: the point of studying several sources is to beat all of them, not to average them and not only to find their gaps. | research | DRAFTING |
| C7-62 | 285 | Still forbidden: copying a source's text verbatim or near-verbatim, reproducing its exercises, or passing off its expression as ours — a pattern is not expression, a skeleton is not a sentence. | research | DRAFTING |
| C7-63 | 286 | A specific framing genuinely owed to a named source is attributed where it helps the reader, not as a reflex. | research | DRAFTING |
| C7-64 | 287 | The source-learning rule covers the platform too: pages, flows, buttons, labels, settings and marketing copy. | process | PROCESS |
| C7-65 | 297 | A sentence that needs a second read has failed, however elegant it is. | sentence-length | DRAFTING |
| C7-66 | 299 | No sentence whose subject is abstract and unnamed ("neither of those", "both") before the reader knows what it refers to. | sentence-length | DRAFTING |
| C7-67 | 300 | No compressed clause chains that must be unpacked in order to parse. | sentence-length | DRAFTING |
| C7-68 | 301 | Read every opening aloud, and if you stumble the reader stops. | process | PROCESS |
| C7-69 | 302 | This test outranks specificity, concision and elegance — every time. | audience | DRAFTING |
| C7-70 | 316 | Find the rule that produced the output and change that rule; a fix applied only to the page is undone by the next draft the rule governs. | process | PROCESS |
| C7-71 | 317 | Then check the layers below it — canon → skill → plan → ledger → gate; a canon fix a drafting plan contradicts has not landed. | process | PROCESS |
| C7-72 | 318 | A decision that binds must live where drafting actually reads (canon, or a skill's reading list), never only in proposals/, a PHR, a YAML note or assistant private memory. | process | PROCESS |
| C7-73 | 319 | Say which layer you fixed, so the owner can see whether it was the real one. | process | PROCESS |
| C7-74 | 320-325 | A page left live is a live instruction: the Stage 0 style models are ch00-introduction.md (front door) and ch01-foundations.md (chapter), and house style is never taken from intro-1 to intro-5. | other | DRAFTING |
| C7-75 | 345-349 | Every stage, chapter, lesson, part and section heading answers what this is and why the reader would want it, three-second test included; reference pages (glossary, changelog, FAQ) are exempt. | naming | DRAFTING |
| C7-76 | 351-365 | The why is why the topic is in this curriculum — what the step gives a reader on the way to specifying, bounding, verifying and owning AI-built work — supplied by the owner, never invented by the writer, and where it has not been supplied the writer stops and asks. | naming | PROCESS |
| C7-77 | 367-371 | Not a fix: putting the why in the first paragraph and leaving the title bare, an exciting title, a claim that the subject is important, or a fact about the subject's own significance. | naming | DRAFTING |
| C7-78 | 373-375 | This is recorded as ADR-0009, one of three Owner Input Gates alongside the comparative study and the model choice. | process | PROCESS |
| C7-79 | 377-380 | The naming rule is enforced at four points — canon/naming.md Rule 3, the NAME CHECK slot in curriculum-architect/reference/brief-format.md, lesson-spine-authoring SKILL.md step 6, and the heading-no-why warning in edu-site/scripts/check-chapter.mjs. | process | PROCESS |
| C7-80 | 398-403 | Before any content task starts, ask which model does which part — planning, drafting, research, revision — and wait for the answer; there is no default, and command-code-delegation's 95% figure does not apply to this book's prose. | process | PROCESS |
| C7-81 | 407-409 | Not a fix: asking once and applying the answer to the next chapter, inferring the split from last time, or delegating the draft and rewriting it afterwards without having asked. | process | PROCESS |
| C7-82 | 421-426 | The five old intro pages are retained as a topic-coverage source for the new Stage 0: before Stage 0 is declared complete, every subject they teach is checked off against the new chapters, anything only they cover is written in or recorded as a deliberate drop with its reason, and only then are they retired. | process | PROCESS |
| C7-83 | 428-430 | The old intro pages are not style models — read them for what they teach, never for how. | other | DRAFTING |
| C7-84 | 474-476 | The chapter component palette is open and expected to grow — tabs, collapsible sections, step cards, try-it panels, key-takeaway boxes, comparison cards, timelines and whatever else serves the reader; new ideas are wanted, not merely tolerated. | other | DRAFTING |
| C7-85 | 477-485 | What stays closed is a drawing delivered as inline markup: no component may be a drawing surface — no `<Figure />`, no inline SVG, no inline Mermaid in a chapter body — and the boundary is the delivery mechanism, not the author (pictorial imagery is still the owner's). | other | DRAFTING |
| C7-86 | 486-489 | Each component still needs both research passes before it is built; widening the palette does not widen the shortcut. | process | PROCESS |
| C7-87 | 490-492 | Components are added one at a time, deliberately, with the file and folder organisation kept clean; the candidate list lives at curriculum-state/proposals/chapter-component-palette-2026-09-20.md. | process | PROCESS |
| C7-88 | 467-470, 493 | ADR-0008 records the palette decision, flags that Constitution Principle III needs a wording amendment, and confirms the Source chip is part of this work rather than a separate task. | process | PROCESS |
| C7-89 | 515-517 | The lesson-spine-authoring skill becomes Bridge Balance-specific: its vocabulary, reader model and rules may name this book directly, and canon rules may move into it rather than being pointed at from outside. | process | PROCESS |
| C7-90 | 519-520 | ADR-0007 records this and supersedes ADR-0004's genericness clause only — the two-skill split stands. | process | PROCESS |
| C7-91 | 522-527 | Before any file moves, write the plan, name every file that changes, keep one source of truth per rule (a rule must not end up in both canon and the skill saying different things), and confirm the model split. | process | PROCESS |
| C7-92 | 538-540 | The five lesson shapes (Concept, Tool, Practice, Procedure, FrontDoor) are provisional and must not be treated as canon or built on top of until the owner and assistant redesign them together. | shapes | PROCESS |
| C7-93 | 541-543 | A lesson is never rounded to the nearest shape, and a lesson whose shape is unclear is a conversation with the owner, not a guess. | shapes | PROCESS |
| C7-94 | 570-572 | `C:\Users\Dell\Desktop\Book` is the repository and anything under `.claude/worktrees/` is a stale copy — never read a rule, canon file, skill or CLAUDE.md from a worktree path, and never write a rule there. | process | PROCESS |
| C7-95 | 573-577 | For any question about what is currently in force, read .specify/memory/constitution.md first; it supersedes CLAUDE.md, the skills and this file, and carries the dated amendment history. | process | PROCESS |
| C7-96 | 578-581 | Before writing a rule into an ADR or canon, check the constitution's amendment history for that rule's subject — a date attached to a rule is a claim about what is current and needs checking like any other claim. | process | PROCESS |
| C7-97 | 583-585 | Not a fix: correcting the one file that was noticed. | process | PROCESS |
| C7-98 | 589 | A new entry is appended as a `##` section carrying what was corrected and when, the owner's own words, what went wrong, the rule and what does not count as a fix — short, specific, and actionable. | process | PROCESS |

### Pointers out
| Line | Points to (exact path or file name) |
|---|---|
| 7, 49, 181, 275, 458, 563 | CLAUDE.md |
| 9, 125-135, 269 | history/prompts/general/ (PHR 0064, 0069, 0070, 0076, 0080, 0082, 0097, 0113) |
| 31, 322-323 | edu-site/docs/ch00-introduction.md |
| 101, 310, 322-323 | edu-site/docs/ch01-foundations.md |
| 49 | The Bridge Balance/Official docs/problem_statement.md |
| 49 | The Bridge Balance/Official docs/solution_statement.md |
| 84, 181, 248, 307-312 | .claude/skills/bridge-balance-project-guide/SKILL.md |
| 84, 101, 183-184, 248, 293, 307, 324-325 | lesson-spine-authoring (skill: SKILL.md and reference files) |
| 101, 224, 292, 312 | lesson-spine-authoring/reference/research.md, reference/stations.md, reference/mixed-audience.md |
| 123-135 | assistant private memory records (named in the table; not readable from the repo) |
| 173 | history/adr/0006-beginner-first-content-integrity.md |
| 185 | curriculum-architect/reference/brief-format.md |
| 252, 310 | prerequisite-graph.yaml |
| 269 | edu-site/docs/changelog.md |
| 373, 405 | history/adr/0009-owner-input-gates.md |
| 377-380 | edu-site/scripts/check-chapter.mjs |
| 391-402 | command-code-delegation (skill) |
| 324-325, 421-422 | edu-site/docs/intro-1-binary-to-programming.md … intro-5-spec-driven-engineering.md |
| 445, 457 | edu-site/src/theme/MDXComponents.tsx |
| 447 | Callout, StageBanner (registered MDX components) |
| 459-460, 557, 574 | Constitution (.specify/memory/constitution.md; Principle III; v2.3.0) |
| 467, 554 | history/adr/0008-chapter-component-palette-is-open.md |
| 492, 555 | curriculum-state/proposals/chapter-component-palette-2026-09-20.md |
| 499-520 | history/adr/0004-two-skill-content-split.md; history/adr/0007-lesson-spine-becomes-book-specific.md |
| 523 | chapter-production (skill) |
| 561-563 | .claude/worktrees/ (stale copies) |
| 570 | C:\Users\Dell\Desktop\Book (the repository) |

## DONE

