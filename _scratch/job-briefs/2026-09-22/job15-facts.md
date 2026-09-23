# The decisions and changes of 21 and 22 September 2026

Taken only from: prompt records dated 2026-09-21 and 2026-09-22 in `history/prompts/**`; `curriculum-state/canon/course-structure.md`; the "Agentic AI inside SE" section of `curriculum-state/canon/thesis.md`; `history/adr/0010-agentic-ai-inside-se.md`; `edu-site/docs/changelog.md`; `edu-site/docs/welcome.md`; `_scratch/job-briefs/2026-09-22/agenda/index.html` ("Done today", "Parked on purpose").

One line each. `S` = Student-relevant. `I` = Internal.

## 21 September 2026

### Decisions

1. **S** One reader: a beginner who starts from zero, taken to expert level. "Beginner" names where the reader starts, and says nothing about how far the book goes. There is no separate senior or experienced reader in any stage. Source: `course-structure.md` CS-1, CS-2. (Owner, 21 Sep. Prompt record 0125.)
2. **S** Names are learning-first: a stage or course name says what is learned, never who the reader is and never how hard it is. Source: `course-structure.md` CS-3.
3. **S** Learner-level labels (Beginner, Intermediate, Advanced) are allowed on the chapters and sub-chapters of a subject, and are not used in stage or course names. Source: `course-structure.md` CS-4.
4. **I** A wrong statement in the same canon file, that a ban on audience labels was still in force, was corrected. The ban was withdrawn on 20 September. Source: `course-structure.md` section 4; `agenda/index.html` "Done today" item 21.
5. **S** Stage 0 will be named "Introduction to SDE". Source: `course-structure.md` CS-5.
6. **S** The whole curriculum is being rethought and replanned, not only the names. Source: `course-structure.md` CS-6.
7. **I** Decisions about the shape of the course are written in `course-structure.md` and changed there first; other files point at it. Source: `course-structure.md` CS-7.
8. **S** The levels are Stage to Course to Chapter to Lesson to Part, and a Part exists only when a chapter is too big or too mixed to stay one unit. A stage can hold more than one subject. Source: `course-structure.md` CS-8.
9. **S** Learning is parallel, not one thing after another: programming, AI-agent skills and the tools around them (Git, GitHub, the AI's context window, tokens) are learned together, in the same chapter. Source: `course-structure.md` CS-9.
10. **S** The old Stage 1 and the old Stage 3 merge into one stage. Source: `course-structure.md` CS-10. (Superseded on 22 September by CS-12 to CS-16; the merge itself survives in CS-14.)
11. **S** Stage 0 teaches the theory and the first practical basics: the terminal, an editor or IDE, and the first programming. Source: `course-structure.md` CS-11.
12. **S** One page opens the book, before Stage 0: about a 30 minute read on the problem, the solution, a summary of the curriculum, and the difference between spec-driven development and spec-driven engineering. Source: `course-structure.md` CS-Q6 (answered 22 September).

### Changes

13. **I** Where the word "lesson" meant a chapter, it now says "chapter": 234 words changed in 20 files (the writing skill, the project guide and its four protocols, `CLAUDE.md`, the project map, and five canon files). Source: `course-structure.md`, "The lesson to Chapter task"; prompt record 0127; `agenda/index.html` "Done today" item 15.
14. **S** The Welcome page was brought into line: it no longer explains the book's own internal rules to the reader, its stage names agree with the sidebar and the footer, it carries the safety floor in plain words, one note under "How to read this book" was rewritten, and the closing section is titled "Start reading". Source: `edu-site/docs/changelog.md`, entry of 2026-09-21; prompt record 0126.
15. **S** The two sentences on the reader pages that promised two readers were fixed: `welcome.md` line 78 and `faq.md` line 52. Source: prompt record 0125; `course-structure.md` section 7.
16. **S** Depth blocks stay, as optional extras a curious reader can open; nothing in a chapter depends on one. Source: `corrections.md` section 25; prompt record 0124.
17. **S** Examples are Pakistani first, and still clear to a reader elsewhere. Source: `corrections.md` section 29; prompt record 0127; `agenda/index.html` "Done today" item 19.
18. **I** The rule "ask which model, every time" was extended to research work. Source: `corrections.md` section 30.
19. **I** The constitution was amended to version 3.0.2: one reader in every stage, the model question in six places, and nine small fixes. Source: prompt record 0127; `agenda/index.html` "Done today" item 16. (Version 3.1.0 followed on 22 September.)
20. **I** The rule migration ran: 104 edits in the writing skill's seven files and 9 merges in the rules folder; a check restored 24 of the 38 changed places in the rules folder by hand. Source: prompt record 0127.
21. **I** The migration plan was written, 767 lines, naming every file that changes and giving each of the 324 rules one home. Source: prompt record 0124.

## 22 September 2026

### The stage structure, decided

22. **S** Agentic AI is taught inside software engineering, never as a stage of its own. The reason: an agentic system is software engineering with a large language model as one component, and everything else in it (functions, loops, APIs, databases, authentication, async work, deployment) is ordinary software engineering. Source: `course-structure.md` CS-12; `thesis.md`, "Agentic AI inside SE"; `history/adr/0010-agentic-ai-inside-se.md`.
23. **S** Stage 0 is "Introduction to SDE". Source: `course-structure.md` CS-13; `thesis.md` stage table.
24. **S** Stage 1 is "SDE Mastery (AI-Driven)": basic to intermediate software engineering, with basic to intermediate agentic applications. Source: `course-structure.md` CS-14; `thesis.md`; `changelog.md`.
25. **S** Stage 2 is "SDE Mastery (AI-Native)": advanced software engineering, with advanced agentic applications. The "; Agentic AI" suffix is dropped, because agentic AI now runs through both mastery stages. Source: `course-structure.md` CS-15.
26. **S** Credentials is not a stage. It is a parallel track that maps third-party credentials to what is being learned, it is switched off for now, and its design is postponed. Source: `course-structure.md` CS-16; `changelog.md`; `welcome.md`; `agenda/index.html` "Parked on purpose" item 1.
27. **S** Navigation happens at Course level: a Course is a difficulty band inside a stage, not a subject, so several subjects of the same difficulty share the same chapters. Source: `course-structure.md` CS-17 and CS-Q5 (answered).
28. **S** The project owner places each topic in Stage 1 or Stage 2, topic by topic, when that part of the book is authored. Source: `course-structure.md` CS-18.
29. **S** Inside a topic, SE comes first and at full depth; an agentic application is added only where the concept genuinely pairs; when the two compete for depth, SE wins. Source: `course-structure.md` CS-19.
30. **S** Who writes the code: the student writes it by hand first, then builds it with a coding agent. Source: `course-structure.md` CS-20.
31. **S** The pairing types are Substrate, Surface and Practice, and they are a main philosophy of the book. Source: `course-structure.md` CS-21; `thesis.md`.
32. **S** The LLM itself is the one exception: the only component with no software-engineering ancestor, so it is taught on its own terms. Source: `course-structure.md` CS-22.
33. **S** Agents are real, working agents from day one, never toy versions, running on free providers (Groq, OpenRouter, and others the owner researches). No paid keys and no local models. Source: `course-structure.md` CS-23.
34. **S** Coding agents (Claude Code, opencode) and prompt and context engineering become Stage 1's working medium, used for both the software engineering and the agentic implementation. Source: `course-structure.md` CS-24.
35. **S** What is genuinely new when an LLM is inside a system: the same input can give different outputs; failures are wrong answers that look right, not crashes; testing means measuring many runs, not asserting one result; plain language can attack it; every call costs money and time. Basics in Stage 1, advanced in Stage 2. Source: `course-structure.md` CS-25; `history/adr/0010-agentic-ai-inside-se.md` item 4.
36. **S** "10x" means depth of understanding, from theory and practice done together, both by hand and in agents. Source: `course-structure.md` CS-26.
37. **S** The scope is building with models, not building models. Machine learning, deep learning and natural language processing (training, fine-tuning) are out of scope, at least for now. Source: `course-structure.md` CS-27.
38. **S** The topics and sub-topics are designed when the book is authored, and the 27 row topic sketch is a very rough idea, not a plan. Source: `course-structure.md` CS-28, CS-29, and the owner's rule under the sketch.
39. **I** The structure is written in `course-structure.md` and the philosophy in `thesis.md`. Source: `course-structure.md` CS-30.
40. **S** The zero-knowledge floor now names Stages 0 and 1: both assume a reader who has never programmed, and Stage 2 builds on Stage 1. Source: `course-structure.md` CS-31; `thesis.md`, "The safety floor".
41. **S** Every Substrate and Surface pairing names its delta, meaning what is genuinely new in the agentic version. Source: `course-structure.md` CS-32.
42. **S** There are no separate SDK-specific Parts. Source: `course-structure.md` CS-33.
43. **S** The Credentials track's design is postponed, and until the owner picks it up again the CS50 promises on the reader pages stay exactly as they are. Source: `agenda/index.html` "Parked on purpose" item 1. Whether the reader pages may promise CS50 while the track is disabled is open question CS-Q8 in `course-structure.md`.

### The site and the reader pages

44. **S** The site now shows three stages: 31 files changed, including the sidebar, the footer, the homepage cards, both curriculum charts, the stage icons, the stage colours and the four ledgers. The CS50 pages moved off the site to `edu-site/parked/credentials-track/`, and the AI-Native folder is now `stage-02-sde-mastery-ai-native/`. Source: `agenda/index.html` "Done today" item 2; `changelog.md`.
45. **S** The reader pages tell the three-stage story: eight files, being the welcome page, the FAQ, the Stage 0 introduction, the two Stage 0 chapters that pointed at an old Stage 3, the code of conduct, and the repository's own `README.md`. Every CS50 promise was kept word for word and only the stage facts changed. Source: `agenda/index.html` "Done today" item 3.
46. **S** A changelog entry dated 22 September was added: the three stages named, agentic AI taught inside software engineering, and the CS50 pages off the site while the Credentials track is redesigned. Source: `agenda/index.html` "Done today" item 4; `changelog.md`.
47. **I** The final gate: the build is green, the type check is clean, and lint is unchanged at 64 errors, all older than that day. Source: `agenda/index.html` "Done today" item 5.
48. **I** ADR-0010, accepted, records the three stages, agentic AI inside SE, the Credentials track, and the options that were turned down. Source: `history/adr/0010-agentic-ai-inside-se.md`; `agenda/index.html` "Done today" item 6.
49. **I** The rules the agents follow describe three stages: 21 files, and the constitution is version 3.1.0, whose floor says Stages 0 and 1 and whose CS50 integrity floor is labelled the Credentials track with every word kept. Source: `agenda/index.html` "Done today" item 7.
50. **I** The rest of curriculum-state was brought into line: the README, the integrity floor's seven "Stage 2" labels, the research-and-comparison policy, the calibration contract, `corrections.md` section 8, and one research note. Source: `agenda/index.html` "Done today" item 8.
51. **I** The task list for the second pass, T013 to T020 in `specs/011-curriculum-redesign/`, was written and all eight tasks are done. Source: `agenda/index.html` "Done today" item 9.
52. **S** A preview of the learning assistant was built into the site: `edu-site/src/components/ChatAssistant/`, mounted once in `edu-site/src/theme/Root.tsx`. It makes no API call, and its only real outcome is an honest message that no model is connected and that nothing typed left the page. Source: prompt record 0134; `edu-site/src/theme/Root.tsx`.
53. **S** The assistant's backend is a stub: `POST /chat` in `edu-site/api/app/routers/chat.py` returns 501 and says the work is Phase B, still needing a populated vector store and a configured model and embedding provider. Source: `edu-site/api/app/routers/chat.py`.
54. **I** Command Code updated itself from 1.62.1 to 1.63.0 during three runs. Two had finished and their records were recovered from its logs; the third resumed from its turn limit. Source: `agenda/index.html` "Done today" item 10; prompt record 0139.
55. **I** Four of the owner's messages were recorded word for word as prompt records 0135 to 0138. Source: `agenda/index.html` "Done today" item 12.
56. **I** An inventory of old stage structures, about 500 lines in six groups, was written. It found five hand-written stage lists in the site code that must change together. Source: `agenda/index.html` "Done today" item 13.

### Parked on purpose

57. **S** The book's original five chapters, `intro-1` to `intro-5`, stay live as they are, until a check shows the new Stage 0 covers every topic in them. Source: `agenda/index.html` "Parked on purpose" item 5.
58. **I** The five lesson shapes (Concept, Tool, Practice, Procedure, FrontDoor) are provisional and fold into the redesign. Source: `agenda/index.html` "Parked on purpose" item 4.
59. **I** The welcome-page wording question is parked into the front-page redesign rather than fixed on its own. Source: `agenda/index.html` "Parked on purpose" item 2.
60. **S** Who reads the last stages is no longer a question: it is the same beginner, further along the road. Source: `agenda/index.html` "Parked on purpose" item 3.

## Facts a student message must not get wrong

- The three stage names, exactly: Stage 0 Introduction to SDE; Stage 1 SDE Mastery (AI-Driven); Stage 2 SDE Mastery (AI-Native). Source: `thesis.md` stage table; `changelog.md`.
- Stages 0 and 1 assume no programming experience at all; Stage 2 builds on Stage 1. Source: `course-structure.md` CS-31.
- The student writes code by hand first, then with a coding agent. Source: CS-20.
- Agents are real and run on free providers; no paid keys and no local models. Source: CS-23.
- Credentials is a separate track running alongside the stages, switched off on the site for now, its design postponed. Source: CS-16; `welcome.md`.
- No working learning assistant exists today: the backend returns 501, and the site carries a preview that answers nothing. Source: `edu-site/api/app/routers/chat.py`; prompt record 0134.
- The two Harvard certificates, CS50P and CS50W, are unchanged and are still promised: both courses are free to audit, and the optional verified certificate from edX is paid. Sources: `edu-site/docs/welcome.md`; `edu-site/docs/faq.md`, "What does the CS50 certification cost?".
- Canon does not currently support promising more free certificates over time: the only place that says it is the superseded four-stage table row (`course-structure.md` line 111), superseded the same day by CS-16, which disables the track and postpones its design.
