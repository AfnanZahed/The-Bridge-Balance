# One document, one reader — the beginner

How a chapter serves someone who has never programmed, without patronising them
and without leaving anything out.

> **Rewritten 2026-09-20.** This file used to be called *One document, two
> readers*, built on serving a senior engineer and a beginner in one sentence.
> Who reads this book now is settled in `curriculum-state/canon/audience.md`,
> "The reader", and recorded in `curriculum-state/canon/corrections.md` §8. Open
> both before writing for any stage. *(The zero-knowledge floor was renumbered to
> Stages 0–1 on 2026-09-22 — `course-structure.md` CS-31.)*
>
> The filename is unchanged because a dozen files point at it.

## Contents

1. [Why a beginner stops reading](#1-why-a-beginner-stops-reading)
2. [What carries a chapter for a beginner](#2-what-carries-a-chapter-for-a-beginner)
3. [The three layers](#3-the-three-layers)
4. [Terms: the one-minute test](#4-terms-the-one-minute-test)
5. [Register discipline](#5-register-discipline)
6. [Worked example](#6-worked-example)
7. [Self-check](#7-self-check)

---

## 1. Why a beginner stops reading

Four reasons, and all four count. Why each one stops a beginner is the rule in
`curriculum-state/canon/audience.md`, "The reader"; the silent assumption behind
the first is in the same file, "The named groups". Open both before drafting.

**1. The first silent assumption.** A term, a symbol or a leap that assumed
something they lack and did not say so. Still the most important one, and still
the one a chapter is most likely to ship without noticing. Continuity is also
structural: no chapter depends on a chapter the reader may not have read, and
every link goes where the reader would need it, at the moment they need it.

**2. Difficulty that does not match them.** A hard word explained is still a
hard word. Ten of them on a page is a wall, however carefully each one was
glossed. **In Stages 0–1 a hard word must earn its place: if the idea works
without it, it goes.** Choosing the simplest accurate word is
`curriculum-state/canon/corrections.md`, "12. Simplify the vocabulary, not only
the sentence"; the engineering phrases of the Stage 2 safety wording are
never frozen into a beginner's chapter — `curriculum-state/canon/thesis.md`,
"The safety floor".

**3. Pace that wastes their time.** A beginner reads to get somewhere. Thorough
reads to them as stalling. Say the thing, land it, move.

**4. A page that looks like work.** No bullets, no table, no landmark, no
emphasis — just grey prose. They will not start, however good the sentences are.
Formatting is part of the teaching (`curriculum-state/canon/audience.md`,
"Formatting is part of the teaching"), and the density rule — bullets and tables
carry it, paragraphs run one to three sentences — is
`curriculum-state/canon/corrections.md`, "1. A front door is not a chapter".

**The corollary:** the failure is almost never "too advanced". It is an
unexplained leap, an unnecessary hard word, a slow stretch, or an ugly page —
and every one of those is fixable without changing what the chapter covers.

---

## 2. What carries a chapter for a beginner

Before drafting, list what will make this subject land for someone meeting it
for the first time. **That list is the spine.**

| Category | What it does for a beginner |
|---|---|
| **The problem that came first** | Gives them a reason to care before they are given a thing to learn. Concrete, narrative, needs no vocabulary. |
| **An everyday analogy or short scene** | Something they already have a picture for, that the new idea can attach to. |
| **A worked example that runs through the chapter** | One object, returned to with a new question each time, so the abstraction always has somewhere to stand. |
| **The mistake most people make** | Shows them the shape of the idea from the outside, and gives them something to be right about. |
| **Where the analogy breaks** | Usually where the real understanding starts. |
| **A magnitude they can feel** | "About a second, where the other takes a minute" — a comparison, not a citation. |
| **Name origins** | When the decomposition genuinely helps. Dissolves terminology anxiety. Skip it when the roots need their own explanation. |

**The old cap of "one analogy per concept, at most" is withdrawn** — the real limit is whether each one earns its space. Draw an analogy from the topic's own mechanics where that works, and from ordinary life where that works better.

*Removed from this table on 2026-09-20*, because each existed to keep an expert
reading and each pulled the prose toward names and dates: **named failures and
incidents** as a default spine element, **blast radius**, and **live
disagreements**. Each is still usable where it genuinely teaches a beginner
something — none is a requirement any more.

The senior-reward rules themselves are gone, not softened: *"…as long as it
carries one thing they lacked: a number, an origin, a failure mode, a reason"*
and *"Every paragraph must carry something a senior did not already have."*

**Also removed: the rule that followed this table** — *"If it is short, the
lesson has a sourcing problem, not a writing problem — go find the numbers and
the incidents before drafting."* That sentence told every drafting session that
a thin list meant more research, and more research meant more dated facts. A
short list usually means the everyday example has not been found yet.

**Layering, not omission:**

| Content | Goes in |
|---|---|
| Install steps, keystrokes, "you should now see" | Foothold |
| A second explanation of the same idea, for the hardest point | **Spine** — this is good teaching, not repetition |
| A prerequisite the chapter leans on | **Spine** — teach it, in place, before it is needed |
| How it works underneath, explained so a curious beginner can follow it | Depth block (optional) |
| A comparison with something the reader already met earlier in the book | Depth block (optional) |

*Changed 20 September 2026: a depth block is an optional extra for a curious beginner, not a home
for material that needs prior knowledge. The rows for comparisons needing knowledge of adjacent
tools and for migration, scale and team-adoption considerations are removed, because both
presuppose a professional reader. `corrections.md` §25.*

*Note the two rows that moved into the spine.* The old file sent "prerequisite
explanation of a general concept" to a foothold — optional, skippable material.
For a reader who has never programmed, a prerequisite is not optional. It is the
chapter. Continuity — nothing skipped, nothing assumed, no leap taken over the
reader's head — is the rule in `curriculum-state/canon/audience.md`, "The
reader". Open it before drafting.

---

## 3. The three layers

One document. Three layers. No reader is ever told to skip anything.

### The spine

Read by everyone, top to bottom, complete on its own. Every paragraph moves the
beginner forward. Built from §2. **The spine is the chapter**; the other two
layers are optional widening. Why nothing may be skipped, assumed or left as a
leap over the reader's head is the rule in
`curriculum-state/canon/audience.md`, "The reader". Open it before drafting.

### Footholds

Marked, self-contained blocks holding concrete mechanics: exact commands, click
paths, expected output, what a working result looks like.

- Labeled by content, never by audience. **"The exact commands"** — not
  "For beginners."
- Placed immediately after the spine paragraph they support.
- Written plainly, with no apology. Never "this is very simple" — a stuck reader
  reads that as a verdict on themselves.
- Always state the end state: *when this works, `git status` prints a line about
  a branch.* Without it, a beginner cannot tell success from partial failure.

### Depth blocks

Optional, marked, self-contained blocks for a curious beginner: the *why* behind
something the spine states plainly — how it works underneath, or why it was built
this way — explained so that someone who has never programmed can follow it using
only what the chapter has already taught.

*(Changed 20 September 2026. A depth block used to hold material that needed prior
knowledge to be worth reading, for a second reader who is no longer part of the book.
The owner kept the block as an optional extra for the curious beginner.
`corrections.md` §25.)*

- Labeled by content. **"Why the isolation is weaker than it looks"** — not
  "Advanced."
- Never load-bearing. If the spine depends on it, it is a paragraph you hid.
- A beginner who reads one should be able to follow all of it, and should never need to have read it to follow the chapter.

### The delete test

**Remove every foothold and every depth block. The chapter must still stand as a
complete, coherent piece.**

If it doesn't, material was load-bearing and belongs in the spine — and a
beginner who skipped a depth block now has a hole they cannot see.

Run this literally, not as a thought experiment.

---

## 4. Terms: the one-minute test

Every term runs through one test before it is allowed onto the page.

**First, a question that comes before the test: does the chapter need this word
at all?** In Stages 0–1, if the idea works without it, it goes. The strongest
option for a hard term is often to cut it and write the idea plainly.

**Then: could a reader who has never programmed hold a working understanding of
this word within one minute?**

*(One minute, tightened from two on 2026-09-20. The old threshold was measured
against a reader who had programmed before.)*

| | **Tier 1 — light** | **Tier 2 — heavy** |
|---|---|---|
| The test | Understood inside one minute | Needs longer than a minute |
| Treatment | Explain inline, and mark the word | **Teach it first, then use it** |
| Cost on the page | One clause | A passage of its own |
| Ledger weight | `minor` | `major` |

**This section covers *when* to explain a term and *when* an inline explanation
is forbidden. `language-register.md` covers *how every sentence is built*. Read
both before drafting; neither substitutes for the other.**

---

### Tier 1 — explain inline, and mark the word

Explain at first use, in twelve words or fewer, without breaking the sentence's
momentum.

**Works:**

> The agent writes to a *branch* — a parallel copy of the code — so nothing you
> have is touched until you merge.

> Each call costs tokens, the chunks of text models are billed in, and a long
> file is a lot of them.

**Fails:**

> The agent writes to a branch.
>
> *What is a branch?* A branch is a parallel line of development in version
> control. Git allows multiple branches to exist simultaneously, each
> representing…

The second version stops the chapter to teach a prerequisite in the wrong place.

**On top of the inline explanation, a Tier 1 term the glossary carries is marked
where it first appears:**

```
[*blast radius*](/glossary#blast-radius)
```

That renders as an italic, accent-coloured, underlined word carrying a faint
tint — a word the reader can *see* has a definition behind it, and can reach in
one tap when twelve words were not enough.

- **Italic, never a font change.** `*blast radius*` is emphasis. Never
  backticks — `` `blast radius` `` renders the term as code, which makes a claim
  about the word that is false.
- **The link never replaces the explanation** on the term's first appearances. A
  reader on a phone, on paid data, mid-sentence, does not leave the page.
- **The inline explanation stops after roughly the term's first two or three
  appearances in the book.** *(Changed 2026-09-20.)* After that, the term
  appears as the glossary link alone, with no inline gloss. The old rule —
  re-gloss in every chapter, every time, forever — is what made pages read like
  dictionaries. A reader arriving cold from a search result still has the link,
  one tap away, which is what the glossary is for.
- **Mark at first use in a chapter, not at every use.** The same word linked
  eight times on one page is noise.
- **The slug has to resolve.** `/glossary#<slug>` is checked against the
  glossary page's real heading anchors, and `check-references.mjs` is the only
  thing between a wrong anchor and a reader who taps it. The rule and the check
  are `curriculum-state/canon/audience.md`, "Where they read, and what each
  condition obliges": `term-ledger.yaml` holds the anchors, and the check fails
  a link that does not resolve to one.
- **Expand every acronym on first use.**

---

### Tier 2 — teach it, then use it

A term that needs more than a minute **cannot be compressed into a gloss**. Not
in twelve words, not in thirty. It gets taught before its first use, or the
chapter is restructured so that it is not needed yet.

Three routes, in order of preference:

1. **Cut the term and write the idea plainly.** Often the strongest option, and
   in Stages 0–1 it is the first one to try. A term is a compression, and
   compression only pays when the reader will meet the word again.
2. **Teach it in the spine, in place, before the sentence that needs it.** Its
   own short passage: what it is, why it exists, one concrete instance. Then use
   it freely for the rest of the chapter.
3. **Move it to a chapter that has room to teach it, and don't use it here.**

*(Route 1 and route 2 swapped places on 2026-09-20. Teaching every heavy term in
place is how a beginner chapter grows a vocabulary problem one passage at a
time; asking first whether the word is needed is cheaper for everyone.)*

**A heavy term may never be taught in a foothold or a depth block.** Both must
pass the delete test in §3, and a definition the spine depends on cannot.

**The ordering is enforced, not advisory.** A term carrying `weight: major` in
`term-ledger.yaml` must not be *used* by a chapter positioned before the chapter
recorded as introducing it. `check-references.mjs` fails the build on it. The
ledger and the check are owned by `curriculum-state/canon/audience.md`, "Where
they read, and what each condition obliges".

---

### The zero-knowledge floor

The floor is the rule in `curriculum-state/canon/audience.md`, "The reader" —
nothing assumed of a beginner, and no separate senior reader in any stage.
Open it before drafting for any stage.

| | Floor | What is assumed of the reader |
|---|---|---|
| **Stages 0, 1** | **Hard** | Nothing. Assume a reader who does not know what Python is. Every term sorted, every Tier 2 term cut or taught first, no exceptions granted for length or pace. |
| **Stage 2** | **Soft** | The first two stages, plus what the reader has learned since. The same reader, further along; how this stage is written waits for the redesign. Do not assume a separate expert. |

**When two rules conflict in Stages 0–1, the beginner's side wins.** That is the
tie-breaker, and it is stated here because it kept being missed: a rule that
would make a page denser, harder or colder loses to one that would make it
clearer, plainer or warmer, every time, in these two stages.

**One unsorted term in Stage 0 costs more than ten in Stage 2**, because the
Stage 0 reader has nothing to fall back on and no way to tell whether the
confusion is the book's fault or their own.

---

### The glossary holds one entry per term, ever

- **Inline explanations repeat a little, then stop** — roughly the term's first
  two or three appearances in the book.
- **Glossary entries never repeat.** One term, one entry, one canonical wording,
  one anchor — for the whole book.

Repeating the *entry* would split a term's meaning across two places, and the
moment those two drift the book is teaching two different things under one word.

---

## 5. Register discipline

**Never tell a reader to skip.** Not "if you're new to this, skip ahead," not
"experienced readers will know," and above all not "as you probably already
know" — that last one makes a reader who doesn't know feel they have failed a
test.

**Speaking to the beginner warmly is different, and is encouraged.** "If you
have never programmed, nothing here assumes you have" welcomes a reader rather
than sorting them. The old blanket ban on audience labels is withdrawn
(`corrections.md` §13).

**No difficulty signalling.** "Simple," "easy," "trivial," "obviously," "just."
Every one converts a stuck reader's problem into a personal failing. *Just run
`npm install`* is a small act of contempt when `npm install` is what's failing.

**No apology in either direction.** Not "sorry for the detail," not "skipping
the basics here."

**The register may shift, and should.** *(Reversed 2026-09-20.)* Slowing down,
softening and explaining a second way at the hardest point is good teaching. The
old rule — "a lesson that gets noticeably plainer when it reaches something a
beginner might not know has just told that reader which parts were for them" —
assumed a second reader who is no longer there. In Stages 0–1 every part is for
the beginner. The rule that the register varies by reader and may get gentler
where the material gets harder is `curriculum-state/canon/voice.md`, "Register —
it varies, and that is the point"; the ban it withdrew is recorded in
`curriculum-state/canon/corrections.md`, "13. Warmth, enthusiasm and emphasis
belong everywhere".

**Never explain the book's own rules or internal vocabulary to the reader.**
No *station*, *spine*, *register*, *shape*, *front door*, *invariant*, and no
sentence about how this book handles its glossary. The rule is
`curriculum-state/canon/corrections.md`, "9. Never explain the book's internal
rules or internal names to the reader"; `curriculum-state/canon/naming.md`,
"Supporting conventions", keeps the same labels out of names; and
`curriculum-state/canon/thesis.md`, "Reading and understanding literacy",
requires a reader-facing name and the owner's answer first.

**All of §3's word bans are enforced again, with the full list, in
`language-register.md` §3.** The canon also bans these outright —
"It's important to understand that…", "In today's fast-paced world…", "delve",
"leverage" as a verb, "utilise", "robust", "seamless", "game-changer" — and the
full table is in `curriculum-state/canon/voice.md`, "Phrases that do not appear
in this book".

**Assume intelligence, never knowledge.** The reader who has never programmed is
not less capable; they have less context. Writing that conflates the two is the
failure this whole file exists to prevent. The rule behind it is
`curriculum-state/canon/audience.md`, "Where they read, and what each condition
obliges": write plainly because the subject is new, not because the reader is
slow.

---

## 6. Worked example

**Chapter:** *What an AI coding agent actually is.* Shape: Concept. Stage 2, so
the vocabulary floor is soft — but the warmth is not.

**Opening (before any of this):** a hello, a link back to what the reader just
finished, the two or three things this chapter covers, and why they matter now.

**Station 0 — Name.** *Agent* is Register 4. It implies autonomy and independent
agency. The reality is a model in a loop with tools and a stopping condition.
Large gap → the chapter is a correction, and the misconception is the subject.
*(Placement is the rule in `curriculum-state/canon/thesis.md`, "The six
invariants": the misconception sits at the point the reader would otherwise form
the wrong idea, not automatically in the first paragraph — recorded in
`curriculum-state/canon/corrections.md`, "10. The six invariants are stage-level,
and the mechanical tell is deleted".)*

**What will carry this for the reader:**
- The name mismatch — they arrive holding the wrong model, and finding that out
  is the chapter
- The loop's actual shape: propose, act, observe, repeat until a stop condition
- An everyday comparison for the loop, returned to twice
- What it costs, as a magnitude they can feel
- Where the "agent" metaphor breaks: it has no goals, only a stopping condition

**Spine:** all five, in order.

**Foothold**, after the loop paragraph: *"What one turn looks like"* — an actual
transcript with the tool calls visible, annotated.

**Depth block**, after the cost paragraph: *"Why token cost scales worse than
task size"* — context accumulation across turns.

**Delete test:** remove both. The spine still explains what an agent is, why the
name misleads, what the loop does, what it costs, and how it fails. Passes.

**Station 10:** *"Without looking back — describe the loop in three sentences,
and name the one thing that stops it."*

---

## 7. Self-check

- [ ] What will carry this for a beginner was listed before drafting; the spine is built from it
- [ ] Every spine paragraph moves an absolute beginner forward
- [ ] Every term was first tested for whether the chapter needs it at all
- [ ] Every surviving term sorted by the one-minute test — none left unsorted
- [ ] Every Tier 1 term explained inline at first use, twelve words or fewer
- [ ] Every Tier 1 term the glossary carries is marked as `[*term*](/glossary#slug)` — italic, never backticks
- [ ] The inline explanation stops after the term's first two or three appearances in the book
- [ ] Every Tier 2 term cut, or taught before its first use in the spine — never compressed into a gloss, never hidden in a foothold
- [ ] Every Tier 2 term carries `weight: major` in the term ledger, with `first_introduced` set
- [ ] Stages 0–1 material holds the hard floor: nothing assumed of a reader who has never programmed
- [ ] No term gained a second glossary entry
- [ ] Delete test run literally — footholds and depth blocks removed, chapter still stands
- [ ] Footholds and depth blocks labeled by content, never by audience
- [ ] Zero instances of "simple," "easy," "trivial," "obviously," "just," "as you know"
- [ ] No reader is told to skip anything
- [ ] Every foothold states its end state
- [ ] No internal rule or internal label appears in reader-facing prose
- [ ] The register gets gentler, not flatter, at the hardest point
