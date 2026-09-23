# Reading-time calibration

This document holds three things: the reading-speed baseline, the scope ladder,
and the rule that a scope assignment must carry a reason.

## The baseline

**150 wpm.** A second-language reader, reading for comprehension rather than
skim. An earlier framework derived 238 wpm x 0.72 and produced reading times four
to five times shorter for the same material; 150 was chosen instead and has held
since 2026-08-23.

## Constants

| Constant | Value | Where it lives |
|---|---|---|
| `BASELINE_WPM` | 150 | `edu-site/scripts/check-chapter.mjs` |

## The anchor

**Set 2026-09-10: 3,940 words (~26.3 min).** Read from the gate's own output
(`node scripts/check-chapter.mjs --chapter docs/intro-5-spec-driven-engineering.md`)
on the day `intro-5-spec-driven-engineering.md` came back to `text-ready`, per the
standing instruction below. The previous anchor was the curriculum's former
flagship chapter, retired on 2026-09-10 in the intro resequence
(`curriculum-state/proposals/stage-00-intro-resequence-2026-09-10.md`); its content
now lives in `intro-5-spec-driven-engineering.md`, which is the successor this
anchor was always going to come from.

**One correction to how this section was written.** The heading used to read "The
anchor at scope 1.0", because that retired flagship was a 1.0 chapter. Its successor
declares `scope_multiplier: 1.5` - multiple interacting concepts forming one
system, which is the scope table's own description of what that chapter is (two
failure modes, a four-stage loop, the SDD/SDE line and two worked examples). The
number is real and the chapter it came from is the right one; the multiplier it
carries is not the 1.0 the old heading assumed. Recorded rather than papered over,
because an anchor silently redefined is worse than no anchor.

**The other readings, for comparison.** Taken from the same gate run, so the whole
sequence is visible in one place:

| Chapter | Words | Reading time | Declared scope |
|---|---|---|---|
| `intro-1-binary-to-programming.md` | 2,395 | ~16 min | 1.0 |
| `intro-2-architecture-map.md` | 4,500 | ~30 min | 1.5 |
| `intro-3-editors-and-ides.md` | 4,132 | ~27.5 min | 1.0 |
| `intro-4-terminals-and-cli-agents.md` | 4,001 | ~26.7 min | 1.0 |
| `intro-5-spec-driven-engineering.md` | 3,940 | ~26.3 min | 1.5 |

Re-read 2026-09-10 after three inline gloss defects were fixed in `intro-1` and
`intro-3`, which moved their counts by a few words each. The numbers above are
the post-fix readings, and the anchor is unaffected.

`intro-1` is the only 1.0 measurement, and it is short for a 1.0 chapter. That is
expected rather than contradictory: it covers four rungs of one ladder compactly,
and it was the first chapter authored. The four later chapters cluster tightly
between 3,940 and 4,500 words despite declaring two different scopes, which is the
clearest evidence available that the multiplier is a statement of intent and not a
length target. Read the table as five readings, not as five budgets.

**What the anchor is not.** It is not a word band. `check-chapter.mjs` does not
police length and does not fail a chapter for being long or short; it prints the
measurement and fails only when `scope_reason` is missing or generic. A future
chapter that comes out well under or well over these readings has not made a
mistake - it has made a judgment, and the judgment it must record is its
`scope_reason`.

## Scope multiplier — assign per chapter, justify in one clause

| Scope | When | Multiplier |
|---|---|---|
| 0.4 | A single definition, one rule, one command. Genuinely atomic. | ×0.4 |
| 0.7 | One concept with a couple of supporting ideas. Most sub-topics. | ×0.7 |
| **1.0** | **Reference scope. A full chapter with its own arc.** | **×1.0** |
| 1.5 | Multiple interacting concepts; a system with parts. | ×1.5 |
| 2.2 | Stage 2 (AI-native) architecture: many concepts with real dependency structure. | ×2.2 |

*(22 September 2026: this row read "Stage 3–4 architecture". There is no Stage 3
or Stage 4 — the advanced, agentic work is Stage 2
(`canon/course-structure.md` CS-12 to CS-15). The multiplier is unchanged.)*

**There is no word band.** The gate does not police length — `check-chapter.mjs`
prints the measured word count and reading time and fails only when `scope_reason`
is missing or generic. This is deliberate: length is judged per topic, and what
gets enforced is the judgment, not a number. See
`chapter-production/reference/gate.md`.

So the multiplier is not a target to hit. It is a declaration of intended size,
recorded so a later reader can tell whether a short chapter was judged short or
merely came out short. **A scope assignment with no reason is not a judgment, it
is a guess** — which is why `scope-reason-generic` is a gate failure and
`scope_multiplier` on its own is not enough.

## Computing a published estimate

```
minutes = word_count ÷ 150  →  round to nearest 0.5
```

That is the whole formula. There is no lookup tax and no per-element dwell
budget.

If a chapter is unusually heavy with code or owner-supplied images, say so in its
`scope_reason`.

## Known gap, recorded honestly

`BASELINE_WPM = 150` is a project decision, not a measured value. The 238 × 0.72
figure from the earlier framework cited Brysbaert (2019) — a real meta-analysis —
alongside four further studies that were never verified. None of those five
should be cited publicly until checked.

Once the site has traffic, measure time-on-page and back-solve 150 from real
readers. Until then it is an honest estimate, labelled as one, and this paragraph
is the label.
