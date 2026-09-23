---
id: 0145
title: Demo fixes and intro script
stage: general
date: 2026-09-23
surface: agent
model: claude-sonnet-5
feature: none
branch: main
user: owner
command: none
labels: ["demo", "homepage", "marketing"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - _scratch/job-briefs/2026-09-23/job17b-demo-fixes.md
  - edu-site/src/components/HomepageHero/index.tsx
  - edu-site/src/pages/index.tsx
  - edu-site/src/components/DataViz/KPIGrid.tsx
  - edu-site/src/components/DataViz/index.tsx
  - edu-site/docs/stage-01-sde-mastery-ai-driven/index.md
  - edu-site/docs/stage-02-sde-mastery-ai-native/index.md
  - edu-site/scripts/generate-search-index.mjs
  - edu-site/docs/changelog.md
  - _scratch/job-briefs/2026-09-22/agenda/index.html
  - history/prompts/general/0145-demo-fixes-and-intro-script.general.prompt.md
tests:
  - npm run build (green)
  - npm run typecheck (clean)
  - npm run lint (64 errors, 3 warnings, unchanged)
---

## Prompt

yes build 2 to 5 using deepseek. also, I am going to exponentially utilize all the things, so, I will record multiple shots, 1 with introducing the platform, the voice over in the video will be telling the summary of 2 problems and out solution, the reading literacy, and the merged stages learning system. also, it will welcome and introduce to the platform, mean both the philosophy and the site will be introduced at the same time. it will be like you (not deepseek) will write me the script, the google AI studio will give me the voice for that exact script, and I will record the video using the recordly, as per the script. When script will introdcu the web and welcome, i will start the site, click (to zoom) at the hero heading, then while welcoming and introducing our SOLUTION, i will open the welcome page, when It will introduce the stages and learning, I will click (to zoom, in recordly, the screenrecorly be zoomed when we click anywhere) the stages and the chapters, it will expand. and then the script will tell everyone to stay tuned, because soon, we are going to start the actual content, the exact teaching, my afnan zahed will  teach MYSELF, the content is going to be 100% Free, and stay tuned until we introduce a lot of new things like chatbot, changelog, Agent Skills, Plugins, MCP servers, etc. but we have to market our self in an EXTREME manner, and we MUST have to utilize each and everything and make even every dot and jot of the word market us and our platform. for multiple shots, we need to divide the things, what to include in which shots. also, note that nothing is going to be shared on the whatsapp status, just in my whatsapp groups/community, and other social media. Also, the composio is connected with you as the connector, check whether if the text to post and video is already for example, then the AI (you the claude, or deepseek) will post on all the social media using composio? becuase I have to automate the things, becuase I already have the to learn the core content of the book my self, teach them, record video lectures, do the development side of the book/website, marketing, planing etc. so,, as a solo learner/teacher/entrprenuer/developer/manager, i need MAXIMUM automation, the real POWER OF AI

## Response snapshot

DeepSeek built demo fixes 2 to 5; Claude wrote the voice-over script and the multi-shot plan, and checked Composio for social posting.

The four fixes came from the demo plan's section 1, against the job brief `_scratch/job-briefs/2026-09-23/job17b-demo-fixes.md`. **Buttons:** the two hero buttons and the closing call to action all open the Welcome page now, and the three labels that no longer matched where they went were renamed ("Start reading", "See the three stages"). **Homepage lines:** "Built for working developers" became "From zero to expert" (the reader starts as a complete beginner and finishes as an expert, canon/audience.md); the "Est. Hours 48h" card was replaced by one true fact the six-column layout holds, "A chapter / One sitting", and the section subtitle stopped promising a length; "Every chapter ships twice" now says the written text comes first and the video follows each part. **Stage 1 and Stage 2:** both opening pages lost the old-placeholder wording, the only live "Stage 3" mention and the "video series" note, and now carry two plain sentences on what the stage teaches plus one saying its chapters are being written now; both frontmatters carry `chapter_state: "text-ready"`. **Search:** the generator now skips `placeholder` pages and derives routes the way Docusaurus does (the leading numeric prefix is stripped from the file name), so the index holds 17 records and none of them dead; searching "Binary" no longer returns the 404. A 2026-09-23 changelog entry was added, and the agenda page was refreshed: the answered site question is gone, "Site fixed for the intro recording" heads "Done today", and two new chores ask for the deploy and the 1200×630 share image.

## Outcome

- ✅ Impact: The site is recordable. Every homepage button lands on a real page, no homepage line contradicts the canon, the two stage pages say something true, search offers only pages that open, and the changelog carries today's entry as the proof the demo leans on.
- 🧪 Tests: `npm run build` green (Docusaurus static build, frontmatter, references and chapter gates all pass); `npm run typecheck` clean; `npm run lint` 64 errors and 3 warnings, exactly the pre-existing baseline, none of them in the edited files. The built `search-index.json` was checked record by record: 17 records, 0 dead routes.
- 📁 Files: the site files listed in the frontmatter, the agenda page, and this record. Every edited file was backed up byte-for-byte first, under `_scratch/backup-2026-09-23-demo-fixes/` at its own relative path.
- 🔁 Next prompts: deploy the three-stage site so the live address matches the laptop; the owner's 1200×630 share image; then record in Recordly against the recorded script.
- 🧠 Reflection: The dead search result was one bug wearing two faces. The record was stale (generated before the five-stage folders were deleted) and the generator computed routes differently from Docusaurus, so even a fresh run would have pointed `01-binary.md` at `/intro-1-binary-to-programming/01-binary` while the built route is `/intro-1-binary-to-programming/binary`. Fixing only the symptom (regenerating the file) would have left the route rule wrong; the generator now mirrors `generate-chapter-manifest.mjs`, and the placeholder skip removes the empty pages in the same pass.

## Evaluation notes (flywheel)

- Failure modes observed: the brief named "the owner's last user message" and pinned it as the one containing "build 2 to 5". By the time the record was written, the transcript had grown a later message (the Composio question, now record 0144), so the two readings of the instruction disagreed. The pinned check won: the message that actually drove this job was extracted, and the mismatch is recorded here rather than silently resolved. Also: a first attempt to run the build in a background shell produced an empty log and exit 1; re-running it in a normal shell showed the build was fine, so no build failure was real.
- Graders run and results (PASS/FAIL): not run.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): add the built-index route check to the build gate, so a search result that opens nothing fails before a reader finds it.
