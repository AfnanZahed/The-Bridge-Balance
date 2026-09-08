---
name: book-coherence-audit
description: Use for a corpus-level pass across every text-ready chapter of The Bridge Balance (thebridgebalance.app), checking for problems no single-chapter review can see — a defined term drifting in wording chapter to chapter, one source over-relied on across the whole book, picker labels converging into near-duplicates across chapters, a chapter assuming a prerequisite that isn't actually text-ready, or a contradiction between two chapters' treatment of the same shared invariant. Trigger on requests like "audit the book so far," "check for drift across chapters," "is anything contradicting anything else," or "read through the whole book start to finish." Meant to run every few chapters, not after every single one — with only one or two text-ready chapters this skill has almost nothing to check and should say so rather than manufacture findings. Reports only, corpus-wide; it does not rewrite any chapter itself.
---

# Book coherence audit

> **Where this fits.** Every chapter ships as ONE continuous read.
> `chapter-production` owns everything around the lesson (research, ledgers,
> scope, MDX, the gate); the peer skill `lesson-spine-authoring` writes the
> lesson itself.
> This protocol does neither — see its own scope below.


`lesson-adversarial-review` checks one chapter against the book's shared state. This skill checks the shared state, and the corpus, against *itself*. Two chapters can each pass their own gate and their own adversarial review and still, read together, contradict each other, lean on one source until it stops feeling like evidence, or hand a reader nine "One rule" labels across nine chapters that all sound like the same rule restated.

**A periodic pass, not a per-chapter one.** Reach for it every few chapters, or when the corpus feels like it's drifted — not automatically after each lesson ships. With one or two text-ready chapters, most checks below have nothing to operate on; say that plainly rather than inventing findings to justify the run.

## When this does not apply

**Fewer than roughly three *lesson chapters* are `text-ready`** — see Step 1 for what counts as a lesson chapter versus a stage-index page; only the former are counted here. Term drift, tonal monotony, and evidence concentration are corpus properties — with only the intro (or the intro plus one more), there's no real corpus yet, however many stage-index landing pages are also live. Note the count, note that most checks are vacuous at this size, and stop rather than pad a report.

**One specific chapter is in question.** That's `lesson-adversarial-review` — narrower, deeper, cheaper to run than a full corpus pass.

## Step 1 — Establish the corpus

Read `curriculum-state/ledgers/prerequisite-graph.yaml` and list every row currently `text-ready` (not `placeholder`, not `planned`). Split the list in two — the file mixes two kinds of row, and treating them the same produces false findings below:

- **Lesson chapters** — a real chapter candidate: `path` doesn't end in `index.md`, and it isn't listed under `non_lessons`.
- **Stage-index pages** — `path` ending `index.md`. Landing pages, not lessons: `teaches: []` by design, and (check `evidence-ledger.yaml` directly, don't assume) typically no entries in any ledger, because there's nothing lesson-shaped to record.

**Steps 2, 3, 4, and 7 apply to lesson chapters only** — an index page has no defined terms, no cited evidence, and no safety floor, so it cannot drift in the ways those steps look for.

## Step 2 — Term drift

Read `concept-ledger.yaml`. For every `defined` term, spot-check its canonical wording against how the term is actually glossed in every chapter listed in `used_in` — not just that it appears, but that the definition reads as the *same* definition, not an independent second phrasing that happens to mean roughly the same thing. Two different-sounding definitions of "spec" across two chapters is exactly what `concept-ledger.yaml` exists to prevent, and it only shows up by actually reading both.

## Step 3 — Evidence concentration

Read `evidence-ledger.yaml`. For each source, count how many chapters cite it. A source used across most of the corpus — even with every reuse asking a technically distinct question per the incident-sharing rule — is a variety problem the rule doesn't catch by design; it protects against repetition, not monotony of choice. Flag it as worth diversifying — a judgment call about feel, not a rule violation.

## Step 4 — Opening monotony across chapters

*(There is no mechanical check behind this one. Read it off the prose directly.)*

Read the opening paragraph of every `text-ready` chapter, back to back. Do multiple chapters converge — same sentence shape, same opening move, same rhetorical setup — to where a reader who has seen two could predict the third? Individually each opening may be fine; the corpus-level problem is a pattern only visible reading several side by side.

## Step 5 — Prerequisite sanity

For every **lesson chapter** marked `text-ready`: is every id in `requires` also actually `text-ready`? A lesson can pass individual review while still assuming a foundation that, corpus-wide, doesn't exist yet — for a lesson chapter, this is genuinely structural rather than a matter of feel, and any hit here is a real defect.

For a **stage-index page**, the same check means something different and is *not* automatically a defect: `requires` names what precedes the stage, and a stage-index page going live before every lesson inside its own stage — or before the stage before it is fully authored — is the ordinary state of an in-progress book. Note it only as "this stage is still being authored," never a violation, unless the index page's *body* (not just its graph row) actively claims otherwise.

## Step 6 — Contradiction detection

Check every `text-ready` chapter's treatment of the six corpus-wide invariants (`canon/thesis.md`) against canon and against each other: does every chapter's safety-floor wording still match its register variant in `thesis.md`? Does any chapter state a stage's focus or the four-stage table differently than `thesis.md` quotes it? Does any statistic contradict what `evidence-ledger.yaml` currently records as the latest-verified figure?

## Step 7 — Read straight through

Read the opening of every `text-ready` chapter back to back — the corpus as a reader meets it.

## Reporting

Organize by check (term drift, evidence concentration, tonal monotony, prerequisite sanity, contradictions, the straight-through read), not by chapter — the point is patterns visible only across chapters, and a per-chapter report buries that. Name every chapter a finding involves, not just the most visible one. State the corpus size checked up front, so a reader can calibrate how much a "found nothing" result is worth — nothing found across three chapters means less than nothing found across fifteen.

This skill never edits a chapter, a ledger, or canon. A term-drift finding might be best fixed by updating `concept-ledger.yaml`'s canonical wording rather than rewriting prose — even that smaller fix belongs to a separate, deliberate pass.

## Anti-patterns this skill forbids

**Running this on a one- or two-chapter corpus and reporting findings anyway.** If the corpus is too small for a check to mean anything, say so instead of forcing an opinion.

**Treating any single-chapter finding this skill surfaces as this skill's to fix.** Corpus-level findings still get fixed one chapter, or one ledger entry, at a time, by the skill that owns that file.

**Confusing "no rule violation" with "not a problem."** Tonal monotony and evidence concentration are corpus-feel judgments, not rule violations — they still belong in the report.

**Skipping the straight-through read because the ledger checks came back clean.** The ledgers can't see repetitive prose rhythm or a recurring rhetorical tic; only reading several chapters in sequence catches that.

---

*A book can be internally consistent in every chapter and still read as one long chapter wearing different chapter numbers. This is the only check built to catch that.*
