# Research — Feature 012: Chatbot Tutor

Live evidence recorded as it is produced (build prompt §0.5, §6). No secrets in this file.
Every result below is copied from real command output, never from memory.

---

## 1. CP0 provider probe (`edu-site/api/scripts/probe_provider.py`) — section 7.3, step 0.5

Status: **pending** (runs after step 0.4 saves the key).

Results to record here, without secrets:

| Probe | Question | Result |
|---|---|---|
| a | `GET /models` — is `deepseek/deepseek-v4.1-flash` listed, and what are its `supported_endpoints`? | pending |
| b | Non-streamed chat completion returns 200 with usage? | pending |
| c | Streaming: do chunks arrive, is there a final usage chunk? | pending |
| d | Tools on chat completions: `tool_calls`, tool result round-trip, `tool_choice: "required"`, streamed deltas vs `buffer_streamed_tool_calls` | pending |
| e | Reasoning: `reasoning_content`, reasoning-effort control, echo-back between tool steps | pending |
| f | `x-cmd-zdr: 1` — 200 or 422 `cmd_zdr_no_providers`? | pending |
| g | Error bodies: wrong key (401), unknown model (400) | pending |
| h | Same path through the Agents SDK: `AsyncOpenAI` → `OpenAIChatCompletionsModel` → `@function_tool` → `Runner.run_streamed`, tracing off | pending |

Decisions this probe settles (build prompt §7.2):
- `LLM_API_STYLE` = `chat_completions` unless (d) or (h) fails on chat completions but works on
  `/responses`, in which case `responses`.
- `LLM_ZDR` = true unless (f) returns 422 `cmd_zdr_no_providers`, in which case false.
- `LLM_REASONING_SUPPORTED` = set from (e).

---

## 2. RESEARCH-1 — web-search provider (§7.7) — due at CP2

Status: **pending**.

---

## 3. RESEARCH-2 — hosting (§7.13) — due at CP2

Status: **pending**.

---

## 4. RESEARCH-3 — embedding A/B, `bge-small-en-v1.5` vs `bge-base-en-v1.5` (§7.6) — due at CP4

Status: **pending**.
