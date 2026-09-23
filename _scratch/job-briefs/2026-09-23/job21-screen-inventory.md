# Job 21 — Screen inventory: what a camera can show, in this order

Live https://the-bridge-balance.vercel.app/ · source edu-site/ · verified against the live pages and their source 2026-09-23.

## 1. Homepage (/) — top to bottom
**1. Hero** — full-screen CSS mesh with an animated "gateway flow" canvas (bezier lines converge on the centre). The brand arch mark draws itself on load (deck → spans → keystone, then a slow halo). Eyebrow: "**100%** free · **3** stages · **Zero** background needed". H1: "Lead AI agents with engineering judgment." (serif accent). Sub: "The Bridge Balance is the textbook for students learning spec-driven AI agent engineering — a complete 3-stage curriculum…". Buttons: "Start reading" and "See the three stages" (both → /welcome; arrow slides on hover). Meta row: "From zero to expert" · "Video + text, paired" · "Free-tier stack, forever".
**2. The curriculum** → H2 "Three stages, one bridge from student to engineer." Sub "Each stage unlocks the next. Skip ahead, jump back…". Three cards (hover: lift + border shift; footer "Open stage →"): "Stage 00 / Introduction to SDE / …plus Spec-Driven Engineering and Code Literacy: reading and judging code…" → /intro-1-binary-to-programming · "Stage 01 / SDE Mastery (AI-Driven) / …the engineering and the agent growing together." → /stage-01-sde-mastery-ai-driven/ · "Stage 02 / SDE Mastery (AI-Native) / RAG, tool calling, multi-agent systems, evaluations…" → /stage-02-sde-mastery-ai-native/.
**3. Marquee** — one chip strip scrolling left, pauses on hover: Spec-driven development · Frontend engineering · Backend APIs · Postgres + Qdrant · Claude Code · OpenCode · Multi-agent systems · MCP servers · Skills & plugins · GitHub portfolio · Prompt & context engineering · Zero cost, forever.
**4. Why this book** → H2 "Built for the way students actually learn." Sub "Four principles guide every chapter, every video, every spec." Four numbered plates (01–04), each lifts on hover while a soft spotlight follows the pointer: "Video + text, paired" · "One continuous read" · "Free-tier, forever" · "Specs, not prompts".
**5. The numbers → "Curriculum at a glance"** — Sub "Real numbers from the platform spec — what each stage covers, where the writing stands, and what it costs you. Exactly zero dollars." Six KPI cards, digits count up from 0 when scrolled in: Stages **3** "Switches to Autonomy" · Textbook "Free Forever" "Open source, no paywall" · Starting point "Zero" "No prior programming" · A chapter "One sitting" "One file, start to finish" · Free Services **15+** "Neon, Qdrant, Vercel..." · Tuition Cost **0$** "100% open & free". Two charts below:
- "Progress / Stage status": horizontal bars, tip labels "Live" (Stage 0, full) and "In development" (Stage 1 and Stage 2, short stubs); hover a bar → tooltip "Stage 0 / Status: Live / one-line description"; legend Stage 0 · Stage 1 · Stage 2.
- "Structure / Three stages at a glance": equal-slice donut; hover a slice → the same stage/status/description tooltip; legend Stage 0 · Stage 1 · Stage 2.
**6. "Built with Claude Code, in the open."** (alt background) — Sub "The textbook is co-authored…". A vertical timeline; cards fade in from left/right on scroll: "Step 01 Co-research" · "Step 02 Text writing" · "Step 03 Image integration" · "Step 04 Video recording".
**7. "Ready to start?"** — closing card over a gradient blob that follows the cursor: "Start with the Welcome page: what the book is, the three stages, and where to begin… Everything is free." Button "Start reading →" (→ /welcome).
Footer: "Curriculum" links — Stage 0 — Introduction to SDE / Stage 1 — SDE Mastery (AI-Driven) / Stage 2 — SDE Mastery (AI-Native); "Copyright © 2026 The Bridge Balance. 100% free, forever."

## 2. Welcome page (/welcome) — headings in order
Badge above the H1, from frontmatter: "Text ready — video coming soon".
**# Welcome** — "Welcome to The Bridge Balance — a free curriculum from zero programming background to engineering autonomous AI agents of your own."
**## What is Spec-Driven Engineering?** — "Software engineering, with AI on both sides of it."
**### The problem it solves** — "The industry has split into two failing habits." (vibe coding; a 2025 METR study finds AI made developers 19% slower)
**### Why the checking can't move to the machine** — "A travel agent decides where you fly." (courier's tracking page; ends by naming Code Literacy)
Safety floor (warning callout) — "Whatever the AI writes for you, it is not finished until you have checked it yourself."
**### What this book actually covers** — table, 3 columns **Stage | What it covers | What you leave able to do**; rows **0 — Introduction to SDE**, **1 — SDE Mastery (AI-Driven)**, **2 — SDE Mastery (AI-Native)**.
**## You don't need a coding background to start** — "You start at zero." (2 bullets: start at zero / finish directing AI agents)
**## What you need before you start, and what you don't** — table, 2 columns **You need | You don't need**, 5 rows: laptop or desktop / internet / curiosity / patience / consistency vs no degree / no paid subscription / no programming experience / no signup / no AI background.
**## How to read this book** — "This book is built to be read in order, not sampled." → **### The shape of it** (Stage / Chapter / Lesson or Part) · **### Why it's ordered this way** (Stage 0 starts at history; any page stands on its own) · **### Reading conditions** (self-paced; built for a phone).
**## What's still being built** — "This book updates often." Bullets: "Community." (no Discord or forum yet) and "A help chatbot", planned.
**## Who's behind this** — "The Bridge Balance is written and maintained by Afnan Zahed, a Senior Agentic AI Engineer…"
**## Start reading** — "Read From Electricity to Programming — the first chapter, and the start of all three stages."

