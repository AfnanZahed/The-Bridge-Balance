---
id: 0127
title: Rule migration run, dry run and final sweep
stage: general
date: 2026-09-21
surface: agent
model: claude-sonnet-5
feature: none
branch: none
user: afnanzahed@gmail.com
command: none
labels: ["migration", "adr-0007", "deepseek", "survivor-check", "dry-run", "lesson-to-chapter", "constitution-3-0-2", "course-structure", "artifact", "final-sweep", "session-reuse", "worktree"]
links:
  spec: null
  ticket: null
  adr: history/adr/0007-lesson-spine-becomes-book-specific.md
  pr: null
files:
 - .specify/memory/constitution.md (v3.0.2: Principle VIII asks the owner every time, research included; Principle IX one reader in every stage)
 - CLAUDE.md, PROJECT-MAP.md, curriculum-state/README.md
 - curriculum-state/canon/course-structure.md (CS-8 to CS-11, CS-Q2/Q5/Q6, section 7, change log)
 - curriculum-state/canon/corrections.md (section 29 Pakistani-first examples, section 30 K3, one merge)
 - curriculum-state/canon/audience.md, voice.md (tombstones kept only where a wording check passed; one-reader block)
 - curriculum-state/canon/research-and-comparison.md, integrity-floor.md, thesis.md, naming.md (merges, pointers, one self-check line)
 - .claude/skills/lesson-spine-authoring/SKILL.md and reference/stations.md, mixed-audience.md, language-register.md, comprehension-audit.md, beginner-experience-audit.md, name-registers.md (104 edits)
 - .claude/skills/bridge-balance-project-guide/SKILL.md, reference/chapter-production/SKILL.md, reference/research.md, gate.md, ledgers-protocol.md, and the curriculum-architect, lesson-adversarial-review and book-coherence-audit skills
 - edu-site/docs/faq.md (line 52), edu-site/docs/glossary.md (line 34)
 - curriculum-state/proposals/chapter-component-palette-2026-09-20.md (open questions 6 and 7)
 - history/adr/0007-lesson-spine-becomes-book-specific.md (section 8, dry run, Still outstanding), history/adr/README.md
 - history/reports/spine-migration-2026-09-20/migration-plan.md (status, answers, section 13)
 - "artifact: https://claude.ai/artifact/DA9f192UXXk6We5STXNkeL (Work list, version 5)"
 - "memory (outside the repo): whole-book-redesign-initiative, feedback-claude-plans-deepseek-executes, feedback-audience-settled-beginners-only, session-in-stale-worktree-reads-old-rules, feedback-leave-other-claude-sessions-alone, MEMORY.md"
 - "the final sweep's fixes: PROJECT-MAP.md, CLAUDE.md, curriculum-state/README.md, curriculum-state/canon/corrections.md (two dated notes) and eight skill files: 24 DeepSeek edits, 3 of them reworded by me, plus 3 more found by a plain word search"
tests:
 - "check-references.mjs and check-frontmatter.mjs pass; check-chapter: 9 checked, 0 errors, 6 warnings (the ones the owner said to ignore)"
 - "DeepSeek traces audited (migration, reviewers, dry run): no write outside the target file and its own log; one job wrote 11 scratch files in Command Code's own temp folder, none in the project"
 - "per file: same headings, every pointer path exists, every quoted section title exists, line endings unchanged"
 - "survivor check: 24 of 38 changed canon places put back; reviewers: 116 places checked, 4 problems, all fixed; dry run: 10 problems, 8 fixed, 2 wait for the shape redesign"
 - "final sweep: 5 DeepSeek sessions resumed (--session) at high effort; traces audited (no write outside the listed files, shell only used to append to their own logs); every changed line read against a backup; line endings unchanged; a plain word search then found 3 more, fixed; all three gates pass again"
 - "work-list page: valid structure, no scripts, NOT looked at in a browser"
---

## Prompt

