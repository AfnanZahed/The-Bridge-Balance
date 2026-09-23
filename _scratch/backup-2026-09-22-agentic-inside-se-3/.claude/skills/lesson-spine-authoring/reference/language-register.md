# Language register

*Governs every sentence in the book, and pairs with `mixed-audience.md`, which governs how each sentence serves a beginner. The authority behind both, and the two decisions this register leaves to the project, are settled in `curriculum-state/canon/audience.md`, "Language — the two decisions canon makes". Open it before drafting.*

> **Revised 2026-09-20.** This file used to describe its reader as "a Pakistani
computer science graduate" who "knows what a mutex is", and told the writer that
"simple English is what you write for a child". Both were wrong for this book's
actual reader and both made plain language feel like a failure. See
`curriculum-state/canon/corrections.md` §12.

**The reader has never programmed.** In Stages 0, 1 and 2 they do not know what
Python is and may not be sure what a terminal is for. They are literate in
English and they are not less intelligent than anyone else — they simply have
none of the context, and no way to tell whether their confusion is the book's
fault or their own.

Most readers of this curriculum are in Pakistan. They studied in English-medium
schools or universities and read English every day. Many read the book from
outside Pakistan, and the book is being written to travel.

This produces one specific rule, and getting it exactly right matters more than
any other language decision in the book.

---

## 1. The rule, stated precisely

**Simplify the sentence and the vocabulary. Never simplify the truth.** The rule is canon's, and the engineering stays true while the vocabulary does not: `curriculum-state/canon/corrections.md` §12, "Simplify the vocabulary, not only the sentence". Open it before simplifying anything.

What that means in practice:

| Keep at full strength | Make plain |
|---|---|
| Accuracy | Sentence structure |
| Depth, nuance, honest uncertainty | Idioms and cultural references |
| The real magnitude, in a form the reader can feel | Ornamental or Latinate word choice |
| Everything the reader needs in order to understand | Long chains of clauses |
| | **Technical vocabulary, wherever a plain word is equally true** |

The rule both columns serve is `curriculum-state/canon/corrections.md` §12, "Simplify the vocabulary, not only the sentence" — the engineering stays true, the vocabulary does not.

Note the last row, which moved sides on 2026-09-20. The old rule kept technical
vocabulary at full strength always, and in Stage 0 that produced *"a switch
built from a sliver of treated germanium, named the way thermistor and varistor
already named devices by the property they controlled"* for a reader who has
never programmed. The sentence a beginner needed was *"they built it from a tiny
piece of crystal, and called it the transistor."*

**Both extremes are failures.** The target is the plain, true, specific middle —
and finding it is the actual work. The balance rule, with both its named
examples, is `curriculum-state/canon/corrections.md` §12, "Simplify the
vocabulary, not only the sentence".

**When is a hard word allowed?** When the reader will meet it again and needs to
own it, or when no plain word is accurate. Then it is taught properly, not
squashed into a gloss. **In Stages 0–2 a hard word must earn its place: if the
idea works without it, it goes.** A hard word that stays, technical or ordinary, is explained inline and linked to the glossary (`audience.md`, *Hard English words are handled like technical terms*; `corrections.md` §27).

Which words may appear at all is decided by `curriculum-state/canon/corrections.md` §12, "Simplify the vocabulary, not only the sentence". The engineering phrases that must never be frozen into a beginner's chapter are named in `curriculum-state/canon/thesis.md`, "The safety floor".

**Plain English is not baby English.** It is the same thinking, said in words the
reader already has. Writing plainly for a beginner is the whole job; why it is
not condescension, and the failure this book does not forgive, are in
`curriculum-state/canon/corrections.md` §13, "Warmth, enthusiasm and emphasis
belong everywhere", and `curriculum-state/canon/audience.md`, "Where they read,
and what each condition obliges".

---

## 2. Sentence mechanics

Concrete targets, not vibes.

