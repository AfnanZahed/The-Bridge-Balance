---
id: 0146
title: Certificates off the site and marketing rule
stage: general
date: 2026-09-23
surface: agent
model: deepseek/deepseek-v4.1-flash
feature: none
branch: main
user: owner
command: none
labels: ["certificates","marketing","ai-studio"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - _scratch/job-briefs/2026-09-23/job19b-certs-sweep.md
  - edu-site/docs/faq.md
  - edu-site/docs/welcome.md
  - edu-site/docs/ch00-introduction.md
  - edu-site/docs/changelog.md
  - edu-site/src/pages/index.tsx
  - edu-site/src/components/HomepageHero/index.tsx
  - edu-site/src/components/DataViz/KPIGrid.tsx
  - edu-site/static/img/stage-1.svg
  - edu-site/static/img/stage-2.svg
  - edu-site/static/img/stage-3.svg
  - edu-site/static/img/stage-4.svg
  - edu-site/static/img/stage-bg-1.svg
  - edu-site/static/img/stage-bg-2.svg
  - edu-site/static/img/stage-bg-3.svg
  - edu-site/static/img/stage-bg-4.svg
  - README.md
  - curriculum-state/canon/course-structure.md
  - CLAUDE.md
  - _scratch/job-briefs/2026-09-22/agenda/index.html
  - history/prompts/general/0146-certificates-off-the-site-and-marketing-rule.general.prompt.md
tests:
  - npm run build (green; one non-fatal broken-anchor warning, from the dated 2026-09-22 changelog entry)
  - npm run typecheck (clean)
  - npm run lint (64 errors, 3 warnings — the pre-existing baseline, no new ones)
---

## Prompt

About the Shot 1, I am using the Google AI studio, there, there are multiple options to select, we have to use each of them carefully, becuase I tried them using casually but the voice was not accordingly. the option there to fill are: 1. Scene (e.g. A bustling street at night...) 2. Sample Context (e.g. Previous speaker just finished a long story...), 3. speaker (there are too many male and female speakers, i was confused to which one to select, so I tested all and selected one, which is despina). 4. expression (available are: admiration, adoration, aggression, agitation, amusement, anger, annoyance, awe, confusion, curiosity, determination, enthusiasm, excitement, frustration, hope, interest, laughs, negative, nervousness, neutral, positive, tension, whispers.), 5. Temprature (0-2, default is 1), 6. Audio Profile (Describe the voice persona (e.g., warm, energetic, professional)), 7. Director's note: a. Style: ""### Vocal Smile

The "Vocal Smile": The soft palate is raised
to keep the tone bright, sunny, and explicitly
inviting.

### Newscaster

Professional, authoritative, clear articulation
with standard broadcast cadence.

### Whisper

Intimate, breathy, close-to-mic proximity
effect.

### Empathetic

Warm, understanding, soft tone with gentle
inflections.

### Promo/Hype

High energy, punchy consonants, elongated
vowels on excitement words.

### Deadpan

Flat affect, minimal pitch variation, dry
delivery.
""
b. ""### Pace:

**Natural**
Natural conversational pace.

**Rapid Fire**
Fast, energetic, no dead air. Sentences
overlap slightly.

**The Drift**
Slow, liquid, zero urgency. Long pauses for
breath.

**Staccato**
Short, clipped sentences with distinct
pauses between words.
""
c. Accent: ""
Neutral
American (Gen)
American (Valley)
American (South)
British (RP)
British (Brixton)
Transatlantic
Australian""




About the shots: when i said shots, I actually didn't meant the shorts, i mean that for each new functionalities, and new anything which we can convert into marketing using any pretext, or any update, or change, I will announce it profesisonaly, with 100% comfidence, this didn't meant that dividing the existing shot. we can make our shot/shorts wording proper. but with your shots (by making it divide) mistake, I got an idea to make shorts/reels from 1 video. however, we MUST have to market ourself ULTRAORDINARILY, yes, you heard it right, not just "EXTRA" ordinary, but literally EXCEPTIONAL, SUPERB AND "ULTRA"ORDINALIRY GENUIS LEVEL MARKETING, on each and every major and even MINOR things and levels. NOTE THIS RULE FOR OUR PROJECT USING THE DEEPSEEK. we will utilize all the social media platforms, with mostly texts and videos, but also may be with images sometimes when it makes sense. hopefully using composio (as i think) to save time.

Four things to check before I record:

1. I think the Reading literacy is a good one, but as a pakistani, i am not expert in the english language and grammer, and i don't know what ACTUALLY reading means and what are it's limits both soft and hard. whether the understanding is including in reading or not, understanding the logic, architectural decisions, and be able to perform very very good and great architectural and engineering (not just developmental) decision or not??? if all these things are including in the word 'Reading', so that we can use the 'Reading' word in contrast of 'Writing' the syntax. if you need research, deepseek will do it, your tokens are tooo much expensive and also your weekly token quota (in my 20$s claude's subscription plan) is very very tight and we (I with you) have to do a lot of remaining things, we can't afford to wait for your limit reset, so save your tokens.
2. Erase Harvard certificates from screen, and also ask the deepseek and in the frontend, the old stages and 2 certs are visible in too many places, update them. remove the certs from the frontend entirely as of now, it is just a backend directional and research based businness-first and technical-first decision to plan whether to include them and other certs in our platform and curriculum or not. 
3. Ok, Just when you say in the script that this is 100%, to make the honoesty and gain the trust of the students, use the word content which they are going to read or see in my video to avoid any misunderstadning. 
4. Ok, I will crop the url area even if visible. 

yes the Postiz may be better for me qualitatively, but I have to then spend money and I don't have yet, I have to start for free from small level with composio free tier limits.

## Response snapshot

Claude set the AI Studio voice settings and fixed the script's free-content line; DeepSeek took the certificates and old stage traces off the site, recorded the marketing rule, and researched the word Reading and Composio's free plan.

## Outcome

- ✅ Impact: The Harvard certificates (CS50P, CS50W, edX) are off every reader-facing surface — the FAQ, the Welcome page, the Stage 0 introduction, the homepage and its hero, the KPI cards and the root README — and the old-stage artwork titles are gone from `static/img`. The owner's marketing rule is recorded word for word in `CLAUDE.md`, and the decision itself is canon: CS-34 in `curriculum-state/canon/course-structure.md`, with open question CS-Q8 marked answered.
- 🧪 Tests: `npm run build` green (frontmatter, references, chapter gate, manifest and search index all pass; 11 chapters checked, 20 skipped as `placeholder`). `npm run typecheck` clean. `npm run lint` 64 errors and 3 warnings — exactly the baseline, none of them in an edited file. The build prints one broken-anchor warning: the 2026-09-22 changelog entry still links to `/faq#what-does-the-cs50-certification-cost`, whose section this job removed; that entry is a dated record the brief says to leave alone, so the warning is reported rather than fixed.
- 📁 Files: the site files and the two rules files listed in the frontmatter, the agenda page, and this record. Every edited file was copied byte-for-byte first to `_scratch/backup-2026-09-23-certs-sweep/` at its own relative path, and the agenda was snapshotted to `agenda/index.pre-job19.html`.
- 🔁 Next prompts: the owner's decision on CS50 and any other certificate, once the business-first and technical-first research lands; the marketing package for this change, per the new standing rule; the public name for the reading skill.
- 🧠 Reflection: The certificates were never in one place. They sat in a hero eyebrow, a hero meta row, a KPI card, a feature pillar, a marquee chip, two meta descriptions, a JSON-LD block, three documentation pages and the root README — nine surfaces, each written in a different voice. Slots that had to keep holding text were refilled only from facts the site already states (three stages, zero background needed, one continuous read, free-tier stack), so nothing new was claimed in the act of removing something false.

## Evaluation notes (flywheel)

- Failure modes observed: the first PowerShell edit pass indexed a single-element result as a string, so `$pair[0]` and `$pair[1]` became the first two characters — it replaced every `<` with `t` in the four `stage-bg-*.svg` files. The byte comparison against the backups caught it immediately (byte length identical, `<` count zero), the files were restored from backup and the edit redone with the old string asserted first; all four now match backup-plus-exactly-one-edit.
- Graders run and results (PASS/FAIL): not run.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): run the sweep terms as a script that also counts occurrences per surface, so "files changed" and "remaining hits" fall out of one run instead of two manual greps.
