---
id: 0125
title: Course shape decisions, page fixes, outside copies
stage: general
date: 2026-09-21
surface: agent
model: claude-sonnet-5
feature: none
branch: none
user: afnanzahed@gmail.com
command: none
labels: ["course-structure", "beginner-to-expert", "hard-words", "images", "corrections-26-28", "deepseek", "reader-pages", "outside-skill-copies", "artifact", "migration-plan"]
links:
  spec: null
  ticket: null
  adr: history/adr/0007-lesson-spine-becomes-book-specific.md
  pr: null
files:
 - curriculum-state/canon/course-structure.md (new)
 - curriculum-state/canon/corrections.md (sections 26, 27, 28)
 - curriculum-state/canon/audience.md (hard English words paragraph)
 - curriculum-state/canon/naming.md (pointer)
 - curriculum-state/README.md, PROJECT-MAP.md (reading lists)
 - .claude/skills/lesson-spine-authoring/reference/language-register.md, comprehension-audit.md
 - .claude/skills/bridge-balance-project-guide/SKILL.md, reference/curriculum-architect/SKILL.md
 - .claude/skills/bridge-balance-project-guide/reference/chapter-production/SKILL.md, reference/image-prompts.md
 - .claude/skills/command-code-delegation/SKILL.md (effort exception, Step 2b cost check)
 - edu-site/docs/welcome.md (line 78) and edu-site/docs/faq.md ("Who is it for?"), edited by DeepSeek at max effort
 - history/reports/spine-migration-2026-09-20/migration-plan.md (rebuilt with the answers and 19 proofreading fixes)
 - history/reports/course-structure-2026-09-21/level-naming-research.md (new)
 - history/adr/0007-lesson-spine-becomes-book-specific.md (section 7, count 133)
 - "outside the repo: user-level command-code-delegation skill; the Claude app's cached lesson-spine-authoring copy (backups kept)"
 - "artifact: https://claude.ai/artifact/DA9f192UXXk6We5STXNkeL (Work list, version 3)"
 - "memory (outside the repo): audience, delegation, redesign notes, MEMORY.md"
tests:
 - "reader pages: only the two intended passages changed, CRLF kept (105/105 and 91/91 lines), text exact"
 - "DeepSeek traces audited (edit, sweep, research, 4 reviews): no write outside scope"
 - "research: 31 of 39 quotes verbatim; structure words re-checked; unverified quotes marked"
 - "plan review: 19 findings, 19 quotes verbatim, 19 fixed"
 - "work-list page: 0 unclosed tags, 0 duplicate ids, 0 scripts; NOT looked at in a browser (tools unavailable)"
---

## Prompt

