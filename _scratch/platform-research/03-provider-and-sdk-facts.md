# JOB 4 — Provider and SDK verification

**Scope note.** READ-ONLY honoured: no file created, edited, moved or deleted; no commands run. 12 pages fetched: Command Code docs (provider, plans/goat, pricing-limits, usage-limits, terms), PyPI JSON for `openai-agents`, four `openai.github.io/openai-agents-python` pages (models, streaming, tracing, guardrails, running_agents, sessions — six actually), FastAPI custom-response, MDN Using readable streams. Local CLI source strings could **not** be read (see 1.7).

---

## PART 1 — Command Code (commandcode.ai) as an API provider

### 1.1 HTTP API for your own app — VERIFIED (yes)

Source: https://commandcode.ai/docs/provider — *"Every top model, one API. Call Command Code's models from any OpenAI- or Anthropic-compatible client."*

| Endpoint | Method | Format |
|---|---|---|
| `https://api.commandcode.ai/provider/v1/chat/completions` | POST | OpenAI Chat Completions |
| `https://api.commandcode.ai/provider/v1/responses` | POST | OpenAI Responses |
| `https://api.commandcode.ai/provider/v1/messages` | POST | Anthropic Messages |
| `https://api.commandcode.ai/provider/v1/models` | GET | Models list |
| `https://api.commandcode.ai/provider/v1/systemone` | POST | `typesafe/jev` only |

- Base URL to point a client at: `https://api.commandcode.ai/provider/v1` — *"Point any OpenAI or Anthropic compatible client at … and send your first request."*
- Auth: `Authorization: Bearer <CMD_API_KEY>` on any route; `x-api-key: <token>` for the Anthropic SDK on `/messages` — *"pass `Authorization: Bearer <token>` (any route) or `x-api-key: <token>` (Anthropic SDK on `/messages`)"*.
- Key source: *"The same key authenticates the CLI and the API"*, created at `https://commandcode.ai/settings/keys` (Studio).
- Access gate: *"Every plan except the Go plan has API access"* — GOAT, Pro, Max, Team, Provider.
- **Key prefix `user_...`: NOT FOUND** in any page I read (docs never state a prefix; `…/docs/studio#api-keys` not fetched).
- Wrong-wire requests: Claude on `/chat/completions`, or non-Anthropic on `/messages`, return 400 — *"Send a Claude model to `/chat/completions` or `/responses` and you get a 400 pointing you to `/messages`, and the reverse."*
- Body limits: *"Text and images. Audio, file, and document parts are rejected by the schema."*
- `/responses` rejects remote MCP: *"Remote `type: \"mcp\"` tools are rejected, because the upstream would dial your server on our credential."*

### 1.2 Model ids

