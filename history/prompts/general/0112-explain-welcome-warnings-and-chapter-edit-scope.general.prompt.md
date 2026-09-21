---
id: 0112
title: Explain welcome warnings and ch01-ch02 edit scope
stage: explainer
date: 2026-09-18
surface: agent
model: claude-opus-5
feature: none
branch: none
user: afnanzahed@gmail.com
command: none
labels: ["explainer", "gate-warnings", "front-door", "ch01-foundations", "ch02-programming-is-born", "scope-disclosure"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/0112-explain-welcome-warnings-and-chapter-edit-scope.general.prompt.md
tests:
 - none (two informational answers; no project file changed)
---

## Prompt

Two consecutive owner messages, 2026-09-17, recorded together because both were informational follow-ups to PHR 0111 and neither changed a file. Verbatim:

1. welcome.md still warns on orientation-thin and bold-lead (52%): in simple words, what is meant by this?
Continue from where you left off.

2. in the new 2 chapters you editied, you just work of front-door or also change the tone of the whole chapters' content? also, the is front door

## Response snapshot

1. `orientation-thin` means the text between welcome.md's title and its first section has no bullet list (or fewer than 40 words), which the new gate check from PHR 0111 flags. `bold-lead (52%)` means 12 of welcome.md's 23 prose paragraphs open on a bolded sentence, above that check's 40% threshold. welcome.md was left untouched because the owner had already approved it; a small cleanup pass was offered, not done.
2. Disclosed that ch01 and ch02 were rewritten throughout, not only at the opening: an orientation block was added at the top, bolded paragraph openings were removed in every section, and dates, names and citations were cut across every section. That included whole paragraphs: the Hollerith/census/IBM paragraph and the Bardeen/Brattain/Pierce/thermistor/varistor naming story in ch01, and the Wheeler/EDSAC paragraph in ch02 (its insight was folded into the assembler section). Every removed name and date was listed, every preserved teaching beat named, and restoration offered. "Front door" was defined as a page a reader meets before committing to read (welcome.md, ch00-introduction.md), as distinct from teaching chapters.

## Outcome

- ✅ Impact: owner informed of the full scope of the 17 September chapter edits and of the front-door versus chapter distinction.
- 🧪 Tests: none.
- 📁 Files: this PHR only.
- 🔁 Next prompts: the owner asked for a file-by-file walkthrough of every rule that shapes content (PHR 0113).
- 🧠 Reflection: the scope disclosure belonged in the same turn as the edit. PHR 0113 later found that the bold removal described here reversed an owner-requested design (PHR 0094).

## Evaluation notes (flywheel)

- Failure modes observed: an edit's summary understated its size. Whole paragraphs were cut, and the summary read as rewording.
- Graders run and results (PASS/FAIL): none.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): list removed content explicitly in the same turn as any prose edit, before the owner has to ask.
