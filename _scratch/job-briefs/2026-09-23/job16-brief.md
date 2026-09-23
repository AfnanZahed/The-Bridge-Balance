# Job 16: what the site needs before an intro demo, and how to record it in Recordly

Effort: max. Executor: DeepSeek V4.1 Flash. Planner and verifier: Claude. Live repository C:/Users/Dell/Desktop/Book only; never `.claude/worktrees/`; no git. This job is READ-ONLY on the site: change no site file. Write only the files named below.

## The owner's request (23 September 2026)
The owner wants an international-standard product intro demo of the website, recorded with Recordly, to show students the progress is real and to build trust. They ask: which BASIC things the site must show for that (not full content), and how to record it with Recordly, so the intro and the WhatsApp messages that carry it are professional, smooth, purposeful, memorable and meaningful. The owner is on Windows 11.

## Hard limits (from the project's own rules; the plan must obey them)
- Honesty: nothing on camera may pretend to work when it does not. The learning assistant does not work yet; it may appear only as a clearly labelled preview or "coming soon".
- Never show students the existing Stage 0 chapter text or any old chapter body: the owner says it is being replaced. Show structure (stage pages, navigation, the changelog, the welcome page, search, themes), not chapter content.
- Phase A only: no login, payments or accounts in the demo.
- Claude and DeepSeek make no images; any image or logo is the owner's.
- The three stages are 0 Introduction to SDE, 1 SDE Mastery (AI-Driven), 2 SDE Mastery (AI-Native); Credentials is a separate track, switched off.

## Step 1: research (cite a URL for every fact)
1. Recordly: find its official site and repository. What it is, whether it runs on Windows 11, how to install it, and its real features and settings (capture area, resolution, frame rate, auto-zoom, cursor effects, backgrounds, audio, trimming, export formats). Report only what the official sources say; if something is unclear, say so.
2. How the best product intro demos are made (for example Linear, Vercel, Raycast, Arc, Notion, Stripe, Screen Studio showcases): length, opening seconds, structure, pace, cursor and zoom use, captions versus voice, music, aspect ratio, ending. Take the reasoning, copy nothing.
3. WhatsApp: the current size and length limits for a video sent as media, and the export settings that stay sharp on a phone.

## Step 2: audit the site as it is now
From `edu-site/` (`src/pages`, `src/components`, `src/theme`, `docusaurus.config.ts`, `sidebars.ts`, `docs/welcome.md`, the three stage index pages, `docs/changelog.md`, `docs/faq.md`): list what a visitor sees today, page by page, marked Demo-ready, Needs a small fix, or Must not be shown (with the reason). Note anything that would look unfinished on camera (placeholder labels, empty pages, broken links, stale stage counts, a wrong domain).

## Step 3: the plan, `_scratch/job-briefs/2026-09-23/job16-demo-plan.md`
Plain, warm, easy English. Sections:
1. **The minimum site for the demo**: at most 8 items, each one line, marked Have it / Small fix / Build. Prefer what exists. Each Build item says roughly how big it is.
2. **The demo story**: one 60 to 90 second intro, as a table: scene, seconds, what is on screen, what the cursor does, the caption or spoken line. Open with the promise to the student, show the three stages, the changelog as proof of real progress, and end with what comes next. Also a 15 to 20 second cut for WhatsApp status.
3. **Recording in Recordly, step by step**: preparing the browser and Windows (resolution, browser zoom, clean profile, notifications off, light or dark theme choice), the Recordly settings, the recording itself, editing, export for WhatsApp and for a larger screen.
4. **Pairing it with the message**: how the WhatsApp text and the video should work together (what the first line does, where the video sits, how long, how it ends), in 5 to 8 lines.
5. **Sources**: every URL used.

## Step 4: prompt record and Agenda
- Prompt record under the next free id in `history/prompts/general/` (check right before writing; model the file on `0142-*.general.prompt.md`): title "Intro demo plan with Recordly", date 2026-09-23, feature none, labels ["demo","recordly","trust"]. Prompt text: the owner's LAST user message, extracted exactly by script from `C:/Users/Dell/.claude/projects/C--Users-Dell-Desktop-Book--claude-worktrees-book-content-pipeline-mindmap-26fb57/6a922ad9-5682-4e67-a94e-e18925c8952a.jsonl` (it contains "Recordly"). Response text: "Had DeepSeek research Recordly and international product demos, audit the site, and write a demo plan: the minimum site, the story, the recording steps and how to pair the video with the message."
- Agenda `_scratch/job-briefs/2026-09-22/agenda/index.html`: copy it to `agenda/index.pre-job16.html` first; content edits only, under the "Ground rules" of `_scratch/job-briefs/2026-09-22/job8b-agenda-refresh.md`. Header time and tally. "Done today", at the top: "Intro demo plan written" (one line: what it covers). "Waiting for you": one question, "Which of the site basics in the demo plan should be built before you record?"

## Report (at most 20 lines)
Files written; the three things the site most needs before recording; anything about Recordly you could not confirm; Agenda tags inside `<main>` balanced and everything outside `<main>` byte-identical to `index.pre-job16.html`.
