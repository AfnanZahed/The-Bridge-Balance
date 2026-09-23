"""CP0 provider probe for feature 012 (The Bridge Balance chatbot tutor).

One-off diagnostic, kept in the repo as live evidence for
`specs/012-chatbot-tutor/research.md` section 1. It answers questions (a)-(h)
of that file against the real provider, and only that.

Run from `edu-site/api`:

    .venv\\Scripts\\python.exe scripts\\probe_provider.py

Conventions and safety:

* The key is read from `.env` through a local pydantic-settings class. This
  script deliberately does NOT import `app.config`: `Settings.llm_provider` has
  no `commandcode` member yet, so `Settings()` would raise.
* The key is never printed and the Authorization header is never logged.
  Everything written to stdout passes through `redact()`, which masks
  token-shaped strings as `[REDACTED]`.
* Reasoning text is never printed -- only its presence and length.
* Every section (a)-(h) is independently guarded: a failure in one cannot stop
  the others, and the error text is recorded instead.
* Section (i) tests `/responses` with `OpenAIResponsesModel`, and only runs if
  (d) or (h) actually failed on chat completions.
* Calls are few and small (max_tokens 32-256, no loops).
"""

from __future__ import annotations

import asyncio
import json
import re
import sys
from typing import Any

import httpx
from pydantic import SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_URL = "https://api.commandcode.ai/provider/v1"
MODEL = "deepseek/deepseek-v4.1-flash"
MODELS_URL = f"{BASE_URL}/models"
CHAT_URL = f"{BASE_URL}/chat/completions"
TIMEOUT = 60.0

# The API key is 93 chars and starts with "user_"; 20+ trailing chars keeps the
# pattern tight enough not to swallow ordinary words such as "user_id".
_TOKEN_RE = re.compile(
    r"(?:user_[A-Za-z0-9_\-]{20,}|sk-[A-Za-z0-9_\-]{8,}|Bearer\s+\S+)",
    re.IGNORECASE,
)


class ProbeSettings(BaseSettings):
    """Minimal stand-in for `app.config.Settings` -- see module docstring."""

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    commandcode_api_key: SecretStr
    commandcode_base_url: str = BASE_URL


def redact(value: Any) -> str:
    text = value if isinstance(value, str) else json.dumps(value, default=str)
    return _TOKEN_RE.sub("[REDACTED]", text)


def clip(value: Any, limit: int = 400) -> str:
    text = redact(value)
    if len(text) <= limit:
        return text
    return f"{text[:limit]}...(truncated)"


def body_text(response: httpx.Response) -> str:
    try:
        return clip(response.json())
    except Exception:
        return clip(response.text)


def error_summary(response: httpx.Response) -> str:
    """`status` plus the provider's error code/message, never the key."""
    try:
        payload = response.json()
    except Exception:
        return f"HTTP {response.status_code} body={clip(response.text, 200)}"
    error = payload.get("error") if isinstance(payload, dict) else None
    if isinstance(error, dict):
        code = error.get("code") or error.get("type")
        return (
            f"HTTP {response.status_code} error.code={code} "
            f"error.message={clip(error.get('message', ''), 200)}"
        )
    return f"HTTP {response.status_code} body={clip(payload, 200)}"


def reasoning_summary(message: dict[str, Any]) -> str:
    """Describe reasoning fields by shape only -- never their text."""
    parts = []
    for key in ("reasoning_content", "reasoning", "reasoning_details"):
        if key not in message:
            parts.append(f"{key}=absent")
            continue
        value = message[key]
        if value is None:
            parts.append(f"{key}=null")
        elif isinstance(value, str):
            parts.append(f"{key}=str({len(value)} chars)")
        elif isinstance(value, list):
            parts.append(f"{key}=list({len(value)} items)")
        else:
            parts.append(f"{key}={type(value).__name__}")
    return "; ".join(parts)


def reasoning_tokens(usage: Any) -> str:
    if not isinstance(usage, dict):
        return "n/a"
    details = usage.get("completion_tokens_details") or {}
    return str(details.get("reasoning_tokens", "absent"))


