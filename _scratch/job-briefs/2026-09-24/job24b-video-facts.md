# Job 24b — true numbers and facts for the launch video

Read-only job; nothing in the repo changed. Measured 2026-09-24 ~18:47Z — the live sessions (job 24a, this one) keep adding tokens, so these are a floor. Convention: "input" = fresh, uncached input.

## 1. AI tokens spent building this project

**(a) Claude Code** — 8 `C--Users-Dell-Desktop-Book*` folders (worktrees included), 134 `.jsonl` session files, 6,065 unique assistant messages (deduped by `message.id`, highest usage kept; 13,941 streamed/resumed repeats merged). Earliest 2026-08-24T19:51:59Z, latest 2026-09-24T18:38:19Z.
- input 9,302,618 · cache-creation 40,465,756 · cache-read 1,502,059,940 · output 10,461,745 → **1,562,290,059**

**(b) Command Code / DeepSeek V4.1 Flash** — 199 sessions in the Book repo (196 main + 1 worktree + 3 `edu-site`; 1 with zero usage). The 27 `trace-job*.json` runs are the *same* sessions as the store (verified session-id for session-id; resumed job9+job9b = one stored session), so each session is counted once. Earliest 2026-09-10, latest 2026-09-24T18:47:21Z.
- input 24,571,361 (fresh) · cache-creation 0 · cache-read 869,655,549 · output 10,401,368 → **904,628,278**
- Its `inputTokens` is the *whole* prompt (cache read/write sit inside it) — proved by command-code's own cost code, `a = inputTokens − cacheRead − cacheWrite`. Summing the four fields double counts (naive 1,774,283,827); the true total is input + output.

**Combined:** fresh input 33,873,979 · cache-creation 40,465,756 · cache-read 2,371,715,489 · output 20,863,113 → **2,466,918,337**.

**(c) Not measurable, and why.** Command Code's store starts only 2026-09-10, so any earlier AI help on the Book is not in it; AI tools that log no token counts (chat UIs, IDE helpers, the owner's own reading) are invisible; the Claude Code logs are only what survives on disk (older/pruned sessions are gone) and only sessions whose working folder is the Book; dollar spend is not reportable (the cost field mixes models and is absent on many records). No estimate is substituted.

**Safe public phrasing (rounded down):** "more than 2.4 billion AI tokens" — Claude Code "more than 1.5 billion", DeepSeek "more than 900 million".

## 2. Timeline

- Earliest date: (a) Claude Code logs **2026-08-24**; (b) `history/prompts/**` **2026-08-19**; (c) file dates only (contents never read) in `The Bridge Balance/Official docs/` **2026-06-29** (6 files).
- Counts: **206** `*.prompt.md` records in `history/prompts/**` (209 files incl. README); **10** ADRs in `history/adr/` (0001–0010).
- Safe phrasing: research and planning have run **"more than two months"** (since 29 June 2026); development **"more than a month"** (since 19 August 2026).

## 3. Public facts (each with its source)

- **Andrew Ng** — Founder of DeepLearning.AI; Managing General Partner, AI Fund; Managing Partner, AI Aspire; Executive Chairman, LandingAI; Chairman and co-founder, Coursera; Adjunct Professor, Stanford. https://www.andrewng.org/
- **David J. Malan** — Gordon McKay Professor of the Practice of Computer Science, Harvard (SEAS), and Member of the Faculty of Education, Harvard Graduate School of Education; he teaches CS50. https://cs.harvard.edu/malan/bio/
- **Irfan Malik** — yes, Founder and CEO of Xeven Solutions. https://www.mobileappdaily.com/company/xeven-solutions

## 4. Canon (file:line)

- **"SDE" = Spec-Driven Engineering** in these stage names — `curriculum-state/canon/course-structure.md:120` (it warns that in job adverts "SDE" usually means Software Development Engineer, so spell it out); `curriculum-state/canon/thesis.md:15`.
- **The three stages** — `canon/course-structure.md:131-134` (CS-13–CS-16) and `canon/thesis.md:140-142`: Stage 0 *Introduction to SDE* (theory and the first practical basics); Stage 1 *SDE Mastery (AI-Driven)* (basic-to-intermediate SE with basic-to-intermediate agentic apps); Stage 2 *SDE Mastery (AI-Native)* (advanced SE with advanced agentic apps). Agentic AI is taught *inside* SE, never as its own stage (CS-12, `course-structure.md:130`).
- **Parallel learning** — CS-9, `canon/course-structure.md:101`: programming, AI-agent skills and their tools (Git, GitHub, the context window, tokens) are learned **together, in the same chapter** — so yes, traditional engineering and AI-agent work are learned side by side, not one after the other.
- **Alpha / Beta / launch / domain** — canon is **silent**: no Alpha, Beta or launch in `curriculum-state/canon/` or the rule files. The domain is configuration only: `edu-site/docusaurus.config.ts:22` (`the-bridge-balance.vercel.app`), with `thebridgebalance.com/.ai/.app` noted at line 17. The Alpha/Beta/domain plan lives in the owner's message `_scratch/job-briefs/2026-09-22/job15-owner-message.txt:39` (Alpha now, Beta within a week, permanent domain within two weeks), restated in `_scratch/job-briefs/2026-09-24/job24a-welcome-alpha.md:25`.

## 5. The planned AI platform / chatbot

Sources: `specs/012-chatbot-tutor/spec.md` (Draft, 2026-09-23) and `_scratch/platform-research/02-chatbot-1.0-build-prompt.md`.
- One agent behind the chat box already on every page; answers stream word by word with sources under each answer.
- Answers come from three places: the book (RAG: LlamaIndex + Qdrant), general knowledge, or the web (Deep Research).
- Six modes and two levels (Student default, Professional); questions, answers and ratings saved anonymously; $1/day cap; access-code lock while the owner tests.
- Whole-book index built by one command, re-indexed by a GitHub workflow; free-tier hosting; light/dark, keyboard and phone-tested; a public privacy page.
- **Count:** 116 functional requirements (plus 10 NFRs, 16 success criteria, 6 user stories) in `spec.md`; the owner sums the platform as "more than ten features" (`job24a-welcome-alpha.md:27`).
- **MCP servers and Agent Skills as paid products:** the paid product is a separate, optional catalogue of Claude Code sub-agents, skills, MCP servers and plugins (`edu-site/docs/faq.md:16`); the platform itself will *use* MCP servers and Agent Skills (`edu-site/docs/welcome.md:132`).
