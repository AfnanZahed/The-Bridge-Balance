# The beginner-experience audit — ten angles

*Required on every Stage 0, 1 and 2 draft, after the comprehension audit and
before the draft is presented, under the ten-angle beginner check rule in
`curriculum-state/canon/audience.md`, "The reader". Open it before running this
audit. Added 20 September 2026 on the owner's instruction.*

**Why this exists.** `comprehension-audit.md` asks one question ten ways: *would
a reader understand this?* It never asks whether a reader will **stay**. Both
the rejected Stage 0 introduction and the cold `ch01-foundations.md` passed the
comprehension audit clean, and the owner rejected both on sight. Understanding
is necessary and it is not sufficient.

**The owner's framing:** *"beginners not just need the EASE, but they also need
FAST, because reading too much is the seniors' habit, not the beginners'."*
Angles 1 and 2 are those two. The other eight cover the rest of what a beginner
needs in order to keep going.

**How to run it.** Ten separate sweeps, each over the whole draft, one angle at
a time. A sweep that returns nothing on a first draft was performed, not run.
Log every finding, what you did about it, and any you deliberately left.

> **Subject to a research pass.** These ten were built from the owner's two named
> angles plus established beginner-teaching practice. When Pass 1 research on how
> the strongest beginner courses in the world actually check their own material
> is run (`canon/research-and-comparison.md`), this list gets revised against it.

---

## 1. Ease — can they read every sentence once?

Sweep for the reading cost of the words themselves.

- Two canon rules govern the reading cost: a sentence that needs a second read
  has failed, and no subject may be abstract and unnamed before the reader
  knows what it refers to. Both, with the read-aloud test, are in
  `curriculum-state/canon/corrections.md`, "16. Every sentence must make plain
  sense on the first read". Open it before this sweep.
- Any word a beginner does not own, that the idea did not actually need?
- Stacked clauses, over 28 words, more than one subordinate clause.

**Fail looks like:** technically glossed, still unreadable.
**Fix:** cut the word, or split the sentence, or both. `corrections.md` §12, §16.

## 2. Speed — can they get through it without stalling?

A beginner is reading to get somewhere. Thorough reads to them as stalling.

- Does any section take three paragraphs to make a one-paragraph point?
- Is anything explained twice by accident, rather than deliberately at the hard
  part?
- Does the chapter reach its first real idea quickly, or wander first?
- Would a reader on a phone, between other things, finish this?

**Fail looks like:** correct, complete, and abandoned halfway.
**Fix:** cut. Then check nothing load-bearing went with it.

## 3. Welcome — does the page greet them and place them?

- Does it open with a real hello, in a person's voice?
- Does it connect backwards, with a link, to what they just finished?
- Does it say what is coming, in bullets?
- **Does it say why it matters?** This is the half most drafts miss.
- Is the welcome style different from the last four chapters'?
- The opening rule — greet and place, connect backwards, what this one covers,
  why it matters, then a gradual move into the teaching — is in
  `curriculum-state/canon/corrections.md`, "7. Every chapter opens by welcoming
  the reader and showing the shape". Open it before this sweep.

**Fail looks like:** a title, a heading, and straight into the subject.
**Fix:** `corrections.md` §7.

## 4. Why-before-what — do they know why they are learning this?

Sweep for reasons, not just content.

- Before each new idea, does the reader know why it is worth having?
- Does the chapter ever teach something because it is next in the sequence,
  without saying what it unlocks? The why rule behind that check — why it
  matters, for each item or for the set, and the why is not optional — is in
  `curriculum-state/canon/corrections.md`, "7. Every chapter opens by welcoming
  the reader and showing the shape". Open it before this sweep.
- Is the problem shown before the solution?

**Fail looks like:** an accurate explanation of something the reader never asked
for.
**Fix:** problem-first or story-first. `voice.md` commitment 2.

## 5. Dignity — does the reader ever feel stupid?

The one that loses readers permanently and silently.

