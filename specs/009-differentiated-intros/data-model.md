# Data Model: Nine Distinct Intro Reading Paths

This feature has no runtime database entities. The model below describes editorial artifacts and their relationships.

## Reading Contract

The authoring contract for one of the nine versions.

| Field | Description | Validation |
|---|---|---|
| id | Stable cell identifier | Exactly one of the nine matrix cells |
| difficulty | Beginner, intermediate, or advanced | Matches the existing reader-control dimension |
| length | Summary, balanced, or detailed | Matches the existing reader-control dimension |
| audience | Primary reader profile | Specific enough to choose without reading prose |
| lens | Unique teaching method | Exactly one of the nine assigned lenses |
| scenario | Real-world situation | Concrete and attributable |
| decisionValue | Decision the reader can make better | Must differ materially from other contracts |
| structure | Reasoning/narrative form | Must not duplicate a peer version |
| takeaway | Action the reader can apply | Explicit and testable |

## Intro Version

A published content block fulfilling one Reading Contract.

- **Relationship**: exactly one Intro Version fulfills exactly one Reading Contract.
- **Required content**: opening promise, lens-specific explanation, real-world evidence, curriculum connection, actionable takeaway.
- **Validation**: opening must reveal the promised lens; content must not contradict the Shared Thesis.

## Shared Thesis

The invariant message across all versions: AI may accelerate implementation, while people specify intent, bound authority, verify behavior, and own consequences.

- **Relationship**: one Shared Thesis is referenced by all nine Intro Versions.
- **Validation**: no version may imply that AI output is trusted without review or that refusal is the only safe strategy.

## Comparison Matrix

Editorial review artifact with one row per Reading Contract.

Required columns: cell id, difficulty, length, audience, lens, scenario, decision value, structure, evidence, takeaway, duplicate-review status.

- **Relationship**: contains all nine Reading Contracts and their corresponding Intro Versions.
- **Validation**: all nine rows present; each lens appears once; no pair shares the same primary lens, scenario, structure, and takeaway verdict.

## State Transitions

Editorial state, not runtime state:

`draft contract → authored version → matrix reviewed → build verified → published`

A version returns to `draft contract` when matrix review finds a duplicate lens, unsupported claim, missing scenario, or missing actionable value.
