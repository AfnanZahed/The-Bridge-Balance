---
id: 0076
title: Rethink Welcome page opening in natural HF voice
stage: general
date: 2026-09-15
surface: agent
model: claude-sonnet-5
feature: none
branch: none
user: afnanzahed@gmail.com
command: none
labels: ["welcome-page", "voice-canon", "rewrite", "tone", "feedback"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/0076-rethink-welcome-page-hf-natural-voice.general.prompt.md (this file)
tests:
 - none (planning/creative-direction exchange only; edu-site/docs/welcome.md not yet touched)
---

## Prompt

The welcome written text is ULTRA Stupid like this:You ask a coding agent — a program that writes and edits code for you — to make one change. It writes the change, and the change looks right.

Two people get that same result and go opposite ways. The first ships it unread. The second rewrites every line by hand.

Both are wrong. The first signs for a delivery it never opened; the second refuses the courier and carries the parcel by hand.

This book is named for the ground between them: The Bridge Balance. Before you read on, guess what balance means here.

Most people guess a split. Some of the judgment stays with you, and the rest goes to the machine. That guess is wrong.

A balance is not a split. It is a discipline. Use the agent for the part it does faster than you. Keep the judgment that decides what to build and whether the result is right.

Here is the claim this book is built on, and the name of the discipline behind it. AI has made the writing of code cheap. It has not made the judgment cheap. That discipline is Spec-Driven Engineering — write the intent and the limits down before code is generated, then check the result and own it.

Start now. Read the first chapter. It needs no setup, no signup, no account, and no prior programming experience.

 making no sense from start, difficult for the beginners to understand, and very very robotic feel.


Firstly, with 100% fresh mind, rethink the whole Welcome page, without any skill or pipeline or framework using, just pure thinking and creativity, and let's plan the welcome page freshly.
hint, start like higging face did: Welcome to the most exciting topic in AI today: Agents!

This free course will take you on a journey, from beginner to expert, in understanding, using and building AI agents.

Very very natural

## Response snapshot

Diagnosed why the shipped opening failed on its own terms rather than defending it: it opened on an unexplained abstract scenario, stacked a second metaphor (delivery/courier) on top before the reader knew what the book even was, then ran a "guess what balance means... wrong... guess again" device that reads as a riddle, not a welcome — compounded by clipped aphoristic sentences ("Both are wrong." "That guess is wrong.") that trade warmth for a performed cleverness. None of that is what a front door needs to do first.

Took the Hugging Face opening at face value as the target mechanism, not just a vibe: name the subject directly with real enthusiasm, then one sentence stating format + arc + what the reader will actually do — no metaphor required to say what the book is. Rewrote the Welcome opening from scratch in that register, keeping the real content (nothing needed to start, the agent-does-speed/human-does-judgment discipline, the Spec-Driven Engineering claim) but delivering it as direct, warm statement instead of a riddle:

"Welcome to The Bridge Balance — a free course that takes you from zero to real, working skill with AI coding agents: the software that now writes and edits code for you on request. You need no coding background to start. The book runs from how a computer works at its most basic level, through two genuine Harvard credentials, to directing AI agents on real engineering work — and by the end, you'll know when to trust what an agent hands you back, and when to check it instead. That's the discipline this book is named for, and it's simpler than it sounds. Don't accept an agent's code without reading it, and don't rewrite everything it gives you by hand either — both throw away what the agent is actually good for. Use it for the part it does faster than you: writing the code. Keep the part only you can do: deciding what to build, and checking that what got built is right. That discipline has a name — Spec-Driven Engineering — and this book teaches it from the first chapter."

Proposed carrying the same fix through the rest of the page, not just the opening: drop the "guess what balance means" device and the delivery/courier-signing metaphor entirely; keep the later tracking-page-vs-opened-box analogy (still useful, but now landing after the reader already has footing, not as the very first thing they meet) under a question-format header; convert several flat section headers to genuine question headers where natural ("What does this book actually cover?", "How should you read this book?"), following the FAQ's own already-validated precedent, without mechanically converting every header; and replace the closing "answer a question from memory" quiz device — itself another instance of cleverness standing in for warmth — with a direct, forward-leaning HF-style nudge to start reading. Sections not called out as broken (what's-not-here-yet, who's-behind-this, the five-stages facts) keep their honest content, adjusted only for tone.

Flagged transparently, not as a blocking question: this deliberately departs from voice.md commitment 1 ("never open like a definition/welcome" — written for teaching chapters) on the owner's direct instruction, because Welcome is a front door, not a chapter, and a front door is allowed its own opening rule.

Treated this explicitly as a pure-thinking task per the user's own instruction — did not invoke chapter-production or lesson-spine-authoring, and did not delegate via command-code-delegation (the task itself, per that skill's own trigger test, is low-volume judgment work with no real execution labor in it yet). Did not fire AskUserQuestion either, in line with Auto Mode's bias toward making the reasonable call rather than pausing — the user's own hint text was concrete enough to act on directly; asking multiple clarifying questions back would have re-added the kind of process friction the request was pushing back against. Presented the rewritten opening plus the restructuring plan in chat for reaction, and did not touch `welcome.md` itself yet, since the user's verb was "plan," matching this thread's own established pattern of treating planning and shipping as separate, separately-confirmed steps.

Saved a feedback memory (`feedback-welcome-page-voice-rejected-robotic`) capturing the correction independent of how the rest of this revision lands, since it's a standing, generalizable lesson about front-door tone versus teaching-chapter tone in this project.

## Outcome

- ✅ Impact: A concrete, ready-to-ship alternative opening exists in natural, HF-derived voice, plus a full restructuring plan for the rest of the page — presented for reaction, not yet written to the live file.
- 🧪 Tests: None — no code or content file changed this turn.
- 📁 Files: See `files:` above. `edu-site/docs/welcome.md` deliberately untouched pending the owner's reaction.
- 🔁 Next prompts: If the owner confirms the direction, implement the full rewrite in `welcome.md`, re-run `check-chapter.mjs` + `npm run build`, and update the changelog entry's description if the page's substance shifts enough to make the existing bullet stale.
- 🧠 Reflection: The first draft's failure wasn't a voice.md compliance problem — it technically followed the letter of several commitments (second person, concrete analogy, held a position) while still failing the actual reader test. The lesson is that "open in the middle of something, never a definition" is a rule sized for teaching chapters with a captive reader already mid-book, not for a page whose entire job is to be the first thing a stranger meets — front-door prose needs its own opening rule, not a bent version of the chapter rule.

## Evaluation notes (flywheel)

- Failure modes observed: a fully gate-clean, ledger-correct, voice.md-compliant-on-paper chapter still read as "ULTRA Stupid" to the actual owner — a reminder that the gate and the ledgers check mechanics, not whether the prose actually lands, and neither substitutes for a real read against the target register.
- Graders run and results (PASS/FAIL): none run this turn (no file changed).
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): for any future front-door or reference-page prose (not a teaching chapter), default to a direct-statement opening and reserve metaphor for elaboration after the reader already has footing, rather than leading with one.
