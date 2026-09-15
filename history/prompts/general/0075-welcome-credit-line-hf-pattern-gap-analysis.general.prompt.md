---
id: 0075
title: HF pattern gap analysis and Welcome credit line
stage: general
date: 2026-09-15
surface: agent
model: claude-sonnet-5
feature: none
branch: none
user: afnanzahed@gmail.com
command: none
labels: ["welcome-page", "voice-canon", "D5", "attribution", "copyright"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - edu-site/docs/welcome.md (edited — added "Who's behind this" section, updated scope_reason)
 - edu-site/docs/changelog.md (edited — amended the 2026-09-15 Welcome entry)
 - history/prompts/general/0075-welcome-credit-line-hf-pattern-gap-analysis.general.prompt.md (this file)
tests:
 - node scripts/check-chapter.mjs --chapter docs/welcome.md && npm run build, run directly by Claude (0 errors, 1 expected safety-floor-absent warning, both times — after the AskUserQuestion round and after the credit-line edit)
---

## Prompt

Copy this exact pattern and things in our welcome: https://huggingface.co/learn/agents-course/unit0/introduction

(Later, same thread, after Claude asked what name/role to credit and got no immediate answer:)

Done?

(Then, answering that outstanding question:)

Yes, Afnan Zahed, link: https://www.linkedin.com/in/afnan-zahed/

## Response snapshot

Read the live Hugging Face page directly (not the stale pasted copy from PHR 0072) via the browser tools, then went through it section by section against the already-shipped `welcome.md`. Found the instruction couldn't be honoured literally: most of what's distinctive about HF's page is either a documented, binding violation of this project's own rules, or a fabrication of facts about this book that aren't true —

- The chapter-by-chapter syllabus table directly violates D5 (no finalized table of contents), the same locked rule `welcome.md` already leans on.
- "Let's get started!" and the emoji-forward tone directly violate `voice.md`'s banned-phrase table and the formal-but-warm register used on every other shipped page.
- "Living project — open issues/PRs on GitHub, join our Discord" contradicts CLAUDE.md's own stated fact that the public GitHub copy is a one-time snapshot, not a community channel.
- "Who are we" / acknowledgments, the certification tiers, and the recommended weekly pace would all require inventing facts (a team, a cert this book doesn't issue, a schedule this book explicitly says it doesn't have) rather than adapting a pattern.

Rather than silently filtering these the way the original CS50P/HF synthesis had (which the owner accepted without pushback), treated this as a genuine fork needing the owner's own input, since three of the conflicts were real product questions only the owner could answer, not style calls: whether there's a real person/team to credit, whether a Discord actually exists now, and whether the book should adopt a real pace. Asked via one three-part AskUserQuestion. Answers: credit by name (name TBD), no Discord change, no pace change.

"Done?" arrived before the name was supplied — read as a status check, not an answer, given "Done" isn't a name and nothing else in the thread suggested otherwise. Held the line rather than guessing or inferring the name silently from the account email, and asked directly, offering the email-derived name as a fast-confirm candidate per the session's own userEmail-for-attribution guidance rather than either fabricating it outright or making the owner retype something already inferable.

Once the name and LinkedIn link arrived, implemented directly (small enough not to warrant another delegation round-trip): added a "Who's behind this" section to `welcome.md`, between "What is not here yet" and the closing "Start here" retrieval section so the deliberate closing device stays last. Updated `scope_reason` from "four short beats" to "five" to keep it accurate. In the same pass, walked back two of the three structural changes flagged as "doing this regardless" two turns earlier — a checklist restructuring of "first actions" and a separate "what to expect" section — after actually trying to implement them and finding neither held up: this book has exactly one first action already stated (unlike HF's several), and "what to expect" ground is already covered by two existing sections, so both would have padded the page against its own stated constraint to stay tight. Said so plainly rather than forcing them in to keep an earlier promise.

Verified by running the gate and full build directly (not delegated, given the small size): 0 errors both times. Amended the same-day changelog entry rather than adding a redundant new dated block for a same-day addendum to an already-logged page.

## Outcome

- ✅ Impact: Welcome now honestly credits its actual, single author with a real link, without importing any of Hugging Face's page elements that would have broken this project's own locked rules or invented facts about the book. Two speculative structural promises were correctly reversed on contact with the real content rather than forced through.
- 🧪 Tests: `check-chapter.mjs` + full `npm run build`, 0 errors, run twice by Claude directly.
- 📁 Files: See `files:` above.
- 🔁 Next prompts: None scheduled. The Discord/pace/team questions are now closed for this page specifically; no standing follow-up.
- 🧠 Reflection: The most load-bearing move here wasn't the HF gap analysis itself (mechanical, once the actual page was read) — it was recognising that "copy this exact pattern" needed to be split into genuine open product questions (credit, community, pace — real unknowns only the owner could answer) versus settled rule conflicts (D5, voice.md, the GitHub-snapshot fact) that didn't need to be re-litigated as questions at all. Treating every conflict as an equally-weighted question would have been noisy; treating none of them as questions would have either broken the rules or missed what the owner actually wanted.

## Evaluation notes (flywheel)

- Failure modes observed: none in the shipped result. A near-miss worth naming: two structural changes were promised before they were actually attempted against the real content, and turned out not to fit — caught before landing them, but the lesson is to prototype a promised structural change mentally against the actual page before committing to it in chat.
- Graders run and results (PASS/FAIL): `check-chapter.mjs` PASS, `npm run build` PASS (both runs).
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): when proposing "I'll do X regardless" for a multi-part response, hold that line until the low-stakes parts are actually drafted, not just planned — this turn's walk-back would have been avoidable friction if caught one turn earlier.
