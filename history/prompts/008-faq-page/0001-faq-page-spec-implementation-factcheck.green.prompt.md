---
id: 0001
title: Ship the FAQ reference page — Spec-Kit spec, delegated implementation, independent fact-check
stage: green
date: 2026-09-14
surface: agent
model: claude (Command Code agent) — spec authored here; implementation and independent fact-check delegated to deepseek v4.1 flash (Command Code sessions)
feature: 008-faq-page
branch: none (no version control in this project)
user: afnanzahed@gmail.com
command: none (freeform chat — item 3 of the owner's 13-point review message)
labels: ["faq", "reference-page", "spec-kit", "fact-check"]
links:
  spec: specs/008-faq-page/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/008-faq-page/spec.md (new — six functional requirements + explicit MUST-NOT list)
  - edu-site/docs/faq.md (new — reference-page frontmatter, no chapter_state, no content_kind)
  - edu-site/sidebars.ts (new "faq" entry in the Reference category, unnumbered: true)
  - edu-site/scripts/check-frontmatter.mjs ("faq.md" added to STAGE_FILES)
  - edu-site/src/pages/index.tsx (closing CTA reworded — fixes a live D5 no-fixed-count violation found by the fact-check)
tests:
  - cd edu-site && npm run typecheck — exit 0 (run after implementation and again after the CTA fix)
  - cd edu-site && npm run build — exit 0 (five gates + Docusaurus build)
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

## Response snapshot

Wrote a Spec-Kit Plus spec at `specs/008-faq-page/spec.md` (six functional requirements, explicit MUST-NOT list banning any fixed chapter/hour count and any invented live community channel). Delegated implementation to a DeepSeek/Command Code session, which produced `edu-site/docs/faq.md` (reference-page frontmatter, no `chapter_state`), added a "faq" entry to `sidebars.ts`'s Reference category, and added `"faq.md"` to `STAGE_FILES` in `check-frontmatter.mjs`. A second, independent DeepSeek session (no shared context with the first) then fact-checked every claim in `faq.md` against the real repo and returned a PASS verdict with zero fixes needed — including confirming the "founding brief names five readers" claim traces to `curriculum-state/canon/audience.md:40-49`. That fact-check also caught an unrelated, real bug: `src/pages/index.tsx`'s closing CTA still read "Six chapters, two Harvard certificates," a live violation of the D5 no-fixed-count rule. Fixed immediately: reworded to "Two Harvard certificates wait at the end."

## Outcome

- ✅ Impact: Shipped the site's first FAQ page with an independent fact-check as a required gate (Spec-Kit Plus User Story 2), and caught a second, unrelated D5 violation as a byproduct of that discipline.
- 🧪 Tests: `npm run typecheck` (exit 0) and `npm run build` (exit 0), run after both the implementation and the CTA fix.
- 📁 Files: 1 new spec, 1 new doc page, 1 sidebar entry, 1 gate allowlist entry, 1 CTA correction — 4 new/added, 1 modified.
- 🔁 Next prompts: fold the remaining owner 13-point items into their own features (009-code-of-conduct, 010-accessibility-statement were opened alongside 008; changelog/"what's new" auto-update convention still open); re-run the independent fact-check if any FAQ answer is later edited.
- 🧠 Reflection: routing the fact-check to a *separate* session with no shared context was what made it valuable — it had no memory of drafting the page, so it re-derived each claim from the repo instead of confirming intent. That independence is also why it surfaced a D5 violation on a page (the homepage CTA) that had nothing to do with the FAQ.

## Evaluation notes (flywheel)

- Failure modes observed: none in the FAQ page itself — the fact-check returned PASS with zero corrections. The only defect found was out-of-scope: a pre-existing "Six chapters, two Harvard certificates" CTA on `src/pages/index.tsx`, proving the D5 no-fixed-count rule had already leaked into live copy elsewhere.
- Graders run and results (PASS/FAIL): independent fact-check of every `faq.md` claim against the repo — PASS (zero fixes needed); `npm run typecheck` — PASS; `npm run build` — PASS.
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): extend the independent-fact-check pass to a repo-wide D5 sweep (grep for fixed chapter/hour/total counts across shipped pages) instead of only the page under review, so the next FAQ-style feature catches sibling violations in the same pass.
