# One document, two readers

How a single lesson serves a senior engineer and someone who stalled at a signup form, without splitting into editions and without patronizing either.

## Contents

1. [The two disengagement conditions](#1-the-two-disengagement-conditions)
2. [Both-audience content](#2-both-audience-content)
3. [The three layers](#3-the-three-layers)
4. [Terms: the two-minute test](#4-terms-the-two-minute-test)
5. [Register discipline](#5-register-discipline)
6. [Worked example](#6-worked-example)
7. [Self-check](#7-self-check)

---

## 1. The two disengagement conditions

The problem looks like a contradiction and is not, because the two readers quit for different reasons and those reasons constrain different variables.

**The senior quits at unrewarded sentences.** Not at the presence of basics — at paragraphs that deliver nothing they didn't already have. A senior will read a plain-language explanation of something they know perfectly well, without irritation, as long as it contains one thing they didn't have: a number, an origin, a failure mode, a reason. What they will not read is three paragraphs of nothing. **The variable is pace, not level.**

**The beginner quits at the first silent assumption.** Not at hard material — at a term, symbol, or leap that assumed something they lack and didn't say so. A beginner will read genuinely advanced content, with effort and without quitting, as long as nothing has been skipped over their head without acknowledgement. **The variable is continuity, not difficulty.**

These are compatible. A lesson where every paragraph carries something new, and nothing is ever assumed silently, satisfies both. The whole architecture below exists to make that combination achievable rather than aspirational.

**The corollary that governs everything else:** the failure is almost never "too advanced" or "too basic." It is *pace* for one reader and *continuity* for the other, and both are fixable without changing what the lesson covers.

---

## 2. Both-audience content

Some content rewards both readers at once. Some serves only one. The spine is built from the first kind; the second kind gets layered.

**Rewards both — build the spine from these:**

| Category | Why the senior gains | Why the beginner can follow |
|---|---|---|
| **Name origins** | Near-universal blind spot; six years with a tool rarely includes its etymology | Requires zero prior knowledge; dissolves terminology anxiety |
| **Real magnitudes** | Rarely has current figures memorized | A number with a comparison attached needs no background |
| **The originating problem** | Usually knows the tool well and its problem barely, having arrived after it was solved | Concrete, narrative, no vocabulary needed |
| **Named failures and incidents** | Specific and checkable; often new even in a familiar area | Stories are the most accessible form there is |
| **Where the metaphor breaks** | Precisely where their intuition is silently wrong | Needs only the metaphor, which they were just given |
| **Blast radius** | Rarely has the dependency map for a tool they haven't operated | "When this breaks, nobody can log in" is immediately legible |
| **Live disagreements** | Signals a field that is still moving | Teaches that not knowing is normal |

**Serves one reader only — layer these:**

| Content | Serves | Goes in |
|---|---|---|
| Install steps, keystrokes, "you should now see" | Beginner | Foothold |
| Prerequisite explanation of a general concept | Beginner | Foothold |
| Comparisons requiring knowledge of adjacent tools | Senior | Depth block |
| Internals below the level the lesson operates at | Senior | Depth block |
| Migration, scale, and team-adoption considerations | Senior | Depth block |

**The practical rule:** before drafting, list this lesson's both-audience content. That list is the spine. If it is short, the lesson has a sourcing problem, not a writing problem — go find the numbers and the incidents before drafting.

---

## 3. The three layers

One document. Three layers. No audience labels anywhere.

### The spine

Read by everyone, top to bottom, complete on its own. Runs at full pace. Every paragraph carries something new. Built from §2's both-audience categories. **The spine is the lesson**; the other two layers are optional widening.

### Footholds

Marked, self-contained blocks holding the concrete mechanics a beginner needs and a senior will skip: exact commands, click paths, expected output, what a working result looks like.

- Labeled by content, never by audience. **"The exact commands"** — not "For beginners."
- Placed immediately after the spine paragraph they support, so skipping is one motion.
- Written plainly, with no apology. Never "this is very simple" — a stuck reader reads that as a verdict on themselves.
- Always state the end state: *when this works, `git status` prints a line about a branch.* Without it, a beginner cannot tell success from partial failure.

### Depth blocks

Marked, self-contained blocks holding material that needs prior knowledge to be worth reading: internals, trade-offs against named alternatives, scale and migration behavior, the argument behind a claim the spine states plainly.

- Labeled by content. **"Why the isolation is weaker than it looks"** — not "Advanced."
- Never load-bearing. If the spine depends on it, it is a paragraph you hid.
- A beginner who reads one should get something, even if not everything. Depth is not a locked door.

### The delete test

**Remove every foothold and every depth block. The lesson must still stand as a complete, coherent piece.**

If it doesn't, material was load-bearing and belongs in the spine — and a beginner who skipped a depth block now has a hole they cannot see, which is the exact failure the architecture exists to prevent.

Run this literally, not as a thought experiment. It is the only mechanical check in this file, and it catches the failure that matters most.

---

## 4. Terms: the two-minute test

The beginner needs every term defined. The senior needs the lesson not to stop. Every term runs through one test before it is allowed onto the page.

**Could a reader who has never met this word hold a working understanding of it within two minutes of reading?**

That answer sorts the term into one of two tiers, and the tiers get opposite treatment. There is no third option, and **no term is exempt from being sorted** — not a term the author finds obvious, not one an earlier chapter already covered, not one that appears only once.

| | **Tier 1 — light** | **Tier 2 — heavy** |
|---|---|---|
| The test | Understood inside two minutes | Needs longer than two minutes |
| Treatment | Gloss inline, and mark the word | **Teach it first, then use it** |
| Cost on the page | One clause | A passage of its own |
| Ledger weight | `minor` | `major` |

**This section covers *when* to gloss and *when* glossing is forbidden. `language-register.md` covers *how every sentence is built* — length, idiom, phrasal verbs, word choice. Read both before drafting; neither substitutes for the other.**

---

### Tier 1 — gloss inline, and mark the word

Gloss at first use, in twelve words or fewer, without breaking the sentence's momentum.

**Works:**

> The agent writes to a *branch* — a parallel copy of the code — so nothing you have is touched until you merge.

> Each call costs tokens, the chunks of text models are billed in, and a long file is a lot of them.

**Fails:**

> The agent writes to a branch.
>
> *What is a branch?* A branch is a parallel line of development in version control. Git allows multiple branches to exist simultaneously, each representing…

The second version stops the lesson to teach a prerequisite. The senior has now hit three unrewarded paragraphs, and the beginner has lost the thread they were following.

**On top of the inline gloss, a Tier 1 term the glossary carries is marked where it first appears:**

```
[*blast radius*](/glossary#blast-radius)
```

That renders as an italic, accent-coloured, underlined word carrying a faint tint — a word the reader can *see* has a definition behind it, and can reach in one tap when twelve words were not enough.

- **Italic, never a font change.** `*blast radius*` is emphasis. Never backticks — `` `blast radius` `` renders the term as code, which makes a claim about the word that is false.
- **The link never replaces the gloss.** A reader on a phone, on paid data, mid-sentence, does not leave the page. The gloss carries the meaning; the link carries the depth. A term that is marked but not glossed is the footnote failure wearing a new coat.
- **Mark once per chapter, at first use only.** The same word linked eight times is noise, and a reader stops seeing the mark at all.
- **The slug has to resolve.** `/glossary#<slug>` is checked against the glossary page's real heading anchors. A wrong slug is invisible to the build and to the eye, so the gate is the only thing standing between a wrong anchor and a reader who taps it.
- **Expand every acronym on first use**, in every chapter.

---

### Tier 2 — teach it, then use it

A term that needs more than two minutes **cannot be glossed**. Not in twelve words, not in thirty. It gets taught before its first use, or the lesson is restructured so that it is not needed yet.

Three routes, in order of preference:

1. **Teach it in the spine, in place, before the sentence that needs it.** Its own short passage: what it is, why it exists, one concrete instance. Then use it freely for the rest of the chapter.
2. **Move it to a chapter that has room to teach it, and don't use it here.** A heavy term used once, in passing, is almost always a sign the sentence wanted a plainer word.
3. **Cut the term and write the idea plainly.** Often the strongest option. A term is a compression, and compression only pays when the reader will meet the word again.

**A heavy term may never be taught in a foothold or a depth block.** Both must pass the delete test in §3 — remove them and the lesson still stands. A term definition the spine depends on cannot survive that test, so putting it there is not layering, it is a hole the reader cannot see.

**The ordering is enforced, not advisory.** A term carrying `weight: major` in `term-ledger.yaml` must not be *used* by a chapter positioned before the chapter recorded as introducing it. `check-references.mjs` fails the build on it. Setting that weight is the authoring decision this two-minute test exists to make — a term seeded `minor` that is in fact Tier 2 is a dormant defect, not a passing one.

---

### The zero-knowledge floor

**The test does not move. How strictly it binds does.**

| | Floor | What is assumed of the reader |
|---|---|---|
| **Stages 0, 1, 2** | **Hard** | Nothing. Assume a reader who does not know what Python is. Every term sorted, every Tier 2 term taught first, no exceptions granted for length or pace. |
| **Stages 3, 4** | **Soft** | The first three stages. Field-standard vocabulary a working developer uses daily may pass on the inline gloss alone, even when it is properly Tier 2. |

The first three stages are written for absolute newcomers as a matter of design, not of courtesy. A reader arrives there with no programming background at all, and the whole promise of the curriculum is that they can start from there and finish. **One unsorted term in Stage 0 costs more than ten in Stage 4**, because the Stage 0 reader has nothing to fall back on and no way to tell whether the confusion is the book's fault or their own.

The soft floor is a discount on *effort*, never a licence for a silent assumption. Stage 4 still sorts every term; it is allowed to resolve more of them with a gloss and a link instead of a passage.

---

### The glossary holds one entry per term, ever

Two rules that look like they contradict each other, and do not:

- **Inline glosses repeat.** Gloss at first use in *every chapter*, every time, even when an earlier chapter glossed the same word. A reader arriving from a search result or a shared link has no earlier chapter behind them.
- **Glossary entries never repeat.** One term, one entry, one canonical wording, one anchor — for the whole book. A term introduced in Stage 1 does not get a second Stage 4 entry when it comes back at greater depth.

**The second rule is what makes the first one safe.** Repeating the gloss costs a reader one clause and buys continuity. Repeating the *entry* would split a term's meaning across two places, and the moment those two drift the book is teaching two different things under one word. That is the failure the ledgers exist to prevent, and it is why re-glossing is a chapter-level habit and never a glossary-level one.

---

## 5. Register discipline

**No audience labels in reader-facing prose. None.** Not "if you're new to this," not "experienced readers will know," not "as you probably already know" — that last one is worst, because it makes a reader who doesn't know feel they've failed a test.

**No difficulty signalling.** "Simple," "easy," "trivial," "obviously," "just." Every one of them converts a stuck reader's problem into a personal failing. *Just run `npm install`* is a small act of contempt when `npm install` is what's failing.

**No apology in either direction.** Not "sorry for the detail," not "skipping the basics here." Write the lesson; the layers handle the routing.

**One voice.** The spine does not shift register between paragraphs. A lesson that gets noticeably plainer when it reaches something a beginner might not know has just told that reader which parts were for them.

**All of §3's word bans are enforced again, with the full list, in `language-register.md` §3.**

**Assume intelligence, never knowledge.** The reader who stalled at signup is not less capable than the senior; they have less context. Writing that conflates the two is the failure mode this whole file exists to prevent, and it is detectable in a single sentence.

---

## 6. Worked example

**Lesson:** *What an AI coding agent actually is.* Shape: Concept.

**Station 0 — Name.** *Agent* is Register 4. It implies autonomy and independent agency. The reality is a model in a loop with tools and a stopping condition; the autonomy is a configuration someone chose, not a property of the thing. Large gap → the lesson is a correction, and the misconception is the subject.

**Both-audience content identified:**
- The name mismatch (Register 4, levels the room — a senior is as likely as a beginner to carry the wrong model)
- The loop's actual shape: propose, act, observe, repeat until a stop condition
- Real cost figures per task, dated
- A named incident where the loop ran past where anyone wanted it to
- Where the "agent" metaphor breaks: it has no goals, only a stopping condition

**Spine:** all five, in order. Every paragraph carries one of them.

**Foothold**, after the loop paragraph: *"What one turn looks like"* — an actual transcript with the tool calls visible, annotated.

**Depth block**, after the cost paragraph: *"Why token cost scales worse than task size"* — context accumulation across turns. A senior gains a mental model for budgeting; a beginner who reads it still learns that longer sessions cost disproportionately more.

**Delete test:** remove both. The spine still explains what an agent is, why the name misleads, what the loop does, what it costs, and how it fails. Passes.

**Station 10:** *"Without looking back — describe the loop in three sentences, and name the one thing that stops it."* Open enough that a beginner produces a partial answer and a senior produces a precise one. Not a summary.

**Note the senior's path through this lesson.** They skip the foothold, read the spine at speed, stop at the cost figures and the depth block. They encounter no paragraph that gives them nothing. **The beginner's path:** reads everything, hits no unglossed term, and gets a concrete transcript at exactly the point where the abstraction would otherwise have floated away. Same document.

---

## 7. Self-check

- [ ] Both-audience content listed before drafting; the spine is built from it
- [ ] Every spine paragraph carries something a senior did not have
- [ ] Every term sorted by the two-minute test — none left unsorted
- [ ] Every Tier 1 term glossed inline at first use, twelve words or fewer
- [ ] Every Tier 1 term the glossary carries is marked once, at first use, as `[*term*](/glossary#slug)` — italic, never backticks
- [ ] Every Tier 2 term taught before its first use, in the spine — never glossed, never hidden in a foothold
- [ ] Every Tier 2 term carries `weight: major` in the term ledger, with `first_introduced` set
- [ ] Stage 0–2 material holds the hard floor: nothing assumed of a reader who has never programmed
- [ ] No term gained a second glossary entry — glosses repeat per chapter, entries never do
- [ ] Delete test run literally — footholds and depth blocks removed, lesson still stands
- [ ] Footholds and depth blocks labeled by content, never by audience
- [ ] Zero instances of "simple," "easy," "trivial," "obviously," "just," "as you know"
- [ ] Every foothold states its end state
- [ ] Register does not shift when the material gets easier
- [ ] Retrieval prompt scales — a beginner can answer partially, a senior fully
