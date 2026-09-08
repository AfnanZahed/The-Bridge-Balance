# Language register

*Governs every sentence in the book. Pairs with `mixed-audience.md`, which governs which reader each sentence serves.*

The reader is fluent in English. English is usually not their first language.

Most readers of this curriculum are in Pakistan. They studied in English-medium schools or universities, they read technical documentation in English every day, and they think in Urdu, Punjabi, Pashto, Sindhi, Saraiki, or Balochi. Many read the book from outside Pakistan.

This produces one specific rule, and getting it exactly right matters more than any other language decision in the book.

---

## 1. The rule, stated precisely

**Simplify the sentences. Never simplify the engineering.**

The reader is not less capable. They are reading in a second or third language. Those are completely different problems, and confusing them insults a reader who can already read a linker error faster than most people read a menu.

What that means in practice:

| Keep at full strength | Make plain |
|---|---|
| Technical vocabulary — *idempotent*, *polymorphism*, *blast radius*, *reconciliation loop* | Sentence structure |
| Real numbers, real incidents, real trade-offs | Idioms and cultural references |
| Depth, nuance, honest uncertainty | Ornamental or Latinate word choice |
| Named disagreements and open problems | Long chains of clauses |

A Pakistani computer science graduate knows what a mutex is. What slows them down is a thirty-five word sentence with three subordinate clauses, or an idiom borrowed from American baseball. Fix the second. Never touch the first.

**Plain English is not simple English.** Simple English is what you write for a child. Plain English is what you write for a professional who is busy, reading in a second language, and deserves not to have their attention wasted on decoding your sentence structure.

---

## 2. Sentence mechanics

Concrete targets, not vibes.

- **Average sentence: 15 to 18 words.** Hard ceiling around 28. When a sentence passes 28 words, it almost always contains two sentences.
- **One idea per sentence.** If you can put a full stop in the middle and both halves still work, put the full stop in.
- **Active voice by default.** "The agent writes to a branch," not "a branch is written to by the agent." Passive is fine when the actor genuinely does not matter.
- **Keep the subject and its verb close together.** Long interruptions between them are the single biggest cause of a sentence that has to be re-read.
- **One subordinate clause per sentence, at most.**
- **No stacked nouns.** *Agent permission boundary configuration file* is five nouns in a row and unreadable. Three is the limit; two is better.
- **Simple tenses.** Present and simple past carry almost everything. Avoid past perfect continuous, and avoid inverted conditionals — *had it not been for*, *were it to fail*, *should you wish to*. Write *if it fails*.
- **No double negatives.** "It is not uncommon for this not to work" is a puzzle. Write "this often fails."
- **Do not open a sentence with a long participial phrase.** "Having established the boundary and confirmed the permissions, the agent then…" — start with the subject instead.

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

A long word with a short equivalent costs the reader time and buys nothing.

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

Station 1 (`stations.md` §S1) asks for something the reader already understands. Three tiers, in order of preference.

**Tier 1 — universal.** Works for every reader on earth, needs no explanation: a queue, a kitchen during a rush, a key and a lock, a letter you can still recall before it is posted, a map, a receipt, a checklist, a fire door, a spare tyre.

**Tier 2 — local and legible.** Grounded in Pakistan and still understandable to an outsider from context: a bank queue and its token number, a load-shedding schedule, a wedding hall booking, an Easypaisa or JazzCash transfer, a courier tracking number, a university merit list, a rickshaw fare agreed before the ride.

These are good anchors. Use them freely. The test is that a reader in Toronto still follows the point even if they have never seen a load-shedding schedule — the surrounding sentence should carry enough context.

**Tier 3 — avoid.** Anything needing local knowledge the sentence does not supply, and anything from §3's cultural list.

Technical examples stay real and named, as always: real tools, real companies, real incidents, real numbers. That rule does not change here.

---

## 5. Conventions

**Spelling.** Pick one convention and hold it across the whole book. British spelling (*colour, organisation, analyse*) is the norm in Pakistani education. American spelling is the norm in technical documentation. Either is defensible; mixing them is not. Code, commands, and tool names always keep their own spelling — `color: red` stays `color` even in a British-spelling book.

**Numbers.** Use international units — million, billion. Do not use *lakh* or *crore* in English prose, even though readers know them, because a large part of the readership is outside South Asia and the book's technical figures come from international sources.

**Currency.** Give figures in USD, since that is how tools are priced. Add a PKR figure only when the reader is making a real purchase decision, and date it, because the rate moves.

**Dates.** Write *6 September 2026*, never *09/06/2026*. The numeric form means two different dates depending on the reader's country.

**Time.** Use a 24-hour clock or spell out am/pm. Avoid *quarter past* and *half seven*.

---

## 6. What this is not

**This is not broken English.** Grammar stays correct. Sentences stay complete. The book should read as though written by someone who knows the language well and chose clarity, because it was.

**This is not condescension.** Never write down to the reader. Every rule in this file is about removing obstacles between a capable reader and hard material, not about reducing the hardness of the material.

**This is never announced.** No "written in simple English for our readers," no note about language level. That is an audience label, and audience labels are banned everywhere in this curriculum for the same reason: they tell a reader which parts of the book were not written for them. See `mixed-audience.md` §5.

**This does not license vagueness.** Plain words, precise claims. "It uses a lot of memory" is plain and useless. "It holds the whole file in memory, so a 2 GB log file needs 2 GB of RAM" is plain and exact. Always choose the second.

---

## 7. Self-check

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