# --------------------------------------------------------------------------- #
# Report plumbing
# --------------------------------------------------------------------------- #

SECTIONS: list[str] = []
RESULTS: dict[str, list[tuple[str, str]]] = {}


def section(name: str) -> None:
    if name not in RESULTS:
        SECTIONS.append(name)
        RESULTS[name] = []


def record(name: str, question: str, answer: Any) -> None:
    section(name)
    RESULTS[name].append((question, redact(answer)))


def print_report() -> None:
    print("")
    print("=" * 72)
    print("CP0 PROVIDER PROBE -- feature 012 (chatbot tutor)")
    print("=" * 72)
    for name in SECTIONS:
        print("")
        print(f"--- {name} " + "-" * max(0, 68 - len(name)))
        for question, answer in RESULTS[name]:
            print(f"  Q: {question}")
            print(f"  R: {answer}")
    print("")
    print("=" * 72)
    print("END OF REPORT")
    print("=" * 72)


async def guarded(name: str, coro_fn, *args) -> None:
    section(name)
    print(f"[running] {name}", file=sys.stderr)
    try:
        await coro_fn(*args)
    except Exception as exc:  # noqa: BLE001 - one section must not kill the rest
        record(name, "SECTION FAILED", f"{type(exc).__name__}: {exc}")


# --------------------------------------------------------------------------- #
# Request helpers
# --------------------------------------------------------------------------- #

GLOSSARY_TOOL: dict[str, Any] = {
    "type": "function",
    "function": {
        "name": "lookup_glossary",
        "description": "Look up a term in the course glossary.",
        "parameters": {
            "type": "object",
            "properties": {
                "term": {"type": "string", "description": "The term to look up."}
            },
            "required": ["term"],
        },
    },
}

TOOL_PROMPT = (
    "You must call lookup_glossary for the term 'arbitrage' before answering. "
    "Then reply with the definition you got."
)

SHARED: dict[str, Any] = {}


async def post_chat(
    client: httpx.AsyncClient, payload: dict[str, Any], headers: dict[str, str] | None = None
) -> httpx.Response:
    return await client.post(CHAT_URL, json=payload, headers=headers or {})


# --------------------------------------------------------------------------- #
# (a) GET /models
# --------------------------------------------------------------------------- #


async def probe_a(client: httpx.AsyncClient) -> None:
    name = "a. GET /models"
    response = await client.get(MODELS_URL)
    record(name, "GET /models status", response.status_code)
    if response.status_code != 200:
        record(name, "error", error_summary(response))
        return
    payload = response.json()
    models = payload.get("data", payload if isinstance(payload, list) else [])
    ids = [m.get("id") for m in models if isinstance(m, dict)]
    record(name, "model ids returned", len(ids))
    match = next((m for m in models if isinstance(m, dict) and m.get("id") == MODEL), None)
    if match is None:
        record(name, f"is '{MODEL}' listed?", "NO")
        record(name, "ids seen (first 25)", ", ".join(str(i) for i in ids[:25]))
        return
    record(name, f"is '{MODEL}' listed?", "YES")
    record(
        name,
        "supported_endpoints",
        json.dumps(match.get("supported_endpoints")),
    )
    record(name, "other keys on the model entry", ", ".join(sorted(match.keys())))


# --------------------------------------------------------------------------- #
# (b) non-streamed chat completion
# --------------------------------------------------------------------------- #


async def probe_b(client: httpx.AsyncClient) -> None:
    name = "b. non-streamed chat completion"
    payload = {
        "model": MODEL,
        "messages": [{"role": "user", "content": "Reply with the single word: ok"}],
        "max_tokens": 32,
    }
    response = await post_chat(client, payload)
    record(name, "HTTP status", response.status_code)
    if response.status_code != 200:
        record(name, "error", error_summary(response))
        return
    body = response.json()
    SHARED["b_body"] = body
    choice = body["choices"][0]
    message = choice["message"]
    record(name, "message keys", ", ".join(sorted(message.keys())))
    record(name, "reasoning fields by shape", reasoning_summary(message))
    record(name, "content preview", clip(message.get("content"), 120))
    record(name, "finish_reason", choice.get("finish_reason"))
    usage = body.get("usage")
    record(name, "usage object present?", "YES" if usage else "NO")
    record(name, "usage", json.dumps(usage))
    record(name, "usage reasoning_tokens", reasoning_tokens(usage))


