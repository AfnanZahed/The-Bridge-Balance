# JOB 1 — CODE AUDIT OF THE CHATBOT

## A. FRONTEND CHAT UI (`edu-site/src/`)

### A1. Chat-related files

| Path | Purpose | Lines |
|---|---|---|
| `edu-site/src/components/ChatAssistant/index.tsx` | The whole assistant: floating trigger, overlay, composer, six modes, honest reveal | 630 |
| `edu-site/src/components/ChatAssistant/styles.module.css` | Its only stylesheet (CSS module) | 665 |
| `edu-site/src/theme/Root.tsx` | Mount point (swizzled Root) — import + render only | 61 |
| `edu-site/src/css/custom.css:3197-3201` | Scroll-lock rule shared with drawer/Spotlight (`html[data-chat-open="true"]`) | — |

No other file in `edu-site/src/` implements or imports the assistant. Grep for `ChatAssistant|Ask the book|tbb-chat|assistant` across `edu-site/src/**` returns only these three files plus unrelated prose comments (`edu-site/src/components/IconWave/doc-icons.ts:63` says `// no BrandClaude → frontier assistant`).

### A2. Mount

`edu-site/src/theme/Root.tsx:29` — `import ChatAssistant from "@site/src/components/ChatAssistant";`
`edu-site/src/theme/Root.tsx:57` — `        <ChatAssistant />` (inside `<MotionProvider>`, sibling of `{children}`; no navbar item, no page, no `defaultOpen` passed).

### A3. Modes — IN FULL

Type (`index.tsx:72-77`):

```ts
type Mode = {
  id: string;
  label: string;
  blurb: string;
  Glyph: React.ElementType;
};
```

Array (`index.tsx:84-121`):

```ts
const MODES: Mode[] = [
  {
    id: "deep-research",
    label: "Deep Research",
    blurb: "Digs through a topic properly before answering.",
    Glyph: Microscope,
  },
  {
    id: "deep-think",
    label: "Deep Think",
    blurb: "Reasons through hard questions instead of guessing.",
    Glyph: Brain,
  },
  {
    id: "document-writer",
    label: "Document Writer",
    blurb: "Drafts real documents and notes for you.",
    Glyph: FileText,
  },
  {
    id: "note-taker",
    label: "Note Taker",
    blurb: "Turns a conversation into organised notes.",
    Glyph: NotebookPen,
  },
  {
    id: "book-aware",
    label: "Book-Aware",
    blurb: "Understands and quotes anything from this book.",
    Glyph: BookOpen,
  },
  {
    id: "world-aware",
    label: "World-Aware",
    blurb: "Understands and explains things outside the book too.",
    Glyph: Globe,
  },
];
```

Flags: **none.** There is no book/general boolean, no free/pro field, no cost/effort tier, no prompt key — only `id`, `label`, `blurb`, `Glyph`. Order is the array order above (also the DOM order in the fieldset). The label is used in the placeholder (`Ask ${activeMode.label}…`, `index.tsx:277-279`) and the blurb is the pill `title` (`index.tsx:575`) plus the caption under the composer.

### A4. User-visible strings (verbatim; `[PROMISE]` = obliges the backend)

