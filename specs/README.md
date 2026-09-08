# Specs

Feature specifications for **The Bridge Balance**.

Each feature lives in its own numbered directory (`NNN-feature-name/`) and follows the Spec-Kit Plus lifecycle:

```
spec.md     — what & why    (user stories, requirements, success criteria)
plan.md     — how           (architecture, interfaces, NFRs, risks)
tasks.md    — do            (ordered, testable tasks with dependencies)
contracts/  — interfaces    (OpenAPI, schemas, message contracts)
```

## Index

| # | Feature | Status |
|---|---|---|
| 001 | [book-foundation](./001-book-foundation/) | scaffolded |
| 001 | [hamburger-rebuild](./001-hamburger-rebuild/) | shipped |
| 002 | [apple-design](./002-apple-design/) | shipped |
| 003 | [remove-llm-providers-page](./003-remove-llm-providers-page/) | shipped |
| 004 | [fix-navbar-alignment](./004-fix-navbar-alignment/) | shipped |
| 005 | [redesign-navbar-hero](./005-redesign-navbar-hero/) | shipped |
| 006 | [storytelling-intro](./006-storytelling-intro/) | shipped |

## Convention

- One feature per numbered directory (`00N-feature-name`).
- `spec.md` is the source of truth for scope; `plan.md` may evolve but should never contradict it.
- Update `tasks.md` as work progresses; completed tasks stay for traceability.