# --------------------------------------------------------------------------- #
# (c) streaming
# --------------------------------------------------------------------------- #


async def stream_chat(
    client: httpx.AsyncClient, payload: dict[str, Any]
) -> dict[str, Any]:
    """Consume one SSE chat stream and summarise it."""
    chunks = 0
    usage_chunks = 0
    usage: Any = None
    text = ""
    reasoning_chars = 0
    delta_keys: dict[str, int] = {}
    saw_done = False
    status = 0
    error = ""
    async with client.stream("POST", CHAT_URL, json=payload) as response:
        status = response.status_code
        if status != 200:
            await response.aread()
            error = error_summary(response)
            return {"status": status, "error": error}
        async for line in response.aiter_lines():
            if not line.startswith("data:"):
                continue
            data = line[len("data:") :].strip()
            if data == "[DONE]":
                saw_done = True
                continue
            if not data:
                continue
            try:
                chunk = json.loads(data)
            except json.JSONDecodeError:
                continue
            chunks += 1
            if chunk.get("usage"):
                usage_chunks += 1
                usage = chunk["usage"]
            for choice in chunk.get("choices", []):
                delta = choice.get("delta") or {}
                for key in delta:
                    delta_keys[key] = delta_keys.get(key, 0) + 1
                text += delta.get("content") or ""
                reasoning_chars += len(delta.get("reasoning") or "")
    return {
        "status": status,
        "chunks": chunks,
        "usage_chunks": usage_chunks,
        "usage": usage,
        "saw_done": saw_done,
        "text": text,
        "reasoning_chars": reasoning_chars,
        "delta_keys": delta_keys,
    }


async def probe_c(client: httpx.AsyncClient) -> None:
    name = "c. streaming"
    base_payload = {
        "model": MODEL,
        "messages": [{"role": "user", "content": "Count from 1 to 5."}],
        "max_tokens": 64,
        "stream": True,
    }
    result = await stream_chat(client, base_payload)
    record(name, "HTTP status (plain stream)", result["status"])
    if result["status"] != 200:
        record(name, "error", result["error"])
        return
    record(name, "chunks received", result["chunks"])
    record(name, "saw [DONE] sentinel", result["saw_done"])
    record(name, "delta keys seen (key=chunk count)", json.dumps(result["delta_keys"]))
    record(name, "assembled content chars", len(result["text"]))
    record(name, "assembled text preview", clip(result["text"], 80))
    record(name, "assembled reasoning chars (text never printed)", result["reasoning_chars"])
    record(name, "chunks carrying usage", result["usage_chunks"])
    if result["usage_chunks"]:
        record(name, "final usage chunk payload", json.dumps(result["usage"]))
        record(name, "final usage reasoning_tokens", reasoning_tokens(result["usage"]))
        return
    record(name, "plain stream had no usage chunk -- retrying with stream_options", "see below")
    retry = await stream_chat(
        client, {**base_payload, "stream_options": {"include_usage": True}}
    )
    record(name, "HTTP status (stream_options.include_usage)", retry["status"])
    if retry["status"] != 200:
        record(name, "error", retry["error"])
        return
    record(name, "chunks carrying usage (include_usage)", retry["usage_chunks"])
    record(name, "final usage chunk payload (include_usage)", json.dumps(retry["usage"]))


# --------------------------------------------------------------------------- #
# (d) tools on chat completions
# --------------------------------------------------------------------------- #