Header: `preview build` (`index.tsx:403`).
Trigger: visible text `Ask the book` (`index.tsx:338`), `aria-label="Ask the book"` (`index.tsx:319`).
Compose view: `Ask the book anything.` (`index.tsx:514`) **[PROMISE — scope of the corpus]**; field label `Your question` (`index.tsx:539`); mode fieldset `aria-label="How it should think"` (`index.tsx:568`); send `aria-label="Send"` (`index.tsx:604`); close `aria-label="Close the assistant"` (`index.tsx:408`); idle caption `Choose how it should think — or just ask.` (`index.tsx:141`); placeholders `Ask ${activeMode.label}…` and `Ask the book anything…` (`index.tsx:277-279`).
Three blurbs that promise capability: `Digs through a topic properly before answering.` **[PROMISE — deep-research must actually search]**; `Understands and quotes anything from this book.` **[PROMISE — retrieval + quotation]**; `Understands and explains things outside the book too.` **[PROMISE — general-knowledge path]** (`index.tsx:87, 111, 117`).
Reveal (all `[PROMISE]` only while true; they become false the moment a request is sent):
`This isn't switched on yet.` (`index.tsx:442`); `You have found the preview, and it would rather tell you the truth than pretend: there is no assistant behind this box yet. No model, no request — and nothing you typed left this page.` (`index.tsx:443-449`) **[PROMISE — privacy];** `What is real is the design you just walked through: six ways in, one question box, and a book that is already written. When the assistant goes live it will read this book properly, answer from it, and show you where every answer came from — and reach past it when the question needs more.` (`index.tsx:450-459`) **[PROMISE — citations + out-of-book reach];** `no api connected · nothing transmitted` (`index.tsx:461`) **[PROMISE — privacy]** — DOM source `no api connected &middot; nothing transmitted`.
Actions: `Back to the preview` (`index.tsx:470`), `or close the assistant` (`index.tsx:476`).
Note: the file header comment (`index.tsx:9`) calls this the "under development" reveal; the shipped string is "isn't switched on yet".

### A5. What happens on send today

No API call exists in the file. Send button and Enter both call `reveal` (`index.tsx:603`, `index.tsx:268-275`):

```ts
const reveal = useCallback(() => {
    setDraft("");
    setRevealed(true);
  }, []);
```
(`index.tsx:180-183`)

```ts
const onFieldKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      reveal();
    }
  };
```
(`index.tsx:268-275`)

So: draft cleared, `revealed` flips true, the AnimatePresence swaps to the reveal view (`index.tsx:420-482`), focus moves to the reveal heading (`index.tsx:264-266`). No fabricated reply, no network, no error path.

### A6. State

All React state, nothing persisted (`index.tsx:151-155`):

```ts
const [isOpen, setIsOpen] = useState(defaultOpen);
const [revealed, setRevealed] = useState(false);
const [draft, setDraft] = useState("");
const [modeId, setModeId] = useState<string | null>(null);
const reduce = useReducedMotion() ?? false;
```

Refs: `triggerRef`, `panelRef`, `fieldRef`, `revealRef`, `hasOpenedRef` (`index.tsx:157-161`). `open()` resets reveal/draft/mode every time (`index.tsx:165-172`). **No `localStorage`/`sessionStorage`/cookies anywhere in the component (grep: no matches).** No message list exists.

### A7. Types

`type Mode` and `ChatAssistantProps` are quoted at A3/A2. Props (`index.tsx:143-146`):

```ts
export type ChatAssistantProps = {
  /** Open on first paint. Only for reviewing the surface. */
  defaultOpen?: boolean;
};
```

There is **no** message type, no `ChatRequest`/`ChatResponse` mirror, no mode-flag union — nothing models a turn.

### A8. Styling

