# One document, two readers

How a single lesson serves a senior engineer and someone who stalled at a signup form, without splitting into editions and without patronizing either.

## Contents

1. [The two disengagement conditions](#1-the-two-disengagement-conditions)
2. [Both-audience content](#2-both-audience-content)
3. [The three layers](#3-the-three-layers)
4. [Glossing without stopping](#4-glossing-without-stopping)
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

## 4. Glossing without stopping

The beginner needs every term defined. The senior needs the lesson not to stop. Both are satisfied by glossing inline, at first use, in twelve words or fewer, without breaking the sentence's momentum.

**This section covers *when* to gloss. `language-register.md` covers *how every sentence is built* — length, idiom, phrasal verbs, word choice. Read both before drafting; neither substitutes for the other.**

**Works:**

> The agent writes to a *branch* — a parallel copy of the code — so nothing you have is touched until you merge.

> Each call costs tokens, the chunks of text models are billed in, and a long file is a lot of them.

**Fails:**

> The agent writes to a branch.
>
> *What is a branch?* A branch is a parallel line of development in version control. Git allows multiple branches to exist simultaneously, each representing…

The second version stops the lesson to teach a prerequisite. The senior has now hit three unrewarded paragraphs, and the beginner has lost the thread they were following.

**Rules:**
- Gloss at first use, every time, even if the term appeared in an earlier lesson. A reader arriving from a search result or a shared link has no earlier lesson.
- Twelve words or fewer. If it needs more, it is a foothold, not a gloss.
- Expand every acronym on first use.
- Never gloss the same term twice in one lesson.
- Do not gloss in a footnote. A reader on a phone will not scroll to find it.

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
- [ ] Every term glossed inline at first use, twelve words or fewer
- [ ] Delete test run literally — footholds and depth blocks removed, lesson still stands
- [ ] Footholds and depth blocks labeled by content, never by audience
- [ ] Zero instances of "simple," "easy," "trivial," "obviously," "just," "as you know"
- [ ] Every foothold states its end state
- [ ] Register does not shift when the material gets easier
- [ ] Retrieval prompt scales — a beginner can answer partially, a senior fully
