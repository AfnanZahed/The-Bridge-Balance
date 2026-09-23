---
id: 0143
title: Intro demo plan with Recordly
stage: general
date: 2026-09-23
surface: agent
model: claude-sonnet-5
feature: none
branch: main
user: owner
command: none
labels: ["demo", "recordly", "trust"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - _scratch/job-briefs/2026-09-23/job16-demo-plan.md
  - history/prompts/general/0143-intro-demo-plan-with-recordly.general.prompt.md
tests:
  - none
---

## Prompt

actually, to gain the trust, I want ultra professional and international level product intro demos like international level products do, using the Recordly, you may already know how the recordly works. but for that, to record the website's intro, the website should have the basic structure. you tell me what basics things should the website have, not complete content or detailed things, but to update my students that the progress is real, what should be presented on the website and how to record using the Recordly. so that, I will be able to introduce the website/Book properly, and make the messages like the above one proper, professional, smooth, purposeful and remeberable and meaningful and 100% professional.

## Response snapshot

Had DeepSeek research Recordly and international product demos, audit the site, and write a demo plan: the minimum site, the story, the recording steps and how to pair the video with the message.

**Recordly, identified and pinned down.** Several unrelated products share the name; the one meant here is
`recordly.dev`, repository `webadderallorg/Recordly` (30.9k stars, AGPL 3.0), a free open-source screen
recorder and editor — the Screen Studio alternative. Windows 10 build 19041 or newer (so Windows 11 is
fine), native Windows Graphics Capture plus WASAPI audio, latest release v1.4.0 on 8 September 2026.
Confirmed features: window or whole-display capture, mic and system audio, auto-zoom suggestions from
cursor activity plus manual zoom regions, cursor smoothing / motion blur / click bounce / size / loop,
webcam bubble, trim and speed regions, annotations, crop, frame styling (wallpapers, solid, gradient,
padding, corners, blur, shadow, aspect presets), captions with SRT/VTT export, `.recordly` projects,
MP4 and GIF export. Reported as unconfirmed: any capture-resolution or MP4 frame-rate setting, recording
to a fixed region, and whether the Windows installer is signed.

**The audit found the demo's real blocker.** The live site at `the-bridge-balance.vercel.app` is a build
behind: it still shows **five** stages and links to `/stage-01-spec-aware-vibe-engineering/`, while the
three-stage build exists only in the repository — `/stage-01-sde-mastery-ai-driven/` returns 404 on the
live address. Everything else follows from that: the homepage's two hero buttons and its closing
"Begin Stage 1" all open a Stage 1 page with no content; the bar chart prints "In development" for
Stages 1 and 2; "Built for working developers" and "Est. Hours 48h" contradict the FAQ's own beginner
reader and no-total-hours rule; the changelog — the page the demo leans on as proof — carries two stale
lines (an older Stage 0 name, and "five stages (0 through 4)"); Stage 1 and Stage 2 both open with a
"placeholder chapters carried over unchanged" note and the only visible "Stage 3"; and search offers a
route that 404s plus empty chapters.

**The plan** (`_scratch/job-briefs/2026-09-23/job16-demo-plan.md`): eight minimum-site items, seven of
them small fixes; a 75-second ten-scene storyboard (promise, three stages, changelog, search, theme,
what comes next) with an 18-second vertical status cut; Recordly settings, shoot discipline, edit and
export steps sized for WhatsApp's ~16 MB inline cap; and an eight-line note on pairing the video with
the message. Nothing was clicked into a chapter body, and the assistant appears only as a labelled preview.

## Outcome

- ✅ Impact: A recordable plan that obeys the project's own limits — Phase A only, no chapter text, no
  pretending the assistant works — plus the one finding that blocks the demo outright: the live site is
  not the three-stage site.
- 🧪 Tests: none — the site was read, not changed. No site file was written by this job.
- 📁 Files: the demo plan, plus this record.
- 🔁 Next prompts: the owner picks which basics to fix first; then deploy, then record.
- 🧠 Reflection: the site is close to demo-ready and the blocker is not content at all — it is a deploy
  and three wording lines. The audit's real value was the "must not be shown" list: the demo would have
  failed the moment anyone clicked the homepage's main button.

## Evaluation notes (flywheel)

- Failure modes observed: the plan's page-by-page audit was delegated but every load-bearing claim was
  re-checked directly in the repo and, decisively, against the live deploy — where the five-stage build
  was visible in one fetch that no amount of reading the repository would have revealed. Reading the
  repo alone would have produced a plan for a site that does not exist on the internet.
- Graders run and results (PASS/FAIL): not run.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): make "fetch the live URL" the first step of any plan whose
  subject is what a visitor sees.