- Any "just", "simply", "easy", "trivial", "obviously", "as you know"?
- Any term used before it is explained — even once, even in passing?
- Any question the reader is asked to answer before they have footing?
- Any internal vocabulary or rule of the book's own leaking onto the page?
- Any sentence that assumes a machine, a budget, a degree or a background they
  may not have?

**Fail looks like:** a reader concluding the book is not for them.
**Fix:** `mixed-audience.md` §5, `corrections.md` §9.

## 6. Something to picture — is every abstract idea attached to something real?

- Does each abstract idea arrive with an analogy, an example or a short scene?
- Is there one everyday object or situation running through the chapter, that
  the reader can keep returning to?
- Is every example concrete enough to picture — real *or* invented — rather than
  an empty placeholder?
- Where an analogy is used, is it said where it breaks?

**Fail looks like:** a chapter whose only concrete content is names and dates.
**Fix:** `mixed-audience.md` §2, `example-ledger.yaml`.

## 7. Continuity — is anything assumed in silence?

The continuity rule — the original beginner failure, and still the first
thing to get right: nothing skipped, nothing assumed, no leap taken over the
reader's head — is in `curriculum-state/canon/audience.md`, "The reader", under
"What the beginner actually needs". Open it before this sweep.

- Read as someone who knows nothing. Mark every point where you would have to
  already know something. A Stage 1 chapter that assumes a reader already knows
  what a repository is has failed them silently.
- Does every term appear after it is taught, not before?
- Does the chapter depend on a chapter the reader may not have read?
- Do links go where the reader would need them, at the moment they need them?

**Fail looks like:** one silent leap, and everything after it is noise.

## 8. The page itself — does it look like something a person wants to read?

- Bullets, tables, short sections, callouts — or a wall of prose?
- Is bold used on what matters, wherever it falls — and **not** mechanically on
  every paragraph's first sentence?
- Are there visual landmarks often enough that a scrolling reader never sees an
  undifferentiated screen?
- On a phone: any code line over roughly 60 characters, where the language
  allows (the gate warns past 80), any wide table not wrapped in a horizontal scroll
  container, any paragraph over four lines?
- Is total chapter weight under 1.5 MB including images? Every image is a plain
  file in `static/img/`; a page of oversized raster art undermines exactly the
  reader the 150 wpm baseline exists to serve.
- Is it *beautiful*, not merely tidy?

**Fail looks like:** "visually flat".
**Fix:** `curriculum-state/canon/audience.md`, "Formatting is part of the
teaching"; `curriculum-state/canon/corrections.md`, "14. Bold marks what
matters, never the first sentence by rule".

## 9. Payoff — does the reader finish each section holding something?

- Does each section end with the reader able to say something they could not say
  before?
- Does the chapter deliver everything its opening promised — all of it, and in
  that order?
- Does the ending hand them forward, rather than stopping?
- Would they be able to tell a friend what this chapter was about?

**Fail looks like:** a chapter that was read and left nothing behind.

## 10. Tomorrow — will any of it survive the night?

- Is there one clear thing the chapter is *for*, that a reader would still name
  a day later?
- Does the chapter ask them to retrieve something from memory, rather than
  summarising it for them?
- Is the load reasonable — a handful of new ideas, not twenty new nouns?
- Count the proper nouns and the dates. Would a beginner remember any of them,
  and does the chapter need them to?

**Fail looks like:** twenty facts, none retained.
**Fix:** `stations.md` §S10, and `corrections.md` §4 on what stays backstage.

---

## The findings log

Present it with the draft. One row per finding.

| Angle | What was found | What was done |
|---|---|---|

A finding deliberately left is logged with a one-clause reason. An angle that
returned nothing is logged as having returned nothing, so an editor can see the
sweep happened.

## Self-check

- [ ] All ten angles swept separately, over the whole draft
- [ ] Findings log completed and presented with the draft
- [ ] Angle 3 checked the welcome style against the last four chapters
- [ ] Angle 8 checked the draft on a phone-width view, not only on a desktop one
- [ ] Every finding either fixed or logged with a reason
