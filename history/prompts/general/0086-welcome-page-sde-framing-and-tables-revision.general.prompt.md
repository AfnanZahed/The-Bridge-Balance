---
id: 0086
title: Welcome page SDE framing and tables revision
stage: general
date: 2026-09-15
surface: agent
model: claude-sonnet-5
feature: none
branch: none
user: afnanzahed@gmail.com
command: none
labels: ["welcome-page", "spec-driven-engineering", "voice", "content-revision", "personal-branding"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - edu-site/docs/welcome.md (rewritten — opening, SDE section merge, two new tables, reading-hierarchy section, roadmap tone, bio)
 - edu-site/docs/changelog.md (new bullet appended under the existing 2026-09-15 date)
 - history/prompts/general/0086-welcome-page-sde-framing-and-tables-revision.general.prompt.md (this file)
tests:
 - node scripts/check-frontmatter.mjs — passed
 - node scripts/check-references.mjs — passed
 - node scripts/check-chapter.mjs --chapter docs/welcome.md — 1 checked, 0 errors, 1 pre-existing warning (safety-floor-absent, expected for a front-door page, unchanged from before this revision)
 - Browser DOM check (dev server, localhost): confirmed the inline "Spec-Driven Engineering" link resolves to `#what-is-spec-driven-engineering`, that `document.getElementById('what-is-spec-driven-engineering')` finds the real heading, and that both new tables render as real `<table>` elements (6 rows × 3 cols; 6 rows × 2 cols)
---

## Prompt

"now coming back to the welcome. I have changings to do with it.

1. Welcome to The Bridge Balance — a free course that takes you from zero to real, working skill with a coding agent. It's software that writes and runs code for you, largely on its own.: here you used the word course, make sure our platform 'The Bridge Balance' and our book IS a course or any other name will be more correct? secondly, you said from zero to working skill with a coding agent, here are multiple problems, 1st is that this is a welcome to the book, not the stage 0, stage 0 is for zeros, not the welcome, the welcom also included the Adavcned Agentic AI things too, including the stage 3 and 4. then you said 'with a coding agent', it's nonsense here, the skill we will teach is spec driven engineering. not just coding agents. then you said 'it's software', why? it is software, yes, 100%, but an "AI".
2. Don't trust everything it writes without checking it, and don't rewrite everything it gives you by hand either — both waste what a coding agent is actually good for. Use it for the part it does faster than you: writing the code. Keep the part only you can do: deciding what to build, and checking that what got built is right. That's what balance means in this book's name — not a split where some judgment goes to you and some to the agent, but exactly this discipline, every time. It has a name: Spec-Driven Engineering — write down what you want and its limits before the agent writes anything, then check what comes back before you trust it.: Why this bla bla bla? this is actually the last part of the stage 0, to tell them the SDE's background. you phrased the actual problem very very very stupidly. read the "C:\Users\Dell\Desktop\The Bridge Balance\Official docs\problem_statement.md"
"C:\Users\Dell\Desktop\The Bridge Balance\Official docs\solution_statement.md" and then use the word AI and AI coding Agents (under same terms using rules), to tell them this book's intro, WHY our platform, and what, because these 2 files covers both the What and Why at the same time. intro will be start, after the welcome, by telling that here they will learn the spec driven engineering. basically Software enginering + AI (both using it and building it), and there the spec driven engineering word will be underlined and blue, and will redirect after clicking to the very next paragraph where you will tell them the What and WHy we.
3. You need no coding background to start. The book runs from how a computer works at its most basic level, through two genuine Harvard credentials, to real, practical work directing a coding agent yourself — this same discipline carries you through every stage of it.: this para is good, but you wrote it casually, both the no coding background and from 0-1 to AI points are very positive and important, make a proper new heading for it, and write beautifully in bullet points or with subheadings or in table. properly, highlighted
4. Start now. Read the first chapter. It needs nothing from you — no setup, no signup, no account, no prior programming experience.: you didn't even waited to complete the welcome and redirected them to content. very bad move. really.
5. Complete "Why can't the checking move to the machine?"'s content: merge it to our second point, they will be just 1.
6. What you need before you start: in this, completely, using the marketing tricks, and impress them with maximized points (quantitavly and qualitatively), of what they need (interent/wifi, laptop, passion, curiosity, consistency etc) and what they don't need (paid subscription to the main content, etc), as a proper beautiful table
7. What does this book actually cover?: Make it the subpart of the second point (SDE), and as an ultra beautiful colorful table too.
8. How to read this book: here, tell them about our pedeaogy and chronology and stages, chapters, lessons, parts etc, the things that I thought and show how great my critical thinking is, to my personal branding everwhere using all pretexts
9. What's not here yet: You are insulting me here, use professinoal but very easy english along with MY respect
10. Who's behind this: introduce my self as an Senior Agentic AI Engineer, remove my link from here, and tell them as this platform is regularly being in development, I focused MORE on teaching them and adding more usefull content rather than doing my own personal branding, that's why my portfolio and certifications, and projects and MY intro will be shared soon.
11. NOTE: Avoid lentghy paragrahphs, insead, use the tables, bullet points or other beauty and attractive pretexts"

## Response snapshot

Read the current `welcome.md`, both official-docs source files (`problem_statement.md`, `solution_statement.md`), `curriculum-state/canon/thesis.md` (the five-stage table and the two-extremes framing), the term ledger and glossary (to confirm `agent`, `spec-driven-engineering`, and `vibe-coding` anchors), `changelog.md`, `sidebars.ts` (for the real stage/chapter hierarchy), `voice.md` (sentence-craft and banned-phrase rules), and `contracts/calibration.md` (to set an honest `scope_multiplier` for the new, larger page) before writing anything, per the project's no-blank-page rule — these official docs are the project's own sanctioned source material, not external research subject to the transformation policy.

Rewrote the whole page:

1. **Opening** — "curriculum" replaces "course" (matches CLAUDE.md's and thesis.md's own usage); scope now spans zero background to "engineering autonomous AI agents," not "working skill with a coding agent"; the two Harvard credentials are named as sitting inside that arc; Spec-Driven Engineering is named as the one discipline carrying the whole arc, described as "software engineering plus AI"; "AI coding agent" replaces bare "coding agent," and its inline gloss now says "AI software" instead of just "software" and was tightened to 11 words (was 13, already over the 12-word ceiling before this pass).
2. **"What is Spec-Driven Engineering?"** — a new merged `##` section, the page's core, with three `###` subsections: *The problem it solves* (drawn from `problem_statement.md`'s two-failure-mode framing and the METR 19%-slower 2025 statistic, with `vibe coding` linked to the glossary), *Why the checking can't move to the machine* (the existing agent-etymology and tracking-page reasoning, condensed and folded in — satisfies point 5's merge request), and *What this book actually covers* (the five-stage table, reader-facing and outcome-framed — satisfies point 7). The opening paragraph's "Spec-Driven Engineering" mention links to `#what-is-spec-driven-engineering`, an on-page anchor into this section, per point 2's explicit "redirect to the very next paragraph" request, rather than to the glossary.
3. **"You don't need a coding background to start"** — new heading, two bolded bullets (start at zero; finish directing AI agents).
4. Moved the "start reading" call-to-action out of the opening entirely; the page's only CTA now sits at the very end, in the pre-existing "Ready?" closer.
5. Handled inside item 2 above (merge).
6. **"What you need before you start"** — replaced the one-line "Nothing." paragraph with a 5-row, 2-column table (`You need` / `You don't need`), each item checked against what's actually true today (no invented claims — e.g., did not promise "no cloud costs ever," since Stages 3–4 involve AI-agent API use that hasn't been scoped as free).
7. Handled inside item 2 above (subsection of the merged section).
8. **"How to read this book"** — explains the real Stage → Chapter → Lesson/Part hierarchy (per CLAUDE.md's own terminology split) and *why* the book is ordered chronologically, self-contained per chapter, and single-register across both readers — argued through demonstrated design reasoning (chronological-first ordering, no re-teaching SDE but re-exercising it at higher stakes each stage) rather than through direct self-praise, as the tasteful reading of "personal branding through every pretext" for a book's own front door.
9. **"What's still being built"** — reframed from "a front door that promises more than it holds is worse than none" (read by the owner as insulting/defensive) to a roadmap-toned "on the roadmap, not off it... built properly, or not shipped yet."
10. **"Who's behind this"** — now names Afnan Zahed as a Senior Agentic AI Engineer, removes the LinkedIn link, and explains the priority (teaching and shipping content over building a personal profile, for now) with a promise that a full introduction, portfolio, certifications, and past projects are coming.
11. Applied throughout: two real tables, five bulleted lists, `###` subheadings inside the merged section — no long unbroken paragraphs anywhere on the page.

Updated the frontmatter's `scope_reason` and `scope_multiplier` (0.7 → 1.5) to honestly record that the page grew from a single-idea front door into a multi-section one at the owner's explicit direction, per `contracts/calibration.md`'s "multiple interacting concepts; a system with parts" tier — the gate does not police length, only that the judgment is recorded.

Verified before reporting: `check-frontmatter.mjs`, `check-references.mjs`, and `check-chapter.mjs --chapter docs/welcome.md` all pass (one pre-existing, expected `safety-floor-absent` warning, unchanged). Opened the page in the dev-server preview and confirmed via the live DOM (not just eyeballing) that the on-page anchor link resolves to the real heading id and that both new tables render as genuine HTML tables with the right row/column counts. Grepped the repo first for any incoming links to the two headings being removed (`why-can't-the-checking-move...`, `what-does-this-book-actually-cover`) — none existed, so the merge was safe.

## Outcome

- ✅ Impact: The welcome page now states what this book actually is (a curriculum spanning zero to autonomous-AI-agent engineering, built around Spec-Driven Engineering) instead of undersizing itself to a beginner-only, coding-agent-only framing; the problem/solution grounding is now sourced from the project's own official docs rather than invented; the two failure-mode section, the five-stage table, and the "why checking stays human" reasoning read as one coherent answer instead of three scattered ones; the page is table-and-bullet-led throughout; and the bio section now respects the owner's actual priorities and title.
- 🧪 Tests: See `tests:` above — all three build gates pass, and the anchor/table rendering was confirmed live, not assumed from the markdown alone.
- 📁 Files: See `files:` above.
- 🔁 Next prompts: None of this touched Stage 0's own chapters or the logo-prompt work, both explicitly parked earlier in this session. The owner may want the same tables-over-paragraphs and roadmap-toned-honesty treatment applied to the FAQ page at some point, since it currently carries some of the same "what does this book cover" ground in plainer prose — not raised unprompted here, since it wasn't asked for.
- 🧠 Reflection: The most load-bearing single decision was routing the "Spec-Driven Engineering" link to an on-page anchor instead of the glossary. The rest of the book's convention glosses a term and sends the reader to `/glossary`; this page instead teaches the term in a full section of its own immediately below, which is closer to the two-minute-test's Tier-2 handling ("taught in a passage of its own before it is used") than to the usual Tier-1 gloss-and-link pattern — and it happened to be exactly what the owner asked for literally, which is a good sign the two readings agreed rather than one overriding the other.

## Evaluation notes (flywheel)

- Failure modes observed: none in the shipped result. One near-miss caught before it mattered: an initial click-through test navigated to the wrong page (`/intro-5-spec-driven-engineering`) because a stale `find` result's ref pointed at a sidebar nav item, not the body-text link — resolved by testing the anchor directly via URL hash navigation and a DOM query (`getElementById`) instead of trusting a coordinate/ref click, which is the more reliable check for "does this anchor resolve" questions going forward.
- Graders run and results (PASS/FAIL): check-frontmatter.mjs — PASS. check-references.mjs — PASS. check-chapter.mjs — PASS (1 pre-existing warning, unrelated to this change).
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): when verifying an in-page anchor link on a Docusaurus page in this repo, query `document.getElementById(slug)` directly via `javascript_tool` rather than clicking through the UI first — it's faster and isn't vulnerable to stale-ref or layout-shift artifacts from a live-reloading dev server.