> 1. The big rules: Ok. NOTE: The beginners are just not beginners, but the audience is pakistani first, so the english words also must be easy, not too professional or difficult, and if there is need to use any difficult english word or technical words, it will also be linked to the glossary.
> 2. A: 3 of 4 are used: ok, you will plan, Deepseek will execute. also, you must verify if it will cost less tokens and deepseek will verify if the verification will cost more tokens. B: What you exactly meant by depth block? what they are, how they looks like and why they are????. C: What is being changed in the welcome.md line 79??? D: Ok, we will work on this as a seperate whole task after finishing these minor choases.
> 3. Which migration plan? what are you going to migrate?
> 4. 198 rules? about which thing?
> 5. Ok. No, the drawing is allowed and will be done using the available connectors by claude, or in anyother way, I will decide for each time seperately. But note that the Claude will, when writing the content, decide and recommened me on which place and for which content a drawing/image should be added...
> 6. Ok, no senior level is no longer allowed, just beginner to senior. also, there is one major Idea we must work on, the idea is that when i said to you that the content will be for the beginners, it was a generalized answer, one extremely big gap is still missing that what the beginners actuall meant here? whether the beginner at starting or beginner level training as whole as we as till the end??? mean when I say the content is for 'beginner', is have 2 meanings, the both are 100% different, 1 is that this content is FOR a beginner, who is beginner or starter or newcomer or fresher and going to inter/advance, and the 2nd meaning is that the content will output the 'beginnners'. THIS IS THE GREATEST ANSWERED question that must be questioned but you never did. the answer is that the content is FOR beginners TO MAKE them EXPERTS. input is beginning, and output is expert/mastery level. also, the stage 0's orientation name is going to be the Introduction to SDE. also, there was a confusion in my mind for the naming and hierarchy of the whole course: [the owner then pasted a two-part description: (1) the learner's level, a description of the person: beginner, intermediate, advanced, expert; (2) the learning/content stage, what the course is doing: "This course is an introduction to Python", "This lesson introduces recursion".] So I decided that this will be a learning-first naming convention like introduction to SDE, introduction to programming with python, introduction to programming with javascript etc, not python-beginner level, advanced python when it Comes to stage, and when it comes to the chapters and subchapter, it will be in learners level. for example, the first 3 stages will be Introduction to SDE. then in the stage 1, when it will come to the introduction to python or introduction to programming with python, within the python chapters and subchapters, we will introduce the Learner's level like beginner, intermediate, and advanced, so that the students will be motivated and curios for new steps completing. NOTE: make a new md file for these type of decisions like stages, content changing, hiearachy, chapters, lessons, parts, stages, learning first naming or learners first naming etc, becuase these decisions are going to be update continously with time, and in a proper file this will be written and update to make it easy, to prevent changing 10s of files for these organizational decisions. also suggest me better options for this thing because I am confused for the exact hierarchy of outside and inside of finalized "stage -> chapter -> lessons -> parts (if any)" decision. also, note that I am rethinking the whole curriclum and the stages, not just there names. Complete change is going to happen in curriculum.
> 7. Ok
> 8. which list page?
> 9. what you mean by new wording of the 2 reader pages and why 2 readers again?
>
> What went wrong just now
> 1. complete them and fix both points.
>
> Still mine to do (small)
> 1. ok 2. ok 3. ok 4. ok ( just check the time, we were discussing the night but that was yesterday's night, no todays, 1 more day spent out)
>
> Waiting for you
> 1. lesson -> chapter: add this task into the pallet remainig tasks and the above point too of rethinking and replanning the whole curriculum, it will be done in that part
> 2. 2.1: if history mean that the claude will not check it when doing work, then don't make it history, and if claude will check if it is rulebook, then make it rulebook, the important thing is that the claude should read the corrections when needed.
> 3. what you meant by 2 reader pages? do it using the deepseek very carefully with max effort
> 4. Fix both
> 5. Ok, i will tell you the why of chapters, but firstly, the complete redesign of the curricuum is going to be happen, then we will do this. and the logo will be designed later. I will also tell you the persona later, all the pallete, logo, curriculum redesign, all things write them in the live artifact to work on them one by one
> 6. Ok.
> 7.

## Response snapshot

Read the sources before answering. Recorded three rules (corrections 26 to 28) and a new canon file, course-structure.md, with the decisions CS-1 to CS-7 and Claude's options for the levels. DeepSeek at max effort edited welcome.md line 78 and the FAQ; a read-only sweep of 40 pages found five more sentences (unchanged, awaiting the owner). DeepSeek researched how eight programs name their levels (facts checked by script). Rebuilt the plan with the owner's answers (a rulebook) and fixed 19 proofreading findings. Brought both outside skill copies into line, with backups. Republished the live work list. The machine clock said 21 September 2026, so records carry that date.

## Outcome

- Impact: the reader question (beginner as start, expert as end) is settled in writing; the course-shape decisions have one home; the reader pages no longer promise two readers.
- Tests: see front matter.
- Files: see front matter.
- Next prompts: the redesign task (with lesson to Chapter); plan decisions 1, 3, 4, 6; the five sweep sentences; whether examples become Pakistan-first.
- Reflection: the owner's complaint was fair: I had recorded "beginners" without asking which of two meanings was meant. The rule now says to ask.

## Evaluation notes (flywheel)

- Failure modes observed: the page could not be looked at in a browser (built-in tool gave snapshots only, the other needed a download); a curly-quote helper first mispaired closing quotes, caught by a pairing count.
- Graders run and results (PASS/FAIL): trace audits PASS; page structure PASS; visual check NOT DONE.
- Prompt variant (if applicable): DeepSeek at max for one job, high for the rest.
- Next experiment (smallest change to try): install a screenshot-capable browser only with the owner's approval.