## 3. Glossary — the Code Literacy entry
URL: https://the-bridge-balance.vercel.app/glossary#code-literacy (the page also anchors #agent, #blast-radius, #specification-spec, #spec-driven-engineering, #vibe-coding).
Heading **Code Literacy**, then verbatim:
"The ability to read code — whoever or whatever wrote it — and judge it well enough to verify it and own it."
"First met on the Welcome page. This is the book's own name for its core skill, not a standard industry term. It is introduced in full the first time you meet it, and links back here after that."

## 4. Sidebar and top bar — every clickable item
**Top bar:** hamburger (far left, always visible) → opens the "Site Navigation" drawer = Home plus the full chapter tree (backdrop, close X, Escape, focus trapped). Logo / "The Bridge Balance" → home. **Curriculum** → the docs sidebar. **Search:** on "/" a round icon opens the full-screen Apple Spotlight — it also auto-opens once per browser session, and ⌘K/Ctrl+K toggles it; inside, a "Search the curriculum" field and three stage-glyph circles (Stage 0/1/2) that expand on hover, and live result cards as you type. On chapter routes the same search is a 40px bar in the navbar's right slot that expands on click. **Theme toggle** (sun/moon, far right) → light↔dark, remembered.
**Doc pages add:** a 3px reading-progress bar across the top that fills as you scroll, a left sidebar with a labelled collapse handle (folds to a 44px rail), and a foldable "On this page" panel on the right. Bottom-right floating "Ask the book" trigger → the chat preview panel.
**Left sidebar, top to bottom** — clicking a leaf navigates; a stage's caret expands/collapses:
- "Welcome"
- "Stage 0 — Introduction to SDE" (open): ch00-introduction · intro-1-binary-to-programming · intro-2-architecture-map · intro-3-editors-and-ides · intro-4-terminals-and-cli-agents · intro-5-spec-driven-engineering · ch01-foundations · ch02-programming-is-born
- "Stage 1 — SDE Mastery (AI-Driven)" (collapsed; 10 leaves): foundations · core-programming · frontend · backend · databases · git-github · prompt-engineering · context-engineering · claude-code · skills-and-mcp
- "Stage 2 — SDE Mastery (AI-Native)" (collapsed): rag-and-tool-calling · multi-agent-systems · evaluations
- "Reference" (collapsed): Code of Conduct · FAQ · Glossary · Changelog · Performance Targets · Accessibility

## 5. Where the six themes appear
- **Code Literacy** — homepage Stage 00 card and Stage 0's descriptions in both charts; Welcome ("…before you trust it is Code Literacy"); the glossary entry; changelog 2026-09-23 (New).
- **The three stages** — homepage hero eyebrow ("3 stages"), H2 "Three stages…", CTA "See the three stages", KPI "Stages 3", donut "Three stages at a glance"; Welcome (stage table; "The three stages are fixed…"); changelog 2026-09-22.
- **Learning things together** — homepage Stage 01 card ("the engineering and the agent growing together", "side by side"); Welcome stage table ("together with prompt and context engineering"); Stage 1 and Stage 2 overview pages ("learned together"); changelog 2026-09-22.
- **Spec-Driven Engineering** — homepage Stage 00 card and the plate "Specs, not prompts"; the whole Welcome section; the glossary entry; changelog 2026-09-14 and 2026-09-16.
- **Free** — homepage eyebrow "100% free", meta "Free-tier stack, forever", plate "Free-tier, forever", KPIs "Free Forever" and "Tuition Cost 0$", marquee "Zero cost, forever", closing "Everything is free.", footer "100% free, forever"; Welcome ("a free curriculum…", "free, forever"); changelog.
- **Changelog** — sidebar "Reference → Changelog" and the /changelog page itself; the homepage links it nowhere, and nothing else on these pages names it.

## 6. What must not be on camera
- **KPI digits sitting at 0** — "Stages" and "Free Services" read "0" until the dashboard scrolls into view and the counters run (then 3 and 15+). Film them after the count-up, or they contradict the script.
- **All 13 Stage 1 and Stage 2 leaf pages are empty**, each carrying the badge "Placeholder — awaiting text" (10 Stage-1 + 3 Stage-2 sidebar items; the unlisted /intro-1-binary-to-programming/01-binary too). Do not click into them.
- **The "Ask the book" chat** (bottom-right) is a preview: header "preview build", and any send or Enter replaces the composer with "This isn't switched on yet. … no api connected · nothing transmitted". Not a working assistant.
- **Welcome's top badge "Text ready — video coming soon"** — a state badge, not page content; fine to show, but do not caption it as content.
- Light-mode hero mesh and the closing gradient are very pale; check contrast on the recording monitor before filming.
