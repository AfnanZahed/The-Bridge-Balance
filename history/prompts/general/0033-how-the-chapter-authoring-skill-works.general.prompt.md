---
id: 0033
title: How the chapter-authoring skill works
stage: general
date: 2026-09-06
surface: agent
model: claude-opus-5
feature: none
branch: a
user: Book
command: (conversational question)
labels: [chapter-authoring, skills, explainer, gate, ledgers]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .claude/skills/bridge-balance-project-guide/reference/chapter-authoring/SKILL.md (read)
  - .claude/skills/bridge-balance-project-guide/reference/chapter-authoring/reference/research.md (read)
  - .claude/skills/bridge-balance-project-guide/reference/chapter-authoring/reference/ledgers-protocol.md (read)
  - .claude/skills/bridge-balance-project-guide/reference/chapter-authoring/reference/gate.md (read)
  - history/prompts/general/0033-how-the-chapter-authoring-skill-works.general.prompt.md (created)
tests:
  - node scripts/check-chapter.mjs (run from edu-site/, no --chapter) — 1 checked, 24 skipped, 0 errors, 1 warning
---

## Prompt

How this new skill works actually?

## Response snapshot

Explained the `chapter-authoring` skill as a mechanism rather than restating its text.

**Invocation.** Not named directly. `bridge-balance-project-guide` is the single entry
point; describing the task ("write the lesson on X") routes into `chapter-authoring`.
The protocol files no longer trigger on their own.

**Progressive loading.** SKILL.md (162 lines) is always read, plus three short canon
files (thesis / audience / voice). The four reference files load only at the step that
needs them: `research.md` at step 2, `ledgers-protocol.md` at steps 1 and 8, `gate.md`
at step 7, and `image-prompts.md` **only on explicit request**. Total corpus 516 lines;
a typical run touches roughly half.

**Pipeline.** Steps 0–9: integrity check (CS50 floor) → inputs + ledger read → research
and dossier → misconception + mandatory Tree-of-Thoughts → scope and its reason → prose
→ assemble MDX → gate → ledger write-back → present.

**Outputs.** Three files: the MDX chapter at `edu-site/docs/…`, plus
`research/stage-0N-…/<slug>/dossier.yaml` and `design.md`. Four ledgers updated.
No `master-lesson.md` — the prose is written once, straight into the MDX.

**The key framing given: three tiers of enforcement.**

1. *Mechanical* — `check-chapter.mjs` + `npm run build`. Exits non-zero, cannot be
   argued with. Covers frontmatter, `scope_reason` genericness, unregistered
   components, missing image files, alt-text quality, safety-floor form, heading hierarchy.
2. *Auditable artifacts* — `dossier.yaml`, `design.md`, the ledgers. Nothing forces
   their creation mid-run, but their absence is visible afterward.
3. *Protocol prose* — the Tree-of-Thoughts, misconception diagnosis, curation. Honour
   system. This is where chapter quality actually comes from, and it has the least
   enforcement; `design.md` exists to make tier 3 inspectable, and
   `lesson-adversarial-review` is the real check on it.

Also noted: the gate deliberately does not police length (it enforces `scope_reason`,
not a word band) and it names skipped `placeholder` chapters so a clean run can't be
mistaken for proof about a chapter it never read. Ran the gate live to show this — only
`docs/intro.md` is `text-ready`; 24 chapters were listed as unchecked.

## Outcome

- ✅ Impact: Explanation only. No files modified beyond this PHR.
- 🧪 Tests: `node scripts/check-chapter.mjs` run from `edu-site/` — 1 chapter checked, 24 skipped, 0 errors, 1 warning (`keywords-missing` on `docs/intro.md`).
- 📁 Files: 1 created (this PHR). Four skill files read.
- 🔁 Next prompts: Author a real chapter end to end to exercise the protocol for the first time; or add `keywords` to `docs/intro.md` to clear the standing warning.
- 🧠 Reflection: The honest three-tier framing is more useful to the owner than a restatement of the protocol — it names exactly which parts of the skill are self-enforcing and which depend on the run being conducted in good faith.

## Evaluation notes (flywheel)

- Failure modes observed: None in this exchange. Worth noting the skill has still never been run end to end on a real chapter, so tiers 2 and 3 are untested in practice.
- Graders run and results (PASS/FAIL): `check-chapter.mjs` PASS (0 errors).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): Run `chapter-authoring` on one genuinely new Stage 0 or Stage 1 topic and see which protocol steps get skipped under real conditions — that is the only way to find out which tier-3 instructions actually hold.
