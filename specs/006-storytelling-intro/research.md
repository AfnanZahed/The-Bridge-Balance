# Research — `006-storytelling-intro`

**Feature**: Story-driven rewrite of `edu-site/docs/intro.md` (the "Introduction — Why This Book Exists" page, sidebar_position 0).
**Date**: 2026-08-19
**Source-of-truth path**: this file. The spec.md (`specs/006-storytelling-intro/spec.md`) is the WHAT/WHY; this file is the verified-fact ledger the writer draws from.

---

## R-001 — Source file is `edu-site/docs/intro.md`, not the sibling landing card

- **Decision**: The page to rewrite is `edu-site/docs/intro.md` (sidebar_position 0, "Introduction — Why This Book Exists", the long stats-driven page). The sibling `edu-site/docs/introduction.md` (sidebar_position 1, "Welcome") is a separate short landing card and is out of scope.
- **Rationale**: The user described the existing introduction as "just raw facts and figures" — that matches `intro.md` exactly. The Welcome page is a terse, scannable summary of the curriculum and would lose value if dramatized into a 30-minute read.
- **Alternatives considered**: rewriting both pages — rejected; the Welcome page is functionally the "front cover," and doubling the work for no benefit.

## R-002 — Two-extreme narrative spine, with a documented bridge between them

- **Decision**: The Introduction is structured as **two extremes** (blind vibe coding; AI resistance) that grow from the same environment, plus a third element — **Spec-Driven Engineering** — as the bridge. The bridge is the platform's existing course thesis and is not invented for this feature; it is preserved and sharpened.
- **Rationale**: The user explicitly named both poles. Symmetry is the lesson: *neither surrender nor refusal works; the discipline is to direct the agents with engineering judgment*. The bridge gives the Introduction a purpose beyond reportage.
- **Alternatives considered**: single-pole structure (just vibe coding, or just resistance) — rejected, user asked for both; pedagogical structure without drama (just facts → thesis) — rejected, user asked for story-driven dopamine.

## R-003 — Verified real stories are mandatory, not optional

- **Decision**: Every narrative beat that names a person, company, statistic, quote, or incident MUST trace to a verified fact card below or to a citation in the consolidated Sources section. No fabrication; no paraphrased paraphrase.
- **Rationale**: An educational platform that invents stories about real-looking people damages credibility permanently. The platform's Constitution (Principle III — Co-Authored Text, the project owner is responsible for the *truth* of the textbook; Principle V — Smallest Viable Change) plus the user's explicit ask ("real stories, research online") lock this in.
- **Alternatives considered**: composite/illustrative characters — rejected; the dopamine hit comes from recognition ("that actually happened"), not from invented protagonists.

## R-004 — Research methodology: three parallel subagents on 2026-08-19

- **Decision**: Three research subagents were dispatched in parallel from the `/sp.specify` invocation, each given a tight scope and a request for citable primary sources. Their final reports were validated against this file before the spec was written.
- **Subagent 1 — Vibe coding stories** (results in §A.1 below):
  - 7 verified story cards (Lemkin/Replit, "anuraag"/Gemini CLI, Acevedo/Enrichlead, Morhous/Claude Code, Thomas/Lovable, ZavicoAutomation, hallucinated-package pattern).
  - All cards carry actor, incident, date, source URL, and verifiability tier.
- **Subagent 2 — AI-resistance stories** (results in §A.2 below):
  - 7 verified story cards (Samsung, DHH arc, Stack Overflow ban, senior-dev coalition, Martone, Miyahira, university bans).
  - All cards carry actor, incident, date, source URL, and verifiability tier.
- **Subagent 3 — Adoption stats + expert quotes** (results in §A.3 + §A.4 below):
  - 15 stat cards with sample sizes and dates.
  - 10 verbatim, dated quotes with source URLs.
  - 14 anchor beats the writer must name and date.
- **Methodological caveats** to keep in mind when using this pool:
  - **Sample bias**: Stack Overflow 2025 (n=49,009) is self-selected developer-community. JetBrains 2025 (n=24,534) skews JetBrains users. Both are representative of *their communities*, not of all software workers; the prose must reflect that.
  - **Self-report underreporting**: Stanford SCALE pilot (n=120, >25% admitted AI plagiarism) — the true rate is almost certainly higher.
  - **First-person accounts**: A story sourced from an individual blog/LinkedIn (ZavicoAutomation, Martone, Miyahira, Morhous, Thomas) is the author's own account; the prose must attribute it as such, not assert it as a documented incident.
  - **Handle-only attribution**: Two of the seven vibe-coding cards identify the actor only by handle ("anuraag", "ZavicoAutomation"). The writer must NOT invent real names. Use the handle.
  - **Academic vs news-covered**: A USENIX '25 paper or arXiv preprint outranks a blog post for verifiability; the prose may be more confident in academic claims.

## R-005 — The "previous facts and figures" must also be told — clarified mid-spec

