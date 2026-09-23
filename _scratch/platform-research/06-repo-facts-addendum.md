# JOB 6 REPORT

## F1 — Generators

- **Manifest output**: `edu-site/src/data/chapterManifest.ts` — `OUT_DIR = join(ROOT, "src", "data")`, `OUT_FILE = join(OUT_DIR, "chapterManifest.ts")` (`generate-chapter-manifest.mjs:29-30`). **Not** `static/`; it is a committed TS module compiled into the client JS bundle. Size: **2,611 bytes**.
- **Search output**: `edu-site/static/search-index.json` (`generate-search-index.mjs:18`), served at `/search-index.json` and fetched client-side. Size: **41,325 bytes (~41 KB)**.
- **Entry shape** (script `:150-160`; sample `search-index.json:2-20`): `title` string, `route` string, `headings` string[], `content` string, `excerpt` string; optional `content_kind` (`"theory"|"practice"`) — **unused today** (no doc sets it).
- **Not full text**: `content` is markdown-stripped plain text capped at 2000 chars — `plain.slice(0, 2000)` (`:148`); `excerpt` ≈ first 200 chars (`makeExcerpt(...,200)`); `headings` is complete.
- **Inclusion**: every `docs/**/*.md|*.mdx`; directories starting `.` or `_` skipped (`:28`; manifest `:40`); `chapter_state: placeholder` pages skipped (`:125`). 17 records: `glossary` (`:90`), `faq` (`:83`), `welcome` (`:233`), `changelog` (`:62`), plus `accessibility`, `code-of-conduct`, `perf-targets` (`:4,69,208`). `parked/` is outside `docs/` (`edu-site/parked/credentials-track/`) → excluded. All 31 walked files are `.md`; no `.mdx`.

## F2 — MDX structure

- **Frontmatter keys used** (union across 31 docs): `title`, `sidebar_label`, `sidebar_position`, `description`, `keywords`, `chapter_state`, `video_url`, `scope_multiplier`, `scope_reason`.
- **JSX/imports**: zero `import` lines in any doc. Only component tag used is `<Callout type=... title=...>` in **8 files** (welcome, ch00, changelog, intro-1…intro-5). Registered globally: `src/theme/MDXComponents.tsx:29,139-145` (exports `Callout`, `StageBanner`, overrides `h1`, `ul`).
- **Anchors**: auto slugs — no `{#id}` anywhere in docs; prose depends on slugs, e.g. `ch00-introduction.md:44` links `/glossary#agent` matching `glossary.md:12` heading `### Agent`.

## F3 — Counts and volume

| Group | Files | Words |
|---|---|---|
| `chapter_state: text-ready` | 11 | ~25,150 |
| `chapter_state: placeholder` | 14 | ~1,937 |
| no `chapter_state` (accessibility, changelog, code-of-conduct, faq, glossary, perf-targets) | 6 | ~6,893 |

- Reference pages: glossary 293, faq 923, welcome 1,240 (counted in text-ready), changelog 3,384.
- **Text-ready + glossary + faq + changelog ≈ 29,750 words** (welcome already inside the 25,150).
- Method: PowerShell per file — regex-stripped the YAML frontmatter block, split the rest on whitespace. Includes markdown/link tokens, so treat as ±few percent.

## E1 — Backend deployment

- Dockerfile: **NOT FOUND** (root, `edu-site/`, `edu-site/api/` listings; scoped glob). Procfile: **NOT FOUND**. `render.yaml`: **NOT FOUND**. `fly.toml`: **NOT FOUND**. `railway.json/toml`: **NOT FOUND**.
- Hugging Face Space: **NOT FOUND**; only hits are `huggingface` as an embeddings provider enum (`edu-site/api/app/config.py:42`) and `EMBEDDING_PROVIDER=huggingface` note (`edu-site/api/.env.example:32`).
- Workflow deploying the API: **NOT FOUND** — `.github/workflows/` contains only `ci.yml`.
- Deploy evidence is site-only: `vercel.json` builds `edu-site` only; `edu-site/docusaurus.config.ts:22` `url: "https://the-bridge-balance.vercel.app"`; `specs/001-book-foundation/spec.md:13` "deploys exclusively to Vercel free tier". `stack.md:42` shows "FastAPI container │ Render / Railway / Fly.io" as **target architecture only** (INFERRED: backend runs only locally via `uvicorn app.main:app`).
- `ci.yml` jobs: **build** (checkout; Node 20; `npm ci`; `npx @biomejs/biome ci src`; `npm run check:frontmatter`; `npm run typecheck`; `npm run build`; upload `build/`); **audit** (download build; `npx playwright install --with-deps chromium`; `npm run test:audit`; upload Lighthouse, axe, audit-summary reports).

## B7 — API

- **README "Adding an LLM provider"**, six steps, five distinct files: 1) `app/config.py` — add `LLMProvider` enum value; 2) add credential to `Settings` (same `app/config.py`); 3) `app/llm/providers/<name>.py` implementing `LLMClient`; 4) register in `app/llm/registry.py:_build`; 5) add row in `app/llm/router.py:providers`; 6) `.env.example` + ADR-0001 reference. `app/llm/router.py` and `registry.py` exist; `main.py:9` imports `from app.llm import router as llm_router`. (README's layout block separately names `app/routers/llm_router.py`.) Providers dir: none, groq, gemini, together, ollama, deepseek, openai.
- **pyproject.toml**: `requires-python = ">=3.12"`; `"fastapi>=0.115.0"`; `"uvicorn[standard]>=0.30.0"`; `openai`, `openai-agents`, `sse-starlette`, `slowapi`: all **absent**. Dev extras: `pytest>=8.3.0`, `pytest-asyncio>=0.24.0`, `ruff>=0.6.0`, `mypy>=1.11.0`.
- **tests/**: `__init__.py`, `test_health.py` — `test_health_ok`, `test_readiness_phase_a`, `test_llm_status_default`, `test_llm_providers_lists_all`, `test_chat_returns_501`, `test_personalize_returns_501`, `test_translate_returns_501`.