> NOTE: what you mean by the Moving the writing rules for real??? also, in this session, we discused a lot, really a lot of things and did many, are they in the git worktree, or in the real folder? move everything updated or changed into the real folder.
>
> 7 tasks:
>
> 1. Redesign the whole curriculum: about depth block, add this question in the pending ones where the pallete and other things lives
> about the migration, do it now.
> hierarchy confusion: Actually, I am going to change the whole curriculum design including the hierarchy and including the topics' order. as per now's plan, the stage 0 just cover thethe history and the what and the why of the SDE. but the reason I included these things into the SDE intro rather then making it a problem -> solution 1 page thesis, is that the begineer who don't even the basics will not understand the WHY of SDE even if they understand the WHAT of SDE. also, there is another problem in the current curriculum, it IS claiming the balance but it is not creating the balance by just focusing one thing at one time, if we first have to learn the git and github and other programming things and then the AI, what's the differnece between us and others? so, Instead of sequencial learning, I made it the parrallel learning, the complete stage 1 and stage 3 will be merged into stage 1, stage 2 and the stage 4 will remain the same. and in the stage 0, will we not just do the theory, we will cover the very basics of the practical of the terminals, IDEs and the programming, so that when the students will touch the basic things. about the thesis, actually i never wrote any book ever, and I am confused on how to present what this book is/why this book/welcome/thesis/intro at once. you will help me understand this and develop the correct term and what to write it before all the stages. Also, the main problem here are 1 thing, the meaning of the introduction, here in pakistan, the introduction to anything means basics, but in CS50p, the word introduction is used in the course name but the content is advanced level. when the introduction paradox will be solved, because the mastery things are somehow solved, the last stages will of mastery, but the first ones, from where we have to start, are not decided and introduction is the paradox, what are the exact limits of introduction to SDE and whether we only can put the stage 0 to introduction or also the stage 1 and 2???
> 2. Lesson -> chapter: A lesson is a lesson, a chapter is a chapter, you know the hierarchy, if anywhere chapter is listed as lesson, fix it. both are different things and you  know the differnece.
> 3. as you said, it is a "After the redesign"
> 4. Wait for palette and other things listed there.
> 5. Logo will be later, without finalized logo we can start.
> 6. discuss this with me.
> 7. if you meant moving from worktree changes to the original folder when you say: Move the writing rules for real
> This is the "migration plan": nothing has moved yet. It needs the four open plan decisions below. I suggest doing it after the redesign, because the redesign changes the words the rules use. Your call.
>
> Starts: after the plan decisions" then do it now.
>
> Waiting for you
>
> 1. Who keeps the text: Ok, i accept your suggesstions
> 2. Does "ask every time" cover research?: yes, it covers the research.
> 3. Nine small fixes: Ok, I accepts your sugesstion
> 4. How far to go now: about which phases you are saking about? what you meant exactly?
> 5.
> Five more sentences with old promises: ok, i accept the proposed style.
> 6. Pakistani first: should examples change?: Yes, the pakistani first examples...
>
> The shape of the course:
>
> One reader. : yes, one reader, but make it expert. it will be beginner -> Expertise, gradually.
> Learning-first names.: Yes
> Level labels inside a subject.: YEs
> Stage 0 will be named "Introduction to SDE".: Yes
> The whole curriculum and its stages will be rethought. Not only the names.: Absolutely
> One file for these decisions. They are changed there first, so ten files do not need to change.:Yes.
>
> Your two kinds of "level"
> What it describes	Where it goes
> The learner's level
> "I am a beginner."	The person's skill	Labels on chapters
> The learning stage
> "This course is an introduction to Python."	What the course is doing	Names of stages and courses: Yes.
>
> Question 1: can one stage hold more than one subject?: Yes absolutely.
>
> Ok, I accept the Stage -> Course -> Chapter.
> But here is the exact problem, as i said earlier, I am going to merge the topics to make the SDE practically an SDE, python at one time, javascript at one time, it can also be done by the other courses then why me? so I am going to integrate the stage 3 with the stage 1. so that, the students will ACTUALLY learn the SDE, the programming using Claude or opencode (free for students), there is the exact problem start with our new startegy of "Stage -> Course -> Chapter". as we will learn them at once, that's what today's AI era demands from us, the same lesson will cover the prompt engineering and a  python concept, then the any other lecture will cover the git and github + managing the context window of AI coding agent like claude and opencode and tokens. then how will both be covered in one course??
>
>
> Question 2: what is inside a chapter?
> Chapter -> Lesson -> Part (if any)
>
> Question 3: how does a level label work?:
> the ban to audience labels should be removed, remove it. labels are allow.
>
> And "Introduction to SDE":
>
> You said Stage 0 will be named "Introduction to SDE", and also "the first 3 stages will be Introduction to SDE". Which is it: Stage 0 only, or Stages 0 to 2 together? : that's the exact fight my mind is stuck in.
>
> Lesson or Chapter
> 133 uses in 7 files
> You asked what the exact problem is
>
> My writing instructions call a chapter a "lesson". Your book uses "Lesson" for something smaller.
>
> No reader ever sees this. It only changes how I read my own instructions. This is how the words line up today.:
> Then fix this problem properly using the deepseek with high effort.
>
> Depth block: add this into the pending ones where the pallete decision lives.
> migration plan: DO IT NOW using deepseek with max effort
> the 198 rule: do them
> reader facing pages: ok
> Parked on purpose:
> Who reads Stages 3-4: this doesn't matter anymore, because the whole curriculum is going to be redesigned.
>
>
> The five lesson shapes: This is also going to be the part of curriculum redesign
>
> The Source chip: Add this too in the pallet file
> intro-1 to intro-5: keep them as they are
> Warnings on welcome.md and ch00: ignore
>
>
> Small chores for you:
>
> Replace or switch off the old writing skill in the Claude app: Ok
>
> Start your next session in Desktop\Book: Ok, also, I have ran a new session in the Desktop\Book but i think it is not aware of out this sessions' work, make sure everything is update from here to Desktop\Book
>
>
> Push the snapshot to GitHub: Ok. done: Microsoft Windows [Version 10.0.26200.9457]
> (c) Microsoft Corporation. All rights reserved.
>
> C:\Users\Dell>git -C "C:\Users\Dell\Desktop\Book" add -A
> [131 lines "warning: in the working copy of '<file>', LF will be replaced by CRLF the next time Git touches it" left out of this record: same text, different file names]
>
> C:\Users\Dell>git -C "C:\Users\Dell\Desktop\Book" commit -m "Full backup snapshot 2026-09-21: content-rules rewrite, Constitution v3.0.1, ADRs 0006-0009, ADR-0007 migration plan, course-structure canon"
> [main c7b1d00] Full backup snapshot 2026-09-21: content-rules rewrite, Constitution v3.0.1, ADRs 0006-0009, ADR-0007 migration plan, course-structure canon
>  317 files changed, 37507 insertions(+), 4176 deletions(-)
> [the list of the 317 files (delete/create/rename lines) left out of this record; the commit c7b1d00 holds it]
>
> C:\Users\Dell>git -C "C:\Users\Dell\Desktop\Book" push origin main:full-backup-2026-09-21
> Enumerating objects: 351, done.
> Counting objects: 100% (351/351), done.
> Delta compression using up to 8 threads
> Compressing objects: 100% (251/251), done.
> Writing objects: 100% (263/263), 764.24 KiB | 2.47 MiB/s, done.
> Total 263 (delta 88), reused 5 (delta 0), pack-reused 0 (from 0)
> remote: Resolving deltas: 100% (88/88), completed with 56 local objects.
> remote:
> remote: Create a pull request for 'full-backup-2026-09-21' on GitHub by visiting:
> remote:      https://github.com/AfnanZahed/The-Bridge-Balance/pull/new/full-backup-2026-09-21
> remote:
> To https://github.com/AfnanZahed/The-Bridge-Balance.git
>  * [new branch]      main -> full-backup-2026-09-21
>
> C:\Users\Dell>
>
> Later messages in the same exchange:
>
> Continue
>
> also update the live artifact, and continue your work
>
> your tokens are toooooooo much expensive, so please allocate your MAXIMUM work to deepseek with high effort
>
> Continue, also don't touch the CLAUDE'S other sessions, because it's work is totally different, use DEEPSEEK'S sessons as the command code skil said