CSS module: `edu-site/src/components/ChatAssistant/styles.module.css`.
Tokens used (all pre-existing): `--tbb-border`, `--tbb-radius-pill|-md|-lg|-xl|-sm`, `--tbb-surface-glass`, `--tbb-surface-solid`, `--tbb-surface`, `--tbb-surface-emphasis`, `--tbb-apple-frost`, `--tbb-shadow-sm|-lg|-xl`, `--tbb-shadow-*` stack, `--tbb-focus-ring`, `--tbb-metal-sheen`, `--tbb-text`, `--tbb-text-muted`, `--tbb-text-inverse`, `--tbb-ink`, `--tbb-heading-ink`, `--tbb-accent`, `--tbb-accent-hover`, `--tbb-accent-subtle`, `--tbb-duration`, `--tbb-duration-fast`, `--tbb-duration-slow`, `--tbb-ease`, `--tbb-ease-out`, `--tbb-font-display`; plus `--ifm-font-family-monospace` (`:230`) and a local `--ifm-color-primary` swap on hover (`:88`). One local token: `--tbb-mode-height` (2.25rem, 2.75rem on coarse pointers).
Dark mode: one scoped override only — `:global(:root[data-theme="dark"]) .overlay { background: oklch(0 0 0 / 0.66); }`; everything else rides the token ramp.
Motion: every variant branches on `reduce` (`index.tsx:155, 285-306`), transitions become `{ duration: 0 }`; CSS `@media (prefers-reduced-motion: reduce)` at `styles.module.css:657` removes only the trigger sweep.
Responsive: `@media (max-width: 30rem)` (`:127`) drops the trigger word, making it mark-only 3.25rem; `@media (pointer: coarse)` (`:269`, `:638`) restores 44px controls; `@media (hover: hover) and (pointer: fine)` (`:117`) gates the sweep; panel is `min(68rem, 100%) × min(52rem, 100%)` with `clamp()` padding. `@supports not (backdrop-filter…)` falls back to `--tbb-surface-solid` (`:75`, `:189`).
Layering: trigger `z-index: 140`, overlay `z-index: 260` (`:48`, `:161`).

### A9. Accessibility

Present: `role="dialog"` + `aria-modal="true"` + `aria-labelledby="tbb-chat-title"` (`index.tsx:379-382`); document-level `keydown` for Escape-close and Tab cycling between first/last focusables inside `panelRef` (`index.tsx:214-241`); focus into the textarea on mount via callback ref (`index.tsx:191-194`); focus returned to the trigger on close (`index.tsx:198-207`); reveal heading focused with `tabIndex={-1}` (`index.tsx:437-441`, effect `:264-266`); scroll lock via `data-chat-open` (`index.tsx:242-245`); real `<fieldset aria-label="How it should think">` with `aria-pressed={active}` per pill (`index.tsx:566-579`); `sr-only` label for the field (`index.tsx:535-540`, class defined `edu-site/src/css/a11y.css:260`); visible `:focus-visible` rings on every control; 44px floor on coarse pointers.
Gaps: no `aria-live`/log region (nothing to announce once real answers arrive); no focus containment via `inert`/`aria-hidden` on the rest of the page, so Tab can leave the dialog; the Tab trap only intercepts when `document.activeElement` is exactly first/last — if focus sits elsewhere in the panel the cycle is not enforced; overlay has no role/label; no `aria-describedby`; no keyboard shortcut for the assistant (⌘K belongs to Spotlight); no error/loading/retry UI or `aria-busy` design; no `role="status"` for the reveal readout.

### A10. Frontend config

`edu-site/docusaurus.config.ts:22` `url: "https://the-bridge-balance.vercel.app",`; `:23` `baseUrl: "/",`; `:28` `onBrokenLinks: "throw",`.
`customFields`: **NOT FOUND** (absent from the config object). `process.env` / `siteConfig` usage for an API base URL: **NOT FOUND** — grep for `customFields|process\.env\.|siteConfig` over `edu-site/**/*.{ts,tsx,mjs,json}` returns no matches. There is no `apiBaseUrl` anywhere; the frontend has no notion of the backend's address.

### A11. `edu-site/package.json`

`scripts` verbatim:

```json
  "scripts": {
    "build": "npm run check:frontmatter && npm run check:refs && npm run check:chapter && node scripts/generate-chapter-manifest.mjs && node scripts/generate-search-index.mjs && docusaurus build",
    "check:chapter": "node scripts/check-chapter.mjs",
    "check:frontmatter": "node scripts/check-frontmatter.mjs",
    "clear": "docusaurus clear",
    "deploy": "docusaurus deploy",
    "docusaurus": "docusaurus",
    "format": "biome format src scripts",
    "format:fix": "biome format --write src scripts",
    "gen:manifest": "node scripts/generate-chapter-manifest.mjs",
    "lint": "biome check src scripts",
    "lint:fix": "biome check --write src scripts",
    "serve": "docusaurus serve",
    "start": "docusaurus start",
    "swizzle": "docusaurus swizzle",
    "test:a11y": "node scripts/axe.mjs",
    "test:audit": "node scripts/serve-and-test.mjs",
    "test:perf": "node scripts/lighthouse.mjs",
    "typecheck": "tsc",
    "write-heading-ids": "docusaurus write-heading-ids",
    "write-translations": "docusaurus write-translations",
    "check:refs": "node scripts/check-references.mjs"
  },
```

