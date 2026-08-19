# Research: Remove Internal LLM Provider Decision from Public Site

## R-001 — Docusaurus route and navigation source

**Decision**: Remove the Markdown source `edu-site/docs/llm-providers.md` and remove
both explicit `/llm-providers` items from `edu-site/docusaurus.config.ts`.

**Rationale**: Docusaurus generates documentation routes from files in the docs
content tree, while the navbar and footer entries explicitly expose the route.
Deleting only the links would leave a directly reachable public page; deleting
only the Markdown source would leave broken public links. Both layers must be
changed.

**Evidence**:

- `edu-site/docs/llm-providers.md` has frontmatter and learner-visible content.
- `edu-site/docusaurus.config.ts:79-81` defines the navbar link.
- `edu-site/docusaurus.config.ts:103-106` defines the footer link.

**Alternatives considered**:

- Unlinking only: rejected because the route remains directly reachable.
- Keeping an unlinked route: rejected because the entire document is internal.

## R-002 — Internal source-of-truth preservation

**Decision**: Preserve `history/adr/0001-free-tier-llm-choice.md` and all
`edu-site/api/app/llm/**` provider code. Remove only their public documentation
exposure.

**Rationale**: The user identified the page as a future chatbot architecture
decision, not as an incorrect decision. The provider abstraction remains needed
when chatbot/RAG features are implemented later. The ADR directory is outside
Docusaurus's `edu-site/docs/` tree and therefore remains repository-internal.

**Alternatives considered**:

- Delete ADR/provider code: rejected; would destroy planned architecture.
- Move ADR into the docs tree: rejected; would keep internal material public.

## R-003 — README cross-reference handling

**Decision**: Update `edu-site/api/README.md` so its setup/provider guidance no
longer points readers to the removed public page. Retain provider implementation
instructions and point maintainers to the internal ADR instead.

**Rationale**: A repository README is not rendered as textbook content, but its
references must remain accurate after the page deletion. Leaving
`docs/llm-providers.md` in the README creates a broken internal link and implies
the page still exists.

**Alternatives considered**:

- Leave the README references: rejected because they become stale/broken.
- Remove all provider guidance: rejected because maintainers still need the
  future chatbot architecture context.

## R-004 — Verification of a removed static route

**Decision**: Verify both source and generated output: search public source for
`llm-providers`/`LLM providers`, run a fresh `npm run build`, inspect the output
for the former route, and request the former served URL to confirm the normal
not-found behavior.

**Rationale**: Source scans catch dangling links; a fresh build catches generated
routes; a runtime request confirms the user-visible behavior. These checks cover
stale output and direct URL access without changing hosting or adding tooling.

**Alternatives considered**:

- Source grep only: rejected because it cannot prove route generation behavior.
- Browser check only: rejected because it can be affected by stale build output.
