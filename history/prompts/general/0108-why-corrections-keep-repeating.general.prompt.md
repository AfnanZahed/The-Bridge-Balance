---
id: 0108
title: Why the same writing mistake keeps repeating, and where corrections are actually stored
stage: misc
date: 2026-09-17
surface: agent
model: claude-sonnet-5
feature: none
branch: main
user: afnanzahed@gmail.com
command: none
labels: ["root-cause", "corrections", "front-door", "canon", "voice-canon", "lesson-spine-authoring", "check-chapter", "recurring-failure"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - curriculum-state/canon/corrections.md
 - curriculum-state/canon/voice.md
 - curriculum-state/README.md
 - CLAUDE.md
 - .claude/skills/lesson-spine-authoring/SKILL.md
 - .claude/skills/lesson-spine-authoring/reference/stations.md
 - edu-site/scripts/check-chapter.mjs
 - history/prompts/general/0108-why-corrections-keep-repeating.general.prompt.md
tests:
 - node scripts/check-chapter.mjs (all chapters) — 0 errors, 5 warnings; 2 are the new opening-not-addressed-to-reader check firing on s1-03 and s1-04, both verified as real by reading the openings rather than assumed to be false positives
 - npm run build — frontmatter, references, chapter gate, manifest, search index, Docusaurus build all green
---

## Prompt

You actually write the intro 2 times, first time, the stupid one, and the second time, correct one. Why you wrote the first one??? because everytime when I ask the AI to write anything in the book, claude or you do the same mistake again and agian what you did firstly in this introduction chapter, why is that???? and how to fix it??

*(Sent twice, verbatim. The first send was interrupted by an AskUserQuestion asking which fixes to land; the owner re-sent the question rather than answering it, which was read correctly as "stop asking, answer and fix it".)*

## Response snapshot

Investigated the recurrence instead of explaining it away, and found a paper trail. This was not the first time — it was the third time, on two different pages.

**The prior instances, from the repo's own PHRs:**

- 14 Sep (PHR 0072) — owner pasted CS50P's and Hugging Face's welcome pages in full: *"Learn all the maximum points from both to design OUR welcome."*
- 14 Sep (`welcome-page-brief-2026-09-14.md`) — that study returned a borrow / adapt / **reject** table, with an explicit *"Neither opening is usable as-is."*
- 15 Sep (PHR 0075) — *"Copy this exact pattern"* with the HF URL → returned a gap analysis of what HF does that this repo's rules forbid.
- 15 Sep (PHR 0076) — owner's verdict on the shipped Welcome opening: *"ULTRA Stupid… making no sense from start, difficult for the beginners to understand, and very very robotic feel."* That session's diagnosis was **exactly right**: *"front-door prose needs its own opening rule, not a bent version of the chapter rule."*
- 17 Sep — the Stage 0 introduction was written, cold-opened on a dated artifact, and rejected with the same complaint.

**The root cause, which is storage, not skill.** The 15 Sep diagnosis was filed at `C:\Users\Dell\.claude\projects\C--Users-Dell-Desktop-Book\memory\feedback-welcome-page-voice-rejected-robotic.md` — **outside this repository**, in one assistant's private memory. It is not in `canon/`, not in `CLAUDE.md`, not read by any validator, and not visible to a session running in a different harness, which this one was. `grep` across the repo finds seven such slugs, all referenced from PHRs, none present as files. Rejection → correct diagnosis → fix filed where the next writer never looks → repeat. Also confirmed by `grep`: the classifier that produced the failure has four lesson shapes and no row for a stage's opening page, so the work rounded to Concept — whose centre of gravity is problem-before-solution, which is why the first line of a welcome was a 1947 logbook.

**The fixes landed:**

1. **`curriculum-state/canon/corrections.md` (new, the centrepiece).** Six corrections recorded with the owner's own words, what went wrong, the rule, and what does *not* count as a fix — plus §6, a table of the seven memory slugs found only outside the repo, each listed with the note *"Until each is transcribed here, assume it does not bind."* `CLAUDE.md` names it required reading and adds a standing rule: a correction is not made until it lives in this repo.
2. **A fifth shape, `FrontDoor`,** in the skill and in `reference/stations.md` §3, with its own station weighting (S0, S5, S9 and S10 dropped), plus the stop rule that would have prevented this outright: **if nothing in the taxonomy fits, stop and ask — never round to the nearest.**
3. **Position-aware canon.** `voice.md` commitment 2 ("Concrete before abstract, always in that order") is now scoped to a teaching body, and the Register section carries the permission that was missing entirely: position, not stage, is the one thing that changes the register, and a front door is the single place where warmth and orientation outrank density.
4. **A new mechanical warning in `check-chapter.mjs`:** a chapter whose first three paragraphs never say "you" gets `opening-not-addressed-to-reader`, pointing at `corrections.md` §1. A warning, not an error, explicitly because a check nobody can act on trains people to ignore warnings.

**Deliberately not done, with the reason.** No attempt to make the gate detect "first page of a stage" and fail on a date or a proper noun there. The script has zero positional awareness today, and the only reliable signal available — `sidebar_position` — is unusable while the old intro-1..5 sequence and the new ladder share the docs root, because intro-1 sits at position 0. A check that misfires on live chapters would be worse than no check; the skill-level rule and the second-person warning cover the same ground without the false-positive risk.

**Verified, not assumed.** The new warning fired on `s1-03` and `s1-04`; both openings were read before concluding anything. Both are genuine ("Twenty-nine students have already signed up…", "The page is the one from the architecture map…") — they open on third-person scenes and reach "you" only later. Left alone deliberately: Stage 1 pedagogical revision is recorded as acknowledged-and-deferred in the redesign record, not scheduled.

## Outcome

- ✅ Impact: the recurrence is now broken at the storage layer rather than patched again at the prose layer. The one correction that mattered most — the one that was made, diagnosed correctly, filed outside the repo, and then re-learned the hard way two days later — is now inside the book, in canon, named as required reading, quoted in the owner's own words, and the mechanism that keeps producing the same failure (a four-shape classifier with no escape hatch) has an escape hatch.
- 🧪 Tests: full `check-chapter` run — 0 errors; the new check's two hits verified by reading both openings rather than trusted. `npm run build` green through all five gates and the Docusaurus build.
- 📁 Files: `corrections.md` created; `voice.md`, `README.md`, `CLAUDE.md`, `SKILL.md`, `stations.md`, `check-chapter.mjs` edited.
- 🔁 Next prompts: transcribe the remaining six memory slugs from §6 into `corrections.md` and delete the external copies — five of them are recoverable only from a Claude Code memory directory. Separately still open from PHR 0107: `ch01` and `ch02` both predate the chapter-boundaries rule and still open directly on their own subject.
- 🧠 Reflection: the owner asked "why is that????" three times across three days and got a correct answer twice without the answer ever being *stored where it could act*. The lesson is not about front doors. It is that on this project the assistant's own memory is not part of the project, and every correction routed there is a correction that will be paid for again.

## Evaluation notes (flywheel)

- Failure modes observed: (1) a rejection was diagnosed correctly and filed outside the repo, so a later session in a different harness repeated it exactly — the same failure occurred on the Welcome page and again on the Stage 0 introduction. (2) A response to a direct, frustrated "why does this keep happening" question was answered first with an AskUserQuestion about scope, which the owner rejected by re-sending the question; the correct read was that a "why" plus "how to fix it" is a request for an answer and a fix, not a menu.
- Graders run and results (PASS/FAIL): `check-frontmatter` PASS; `check-references` PASS; `check-chapter` PASS (0 errors, 5 warnings); Docusaurus build PASS. No grader covers the actual defect class — the failure that prompted this was prose that passed every check.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): after any PHR is written that contains a `## Evaluation notes` "Next experiment" line or a reflection naming a generalizable rule, check whether that rule exists in `canon/` — and if not, move it there in the same session. The PHR field is where these lessons go to die; `corrections.md` is where they go to work.