- **Average sentence: 15 to 18 words.** Hard ceiling around 28. When a sentence passes 28 words, it almost always contains two sentences.
- **One idea per sentence.** If you can put a full stop in the middle and both halves still work, put the full stop in.
- **Active voice by default.** "The agent writes to a branch," not "a branch is written to by the agent." Passive is fine when the actor genuinely does not matter.
- **Keep the subject and its verb close together.** Long interruptions between them are the single biggest cause of a sentence that has to be re-read — the test it fails is `curriculum-state/canon/corrections.md` §16, "Every sentence must make plain sense on the first read".
- **One subordinate clause per sentence, at most.**
- **No stacked nouns.** *Agent permission boundary configuration file* is five nouns in a row and unreadable. Three is the limit; two is better. A stack like that fails the test in `curriculum-state/canon/corrections.md` §16, "Every sentence must make plain sense on the first read".
- **Simple tenses.** Present and simple past carry almost everything. Avoid past perfect continuous, and avoid inverted conditionals — *had it not been for*, *were it to fail*, *should you wish to*. Write *if it fails*.
- **No double negatives.** "It is not uncommon for this not to work" is a puzzle. Write "this often fails."
- **Do not open a sentence with a long participial phrase.** "Having established the boundary and confirmed the permissions, the agent then…" — start with the subject instead. That opening fails the test in `curriculum-state/canon/corrections.md` §16, "Every sentence must make plain sense on the first read".

---

## 3. What to cut

### Idioms

These are the largest single source of unnecessary difficulty, because a reader cannot work them out from the words. There is no rule for them; they must be memorised. Do not make the reader memorise anything that isn't engineering.

| Cut | Write instead |
|---|---|
| ballpark figure | rough estimate |
| silver bullet | a single fix for everything |
| low-hanging fruit | the easy wins |
| move the needle | make a real difference |
| boil the ocean | try to do everything at once |
| rule of thumb | a rough rule |
| bread and butter | main work |
| hit the ground running | start quickly |
| circle back / touch base | come back to it / talk again |
| the elephant in the room | the obvious problem nobody mentions |
| bite the bullet | accept the cost |
| a stone's throw | very close |

**Sports idioms are the worst offenders.** *Home run, curveball, out of left field, slam dunk, par for the course, own goal, Monday morning quarterback* — these come from American baseball, basketball, and golf. Cricket idioms would land in Pakistan and nowhere else. Avoid sports metaphors entirely; there is always a plain alternative.

### Phrasal verbs that cannot be guessed

Some phrasal verbs are transparent and universal — *log in*, *set up*, *turn on*, *shut down*, *figure out*, *find out*. Keep those.

Cut the ones whose meaning has nothing to do with their parts: *pan out, chalk up, brush off, iron out, hash out, flesh out, gloss over, bank on, bear out, wind up, pull off, carry over, knock out*.

| Cut | Write instead |
|---|---|
| it didn't pan out | it didn't work |
| iron out the problems | fix the problems |
| flesh out the design | add detail to the design |
| gloss over the risk | skip past the risk |
| bank on it | rely on it |

### Latinate padding

A long word with a short equivalent costs the reader time and buys nothing — the rule behind the list is `curriculum-state/canon/corrections.md` §12, "Simplify the vocabulary, not only the sentence": the simplest accurate word comes first.

utilize → **use** · commence → **start** · terminate → **end** · endeavour → **try** · prior to → **before** · subsequent to → **after** · in the event that → **if** · facilitate → **help** · leverage → **use** · myriad → **many** · albeit → **although** · notwithstanding → **despite** · eschew → **avoid** · salient → **main** · germane → **relevant** · heretofore → **until now** · a number of → **several**

### Cultural references that do not travel

Avoid anything that assumes a particular country's daily life: *401(k), the DMV, Thanksgiving, sophomore year, drive-thru, Black Friday, IRS, the Super Bowl*.

Also avoid examples built on alcohol, pork, gambling, or dating. *A bar tab, a wine cellar, betting the house, doubling down, a dating app matching algorithm* — these are common in Western technical writing and they will not land with much of this readership. There is always another example. Choose it without comment; do not announce the choice.

### Tone

