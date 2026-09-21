---
id: 0113
title: File-by-file walkthrough of the rules that shape book content
stage: explainer
date: 2026-09-18
surface: agent
model: claude-opus-5
feature: none
branch: none
user: afnanzahed@gmail.com
command: none
labels: ["explainer", "content-pipeline", "root-cause", "cold-opening", "reference-density", "voice", "audit", "own-mistakes-disclosed"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/0113-file-by-file-walkthrough-of-content-rules.general.prompt.md
tests:
 - Measurement script over nine live Stage 0 pages (years per 1,000 words, share of paragraphs opening in bold, words between the h1 and the first h2) - intro-1..5 at 63-80% bold-lead, intro-4 at 6.5 years per 1,000 words, intro-5 with 0 words before its first section; ch00 0.0 / 29%; ch01 1.3 / 4%; ch02 0.8 / 10%; welcome 1.7 / 52%
 - grep of the live ch01 and ch02 for the names and dates the ledgers still attribute to them (Tukey, January 1947, Hollerith, 1890, 1801, 1837, Pierce, transresistance, Birkbeck, A-0, April) - every one returns 0, so all four ledgers are stale against the 17 September rewrite
 - Read of check-chapter.mjs VOICE_TELLS - confirms warnings on "in this lesson/chapter, we will/we'll" and "let's dive in / let's get started"
---

## Prompt

Actually even after this level of detailed documentation, I am failed to get the content the way I want from the claude to add it in the book. So, you have to give me the journey of Each and everything you listed above, becuase if I started to rad manually all of the above files, it will take more than a week to just find out what's exactly the problem, so, you will, ONE by ONE, read the above files, and give me in bullet points that what they ask the claude for, and what's the exact effect of these docs, with sentance (before/after) examples, so that I will be able to figure out where the exact problem is...NOTE: By 'above files', I am asking this to you: I'll map this out properly by reading the actual files rather than working from memory. Let me start with the repo's master map and the shared content memory.
Now let me read the master map and the shared content memory.
Now the canon files — these are the ones that stay true across every chapter.
Now the skills themselves — starting with the entry-point skill and its four bundled protocols.
Now the peer skill that writes the actual teaching prose.
Let me also check the research-delegation skill referenced throughout, since it's a real part of the pipeline.
Here's the complete pipeline — the diagram above shows the seven-stage shape; everything below is the full file-by-file list in plain language, in the order each thing actually gets used.
0. The rulebook that's already loaded, every session

* [CLAUDE.md](https://claude.ai/epitaxy/CLAUDE.md) — the master rulebook for this whole project. It says things like: never invent a final chapter list, never use git commands, never draw pictures, treat a beginner and a senior engineer as equally important, and always keep a paper trail (PHRs/ADRs) of what was asked and decided.

1. The front door — decides who should do the work

* [.claude/skills/bridge-balance-project-guide/SKILL.md](https://claude.ai/epitaxy/.claude/skills/bridge-balance-project-guide/SKILL.md) — every content task starts here. It doesn't write anything itself. It re-checks about ten standing rules (no fixed chapter count, the CS50 honesty rule, no AI-made images, free chapters forever, no git, two-readers-in-one-document), decides if the task is "content" or "platform," and tells you exactly which file to open next.

2. The book's shared memory — read before a single sentence gets written

* [curriculum-state/README.md](https://claude.ai/epitaxy/curriculum-state/README.md) — the index for this whole memory folder. Its job: stop chapter 10 from redefining a word chapter 2 already defined.
* [curriculum-state/canon/thesis.md](https://claude.ai/epitaxy/curriculum-state/canon/thesis.md) — the facts that never change: the book's core claim ("specify, bound, verify, own"), the five stages and what each covers, the six things every chapter must contain, and the exact wording of the safety warning.
* [curriculum-state/canon/audience.md](https://claude.ai/epitaxy/curriculum-state/canon/audience.md) — says who's reading: a senior engineer and a total beginner, at the same time, in the same document. Explains why sentences stay short — people read on phones, often in a second language — and locks in two choices: British spelling, Urdu words allowed but never required.
* [curriculum-state/canon/voice.md](https://claude.ai/epitaxy/curriculum-state/canon/voice.md) — how the book should sound: like an engineer who's actually done the thing, talking to one person. Bans phrases like "let's dive in" and "it's important to note." Has two tests every paragraph must pass before it ships.
* [curriculum-state/canon/integrity-floor.md](https://claude.ai/epitaxy/curriculum-state/canon/integrity-floor.md) — the hard stop for Stage 2 (the Harvard CS50 certificates). CS50's own rules don't allow Claude to do graded work for a student. If a task would cross that line, everything stops and asks the owner — no matter how far along it is.
* [curriculum-state/canon/research-and-comparison.md](https://claude.ai/epitaxy/curriculum-state/canon/research-and-comparison.md) — the biggest gate of all. Nothing gets written until two things happen: (1) research on how the best courses/sites in the world teach this, and (2) the project owner personally studies a few real courses and hands over notes. Step 2 can't be skipped, rushed, or replaced by Claude's own search results.
* [curriculum-state/contracts/calibration.md](https://claude.ai/epitaxy/curriculum-state/contracts/calibration.md) — the reading-speed math. Readers are assumed to read at 150 words a minute (slower than average, on purpose). Gives a size chart (`scope_multiplier`) so a chapter's length is a deliberate choice, not a guess.

The ledgers — the book's memory of what it's already said (read before writing, updated after):

* [concept-ledger.yaml](https://claude.ai/epitaxy/curriculum-state/ledgers/concept-ledger.yaml) — every technical word defined so far, and its one official wording.
* [evidence-ledger.yaml](https://claude.ai/epitaxy/curriculum-state/ledgers/evidence-ledger.yaml) — every real source (report, incident, statistic) already used, and which question each chapter asked of it.
* [example-ledger.yaml](https://claude.ai/epitaxy/curriculum-state/ledgers/example-ledger.yaml) — every worked example already used or rejected, so the same example doesn't show up twice.
* [term-ledger.yaml](https://claude.ai/epitaxy/curriculum-state/ledgers/term-ledger.yaml) — every word the glossary page shows, and which chapter is allowed to be the first one to use it. A machine check blocks an advanced-stage word from sneaking into an earlier chapter.
* [prerequisite-graph.yaml](https://claude.ai/epitaxy/curriculum-state/ledgers/prerequisite-graph.yaml) — the master list of every chapter that exists or is planned: its stage, its status (`placeholder` / `text-ready` / `video-published`), and what it needs to already be true first. Explicitly not a fixed table of contents.
* [curriculum-state/proposals/](https://claude.ai/epitaxy/curriculum-state/proposals/) — sketches and ideas for future stages. Never a commitment.

3. Planning a brand-new topic (only runs first if the topic has no home yet)

* [curriculum-architect/SKILL.md](https://claude.ai/epitaxy/.claude/skills/bridge-balance-project-guide/reference/curriculum-architect/SKILL.md) — turns a rough idea into a proper "lesson brief" (topic + stage + angle) and checks the prerequisite graph for gaps or broken links. Never writes prose, never finalizes anything.
* [brief-format.md](https://claude.ai/epitaxy/.claude/skills/bridge-balance-project-guide/reference/curriculum-architect/reference/brief-format.md) — the exact template that brief follows.

4. The production line — turns a topic into a real chapter file

* [chapter-production/SKILL.md](https://claude.ai/epitaxy/.claude/skills/bridge-balance-project-guide/reference/chapter-production/SKILL.md) — the assembly line, nine steps: check the CS50 rule → confirm topic/stage/angle are real → research → hand the actual writing to `lesson-spine-authoring` → set the length and say why → apply two quality tests → build the file → run the automatic checks → save what was learned back into the ledgers → report. Think "production editor," not "writer."
   * [research.md](https://claude.ai/epitaxy/.claude/skills/bridge-balance-project-guide/reference/chapter-production/reference/research.md) — exactly how research is done: real sources only, current facts double-checked, nothing about fast-moving AI tools trusted from memory.
   * [gate.md](https://claude.ai/epitaxy/.claude/skills/bridge-balance-project-guide/reference/chapter-production/reference/gate.md) — a cheat-sheet for reading the automatic checker's error codes.
   * [ledgers-protocol.md](https://claude.ai/epitaxy/.claude/skills/bridge-balance-project-guide/reference/chapter-production/reference/ledgers-protocol.md) — exactly what gets read from the ledgers before writing, and written back after.
   * [image-prompts.md](https://claude.ai/epitaxy/.claude/skills/bridge-balance-project-guide/reference/chapter-production/reference/image-prompts.md) — only opened if someone explicitly asks for an image prompt. Claude never draws; at most it writes a text description for the owner to paste into ChatGPT or MiniMax.
* `command-code-delegation` (a skill on this computer, not a file inside this project) — does about 95% of the research legwork through a cheaper AI (DeepSeek), while Claude just decides what to ask and checks the real answer.

5. The skill that actually writes the words

* [lesson-spine-authoring/SKILL.md](https://claude.ai/epitaxy/.claude/skills/lesson-spine-authoring/SKILL.md) — the writing method itself, called "Name-First." Eleven steps: figure out what kind of lesson this is, start from the word's own name/origin, plan what both a beginner and an expert get out of it, sort every technical term, write straight through, add separate boxes for beginner detail and expert detail, end on a memory-test question (never a summary), then audit it.
   * [stations.md](https://claude.ai/epitaxy/.claude/skills/lesson-spine-authoring/reference/stations.md) — the twelve fixed stops every lesson passes through, in order: name, anchor, source, why, what, how, where, cost, when, lineage, retrieve, spiral.
   * [name-registers.md](https://claude.ai/epitaxy/.claude/skills/lesson-spine-authoring/reference/name-registers.md) — rules for explaining where a technical word came from, without inventing a fake word-history. Includes a pre-checked list of safe word origins.
   * [mixed-audience.md](https://claude.ai/epitaxy/.claude/skills/lesson-spine-authoring/reference/mixed-audience.md) — how one document serves both readers: a main path everyone reads, plus optional "foothold" boxes (for beginners) and "depth" boxes (for experts) that can be deleted without breaking the main path. Also the exact rule for when a word gets a quick 12-word explanation versus its own paragraph.
   * [language-register.md](https://claude.ai/epitaxy/.claude/skills/lesson-spine-authoring/reference/language-register.md) — sentence-by-sentence rules: 15–18 words on average, no idioms, no slang, no fancy Latin-root words, real dates and numbers, British spelling. Also names ten "robot-writing" habits to avoid.
   * [comprehension-audit.md](https://claude.ai/epitaxy/.claude/skills/lesson-spine-authoring/reference/comprehension-audit.md) — the final proofread: ten separate read-throughs, each hunting one specific way a reader could get lost, plus a test where the writer tries to redraw the chapter from memory.

6. What a chapter is technically allowed to contain

* [MDXComponents.tsx](https://claude.ai/epitaxy/edu-site/src/theme/MDXComponents.tsx) — a chapter's text may only use two special boxes: `Callout` (for warnings) and `StageBanner`. Anything else breaks the website build. It also auto-adds the little status badge you see at the top of a chapter.

7. The automatic checker (the gate)

* [check-chapter.mjs](https://claude.ai/epitaxy/edu-site/scripts/check-chapter.mjs) — reads the finished file and checks it mechanically: are all the required fields filled in, does the safety-warning box use the exact right wording, do images have real descriptions, are headings in the right order. It does not check chapter length — length is a judgment call, not a number.
* [check-frontmatter.mjs](https://claude.ai/epitaxy/edu-site/scripts/check-frontmatter.mjs) — checks every page on the whole site (not just chapters) has its basic required fields.
* [check-references.mjs](https://claude.ai/epitaxy/edu-site/scripts/check-references.mjs) — checks every glossary link actually points to a real entry, and blocks a chapter from using an advanced word before the chapter that's supposed to introduce it first.
* All three run automatically inside `npm run build`, along with two more scripts that index the new chapter for site search and for the sidebar.

8. The result

* The chapter file itself, e.g. `edu-site/docs/stage-01-.../06-git-github.md` — plain text plus a small settings block up top. This is the only thing a reader ever actually sees.
* [glossary.md](https://claude.ai/epitaxy/edu-site/docs/glossary.md) — built from whichever words in `concept-ledger.yaml` are marked "defined."
* [changelog.md](https://claude.ai/epitaxy/edu-site/docs/changelog.md) — gets one new line the day a chapter goes live.

9. After a chapter ships — checks that run later, not every time

* [lesson-adversarial-review/SKILL.md](https://claude.ai/epitaxy/.claude/skills/bridge-balance-project-guide/reference/lesson-adversarial-review/SKILL.md) — a hostile, "prove this chapter wrong" review of one chapter, done as if the reviewer is a stranger with no memory of how it was written. Only reports problems, never fixes them.
* [book-coherence-audit/SKILL.md](https://claude.ai/epitaxy/.claude/skills/bridge-balance-project-guide/reference/book-coherence-audit/SKILL.md) — a check across the whole book at once, looking for things no single-chapter review can see: the same word defined two different ways in two places, one source overused, every chapter opening with the same trick.

10. The rules that sit above all of this (rarely opened per chapter, but win if anything ever conflicts)

* [.specify/memory/constitution.md](https://claude.ai/epitaxy/.specify/memory/constitution.md) — the project's constitution, nine ratified principles. If anything else in this repo disagrees with this file, this file wins.
* [PROJECT-MAP.md](https://claude.ai/epitaxy/PROJECT-MAP.md) — a plain map of the whole repository.
* history/prompts/ — a saved copy of every real exchange, filed by feature.
* history/adr/ — the record of big decisions — ADR 0004 is the one that split this whole system into `chapter-production` + `lesson-spine-authoring` in the first place.
* `The Bridge Balance/Official docs/` (a sibling folder outside this repo) — the three original planning documents that `canon/thesis.md` is built from. The one part of that other folder anyone's allowed to read.

Two small things worth knowing, caught while actually reading the current files rather than the summaries:

1. [curriculum-state/README.md](https://claude.ai/epitaxy/curriculum-state/README.md) still describes "four ledgers," but a fifth — [term-ledger.yaml](https://claude.ai/epitaxy/curriculum-state/ledgers/term-ledger.yaml) — was added 2026-09-14 and isn't reflected in that count yet.
2. There's an optional, newer frontmatter pair (`content_kind` / `content_kind_reason`, theory or practice) that the gate now accepts alongside `chapter_state` — not mentioned in [CLAUDE.md](https://claude.ai/epitaxy/CLAUDE.md)'s summary, but live in [check-frontmatter.mjs](https://claude.ai/epitaxy/edu-site/scripts/check-frontmatter.mjs) today.


NOTE: you will just do this one by one: read 1 file, then in the chat, tell me what this file wrote which effects the content writing, you will tell me in very simple words, in bullet points with example sentences, then you will do this for the next file, then next file and next file. one by one. hopefully, i will tell you in parrallel the change to be implemented in such files

## Response snapshot

Read 41 items from the live copy (`C:\Users\Dell\Desktop\Book\`, not the stale worktree) in the order Claude meets them. Each rule was marked 🔴 pushes toward the problem / 🟢 against / 🟡 either way / ⚪ no effect, with before/after sentences taken from the real old ch01, the rejected Stage 0 introduction and the accepted one. Four items were added that the original map lacked: Claude's private memory, `curriculum-state/stage-0-drafting-plan.md`, `curriculum-state/research/stage-0/`, and `Official docs/`'s register.

Where each complaint comes from:
- **Cold opening.** `voice.md` commitment 1 and its "any paragraph under the title — banned outright" tell; the 15 September memory "never write a new chapter with an intro under the title"; "In this lesson/chapter, we will…" banned in five places (CLAUDE.md line 46, voice.md, lesson-spine sixth constraint, corrections §7, and check-chapter's VOICE_TELLS); the drafting plan's per-chapter "Opens on: [subject]"; voice.md commitment 2 (concrete first); audience.md "the first screenful must deliver the thesis-linked claim and the one action"; Name-First Principle 1 (open with the name).
- **Names, dates and references.** The drafting plan's "Anchors it may use" column lists names and years per lesson (old ch01 used nearly all of them, "matching the plan exactly"); research.md "citations… inline, named, in the prose… not footnotes"; voice.md commitment 6, "real numbers with their year attached… vagueness is where AI-written prose is recognised" (missing from corrections §4's list of five); mixed-audience §2's spine recipe and "if it is short… go find the numbers and the incidents"; audience.md's senior reward, "a number, an origin"; stations S2, S7 and S9 plus the station-sheet slots; Principle 7, "real dates, named incidents" and no "imagine…"; thesis.md's year-inline rule; the evidence ledger's "cited inline in the prose"; the example ledger's "spine IS its real named incidents."
- **Alien and hard words.** thesis.md's six invariants in every chapter (the AI argument, and a safety floor with "postmortem finding", inside a binary chapter); "vocabulary untouched" (CLAUDE.md, lesson-spine, language-register); Latin and Greek in Station 0; language-register's CS-graduate reader and "simple English is what you write for a child"; the white-paper jargon of `Official docs/`.
- **No warmth.** voice.md's persona ("not a cheerleader") and "one voice, every stage"; warmth granted only to front doors (CLAUDE.md line 38, corrections §1 line 27, voice.md, the FrontDoor shape); no exclamation marks and no "performed enthusiasm" (language-register §6); the self-check "every paragraph carries something a senior did not have"; thesis.md's "delete any sentence… padding" tell.
- **Why fixes do not stick.** Owner decisions live where drafting never reads them: the redesign record, which is labelled non-binding (new Stage 0 voice and tone, beginner-only, light register); memory; PHRs. Constitution Principle IX mandates two readers in every chapter, and Principle VIII forbids borrowed structure; the constitution outranks everything. ADR 0004 made the writing skill generic by design. Fixes land beside the problem: a ch00 page instead of a fix to ch01's opening; density removed in the review layer and reintroduced by the plan's Anchors column. The comprehension audit and both review skills never check warmth; the coherence audit flags a consistent opening as "monotony." intro-1..5 are still live style models (63–80% bold-lead; intro-5 opens cold).
- **The rejected Stage 0 introduction, specifically.** Its moth came from name-registers.md ("a good verification lesson"). stations.md line 314 still says a stage intro "borrows Concept's" weighting, contradicting the FrontDoor table. The welcome brief rejected Hugging Face's opening on voice.md grounds. The first Welcome draft was written by the DeepSeek delegate.

Own mistakes disclosed:
1. The 17 September orientation block and the `cold-open` gate error contradict voice.md commitment 1 and the owner's 15 September rule. The conflict was not surfaced when the owner was asked.
2. The 17 September bold removal, the "bolded lead sentence" anti-pattern and the `bold-lead` gate warning reverse the owner's explicit 16 September request (PHR 0094: "Make the 20% of the content's text bold", "Topic sentence per paragraph", "Exactly as I asked"). Offered: (A) restore, or (B) record the change of mind in corrections.md.
3. corrections §7 kept the ban on "In this chapter we will…" although the owner's own quoted complaint asks for it.
4. The ledgers were not written back after the ch01/ch02 rewrite and still describe the removed names and dates. gate.md was not updated for the four new check codes. lesson-adversarial-review was not given corrections.md.

No project file was changed this turn. Every candidate change is held for the owner's decisions.

## Outcome

- ✅ Impact: the owner has a file-by-file map of which instruction produces which symptom, with real sentences, plus a ranked list of the decisions only they can make.
- 🧪 Tests: the measurement script and greps listed above. No build was run because nothing changed.
- 📁 Files: this PHR only. It was drafted in the session scratchpad because this session runs in a git worktree and the harness blocks direct writes into the live copy; it needs placing at `history/prompts/general/`.
- 🔁 Next prompts: the owner's decisions on (1) voice.md "nothing under the title" vs corrections §7; (2) allowing "In this chapter, we'll…"; (3) the bold A/B choice; (4) exclamation marks; (5) writing Stage 0 beginner-only into the constitution and audience.md; (6) a warm Stage 0–2 register; (7) amending Principle VIII for supplied references; (8) the six invariants per stage rather than per chapter; (9) retiring or hiding intro-1..5; (10) whether DeepSeek may draft prose. Separately, fix the stale ledgers, gate.md and the review skill's reading list, all own errors from 17 September.
- 🧠 Reflection: the complaint has no single root. Roughly thirty instructions across twenty files each push a little toward cold, dense, citation-heavy prose, and the few that push back are either labelled non-binding or outranked. The 17 September fix added more instructions without deleting the opposing ones, and it reversed an owner decision it never looked up.

## Evaluation notes (flywheel)

- Failure modes observed: owner decisions recorded only in PHRs, the changelog or a non-binding proposal are invisible to drafting and to later fixes, including this assistant's own 17 September fix. A harness worktree hid the live repo and made that session's first diagnosis read a stale copy.
- Graders run and results (PASS/FAIL): n/a (read-only explainer).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): before calling any prose pattern a defect, grep `edu-site/docs/changelog.md` and `history/prompts/` for an owner request that produced it.