Declared → installed: `@docusaurus/core` `^3.7.0` → **3.10.2**; `react` `^18.0.0` → **18.3.1**; `typescript` `~5.5.2` → **5.5.4**; `@biomejs/biome` `^2.5.8` → **2.5.8**; `prism-react-renderer` `^2.3.0` → **2.4.1**; `motion` `^11.18.2` → **11.18.2**; `lucide-react` `^1.31.0` → **1.31.0**.
Not present: `react-markdown` **NOT INSTALLED**, `remark` **NOT INSTALLED**, `rehype` **NOT INSTALLED**, `marked` **NOT INSTALLED**, `dompurify` **NOT INSTALLED**, any SSE helper (`eventsource-parser` **NOT INSTALLED**, no `EventSource`/`text/event-stream` anywhere in `src`). The only `fetch` in the frontend is `edu-site/src/lib/search.ts:45` (search index). So there is no markdown renderer, no sanitiser and no stream parser to render a real answer with.

### A12. Lint/type config

`edu-site/biome.json` (schema 2.5.8). Rules new code must satisfy: formatter on, indent 2 spaces, line width 80, LF endings; double quotes, semicolons always, trailing commas all, arrow parens always; JSON formatter on with no trailing commas; `assist.actions.source.organizeImports: "on"`; linter preset `recommended` with `useImportType` off, `noExplicitAny` off, `noArrayIndexKey` off. CI runs `npx @biomejs/biome ci src` (`.github/workflows/ci.yml`, Lint step) — note CI checks `src` only while `npm run lint` checks `src scripts`.
`tsconfig` strict: **NOT SET.** `edu-site/tsconfig.json` extends `@docusaurus/tsconfig`, whose file (`edu-site/node_modules/@docusaurus/tsconfig/tsconfig.json`) sets `allowJs`, `esModuleInterop`, `jsx`, `target ES2022`, `moduleResolution`, `noEmit`, `baseUrl`, `paths`, `skipLibCheck` — and **no `strict`**. TypeScript therefore defaults to `strict: false`; `npm run typecheck` (`tsc`) will not catch `null`/`undefined` handling in new fetch/stream code.

## B. BACKEND (`edu-site/api/`)

### B1. File tree (excl. `.venv`, `__pycache__`, `.pytest_cache`, `*.egg-info`), lines via `ReadAllLines`

| Path | Lines |
|---|---|
| `.env.example` | 48 |
| `pyproject.toml` | 47 |
| `README.md` | 91 |
| `app/__init__.py` | 2 |
| `app/main.py` | 36 |
| `app/config.py` | 145 |
| `app/deps.py` | 15 |
| `app/db/__init__.py` | 10 |
| `app/db/neon.py` | 42 |
| `app/llm/__init__.py` | 31 |
| `app/llm/base.py` | 79 |
| `app/llm/registry.py` | 51 |
| `app/llm/router.py` | 79 |
| `app/llm/providers/__init__.py` | 8 |
| `app/llm/providers/none.py` | 29 |
| `app/llm/providers/groq.py` | 32 |
| `app/llm/providers/gemini.py` | 28 |
| `app/llm/providers/together.py` | 25 |
| `app/llm/providers/ollama.py` | 26 |
| `app/llm/providers/deepseek.py` | 26 |
| `app/llm/providers/openai.py` | 30 |
| `app/rag/__init__.py` | 6 |
| `app/rag/qdrant.py` | 54 |
| `app/routers/__init__.py` | 5 |
| `app/routers/health.py` | 41 |
| `app/routers/chat.py` | 45 |
| `app/routers/personalize.py` | 32 |
| `app/routers/translate.py` | 32 |
| `tests/__init__.py` | 5 |
| `tests/test_health.py` | 65 |