- **`deepseek/deepseek-v4.1-flash`** — VERIFIED as the catalog id (local bundled reference `…/command-code/dist/bundled/command-code-knowledge/reference/models.md`: `| \`deepseek/deepseek-v4.1-flash\` | DeepSeek V4.1 Flash | 1M | low, high, max | $0.15/$0.6 · cache $0.003 |`). It matches the CLI id in your brief character-for-character. On the wire, the docs' API examples use the same namespaced form (`"model": "deepseek/deepseek-v4-flash"`), so `deepseek/deepseek-v4.1-flash` on `/chat/completions` is **INFERRED** — the only authoritative check is `GET /provider/v1/models`, which carries *"a `supported_endpoints` field with the routes that serve it"* (not fetched; no key available).
- Context window **1M** VERIFIED (models.md, and the GOAT table row "DeepSeek V4.1 Flash | 1M").
- **Max output tokens: NOT FOUND** (no `maxOutput` figure in models.md or any fetched page).
- Other GOAT model ids (VERIFIED, https://commandcode.ai/docs/plans/goat): `deepseek/deepseek-v4-pro`, `deepseek/deepseek-v4-flash`, `deepseek/deepseek-v4-flash-fast`, `moonshotai/Kimi-K3`, `z-ai/glm-5.3-flash`, `zai-org/GLM-5.3`, `MiniMaxAI/MiniMax-M3`, `Qwen/Qwen3.8-Max`, `Qwen/Qwen3.8-Flash`, `xiaomi/mimo-v2.6-flash`, `meta/muse-spark-1.3`, `xai/grok-4.7`, `google/gemini-3.8-flash`, `gpt-5.6-sol`, `gpt-5.6-luna`, `gpt-6-luna`. The page header reads *"GOAT plan 59"*.

### 1.3 GOAT plan — VERIFIED

Source: https://commandcode.ai/docs/plans/goat and https://commandcode.ai/docs/resources/usage-limits

| Item | Value | Quote |
|---|---|---|
| Price | **$10/month** | *"unlimited coding on 30+ top open and closed models for **$10/month**"* |
| Credits | **$70/month** (7×) | *"Your $10 buys **$70 of credits**"* |
| 5-hour limit | **$14** | *"5-hour limit - $14 of usage"* |
| Weekly limit | **$35** | *"Weekly limit - $35 of usage"* |
| Monthly limit | **$70** | *"Monthly limit - $70 of usage"* |
| V4.1 Flash allowance (GOAT) | **$60**, boosted through Sep 28 2026 | *"$60 on the $10 GOAT plan, up from $40"* |
| Effective requests, V4.1 Flash | 30,800 / 5h · 76,900 / week · 154,000 / month | usage-estimate table |

- Windows **roll from first use**: *"A window **opens on your first request** and **resets exactly 5 hours (or 7 days) later**."*
- Overage: *"Past a limit, requests fall back to those credits - and without them, paid models pause until the window or cycle resets while the free models keep working."* Also *"Once your included credits reach zero, requests stop until your subscription renews or you add credits."* Top-up credits *"are never throttled"* and are spent first when over a window.
- **Per-minute/hour/day request limits: NOT FOUND.** The only API-availability claim is *"rate limits built for production, not demos."*
- **Concurrency limits: NOT FOUND.**
- Cost note: DeepSeek V4 rates vary by hour — *"**Peak** - 01:00-04:00 and 06:00-10:00 UTC. 7 hours a day. Full price."*; V4.1 Flash shows $0.15/$0.60 off-peak, $0.30/$1.20 peak, weekends all off-peak.
- Provider (pay-as-you-go) alternative: *"$15/month + $1.01 card processing fee"*, *"Start with $15 of API credit"*, *"Credits never expire"*, and *"Provider plan is pay as you go, and has no usage windows/limits."*

### 1.4 API capabilities

| Capability | Status | Evidence |
|---|---|---|
| Streaming | **VERIFIED** | *"Streaming is supported and can be received by setting `stream: true`."* |
| `stream_options.include_usage` | **VERIFIED as accepted; not required** | Example body includes `"stream_options": {"include_usage": true}`; usage text: *"Every endpoint emits token usage at the end of every stream. Chat Completions clients see a final `usage` chunk. … No opt-in required."* |
| Tool/function calling | **VERIFIED (Responses route)** | *"Tool arrays pass through as you send them. `function` and `custom` tools are executed by your client"* |
| `tool_choice`, parallel tool calls | **UNVERIFIED** — never named |
| `response_format` / JSON mode | **NOT FOUND** |
| Reasoning controls (`reasoning_effort` etc.) | **NOT FOUND** on the API. CLI-side only: `--effort` (`low`,`medium`,`high`,…); catalog lists efforts `low, high, max` for V4.1 Flash |
| Reasoning text returned (`reasoning_content`) / echo-back | **NOT FOUND** |
| Context window | **VERIFIED 1M** |
| Max output tokens | **NOT FOUND** |

### 1.5 Terms / acceptable use — VERIFIED (quotes)

Source: https://commandcode.ai/terms (last updated September 20 2026)

- **Third-party benefit / service-bureau prohibition (the decisive clause for a student-facing app):** Usage Restrictions — *"Use the services for time sharing or service bureau purposes or for the benefit of a third party."* and *"Sublicense, resell, rent, lease, transfer, or assign the services to any third party."*
- Acceptable Use — *"You may not rent, lease, sell, or transfer access to the Company's website, software, or documentation to a third party."*
- **Reseller ban:** pricing-limits FAQ — *"Command Code subscriptions are only sold directly through commandcode.ai. We do not authorize any resellers or third-party sellers."*
- **One account per person:** *"Each individual is permitted to create and maintain only one (1) account."*; violation may result in *"permanently and irrevocably ban you from the Service on a lifetime basis"*.
- **Bots/scripts:** *"Automated tools, such as bots or scripts, must not be used to create multiple accounts, perform automated searches or requests, or extract data from the Company's website."*
- **Load:** *"You must not interfere with or disrupt the services or impose an undue burden on the Company's website or related networks."*
- **Age:** *"The service is intended for individuals who are at least eighteen (18) years old."* — a direct conflict with school-age students.
- **Training:** *"We do not train our own AI models on your Materials, do not sell them, and do not make them available to other users unless you share them at your direction."*
- **Retention (third-party controlled):** *"Your Inputs are subject to the retention policies of the third-party AI model providers that process them, which we do not control."*
- **ZDR opt-in:** *"Send the header `x-cmd-zdr: 1` on any request to enforce zero data retention and no prompt training"*; if a model has no ZDR upstream the request **fails with 422** (`cmd_zdr_no_providers`) *"rather than falling back to a non-ZDR provider."*
- **Data location:** *"Open-source models are available globally with infrastructure in the US, EU, and Singapore"*; commercial models are *"hosted by Anthropic, OpenAI, Google, and Azure on their respective US-based infrastructure (EU on demand)."*
- **Indemnity:** you *"agree to defend, indemnify, and hold harmless the Company … arising from: (a) your use of and access to the service"* — relevant if third parties use your key.

### 1.6 Error formats — VERIFIED (https://commandcode.ai/docs/provider#errors)

OpenAI envelope: `{"error": {"message": …, "type": "invalid_request_error" | "authentication_error" | "permission_error" | "rate_limit_error" | "server_error", "code": …, "param": …}}`; Anthropic envelope uses `"type": "error"` with `api_error` instead of `server_error`.

| Status | Code/Type | When (quoted) |
|---|---|---|
| 400 | `unsupported_model` | *"Model isn't in the catalog"* |
| 400 | `invalid_request_error` | *"Wrong endpoint for the model … bad request body, or malformed JSON."* |
| 401 | `authentication_error` | *"Missing or invalid auth"* |
| 403 | `upgrade_required` | *"You're on the Go plan, the only plan without API access."* |
| 422 | `cmd_zdr_no_providers` | *"`x-cmd-zdr: 1` was set but the model has no zero-data-retention upstream."* |
| 429 | `rate_limit_error` | *"Rate-limited by the upstream. Retry with backoff."* |
| 5xx | `server_error` / `api_error` | *"Upstream failure. The body carries the upstream provider's error message."* |

**402 / quota-exhausted status: NOT FOUND. `Retry-After` or rate-limit headers: NOT FOUND** — the docs say only "Retry with backoff".

### 1.7 Local CLI evidence — **SKIPPED (blocked, not attempted covertly)**

Reading under `C:\Users\Dell\AppData\Roaming\npm\node_modules\command-code\` was **permission-denied**: `read_directory`, `glob`, and `read_file` on `package.json`/`README.md` were all refused with *"is outside workspace (allowed: C:\Users\Dell\Desktop\Book)"*. Only the skill's own bundled reference directory was readable. From it (`…/dist/bundled/command-code-knowledge/reference/byok.md`, `…/headless.md`, `…/models.md`, `…/plans.md`), file-level (tool output carried no line numbers):

- BYOK is the **reverse** direction — third-party endpoints into the CLI: *"Any OpenAI or Anthropic compactible API can serve models in Command Code."* Nothing there documents Command Code's own inbound URL.
- CLI plan/billing reads are deliberately not local: *"The plan itself is not readable headlessly — ask the user or point them at /usage."*
- **The CLI's internal endpoint is NOT documented in any file I could read**, and I could not grep `dist` strings. The only documented-for-users base URL is `https://api.commandcode.ai/provider/v1`. Do not assume an undocumented CLI-internal URL is usable by third-party apps — treat it as **UNVERIFIED**.

---

## PART 2 — OpenAI Agents SDK (Python)

### 2.1 Package — VERIFIED (https://pypi.org/pypi/openai-agents/json)

- Name `openai-agents`; **latest stable `0.22.3`** (`"version":"0.22.3"`, `release_url: …/0.22.3/`).
- **Release date: NOT FOUND** — the JSON response was truncated at release `0.16.1` (alphabetical ordering), so `0.22.3`'s `upload_time` was not visible.
- **Python requirement `>=3.10`** (`"requires_python":">=3.10"`; README: *"Python 3.10 or newer required"*).
- **License MIT** (`"license_expression":"MIT"`, *"License :: OSI Approved :: MIT License"*).
- Core deps: `openai>=3.0.0,<4`, `pydantic>=2.12.2,<3`, `starlette>=1.3.1`, `mcp>=1.19.0,<3`.

### 2.2 Non-OpenAI / OpenAI-compatible provider — VERIFIED

Official snippet (https://openai.github.io/openai-agents-python/models/):

```python
from agents import Agent, AsyncOpenAI, OpenAIChatCompletionsModel, set_tracing_disabled
set_tracing_disabled(disabled=True)
client = AsyncOpenAI(api_key="Api_Key", base_url="Base URL of Provider")
model = OpenAIChatCompletionsModel(model="Model_Name", openai_client=client)
agent= Agent(name="Helping Agent", instructions="You are a Helping Agent", model=model)
```
> *"In these examples, we use the Chat Completions API/model, because many LLM providers still do not support the Responses API."*

- `set_default_openai_client` — *"useful in cases where you want to globally use an instance of `AsyncOpenAI` as the LLM client … you can set the `base_url` and `api_key`."*
- `set_default_openai_api("chat_completions")` — *"This works if you are setting `OPENAI_API_KEY` and `OPENAI_BASE_URL` via environment vars."*
- **Recommended for a Chat-Completions-only provider: `OpenAIChatCompletionsModel`** (option 2 of the 404 fix; `set_default_openai_api` only helps with the env-var path). `LitellmModel` is *"best-effort, beta"* and requires `openai-agents[litellm]`; `AnyLLMModel` likewise beta.

### 2.3 Tracing — VERIFIED (https://openai.github.io/openai-agents-python/tracing/)

- Default: **on, exported to OpenAI** — *"Tracing is enabled by default."*; failure mode: *"this is because traces are uploaded to OpenAI servers, and you don't have an OpenAI API key."*
- Three documented off-switches: `OPENAI_AGENTS_DISABLE_TRACING=1`; `set_tracing_disabled(True)`; `RunConfig(tracing_disabled=True)`.
- Per-run tracing key alternative: `set_tracing_export_api_key(...)` / `RunConfig(tracing={"api_key": "sk-tracing-123"})`.
- *"Tracing is unavailable for organizations that use OpenAI's APIs under a Zero Data Retention (ZDR) policy."*
- Sensitive payloads: `trace_include_sensitive_data` *"By default … is `True`"*, env `OPENAI_AGENTS_TRACE_INCLUDE_SENSITIVE_DATA`.

### 2.4 Streaming — VERIFIED (https://openai.github.io/openai-agents-python/streaming/)

```python
import asyncio
from openai.types.responses import ResponseTextDeltaEvent
from agents import Agent, Runner

async def main():
    agent = Agent(name="Joker", instructions="You are a helpful assistant.")
    result = Runner.run_streamed(agent, input="Please tell me 5 jokes.")
    async for event in result.stream_events():
        if event.type == "raw_response_event" and isinstance(event.data, ResponseTextDeltaEvent):
            print(event.data.delta, end="", flush=True)
```
- Text deltas arrive on `RawResponsesStreamEvent`/`ResponseTextDeltaEvent` (field `event.data.delta`); `RunItemStreamEvent` and `AgentUpdatedStreamEvent` are the higher-level events.
- Stream isn't done until the iterator ends — *"A streaming run is not complete until the iterator ends, and post-processing such as session persistence, approval bookkeeping, or history compaction can finish after the last visible token arrives."*
- Cancellation: `result.cancel()` or `result.cancel(mode="after_turn")`.
- **`result.context_wrapper.usage`: NOT FOUND** in the pages I read (a `Usage` doc is linked but not fetched).
- `ModelSettings(include_usage=True)`: **VERIFIED only for adapter paths** — LiteLLM *"Some providers accessed through the LiteLLM adapter do not populate SDK usage metrics by default. If you need usage reporting, pass `ModelSettings(include_usage=True)`…"*; Any-LLM *"streamed Chat Completions backends may require `ModelSettings(include_usage=True)` before they emit usage chunks."*

### 2.5 Guardrails — VERIFIED

- Two kinds: *"Input guardrails run on the initial user input / Output guardrails run on the final agent output"*; agent fields `input_guardrails=[...]` / `output_guardrails=[...]`.
- Scope: *"**Input guardrails** run only for the first agent in the chain. **Output guardrails** run only for the agent that produces the final output."*
- Parallel by default: *"**Parallel execution** (default, `run_in_parallel=True`): The guardrail runs concurrently with the agent's execution."* Blocking: `run_in_parallel=False` *"runs and completes *before* the agent starts"*. Output guardrails *"don't support the `run_in_parallel` parameter."*
- Tripwires: *"the runner immediately raises an `InputGuardrailTripwireTriggered` or `OutputGuardrailTripwireTriggered` exception and halts agent execution."*
- **Extra model call: yes if implemented as an LLM check** — the official example uses *"We'll use this agent in the guardrail function"* (`Runner.run(guardrail_agent, input, context=ctx.context)`), i.e. one extra model call per guardrail per run. Cost is not hidden by the SDK.

### 2.6 Conversation memory — VERIFIED

- **Sessions:** *"The Agents SDK provides built-in session memory to automatically maintain conversation history across multiple agent runs, eliminating the need to manually handle `.to_input_list()` between turns."* Implementations: `SQLiteSession`, `AsyncSQLiteSession`, `RedisSession`, `SQLAlchemySession`, `MongoDBSession`, `DaprSession`, `OpenAIConversationsSession`, `OpenAIResponsesCompactionSession`, `AdvancedSQLiteSession`, `EncryptedSession`.
  ```python
  from agents import Agent, Runner, SQLiteSession
  session = SQLiteSession("conversation_123")
  result = await Runner.run(agent, "What city is the Golden Gate Bridge in?", session=session)
  ```
- **Manual:** *"`result.to_input_list()` + `[{\"role\": \"user\", \"content\": \"What state is it in?\"}]`"* — *"new_input = result.to_input_list() + [{"role": "user", "content": "What state is it in?"}]"*.
- Constraint: *"In the same run, a session cannot be combined with the run-level continuation options `conversation_id`, `previous_response_id`, or `auto_previous_response_id`."*
- Trimming: `SessionSettings(limit=N)`; merge control via `RunConfig.session_input_callback`.

### 2.7 ModelSettings — VERIFIED where quoted

| Field | Status |
|---|---|
| `temperature` | VERIFIED — `ModelSettings(temperature=0.1)` |
| `top_p` | VERIFIED — *"you can set a global `temperature` or `top_p`"* |
| `parallel_tool_calls` | VERIFIED — *"Allow or forbid multiple tool calls in the same turn."* |
| `reasoning` | VERIFIED — `ModelSettings(reasoning=Reasoning(effort="high"))` |
| `extra_args` | VERIFIED — *"Use `extra_args` when you need provider-specific or newer request fields"* |
| `include_usage` | Partially VERIFIED (adapter paths only, see 2.4) |
| `tool_choice` | Partially VERIFIED — `ModelSettings(tool_choice="computer")` appears; ordinary function tool_choice semantics not restated |
| `timeout` | VERIFIED — `ModelSettings(timeout=30.0)` |
| `extra_body` | VERIFIED as existing — *"`ModelSettings.extra_body` remains a nested `extra_body` argument"* (Any-LLM path) |
| `max_tokens` | **NOT FOUND** in fetched pages |

### 2.8 Exceptions — VERIFIED (https://openai.github.io/openai-agents-python/running_agents/#exceptions)

`AgentsException` (*"the base class for all exceptions that the SDK raises"*), `MaxTurnsExceeded` (raised when the run exceeds `max_turns`; *"Set `max_turns=None` to disable the limit."*), `ModelTimeoutError`, `ModelBehaviorError` (malformed JSON, unexpected tool failures, failed/incomplete Responses), `ToolTimeoutError`, `UserError`, `InputGuardrailTripwireTriggered`, `OutputGuardrailTripwireTriggered`. Also `ModelRefusalError` (via `error_handlers={"model_refusal": …}`) and handler keys `"max_turns"`, `"model_refusal"`, `"invalid_final_output"`.
**Default `max_turns` value: NOT FOUND** — the page documents the parameter and `max_turns=None`, never a default number (command-code's headless default 100 is a different product; do not conflate).

### 2.9 Non-OpenAI quirks through Chat Completions — VERIFIED (models page)

- Silent field dropping: *"the SDK preserves compatibility by silently dropping Responses-only fields that Chat Completions cannot send, such as `previous_response_id`, `conversation_id`, the Responses API `prompt` field, or tool outputs that are not text-only."* Opt into hard failure with `OpenAIProvider(use_responses=False, strict_feature_validation=True)`.
- Structured outputs: *"`BadRequestError: Error code: 400 - {'error': {'message': \"'response_format.type' : value is not one of the allowed values ['text','json_object']\"…"* — *"This is a shortcoming of some model providers - they support JSON outputs, but don't allow you to specify the `json_schema`"*.
- Tool-call streaming: *"Some OpenAI-compatible Chat Completions providers stream tool-call deltas in chunks that are not reliable enough for incremental SDK processing."* → `buffer_streamed_tool_calls=True`.
- Truncation: *"If a streaming or non-streaming Chat Completions response ends with `finish_reason=\"length\"` before producing assistant text … the adapter raises `ModelBehaviorError`."*
- Audio: `AgentsException("Audio is not currently supported")`.
- **`reasoning_content`: NOT FOUND.** **Specific GitHub issues citing DeepSeek: NOT FOUND** — I did not fetch GitHub (page budget exhausted); verify separately before relying on any issue number.

### 2.10 Dynamic instructions + typed run context — **NOT FOUND**

I did not fetch the Agents page, so I cannot quote the `instructions` -as-callable pattern. Closest verified evidence that the context type exists and is threaded through: guardrail signatures `async def math_guardrail(ctx: RunContextWrapper[None], agent: Agent, input: str | list[TResponseInputItem])` (guardrails page) and custom-session signatures using `wrapper: RunContextWrapper[Any] | None = None` (sessions page). Treat the dynamic-instructions pattern as **UNVERIFIED** until the Agents/Context page is read.

---

## PART 3 — Serving to a browser

### 3.1 FastAPI streaming — VERIFIED where quoted (https://fastapi.tiangolo.com/advanced/custom-response/)

- *"**`StreamingResponse`** — Takes an async generator or a normal generator/iterator (a function with `yield`) and streams the response body."*
  ```python
  import anyio
  from fastapi import FastAPI
  from fastapi.responses import StreamingResponse

  async def fake_video_streamer():
      for i in range(10):
          yield b"some fake video bytes"
          await anyio.sleep(0)

  @app.get("/")
  async def main():
      return StreamingResponse(fake_video_streamer())
  ```
- **Client disconnect / cancellation:** *"An `async` task can only be cancelled when it reaches an `await`. If there is no `await`, the generator … can not be cancelled properly and may keep running even after cancellation is requested."* — hence the `await anyio.sleep(0)`; cancellation of the generator is how the request abort propagates.
- The docs' own recommendation: *"Instead of returning a `StreamingResponse` directly, you should probably follow the style in Stream Data, it's much more convenient and handles cancellation behind the scenes for you."* (the Stream Data page was not fetched).
- **`media_type="text/event-stream"`: NOT FOUND** on that page (only `media_type` generally, e.g. `Response(content=data, media_type="application/xml")`). `Response` accepts *"`media_type` - A `str` giving the media type"*.
- **`sse-starlette`: NOT FOUND** (no mention in FastAPI's custom-response docs).
- **Anti-proxy-buffering headers (`X-Accel-Buffering`, `Cache-Control: no-cache`): NOT FOUND.** `request.is_disconnected()`: **NOT FOUND** in the fetched page.

### 3.2 Browser consumption — VERIFIED (https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams)

- *"The `Request.body` and `Response.body` properties are available, which are getters exposing the body contents as a readable stream."*
- Reader pattern: *"Fetch the original image … `.then((response) => { const reader = response.body.getReader(); …`"*, then `reader.read()` resolving `{ done, value }` — *"If a chunk is available to read, the promise will be fulfilled with an object of the form `{ value: theChunk, done: false }`."*
- Simpler async-iteration form: *"There is another even simpler way to consume a `fetch()`, which is to iterate the returned `response.body` using the `for await...of` syntax."*
- Cancellation: *"If you want to stop iterating the stream you can cancel the `fetch()` operation using an `AbortController` and its associated `AbortSignal`."*
- **`TextDecoder` / explicit SSE frame parsing: NOT FOUND** on this page (only `TextEncoder` is named, in a `Uint8Array` note). **"EventSource is GET-only": NOT FOUND** — I did not fetch the EventSource page; do not assert it without a source.

---

## Implications for the build

- **Do not ship your student app on a GOAT key.** ToS forbids *"time sharing or service bureau purposes or for the benefit of a third party"* and resale/transfer; that is the exact shape of a public multi-user app powered by one plan key (1.5).
- **Also blocked by 18+ eligibility** — *"The service is intended for individuals who are at least eighteen (18) years old"* — if the students are minors (1.5).
- **If you proceed commercially, use the Provider plan** ($15/mo, pay-as-you-go, *"no usage windows/limits"*), not a coding plan, and expect real per-token cost (1.1, 1.3).
- **Endpoint to code against: `https://api.commandcode.ai/provider/v1`** with `/chat/completions` + `Authorization: Bearer`; keep an Anthropic `/messages` path only if you switch models (1.1).
- **Use `OpenAIChatCompletionsModel` + `AsyncOpenAI(base_url=…, api_key=…)`** — it is the SDK's own recommendation for Chat-Completions-only providers; skip `LitellmModel`/Any-LLM unless needed (2.2).
- **Set `set_tracing_disabled(True)` (or `OPENAI_AGENTS_DISABLE_TRACING=1`)** — otherwise prompts upload to OpenAI servers and 401-spam without an OpenAI key (2.3).
- **DeepSeek-class quirks are known and documented:** enable `buffer_streamed_tool_calls=True`, expect no `json_schema` structured outputs, and handle `finish_reason="length"` → `ModelBehaviorError` (2.9).
- **Budget guardrails as extra model calls** and put cheap-model checks in blocking mode (`run_in_parallel=False`) to avoid paying the main model before the tripwire fires (2.5).
- **Stream with `Runner.run_streamed` + `RawResponsesStreamEvent`/`ResponseTextDeltaEvent`**, and keep the request open until the iterator closes — post-processing lags the last token (2.4).
- **Wrap FastAPI streaming in a generator with an `await` per chunk** so client disconnects actually cancel the model call (3.1); the SDK's `result.cancel()` is the upstream half (2.4).
- **Verify before coding:** the wire id `deepseek/deepseek-v4.1-flash` and `supported_endpoints` via `GET /provider/v1/models`; `result.context_wrapper.usage`; the default `max_turns`; `reasoning_content`; and `sse-starlette`/`X-Accel-Buffering` around your ingress (1.2, 2.4, 2.8, 2.9, 3.1).
- **Legal review before launch** of the "many students" scenario — the reseller/AUP FAQ, the indemnity clause, and the third-party-retention sentence are the three passages that decide it (1.5).