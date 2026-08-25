# Contracts: Chapter State Transparency

**Branch**: `012-chapter-state-transparency` | **Date**: 2026-08-25
**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

This directory is intentionally empty.

This feature is a **pure presentational frontend change** with no new
HTTP endpoints, no new schemas, no new external interfaces, no new
event channels, and no new persisted preferences. There is nothing to
contract against.

What might have lived here under other features — REST/OpenAPI specs,
GraphQL SDL, message-broker schemas, persistence migrations, third-party
integration docs — does not apply.

The two data sources this feature relies on are both already specified
elsewhere in the repo:

1. **`chapter_state` frontmatter enum** — see
   `edu-site/scripts/check-frontmatter.mjs` (the existing validator)
   and `docs/contributing/reader-controls.md` (the existing contributor
   guidance).
2. **`AuthoredCombinationCount` runtime computation** — see
   `edu-site/src/components/ReaderControls/AuthoredCombinations.ts`
   (the source of truth) and `edu-site/docs-contributing/reader-controls.md`
   (the existing authoring rules).

If `/sp.implement` discovers an actual contract-shaped need (e.g.
discovering that an undocumented client-side event fires on pill change
and we need to document it), it should be added here at that time —
not pre-emptively now.
