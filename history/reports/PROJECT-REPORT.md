# What Claude built this session — plain English report

This is a simple explanation of everything that was created or changed for The Bridge Balance, what each piece does, and exactly what changed in the thesis and curriculum files. No jargon left unexplained.

## The big picture

You already have a book project with an official curriculum (the 4 stages) and a growing site. The problem this session solved: every time you (or a future Claude session) write a new chapter, it needs to remember what earlier chapters already said, so it doesn't redefine the same word twice, reuse the same source too often, or repeat the same example. So this session built two things that work together: five "skills" (small instruction packs that tell Claude exactly how to do one job well) and one shared memory folder that all five skills read from and write to, called `curriculum-state`. Think of the skills as five different specialists, and `curriculum-state` as the shared notebook they all read before starting and update before finishing.

## Two folders you'll actually see

There are two places on your computer this work touches. The first is `.claude/skills`, inside your Book folder — this is where the five skill files live so Claude can use them. Claude cannot write into this folder directly (it's blocked for safety), so this is the one manual step left for you: a file called `Book Content Creation.zip` was sent to you in this conversation, and you need to drop it into that `.claude/skills` folder yourself, replacing whatever is there now. The second is `curriculum-state`, also inside your Book folder — this one Claude already copied onto your computer directly, so there's nothing for you to do there.

## The five skills, what each one actually does

`chapter-production` is where a new chapter starts. Give it a topic, and it researches the topic properly, checks what earlier chapters already said about related words and sources, assembles the finished chapter file and puts it through the quality gate. It does not write the lesson: the `lesson-spine-authoring` skill does that, deciding what the reader meets and in what order, and writing every sentence. `curriculum-architect` is the planning helper: ask it to help think through what a stage's chapters could be, or to turn a rough idea into a clear, ready-to-research brief. Everything it produces is only ever a suggestion for you to accept, change, or throw away — it never decides anything on its own. `lesson-adversarial-review` is a strict grader for one chapter that's already written: its whole job is to try to find real problems in it, and it never fixes anything itself, only reports. `book-coherence-audit` is the same idea but for the whole book at once — every few chapters, it checks whether a word is being defined two different ways in two chapters, whether one source is being leaned on too much, whether the reader-facing labels are starting to feel repetitive, and so on.

## Inside curriculum-state, the shared notebook

`canon` holds the facts that never change: the book's core thesis, who's reading it, how it should sound, and the safety rules that override everything else. `contracts` holds the exact technical rules — how long a chapter should take to read, and exactly what a finished chapter file must contain. `ledgers` is five tracking files: which words are already defined and where, which sources have already been used and for what, which worked examples have already been used, the reader-facing picker labels used per chapter, and the map of which chapters depend on which. `proposals` is new this session — it's where `curriculum-architect` saves its planning sketches. Nothing in that folder is a decision; it only becomes real if you read it and act on it.

## What changed in the thesis and the curriculum

Two real changes happened, and it's worth being precise about both.

The first was a mistake you caught earlier this session: a few files had wrongly stated that the book is "17 chapters," as if that were a fixed, decided number. That number came from Claude counting placeholder files sitting on disk and writing that count into prose as if it were settled fact — it was never a real decision, and there is no fixed chapter count, now or ever. Every file with that mistake was corrected, and a permanent rule was added (recorded as decision "D5") saying no skill or file may ever again claim a fixed chapter count, list, or table of contents. Chapters, topics, and how many there are stay entirely up to you, decided as you go.

The second change is smaller and just happened: inside `curriculum-state/canon/thesis.md`, there's a table listing the four official stages and what each one focuses on. Before, the note under that table just said it came from your official curriculum document, without saying exactly where. Claude went back into your real `curriculum_1.md` file and checked precisely which section backs each stage's row — and found a real trap worth flagging: Stage 2's row must come from the sentence about earning two Harvard certificates, not from the CS50 course syllabus topics listed nearby (functions, loops, HTML/CSS), which describe what those courses cover, not what Stage 2 of your book is about. The note now points at the exact section for each stage, so it stays accurate even if you reorganize that document later, and so this exact mix-up can't happen again.

## Where things stand

Everything above is built, checked by a separate hostile review pass (twice), and delivered. The one thing left is entirely yours to do: drop the new `Book Content Creation.zip` into `.claude/skills` on your computer, replacing the old one.