- **No sarcasm and no irony.** Both depend on the reader detecting that you mean the opposite of what you wrote. In a second language, that signal is often lost.
- **No British understatement.** "Not entirely ideal" means "bad." Write "bad."
- **No jokes that depend on wordplay.** Warmth is welcome; puns are not.

---

## 4. Anchors and examples

Station 1 (`stations.md` §S1) asks for something the reader already understands. Three tiers, in order of preference. **Examples are Pakistani-first** (`audience.md`): the reader is Pakistani first, so the first place to look is their own daily life.

**Tier 1 — Pakistani and everyday.** Grounded in Pakistan and clear from the sentence around it: a bank queue and its token number, a load-shedding schedule, a wedding hall booking, an Easypaisa or JazzCash transfer, a courier tracking number, a university merit list, a rickshaw fare agreed before the ride, a cricket score.

These are the first choice. Use them freely. The test is that a reader in Toronto still follows the point even if they have never seen a load-shedding schedule — the surrounding sentence should carry enough context.

**Tier 2 — universal.** Works for every reader on earth, needs no explanation: a queue, a kitchen during a rush, a key and a lock, a letter you can still recall before it is posted, a map, a receipt, a checklist, a fire door, a spare tyre. Use one when no Pakistani example fits the idea better.

**Tier 3 — avoid.** Anything needing local knowledge the sentence does not supply, and anything from §3's cultural list.

Examples follow `SKILL.md` step 7: concrete, not necessarily real, never a placeholder. Where an example does name a real tool, company, incident or number, that claim is checked like any other (`SKILL.md`, the fifth hard constraint).

**An analogy is good when it makes the idea stick harder, and bad when it is clever but makes the reader translate back.** If the reader has to convert the image into the real point before it teaches them anything, the analogy has failed.

---

## 5. Conventions

**Spelling.** British spelling throughout (*colour, organisation, analyse, behaviour*): it is the norm in Pakistani education and already the majority usage in `docs/`, and `audience.md` decides it. Mixed spelling is a defect. Code, commands, and tool names always keep their own spelling — `color: red` stays `color` even in a British-spelling book.

**Numbers.** Use international units — million, billion. Do not use *lakh* or *crore* in English prose, even though readers know them, because a large part of the readership is outside South Asia and the book's technical figures come from international sources.

**Currency.** Give figures in USD, since that is how tools are priced. Add a PKR figure only when the reader is making a real purchase decision, and date it, because the rate moves.

**Dates.** Write *6 September 2026*, never *09/06/2026*. The numeric form means two different dates depending on the reader's country.

**Time.** Use a 24-hour clock or spell out am/pm. Avoid *quarter past* and *half seven*.

**English only.** No Urdu, anywhere — the permission to gloss a hard term with a single Urdu word was removed on 2026-09-20. A hard term is fixed with a simpler English sentence, not a second language: plain English carries every idea in this book. It is being written for an international market as well as a Pakistani one, and a bilingual habit established now would have to be unpicked across thousands of paragraphs later.

**Formatting floor.** Three rules hold on every page:

- **Link text describes the destination** — no naked URLs, no "click here", no "read more".
- **Every table has real header cells.**
- **Never encode meaning in colour alone.**

---

## 6. Humanised prose — the anti-slop rule

Everything above removes difficulty. This removes **cadence** — the particular rhythm that makes a page read as though nobody actually wrote it.

**The requirement: every sentence reads as though a specific person wrote it, on purpose, for this reader, on this page.** That voice is context-aware, humanised and emotionally intelligent, and the reader has to feel spoken to, not processed. A chapter can be accurate, fully glossed, register-clean and still fail here. Readers who notice do not complain; they close the tab and decide the book is machine-made. That judgment is almost impossible to reverse, so it is cheaper to never earn it.

**This is a different problem from §3.** §3 cuts difficulty the reader has to fight. This cuts *sameness* the reader has to endure. A paragraph can be perfectly plain and still be slop.

### The tics, named

Machine cadence is not a vague feeling. It is a short list of specific moves, and it is caught by looking for them one at a time.

