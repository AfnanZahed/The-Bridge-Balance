# Canon — corrections

*Standing rules the owner has already had to give more than once. Every entry is a mistake that was made, diagnosed, and then made again.*

**Why this file exists.** On 15 September 2026 a session diagnosed, correctly and in writing, that *"front-door prose needs its own opening rule, not a bent version of the chapter rule."* It filed that finding in an assistant's private memory directory, outside this repository. Two days later a different session, in a different tool, wrote the Stage 0 introduction and made the identical mistake — because nothing it loaded had ever heard the correction. **A correction that does not live in this repository has not been made.**

**The rule that keeps this file alive.** When the owner rejects something and says why, the reason is appended here before the task is called finished, in the owner's own words where those words are the point. `CLAUDE.md` names this file as required reading for any content task. Nothing here is optional and nothing here is superseded by a later preference for a different approach — if a later decision contradicts an entry, get the entry changed rather than working around it.

**On the entries below:** they were reconstructed from the Prompt History Records in `history/prompts/general/`, which is the only part of the record that lives inside this repository. The original memory files are listed in §6 and are not reachable from here. Where a correction's full wording cannot be recovered from the repo, that is said rather than guessed at.

---

## 1. A front door is not a chapter

**Corrected:** 15 September 2026, on the Welcome page. Repeated 17 September 2026, on the Stage 0 introduction.

**Owner's words, 15 September:** *"The welcome written text is ULTRA Stupid… making no sense from start, difficult for the beginners to understand, and very very robotic feel."*

**Owner's words, 17 September:** *"you coldly started with difficult names, dates, references etc very stupidly. Just copy the hugging face's lesson and just put OUR values in that."*

**What went wrong, twice.** A page whose whole job is to be the first thing a stranger meets was written in the register of a teaching chapter: opening on a concrete artifact, a date and a proper noun, and building an argument before saying what the page is for. Both drafts passed every mechanical check this repository has — the gate was clean, the terms were glossed, the ledgers were correct. **The mechanical checks do not test whether prose lands, and neither does the ten-angle comprehension audit when the wrong object was written in the first place.**

**The rule.**

- A stage's opening page, and the first screenful of any page a reader meets before they are committed, **says directly what this is and what it does for the reader.** No artifact-first opening. No dated object as the first thing on the page.
- **No riddle, no guess-the-word device, no stacked metaphor.** A question the reader is asked to answer before they have any footing is a quiz, not a welcome. Metaphor is allowed only once the reader has somewhere to hang it.
- **Warmth and orientation outrank density at a front door.** This is a permission that exists nowhere else in the canon, and its absence is what produced both rejected drafts. Density is the house register for teaching material and it is the wrong register for a door.
- **Short is correct here.** A front door that runs long has imported a chapter's job into a page that does not have one.

**The page skeleton.** Ten slots, in this order. `edu-site/docs/ch00-introduction.md` is the worked example and the register to match.

1. Greeting and the promise — one sentence, the promise in bold, leading straight into the outline.
2. What the stage covers, as a grouped bullet outline. Groups rather than a flat list, and never a chapter count.
3. What the reader will be able to do at the end, and what the stage does not ask of them.
4. What the stage uses as its worked object.
5. Practical honesty — no quiz, no certificate here, and where the real credentials actually are.
6. The one real risk, named plainly, carrying the two-extremes invariant without arguing it.
7. The safety-floor callout, exact fixed form.
8. Why this stage comes first and why it is ordered as it is — short, and late, not first.
9. How to read it: order, pace, coming back.
10. One call to action, last, naming the first chapter and what it opens on.

**Register rules the slots do not carry.**

- **No dated artifact, proper noun or citation anywhere on a front door** — not only in the opening. The accepted page contains none. This is stricter than §4, and it is the specific thing both rejected drafts got wrong.
- **Bullets and tables carry the density; paragraphs run one to three sentences.** The owner's instruction: *"avoid lengthy paragraphs, instead use tables, bullet points or other beauty and attractive pretexts."*
- **One call to action, at the true end, once.** An early "start reading now" was called *"a very bad move"*. A call to action placed before the page has made its case is a release valve, not a door.
- **Where a front door states the platform's own what and why, ground it in `The Bridge Balance/Official docs/`** — `problem_statement.md` and `solution_statement.md`. These are pre-approved shared source material under `CLAUDE.md`'s carve-out, and are not subject to the research-and-comparison transformation rule.
- **Merge sections that answer one underlying question** into one section with subheadings, rather than several top-level headings each answering a fragment of it.
- **A guess-the-word device stays off a front door entirely, not merely out of the opening.** The objection is the device's performative feel, not its position, so moving it lower down the page does not fix it. Register 4's invert-the-question mechanism — why is it called that when it is not that, with no staged guess and no reveal beat — is the permitted substitute.

