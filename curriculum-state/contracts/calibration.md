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

## The anchor at scope 1.0

`edu-site/docs/intro.md` — **~3,000 words**, `text-ready`, `scope_multiplier: 1.0`.
It is the anchor because it is the curriculum's flagship chapter and the only one
currently shipped, so it is a real measurement rather than a derived target.

The gate reports its measured word count and reading time on every run. When
`intro.md` changes materially, that number is the new anchor — re-read it from
the gate output rather than from this file, which will drift.

## Scope multiplier — assign per chapter, justify in one clause

| Scope | When | Multiplier |
|---|---|---|
| 0.4 | A single definition, one rule, one command. Genuinely atomic. | ×0.4 |
| 0.7 | One concept with a couple of supporting ideas. Most sub-topics. | ×0.7 |
| **1.0** | **Reference scope. A full chapter with its own arc. The intro sits here.** | **×1.0** |
| 1.5 | Multiple interacting concepts; a system with parts. | ×1.5 |
| 2.2 | Stage 3–4 architecture: many concepts with real dependency structure. | ×2.2 |

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