async def probe_d(client: httpx.AsyncClient) -> None:
    name = "d. tools on chat completions"

    # d1 -- does a function tool come back as tool_calls?
    messages = [
        {"role": "system", "content": "You are a glossary assistant."},
        {"role": "user", "content": TOOL_PROMPT},
    ]
    response = await post_chat(
        client,
        {
            "model": MODEL,
            "messages": messages,
            "tools": [GLOSSARY_TOOL],
            "tool_choice": "auto",
            "max_tokens": 256,
        },
    )
    record(name, "d1 tool_choice=auto status", response.status_code)
    if response.status_code != 200:
        record(name, "d1 error", error_summary(response))
        SHARED["d_core_failed"] = True
        return
    body = response.json()
    message = body["choices"][0]["message"]
    tool_calls = message.get("tool_calls") or []
    record(name, "d1 tool_calls returned", len(tool_calls))
    if not tool_calls:
        record(name, "d1 message keys", ", ".join(sorted(message.keys())))
        record(name, "d1 content preview", clip(message.get("content"), 150))
        SHARED["d_core_failed"] = True
        return
    record(name, "d1 tool name", tool_calls[0]["function"]["name"])
    record(name, "d1 tool arguments", clip(tool_calls[0]["function"].get("arguments"), 120))
    record(name, "d1 tool_call id present", bool(tool_calls[0].get("id")))
    SHARED["d_tool_call"] = tool_calls[0]

    # d2 -- send the tool result back, does it produce the final answer?
    follow_up = list(messages)
    assistant_message: dict[str, Any] = {
        "role": "assistant",
        "content": message.get("content"),
        "tool_calls": tool_calls,
    }
    if message.get("reasoning") is not None:
        assistant_message["reasoning"] = message["reasoning"]
    follow_up.append(assistant_message)
    follow_up.append(
        {
            "role": "tool",
            "tool_call_id": tool_calls[0]["id"],
            "content": "arbitrage: buying and selling the same asset in two markets.",
        }
    )
    response = await post_chat(
        client,
        {
            "model": MODEL,
            "messages": follow_up,
            "tools": [GLOSSARY_TOOL],
            "max_tokens": 256,
        },
    )
    record(name, "d2 tool-result round-trip status", response.status_code)
    if response.status_code != 200:
        record(name, "d2 error", error_summary(response))
        SHARED["d_core_failed"] = True
    else:
        final_message = response.json()["choices"][0]["message"]
        final_text = final_message.get("content") or ""
        record(name, "d2 final answer present?", "YES" if final_text.strip() else "NO")
        record(name, "d2 final answer preview", clip(final_text, 150))
        record(name, "d2 finish_reason", response.json()["choices"][0].get("finish_reason"))

    # d3 -- is tool_choice: "required" accepted?
    response = await post_chat(
        client,
        {
            "model": MODEL,
            "messages": messages,
            "tools": [GLOSSARY_TOOL],
            "tool_choice": "required",
            "max_tokens": 256,
        },
    )
    record(name, "d3 tool_choice=required status", response.status_code)
    if response.status_code != 200:
        record(name, "d3 error", error_summary(response))
    else:
        required_calls = response.json()["choices"][0]["message"].get("tool_calls") or []
        record(name, "d3 tool_calls returned", len(required_calls))
        if required_calls:
            record(name, "d3 tool name", required_calls[0]["function"]["name"])

    # d3b -- is a forced specific function accepted instead?
    response = await post_chat(
        client,
        {
            "model": MODEL,
            "messages": messages,
            "tools": [GLOSSARY_TOOL],
            "tool_choice": {"type": "function", "function": {"name": "lookup_glossary"}},
            "max_tokens": 256,
        },
    )
    record(name, "d3b forced-function tool_choice status", response.status_code)
    if response.status_code != 200:
        record(name, "d3b error", error_summary(response))
    else:
        forced_calls = response.json()["choices"][0]["message"].get("tool_calls") or []
        record(name, "d3b tool_calls returned", len(forced_calls))
        if forced_calls:
            record(name, "d3b tool name", forced_calls[0]["function"]["name"])

    # d4 -- are streamed tool-call deltas usable?
    chunks = 0
    fragments: dict[int, dict[str, Any]] = {}
    status = 0
    error = ""
    async with client.stream(
        "POST",
        CHAT_URL,
        json={
            "model": MODEL,
            "messages": messages,
            "tools": [GLOSSARY_TOOL],
            "tool_choice": "auto",
            "max_tokens": 256,
            "stream": True,
        },
    ) as response:
        status = response.status_code
        if status != 200:
            await response.aread()
            error = error_summary(response)
        else:
            async for line in response.aiter_lines():
                if not line.startswith("data:"):
                    continue
                data = line[len("data:") :].strip()
                if not data or data == "[DONE]":
                    continue
                try:
                    chunk = json.loads(data)
                except json.JSONDecodeError:
                    continue
                for choice in chunk.get("choices", []):
                    for delta in choice.get("delta", {}).get("tool_calls") or []:
                        chunks += 1
                        index = delta.get("index", 0)
                        slot = fragments.setdefault(
                            index, {"id": "", "name": "", "arguments": ""}
                        )
                        if delta.get("id"):
                            slot["id"] += delta["id"]
                        function = delta.get("function") or {}
                        if function.get("name"):
                            slot["name"] += function["name"]
                        if function.get("arguments"):
                            slot["arguments"] += function["arguments"]
    record(name, "d4 streamed tool-call status", status)
    if status != 200:
        record(name, "d4 error", error)
        SHARED["d_stream_tools_failed"] = True
    else:
        record(name, "d4 tool-call delta fragments received", chunks)
        if not fragments:
            record(name, "d4 assembled tool calls", "none")
            SHARED["d_stream_tools_failed"] = True
        else:
            for index, slot in sorted(fragments.items()):
                record(name, f"d4 assembled[{index}] id present", bool(slot["id"]))
                record(name, f"d4 assembled[{index}] name", slot["name"])
                arguments = slot["arguments"]
                record(name, f"d4 assembled[{index}] arguments", clip(arguments, 120))
                try:
                    json.loads(arguments)
                    record(name, f"d4 assembled[{index}] arguments parse as JSON", "YES")
                except json.JSONDecodeError as exc:
                    record(name, f"d4 assembled[{index}] arguments parse as JSON", f"NO ({exc})")
                    SHARED["d_stream_tools_failed"] = True
            if not SHARED.get("d_stream_tools_failed"):
                record(
                    name,
                    "d4 conclusion",
                    "streamed tool-call deltas assemble into valid calls - "
                    "buffer_streamed_tool_calls not needed",
                )