**What is not a fix.** Copying the warmth and leaving the structure. The second draft of the Stage 0 introduction was rebuilt on the supplied reference's own skeleton, slot for slot, and that is the standard — see §2.

## 2. A supplied reference is a skeleton to fill, not a pattern to filter

**Corrected:** 14–17 September 2026, across the Welcome page and the Stage 0 introduction.

Three times the owner supplied a reference and asked for it to be learned from:

- 14 September — CS50P's and Hugging Face's welcome pages pasted in full: *"Learn all the maximum points from both to design OUR welcome."*
- 15 September — *"Copy this exact pattern"*, with the Hugging Face URL.
- 17 September — *"just copy the hugging face's lesson and just put OUR values in that."*

Three times what came back was a gap analysis: a borrow / adapt / **reject** table, or a list of what the reference does that this repository's rules forbid.

**The rule.**

- **Map the reference's slots to our content first, and write the mapping down, before any prose is drafted.** One line per slot: what the reference does there, what ours does there. A ten-line mapping can be rejected in seconds; a finished draft cannot.
- **A slot with nothing real to put in it is answered honestly, not skipped.** The Stage 0 introduction is the worked example — the reference's quiz-and-certificate beat became a plain statement that there is no quiz and no certificate here, and where the real credentials actually are.
- **Conflicts are resolved at the slot, never by discarding the structure.** Canon may forbid a reference's *device*; that is not a licence to return something that does not resemble the reference at all.
- **Do not accumulate a rejection list.** After two rounds of filtering, this repository's own record of the Hugging Face pages was a list of things not to do, and the next session read that as "the reference is a problem to be managed" rather than "the reference is a shape to fill". That is the documented cause of the 17 September failure, and it is why the successful mapping is recorded in full in `prerequisite-graph.yaml`.

## 3. "Remove" means delete, never reword

**Corrected:** 15 September 2026, after an earlier session reworded a paragraph the owner had asked to be removed.

**Owner's words:** *"FINISH FINISH FINISH AND DELTE DELETE AND EXCLUDE EXCLDEU EXCLUDE ALL THESE PRAGRAPHS FROM ALL THE, ALL THE, ALLL THE ALLL ALL ALL ALL ALL THE CHAPTERS FOR FOREVER."*

**What went wrong.** The request was read as a phrasing problem and answered with a reworded sentence. It was a request to delete a rendered element — a grey paragraph under every chapter title, a site-wide CSS slot — and to delete it everywhere. **Checking what actually renders before rewriting what was quoted would have shown that in one step.**

**The rule.** Remove, delete and exclude are instructions to take something out, not to improve it. Delete it, everywhere it appears, and say what was deleted. If part of it is genuinely load-bearing, name that part and ask — never silently reword it into a form you prefer.

## 4. Historical material stays light in reader-facing prose

**Corrected:** 16 September 2026, during the Stage 0 shape decisions.

The research backing a Stage 0 chapter is rigorous — dated, sourced, disputes flagged. **The chapter is not.** Reader-facing prose carries the story and the reason; the citations, the disputed-date armoury and the institutional detail stay backstage in the dossiers and the ledgers. A reader meeting the book for the first time should never feel they have opened an academic paper.

**This is not in tension with §1** — a front door is not the only place this binds. It applies to every chapter.

**Why this rule lost an argument it was not present for.** `ch01-foundations.md` shipped with roughly twenty dated proper nouns in sixty-seven lines. Five rules inside `lesson-spine-authoring` pull toward exactly that — Principle 7's "real dates", S2's "state the date of the information", S7's "date every figure and name its source", S9's originating work, and `canon/thesis.md`'s "every statistic carries its year inline" — and this file was not in that skill's reading list, so nothing represented the other side. Both halves are now wired: `stations.md` §2 carries a scope note saying this entry outranks S2, S7 and S9 for Stage 0 to 2 material, and the skill lists this file as required reading.

