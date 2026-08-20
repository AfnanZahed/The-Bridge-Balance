# Contracts: Harden, Verify, and Ship the Differentiated Intros

This feature has no runtime API surface; the contracts here are verification contracts enforced before publication.

## Contract: Audit Log

The audit log MUST be a Markdown file at `specs/009-differentiated-intros/audit-log.md` with the following schema:

```yaml
feature: 009-differentiated-intros
reviewer: <name or role>
reviewed_at: <YYYY-MM-DD>
matrix_path: specs/009-differentiated-intros/comparison-matrix.md
rows:
  - cell: C1
    verdict: unique | duplicate lens | duplicate scenario | duplicate structure | duplicate takeaway
    note: <optional>
  # ... one row per C1–C9
blind_match_accuracy: <0-100 percent, optional>
summary: <one-paragraph outcome>
```

The audit log MUST record at least one named reviewer and a date ≥ 2026-08-20. Every row MUST have a verdict.

## Contract: Live Check Result

The live check result MUST be a Markdown file at `specs/009-differentiated-intros/live-check-result.md` with the following schema:

```yaml
feature: 009-differentiated-intros
mode: playwright | static-dom
artifact_path: <path when static-dom>
url: <url when playwright>
combinations_exercised:
  - beginner|summary
  - beginner|detailed
  - intermediate|balanced
  - advanced|detailed
checks:
  - name: description node visible
    expected: true
    observed: true
    pass: true
  # ... one entry per required check
summary: <one-paragraph outcome>
```

Required checks:

1. description node visible
2. description text contains the lens label
3. description text contains the "choose this if" sentence
4. controls' `aria-describedby` references the description id
5. on combination change, description text updates without a reload

At least four distinct combinations MUST be exercised.

## Contract: Routing Resolution

Each Stage link in the "Where to start" routing table MUST resolve to a file under `edu-site/build/` after `npx docusaurus build`. The resolution check is recorded in the live-check result (or a sibling artifact) as:

```yaml
routing:
  - label: "New to programming"
    href: /stage-01-spec-aware-vibe-engineering/
    resolved: true
    fallback: null
  # ... one row per routing link
```

If a destination does not resolve, `resolved: false` and `fallback` MUST point to a documented alternative.

## Contract: Final PHR

The final PHR MUST live at `history/prompts/009-differentiated-intros/0007-differentiated-intros.publish.green.prompt.md` and MUST include:

- All changed files since the previous PHR (0006) with absolute paths
- Audit log path and verdict
- Live check result path and pass count
- Typecheck and build result
- `git diff main --stat` summary mapped to a task or this spec
- Explicit ship state (one of `draft`, `audit-passed`, `live-checked`, `build-green`, `pr-ready`, `shipped`)

## Contract: Branch Cleanliness

`git diff main --stat` MUST list only files mapped to either `specs/009-differentiated-intros/tasks.md` or `specs/010-continue-intro-work/spec.md`. Any unrelated file is a violation of Principle V and MUST be reverted before marking the branch `pr-ready`.
