---
id: 0072
title: SEO Push, Changelog Page, and the "Ship Something Newsworthy, Log It" Standing Rule
stage: green
date: 2026-09-14
surface: agent
model: claude-sonnet-5 (main session — executed directly, no delegation)
feature: none
branch: none (no git in this project)
user: Dell
command: 'start the SEO / search-ranking push today in parallel (point 9), and build a changelog plus a CLAUDE.md rule so future sessions log "what is new" without being asked (point 7)'
labels: ["seo", "changelog", "claude-md", "domain-fix"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - edu-site/docusaurus.config.ts — `url` changed from the placeholder `https://thebridgebalance.example.com` to the real `https://thebridgebalance.app` (line 16); the comment above it now records that this one line is the swap point if the domain ever changes
 - edu-site/static/robots.txt — new: `User-agent: *` / `Allow: /` plus `Sitemap: https://thebridgebalance.app/sitemap.xml`
 - edu-site/src/pages/index.tsx — new `<Head>` block (lines 155-172) emitting schema.org JSON-LD: `@type: "Course"`, an `Organization` provider, `isAccessibleForFree: true`, canonical `url`
 - edu-site/docs/changelog.md — new reference page (sidebar_label / sidebar_position 97 / title / description frontmatter, no `chapter_state`, no `content_kind`), seeded with a real dated `### 2026-09-14` entry
 - edu-site/sidebars.ts — `{ type: "doc", id: "changelog", customProps: { unnumbered: true } }` added to the Reference category (line 102), matching the glossary / perf-targets shape exactly
 - edu-site/scripts/check-frontmatter.mjs — `"changelog.md"` added to the `STAGE_FILES` allowlist (line 47), so the frontmatter gate stops demanding `chapter_state` from the new reference page
 - CLAUDE.md — new standing rule "Ship something newsworthy, log it." (line 46): append a dated `changelog.md` entry the moment a chapter goes `text-ready`, a stage gets promoted, or a real platform feature lands — even if the user didn't ask that time; skip it for internal-only work
tests:
 - cd edu-site && npm run typecheck — exit 0 (run after each change)
 - cd edu-site && npm run build — exit 0 (five gates + the Docusaurus production build); the first build failed for a real reason — `changelog.md` existed but had no `STAGE_FILES` entry, so `check-frontmatter.mjs` demanded `chapter_state` from it — fixed by adding the entry, then re-run clean
---

## Prompt

1. KPIGrid stale-stat fix:
instead of doing it yourself or using deepseek yourself, write me an ai prompt for this task and I will paste that prompt into another AI, and it's answer here into your chat
2. No welcome or orientation moment: if you can't search the web, here is the content of both the CS50p and hugging face's welcomes': CS50P: [Welcome](https://cs50.harvard.edu/web/#welcome)
This course picks up where [CS50x](https://cs50.harvard.edu/x/) leaves off, diving more deeply into the design and implementation of web apps with Python, JavaScript, and SQL using frameworks like Django, React, and Bootstrap. Topics include database design, scalability, security, and user experience. Through hands-on projects, students learn to write and use APIs, create interactive UIs, and leverage cloud services like GitHub and Heroku. By semester’s end, students emerge with knowledge and experience in principles, languages, and tools that empower them to design and deploy applications on the Internet.
Prerequisites
[CS50x](https://cs50.harvard.edu/x) or prior experience in any programming language.
Watch an introduction
[How to Take this Course](https://cs50.harvard.edu/web/#how-to-take-this-course)
Even if you are not a student at Harvard, you are welcome to “take” this course for free via this OpenCourseWare by working your way through the course’s nine [weeks](https://cs50.harvard.edu/web/weeks/) of material. For each week, follow this workflow:
Watch Lecture
Submit Project
And then submit the course’s [final project](https://cs50.harvard.edu/web/project/).
To submit the course’s [projects](https://cs50.harvard.edu/web/projects/) and [final project](https://cs50.harvard.edu/web/project/) for feedback, be sure to [create an edX account](https://courses.edx.org/register), if you haven’t already. Ask questions along the way via any of the course’s [communities](https://cs50.harvard.edu/web/communities/)!
   * If interested in a [verified certificate](https://www.edx.org/verified-certificate) from [edX](https://www.edx.org/), enroll at [cs50.edx.org/web](https://cs50.edx.org/web) instead.
   * If interested in a professional certificate from [edX](https://www.edx.org/), enroll at [cs50.edx.org/programs/web](https://cs50.edx.org/programs/web) instead.
   * If interested in [transfer credit and accreditation](https://extension.harvard.edu/for-students/student-policies-conduct/transfer-credits-accreditation/) from [Harvard Extension School](https://www.extension.harvard.edu/), register at [web.dce.harvard.edu/extension/csci/e/33a](https://web.dce.harvard.edu/extension/csci/e/33a) instead.
   * If interested in [transfer credit and accreditation](https://summer.harvard.edu/academic-opportunities-support/policies-and-regulations/academic-policies/transfer-credit-accreditation/) from [Harvard Summer School](https://www.summer.harvard.edu/), register at [web.dce.harvard.edu/summer/csci/s/33a](https://web.dce.harvard.edu/summer/csci/s/33a) instead.
[How to Teach this Course](https://cs50.harvard.edu/web/#how-to-teach-this-course)
If you are a teacher, you are welcome to adopt or adapt these materials for your own course, per the [license](https://cs50.harvard.edu/web/license/). Additionally, we encourage teachers to participate in the [CS50 Educator Workshop](https://cs50.harvard.edu/workshop) to learn more about CS50’s curriculum, technology, and pedagogy

Hugging face: Welcome to the 🤗 AI Agents Course
AI Agents Course thumbnail
The background of the image was generated using Scenario.com
Welcome to the most exciting topic in AI today: Agents!

This free course will take you on a journey, from beginner to expert, in understanding, using and building AI agents.

This first unit will help you onboard:

Discover the course’s syllabus.
Choose the path you’re going to take (either self-audit or certification process).
Get more information about the certification process.
Get to know the team behind the course.
Create your Hugging Face account.
Sign-up to our Discord server, and meet your classmates and us.
Let’s get started!

What to expect from this course?
In this course, you will:

📖 Study AI Agents in theory, design, and practice.
🧑‍💻 Learn to use established AI Agent libraries such as smolagents, LlamaIndex, and LangGraph.
💾 Share your agents on the Hugging Face Hub and explore agents created by the community.
🏆 Participate in challenges where you will evaluate your agents against other students’.
🎓 Earn a certificate of completion by completing assignments.
And more!

At the end of this course, you’ll understand how Agents work and how to build your own Agents using the latest libraries and tools.

Don’t forget to sign up to the course!

(We are respectful of your privacy. We collect your email address to be able to send you the links when each Unit is published and give you information about the challenges and updates).

What does the course look like?
The course is composed of:

Foundational Units: where you learn Agents concepts in theory.
Hands-on: where you’ll learn to use established AI Agent libraries to train your agents in unique environments. These hands-on sections will be Hugging Face Spaces with a pre-configured environment.
Use case assignments: where you’ll apply the concepts you’ve learned to solve a real-world problem that you’ll choose.
The Challenge: you’ll get to put your agent to compete against other agents in a challenge. There will also be a leaderboard for you to compare the agents’ performance.
This course is a living project, evolving with your feedback and contributions! Feel free to open issues and PRs in GitHub, and engage in discussions in our Discord server.

After you have gone through the course, you can also send your feedback 👉 using this form

What’s the syllabus?
Here is the general syllabus for the course. A more detailed list of topics will be released with each unit.

Chapter	Topic	Description
0	Onboarding	Set you up with the tools and platforms that you will use.
1	Agent Fundamentals	Explain Tools, Thoughts, Actions, Observations, and their formats. Explain LLMs, messages, special tokens and chat templates. Show a simple use case using python functions as tools.
2	Frameworks	Understand how the fundamentals are implemented in popular libraries : smolagents, LangGraph, LLamaIndex
3	Use Cases	Let’s build some real life use cases (open to PRs 🤗 from experienced Agent builders)
4	Final Assignment	Build an agent for a selected benchmark and prove your understanding of Agents on the student leaderboard 🚀
In addition to the main syllabus, you have 3 bonus units:

Bonus Unit 1 : Fine-tuning an LLM for Function-calling
Bonus Unit 2 : Agent Observability and Evaluation
Bonus Unit 3 : Agents in Games with Pokemon
For instance, in the Bonus Unit 3, you learn to build your Agent to play Pokemon battles 🥊.

What are the prerequisites?
To be able to follow this course, you should have a:

Basic knowledge of Python
Basic knowledge of LLMs (we have a section in Unit 1 to recap what they are)
What tools do I need?
You only need 2 things:

A computer with an internet connection.
A Hugging Face Account: to push and load models, agents, and create Spaces. If you don’t have an account yet, you can create one here (it’s free).Course tools needed
The Certification Process
Two paths
You can choose to follow this course in audit mode, or do the activities and get one of the two certificates we’ll issue.

If you audit the course, you can participate in all the challenges and do assignments if you want, and you don’t need to notify us.

The certification process is completely free:

To get a certification for fundamentals: you need to complete Unit 1 of the course. This is intended for students that want to get up to date with the latest trends in Agents.
To get a certificate of completion: you need to complete Unit 1, one of the use case assignments we’ll propose during the course, and the final challenge.
There’s no deadline for the certification process.

What is the recommended pace?
Each chapter in this course is designed to be completed in 1 week, with approximately 3-4 hours of work per week.

We provide you a recommended pace:

Recommended Pace
How to get the most out of the course?
To get the most out of the course, we have some advice:

Join study groups in Discord: studying in groups is always easier. To do that, you need to join our discord server and verify your Hugging Face account.
Do the quizzes and assignments: the best way to learn is through hands-on practice and self-assessment.
Define a schedule to stay in sync: you can use our recommended pace schedule below or create yours.
Course advice
Who are we
This course is maintained by Ben Burtenshaw and Sergio Paniego. If you have any questions, please contact us on the Hub!

Acknowledgments
We would like to extend our gratitude to the following individuals for their invaluable contributions to this course:

Joffrey Thomas – For writing and developing the course.
Thomas Simonini – For writing and developing the course.
Pedro Cuenca – For guiding the course and providing feedback.
Aymeric Roucher – For his amazing demo spaces ( decoding and final agent ) as well as his help on the smolagents parts.
Joshua Lochner – For his amazing demo space on tokenization.
Quentin Gallouédec – For his help on the course content.
David Berenstein – For his help on the course content and moderation.
XiaXiao (ShawnSiao) – Chinese translator for the course.
Jiaming Huang – Chinese translator for the course.
Kim Noel - French translator for the course.
Loïck Bourdois - French translator for the course from CATIE.
I found a bug, or I want to improve the course
Contributions are welcome 🤗

If you found a bug 🐛 in a notebook, please open an issue and describe the problem.
If you want to improve the course, you can open a Pull Request.
If you want to add a full section or a new unit, the best is to open an issue and describe what content you want to add before starting to write it so that we can guide you.
I still have questions
Please ask your question in our discord server #agents-course-questions.

Now that you have all the information, let’s get on board ⛵

Learn all the maximum points from both to design OUR welcome.

3. No FAQ anywhere: If it is cheaper task, do it yourself, and if this task will consume more tokens, use the command code with deepseek v4.1 flash to implmenet the plan and SPEC as per the speckitplus you will create, and then in new terminal, again the deepseek for factchecking and verifying the prevous session's implementations and + and - points.
4. No community or help channel: As of now, an AI chatbot for the help is going to be integrated, using RAG, in future may be other type of supports will be introduced
5. No code of conduct: What you mean by this?
6. No reader-facing accessibility statement: What you mean by this in simple english?
7. No changelog or "what's new": develope it, and a claude.md and in other related files in a way the AI will enxt time add these things in the What's new automatically if any, if i forgot to ask ai to add these
8. Social distribution cadence: Going to start this ASAP, the website if, the when the stage 0 will be done and the site will be deployed
9. SEO / search-ranking push: Start it TODAY, in parrallel
10. og-image.svg still says "Four stages": What you mean by this? in simple eng please
11. DataViz bar/donut charts beyond KPIGrid: Same as 10th point
12. Stage 0's real chapter/lesson breakdown: Complete the 1-11 and 13th point, then we will start the actual content creation
13. PHR backlog: Write me the AI prompts for the deepseek and I will paste manually there

*(Verbatim user message, reproduced from the session transcript. This same 13-point review message is also quoted in PHR 0071 and in `history/prompts/008-faq-page/0001-faq-page-spec-implementation-factcheck.green.prompt.md`; points 1-13 answer, one by one, the seven onboarding gaps surfaced the same day in PHR 0070. Points 7 and 9 are the two this record documents.)*

## Response snapshot

Started the SEO push. Fixed `docusaurus.config.ts`'s `url` from a placeholder domain (`thebridgebalance.example.com`) to `thebridgebalance.app`, so canonical URLs, the sitemap, and every absolute link the site emits now point at the real domain instead of a domain the project doesn't own.

Created `edu-site/static/robots.txt` allowing all crawlers and pointing them at the sitemap, and confirmed on the way that Docusaurus's `classic` preset already generates `sitemap.xml` on its own — no extra dependency or plugin configuration was needed.

Added Course/EducationalOrganization JSON-LD structured data to `src/pages/index.tsx` via a `<Head>` block, so search engines read the homepage as a free course with an organization behind it (the shipped block declares `@type: "Course"` with an `Organization` provider and `isAccessibleForFree: true`).

Confirmed that `glossary.md` is generated from `curriculum-state/ledgers/concept-ledger.yaml` (defined entries only) rather than being hand-editable, which settles the "just write a new page for every thin search term" idea: SEO-driven glossary growth is gated on real chapter content, not on demand. At that point exactly one real gap existed in the ledger — "RAG (Retrieval-Augmented Generation)", status `used-undefined` — a term used in shipped prose but not yet defined anywhere.

Separately, built the changelog page. Created `edu-site/docs/changelog.md` with reference-page frontmatter and seeded it with a real dated entry; added the page to `sidebars.ts`'s Reference category (the same `{ type: "doc", customProps: { unnumbered: true } }` shape as glossary / perf-targets) and to `STAGE_FILES` in `check-frontmatter.mjs` so the frontmatter gate treats it as a reference page rather than demanding `chapter_state` from it. Finally, encoded the habit itself: a new standing rule in `CLAUDE.md` — "Ship something newsworthy, log it." — instructing future sessions to append a changelog entry whenever a chapter ships, a stage promotes, or a real platform feature lands, without being asked.

## Outcome

- ✅ Impact: The site stopped pointing search engines at a placeholder domain and gained the three things a crawler actually needs — a correct canonical `url`, a permissive `robots.txt` with a sitemap reference, and structured data identifying the homepage as a free course. Alongside it, the project gained a reader-facing changelog and a standing rule that keeps it current, so the record no longer depends on the owner remembering to ask.
- 🧪 Tests: `cd edu-site && npm run typecheck` (exit 0) and `cd edu-site && npm run build` (exit 0, five gates + Docusaurus production build) after each change. The build failed once, for a real reason — adding `changelog.md` without its `STAGE_FILES` entry made the frontmatter gate reject it — and that failure was caught and fixed before the task was called done.
- 📁 Files: 7 touched — 2 new (`edu-site/static/robots.txt`, `edu-site/docs/changelog.md`), 5 modified (`docusaurus.config.ts`, `src/pages/index.tsx`, `sidebars.ts`, `scripts/check-frontmatter.mjs`, `CLAUDE.md`).
- 🔁 Next prompts: deploy-time re-verification that `https://thebridgebalance.app/robots.txt`, `/sitemap.xml`, and the canonical tags resolve on the live domain (the site was not yet deployed when this was written); the owner-only `og-image.svg` redo, which still draws "Four stages" and is barred to the agent under the no-images rule; and the glossary's one real gap, "RAG (Retrieval-Augmented Generation)" (`used-undefined`), which closes only when a chapter actually defines it.
- 🧠 Reflection: The durable half of this task wasn't the robots.txt — it was writing the habit into `CLAUDE.md`. A convention agreed in a chat thread dies with the thread; a convention in the file every session reads survives it, and that is the difference between a changelog that exists and a changelog that stays current. The build failure also re-proved a pattern now seen four times (FAQ, code of conduct, accessibility, changelog): adding a reference page is a three-file change — the page, the sidebar entry, and the `STAGE_FILES` allowlist — and a two-file version fails only at build time.

## Evaluation notes (flywheel)

- Failure modes observed: reference-page adds are consistently attempted as a two-file change (page + sidebar) before the `STAGE_FILES` allowlist catches up; here the gate failed the build with a real error and the cause was fixed inside the same task, so nothing shipped broken — but the same omission has now happened across four separate pages.
- Graders run and results (PASS/FAIL): `npm run typecheck` — PASS (exit 0); `npm run build` — PASS (exit 0) after the `STAGE_FILES` fix. No independent fact-check pass was run for this work (unlike the FAQ page, which had one), so these claims rest on the build gates alone.
- Prompt variant (if applicable): n/a — one verbatim 13-point review message, the same text quoted in PHR 0071 and in `history/prompts/008-faq-page/0001`.
- Next experiment (smallest change to try): make the three-file sequence a single documented step — in the reference-page instructions (CLAUDE.md or the relevant skill), state that a new reference page means the page, its sidebar entry, and its `STAGE_FILES` entry, so the gate stops being the thing that teaches it.