## Response snapshot

Explained that "moving the writing rules for real" is the ADR-0007 migration plan (one home per rule), not a copy out of the worktree, and that all of this session's work was already in Desktop\Book. Ran the whole plan at max effort (the owner's order): 104 edits in the seven skill files, 9 canon merges, and canon tombstones that a survivor check then cut back (24 of 38 changed places restored), followed by independent reviewers and a read-only dry run of the skill. Fixed everything they found that was not waiting on the shape redesign. The skill did not get shorter (+7.5% words) and about 40 canon rules are still written twice; both are stated in ADR-0007 section 8. Also done: the lesson-to-chapter vocabulary fix (234 words in 20 files), updated course-structure.md section 7, the plan, the ADR and its index, memory notes, and the live work list (now version 5). Before the owner said to leave other Claude sessions alone, I had sent one short message to another open session about what changed; I sent nothing after that and will not message a Claude session again. I also removed the chore about it from the work list. Then a final read-only sweep of 30 rule files ran as five DeepSeek sessions at high effort and reported 28 places that still stated an old rule (26 real, 1 false alarm, 1 waiting for the shape redesign). The fixing resumed the same five sessions with `--session`, so the files were already in their context: 24 edits, audited against backups; I reworded 3 of them to match `corrections.md` section 21 and edited two status notes in `corrections.md` by hand. A plain word search then found 3 more stale counts that the sweep had missed, and I fixed them. The proofread of the word changes (192 rows) found 2 leftovers, both fixed. All three gates pass (0 errors, the same 6 ignored warnings).