**The measurable form.** A date earns its place by being load-bearing to the point in the sentence that carries it, and a name earns its place the same way. Where the story works without the year, the year is furniture.

## 5. A real seam becomes a split, not a longer page

**Corrected:** 16 September 2026, in the owner's own framing: more lessons and parts read as more professional, and a genuine structural seam should be taken.

**The rule.** Where a chapter's material has an honest seam, it becomes a Lesson or Part rather than one long page. Do not compress two subjects into one file to keep a count down, and do not invent a seam that is not there.

## 6. Corrections known to exist outside this repository

Found by reference in the PHRs, written to an assistant's private memory directory, and **not currently readable from inside this repo**. Listed so they can be recovered and moved in rather than re-learned:

| Memory (no extension on purpose) | Referenced by | What it holds |
|---|---|---|
| `feedback-welcome-page-voice-rejected-robotic` | PHR 0076 | §1 above. The one that mattered most, and the reason this file exists. |
| `feedback-no-paragraph-under-chapter-title` | PHR 0082 | §3 above, including that "remove" means delete |
| `feedback-stage0-history-light-register` | PHR 0097 | §4 above |
| `feedback-prefer-finer-lesson-part-granularity` | PHR 0097 | §5 above |
| `feedback-thorough-planning-before-writing` | PHR 0064 | Plan before drafting; never write from a standing start |
| `feedback-claude-plans-deepseek-executes` | PHR 0069 | Which model does which job on this project |
| `feedback-subagent-model-choice` | PHR 0070 | Sub-agent model selection |
| `feedback-front-door-tables-over-prose` | PHR 0080 | **Transcribed 17 September 2026** into §1's register rules: bullets over paragraphs, one call to action held to the end, ground the platform's what and why in `Official docs/`, merge sections answering one question |
| `welcome-page-lesson-spine-revision` | PHR 0082 | **Transcribed 17 September 2026** into §1: a guess-the-word device stays off a front door entirely, not merely out of the opening |

**Until each is transcribed here, assume it does not bind.** That is not a preference; it is what happened.

## 7. A chapter opens with orientation, not with its own subject

**Corrected:** 17 September 2026, on `ch01-foundations.md`, after the same complaint had already been made about the Welcome page and the Stage 0 introduction.

**Owner's words:** *"starting very coldly, like ch01-foundations, no context, no base making, no context, no high hello, no starting gradully, no in this chapter we will learn x, no natural start AT ALL, just vibe coded robotic tone everytime."*

**What went wrong.** `ch01-foundations.md` shipped `text-ready` opening like this: the h1, then a section heading, then a traffic light. No orientation of any kind. The rule against this already existed — `lesson-spine-authoring/SKILL.md`'s sixth hard constraint says in its own words that *"a lesson that opens directly on its own subject … has skipped the step that makes the subject land"* — and the chapter broke it anyway, because nothing checks it and the sibling chapter that got it right (`ch02`) made the inconsistency invisible.

**The rule.** Before any teaching, every chapter carries a short orientation, in this order:

1. **Why this subject arrives now** — one or two sentences: what the previous chapter left unresolved, or what the reader already holds that this builds on.
2. **What the chapter covers**, as a few grouped bullets. Not a table of contents of its headings — the two or three real moves, each with the question it answers.
3. **What the reader will hold at the end**, and the gap it deliberately leaves for the next chapter.

Then the first section heading, and the teaching starts.

**This is orientation, not a preview.** "In this chapter we will explore…" stays banned. The difference is that a preview announces a chapter is beginning, while an orientation shows its shape — and a reader who cannot see the shape before the teaching starts has to assemble it from the inside while also learning it.

**Size.** Three slots, under roughly 120 words, then out of the way. `edu-site/docs/ch00-introduction.md` does the same job at stage scale and is the register to match; a chapter's version is shorter.

**What is not a fix.** A single sentence of narrative connection. `ch02` opens with *"The last chapter ended with a machine that could hold its own instructions in memory"*, which satisfies the sixth hard constraint's backwards half and still leaves the reader with no idea what the chapter covers or where it ends.

---

**Adding an entry.** Append a new `##` section with: what was corrected and when, the owner's own words, what went wrong, the rule, and what does not count as a fix. Keep it short and keep it specific. An entry nobody can act on is not a correction.
