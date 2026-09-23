# Research — Feature 012: Chatbot Tutor

Live evidence recorded as it is produced (build prompt §0.5, §6). No secrets in this file.
Every result below is copied from real command output, never from memory.

---

## 1. CP0 provider probe (`edu-site/api/scripts/probe_provider.py`) — section 7.3, step 0.5

Status: **done** (2026-09-23). Ran `.venv\Scripts\python.exe scripts\probe_provider.py` from
`edu-site/api`; the wrapper reported `EXITCODE=0` and the report ends cleanly with no traceback.
All eight sections produced results, with two qualifications: (d) deliberately records two HTTP
400s (the unsupported `tool_choice` forms), and (i) self-skipped because chat completions worked.
Values below are copied from the run's captured output.

Results to record here, without secrets:

| Probe | Question | Result |
|---|---|---|
| a | `GET /models` — is `deepseek/deepseek-v4.1-flash` listed, and what are its `supported_endpoints`? | Listed. HTTP 200, 80 model ids. `supported_endpoints = ["/chat/completions", "/responses"]` |
| b | Non-streamed chat completion returns 200 with usage? | Yes. HTTP 200, `usage` present: `{"prompt_tokens": 37, "completion_tokens": 26, "total_tokens": 63, "completion_tokens_details": {"reasoning_tokens": 24, ...}}` |
| c | Streaming: do chunks arrive, is there a final usage chunk? | Yes. HTTP 200, 61 chunks, `[DONE]` seen, one final chunk carries `usage` (`"total_tokens": 98`). Delta keys by chunk count: `{"role": 1, "reasoning": 45, "reasoning_details": 45, "content": 14}` — `stream_options.include_usage` was not needed |
| d | Tools on chat completions: `tool_calls`, tool result round-trip, `tool_choice: "required"`, streamed deltas vs `buffer_streamed_tool_calls` | `tool_choice: "auto"` → 200 with 1 `tool_call` (`lookup_glossary`, `{"term": "arbitrage"}`, id present). Tool-result round-trip → 200, final answer present. `tool_choice: "required"` → **400** `Thinking mode does not support this tool_choice` (forced-function form also 400). Streamed tool-call deltas usable: 12 fragments assemble to `{"term": "arbitrage"}`, valid JSON — `buffer_streamed_tool_calls` not needed |
| e | Reasoning: `reasoning_content`, reasoning-effort control, echo-back between tool steps | `reasoning_content` **absent** in every response. The provider returns `reasoning` (`str`, 76–152 chars) plus `reasoning_details` (`list`, 1 item), and `usage.completion_tokens_details.reasoning_tokens` (20–45). `reasoning_effort` `low` and `high` both → HTTP 200, with no meaningful difference in the one captured run (`effort=low` → 35 `reasoning_tokens`, `effort=high` → 34). Echo-back not required: the tool follow-up returned 200 both without and with `reasoning` echoed |
| f | `x-cmd-zdr: 1` — 200 or 422 `cmd_zdr_no_providers`? | **200** — header accepted |
| g | Error bodies: wrong key (401), unknown model (400) | Wrong key → **401** `{"error": {"message": "Invalid 'Authorization' header or token.", "type": "authentication_error", "code": "UNAUTHORIZED"}}`. Unknown model → **400** `{"error": {"message": "Model \"no-such-model/probe-xyz\" is not supported on this endpoint.", "type": "invalid_request_error", "param": "model", "code": "unsupported_model"}}` |
| h | Same path through the Agents SDK: `AsyncOpenAI` → `OpenAIChatCompletionsModel` → `@function_tool` → `Runner.run_streamed`, tracing off | Works. 34 text deltas, 1 tool-call item emitted, `context_wrapper.usage` filled: `requests=2 input_tokens=823 output_tokens=211 total_tokens=1034` |

Decisions this probe settles (build prompt §7.2):
- `LLM_API_STYLE` = **`chat_completions`**. Both (d) and (h) succeed on chat completions, so the
  `/responses` fallback was not exercised — the probe's section (i) recorded
  `SKIPPED - chat completions tools/SDK path succeeded`. One constraint for the tool layer:
  `tool_choice: "required"` returns 400 `Thinking mode does not support this tool_choice`, so
  tool calls must run with `tool_choice: "auto"`.
- `LLM_ZDR` = **true**. (f) returned 200, not 422 `cmd_zdr_no_providers`.
- `LLM_REASONING_SUPPORTED` = **true**, with two caveats: the reasoning text arrives in
  `reasoning` (with `reasoning_details`), NOT in `reasoning_content`, which is absent from every
  response; and `reasoning_effort` `low`/`high` are both accepted (200) but the single captured run
  showed no meaningful difference (35 vs 34 `reasoning_tokens`), so the control's effect is unproven.
- **Budget caution (probe side-finding, affects §7.4).** `reasoning_tokens` are charged against
  `max_tokens`: a call with `max_tokens: 32` returned 34 streamed chunks and **zero** content
  characters, because reasoning consumed the whole budget. The `max_output_tokens` values in §7.4's
  `ModeSpec` table must therefore leave room for reasoning above the visible answer.
- **Tool forcing (affects §7.4).** `tool_choice: "required"` and the forced-function form both return
  400 `Thinking mode does not support this tool_choice`, so §7.4's conditional resolves to its
  fallback branch: the instructions carry the "search the book first" requirement for the `none` and
  `book-aware` modes, rather than a forced tool choice.

---

## 2. RESEARCH-1 — web-search provider (§7.7) — due at CP2

Status: **pending**.

---

## 3. RESEARCH-2 — hosting (§7.13) — due at CP2

Status: **pending**.

---

## 4. RESEARCH-3 — embedding A/B, `bge-small-en-v1.5` vs `bge-base-en-v1.5` (§7.6) — due at CP4

Status: **pending**.
