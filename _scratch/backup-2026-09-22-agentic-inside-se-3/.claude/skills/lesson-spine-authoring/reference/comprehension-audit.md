# The comprehension audit

*The mandatory pass between a finished draft and a presented draft. Ten angles, each run end to end over the whole thing. Nothing is written blind.*

> **This audit checks understanding. It does not check whether the reader will
> stay.** It has no angle for tone, warmth, pace, formatting or the opening, and
> it never had one. Both the rejected Stage 0 introduction and the cold
> `ch01-foundations.md` passed this audit clean and were rejected on sight.
>
> **The second required pass is the ten-angle beginner check in
> `beginner-experience-audit.md`** — every Stage 0–2 draft passes it before it is
> presented, and this audit runs first. Full rule:
> `curriculum-state/canon/audience.md`, "The reader". *(Added 2026-09-20.)*

## Contents

1. [Why this exists](#1-why-this-exists)
2. [How to run it](#2-how-to-run-it)
3. [The ten angles](#3-the-ten-angles)
4. [The mindmap test](#4-the-mindmap-test)
5. [The findings log](#5-the-findings-log)
6. [Self-check](#6-self-check)

---

## 1. Why this exists

A draft can satisfy every rule in this skill and still leave a reader with nothing. The stations can all be present, every term glossed, every sentence inside the register — and the reader still closes the page unable to say what they just read.

That happens because the author checked the *page* and never checked the *reading*. Those are different objects. The page is what is on screen; the reading is what happens in a particular person's head as they move down it, at their pace, with their gaps, with no way to ask a question.

**This pass checks the reading.** Its single question, asked ten different ways:

> **How, and why, would somebody fail to understand this?**

Not "is this correct." Not "is this covered." **Where does a real person lose it, and what exactly did they lose it on.**

**The standard the draft has to reach:** a reader finishes each section holding the concept, its context, and its place in the chapter — enough that the structure assembles itself in their head as they read, without being told to take notes. Anything short of that is a finding, not a matter of taste.

**No content is exempt.** Not a heading, not a callout, not a link's wording, not a sentence the author is sure is obvious. Obviousness is the author's state, never the reader's, and every silent assumption in the history of this book looked obvious to the person who wrote it.

**And the reader this audit imagines is an absolute beginner — in Stages 0–2, someone who has never programmed.** Running these angles as a competent reader who merely lacks the topic will pass material that a real beginner cannot use. The rule behind it: every word must make sense to an absolute beginner on the first read — `curriculum-state/canon/corrections.md`, "12. Simplify the vocabulary, not only the sentence".

---

## 2. How to run it

**One angle at a time, across the whole draft, ten times.**

This is the operational heart of the pass and the easiest thing to get wrong. Running all ten angles on each sentence as you scroll feels faster and produces almost nothing: the angles blur together, attention flattens after the third, and what comes out is one vague impression wearing ten labels.

Run angle 1 over every line. Then start again at the top and run angle 2. Ten separate sweeps, each with one question in mind.

Three rules that keep the pass honest:

1. **Read as the reader, not as the author.** The author knows what the next paragraph says. The reader does not, and cannot use it to resolve confusion in this one.
2. **Every finding names a location and a cause.** "This section is confusing" is not a finding. "Paragraph 4 uses *context window* nine lines before it is taught" is.
3. **A sweep with zero findings is suspect.** Ten clean sweeps on a first draft has never once been true. It means the sweep was performed rather than run — go back to the angle you moved through fastest.

**When to run it:** after the draft is complete and before it is presented or shipped. Not during drafting, which stalls the prose, and never after presenting, which makes the reader the auditor.

---

## 3. The ten angles

Each angle is a full pass. Each has a question, a target, and a fix.

---

### Angle 1 — The cold landing

**Question:** this reader arrived from a search result, a shared link, or a bookmark. They have read nothing before this page. What does it assume they already read?

**Look for:** a term carried in from an earlier chapter without being re-glossed. A "as we saw" or "recall that". A concept used as a building block that was built somewhere else. An opening sentence that only makes sense as a continuation.

**Fix:** re-gloss it here, or teach it here, or cut the dependency. Never a cross-reference standing in for an explanation — a link is not a gloss.

---

### Angle 2 — The unsorted term

**Question:** every term of art on this page — was it first checked for whether the chapter needs it at all, then put through the **one-minute** test, and did it get the treatment that test demands? *(One minute, measured against a reader who has never programmed — `canon/audience.md`.)*

**Look for:** a term used with no gloss. A term glossed weakly — buried in a subordinate clause, after a colon, or so far from its use that the reader has to carry it. A heavy term glossed in twelve words when it needed a passage. A Tier 1 term the glossary carries that was never marked and linked. A hard ordinary English word that stayed in the prose and was not explained and linked (`corrections.md` §27).

**Fix:** `mixed-audience.md` §4. Sort it, then give it the treatment its tier requires.

**This angle catches the most common real failure in this book**, and it catches it in a form the term rule alone misses: a term can be *technically glossed once* and still be illegible, because the gloss was structurally weak or because the word drifted — *coding agent* → *AI agent* → *the agent* — until the reader no longer knows they are all one thing. Glossed at first use means glossed **and kept alive**, not a box ticked once.

---

### Angle 3 — The silent step

**Question:** between this sentence and the one before it, did something happen that is not on the page?

**Look for:** a conclusion whose reasoning was skipped. A "therefore" carrying more weight than what precedes it. A result appearing without the operation that produced it. An example that only works if you already know the rule it demonstrates.

**Fix:** write the missing step in. It is usually one sentence, and it is usually the sentence the author found too obvious to write.

---

### Angle 4 — The floating referent

**Question:** every *it*, *this*, *that*, *they*, *the latter*, *the above* — can the reader name what it points to without looking back?

**Look for:** a *this* opening a paragraph and pointing at a whole preceding idea. Two candidate nouns before an *it*. A pronoun separated from its noun by more than one sentence.

**Fix:** name the thing again. Repeating a noun costs two words; a reader re-reading a paragraph to resolve a pronoun costs far more, and some of them do not bother.

**The rule behind this angle:** the canon rule against unnamed subjects and referents — `curriculum-state/canon/corrections.md`, "16. Every sentence must make plain sense on the first read".

---

### Angle 5 — The unanchored abstraction

**Question:** is this abstract claim attached to something concrete *before* the reader is asked to hold it?

**Look for:** a definition arriving before an instance. Two abstract sentences in a row. A principle stated in general terms that the reader has never seen operate on anything. Also the anchor itself: is it Pakistani-first (`curriculum-state/canon/corrections.md`, "29. Examples are Pakistani-first", and `curriculum-state/canon/audience.md`, "Language — the two decisions canon makes")? An anchor a Pakistani beginner cannot picture at once is a finding.

**Fix:** concrete first, then the abstraction it supports. A reader can generalise from one clear instance. Almost nobody can instantiate from a clear generalisation.

**The rule behind this angle:** the canon rule that a sentence may not leave its subject abstract and unnamed — `curriculum-state/canon/corrections.md`, "16. Every sentence must make plain sense on the first read".

---

### Angle 6 — The unmotivated passage

**Question:** does the reader know why they are being told this, here, at this point?

**Look for:** a section that is correct, well-written, and arrives for no reason the reader can see. A fact with no consequence. A paragraph that would be equally at home three pages earlier.

**Fix:** give it a reason on the page, move it to where it has one, or cut it. Unmotivated material is not absorbed even when it is read — it has nothing to attach to.

---

### Angle 7 — The second-language load

**Question:** where is the difficulty coming from the *sentence* rather than the *idea*?

**Look for:** anything past 28 words. An idiom. A phrasal verb that cannot be guessed from its parts. Three or more stacked nouns. A Latinate word with a plain equivalent. A long participial opening. Subject and verb pulled apart.

**Fix:** `language-register.md` §2 and §3. The engineering never changes; only the sentence does.

**The rule behind this angle:** the canon rule against compressed clause chains that have to be unpacked to be parsed — `curriculum-state/canon/corrections.md`, "16. Every sentence must make plain sense on the first read".

---

### Angle 8 — The false fluency

**Question:** could a reader finish this passage feeling they understood it, and be wrong?

**Look for:** a metaphor whose breaking point is never stated. A simplification never flagged as one. A prediction the text invited and never scored. Prose smooth enough that a reader glides over a hard idea without noticing it was hard.

**Fix:** state where the metaphor stops being true. Mark the simplification. Close the loop. A reader who knows what they do not understand is in a far better position than one who thinks they understand and does not.

**This is the most damaging angle and the easiest to skip**, because the text reads well by construction. Smoothness is exactly what hides it.

---

### Angle 9 — The structural orphan

**Question:** does this passage have a visible place in the chapter's shape, or is it floating?

**Look for:** a section a reader could not slot under anything. Two adjacent passages with no stated relationship. A heading that does not say what sits under it. Material whose connection to the chapter's claim lives only in the author's head.

**Fix:** make the relationship explicit in the prose — not by adding a heading, and never by naming a station. One sentence saying how this follows from what came before is usually the whole repair.

**This angle is the mindmap test's enforcement arm.** See §4.

---

### Angle 10 — The stall point

**Question:** where exactly would a real reader stop, re-read, or leave?

**Look for:** the sentence you yourself slowed down on while sweeping. The paragraph you skimmed on the way to a different angle. The place a beginner would first suspect the problem is them rather than the page.

**Fix:** name the sentence. Not the section, not the "flow" — the sentence. Then decide whether it gets rewritten, split, or cut.

**Run this angle last**, when the draft is fresh in mind but the other nine have already surfaced their causes. It is the only angle that reports a reader's *experience* rather than a defect's *mechanism*, and it routinely catches what the previous nine explained away.

---

## 4. The mindmap test

The ten angles find defects. This test measures the outcome those angles exist to protect.

**Close the draft. From memory, draw the chapter's shape — the claim at the centre, and what hangs off it.**

If it can be drawn from memory after one read, the structure is doing its job and the reader will build the same picture as they go. If it cannot, the failure is one of three, in ascending seriousness:

| What happened | What it means | Where to fix it |
|---|---|---|
| You can recall the parts but not their order | The relationships are implicit | Angle 9 — state them in the prose |
| You can recall the claim but not the parts | The sections are not distinct enough to hold | Station sheet — two stations are delivering the same thing |
| You cannot recall the claim | The chapter has no centre | `stations.md` §3 — the centre of gravity is wrong, and prose edits will not save it |

**The test is run on the author, honestly, as a proxy for the reader** — and the author has every advantage, having just written it. A chapter the *author* cannot redraw from memory has no chance with a reader meeting it once, on a phone, between other things.

---

## 5. The findings log

Every sweep writes down what it found. The log is presented with the draft, so an editor sees what was caught and what was judged acceptable rather than having to re-derive both.

```
COMPREHENSION AUDIT — [chapter]

A1  cold landing        | findings: [n] | [location — cause]
A2  unsorted term       | findings: [n] | [location — cause]
A3  silent step         | findings: [n] | [location — cause]
A4  floating referent   | findings: [n] | [location — cause]
A5  unanchored abstract | findings: [n] | [location — cause]
A6  unmotivated passage | findings: [n] | [location — cause]
A7  second-language     | findings: [n] | [location — cause]
A8  false fluency       | findings: [n] | [location — cause]
A9  structural orphan   | findings: [n] | [location — cause]
A10 stall point         | findings: [n] | [the exact sentence]

MINDMAP TEST:  [drawn from memory? which of the three failures, if not]
ACCEPTED:      [any finding deliberately left — with the reason]
```

**A finding may be accepted rather than fixed**, but only in writing and only with a reason. An accepted finding is a decision. An unlogged one is an oversight, and the difference matters the next time somebody reads the chapter and wonders whether anyone noticed.

---

## 6. Self-check

- [ ] Ten sweeps run, one angle at a time, each over the whole draft
- [ ] Every finding names a location and a cause, not an impression
- [ ] No sweep returned zero findings without being re-run
- [ ] Angle 2 checked term *chains*, not just first mentions — no term drifted in form
- [ ] Angle 8 run deliberately on the passages that read most smoothly
- [ ] Angle 10 run last, and names exact sentences
- [ ] Mindmap test drawn from memory, with the failure mode identified if it could not be
- [ ] Findings log completed and presented with the draft
- [ ] Every accepted finding carries a written reason
