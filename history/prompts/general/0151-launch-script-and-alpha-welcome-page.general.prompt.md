---
id: 0151
title: Launch script and Alpha Welcome page
stage: general
date: 2026-09-24
surface: agent
model: claude-opus-5-5
feature: none
branch: main
user: owner
command: none
labels: ["video","script","marketing","welcome","alpha"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - curriculum-state/ledgers/term-ledger.yaml
  - edu-site/docs/changelog.md
  - edu-site/docs/glossary.md
  - edu-site/docs/welcome.md
  - edu-site/src/components/DataViz/CurriculumBarChart.tsx
  - edu-site/src/components/DataViz/CurriculumDonut.tsx
  - edu-site/src/components/DataViz/index.tsx
  - edu-site/src/components/HomepageHero/index.tsx
  - edu-site/src/pages/index.tsx
  - _scratch/job-briefs/2026-09-24/job24b-video-facts.md
  - _scratch/job-briefs/2026-09-24/launch-video-script-2026-09-24.md
tests:
  - none
---

## Prompt

the script is not a  good one. AI scored it just 0.1 out of 10. You MUST have to think like a digital marketer, firstly ask the deepseek with max effort to read our new rules and changes about everything and update the welcome page (e.g; including the code literacy, 3 stages exactly how they works etc) because I will also show the text written at the welcome page along with the scipt when that topics comes out. use advanced level student phsycology, marketing techtics, and business mindset. tell them how greatly we mixed the traditional learning with AI Agent development, in parrallel, not step by step. how greatly we priotize the BETTER use of advance AI models and tools, instead of resiting them and how much we specialize in that too not just raditional things. also, how much months of research, and planning, and weeks of develpment of this platforms, and tens hundreds of millions of AI tokens have burned in making this platform (which costs us in dollars) to make FREE content for them. tell them how we respected the others' professionals background and designed it in the way so that no technical background needed. we analyzed and compared and researched the books, documentries, quotes and point of views of Real and TOP level industry experts like Andrew Ng, David malen, Irfan malik (CEO of xeven solutions) and a lot of others, I spent hours of discussing these things with other experts. being written is open means we will announce and share each and everything mean every advancement. and don't ask them to start today, intead, tell them that this site is still is Alpha phase, soon the actual content of the stage 0 will be written, and I am are already working on it, (at this scene, i wll zoom on the url link to show them the vercel link) and tell them that soon it is going to be launched on an official domain, probably thebridgebalance.com hmm, well we are also open for their suggestions. so, soon it will be in the beta phased and the starting content will be provided. also, we are open and warmly welcome them to critique and suggest things. also, tell them that we will be in touch on announcing new things like MCP servers, Agent Skills, A highly advacned end to end AI platform, with more than 10 special functionalities like deepresearch, deepthink, helping in code, differnt modes for students and prfessionals, woring with docs, learning from the book or outside the book, along with it's general knowledge of book and external to discuss and learn with it, changlog, etc so stay tuned. ultra professional one, starting from 'Introducing' and finishing at the 'The Bridge Balance'

## Response snapshot

DeepSeek rewrote the Welcome page for the Alpha launch from the current canon (Code Literacy, the three stages with their subjects learned in parallel, AI used better, no background needed, the research behind the book, Alpha and Beta, the domain, building in the open, what's coming), fixed the homepage lines that called Stage 0 live or the curriculum complete, and deployed; a second job measured the facts (more than 2.4 billion AI tokens, nearly three months of research, more than five weeks of development, the experts' identities). Claude then wrote a new 485-word launch script as a digital marketer, from 'Introducing' to 'The Bridge Balance', with a scene guide to the Welcome page.

## Outcome

- ✅ Impact: The Welcome page became the front door the Alpha launch needed — Code Literacy, the three stages with their subjects learned in parallel, AI used better, no background needed, the research behind the book, the honest Alpha standing and the domain move, building in the open, and what is coming — with the homepage lines that called Stage 0 live or the curriculum complete fixed, and the site deployed to production. The rejected 23 September intro was replaced by one continuous 485-word launch script, written as a digital marketer from "Introducing" to "The Bridge Balance", every number measured by job 24b.
- 🧪 Tests: none.
- 📁 Files: the nine files job 24a changed, plus the two job 24b and launch-script briefs, all listed in the frontmatter.
- 🔁 Next prompts: record the launch voice in AI Studio, then cut the video to the Welcome page's text; the two questions the agenda now holds for the owner (where critique and suggestions should go, and the public GitHub snapshot whose README still says 4 stages and 2 Harvard certificates).
- 🧠 Reflection: the owner fixed the page and the script in one request, so the page had to be true before a word of the script was written — the script's scene guide points at the Welcome page section by section, and the token, research and development figures come from a separate measuring job rather than from memory.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): not run.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
