---
id: 0066
title: Hierarchy finalized and redesign record
stage: plan
date: 2026-09-14
surface: agent
model: claude-sonnet-5
feature: none
branch: none (repo has no version control)
user: afnanzahed@gmail.com
command: none (natural-language request, no slash command)
labels: [curriculum, book-redesign, hierarchy, lesson-classification, documentation]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - C:\Users\Dell\Desktop\Book\curriculum-state\proposals\whole-book-redesign-record-2026-09-14.md (created — full consolidated decision record)
 - C:\Users\Dell\.claude\plans\rosy-stargazing-conway.md (referenced, not modified this turn)
tests:
 - none (planning/documentation session; no chapter, canon, or code files changed)
---

## Prompt

"1. CS50's week is of no use for us, our course is self paced. also, I have finalized the Stage -> Chapter -> lessons and then parts in lesson if ANY like stage -> chapter -> lessons -> parts if any lessons if going to be long or mixed or misorgnazid. otherwise just stage -> Chapter -> Lessons.
2. Hmm, the Concept|Procedure|Practice is good, but I actually want professional wording like the freecodecamp's Theory|Workshop, decent, international level, philosophical and ultra professional yet easy english for beginners, don't copy the freecodecamp ones as they are, because we have to deevlop out own ones because our book/platofrm/course is unique it's in own nature, that's why

Now, document all the things in a new file as a complete detailed record, that we have discussed and relisted in the bullet points when I asked you to do this, and plan the remaining things and move to finalization now"

## Response snapshot

Recorded the owner's final hierarchy decision: `Stage → Chapter → Lesson`, with an optional fourth level `Part` used only when a Lesson is too long, mixed, or disorganized to stay one unit — rejecting CS50's `Week`-based model outright (matching what research had independently concluded, since `Week` is schedule-bound and this course is self-paced), and diverging from the research's own naming suggestion (`Stage → Chapter → Part`) by keeping "Lesson" for the normal third level. Flagged the resulting naming collision this creates with `prerequisite-graph.yaml`'s existing `lessons:` key (which currently means "chapter") as unresolved, tracked for later.

For content-kind classification, recorded that the owner accepted the underlying three-way structure (Concept/Procedure/Practice, from the prior research round) but rejected its plain wording, asking for original, "professional... international level, philosophical... yet easy english" naming inspired by freeCodeCamp's `Theory`/`Workshop` register without copying its actual terms. Proposed three candidate renamings (Foundation/Procedure/Fluency; Grounding/Method/Craft; Bearing/Build/Discipline) for the owner's reaction, none chosen yet.

Wrote a single, comprehensive decision-record document — `curriculum-state/proposals/whole-book-redesign-record-2026-09-14.md` — consolidating everything from the entire redesign discussion to date: origin and scope, standing constraints, every decided item (hierarchy, ordering principle, Stage 0 promotion, Reading & Understanding Literacy checked against the official docs and refined via the Hoare/Parnas research, term/glossary discipline), every open item (classification naming, the Lesson/lessons collision, `01-binary.md`'s deliberately-deferred fate, the bundled ADR question), a condensed archive of all three `command-code-delegation` research threads, a full outstanding punch-list, and a proposed, sequenced finalization roadmap offered for the owner's approval rather than assumed.

## Outcome

- ✅ Impact: The book's content hierarchy is now fully decided (`Stage → Chapter → Lesson → Part if needed`). A single durable record now exists consolidating the entire redesign discussion, reducing the risk of re-litigating settled decisions or losing findings across future sessions. A concrete, sequenced path to finalization has been proposed.
- 🧪 Tests: N/A — no chapter, canon, or code files changed this session; only the new planning-record document was written, per the owner's explicit request and this directory's own non-binding-proposal convention.
- 📁 Files: One new file under `curriculum-state/proposals/`; no `edu-site/` or existing `curriculum-state/canon|ledgers/` files touched yet.
- 🔁 Next prompts: pick a content-kind naming triad; decide the Lesson/`lessons:` collision; answer the bundled ADR question; design the actual Stage 0 chapter/lesson breakdown.
- 🧠 Reflection: The owner's hierarchy decision (keeping "Lesson" rather than adopting the research's "Part" suggestion) reintroduces the same naming collision the research was trying to avoid, just shaped differently — worth flagging precisely rather than assuming the research's naming advice was simply followed. Also worth noting for future work on this project: when research and the owner's own instinct disagree on a naming choice specifically (as opposed to a structural or factual question), the owner's instinct has now overridden research twice in this session (once here, once on "shape" vs. professional wording) — naming/branding questions on this project seem to sit with the owner's judgment more than research can settle, even excellent research.

## Evaluation notes (flywheel)

- Failure modes observed: none this session.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