# --------------------------------------------------------------------------- #
# (e) reasoning
# --------------------------------------------------------------------------- #


async def probe_e(client: httpx.AsyncClient) -> None:
    name = "e. reasoning"

    # e1 -- is reasoning_content present?
    response = await post_chat(
        client,
        {
            "model": MODEL,
            "messages": [
                {
                    "role": "user",
                    "content": "Think step by step, then answer with only the number: 17 * 23",
                }
            ],
            "max_tokens": 256,
        },
    )
    record(name, "e1 status", response.status_code)
    if response.status_code != 200:
        record(name, "e1 error", error_summary(response))
    else:
        body = response.json()
        message = body["choices"][0]["message"]
        record(name, "e1 message keys", ", ".join(sorted(message.keys())))
        record(name, "e1 reasoning fields by shape", reasoning_summary(message))
        record(name, "e1 content preview", clip(message.get("content"), 80))
        record(name, "e1 usage reasoning_tokens", reasoning_tokens(body.get("usage")))

    # e2/e3 -- is a reasoning-effort control accepted?
    # Over raw HTTP the field goes on the wire verbatim, so the SDK's
    # `extra_body={"reasoning_effort": ...}` would send this exact same key;
    # there is nothing separate to probe for it here.
    effort_ok = True
    for effort in ("low", "high"):
        response = await post_chat(
            client,
            {
                "model": MODEL,
                "messages": [{"role": "user", "content": "Reply with the single word: ok"}],
                "max_tokens": 64,
                "reasoning_effort": effort,
            },
        )
        record(name, f"e2/e3 top-level reasoning_effort={effort} status", response.status_code)
        if response.status_code != 200:
            effort_ok = False
            record(name, f"e2/e3 reasoning_effort={effort} error", error_summary(response))
        else:
            body = response.json()
            message = body["choices"][0]["message"]
            record(
                name,
                f"e2/e3 reasoning fields at effort={effort}",
                reasoning_summary(message),
            )
            record(
                name,
                f"e2/e3 reasoning_tokens at effort={effort}",
                reasoning_tokens(body.get("usage")),
            )
    if not effort_ok:
        record(
            name,
            "note on the extra_body route",
            "top-level reasoning_effort was rejected; over raw HTTP extra_body is the "
            "same wire key",
        )

    # e4 -- must reasoning be echoed back between tool steps?
    messages = [
        {"role": "system", "content": "You are a glossary assistant."},
        {"role": "user", "content": TOOL_PROMPT},
    ]
    response = await post_chat(
        client,
        {
            "model": MODEL,
            "messages": messages,
            "tools": [GLOSSARY_TOOL],
            "tool_choice": "auto",
            "max_tokens": 256,
        },
    )
    record(name, "e4 tool-step status", response.status_code)
    if response.status_code != 200:
        record(name, "e4 error", error_summary(response))
        return
    message = response.json()["choices"][0]["message"]
    tool_calls = message.get("tool_calls") or []
    if not tool_calls:
        record(name, "e4 tool_calls returned", 0)
        record(name, "e4 echo-back test", "UNVERIFIED - no tool call to continue from")
        return
    reasoning = message.get("reasoning")
    record(name, "e4 reasoning fields on the tool-call step", reasoning_summary(message))

    base_follow_up = list(messages)
    base_follow_up.append(
        {
            "role": "assistant",
            "content": message.get("content"),
            "tool_calls": tool_calls,
        }
    )
    base_follow_up.append(
        {
            "role": "tool",
            "tool_call_id": tool_calls[0]["id"],
            "content": "arbitrage: buying and selling the same asset in two markets.",
        }
    )

    response = await post_chat(
        client,
        {"model": MODEL, "messages": base_follow_up, "tools": [GLOSSARY_TOOL], "max_tokens": 256},
    )
    record(name, "e4 follow-up WITHOUT echoed reasoning status", response.status_code)
    if response.status_code != 200:
        record(name, "e4 without-echo error", error_summary(response))
    else:
        text = response.json()["choices"][0]["message"].get("content") or ""
        record(name, "e4 without-echo final answer present?", "YES" if text.strip() else "NO")

    if not reasoning:
        record(name, "e4 follow-up WITH echoed reasoning", "n/a - no reasoning field to echo")
        return
    with_echo = list(messages)
    with_echo.append(
        {
            "role": "assistant",
            "content": message.get("content"),
            "tool_calls": tool_calls,
            "reasoning": reasoning,
        }
    )
    with_echo.append(
        {
            "role": "tool",
            "tool_call_id": tool_calls[0]["id"],
            "content": "arbitrage: buying and selling the same asset in two markets.",
        }
    )
    response = await post_chat(
        client,
        {"model": MODEL, "messages": with_echo, "tools": [GLOSSARY_TOOL], "max_tokens": 256},
    )
    record(name, "e4 follow-up WITH echoed reasoning status", response.status_code)
    if response.status_code != 200:
        record(name, "e4 with-echo error", error_summary(response))
    else:
        text = response.json()["choices"][0]["message"].get("content") or ""
        record(name, "e4 with-echo final answer present?", "YES" if text.strip() else "NO")