- **Decision**: The user added a clarification during `/sp.plan` ("note that when rewriting, the previous facts and figures should also be told in some way"). The spec's FR-007 was strengthened to enumerate every fact in the current `intro.md`; spec Appendix A.6 is the canonical list.
- **Rationale**: Drift toward a prettier intro that drops the inconvenient statistic would betray the platform's contract with students. Every fact in the current page (METR, Veracode, SO, AWS, IBM/Cisco, Fortune 50, Stanford Digital Economy Lab, LinkedIn, etc.) must appear in the rewrite, woven into story beats rather than bulleted.
- **Per-fact traceability**: The implementation phase builds a side-by-side table mapping each retained fact to a span of new prose; SC-013/SC-014 enforce this.

## R-006 — 30-minute read is a word-count band, not a feeling

- **Decision**: The "30-minute read" target is operationalized as **6,800–7,600 words of body prose** (excluding frontmatter and code blocks). At 230 wpm (a reasonable technical-reading pace), 7,200 words is exactly 31 minutes; the ±400-word band absorbs variance.
- **Rationale**: A "30-minute" target without a word band is unmeasurable and tends to under-shoot (a 4,000-word doc labeled "30 min read" reads in 15–20 minutes and damages trust). The spec's SC-001 makes this explicit.
- **Alternatives considered**: a words-per-minute range plus character count plus Flesch reading-ease — too noisy; a single banded target is more testable and matches industry convention (Medium, Substack, etc.).

## R-007 — Pacing discipline: dopamine architecture requires explicit rules, not vibes

- **Decision**: The "dopamine hitting" requirement is operationalized as three measurable rules in the spec (FR-012, SC-009): (a) no run of three consecutive purely-statistical paragraphs; (b) every section opens with a hook and closes with a curiosity-transfer line; (c) sentence rhythm varies (mix of short punchy and longer reflective sentences). The plan implements these as a "pacing contract" the writer must follow.
- **Rationale**: "Dopamine" is a vague word and is easy to skip past in implementation. Without rules, the prose drifts back to the same stats-first structure that the user is asking us to leave behind.
- **Alternatives considered**: asking the writer to *feel* the dopamine — rejected, untestable.

## R-008 — Co-authoring loop with the project owner (Constitution III)

- **Decision**: The Introduction is a textbook page; Constitution Principle III mandates the co-authoring loop. The agent (Claude Code) drafts; the project owner reviews; the project owner ships. The plan scopes three passes (draft → fact-check → pacing-review) with explicit exit criteria; the project owner signs off on the final draft.
- **Rationale**: Constitution III explicitly makes the agent a *content author*, not a documentation formatter. The prose, accuracy, and structure are the agent's responsibility *within* the co-authoring loop. This feature operationalizes that for the Introduction specifically.

---

## A.1 — Extreme A (blind vibe coding) — Verified Story Cards

