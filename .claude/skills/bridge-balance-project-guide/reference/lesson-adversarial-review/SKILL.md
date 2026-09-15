---
name: lesson-adversarial-review
description: Use to hostile-review one already-written, text-ready chapter of The Bridge Balance (thebridgebalance.app) against curriculum-state/ — checking citations against real sources, catching sections that restate each other, softened safety floors, a retrieval prompt the chapter does not equip a reader to answer, terms used without a gloss, and stale or drifted evidence. Trigger on requests like "review this chapter before it goes live," "audit chapter X," "check this against the sources," or "is this chapter any good." Reports findings only — never edits the chapter itself, and never trusts the drafting author's own stated reasoning for why something is fine. Run it with as little memory as possible of how the chapter was drafted; if this environment can spawn an isolated sub-task or subagent, that is the strongest way to run this skill. Do not use this for a chapter still marked chapter_state placeholder (nothing to review yet), and do not use it to fix what it finds — that's a separate authoring action.
---

# Lesson adversarial review

> **Where this fits.** Every chapter ships as ONE continuous read.
> `chapter-production` owns everything around the lesson (research, ledgers,
> scope, MDX, the gate); the peer skill `lesson-spine-authoring` writes the
> lesson itself.
> This protocol does neither — see its own scope below.


The author is the worst-positioned person to review their own chapter — they already believe the citation supports the claim, already read two sections as distinct because they meant them to be, already know what the safety floor is supposed to say and so skim past a softened version of it. **Review the finished file alone. Extend no credit to the drafting process.** Read the MDX. Do not read the station sheet, the step 9 report, or any chat transcript of how a section got written. A defense of a choice is not evidence the choice was right — check the file, not the explanation.

**Report. Never edit.** Never open a fix in the same run, never soften a finding because the fix looks easy. Finding and fixing in one breath turns self-review into a rubber stamp. A fix belongs to whoever authors the chapter, in a separate pass — ideally someone who can look at it without having just written this review.

**Strongest form:** spawn an isolated subagent with only the chapter's file path — no step 9 report, no conversation history, no reasoning trace. Without that, the discipline is manual: don't scroll back to the drafting conversation; read the file as if a stranger shipped it.

## When this does not apply

**`chapter_state` is still `placeholder`.** The gate skips a placeholder chapter — so does this review. Wait until it is `text-ready` and has passed the gate once.

**Nothing is drafted yet.** That's `chapter-production`'s job.

**You want to fix something, not find it.** Run this skill, get the report, hand the fix to the authoring skill separately.

## Step 0 — Confirm there's something real to review

Check the frontmatter: `chapter_state` should already be `text-ready`.

**The gate is `edu-site/scripts/check-chapter.mjs`**, wired into `npm run build` as `check:chapter`. Run it, and read the real output rather than assuming:

```bash
cd edu-site && node scripts/check-chapter.mjs --chapter docs/<path> && npm run build
```

It catches frontmatter gaps, a generic `scope_reason`, unregistered components, an image file that does not exist, junk alt text, a malformed safety-floor callout, and broken heading hierarchy. **Do not spend review effort re-checking those by hand** — that is what it is for, and a review that reports them is reporting the gate's work as its own.

What it cannot do is judge whether the chapter is worth reading, whether the misconception is actually dismantled, or whether a senior would feel their time wasted. That is the whole of your job. In the report, separate what the gate found from what you found.

## Step 1 — Read, narrowly

Read, in order: the chapter MDX; `curriculum-state/canon/thesis.md`, `audience.md`, `voice.md` (what the chapter is supposed to honor); all four `curriculum-state/ledgers/*.yaml` (what the rest of the book has already committed to, that this chapter must not contradict); The ledgers are the evidence trail: `evidence-ledger.yaml` carries each source, what it establishes, and every question already asked of it.

**Do not read:** the master lesson's Reasoning Trace, any PHR or ADR discussion of this chapter, any conversation where it was drafted or discussed. If any of it surfaces anyway, don't let it change a finding — judge the file.