| Tic | What it looks like | Why it fails |
|---|---|---|
| **The dramatic fragment** | "Both are wrong." "That's the point." "Not anymore." | A two-word sentence carrying weight it did not earn. One in a chapter is a choice. Three is a fingerprint. |
| **The false pivot** | "It's not X — it's Y." "Not a split. A discipline." | Manufactures a contrast the reader never proposed, then resolves it. |
| **The answered rhetorical question** | "So what does this mean? It means…" | Asks a question the reader did not have, to justify the sentence after it. A real question the chapter then answers is fine. |
| **The triad** | Three items, three clauses, three examples, everywhere | Real lists are rarely three long. Repeated threes are rhythm imposed on content. |
| **The em-dash aside in every paragraph** | "The agent — which runs in a loop — writes…" | One is punctuation. Five is a verbal tic the reader starts hearing. |
| **The portentous closer** | A short weighty line at the end of a section | The chapter closes on retrieval. Nothing else earns that position. |
| **Signposting** | "Let's break this down." "Here's the thing." "The truth is…" | Announces thinking instead of doing it. |
| **The riddle opening** | Asking the reader to guess, then telling them they guessed wrong | Rejected twice by the owner — the rule is `curriculum-state/canon/corrections.md` §1, "A front door is not a chapter". |
| **A sentence that needs a second read** | "Everything in this book runs on a machine that can hold a number and act on an instruction. Neither of those was obvious, and neither arrived first." | An abstract pronoun standing in for something the reader has not been given yet. The test it fails is `curriculum-state/canon/corrections.md` §16, "Every sentence must make plain sense on the first read" — it outranks specificity, elegance and concision. Open it before shipping a sentence. |
| **A rule explained to the reader** | "Every technical word is defined where you first meet it, in every chapter…" | The reader never learns how the book is built — internal vocabulary stays internal. The rule is `curriculum-state/canon/corrections.md` §9, "Never explain the book's internal rules or internal names to the reader". Open it before writing a sentence about the book itself. |
| **Stacked metaphor** | A second image arriving before the first has landed | Two half-seen pictures are worse than one clear one — the rule is `curriculum-state/canon/corrections.md` §1, "A front door is not a chapter". |
| **Symmetry everywhere** | Every paragraph the same length, every sentence the same shape | Human writing is uneven because thinking is uneven. |
| **Bold assigned by position** | Paragraph after paragraph opening on a bolded sentence, by convention rather than by meaning | Bold marks what matters. Assigned to every paragraph's first sentence it marks nothing. **Bold itself is wanted, and wanted often** — what earns it, and where in the paragraph it may fall, is `curriculum-state/canon/corrections.md` §14, "Bold marks what matters, never the first sentence by rule". Open it before bolding anything. |

### What "humanised" actually requires

Naming the tics is only half of it. Removing them leaves prose that is clean and still lifeless. The other half is positive and has to be written in deliberately:

- **Uneven rhythm.** A four-word sentence next to a twenty-four-word one. Read the paragraph aloud; if the beat never changes, the paragraph is not finished.
- **One specific detail no summary would keep.** The actual error message. The thing that happened at 2 a.m. The detail of a scene the reader can picture.

  **Not a date, a full name and an institution.** This bullet was read as a licence for citation apparatus, and it is a main reason Stage 0 chapters filled with dated proper nouns. The human signal is a *concrete picture*, not a footnote — and an invented everyday example carries it just as well as a historical one. `corrections.md` §4 and §11.
- **Willingness to be plain and unclever.** The plainest true sentence beats a clever one almost every time. Reach for the clever one only when it is *also* the clearest.
- **A real position.** Say which way you would go and why. Balanced non-answers are the most reliable marker of text with no author. A chapter with no opinion in it is a reference page, and the position is held warmly — a position is not a lecture.
- **Real warmth.** Address the reader directly, tell them when something is hard, tell them when they have already understood the difficult part. Encouragement is allowed. Enthusiasm is allowed. **Exclamation marks are allowed** where a real person would use one (in prose, never in a title or heading: `naming.md`), and so are decent, professional emoji, allowed where they make a page clearer or more inviting — a section marker, a callout header, a checklist. Never the AI-slop set: 🚀 is the clearest tell, along with the rest of the launch/sparkle/fire family. If an emoji looks like it came from a generated landing page, it is the wrong emoji. The old ban on both as "performed enthusiasm" is withdrawn — `curriculum-state/canon/corrections.md` §13, "Warmth, enthusiasm and emphasis belong everywhere", and `curriculum-state/canon/voice.md`, "Enthusiasm, exclamation marks and emoji". Open both before cutting warmth for sounding too soft.
- **A mark from a professional icon set beats an emoji** wherever the platform supports one.
- **Say hello, and say why.** Every chapter opens by welcoming the reader and showing what is coming and why it matters. No opening phrase is banned. `corrections.md` §7.

