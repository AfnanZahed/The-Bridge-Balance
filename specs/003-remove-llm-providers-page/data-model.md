# Data Model: Remove Internal LLM Provider Decision from Public Site

## Statement

This feature introduces **no new data entities, fields, relationships,
validation rules, lifecycle states, or migrations**. It removes public
exposure of existing content and preserves existing architecture.

## Affected existing artifacts

| Artifact | Role | Change |
|---|---|---|
| `edu-site/docs/llm-providers.md` | Public documentation page (source) | Deleted |
| `edu-site/docusaurus.config.ts` | Site navigation configuration | Navbar/footer link removed |
| `edu-site/api/README.md` | Backend repository documentation | Public reference replaced |
| `history/adr/0001-free-tier-llm-choice.md` | Internal architecture decision | Preserved unchanged |
| `edu-site/api/app/llm/**` | Backend provider interfaces/implementations | Preserved unchanged |

## No migration

No database, vector store, object store, or persistent state is affected.
There is nothing to back up, transform, or roll back beyond the static source
files and configuration documented above.