### B2. `app/main.py`

```python
def create_app() -> FastAPI:
    app = FastAPI(
        title="The Bridge Balance API",
        version="0.1.0",
        description="Backend for The Bridge Balance — RAG chat, product catalog, auth.",
        docs_url="/docs" if not settings.is_production else None,
        redoc_url=None,
    )
```

Routers (`main.py:27-31`): `health.router` (no prefix, `tags=["health"]`), `chat.router` (`/chat`, `tags=["chat"]`), `personalize.router` (`/personalize`), `translate.router` (`/translate`), `llm_router.router` (`/llm`, `tags=["llm"]`).
Middleware: **none** — no `add_middleware` call anywhere. CORS: **NOT FOUND** (grep for `middleware|CORS|allow_origins` over `edu-site/api/**/*.py`: no match; no `allow_origins`/`allow_methods`/`allow_headers`/`allow_credentials` exist to quote).
Exception handlers: **NONE** (no `@app.exception_handler`, no `add_exception_handler`). Lifespan/startup: **none** (no `lifespan=`, no `on_event`). `app = create_app()` at module level; `settings` is module-global (`main.py:13`).

### B3. `app/config.py` — IN FULL

```python
class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # App
    app_env: AppEnv = AppEnv.development
    app_port: int = 8000
    app_log_level: str = "info"

    # Database
    database_url: str | None = None  # required only when Phase B+ ships

    # Vector search
    qdrant_url: str | None = None
    qdrant_api_key: SecretStr | None = None
    qdrant_collection: str = "bridge_balance_chapters"

    # LLM
    llm_provider: LLMProvider = LLMProvider.none
    groq_api_key: SecretStr | None = None
    gemini_api_key: SecretStr | None = None
    together_api_key: SecretStr | None = None
    deepseek_api_key: SecretStr | None = None
    openai_api_key: SecretStr | None = None
    ollama_base_url: str = "http://localhost:11434"

    # Embeddings
    embedding_provider: EmbeddingProvider = EmbeddingProvider.none
    embedding_model: str = "sentence-transformers/all-MiniLM-L6-v2"

    # Auth (Phase B)
    better_auth_secret: SecretStr | None = None
    better_auth_url: str = "http://localhost:8000"

    # Payments / storage / email (Phase C) — all optional, ignored until phase
    stripe_secret_key: SecretStr | None = None
    stripe_webhook_secret: SecretStr | None = None
    cloudflare_r2_access_key: SecretStr | None = None
    cloudflare_r2_secret_key: SecretStr | None = None
    cloudflare_r2_bucket: str | None = None
    resend_api_key: SecretStr | None = None
    inngest_event_key: SecretStr | None = None
    inngest_signing_key: SecretStr | None = None
```

(`config.py:47-93`; properties `llm_configured` `:96-110` and `is_production` `:112-114`; singleton `_settings` `:117`, cached `get_settings()` `:120`, `reset_settings_cache()` `:131`.)
Env-var names: field name upper-cased, **no `env_prefix`**, `case_sensitive=False`, `extra="ignore"`, `.env` file. There is no `alias` on any field. Note there is **no** `command_code_api_key` / `COMMAND_CODE_*` field — the decided model path has no settings home.
Enums: `AppEnv` (development/staging/production), `LLMProvider` (none/groq/gemini/together/ollama/deepseek/openai), `EmbeddingProvider` (none/huggingface/openai/gemini).

### B4. `.env.example` and secrets

