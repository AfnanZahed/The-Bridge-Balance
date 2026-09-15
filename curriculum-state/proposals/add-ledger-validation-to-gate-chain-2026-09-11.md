# Gate proposal: validate the ledgers, and catch the two staleness classes nothing sees

## Context

Two defects surfaced in the 2026-09-11 Stage 1 run that **no gate could see**. Both
were found by hand, and both are cheap to close.

**1. `evidence-ledger.yaml` was not valid YAML, and had not been for some time.**
The `sd-paper-feb-2026` entry read:

```yaml
name: "Spec-Driven Development: From Code to Contract in the Age of AI Coding Assistants" (February 2026)
```

A quoted scalar cannot be followed by more content on the same line, so the value
is a parse error. Nothing in the chain parses ledger YAML — `check-references.mjs`
scans it with regular expressions — so the file had been unreadable by any tool
that wanted to consume it, indefinitely. Fixed, and all four ledgers now parse.

**2. `concept-ledger.yaml` gained 11 duplicate terms in a single write-back.**
Authoring fresh entries from six chapters' prose collided with terms already
defined by the intro: `component`, `endpoint`, `repository`, `commit`, `branch`,
`merge conflict`, `pull request`, `middleware`, `statelessness`, `breakpoint`,
`blast radius`. The ledger's own first rule is one canonical definition per term.
Nothing checked it, so a run could — and did — silently break the invariant the
file exists to protect.

**3. A third class, already recorded on 2026-09-10 and still open.** Three
prerequisite-graph rows carried `requires: [intro]`, a dangling reference to a
retired chapter id. The gate chain checks reference *paths*; it does not check
that a `requires` id names a lesson that exists.

## Proposal

Add a ledger validation step to the gate chain — one script, run in `npm run build`
alongside the other checks:

- Every ledger file under `curriculum-state/ledgers/` must parse as YAML.
- No two `concepts` entries may share a `term` (registers are the sanctioned way
  to vary a definition, so a duplicate term is always a defect).
- Every `requires:` id in `prerequisite-graph.yaml` must name an `id` defined in
  the same file.
- Every `path:` field must name a file that exists — already covered by
  `check-references.mjs` for `path`, but a `requires` id check is not.

Exit non-zero with the offending file, line, and value.

## Why it is worth adding

- It closes three defects that all survived a green build, and two of them were
  found in one session by accident.
- The ledger is the mechanism that stops the book becoming disconnected essays.
  An invariant nothing enforces is a comment, not a rule.
- It is a few dozen lines with zero dependencies, in the same style as the
  existing checks, and it runs in well under a second.

## Open question

Should a duplicate `term` be an error or a warning? An error is right: the file's
stated purpose is that a later chapter cannot redefine what an earlier one
established, and two entries for one term is exactly that failure. Recommend
error, with the message naming the two `first_defined` chapters so the fix is
obvious.
