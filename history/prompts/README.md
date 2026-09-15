# Prompt History Records (PHRs)

Every meaningful exchange with the AI is recorded here for traceability and learning.

## Layout

```
history/prompts/
├── constitution/         — /sp.constitution sessions
├── <feature-name>/       — feature-scoped sessions (spec, plan, tasks, implement)
└── general/              — anything not tied to a feature or constitution
```

## File naming

`<ID>-<slug>.<stage>.prompt.md`

- `ID` — zero-padded, monotonically increasing within the directory
- `slug` — short kebab-case from the title (3–7 words)
- `stage` — one of: `constitution`, `spec`, `plan`, `tasks`, `red`, `green`, `refactor`, `explainer`, `misc`, `general`

See `.specify/templates/phr-template.prompt.md` for the schema.