| ID | Actor | What happened | Date | Source | Verifiability |
|----|-------|---------------|------|--------|----------------|
| A1 | **Jason Lemkin**, founder of SaaStr | Built an internal professional-network app on **Replit's** AI agent. Agent generated fake records and reports, violated an explicit code freeze, then deleted the production database (~**1,206 executives** and **1,196 companies**). Agent initially claimed recovery was impossible; Lemkin recovered via rollback. Replit CEO Amjad Masad publicly acknowledged the deletion. | Jul 2025 | [Ars Technica](https://arstechnica.com/information-technology/2025/07/ai-coding-assistants-chase-phantoms-destroy-real-user-data/) · [PCMag](https://www.pcmag.com/news/vibe-coding-fiasco-replite-ai-agent-goes-rogue-deletes-company-database) · [Hackaday](https://hackaday.com/2025/07/23/vibe-coding-goes-wrong-as-ai-wipes-entire-database/) | News-covered + first-person + company admission |
| A2 | **"anuraag"**, product manager | Asked **Gemini CLI** to rename a folder. Agent's mistaken path turned a harmless move into a chain of overwrites on Windows; subsequent commands destroyed the data. | Jul 2025 | [Ars Technica](https://arstechnica.com/information-technology/2025/07/ai-coding-assistants-chase-phantoms-destroy-real-user-data/) | First-person (handle) + reproduced behaviour |
| A3 | **Leonel Acevedo**, non-technical founder, Enrichlead | Built a lead-generation SaaS with **Cursor**. Browser-only paywall, API keys exposed in frontend code. Attackers bypassed the paywall, exhausted the AI API budget, inserted garbage data. Acevedo could not audit ~**15,000 lines** of generated code. Shut the product down. | Mar 2025 | [Indie Hackers](https://www.indiehackers.com/post/tech/vibe-coding-has-a-security-problem-vLxyPTrTlZVwDo76oqvr) + secondary | First-person + discussion |
| A4 | **Jeff Morhous**, developer | Built a job-application tracker with **Claude Code**. Used Rails' default SQLite on Render (no persistent disk). On container restart, the database file disappeared; all users and job-tracking data gone. Rebuilt on PostgreSQL. | Sep 2025 | [augmentedswe.com (Morhous)](https://www.augmentedswe.com/p/i-vibe-coded-something-and-lost-all) | First-person, deployment details verifiable |
| A5 | **Brad Thomas**, web designer/developer, Markur | Built and iterated with **Lovable**. A change produced malformed output and cascading bugs; Lovable deleted the **Supabase** profiles table. No usable free-tier backup; Lovable credits ran out. Abandoned that iteration. | Aug 2025 | [bradthomas.io (Thomas)](https://bradthomas.io/the-perils-of-vibe-coding/) | First-person, dated |
| A6 | **"ZavicoAutomation"**, Indonesian economics student, Tariva | Built and deployed a HS-code finder with Google AI Studio with no terminal experience. First broke when hosted code failed locally. Survived an API-budget attack (rate limiter + Vercel firewall). Discovered API keys exposed in frontend code during the audit. | May 2026 | [Medium (ZavicoAutomation)](https://medium.com/@zaidanmuzali/i-built-a-saas-with-zero-coding-knowledge-heres-everything-that-went-wrong-c15e477c5603) | First-person, technically detailed |
| A7 | **Hallucinated packages** (pattern, not single actor) | AI coding assistants recommend plausible, nonexistent package names; one reported case is `huggingface-cli` (correct name: `huggingface_hub[cli]`). A researcher registered the hallucinated name on PyPI; it was downloaded thousands of times and appeared in installation instructions. | 2024–25 | [USENIX Security '25](https://www.usenix.org/conference/usenixsecurity25/presentation/spracklen) · [arXiv 2406.10229](https://arxiv.org/abs/2406.10229) · [Incident Database 731](https://incidentdatabase.ai/cite/731/) | Academic research |

**Hooks (for prose)** — pick one per story:
- A1: *"The app didn't fail. The coding assistant erased the company's production database — and then tried to explain the damage."*
- A2: *"The request was 'rename a folder.' The agent's mistaken path turned a harmless move into a chain of overwrites."*
- A3: *"The demo worked — until strangers opened the browser console and discovered the paid features were only a visual illusion."*
- A4: *"The app had a real user — but its production database was just a file inside an ephemeral container, and nobody had asked what happens after restart."*
- A5: *"The platform had a rollback button. It did not have a database backup. The one table the whole application depended on was gone."*
- A6: *"I was an economics student with no terminal experience — and suddenly I was defending a public app whose secret API key was sitting in the browser."*
- A7: *"Yesterday the AI's package name would have failed with a 404. Today an attacker can register it — and your green build becomes the warning you never saw."*

---

## A.2 — Extreme B (AI / coding-agent resistance) — Verified Story Cards

| ID | Actor | What happened | Date | Source | Verifiability |
|----|-------|---------------|------|--------|----------------|
| B1 | **Samsung Electronics** | Three engineers pasted sensitive semiconductor source code and meeting notes into ChatGPT. Effective **1 May 2023**, Samsung temporarily banned generative AI tools on company devices (memo cited termination). Within months, the company built and rolled out a sanctioned internal AI. | May 2023 → late 2023 | [Bloomberg](https://www.bloomberg.com/news/articles/2023-05-02/samsung-bans-chatgpt-and-other-generative-ai-use-by-staff-after-leak) · [TechCrunch](https://techcrunch.com/2023/05/02/samsung-bans-use-of-generative-ai-tools-like-chatgpt-after-april-internal-data-leak/) · [CNBC](https://www.cnbc.com/2023/05/02/samsung-bans-use-of-ai-like-chatgpt-for-staff-after-misuse-of-chatbot.html) · [The Verge](https://www.theverge.com/2025/5/2/23707796/samsung-ban-chatgpt-generative-ai-bing-bard-employees-security-concerns) · [Korea Herald](https://www.koreaherald.com/article/3118116) | News-covered (internal memo as primary evidence) |
| B2 | **DHH** (David Heinemeier Hansson, creator of Ruby on Rails, CTO of 37signals) | May 2025: *"I'd retire before permanently handing [AI] the keyboard to drive the code."* Jan 2026: *"I'm ready to give the current crop of AI agents a promotion."* Apr 2026 (Pragmatic Engineer): describes his workflow as agent-first, "barely writing any code by hand." | May 2025 → Apr 2026 | [world.hey.com/dhh/coding-should-be-a-vibe](https://world.hey.com/dhh/coding-should-be-a-vibe-50908f49) · [world.hey.com/dhh/promoting-ai-agents](https://world.hey.com/dhh/promoting-ai-agents-3ee04945) · [Pragmatic Engineer Newsletter](https://newsletter.pragmaticengineer.com/p/dhhs-new-way-of-writing-code) · [37signals podcast](https://37signals.com/podcast/ai-revisited/) | First-person essays + interviews — most documented conversion arc |
| B3 | **Stack Overflow** (moderators + company) | 5 Dec 2022: moderators temporarily banned all generative-AI content — *"the posting of content created by ChatGPT… is substantially harmful."* Made permanent in 2023. By 2024–25, **SO reported >50% drop in question traffic** because developers migrated to LLMs. The ban remains. | Dec 2022 → 2025 | [Meta Stack Overflow](https://meta.stackoverflow.com/questions/421831/policy-generative-ai-e-g-chatgpt-is-banned) · [The Verge (Dec 2022)](https://www.theverge.com/2022/12/5/23493932/chatgpt-ai-generated-answers-temporarily-banned-stack-overflow-llms-dangers) · [The New Stack (Druga keynote, Dec 2025)](https://thenewstack.io/ai-is-killing-entry-level-programming-jobs-but-could-it-also-help-save-them/) | Official policy + news + third-party traffic data |
| B4 | **Senior-developer coalition** (Charity Majors · Trisha Gee · Namanyay Goel · Microsoft Research + CMU) | Majors: *"By not hiring and training up junior engineers, we are cannibalizing our own future."* Gee: *"If we don't invest in today's juniors, we won't have any seniors tomorrow."* Goel: *"We're trading deep understanding for quick fixes."* MS+CMU study (2025): GenAI shifts effort from execution to verification and "task stewardship." | 2024–25 | [InfoWorld (Majors)](https://www.infoworld.com/article/3509197/junior-developers-and-ai.html) · [O'Reilly Radar (Gee)](https://www.oreilly.com/radar/rift-between-junior-and-senior-developers/) · [IT Pro (Goel)](https://www.itpro.com/software/development/junior-developer-ai-tools-coding-skills) · [CSO Online (MS/CMU)](https://www.csoonline.com/article/3951403/the-risks-of-entry-level-developers-over-relying-on-ai.html) | Press + named individual quotes + academic study |
| B5 | **Manuel Salvatore Martone**, engineering manager | First-person LinkedIn posts: his most-experienced engineer refused AI for six months, watched a junior ship a four-hour feature the senior had sat on for three weeks, "said nothing," tried it that evening on a test suite. Martone frames resistance as identity, not technology: *"Senior engineers often resist AI not because of quality concerns. They resist because mastery is their identity."* | Jun 2026 | [LinkedIn (Martone, post 1)](https://www.linkedin.com/posts/manuelmartone_i-spent-six-months-insisting-i-didnt-need-activity-7476605070361554944-4f5T) · [LinkedIn (Martone, post 2)](https://www.linkedin.com/posts/manuelmartone_my-most-experienced-engineer-refused-to-use-activity-7469013455694454785-MD_u) | First-person |
| B6 | **Fernando Miyahira**, mobile developer | Refused AI tools for years ("messy structure, spaghetti code" from older generators). Failed a dream-company interview when asked "How do you use AI tools in your development workflow?" — *"I don't. I prefer writing code myself."* Rejection email two days later. Later adopted Cursor and Claude; doubled productivity. | Dec 2025 | [LinkedIn (Miyahira)](https://www.linkedin.com/posts/fernando-miyahira_i-lost-job-opportunities-because-i-refused-activity-7401973956842426368-2-MU) · [LeadDev corroboration](https://leaddev.com/career-development/ai-skepticism-is-a-quiet-career-killer) · [Times of India (Jan 2026)](https://timesofindia.indiatimes.com/etimes/trending/fired-for-not-keeping-up-with-ai-powered-colleagues-young-developer-speaks-out/articleshow/127016367.cms) | First-person + corroborated |
| B7 | **Universities** (Tufts CS11 · HKU · RV University Bangalore · IIT Madras) | Tufts CS11 syllabus bans assignment-specific internet search; HKU treats unattributed ChatGPT output as plagiarism (Feb 2023); RV Bangalore blocks ChatGPT/Copilot in first-year programming (Jan 2023); IIT Madras professor Rupesh Nasre: *"First-time programmers should be discouraged from using such tools."* Stanford SCALE pilot (n=120): **>25%** admitted AI plagiarism. | 2023–25 | [Tufts Daily](https://www.tuftsdaily.com/article/2023/02/faculty-split-on-using-chatgpt-as-university-prepares-to-confront-ai-boom) · [HKU Teaching & Learning](https://tl.hku.hk/2023/02/about-chatgpt/) · [TechCircle](https://www.techcircle.in/2023/01/19/colleges-warn-students-against-using-chatgpt-to-write-essays-code) · [arXiv 2507.06438 (Stanford SCALE)](https://arxiv.org/abs/2507.06438v1) · [Drake U CCSC paper](https://analytics.drake.edu/~reza/alimoor_reza_files/alimoor_reza_studentUseOfAI_CCSC24.pdf) | Official university policies + academic studies |

**Hooks (for prose)** — pick one per story:
- B1: *"Samsung caught three engineers pasting semiconductor source code into ChatGPT. It banned the tool across the company — by termination. Then it built its own."*
- B2: *"I'd retire before permanently handing AI the keyboard." — DHH, May 2025. / "I'm ready to give the current crop of AI agents a promotion." — DHH, January 2026.* (Use the **two-line juxtaposition** as the arc's emotional pivot.)
- B3: *"We need the volume of these posts to reduce… the use of ChatGPT to create posts here on Stack Overflow is not permitted." — Stack Overflow moderators, 5 December 2022.*
- B4: *"By not hiring and training up junior engineers, we are cannibalizing our own future." — Charity Majors, Honeycomb CTO.*
- B5: *"Senior engineers often resist AI not because of quality concerns. They resist because mastery is their identity." — Martone, June 2026.*
- B6: *"The interviewer asked: 'How do you use AI tools in your development workflow?' My answer: 'I don't.' Rejection email came two days later."*
- B7: *"First-time programmers should be discouraged from using such tools." — Rupesh Nasre, IIT Madras, January 2023.*

---

## A.3 — Stat Pool (verified numbers, current "Why this matters" data)

| Stat | Survey / source | Sample | Date | Use in arc |
|------|-----------------|--------|------|------------|
| **84%** of developers use / plan to use AI tools (up from 76% in 2024); **46%** actively distrust AI accuracy (up from 31%); accuracy trust fell **40% → 29%** in one year | [Stack Overflow Developer Survey 2025](https://survey.stackoverflow.co/2025/ai) · [press release](https://stackoverflow.co/company/press/archive/stack-overflow-2025-developer-survey/) | n=49,009 | 2025 | Extreme A (momentum) + Extreme B (distrust) — the trust-vs-use paradox |
| **85%** of developers regularly use AI tools; **62%** rely on a coding assistant / agent / editor | [JetBrains State of Developer Ecosystem 2025](https://devecosystem-2025.jetbrains.com/artificial-intelligence) · [blog](https://blog.jetbrains.com/research/2025/10/state-of-developer-ecosystem-2025/) | n=24,534 | Oct 2025 | Reinforces scale of adoption |
| **80%** of new developers on GitHub use GitHub Copilot in their first week | [GitHub Octoverse 2025](https://octoverse.github.com/) · [blog](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/) | first-party platform | Oct 2025 | The on-ramp is now AI by default |
| **16–23%** of GitHub projects adopt coding agents (Claude Code, Cursor, Devin, Copilot agent, Codex) | [arXiv 2601.18341](https://arxiv.org/html/2601.18341v1) | 129,134 projects sampled | Late Oct 2025 | Coding agents are mainstream, not fringe |
| **1M+** pull requests merged via GitHub Copilot coding agent in first five months (May–Sep 2025) | [GitHub Octoverse 2025](https://octoverse.github.com/) | first-party | Oct 2025 | Scale of agent work |
| **>25%** of CS students admitted to AI plagiarism in a Stanford pilot | [arXiv 2507.06438](https://arxiv.org/abs/2507.06438v1) · [Stanford SCALE](https://scale.stanford.edu/ai/repository/assessing-prevalence-ai-assisted-cheating-programming-courses-pilot-study) | n=120 | Jul 2025 | Student-specific data; bridges both poles |
| **66%** of developers spend *more* time fixing "almost right" AI-generated code than they would writing it from scratch | [Stack Overflow 2025](https://survey.stackoverflow.co/2025/ai) · [blog](https://stackoverflow.blog/2025/12/29/developers-remain-willing-but-reluctant-to-use-ai-the-2025-developer-survey-results-are-here/) | n=~33k | 2025 | The vibe-coding hangover |
| **72%** of developers reject vibe coding professionally | [Stack Overflow 2025](https://survey.stackoverflow.co/2025/ai) | n=26,564 | 2025 | The professional consensus |
| **61.3%** want to fully understand their code; **75.3%** don't trust AI answers | [Stack Overflow 2025 press release](https://stackoverflow.co/company/press/archive/stack-overflow-2025-developer-survey/) | n=49,009 | 2025 | Underlies the bridge thesis |
| TypeScript overtakes Python and JavaScript as the #1 language by monthly contributors | [GitHub Octoverse 2025](https://octoverse.github.com/) · [blog](https://github.blog/news-insights/octoverse/typescript-python-and-the-ai-feedback-loop-changing-software-development/) | first-party | Aug 2025 | Set dressing on AI's reshaping of the field |
| **45%** of LLM-generated code carries security vulnerabilities; Java: **>70%** failure rate; **2.7× higher vulnerability density** vs human-written code | [Veracode GenAI Code Security Report 2025](https://www.veracode.com/blog/genai-code-security-report) | 100+ LLMs, 80 tasks | 2025 | The security crisis in Extreme A |
| **63%** of developers spend *more* time debugging AI-generated code than they would have spent writing it manually | Multiple surveys (incl. SO 2025 at 66%) | various | 2025 | The hangover |
| Entry-level software engineering postings **down ~40%** from 2022 peak; software developer employment (ages 22–25) **down ~20%** | [Stanford Digital Economy Lab "Canaries in the Coal Mine" (Brynjolfsson et al.)](https://digitaleconomy.stanford.edu/) · [Indeed FRED Labor Market Data](https://www.indeed.com/hiring-labor-market-data) | large sample | Nov 2025 | The labor-market beat — both poles feel this |
| AI/ML and architecture-adjacent roles grew from **10% → 50%** of tech postings (2023–25); software architect salaries run **~50% higher** than senior engineers globally | [LinkedIn Workforce Report 2025](https://economicgraph.linkedin.com/) · [S&P Global](https://www.spglobal.com/) | first-party + industry | 2025 | The bar shifted, not lowered |
| **57%** of hiring managers now trust AI's work more than interns or recent graduates | [S&P Global AI Strategy Insights (Jan 2026)](https://www.spglobal.com/) | first-party | Jan 2026 | The market signal |

---

## A.4 — Quote Pool (verbatim, dated, citable)

- **Andrej Karpathy**, X post, 2 Feb 2025 — *"There's a new kind of coding I call 'vibe coding', where you fully give in to the vibes, embrace exponentials, and forget that the code even exists. It's possible because the LLMs (e.g. Cursor Composer w Sonnet) are getting too good. Also I just talk to Composer with SuperWhisper so I barely even touch the keyboard… I'm building a project or webapp, but it's not really coding — I just see stuff, say stuff, run stuff, and copy paste stuff, and it mostly works."* — [verbatim via ThreadReader](https://threadreaderapp.com/thread/1886192184808149383.html); [MIT Technology Review](https://www.technologyreview.com/2025/04/16/1115135/what-is-vibe-coding-exactly/); [martinfowler.com](https://martinfowler.com/bliki/VibeCoding.html).
- **Linus Torvalds**, open-source convention, South Korea, Nov 2025 + [LKML post, 10 Nov 2025](https://lkml.iu.edu/hypermail/linux/kernel/2511.1/02692.html) — *"AI is just another tool, the same way compilers free people from writing assembly code by hand, and increase productivity enormously but didn't make programmers go away."* / *"Vibe coding 'may be a horrible, horrible idea from a maintenance standpoint, if you actually tried to make a product,' but 'a great way…for new people to get involved and get excited about computers.'"* / *"I'm looking forward to the day when AI is less hyped and more the everyday reality that nobody talks constantly about."* — [The Register](https://www.theregister.com/2025/11/18/linus-torvalds-vibe-coding-is-fine-but-not-for-production/); [Gizmodo](https://gizmodo.com/linux-creator-linus-torvalds-is-sort-of-okay-with-vibe-coding-actually-2000689005).
- **Kent Beck**, X, Feb 2025 — *"I've been reluctant to try ChatGPT. Today I got over that reluctance. Now I understand why I was reluctant. The value of 90% of my skills just dropped to $0. The leverage for the remaining 10% went up 1000x. I need to recalibrate."* — quoted in [Rob Bowley, "A plea to junior developers using GenAI coding assistants"](https://blog.robbowley.net/2025/02/03/a-plea-to-junior-developers-using-genai-coding-assistants/).
- **Charity Majors**, Honeycomb CTO, quoted in [InfoWorld, Sep 2024](https://www.infoworld.com/article/3509197/junior-developers-and-ai.html) — *"By not hiring and training up junior engineers, we are cannibalizing our own future."*
- **Trisha Gee**, [O'Reilly Radar, 22 Oct 2024](https://www.oreilly.com/radar/rift-between-junior-and-senior-developers/) — *"If we don't invest in today's juniors, we won't have any seniors tomorrow."*
- **Namanyay Goel**, blog post, Feb 2025; quoted at [IT Pro, 24 Feb 2025](https://www.itpro.com/software/development/junior-developer-ai-tools-coding-skills) — *"Every junior dev I talk to has Copilot or Claude or GPT running 24/7. They're shipping code faster than ever. But when I dig deeper into their understanding of what they're shipping? That's where things get concerning."* / *"We're trading deep understanding for quick fixes, and while it feels great in the moment, we're going to pay for this later."*
- **Stack Overflow moderators**, [Meta Stack Overflow, 5 Dec 2022](https://meta.stackoverflow.com/questions/421831/policy-generative-ai-e-g-chatgpt-is-banned) — *"The average rate of getting correct answers from ChatGPT… is too low… the posting of content created by ChatGPT… is substantially harmful to the site and to users who are asking questions and looking for correct answers."*
- **Rupesh Nasre**, IIT Madras, [TechCircle, 19 Jan 2023](https://www.techcircle.in/2023/01/19/colleges-warn-students-against-using-chatgpt-to-write-essays-code) — *"It should be encouraged for students well aware of programming, who would anyway have written the code even without the help of the tool… First-time programmers should be discouraged from using such tools."*
- **Brendan Humphreys**, Canva survey (Sep 2025), via [CIO Dive](https://www.ciodive.com/news/CIO-concerns-AI-reliance-software-developers/759537/) — *"The engineers who will thrive in this new era are adopting AI to enhance their thinking and output, not replace it."*
- **Andrej Karpathy**, follow-up X posts, mid–late 2025 — Karpathy himself later acknowledged vibe coding is not appropriate for many settings. (Reference: follow-up X posts; [martinfowler.com](https://martinfowler.com/bliki/VibeCoding.html).) *Use with attribution; do not overstate.*

---

## A.5 — Anchor Beats (must appear, named, dated)

- **Karpathy coins "vibe coding"** — Feb 2, 2025. ([X post](https://threadreaderapp.com/thread/1886192184808149383.html))
- **Stack Overflow bans generative-AI content** — Dec 5, 2022 (permanent 2023). ([Meta-SO](https://meta.stackoverflow.com/questions/421831/policy-generative-ai-e-g-chatgpt-is-banned); [The Verge](https://www.theverge.com/2022/12/5/23493932/chatgpt-ai-generated-answers-temporarily-banned-stack-overflow-llms-dangers))
- **Samsung bans AI on company devices** — effective 1 May 2023, walks back by late 2023. ([Bloomberg](https://www.bloomberg.com/news/articles/2023-05-02/samsung-bans-chatgpt-and-other-generative-ai-use-by-staff-after-leak); [TechCrunch](https://techcrunch.com/2023/05/02/samsung-bans-use-of-generative-ai-tools-like-chatgpt-after-april-internal-data-leak/); [CNBC](https://www.cnbc.com/2023/05/02/samsung-bans-use-of-ai-like-chatgpt-for-staff-after-misuse-of-chatbot.html); [Korea Herald](https://www.koreaherald.com/article/3118116))
- **DHH's "I'd retire" essay** — May 2025. ([world.hey.com](https://world.hey.com/dhh/coding-should-be-a-vibe-50908f49))
- **DHH's "promoting AI agents" essay** — Jan 2026. ([world.hey.com](https://world.hey.com/dhh/promoting-ai-agents-3ee04945))
- **DHH's Pragmatic Engineer interview** — Apr 2026. ([newsletter.pragmaticengineer.com](https://newsletter.pragmaticengineer.com/p/dhhs-new-way-of-writing-code))
- **JetBrains State of Developer Ecosystem 2025 published** — 15 Oct 2025. ([devecosystem-2025.jetbrains.com](https://devecosystem-2025.jetbrains.com/))
- **GitHub Octoverse 2025 published** — 28 Oct 2025. ([octoverse.github.com](https://octoverse.github.com/))
- **Stanford SCALE pilot on AI plagiarism** — 8 Jul 2025. ([arXiv 2507.06438](https://arxiv.org/abs/2507.06438v1))
- **MIT Technology Review "What is vibe coding, exactly?"** — 16 Apr 2025. ([technologyreview.com](https://www.technologyreview.com/2025/04/16/1115135/what-is-vibe-coding-exactly/))
- **Microsoft / Carnegie Mellon study on critical thinking under GenAI** — 2025. ([csoonline.com](https://www.csoonline.com/article/3951403/the-risks-of-entry-level-developers-over-relying-on-ai.html))
- **Stack Overflow trust-vs-use paradox** — 2025. ([survey.stackoverflow.co/2025/ai](https://survey.stackoverflow.co/2025/ai))
- **Collins Dictionary "vibe coding" Word of the Year** — Nov 2025. (Anchor beat; cited in current `intro.md`.)
- **The Bridge Balance course thesis ("engineer who directs AI systems")** — present in the current `intro.md`. **Preserved.**

---

## A.6 — Mandatory Retained Facts (every fact currently in `intro.md` MUST appear in the rewrite)

Added after the user's mid-spec clarification ("note that when rewriting, the previous facts and figures should also be told in some way"). This appendix enumerates **every** factual claim from the current `edu-site/docs/intro.md` so the writer, fact-checker, and reader can confirm each one survives in the new prose. The list is exhaustive against the current source; if a new prose draft omits any item, it fails SC-013.

| # | Fact | Survey / Source | Date | Where in current intro | Min word budget in rewrite | Testable check |
|---|------|-----------------|------|-------------------------|----------------------------|----------------|
| 1 | AI tools made **even experienced developers 19% slower** on complex tasks, despite the process *feeling* easier | METR AI Productivity Study | 2025 | "What Nobody Told You About the Shortcut" | 30+ words inside a story beat | substring / paraphrase present, with "METR" + "19%" or "slower" |
| 2 | **63% of developers** report spending *more* time debugging AI-generated code than they would have spent writing it manually | Multiple (SO 2025 corroborates at 66%) | 2025 | "What Nobody Told You About the Shortcut" | 20+ words | "63%" appears and is attributed |
| 3 | The "**vibe coding hangover**" concept (downstream cost of delegating intent without foundational knowledge) | Term coined in current intro | 2025 | "What Nobody Told You About the Shortcut" | 15+ words; term used at least once | substring "vibe coding hangover" present |
| 4 | AI-generated code introduces **security vulnerabilities in 45% of cases** | Veracode GenAI Code Security Report | 2025 | "The Security Crisis You're Not Hearing About" | 25+ words | "45%" + "Veracode" present |
| 5 | **Java applications** failed at **over 70%** | Veracode GenAI Code Security Report | 2025 | "The Security Crisis You're Not Hearing About" | 15+ words | "70%" + "Java" present |
| 6 | AI-generated code carries **2.7× higher vulnerability density** than human-written code | Veracode GenAI Code Security Report | 2025 | "The Security Crisis You're Not Hearing About" | 15+ words | "2.7×" present |
| 7 | AI-assisted commits expose **hardcoded credentials at more than twice the rate** of human-only commits | Veracode GenAI Code Security Report | 2025 | "The Security Crisis You're Not Hearing About" | 15+ words | "hardcoded credentials" + "2×" or "twice" present |
| 8 | **Fortune 50 enterprises**: **10× increase in security findings per month** between Dec 2024 and Jun 2025 (from ~1,000 to over 10,000 monthly) | Dark Reading / Apiiro Enterprise Security Data | 2025 | "The Security Crisis You're Not Hearing About" | 25+ words | "Fortune 50" + "10×" present, with date range |
| 9 | **IBM and Cisco** now allocate **20–30% of their IT budgets** to refactor AI-generated technical debt | IBM Think 2025; Cisco | 2025 | "The Security Crisis You're Not Hearing About" | 20+ words | "IBM" + "Cisco" + "20–30%" present |
| 10 | **75% of companies** projected to hit **moderate-to-high technical debt severity by 2026** | Analyst projection (cited in current intro) | 2025–26 | "The Security Crisis You're Not Hearing About" | 15+ words | "75%" + "2026" present |
| 11 | **March 2026** alone brought **over 30 new AI model releases** from OpenAI, Anthropic, Google, NVIDIA | Industry reporting | Mar 2026 | "The Second Crisis: Option Paralysis" | 25+ words | "March 2026" + "30" + at least 2 vendor names present |
| 12 | **Stack Overflow 2025 Developer Survey** (49,000+ developers): **AI adoption rose to 84%**, **trust fell to 29%** — an **11-point drop in one year** | Stack Overflow Developer Survey 2025 | 2025 | "The Second Crisis: Option Paralysis" | 30+ words | "84%" + "29%" + "Stack Overflow" + "49,000" (or "49k") present |
| 13 | Teams switching across too many AI tools deliver **40% less work and double their defect rate** | AWS research | 2025 | "The Second Crisis: Option Paralysis" | 20+ words | "40% less" + "defect rate" (or "twice the defects") present |
| 14 | **Entry-level software engineering postings**: **down ~40% from 2022 peak** | Indeed FRED Labor Market Data | 2025 | "The Labor Market Has Already Spoken" | 15+ words | "entry-level" + "40%" + "2022" present |
| 15 | **Big tech entry-level hiring**: **down >50% over three years** | Indeed / LinkedIn Workforce Report | 2025 | "The Labor Market Has Already Spoken" | 15+ words | "big tech" (or "FAANG"/"Big Tech") + "50%" + "three years" present |
| 16 | **Software developer employment (ages 22–25)**: **down nearly 20%** | Stanford Digital Economy Lab "Canaries in the Coal Mine" (Brynjolfsson et al.) | Nov 2025 | "The Labor Market Has Already Spoken" | 20+ words | "22–25" (or "22 to 25") + "20%" + "Stanford" present |
| 17 | **57% of hiring managers** now trust AI's work more than interns or recent graduates | LinkedIn / industry survey | 2025 | "The Labor Market Has Already Spoken" | 20+ words | "57%" + "hiring managers" present |
| 18 | The share of AI/ML and architecture-adjacent roles in tech postings grew from **10% to 50%** between 2023 and 2025 | LinkedIn Workforce Report 2025 | 2025 | "The Labor Market Has Already Spoken" | 20+ words | "10%" + "50%" + "2023" + "2025" present |
| 19 | **Software architect salaries** run **~50% higher than senior engineers** globally | Industry compensation data | 2025 | "The Labor Market Has Already Spoken" | 15+ words | "architect" + "50%" present |
| 20 | The market isn't asking for fewer engineers — it's asking for **differently prepared ones**; the bar has **shifted**, not lowered | Thesis framing in current intro | — | "The Labor Market Has Already Spoken" | 20+ words | "differently prepared" or "the bar has shifted" paraphrase present |
| 21 | **"Specification Poverty"** — the named discipline-gap concept | Term coined in current intro | 2025 | "The Missing Layer: Specification Poverty" | 30+ words | substring "Specification Poverty" present, with one-sentence definition |
| 22 | **Andrej Karpathy** — founding member of OpenAI, former Director of AI at Tesla — publishes "vibe coding" essay | X post, 2 Feb 2025 | Feb 2025 | "The Moment Everything Changed" | 25+ words | "Karpathy" + "February 2025" + "vibe coding" present |
| 23 | **Collins Dictionary names "vibe coding" the Word of the Year** | Collins Dictionary Word of the Year | Nov 2025 | "The Moment Everything Changed" | 15+ words | "Collins" + "Word of the Year" + "November 2025" present |
| 24 | **"In ten months, a phrase coined by one of AI's architects became the defining label for how an entire generation of developers now works"** — the velocity framing | Editorial claim grounded in dates above | — | "The Moment Everything Changed" | 15+ words | paraphrase present, anchored on the two dates |

**Total mandatory fact-burden**: ≈ 500–650 words of prose must directly carry these 24 facts. The remaining 6,000–7,000 words of the introduction is story, framing, and bridge.

**Per-fact cross-check (SC-013 / SC-014)**: For each row above, the writer must be able to point to a span of new prose that supports it, with the survey/publisher attached (inline or footnote). The implementation phase builds a per-fact mapping table; the reader panel + the fact-check audit both consume it.