# Canon — research and comparison before anything is written

**No claim in this project is made from memory or guesswork.** Every lesson, every chapter, every heading, every feature, every option, every button is grounded in studied external practice and then deliberately taken further. This is a core platform policy, not a preference, and it binds the content track and the platform track equally.

> **Scope, clarified 2026-09-20.** This rule governs **what is true** — the facts, the sequencing, the design decisions. It does not govern **how the writing sounds**. A warm opening, a reassurance, a well-chosen everyday analogy and the ordinary human rhythm of a good teacher come from the writer, not from a source, and requiring a citation for them is what turned this policy into a date-generator. Research the substance. Write the sentences.

This file is the authoritative statement. `CLAUDE.md`, `chapter-production`, and `lesson-spine-authoring` each bind the obligation and point here rather than restating it, so there is one wording to keep true.

## The two passes

Both run before a word is written. The second one matters more, and is the one most easily skipped because it needs a human.

### Pass 1 — Research against international and philosophical standards

Find out how the best practice in the world actually handles this, and why.

- **International standard.** How is this taught, named, sequenced, or built by the strongest sources available — recognised courses, primary documentation, established curricula, the tools' own authors? Not "what is a reasonable approach," but "what do the people who do this best actually do."
- **Philosophical standard.** What is the reasoning underneath it? Which first principle does the practice serve, what problem produced it, and what does it cost? A convention adopted without its reason is cargo, and it breaks the first time the situation differs.

**Who runs it.** Claude, or — around 95% of the time — **Command Code's DeepSeek v4.1 Flash**, per the `command-code-delegation` skill: Claude decides what to ask and judges what comes back, DeepSeek does the reading and searching. Delegating the labour never delegates the judgment, and a research result is read from its actual trace, never from its summary line.

### Pass 2 — The owner's comparative study

**The more important half, and a blocking input.** The project owner personally studies how other platforms teach or build the same thing, then hands over what they learned.

The routine, in order:

1. **The owner studies multiple real sources** on the topic — courses, tutorials, documentation, competing implementations.
2. **The owner pastes their own learnings**, along with the specific points they want carried into our version. These are their notes and their judgment, not a transcript dump.
3. **We extract the major and minor teaching points together**, from what was pasted — what each source does well, what it assumes, where it loses a reader, what it leaves out.
4. **We learn everything there is to learn, then go further.** Take what each source does well, how it orders its material, how it sounds, the shape of its examples, what it assumes, where it loses a reader — *and* what all of them missed. All of it is material. The goal is to beat every one of them, which needs both halves: what they got right, and the gap none of them filled.
5. **We adjust it** — see the transformation rule below.
6. **Then, and only then, we write.**

**Nothing is drafted before step 2 has actually happened.** If the owner's study has not been supplied for a piece of content, that is a missing required input: stop and ask for it. Do not proceed from search results alone and do not substitute your own reading of the sources for theirs — the comparison is the owner's call to make, and the whole policy exists because that judgment is the scarce input.

## The transformation rule

**Source material teaches people to write code. Ours teaches them to read and understand it.**

Every external source studied under this policy is aimed at producing a programmer who can type the solution. This book is aimed at **Reading and Understanding Literacy** — see `thesis.md` — the ability to read code, whoever or whatever wrote it, and judge it well enough to verify it and own the result. The adjustment step converts one into the other, and it is not cosmetic:

| The source does this | We do this |
|---|---|
| Teaches you to produce the syntax | Teaches you to read the syntax and say what it does |
| Exercise: write a function that… | Read this function and predict what it returns; find where it breaks |
| Builds fluency by repetition of writing | Builds judgment by repetition of reading, checking, and deciding |
| Success = the code runs | Success = you can tell whether the code is right, and say why |

**This is also what makes the derivation legitimate rather than a copy.** A chapter that walks the same path as its source, in the same order, toward the same skill, is a reproduction with new sentences. One that takes what the source taught and rebuilds it toward a different competence is a genuinely new work.

## The legal boundary

