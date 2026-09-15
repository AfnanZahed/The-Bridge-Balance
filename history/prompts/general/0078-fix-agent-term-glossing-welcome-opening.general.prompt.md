---
id: 0078
title: Fix weak agent-term glossing in Welcome opening
stage: general
date: 2026-09-15
surface: agent
model: claude-sonnet-5
feature: none
branch: none
user: afnanzahed@gmail.com
command: none
labels: ["welcome-page", "mixed-audience", "term-glossing", "voice-canon"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - edu-site/docs/welcome.md (edited — restructured opening paragraphs for term-glossing continuity)
 - history/prompts/general/0078-fix-agent-term-glossing-welcome-opening.general.prompt.md (this file)
tests:
 - node scripts/check-chapter.mjs --chapter docs/welcome.md — 0 errors, 1 expected safety-floor-absent warning, 787 words
 - get_page_text against the live dev server (localhost:49677, hot-reloaded) confirmed rendered text matches the new source exactly
---

## Prompt

Ok, now here is the term using rules comes, and you didn't considered them, you wrote: "Use the agent for the part it does faster than you: writing the code. Keep the part..." and how the begineers will know about the Agent?

## Response snapshot

Confirmed the catch was real, not just a style nitpick. The opening technically glossed "AI coding agents" once, but buried the definition after a colon in a long sentence, then let two more sentences of abstract talk ("balance," "split," "discipline") pass before "Use the agent..." landed as a concrete instruction — exactly the "first silent assumption" failure mode `canon/audience.md` names as the beginner's quit trigger. A second, smaller problem compounded it: the term drifted in form across three sentences ("AI coding agents" → "AI agents" → "an agent" → "the agent") without ever being pinned down as the same referent.

Checked `curriculum-state/ledgers/concept-ledger.yaml`'s `coding agent` entry before rewriting, rather than inventing a gloss from scratch — it already documents that Welcome is expected to gloss lightly ("a program that writes and edits code for you") without carrying the full canonical definition, which stays with intro-1, and confirmed `docs/welcome.md` is already correctly in that term's `used_in` list. Also read intro-1's own actual glossing sentence for the term ("A **coding agent** is a program that reads your files, writes and edits code, and runs commands...") and matched its plain declarative shape ("A coding agent is a program that...") instead of the colon-clause or dash-interruption structures tried earlier — reusing the house pattern already shipped and proven, rather than a third new device.

Rewrote the opening's first two paragraphs: the gloss is now its own short, unmissable sentence immediately after naming the subject; the very next sentence reuses "it" and then "a coding agent" again before any abstraction is introduced; the balance/Spec-Driven-Engineering explanation follows immediately after, in the same paragraph as the reinforced term, rather than one paragraph removed. Dropped "AI agents" as a wording variant entirely — "coding agent," "it," and "the agent" are the only forms used now, all tightly chained to the same nearby anchor. Also fixed a secondary accuracy risk while rewriting: the old third paragraph's "directing AI agents on real engineering work" read as conflating coding agents with Stage 4's distinct "autonomous AI agents" concept; replaced with "real, practical work directing a coding agent yourself," which stays inside the term already established and doesn't overclaim into Stage 4's territory.

Sections after the opening were untouched — by the time "An agent's answer..." appears in the next section, the term has been reinforced six-plus times in the preceding two paragraphs, so no further drift risk there. No ledger edit needed; `welcome.md` was already correctly listed against the `coding agent` term.

Verified directly: re-ran `check-chapter.mjs` (0 errors, 1 expected warning, 787 words), and re-pulled the live dev server's rendered text via `get_page_text` — hot-reloaded automatically, matches the new source exactly.

## Outcome

- ✅ Impact: The opening now glosses "coding agent" clearly and keeps every subsequent use tightly anchored to that gloss, closing the beginner-continuity gap the user caught. Also fixed an unrelated but real term-conflation risk (coding agent vs. Stage 4's autonomous agents) spotted while rewriting.
- 🧪 Tests: See `tests:` above.
- 📁 Files: See `files:` above.
- 🔁 Next prompts: Still awaiting the owner's full read-through before treating the page as final.
- 🧠 Reflection: A term can be technically glossed once and still fail the audience rule in practice if the gloss is structurally weak (buried in a subordinate clause) or too far from where the term gets used concretely again. "Glossed at first use" needs to be read as "glossed *and kept alive* until the reader no longer needs it," not as a one-time checkbox.

## Evaluation notes (flywheel)

- Failure modes observed: shipped a technically-compliant-on-paper gloss that still failed a real beginner read — same category of miss as PHR 0076/0077 (gate-clean and rule-compliant by letter, not by actual effect). Worth treating as a pattern: mixed-audience compliance needs a real skim-read check, not just a presence check for "was the term defined somewhere."
- Graders run and results (PASS/FAIL): `check-chapter.mjs` PASS (0 errors, 1 expected warning).
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): when self-checking future prose against the mixed-audience rule, explicitly trace each technical term's full usage chain (not just its first mention) before calling a section done.