## Step 2 — Run what mechanical checking still exists

```bash
cd edu-site
npm run build          # runs check:frontmatter and check:chapter
```

Don't take the author's word this passed. Paste the real output. If it fails, that's the headline finding — the hostile read still proceeds; a chapter can fail and still have deeper problems worth naming in the same pass.

**What the gate does not cover is yours.** It confirms a safety-floor callout is present and non-trivial, but not that it lands at full force. It confirms alt text exists and is not junk, but not that it describes the right thing. It checks no citation resolves to its source. Those are hand checks — label them as hand-checked in the report so nobody reads them as machine-verified. There is no word-count check by design: length is judged, not measured.

## Step 3 — The hostile read

Straight through, then back over the seams. The question is never "can I see why they made this choice" — it's "does this hold up."

**Citations, against the source, not the ledger's description of it.** For every cited claim: does the source itself actually say what the chapter claims? A citation can resolve mechanically and still misrepresent its source — that is this review's catch, and no script has ever been able to make it.

**Self-paraphrase within the chapter.** Read the opening of each major section back to back. Do two of them make the same move in different words? A chapter that restates itself across sections reads as padding to a senior and as confusing repetition to a beginner — check the prose, not the outline.

**The safety floor, for force, not presence.** The callout existing (the gate checks that) is not the same as it landing at full force. Does it read as structurally non-negotiable, or has "must" quietly become "should" somewhere no banned-phrase check would catch?

**The retrieval prompt, actually attempted.** Try to answer the chapter's closing retrieval prompt using only the chapter. If it does not equip a reader to answer, the prompt has not earned its place — flag it against the specific section that left the gap, not as a general complaint.

**Assessment against objective.** Does each cell's Assessment test the same cognitive level its Learning Objective claims — recall, apply, judge? A judge-level objective tested by a recall question is a distinctness failure of a specific, checkable kind.

**Evidence reuse, against the whole ledger, not just this lesson.** For every reused source, does `evidence-ledger.yaml` show this cell's exact question already asked by a different chapter? The incident-sharing rule is book-wide — a chapter can pass its own internal check and still repeat another chapter's question.

**Staleness.** Any source past its `evidence-ledger.yaml` `expires` date, cited as current? Any statistic missing its year inline, so a reader can't tell it's aging?

**Alt text, as a blind reader needs it.** Not "is it present" (the script checks that) — "does it convey what a sighted reader gets, or just name the image's type ('a diagram')?"

**Integrity floor, if this chapter touches Stage 2 or an external credential.** Does the shipped prose coach a reader toward a conflict `canon/integrity-floor.md` would flag? This can drift in even when Step 0 was cleared honestly at drafting time — check the shipped words, not the intent.

## Reporting

Order findings by severity: a finding that would mislead or harm a reader (a misrepresented citation, a softened safety floor, a live integrity-floor conflict) outranks a finding that's a craft weakness (a generic verification question, a mild register drift). For each: the cell, what's wrong, why it matters to a reader — not a fix. State plainly whether the chapter should stay `text-ready` or drop back to `placeholder` — a recommendation for a human or a separate pass to act on, not something this skill does.

If nothing survives hostile scrutiny — genuinely nothing — say so. A review that always finds something isn't hostile, it's performing hostility.

## Anti-patterns this skill forbids

**Reading the drafting reasoning "for context."** That's the exact contamination this skill exists to avoid. If the reasoning trace is sitting right there, don't open it.

**Fixing what you find.** Report it. Someone else's authoring pass fixes it.

**Treating a passing gate as sufficient.** The scripts catch shape and stated contracts, not a citation that resolves but misrepresents, or a safety floor that's present but hollow.

**Softening a finding because the fix looks easy or the intent was good.** Intent isn't what a reader receives.

**Declaring a chapter unreviewable because it's "mostly fine."** Mostly-fine chapters are exactly what this skill is for — the ones with an obvious problem rarely make it this far.

---

*A finished-looking chapter and a finished chapter are not the same claim. This skill only ever tests the second one.*