**Ultra-creative does not mean ornamental.** The creativity goes into finding the anchor that makes an abstract thing land, the example nobody else would have chosen, the order that makes a hard idea feel inevitable. It never goes into the sentence's decoration. A page that is inventive about *explanation* and plain about *wording* is the target; the reverse is exactly the slop this rule exists to stop.

### The read-aloud test

Read the draft aloud, or subvocalise it at speaking pace. Three things surface immediately and by no other method:

1. **Where you run out of breath** — the sentence is too long, whatever the word count said.
2. **Where the beat repeats** — the rhythm has flattened into a pattern.
3. **Where you would not say it this way to a person sitting next to you** — that sentence is written *at* the reader rather than to them. Rewrite it as you would say it, then fix the grammar.

Any sentence that fails the third test gets rewritten, not softened.

**For The Bridge Balance:** `curriculum-state/canon/voice.md` carries a banned-phrase table covering the word-level tells — the openers, the filler constructions, and the specific vocabulary that marks generated text. It binds on top of this section, and neither list substitutes for the other: voice.md catches the words, this section catches the rhythm.

---

## 7. What this is not

**This is not broken English.** Grammar stays correct. Sentences stay complete. The book should read as though written by someone who knows the language well and chose clarity, because it was.

**This is not condescension.** Never write down to the reader. Every rule in this file is about removing obstacles between a capable reader and hard material, not about reducing the hardness of the material.

**This is never announced.** No "written in simple English for our readers," no note about language level. A note about how the book was written is not teaching, so there is no reason to add one. *(The reason once given here — that it is an audience label, and audience labels are banned — is withdrawn. Audience labels are allowed and often right: “if you have never programmed, nothing here assumes you have” is a good sentence. `corrections.md` §13, `mixed-audience.md` §5.)*

**This does not license vagueness.** Plain words, precise claims. The balance rule is `curriculum-state/canon/corrections.md` §12, "Simplify the vocabulary, not only the sentence" — prose too vague to teach anything and prose too dense to read are both failures. "It uses a lot of memory" is plain and useless. "It holds the whole file in memory, so a 2 GB log file needs 2 GB of RAM" is plain and exact. Always choose the second.

---

## 8. Self-check

- [ ] Average sentence length is roughly 15 to 18 words; nothing runs past 28
- [ ] Zero idioms — checked specifically for sports metaphors
- [ ] Zero phrasal verbs whose meaning cannot be guessed from the parts
- [ ] Zero Latinate words with a short plain equivalent
- [ ] Zero country-specific cultural references; no alcohol, pork, gambling, or dating examples
- [ ] Zero sarcasm, irony, or understatement
- [ ] No stacked nouns beyond three
- [ ] Anchors are Tier 1 or Tier 2, and a reader outside Pakistan still follows the point
- [ ] Spelling convention consistent throughout
- [ ] Dates written out; currency dated; international number units
- [ ] Technical vocabulary and technical depth untouched — only the sentences were made plain
- [ ] No note anywhere telling the reader the English has been adjusted
- [ ] Checked for each named tic in §6 by name — fragments, false pivots, answered rhetorical questions, triads, em-dash asides, portentous closers, signposting, riddle openings, stacked metaphor, flat symmetry
- [ ] Sentence rhythm is uneven; the paragraph does not keep one beat
- [ ] At least one specific detail per section that a summary would have dropped
- [ ] Read aloud end to end; every sentence you would not say to a person sitting next to you was rewritten