Variables with their comments: `APP_ENV=development`, `APP_PORT=8000`, `APP_LOG_LEVEL=info`; `DATABASE_URL=` (`# Format: postgresql+asyncpg://<user>:<password>@<host>/<db>?sslmode=require`); `QDRANT_URL=`, `QDRANT_API_KEY=`, `QDRANT_COLLECTION=bridge_balance_chapters`; `LLM_PROVIDER=none` (`.env.example:21`, comment: `# Allowed values: none | groq | gemini | together | ollama | deepseek | openai`, `# Default "none" refuses to start the LLM stack and points to docs/llm-providers.md.`); `GROQ_API_KEY=`, `GEMINI_API_KEY=`, `TOGETHER_API_KEY=`, `DEEPSEEK_API_KEY=`, `OPENAI_API_KEY=` (`# only if you change LLM_PROVIDER=openai`), `OLLAMA_BASE_URL=http://localhost:11434`; `EMBEDDING_PROVIDER=none`, `EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2`; `BETTER_AUTH_SECRET=`, `BETTER_AUTH_URL=http://localhost:8000`; `STRIPE_SECRET_KEY=`, `STRIPE_WEBHOOK_SECRET=`, `CLOUDFLARE_R2_ACCESS_KEY=`, `CLOUDFLARE_R2_SECRET_KEY=`, `CLOUDFLARE_R2_BUCKET=`, `RESEND_API_KEY=`, `INNGEST_EVENT_KEY=`, `INNGEST_SIGNING_KEY=` (all empty placeholders).
`edu-site/api/.env`: **does not exist** (`Test-Path` → `False`; only `.env.example` is present). So no live secret values exist in that directory; no `[redacted]` needed.
Git ignore: `C:\Users\Dell\Desktop\Book\.gitignore:42` `.env` (inside the `# ─── Environment / secrets ───` block, `:41-48`, which negates `!.env.example` at `:48`). No `.gitignore` exists in `edu-site/` or `edu-site/api/` (both `Test-Path` → `False`), so the root file is the only rule.

### B5. `app/llm/` — IN FULL

`base.py` — the interface and every type:

```python
@dataclass(slots=True)
class LLMMessage:
    role: str  # "system" | "user" | "assistant"
    content: str


@dataclass(slots=True)
class LLMRequest:
    messages: list[LLMMessage]
    model: str | None = None
    temperature: float = 0.7
    max_tokens: int = 1024
    metadata: dict[str, str] = field(default_factory=dict)


@dataclass(slots=True)
class LLMResponse:
    text: str
    model: str
    provider: str
    input_tokens: int = 0
    output_tokens: int = 0
    raw: dict | None = None


class LLMNotConfiguredError(RuntimeError):
    """Raised when LLM_PROVIDER=none or the provider's credential is missing.

    Routers map this to HTTP 503 with a link to the provider documentation.
    """

    def __init__(self, hint: str | None = None):
        msg = (
            "LLM provider is not configured. Set LLM_PROVIDER and the matching "
            "credential in .env (see docs/llm-providers.md). "
            f"Hint: {hint}" if hint else
            "LLM provider is not configured. Set LLM_PROVIDER and the matching "
            "credential in .env (see docs/llm-providers.md)."
        )
        super().__init__(msg)
        self.hint = hint


class LLMClient(ABC):
    """Abstract LLM client. Implementations live in `app.llm.providers.*`."""

    provider_name: str = "abstract"

    @abstractmethod
    async def generate(self, request: LLMRequest) -> LLMResponse:
        """Generate a single completion. May raise LLMNotConfiguredError."""
        raise NotImplementedError

    async def health_check(self) -> bool:
        """Optional. Default: True if `generate` can theoretically run."""
        return True
```

**Every method is async.** There is **no streaming method** — the docstring at `base.py:5` says `Streaming, tool-calling, and structured outputs are added as separate optional methods in Phase B`.

`registry.py` — in full:

```python
@lru_cache(maxsize=1)
def get_llm_client() -> LLMClient:
    """Return the active LLM client. Cached per process.

    Provider SDKs are imported lazily so that, e.g., a deployment that sets
    `LLM_PROVIDER=groq` does not require `google-genai` to be installed.
    """
    settings = get_settings()
    return _build(settings)


def _build(settings: Settings) -> LLMClient:
    from app.llm.providers.none import NoneClient
    from app.llm.providers.groq import GroqClient
    from app.llm.providers.gemini import GeminiClient
    from app.llm.providers.together import TogetherClient
    from app.llm.providers.ollama import OllamaClient
    from app.llm.providers.deepseek import DeepSeekClient
    from app.llm.providers.openai import OpenAIClient

    registry: dict[LLMProvider, type[LLMClient]] = {
        LLMProvider.none: NoneClient,
        LLMProvider.groq: GroqClient,
        LLMProvider.gemini: GeminiClient,
        LLMProvider.together: TogetherClient,
        LLMProvider.ollama: OllamaClient,
        LLMProvider.deepseek: DeepSeekClient,
        LLMProvider.openai: OpenAIClient,
    }
    provider_cls = registry[settings.llm_provider]
    return provider_cls(settings)
```

Custom exceptions: exactly one, `LLMNotConfiguredError`. **Where it becomes an HTTP status: nowhere.** The 503 mapping is only asserted in prose — `config.py:33-38` (`chat/translation/personalization call returns 503 with a link to the provider documentation`), `base.py:41-46`, `llm/__init__.py:9-11`, `providers/none.py:20-24`. No `exception_handler`, no `try/except` in any router (grep for `except ` in `app/**/*.py`: no matches). A raised `LLMNotConfiguredError` today would therefore surface as an unhandled 500.

| Provider file | Class | SDK lazily imported? | Settings read | Streams? |
|---|---|---|---|---|
| `none.py:13` | `NoneClient` | none | none (stores `settings`) | No — raises `LLMNotConfiguredError`; `health_check()` returns `True` |
| `groq.py:17` | `GroqClient` | No — comment only: `# SDK import deferred: \`from groq import AsyncGroq\`` (`:25`), `self._client = None` | `groq_api_key` | No — `raise NotImplementedError("GroqClient.generate wired in Phase B")` (`:29`) |
| `gemini.py:16` | `GeminiClient` | No | `gemini_api_key` | No, same pattern (`:25`) |
| `together.py:15` | `TogetherClient` | No | `together_api_key` | No (`:22`) |
| `ollama.py:15` | `OllamaClient` | No — `# httpx.AsyncClient, created lazily in Phase B` | `ollama_base_url`; never raises `LLMNotConfiguredError` | No (`:23`) |
| `deepseek.py:15` | `DeepSeekClient` | No | `deepseek_api_key` | No (`:23`) |
| `openai.py:18` | `OpenAIClient` | No | `openai_api_key` | No (`:27`) |

No `CommandCodeClient`/`commandcode` provider exists (grep for `commandcode|command_code|COMMAND_CODE` in `edu-site/api`: no matches).

### B6. Routers

`chat.py` route: `@router.post("", response_model=ChatResponse)` on `APIRouter(prefix="/chat", tags=["chat"])` → `POST /chat` (`chat.py:12, 33`).

```python
class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=4000)
    selected_text: str | None = Field(default=None, max_length=4000)
    conversation_id: str | None = None


class ChatCitation(BaseModel):
    chapter_slug: str
    section_heading: str
    excerpt: str


class ChatResponse(BaseModel):
    answer: str
    citations: list[ChatCitation] = []
    conversation_id: str
```

`chat.py:15-30`. No validators, no `ChatMode` field, no `model`/`provider`/`usage`/`stream` field; `citations` is a mutable default list; `conversation_id` is `str` on the response but `str | None` on the request. Handler body (`chat.py:33-42`):

```python
@router.post("", response_model=ChatResponse)
async def chat(req: ChatRequest) -> ChatResponse:
    raise HTTPException(
        status_code=501,
        detail=(
            "RAG chat wires up in Phase B. "
            "Need: Qdrant collection populated, LLM provider configured, "
            "embedding provider configured."
        ),
    )
```

`personalize.py`: `POST /personalize` (`personalize.py:13, 20`), models `PersonalizeRequest{chapter_slug: str, profile: dict}`, `PersonalizeResponse{chapter_slug, content_md, model}`, raises 501 (`:27`).