# --------------------------------------------------------------------------- #
# (f) ZDR header
# --------------------------------------------------------------------------- #


async def probe_f(client: httpx.AsyncClient) -> None:
    name = "f. x-cmd-zdr: 1"
    response = await post_chat(
        client,
        {
            "model": MODEL,
            "messages": [{"role": "user", "content": "Reply with the single word: ok"}],
            "max_tokens": 32,
        },
        headers={"x-cmd-zdr": "1"},
    )
    record(name, "HTTP status with x-cmd-zdr: 1", response.status_code)
    if response.status_code == 200:
        record(name, "result", "200 - ZDR header accepted")
    else:
        record(name, "result", error_summary(response))


# --------------------------------------------------------------------------- #
# (g) error bodies
# --------------------------------------------------------------------------- #


async def probe_g(_client: httpx.AsyncClient) -> None:
    name = "g. error bodies"

    async with httpx.AsyncClient(
        base_url=BASE_URL,
        timeout=TIMEOUT,
        headers={"Authorization": "Bearer invalid-key-for-cp0-probe"},
    ) as bad_client:
        response = await bad_client.post(
            CHAT_URL,
            json={
                "model": MODEL,
                "messages": [{"role": "user", "content": "hi"}],
                "max_tokens": 16,
            },
        )
    record(name, "wrong key status (expected 401)", response.status_code)
    record(name, "wrong key body", body_text(response))

    async with httpx.AsyncClient(
        base_url=BASE_URL,
        timeout=TIMEOUT,
        headers=SHARED["auth_headers"],
    ) as good_client:
        response = await good_client.post(
            CHAT_URL,
            json={
                "model": "no-such-model/probe-xyz",
                "messages": [{"role": "user", "content": "hi"}],
                "max_tokens": 16,
            },
        )
    record(name, "unknown model status (expected 400)", response.status_code)
    record(name, "unknown model body", body_text(response))


