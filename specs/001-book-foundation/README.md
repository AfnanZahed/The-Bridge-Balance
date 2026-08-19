# 001 — book-foundation

> **Status:** scaffolded (awaiting formal spec via `/sp.specify`).

This is the first feature: the textbook itself. The Docusaurus site runs locally; six Stage 1 chapters are MDX placeholder shells ready to receive lecture content.

## What's here now

- `edu-site/docs/stage-01-spec-aware-vibe-engineering/` — six placeholder chapters (Foundations, Core Programming, Frontend, Backend, Databases, Git & GitHub) with a consistent template: lecture outline checklist, lecture transcript placeholder, worked example, "check your understanding" section.
- `edu-site/docs/intro.md` — textbook root with a "how to read this book" table.
- `edu-site/src/pages/index.tsx` — homepage hero + four stage cards.
- `edu-site/docs/llm-providers.md` — provider comparison (cross-referenced from ADR-0001).

## What this feature will deliver

The textbook must:

1. Build successfully with `npm run build`.
2. Render all six Stage 1 chapters with consistent layout.
3. Pass accessibility baseline (semantic headings, alt text on images, color contrast).
4. Show a sidebar that puts Stage 1 first and Stages 2–4 collapsed.
5. Be deployable to GitHub Pages or Vercel.

## Out of scope (deferred to other features)

- RAG chat (Phase B feature).
- Per-chapter personalization and translation (Phase B feature).
- better-auth sign-in (Phase B feature).
- Stripe / product catalog (Phase C feature).

## Next steps

1. Run `/sp.constitution` to formalize the project's principles.
2. Run `/sp.specify "book-foundation"` to write `spec.md` from this scaffold.
3. Run `/sp.plan` to design the build / deploy architecture.
4. Run `/sp.tasks` to break it into testable units.
5. Begin delivering lecture content into the six placeholder chapters.
