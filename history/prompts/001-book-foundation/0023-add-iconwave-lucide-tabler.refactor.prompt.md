---
id: 0023
title: Add IconWave lucide tabler
stage: refactor
date: 2026-08-17
surface: agent
model: opus
feature: 001-book-foundation
branch: 001-spec-driven-engineering
user: coordinator (Agent D fan-out)
command: parallel frontend overhaul — Agent D scope
labels: [icons, lucide, tabler, phosphor, docs, mdx, typecheck]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - src/components/IconWave/index.tsx
  - src/components/IconWave/doc-icons.ts
  - docs/llm-providers.md
  - docs/intro.md
tests:
  - npx tsc --noEmit
---

## Prompt

You are Agent D in a parallel frontend overhaul for The Bridge Balance textbook. Your job: use
`lucide-react` and `@tabler/icons-react` (both installed, currently unused) where they genuinely
earn their place — WITHOUT creating icon-library soup. The site already uses Phosphor as its
primary vocabulary (in `src/components/icons/`). You must NOT replace Phosphor; you ADD a small,
deliberate layer where lucide/tabler are the better tool.

Skill: use the grand-designer router — read its SKILL.md, route to the icon / data-tabular
sub-skill, apply.

Deliverables (coordinator-confirmed) — create `src/components/IconWave/index.tsx`: a semantic
icon-chip strip for dense doc/service chips. Rules for icon vocabulary (deliberate, not icon
soup):
- Phosphor stays the PRIMARY vocabulary for all page-level UI. Do not replace it.
- lucide-react is reserved for DOCUMENT-TYPE semantics (chapter, video, spec, checklist,
  glossary, dataset).
- @tabler/icons-react is reserved for SYSTEM/SERVICE identity in dense chips (Groq, Gemini,
  Ollama, Together, DeepSeek, OpenAI, Qdrant, Neon, Resend, Stripe, R2, Vercel).

Create `src/components/IconWave/doc-icons.ts`: one typed map exporting `DOC_TYPE_ICONS` (lucide)
and `SERVICE_ICONS` (tabler) keyed by stable ids.

Integrate additively:
- `docs/llm-providers.md`: decorate the provider matrix rows with SERVICE_ICONS chips.
- `docs/intro.md`: decorate the chapter listing with DOC_TYPE_ICONS.

Match existing conventions: use `--tbb-*` CSS custom properties and light/dark patterns. No
inline hex colors for surfaces/text.

File-ownership contract (other agents own these): touch ONLY src/components/IconWave/*,
doc-icons.ts, docs/llm-providers.md, docs/intro.md (all additive). Do NOT touch src/css/*,
src/pages/index.tsx, package.json, .github/workflows/ci.yml, biome.json.

Run `npx tsc --noEmit` to typecheck. Do NOT run `npm run build` (shared build folder races other
agents).

## Response snapshot

Verified both packages' available exports against their dist type definitions (lucide-react@1.31,
@tabler/icons-react@3.46). Created:

- `src/components/IconWave/index.tsx` — IconWave chip strip with a curated set of static icon
  imports from both libraries. Chips are fixed 18px icons, baseline-aligned inline-flex, stroke
  1.8 for tabler / 2 for lucide, using only --tbb-* tokens (no inline hex). Includes memoized
  chip, optional href, focus/hover states via --tbb-shadow-glow, and a "+N more" overflow
  (`maxVisible`, default 8).
- `src/components/IconWave/doc-icons.ts` — typed `DOC_TYPE_ICONS` (10 lucide doc-type entries)
  and `SERVICE_ICONS` (29 tabler service entries) keyed by stable ids, plus name/get helpers and
  exhaustive key arrays. Rule documented at top: lucide for file/doc semantics, tabler for
  system/service semantics.
- `docs/intro.md` — added additive `import { IconWave }` + a "Content format at a glance" chip
  row under "How to read this book" (6 doc-type chips: chapter/video/spec/checklist/code/dataset).
- `docs/llm-providers.md` — added `import { IconWave }` + a service provider chip row right after
  the provider matrix (6 service chips: Ollama/Groq/Gemini/Together/DeepSeek/OpenAI).

Brand-icon availability finding: Tabler 3.46 has NO brand icons for Ollama, Gemini, Together,
Qdrant, HuggingFace, Claude/Anthropic, Cohere, Mistral. Used deliberate conceptual fallbacks
(DeviceLaptop for self-hosted Ollama, BrandGoogle for Gemini/Google, World for Together open-model
hub, Database for Qdrant/Neon, Brain for DeepSeek/HF reasoning, Sparkles for Claude, Bolt for
Mistral) and documented the convention in the map.

Typecheck: `npx tsc --noEmit` passes file-clean for IconWave; the only errors in the whole run are
pre-existing in `src/components/DataViz/CurriculumBarChart.tsx` (unrelated, owned by another
agent). Full build intentionally NOT run.

## Outcome

- ✅ Impact: Added a small, deliberate lucide+tabler layer for dense doc/service chips without
  touching the Phosphor primary vocabulary, hero, motion, or brand components.
- 🧪 Tests: `npx tsc --noEmit` — IconWave/doc-icons clean (DataViz errors pre-existing).
- 📁 Files: src/components/IconWave/index.tsx, src/components/IconWave/doc-icons.ts (new);
  docs/intro.md, docs/llm-providers.md (additive MDX imports + chip rows).
- 🔁 Next prompts: verify render in a browser (playwright), add R2/backend service keys when the
  product catalog needs them.
- 🧠 Reflection: static icon maps over dynamic string-keyed imports keep bundle small and let the
  compiler catch misspelled keys; documenting the fallback convention for missing brand icons
  keeps the "deliberate, not soup" rule enforceable.

## Evaluation notes (flywheel)

- Failure modes observed: initially exported `SERVICE_ICONS` values for brand icons that do not
  exist in Tabler 3.46 (IconBrandOllama/IconBrandGemini/IconBrandTogether/IconBrandQdrant/
  IconHuggingFace/IconClaudeAi/IconCohere/IconMistralAi) — the d.ts grep caught them before
  typecheck; replaced with verified imports and documented fallbacks.
- Graders run and results (PASS/FAIL): grand-designer icon-system + table-accessibility routing;
  d.ts export verification; tsc. PASS.
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): none planned — scope complete.