# --------------------------------------------------------------------------- #
# (h) the Agents SDK path over chat completions
# --------------------------------------------------------------------------- #


async def run_agents_probe(api_key: str, use_responses: bool) -> dict[str, Any]:
    """One streamed Agents-SDK run. Never prints the key."""
    from agents import (
        Agent,
        ModelSettings,
        OpenAIChatCompletionsModel,
        OpenAIResponsesModel,
        RunConfig,
        Runner,
        function_tool,
        set_tracing_disabled,
    )
    from openai import AsyncOpenAI
    from openai.types.responses import ResponseTextDeltaEvent

    set_tracing_disabled(True)

    @function_tool
    def lookup_glossary(term: str) -> str:
        """Look up a term in the course glossary."""
        return f"{term}: buying and selling the same asset in two markets."

    client = AsyncOpenAI(base_url=BASE_URL, api_key=api_key)
    try:
        model = (
            OpenAIResponsesModel(model=MODEL, openai_client=client)
            if use_responses
            else OpenAIChatCompletionsModel(model=MODEL, openai_client=client)
        )
        agent = Agent(
            name="Probe",
            instructions=(
                "Always call lookup_glossary for the user's term, then answer in one "
                "short sentence."
            ),
            tools=[lookup_glossary],
            model=model,
            model_settings=ModelSettings(max_tokens=256),
        )
        result = Runner.run_streamed(
            agent,
            input="Look up the term 'arbitrage' and tell me what you found.",
            run_config=RunConfig(tracing_disabled=True, workflow_name="cp0-provider-probe"),
        )
        text_deltas = 0
        text = ""
        tool_calls = 0
        async for event in result.stream_events():
            if event.type == "raw_response_event" and isinstance(
                event.data, ResponseTextDeltaEvent
            ):
                text_deltas += 1
                text += event.data.delta
            elif event.type == "run_item_stream_event" and event.item.type == "tool_call_item":
                tool_calls += 1
        usage = result.context_wrapper.usage
        return {
            "ok": True,
            "text_deltas": text_deltas,
            "text": text,
            "tool_calls": tool_calls,
            "requests": usage.requests,
            "input_tokens": usage.input_tokens,
            "output_tokens": usage.output_tokens,
            "total_tokens": usage.total_tokens,
        }
    finally:
        await client.close()