## Outcome

- Impact: the skill and the pointer layer now match the canon; the leftovers the dry run found (image rule, Stage 3-4 reader, research default, ledger count, anchor order) are fixed; the honest limits are on record.
- Tests: see front matter.
- Files: see front matter.
- Next prompts: the redesign questions A (braided Course), B (how far "Introduction" goes) and C (name of the front part); whether to finish the ~40 repeated canon rules now or after the redesign; the skill folder rename; the constitution wording check; the app skill chore.
- Reflection: I trusted a DeepSeek edit job more than its output deserved; the tombstones lost details in most places and only the checks after it showed that. The cost rule (delegate only if cheaper) was judged, not counted.

## Evaluation notes (flywheel)

- Failure modes observed: resumed jobs logged NEEDS_HUMAN without editing; merges copied a withdrawn rule from old detail-check data; tombstones pointed at text that did not state the rule; the wording-overlap check passed a place at 59% that had lost three details (a reviewer caught it); a long shell heredoc broke on quotes and was written with the file tool instead; I sent one message to another Claude session, which the owner then said should be left alone; the final sweep missed copies of the same phrase in other files (a plain word search found 3), and DeepSeek reworded a narrow drawing rule too broadly in 2 places.
- Graders run and results (PASS/FAIL): trace audits PASS (including the five resumed sweep-fix sessions); per-file scripts PASS; survivor check FAIL on 24 of 38 places (restored); reviewers 4 problems (fixed); dry run 10 problems (8 fixed, 2 waiting); final sweep 28 places (26 real and fixed, 1 false alarm, 1 waiting), plus 3 found by a plain search (fixed); page structure PASS; visual check NOT DONE.
- Prompt variant (if applicable): max effort for the migration, its reviewers and the dry run (the owner's choice for that job); high effort for the vocabulary pass and the final sweep (the owner: maximum work to DeepSeek at high effort).
- Next experiment (smallest change to try): make DeepSeek add the missing wording to the skill first, and only then write the tombstone, so the survivor check passes before anything is removed.
