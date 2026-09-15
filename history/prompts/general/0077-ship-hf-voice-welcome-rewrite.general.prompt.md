---
id: 0077
title: Ship the HF-voice Welcome page rewrite
stage: general
date: 2026-09-15
surface: agent
model: claude-sonnet-5
feature: none
branch: none
user: afnanzahed@gmail.com
command: none
labels: ["welcome-page", "voice-canon", "rewrite", "tone"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - edu-site/docs/welcome.md (edited — full body rewrite in the direct HF-style voice planned in PHR 0076)
 - history/prompts/general/0077-ship-hf-voice-welcome-rewrite.general.prompt.md (this file)
tests:
 - node scripts/check-chapter.mjs --chapter docs/welcome.md — 0 errors, 1 expected safety-floor-absent warning, 777 words
 - Browser verification via the edu-site dev server (localhost:49677): preview_logs confirmed a clean webpack compile with no errors; get_page_text on the rendered page confirmed content matches the new source exactly, including both question-format headers, the ChapterState "Text ready" badge, and the "From Binary to Programming" NEXT pagination link
---

## Prompt

apply this voice in the actuall sidebar welcome page, so that I will see the content and read it in localhost then i will tell you

## Response snapshot

Implemented the rewrite planned and shown in chat in PHR 0076, in full, directly in `edu-site/docs/welcome.md`. Replaced the entire body (frontmatter untouched — still accurate to the new text):

- Opening: dropped the courier/delivery-signing metaphor and the "guess what balance means... wrong... guess again" riddle entirely. New opening states plainly what the book is, its free/zero-background/Harvard-credential arc, and what "balance" actually means (not a split, a discipline — agent for speed, human for judgment), naming Spec-Driven Engineering with a clean one-line definition, closing on the same "start now" CTA as before.
- Kept the tracking-page-vs-opened-box analogy (still a real, useful explanation) but moved its role to elaboration after the reader has footing, retitled as a question header ("Why can't the checking move to the machine?"), and tightened its close to explicitly answer that question.
- Mixed flat and question headers deliberately rather than converting every header to a question (which would trade one mechanical tic for another): two section headers became questions ("Why can't the checking move to the machine?", "What does this book actually cover?"), the rest stayed flat and close to their original wording ("What you need before you start," "How to read this book," "What's not here yet," "Who's behind this"), plus a short question as the closing header ("Ready?").
- Replaced the closing "answer a question from memory, without scrolling back up" quiz device with a direct, warm nudge to start reading — same closing link, no gimmick.
- Used moderate contractions throughout (you'll, don't, isn't, there's, that's) as a deliberate, reasoned choice in service of the user's explicit "very very natural" instruction — the original draft used zero contractions anywhere, which was part of what made it read stiff.
- All facts, claims, and links carried over unchanged and re-verified: CS50P/CS50W/edX pricing facts, the five-stages/no-fixed-count D5 compliance, the no-signup/no-account facts, the three what's-not-here-yet items, and the Afnan Zahed/LinkedIn credit.

Did not touch frontmatter (`scope_reason`/`scope_multiplier` already described this same structure accurately), the changelog (the existing 2026-09-15 entry already describes the page's substance correctly — this was a voice change, not a claims change), or any of the four ledgers (no structural change: same path, position, concepts glossed, no-worked-example status).

Verified directly: ran the real gate (`check-chapter.mjs`) myself — 0 errors, 1 expected warning, 777 words (down from 816, from dropping the riddle and quiz devices). Started the actual dev server (port 3000 was already occupied, likely by a separately-running server of the user's own, so this instance auto-assigned port 49677) and confirmed via `preview_logs` a clean webpack compile with no errors, then pulled the rendered page's actual text via `get_page_text` and diffed it mentally against the source — exact match, including the new question headers rendering correctly and the page's position ahead of "From Binary to Programming" in the reading order (visible in the NEXT pagination link) still intact.

Per the user's own framing ("then i will tell you"), this is presented as ready to review on localhost, not yet treated as final — no changelog/ledger closure step taken pending their reaction.

## Outcome

- ✅ Impact: `edu-site/docs/welcome.md` now carries the direct, warm, HF-derived voice from PHR 0076's plan, live and gate-clean, ready for the owner's own read on localhost.
- 🧪 Tests: See `tests:` above.
- 📁 Files: See `files:` above.
- 🔁 Next prompts: Awaiting the owner's read-through. If approved as-is, no further action needed (changelog/ledgers already accurate). If more tone or content changes come back, they'll land as a further direct edit to this same file, not a new pipeline run.
- 🧠 Reflection: None beyond PHR 0076's — this turn was pure execution of an already-agreed direction, not a new judgment call.

## Evaluation notes (flywheel)

- Failure modes observed: none. Dev server's default port (3000) was already in use — likely a pre-existing server from the user's own terminal — so verification ran against an auto-assigned port instead; flagged to the user directly rather than assumed away.
- Graders run and results (PASS/FAIL): `check-chapter.mjs` PASS (0 errors, 1 expected warning).
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none pending — waiting on human read-through before deciding if another pass is needed.
