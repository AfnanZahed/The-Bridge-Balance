# Contracts: Nine Distinct Intro Reading Paths

This feature has no runtime API surface; the contracts here are editorial and content contracts enforced before publication.

## Contract: Reading Contract Schema

Every Intro Version MUST be authored against this contract.

```yaml
id: one of nine fixed cells
difficulty: beginner | intermediate | advanced
length: summary | balanced | detailed
audience: string
lens: one of the nine assigned lenses
scenario: real-world situation with attribution
decision_value: behavior or decision this improves
structure: reasoning form distinct from peer versions
takeaway: explicit action for the reader
```

## Contract: Lens Assignment

| Cell | Difficulty | Length | Lens |
|---|---|---|---|
| C1 | beginner | summary | safety rule |
| C2 | beginner | balanced | everyday analogy |
| C3 | beginner | detailed | boundary checklist |
| C4 | intermediate | summary | decision framework |
| C5 | intermediate | balanced | responsibility map |
| C6 | intermediate | detailed | experiment-to-system transition |
| C7 | advanced | summary | strategic scarcity |
| C8 | advanced | balanced | governance and trust boundaries |
| C9 | advanced | detailed | scalable ownership architecture |

The lens MUST appear in exactly one cell. Two versions MUST NOT share a primary lens.

## Contract: Editorial Comparison Matrix

The matrix MUST contain a row for each of the nine cells with these columns:

1. Cell id
2. Difficulty
3. Length
4. Audience
5. Lens
6. Scenario
7. Decision value
8. Structure
9. Evidence
10. Takeaway
11. Duplicate-review verdict

Verdict MUST be one of: `unique`, `duplicate lens`, `duplicate scenario`, `duplicate structure`, `duplicate takeaway`.

A version MAY be published only if its verdict is `unique`.

## Contract: Reader-Control Positioning

The reader-control descriptions MUST expose difficulty, length, unique lens, and practical outcome for each option before selection or within the immediately visible selection state. If a minimal description field is added to the reader-control data model, it MUST NOT add a new control dimension.

## Contract: Shared Thesis Compliance

Every Intro Version MUST pass a thesis check:

- States that humans specify, bound, verify, and own.
- Acknowledges AI may accelerate implementation.
- Does not recommend blind delegation.
- Does not recommend blanket refusal.
- Names the four curriculum stages at the appropriate depth.
