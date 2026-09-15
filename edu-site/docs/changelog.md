---
sidebar_label: "Changelog"
sidebar_position: 97
title: "Changelog"
description: "What shipped on The Bridge Balance, and when — chapters going live, stages being promoted, and platform features landing."
---

# Changelog

A dated record of what actually shipped — a chapter going `text-ready`, a stage being promoted, a real platform feature landing. Internal work (refactors, lint fixes, a retried build) doesn't appear here; this page is for changes a reader would notice or care about.

### 2026-09-15

- A [Welcome](/welcome) page now opens the book, ahead of Stage 0. It states the founding claim — what "balance" actually means, and why checking an AI agent's work can't move to the machine — inside the first screen, then what you need to start (nothing), how the five stages fit together, how a chapter is meant to be read, an honest list of what the site doesn't have yet (no community, no help chatbot, no certificate), and who actually writes and maintains the book.
- The Welcome page's key terms — *coding agent* and *Spec-Driven Engineering* — now link to the [Glossary](/glossary) at their first use, and its "why can't the checking move to the machine" section now names the gap between what the word "agent" implies (something that decides on its own) and what actually runs (software whose independence is a setting you control, not a trait it has).
- The reading page's type was rebalanced so headings lead it again. Body prose, code, tables, callouts, the sidebar and the "On this page" list all step down 20%, and the measure steps down with them so a line still holds the same number of characters. The reason: a section heading was rendering at 17.28px next to 17px body text, so the four levels read as one. They now sit on a single ladder — 13.6px body, then 17.28, 24.32 and 31.68 at h3, h2 and the chapter title — and the chapter title, which had fallen to within 3% of a section heading, carries the page the way a title should.
- The sidebar's collapse control is a labelled handle now, and the space it leaves behind is a designed rail. Collapsing used to leave a blank 30px strip with a grey arrow floating at its centre, while the control that did the collapsing was a full-width bar with square corners and a chevron pointing at nothing. Closing the panel is now a capsule at the panel's foot that names what it does, and the collapsed rail is 44px wide with the panel's own mark at its head — the same 44px target the rest of the site's controls use, and the same mark, aimed the other way, brings the panel back.

### 2026-09-14

- **Stage 0 — Orientation** is now an official stage of the curriculum, sitting before Stage 1 and covering computing history from binary through today's AI-coding-agent era, plus the Spec-Driven Engineering and Reading & Understanding Literacy philosophy the rest of the book depends on. The curriculum is five stages (0 through 4), not four.
- Every chapter and lesson now carries a **Theory** or **Practice** label, so a reader can tell at a glance whether a page teaches a concept or walks through doing something.
- The homepage curriculum dashboard now reflects five stages and drops the old fixed chapter count — this book never commits to a total chapter number in advance, since the curriculum keeps growing (see the site's own no-fixed-count rule).
- Two new reference pages: a [Code of Conduct](/code-of-conduct) and an [Accessibility Statement](/accessibility), the latter naming the real WCAG 2.2 AA baseline and the automated checks that enforce it.
- The homepage's two curriculum charts were rebuilt: the bar chart now shows each stage's real authoring status instead of a chapter count, and the donut shows the five stages as equal parts of one whole instead of an hours breakdown — both were dropping Stage 0 and stating numbers this book doesn't commit to.
- A [FAQ](/faq) page shipped, independently fact-checked against the repo before publishing.
