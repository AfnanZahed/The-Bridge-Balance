# Job 24a: rewrite the Welcome page for the Alpha launch video, fix false homepage lines, deploy
Effort: max. Live repository C:/Users/Dell/Desktop/Book only; never `.claude/worktrees/`; NO git, never push. Before editing a file, copy it byte-for-byte to `_scratch/backup-2026-09-24-welcome/` under the same relative path. Keep line endings and encoding. Never hand-edit generated files (`chapterManifest.ts`, `search-index.json`). Job 24b runs read-only at the same time. If a shell command times out, redirect its output to a log and poll it.

## Why
The owner is recording the launch video. While the voice covers a topic, the screen shows the Welcome page's text on that same topic. So the Welcome page must say, clearly and in quotable sentences, everything below, in this order, and every sentence must be true today.

## Read first: the current rules
- `CLAUDE.md` (its Project Context is partly outdated; canon wins), `curriculum-state/README.md`, and canon: `thesis.md`, `course-structure.md` (the three stages, parallel learning, the decision log), `naming.md` (Code Literacy's first-use rule), `audience.md`, `corrections.md`, `research-and-comparison.md`, `integrity-floor.md`.
- The owner's recent decisions: prompt records `0135` to `0150` in `history/prompts/general/`, and the changelog entries of 2026-09-20 to 2026-09-23.
- `.claude/skills/lesson-spine-authoring/SKILL.md` and its `reference/mixed-audience.md`, `reference/language-register.md`, `reference/comprehension-audit.md`. The spine applies fully to front-door pages, except Station 0's guess device.
- `edu-site/docs/welcome.md`, `glossary.md`, `changelog.md`, `edu-site/src/pages/index.tsx`, `edu-site/src/components/**`.
- The owner's rules for front-door pages (from Claude's notes, not in the repo): lead with tables and bullets over prose; merge sections that answer one question; hold the call to action to the very end; a direct, warm opening in the Hugging Face course style, with no metaphors or riddles; a welcome block under the title; easy English for a Pakistani-first reader who starts at zero (sentences around 15 to 18 words, technical depth untouched); audience labels are allowed; every technical term glossed at first use or linked `[*term*](/glossary#slug)`; no CS50, CS50P, CS50W, Harvard, edX or certificate mention anywhere; never point readers at the old Stage 0 chapters (the owner is replacing that text); never say the book's text is written with AI (remove it from this page if present).
- Research pass 1: study how 3 to 5 of the strongest free learning sites' front pages present status (alpha/beta), roadmap and credibility (for example the Hugging Face courses, fast.ai, freeCodeCamp, The Odin Project). Adopt reasoning only; reproduce nothing. Pass 2 is the owner's own input: the points below come from the owner's message of 24 September.

## The Welcome page, in this order
Headings may be reworded to fit the voice rules; report the final ones. Keep existing true material; rewrite whatever is outdated.
1. Title and welcome block: what The Bridge Balance is (a free book that takes you from zero to leading AI agents with engineering judgment, and to building AI agents of your own); "The content is 100% free"; one line that it is in Alpha.
2. The problem: the two failing habits, resisting AI and trusting it blindly. Keep the METR 2025 finding if it is still stated accurately.
3. AI, used better: the book puts the better use of the most advanced AI models and coding agents (examples: Claude Code, OpenCode, Codex, Cursor) first, instead of resisting them, and specializes in exactly that, alongside the engineering fundamentals.
4. Code Literacy: reading and judging code: the core skill and why it matters most when AI writes the code; link the glossary entry.
5. Spec-Driven Engineering: the method, in plain words.
6. How the three stages work, exactly as canon defines them: a table (stage, what you learn side by side, what you leave able to do), then how the learning runs in parallel: traditional engineering and AI agent development learned together, not one after the other. If canon keeps the stages in order while the subjects inside them run in parallel, say exactly that. No chapter list or chapter count, ever.
7. No technical background needed: every reader's professional background is respected (the work you do now is experience you bring, not a gap); keep the "You need / You don't need" table.
8. How this book was built: months of research and planning, and weeks of development; the books, documentaries, talks and views of industry leaders such as Andrew Ng, David J. Malan and Irfan Malik (CEO of Xeven Solutions), and many others, studied and compared; hours of discussion with working experts; the aim, per canon, to find what all of them missed; a real cost, carried so the content stays free. Verify each person's one-line description from a public source first. Add: "We studied their public work; none of them is affiliated with The Bridge Balance or has endorsed it." (No token counts on this page.)
9. Where the book stands: Alpha. Stage 0's real content is being written from scratch now; the early Stage 0 pages visible today will be replaced. Beta comes next, with the starting content. The site will move from its temporary address, the-bridge-balance.vercel.app, to an official domain, most likely thebridgebalance.com, and suggestions for the name are welcome. No dates.
10. Built in the open: every advancement is announced and shared; the changelog records every change (link `/changelog`).
11. What's coming (merge the old "What's still being built" into it): MCP servers and Agent Skills (gloss each at first use); an end-to-end AI learning platform with more than ten features, among them deep research, deep thinking, help with your code, separate modes for students and professionals, working with your own documents, and learning from the book or beyond it; a community space. Say planned or in development; no dates, no prices, and do not call any of it free.
12. Critique and suggestions are warmly welcome, including on the domain name. Name no contact channel that does not exist; if the repo documents an official public one, use it; otherwise write the invitation without a channel and say so in the report.
13. Who's behind this: keep, unless it breaks a rule above.
14. The call to action, at the very end: replace "Start reading" (it sends readers to the old Stage 0 chapter) with following the book's progress in the changelog and coming back for Beta. Do not tell readers to start reading today.
Frontmatter keeps its existing keys only.

## Homepage: fix only what is false today (smallest edits, the file's own voice)
- Stage 0 shown as "Live" in the two charts: give it a true status (for example the same one as Stages 1 and 2), and its bar is no longer full.
- The hero sub's "a complete 3-stage curriculum": drop "complete".
- The Stage 00 card's link into the old Stage 0 chapter: point it at the Welcome page's stages section, or `/welcome`.
- "Open source, no paywall" and "100% open & free": check whether the book's source is public anywhere (a public repository linked from the site or documented in the repo). If not, remove the open-source claim and keep the true part.
- Any other homepage line that says Stage 0 is ready to read.
Change nothing else, including the section "Built with Claude Code, in the open".

## Also
- Glossary: plain-English entries, in the file's own format, for any term the page links that has none yet (likely MCP server and Agent Skill).
- Changelog, 2026-09-24 entry, in its own grouping: the Welcome page now explains how the three stages work in parallel, the book's Alpha status and what's coming; one line per homepage fix a reader would notice.
- Gates in `edu-site/`: `npm run build` passes, `npm run typecheck` passes, `npm run lint` at most 64 errors and 3 warnings, `node scripts/check-chapter.mjs` shows no errors.
- Deploy as in Job 20: `vercel --prod --yes` from the Book root, wait for it to finish, then fetch the live `/welcome` and `/` and confirm the Welcome page contains "Alpha", "Code Literacy", "thebridgebalance.com" and "MCP", the homepage no longer contains "complete 3-stage curriculum", and neither contains "Harvard" or "CS50".

## Report (at most 45 lines)
Files changed, grouped; the Welcome page's final headings in order, each with its first sentence verbatim; how canon defines the three stages and parallel learning (at most 5 lines, with file:line); each homepage fix; research pass 1 in at most 4 lines; the gate results; the deploy URL and the live checks; anything the rules made you change from this brief, and why; whether a public contact channel exists.
