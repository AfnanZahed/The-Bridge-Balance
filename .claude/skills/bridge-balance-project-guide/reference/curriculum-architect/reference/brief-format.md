# Lesson brief format

### Bundled reference for `curriculum-architect` — Mode 2 writes exactly this shape

The brief exists so a `chapter-production` run can start from something sharper than a bare topic name, without that run having to invent scope, sequencing, or angle from nothing. It is an input, not a finished decision — the research run is free to discover the angle was wrong and redirect; the brief is a running start, not a rail.

## Where it goes

**Into your reply, not into a file.** A brief is a running start for the next authoring run, not an artifact the repo carries — and one written to disk goes stale the moment research finds a better angle. If the user explicitly wants it kept, `curriculum-state/proposals/` is where non-binding planning output lives.

## Shape

```
TOPIC:                 [Working title — specific enough to research, not a stage name]
STAGE & POSITION:       [0-4, and a rough sequence position. If this doesn't have a
                        prerequisite-graph.yaml entry yet, say so explicitly rather than
                        implying one exists]
SCOPE / ANGLE:          [One or two sentences: what this lesson is actually about,
                        specific enough that a researcher isn't left guessing the
                        thesis-tie-in from a bare noun. This is the part a bare topic
                        name ("databases") always lacks and a lesson ("choosing between
                        PostgreSQL and MongoDB for a first backend") always has]
LIKELY PREREQUISITES:  [What this lesson probably assumes, cross-checked against
                        prerequisite-graph.yaml — named as "likely," because confirming
                        it for real is the authoring run's job, not this brief's]
CONCEPTS ALREADY DEFINED: [Anything from concept-ledger.yaml this lesson will need and
                        should reuse verbatim rather than redefine]
EVIDENCE RISK NOTE:     [Optional. Only if a source this lesson will obviously reach for
                        is already heavily used per evidence-ledger.yaml — a heads-up to
                        look for a different angle or source, not a restriction]
WHY THIS ORDER:         [One sentence on why this position, if it's not obvious —
                        skip this field rather than pad it if the position is self-evident]
STATUS:                 PROPOSAL — not a commitment. Written by curriculum-architect on
                        [date]. Confirm, edit, or discard before treating it as settled.
```

## What this is not

Not a chapter. Not a research record. Not a substitute for the design work `lesson-spine-authoring` does at `chapter-production`'s step 3 — a brief gives that work somewhere to start, it doesn't pre-empt it. A brief with a confidently-stated `SCOPE / ANGLE` is still just this skill's best guess at what would make a good lesson; the research run may find a better angle once it actually looks at the topic; that's a valid outcome, not a deviation to justify.

## If the lesson has no graph entry yet

Add exactly one row to `prerequisite-graph.yaml`, `status: "planned"`, using this brief's `TOPIC`, `STAGE & POSITION`, and `LIKELY PREREQUISITES` as the row's `title`, `stage`/`position`, and `requires`. The row also needs an `id` (short and unique, since other rows' `requires:` arrays will reference it directly once anything depends on it) and a `path` (where the file would live once authored, following the site's existing `docs/stage-0N-<stage-slug>/<NN>-<lesson-slug>.md` naming, even though nothing is written there yet) — a row missing either has no real place in the graph's structure. Nothing else changes status. A `planned` row, `id` and `path` included, is exactly as revisable as this brief is — the same STATUS line applies to all of it by extension.
