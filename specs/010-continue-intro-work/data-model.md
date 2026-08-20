# Data Model: Harden, Verify, and Ship the Differentiated Intros

This feature has no runtime database. The model below describes verification and publication artifacts.

## Audit Log

The artifact produced by the reviewer-blind matrix verification pass.

| Field | Description | Validation |
|---|---|---|
| feature | Source feature id | `009-differentiated-intros` |
| reviewer | Name or role of the independent reviewer | Required; non-empty |
| reviewed_at | ISO-8601 date of the review | Required; ≥ 2026-08-20 |
| matrix_path | Path to the comparison matrix | `specs/009-differentiated-intros/comparison-matrix.md` |
| rows | One row per cell id (C1–C9) | Exactly nine |
| per_row_verdict | `unique` / `duplicate lens` / `duplicate scenario` / `duplicate structure` / `duplicate takeaway` / `pending` | Required per row |
| per_pair_findings | Per-row notes about adjacent duplicates | Optional |
| summary | One-paragraph outcome | Required |
| blind_match_accuracy | Reviewer blind-match accuracy in percent | Optional; ≥ 90% if reported |

State transitions:

`draft → review-in-progress → audit-passed → audit-failed`

`audit-failed` reverts affected rows in the matrix to `pending` and blocks publication per Q5.

## Live Check Result

The output of the reader-control description verification.

| Field | Description | Validation |
|---|---|---|
| feature | Source feature id | `009-differentiated-intros` |
| mode | `playwright` or `static-dom` | Required |
| artifact_path | Path to the artifact examined (e.g., `edu-site/build/index.html`) | Required when `mode = static-dom` |
| url | URL opened | Required when `mode = playwright` |
| combinations_exercised | List of `difficulty\|length` pairs exercised | At least 4 distinct values |
| checks | Array of `{name, expected, observed, pass}` | Every check has a pass/fail |
| summary | One-paragraph outcome | Required |

Required checks:

- Description node visible.
- Description text contains the lens label.
- Description text contains the "choose this if" sentence.
- Controls' `aria-describedby` references the description id.
- On combination change, the description text updates without a reload.

State transitions: `pending → passing | failing`.

## Final PHR

The closing Prompt History Record for the `009-differentiated-intros` branch.

Required content:

- id, title, stage, date, surface, model, feature, branch, user, command
- links: spec, plan, tasks, ticket (null), adr (null), pr (null until shipped)
- files: list of every file touched in the branch
- tests: results for typecheck, build, audit, live check, routing resolution
- prompt, response, outcome, evaluation notes

## Publication State

The progression of the `009-differentiated-intros` branch toward shipping.

| State | Pre-conditions |
|---|---|
| `draft` | Initial state |
| `audit-passed` | Audit log shows 9/9 rows `unique`; reviewer and date recorded |
| `live-checked` | Live check result has every required check `pass` |
| `build-green` | Typecheck PASS; Docusaurus build PASS |
| `pr-ready` | All of the above plus final PHR committed; routing links resolve |
| `shipped` | PR merged into `main` |

State transitions are forward-only except `audit-failed`, which reverts to `draft` for the affected row.
