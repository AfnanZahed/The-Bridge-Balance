# Canon — the integrity floor

A curriculum whose central thesis is engineering integrity cannot ship a chapter
that instructs a reader into misconduct. This file is the guardrail, and it
outranks the project's own curriculum documents.

> **Renamed 22 September 2026.** Every "Stage 2" below meant CS50. CS50 is no
> longer a stage: it is the Credentials track, a parallel track that is disabled
> for now (`canon/course-structure.md` CS-16). The labels below now say so. No
> word of the floor itself changed.

## The rule

> **When a chapter touches an external credential, licence, examination, or
> platform, that body's own published policy outranks this project's curriculum
> documents. Where they conflict, STOP and surface the conflict to the user.
> Never author through it.**

This is not advisory. An authoring skill that meets this condition halts, states
the conflict in one paragraph, and asks. It does not resolve the conflict by
picking the curriculum's side, and it does not quietly soften the chapter and
proceed.

The same rule covers: platform terms of service, professional licensing bodies,
academic institutions, certification providers, and any published code of
conduct a reader could be sanctioned under.

## Known live conflict — the Credentials track, CS50

**Status: parked by decision of 2026-08-23. Not resolved.** Stage 1 is months of
work; the Credentials track is not being authored yet; curriculum policy is a
separate task the founder will take up then. This entry exists so it cannot be
forgotten when that time comes.

**The curriculum doc says** (`Official docs/curriculum_1.md`, its own Stage 2 —
now the Credentials track — for both CS50P and CS50W): "AI may be used to
understand concepts, understand the problem, and **solve the questions,
assignments, and projects**, with the goal of scoring more than 70% to earn the
certification."

**CS50's published policy says** (`https://cs50.harvard.edu/x/honesty/`,
verified 2026-08-23) that *reasonable* use is CS50's own AI software — the CS50
Duck (`ddb`) at cs50.ai and cs50.dev. *Not reasonable* is using "AI-based
software other than CS50's own (e.g., ChatGPT, Claude, Copilot, Gemini, et al.)"
where it suggests or completes answers or code. The governing principle: "the
essence of all work that you submit to this course must be your own."

**The conflict.** Authored literally, the Credentials track would coach readers
into an academic honesty violation of the exact credential it exists to earn —
in a curriculum about engineering integrity, on a site meant to be its author's
strongest professional credential.

**What happens when Credentials-track authoring begins.** The skill halts on
this file, presents the conflict, and offers the compliant framing rather than
writing either version unasked:

- AI for **understanding** — concepts, lecture material, what a problem is
  asking, why an error occurred — which CS50 permits and which is the genuinely
  valuable skill this curriculum teaches anyway.
- CS50's own Duck for in-course help, named explicitly as the permitted tool.
- **Never** AI producing work that gets submitted.
- The track's real thesis, which is stronger than the current wording: *The
  Credentials track is where you prove the judgment Stage 1 built, without the
  tool. A certificate earned by an agent certifies the agent.*

Every Credentials-track body then carries an academic-honesty callout at full
force, under the safety-floor rules in `canon/thesis.md`.

**Also parked:** the curriculum doc itself needs revising. That is the founder's
task, not an authoring run's, and it must not be edited by a skill.

## Second-order rules

**Security content is defensive only.** The curriculum teaches boundaries,
verification, blast radius, and permission design. It never produces working
instructions for credential theft, unauthorised access, evasion,
denial-of-service, or mass targeting. A chapter explaining why an unscoped API
call is dangerous shows the boundary, not the exploit.

**Licensing is checked before reproduction.** CS50 material is CC BY-NC-SA 4.0.
Third-party content is described and linked, not copied. Never reproduce an
exam question, a problem-set specification, or substantial course text.

**No claim about a person or organisation without a source.** Named incidents in
this curriculum involve real companies and real people. Every one is cited to
the canonical source list and described as the source describes it.

**Telling it as a scene is allowed. Inventing detail is not.** *(Clarified
2026-09-20.)* "Never embellished for narrative effect" was being read as "retell
the source's sentence", which produced dry summaries where the owner asked for
story. Setting a real, sourced fact in a scene the reader can picture is good
teaching and is encouraged. What stays forbidden is adding facts the source does
not support — a detail, a quote, a motive or a number that nobody recorded.

**Uncertainty is disclosed, not smoothed.** Where the evidence is contested or
the practice is unsettled, the chapter says so. Manufacturing false consensus is
a form of the same failure this curriculum exists to name.

**In Stages 0–1, disputes mostly stay backstage.** *(Added 2026-09-20, owner's
instruction: "no disputes please, and if it is must to be told, the dispution
also should be discussed." Renumbered 2026-09-22: the floor is Stages 0–1 —
`course-structure.md` CS-31.)* A beginner does not benefit from learning that two
historians disagree about a date. So:

- If the dispute does not change the point being taught, it stays in
  `evidence-ledger.yaml` and the prose simply avoids asserting the contested
  detail.
- If it does change the point, it is **taught properly** — what the two
  positions are and why it matters — not dropped in as a hedging clause.
- What is never acceptable is stating a contested thing as settled.
