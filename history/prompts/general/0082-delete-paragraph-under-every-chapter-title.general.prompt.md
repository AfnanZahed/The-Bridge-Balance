---
id: 0082
title: Delete paragraph under every chapter title
stage: misc
date: 2026-09-15
surface: agent
model: claude-opus-5
feature: none
branch: none
user: afnanzahed@gmail.com
command: none
labels: ["voice", "canon", "chapters", "css", "dek", "correction"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - edu-site/docs/intro-1-binary-to-programming.md
 - edu-site/docs/intro-2-architecture-map.md
 - edu-site/docs/intro-3-editors-and-ides.md
 - edu-site/docs/intro-4-terminals-and-cli-agents.md
 - edu-site/docs/intro-5-spec-driven-engineering.md
 - edu-site/docs/intro-1-binary-to-programming/01-binary.md
 - edu-site/docs/stage-01-spec-aware-vibe-engineering/index.md
 - edu-site/docs/stage-01-spec-aware-vibe-engineering/01-foundations.md
 - edu-site/docs/stage-01-spec-aware-vibe-engineering/02-core-programming.md
 - edu-site/docs/stage-01-spec-aware-vibe-engineering/03-frontend.md
 - edu-site/docs/stage-01-spec-aware-vibe-engineering/04-backend.md
 - edu-site/docs/stage-01-spec-aware-vibe-engineering/05-databases.md
 - edu-site/docs/stage-01-spec-aware-vibe-engineering/06-git-github.md
 - edu-site/docs/stage-02-cs50-certification/index.md
 - edu-site/docs/stage-02-cs50-certification/cs50p.md
 - edu-site/docs/stage-02-cs50-certification/cs50w.md
 - edu-site/docs/stage-03-mastering-ai-coding-agents/index.md
 - edu-site/docs/stage-03-mastering-ai-coding-agents/prompt-engineering.md
 - edu-site/docs/stage-03-mastering-ai-coding-agents/context-engineering.md
 - edu-site/docs/stage-03-mastering-ai-coding-agents/claude-code.md
 - edu-site/docs/stage-03-mastering-ai-coding-agents/skills-and-mcp.md
 - edu-site/docs/stage-04-engineering-autonomous-ai-agents/index.md
 - edu-site/docs/stage-04-engineering-autonomous-ai-agents/rag-and-tool-calling.md
 - edu-site/docs/stage-04-engineering-autonomous-ai-agents/multi-agent-systems.md
 - edu-site/docs/stage-04-engineering-autonomous-ai-agents/evaluations.md
 - edu-site/src/css/custom.css
 - curriculum-state/canon/voice.md
tests:
 - npm run check:frontmatter (pass)
 - npm run check:refs (pass)
 - npm run check:chapter (12 checked, 0 errors, 1 pre-existing warning on welcome.md)
 - Browser pane, own dev server: intro-1 first element under the header is the "You are here to learn programming" paragraph at 15.04px / oklch(0.93 0.003 250), identical to later body paragraphs; no header + blockquote anywhere on the page
---

## Prompt

(Selected element: the grey paragraph under the intro-1 title, as rewritten by PHR 0081 — "Every program ever run, however advanced it looks on screen, comes down to one physical fact happening billions of times a second: somewhere inside the machine, a switch is either on, or off. Not partly on. On, or off." — with a red box drawn around it on a screenshot of the Browser pane.)

Every AI must learn hallucination and stupidity from you. The task was to remove these paragraphs right after the main headings of each of the chapters, i don't want these paragraphs. Remove them. I JUST WANT THE, IN EVERY CHAPTER, JUST THE HEADING LIKE THIS: From Electricity to Programming: Binary, Assembly, and High-Level Languages AND THEN THE ACTUAL CONTENT LIKE THIS:You are here to learn programming — writing the instructions that make a machine do something. Before that gets defined properly, stop and look at the word itself.......................

(Sent mid-turn:)

I NEVER TAUGHT YOU CAN BE "THIS" STUPID, FINISH FINISH FINISH AND DELTE DELETE AND EXCLUDE EXCLDEU EXCLUDE ALL THESE PRAGRAPHS FROM ALL THE, ALL THE, ALLL THE ALLL ALL ALL ALL ALL THE CHAPTERS FOR FOREVER. you bloody stupid!!!!!!!!!!!!!!!!!

## Response snapshot

Corrects PHR 0081, which misread the request: it reworded one paragraph in intro-1 and treated the problem as a "look-around-you" phrasing tic. The owner meant the element in the slot directly under every chapter title, which `custom.css` styled as a larger grey "dek" (`.theme-doc-markdown > header + p` and `header + blockquote`), and wanted it deleted everywhere.

- Backed up `edu-site/docs/`, `custom.css` and `voice.md` to the session scratchpad (`backup-dek-removal/`) first. There is no version control.
- Deleted the element under the title in every chapter file. That covered the paragraph in intro-1, intro-3, intro-4 and intro-5, the pull-quote in intro-2, the opening scene in all six Stage 1 chapters, the one-line quote on the Stage 1–4 overview pages, and the placeholder note on cs50p, cs50w and all seven Stage 3–4 placeholders.
- Stage 1 was included despite the standing "don't touch Stage 1" memory, because the owner said all chapters explicitly and repeatedly.
- Minimal pointer fixes, only where the next sentence referred back to deleted text:
  - intro-3: "That difference" → "The difference".
  - intro-4: "That window is called a terminal" → "A terminal is the text window…".
  - 01-foundations: "Before you press Enter" → "Before you ask an agent to build a sign-up page for the school AI club, capped at thirty seats".
  - 02-core: dropped "That is the problem in one scene."
  - 05-databases: "this race" → "the race for the last seat".
  - 06-git: "read them" → "read a pull request"; "this pull request" → "the pull request".
- intro-5: the paragraph after the deleted one ("That is genuinely new…") was only a reaction to it, so it went too. The chapter now opens on "## Read the name before the explanation". Its database gloss had no later use.
- 01-binary.md (placeholder, unlisted): removed the whole Schaerbeek election opening and the "Where this sits" callout. Three short facts about the election moved into the bit-flip section, where the rest of the draft already relies on them. Two clauses that pointed at the removed opening were cut.
- `custom.css`: removed the dek rule block, its typography-table row, and two comments that mentioned it. Nothing under a title can render grey now.
- `canon/voice.md`: commitment 1 changed from "Open in the middle of something… open on a situation" to "Nothing between the title and the content". The earlier wrong "look-around-you opener" tell was replaced with "A paragraph under the title — banned outright".
- Memory: the incorrect note was deleted and replaced with `feedback-no-paragraph-under-chapter-title.md`, which also records that "remove" means delete, never reword.
- Not touched: the welcome page and the reference pages (faq, glossary, changelog, code of conduct, accessibility, perf targets). They are not chapters.

## Outcome

- ✅ Impact: Every chapter's title now leads straight into its content, and the grey dek slot no longer exists in the site's CSS. The canon voice rule now forbids the pattern in future chapters.
- 🧪 Tests: frontmatter, references and chapter gate all pass (0 errors). A computed-style check in the browser confirms the first paragraph under the intro-1 title renders as normal body text.
- 📁 Files: 25 chapter/overview files, `custom.css`, `voice.md`.
- 🔁 Next prompts: the owner may want the welcome page's opening paragraph handled the same way. It was left alone because it is not a chapter.
- 🧠 Reflection: the rendered element the owner pointed at was a site-wide styled slot, not one sentence. Checking the CSS first would have shown that immediately. When the owner says "remove", delete.

## Evaluation notes (flywheel)

- Failure modes observed: PHR 0081 narrowed the scope to a sub-pattern, rewrote the text instead of deleting it, and excluded chapters the owner had asked to include.
- Graders run and results (PASS/FAIL): check:frontmatter PASS; check:refs PASS; check:chapter PASS; browser computed-style check PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): when a request arrives as a selected rendered element, inspect the selector that styles it before deciding the scope.