The owner flagged this and it is absolute. **Pasted material is input to understanding. It is never a source to reproduce.**

- **Never reproduce.** No verbatim passages, no lightly-reworded paragraphs, no lifted sequence of explanations, no copied exercises, problem sets, or assessment items. Not from a transcript, not from a paid course, not from an open one.
- **Learn everything, then write it yourself.** A source's *structure*, its ordering, its tone, the kind of example it reaches for, its interface decisions and its pacing may all be studied and adopted. What may not cross over is its **expression**: its sentences, verbatim or lightly reworded. A skeleton is not a sentence, and a pattern is not a paragraph.
- **Where the owner supplies a reference and asks for its pattern, use its pattern.** That instruction is not in tension with this policy — see `corrections.md` §2 and §15, and the rule that used to sit in this bullet (*"what does not survive is its wording, its structure, or its examples"*), which is withdrawn.
- **Examples are ours, and may be invented.** An everyday example a reader can picture is as legitimate as a real named one, and often teaches better. What we do not do is lift the source's own example wholesale.
- **Attribute where an idea is genuinely owed**, and where naming it helps the reader. A specific framing, coinage or finding from a named source is credited — placed so it supports the sentence rather than interrupting it, and never as a reflex that turns a teaching page into a bibliography.
- **A paid or licensed course is studied, never redistributed.** The owner's access to a course is not the reader's, and nothing in a chapter may function as a way around paying for it.

**The Stage 2 integrity floor overrides this policy wherever they touch.** `integrity-floor.md` is absolute: CS50P and CS50W material may inform how we teach reading literacy, and may never be adapted into anything that produces or completes graded CS50 work. When studying CS50 as a source under this policy, that boundary is checked first and the conflict is surfaced rather than worked around.

## This applies to the platform too

The policy is not content-only. **A new page, a new feature, a new setting, a new button, a new label** gets the same two passes: how do the best products in the world handle this interaction and why, and what did the owner find when they compared ours against the alternatives. A button added because it seemed reasonable is exactly the failure this policy exists to stop.

For platform work, Pass 1's "international standard" means established interface conventions, accessibility practice, and the named products that solve the same problem well. Adopt their reasoning, their patterns and their structure freely — what stays ours is the visual language (Constitution Principle VII) and the words.

## Worked example — Stage 1, starting Python

The shape this takes in practice, from the owner's own description of it:

1. **The owner studies** how Python is introduced across several real courses — YouTube tutorials, Sir Irfan Malik's Python programming course at hopetoskills/awfera, Harvard's CS50P, and freeCodeCamp's Python course among them.
2. **The owner pastes their out-of-the-box learnings** — what each course does well, what each assumes, and the specific things they want carried into ours.
3. **We extract the major and minor points together** from what was supplied, and find what all of them left out.
4. **We adjust toward reading literacy.** Where every one of those courses is teaching a beginner to *write* Python, ours teaches them to *read* Python and judge whether it is correct — because in this curriculum the reader will be directing an agent that writes it.
5. **We write** — original prose, our own examples, nothing lifted.

Four courses studied, none reproduced, and a chapter that does something none of the four set out to do.

## Self-check

- [ ] Pass 1 run — international practice and its underlying reasoning both established, not just the first
- [ ] Pass 1 delegated to DeepSeek via `command-code-delegation` unless there was a reason not to; results read from the actual trace
- [ ] Pass 2 supplied by the owner, or the work stopped and asked for it
- [ ] Major and minor points extracted from what was supplied, and what every source missed is named
- [ ] The transformation rule applied — the result teaches reading and judgment, not writing the core logic
- [ ] Everything learnable learned — structure, ordering, tone and example-shape included — and then taken further
- [ ] No expression reproduced: no verbatim text, no lightly-reworded paragraphs, no copied exercises
- [ ] Specific ideas genuinely owed to a named source are attributed in the prose
- [ ] Where a CS50 source was studied, `integrity-floor.md` checked first and no adaptation touches graded work