async def probe_h(api_key: str) -> None:
    name = "h. Agents SDK over chat completions"
    try:
        outcome = await run_agents_probe(api_key, use_responses=False)
    except Exception as exc:  # noqa: BLE001 - record, do not abort the probe
        record(name, "SDK run FAILED", f"{type(exc).__name__}: {exc}")
        SHARED["h_failed"] = True
        return
    record(name, "text deltas received", outcome["text_deltas"])
    record(name, "final text preview", clip(outcome["text"], 150))
    record(name, "tool call items emitted", outcome["tool_calls"])
    record(
        name,
        "context_wrapper.usage",
        (
            f"requests={outcome['requests']} input_tokens={outcome['input_tokens']} "
            f"output_tokens={outcome['output_tokens']} total_tokens={outcome['total_tokens']}"
        ),
    )
    filled = bool(outcome["requests"] and outcome["total_tokens"])
    record(name, "usage filled?", "YES" if filled else "NO")
    if outcome["text_deltas"] == 0 or outcome["tool_calls"] == 0 or not filled:
        SHARED["h_failed"] = True


# --------------------------------------------------------------------------- #
# (i) the same path over /responses -- only if chat completions failed
# --------------------------------------------------------------------------- #


async def probe_i(api_key: str) -> None:
    name = "i. Agents SDK over /responses (fallback check)"
    needed = SHARED.get("d_core_failed") or SHARED.get("h_failed")
    if not needed:
        record(name, "result", "SKIPPED - chat completions tools/SDK path succeeded")
        return
    record(name, "why this ran", "chat completions failed in (d) and/or (h)")
    try:
        outcome = await run_agents_probe(api_key, use_responses=True)
    except Exception as exc:  # noqa: BLE001 - record, do not abort the probe
        record(name, "SDK run over /responses FAILED", f"{type(exc).__name__}: {exc}")
        return
    record(name, "text deltas received", outcome["text_deltas"])
    record(name, "final text preview", clip(outcome["text"], 150))
    record(name, "tool call items emitted", outcome["tool_calls"])
    record(
        name,
        "context_wrapper.usage",
        (
            f"requests={outcome['requests']} input_tokens={outcome['input_tokens']} "
            f"output_tokens={outcome['output_tokens']} total_tokens={outcome['total_tokens']}"
        ),
    )


# --------------------------------------------------------------------------- #
# main
# --------------------------------------------------------------------------- #


async def main() -> int:
    try:
        settings = ProbeSettings()
    except Exception as exc:  # noqa: BLE001 - report, do not traceback the key
        print("FATAL: could not load COMMANDCODE_API_KEY from .env", file=sys.stderr)
        print(f"  {type(exc).__name__}: {redact(exc)}", file=sys.stderr)
        return 2

    api_key = settings.commandcode_api_key.get_secret_value()
    auth_headers = {"Authorization": f"Bearer {api_key}"}
    SHARED["auth_headers"] = auth_headers

    print(f"base_url: {settings.commandcode_base_url}")
    print(f"model:    {MODEL}")
    print(f"api key:  present (length {len(api_key)}, value [REDACTED])")

    async with httpx.AsyncClient(
        base_url=BASE_URL, timeout=TIMEOUT, headers=auth_headers
    ) as client:
        await guarded("a. GET /models", probe_a, client)
        await guarded("b. non-streamed chat completion", probe_b, client)
        await guarded("c. streaming", probe_c, client)
        await guarded("d. tools on chat completions", probe_d, client)
        await guarded("e. reasoning", probe_e, client)
        await guarded("f. x-cmd-zdr: 1", probe_f, client)
        await guarded("g. error bodies", probe_g, client)
        await guarded("h. Agents SDK over chat completions", probe_h, api_key)
        await guarded("i. Agents SDK over /responses (fallback check)", probe_i, api_key)

    return 0


if __name__ == "__main__":
    exit_code = 1
    try:
        exit_code = asyncio.run(main())
    finally:
        print_report()
    raise SystemExit(exit_code)
