# The projects this book feeds — and the apply-as-you-write rule

**Recorded 2026-09-26**, from the owner's own words and his `my_details.md`
(interview of 2026-08-31). This is the canon home for the loop the whole project
runs on, and for the project list that loop points at. Change a project or the
rule here first; other files point at this one.

## The rule: every chapter names where its knowledge gets applied

> **Owner's words, 26 September 2026:** *"I am not just going to teach in bridge
> balance, but also going to learn in parallel. The exact thing is that to first
> read, research and learn things on my own, then apply on any of the project
> (whether it's the book's own website or any other) or hackathon, and then I
> will teach."*

So the loop has three stations, and it runs for every piece of content the book
carries, in any stage:

1. **Learn** — read, research and learn the topic first-hand, before it is taught.
2. **Apply** — use it on a real project. The book's own website counts. So does
   any project listed below, and any of the six hackathon blueprints. **The owner
   does this part.**
3. **Teach** — teach it from the book: a video lecture, or a session.

**What the loop buys, in the owner's list:** (1) the knowledge itself;
(2) practice — learning that is not only theory; (3) a portfolio built from real
applications; (4) the confidence and the correctness to teach; (5) authorship of
The Bridge Balance, running in parallel, as one more portfolio asset.

### How the check works

- **At authoring time.** Whenever content is written for any stage, the session
  checks which project(s) this knowledge can be applied to, and names them with
  **one concrete first application each** — small, real, and stated plainly
  enough to act on. It goes in two places: the step 9 report of
  `chapter-production`, and a new entry in
  `curriculum-state/ledgers/application-ledger.yaml`.
- **The session proposes; the owner applies.** An application is the owner's own
  work by definition — an applied project is a thing he built. A proposal is
  never a promise, and **the check is not a gate**: a chapter ships even when no
  application has been named yet, as long as the check was recorded.
- **The ledger tracks the loop**: `proposed` by the session, `applied` and
  `taught` by the owner. It is the record of the rule being honoured or not.

## The projects, in the owner's priority order

*(Recorded from `my_details.md` §1, interview of 2026-08-31. Where this repo
knows more than that record, the current state is named. None of these projects
is built by an authoring session on its own authority — the platform track's
spec-first flow governs any engineering on them, and this list is the owner's.)*

### 1. The Book (= Hackathon I) — DO OR DIE

- **What it is:** the free curriculum content itself — this repo, `edu-site/`.
  The textbook is free to read forever; it is the learning surface, not the
  product.
- **Its four jobs, in the owner's words:** learning forcing-function, portfolio,
  teaching source material, and the storefront for the paid products (paid MCP
  servers, Agent Skills, Sub-Agent files, plugins).
- **Owner's record of 31 Aug 2026:** functional on localhost — basic frontend and
  basic backend working, needing major development. Current state: the site is
  live in Alpha (deployed, Welcome page rebuilt, changelog running).
- **Kept from Hackathon I's stack:** a per-chapter chatbot and an Urdu
  translation button. The chatbot is now spec'd as feature 012.
- **Hackathon I's submission window closed** (30 November 2025) with no
  submission. The project is kept purely for portfolio and learning.
- **One item from the 31 Aug record with no home in this repo's canon yet:** a
  nine-cell lesson grid (Beginner / Intermediate / Advanced × Summary / Balanced
  / Detailed), which the owner's record says Claude Code writes. It is not
  recorded anywhere in this repo, and the live levels decision —
  Stage → Course → Chapter → Lesson → Part, with a chapter shipping as one
  continuous read — is newer. Treat the grid's status as **unreconciled**:
  confirm with the owner before relying on it for any stage.

### 2. The Bridge Balance — High

- **What it is:** the paid testing layer, deliberately kept separate from the
  Book: exams, submissions and scoring, progress tracking, and dashboards (one
  student, one admin). It fixes the PIAIC curriculum gap.
- **Price:** roughly 4,000 PKR/month — a working figure, not final.
- **Free layer:** the full curriculum stays free; it is the traffic and
  credibility engine, not the income.
- **Build order:** the Book first; this site one to two months later.
- **Current state:** not built. The first paid-layer feature is the tutor chatbot
  (feature 012, spec'd); auth and payments get their own specs later, under the
  platform track's spec-first flow.

### 3. Multi-Agent Career Assistant — Mid (tied)

- Formerly "Multi-Agent Student Data System"; the old folder on disk is
  "Job Scraper".
- **Scope:** web search and tool integration for jobs, internships, news,
  hackathons, placements, reports, surveys and expert opinions, with portfolio
  critique eventually — plus automation of daily personal and professional tasks
  (for example social media through Composio).
- **Audience:** PIAIC / GIAIC / Panaversity first, a wider audience later.
- **Model:** freemium with paid tiers, plus a portfolio element for the owner.
- **Fed by:** hackathons 0 and 5 below. Pure idea today.

### 4. PanaShowCase — Mid (tied)

- **What the payer gets:** highlights and personal branding for a student, and
  the compilation of their work in one organized place.
- **Model:** freemium, free versus paid tiers. Not an instant-money project, and
  it is gated behind the owner completing his own curriculum first.
- **Distribution:** the PIAIC / GIAIC / Panaversity WhatsApp groups — an
  audience that already exists.
- **Confirmed separate from the Career Assistant** — two products, not to be
  merged. Pure idea today.

### 5. Dr. Mir — low-mid, postponed on purpose

- **What it is:** a website for the owner's father's homeopathic practice, to be
  built only once the clinic exists in a good location. Postponed until then,
  deliberately.
- **Attached Multi-Agent System** (case solving and medicine identification):
  not initialized. Its value is portfolio, learning, CV and public reputation —
  and possibly subscriptions from other homeopathic doctors later.

## The six hackathon blueprints — a library, not six builds

All six Panaversity hackathon windows are closed, there were no cash prizes, and
none was ever submitted. The owner's decision (2026-08-30): **keep all six as a
free, professionally-specified blueprint library and harvest them into the
projects above — never build them as six separate submissions.**

| # | Blueprint | Feeds |
|---|---|---|
| 0 | Personal AI Employee — autonomous FTEs, HITL safeguards | Career Assistant |
| I | Physical AI & Humanoid Robotics Textbook | **The Book — in use** (stack kept: chatbot, Urdu translation, published-textbook format) |
| II | Todo Spec-Driven Development | Method, not product — the spec-driven workflow |
| III | Reusable Intelligence and Cloud-Native Mastery | **The paid products** — the skills-library / script pattern |
| IV | Course Companion FTE — chapters, quizzes/grading, progress tracking, search, access control | **The Bridge Balance's paid layer, literally that feature list** |
| 5 | CRM Digital FTE Factory | Career Assistant — social and daily automation, persistent state |
