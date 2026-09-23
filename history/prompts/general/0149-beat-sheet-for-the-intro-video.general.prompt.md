---
id: 0149
title: Beat sheet for the intro video
stage: general
date: 2026-09-23
surface: agent
model: claude-opus-5-5
feature: none
branch: main
user: owner
command: none
labels: ["demo","video","script"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/general/0149-beat-sheet-for-the-intro-video.general.prompt.md
tests:
  - none
---

## Prompt

the video screenrecording plan is not correct, for example, at first, in the first step, the script ""

<pasted_content id="8ffe">
Welcome to The Bridge Balance: a free course that takes you from your first line of code to building AI agents of your own.

AI can now write code in seconds. So the skill that matters most is no longer typing code. It is reading it: checking code that someone, or something, else wrote, and judging whether it does what was asked.
We call this Code Literacy: reading and judging code.
Most courses still teach you to type. This one teaches you to read, to judge, and to own what you build.

The second problem is order. Most courses teach one thing at a time: programming first, then Git, and AI at the very end. Real work doesn't happen in that order.
</pasted_content id="8ffe">

"" it's voice is 56 sec longer. and nothing to do exactly in this time on the screen window with cursor. this length is indicating that our content shortage will not be an issue, because a few minutes of video is easily possible, but exactly something practically being doing on the screen along with the voice is also must. how will we solve this problem?

## Response snapshot

Had DeepSeek list everything the camera can show on the live site, then wrote a beat sheet: every sentence of the voice-over gets its own short clip from the site, a real AI coding agent at work, or a text card, cut to the voice in the editor.

## Outcome

- ✅ Impact: The intro video's plan became a beat sheet that pairs each sentence of the voice-over with a concrete thing the camera shows, so no stretch of audio plays over a static screen.
- 🧪 Tests: none.
- 📁 Files: this record.
- 🔁 Next prompts: record the intro clips and cut them to the voice.
- 🧠 Reflection: the earlier plan described the voice-over but not what the viewer sees for each sentence, so the beat sheet closes that gap sentence by sentence.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): not run.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
