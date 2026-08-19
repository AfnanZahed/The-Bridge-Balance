"""Groq provider stub.

Groq offers a free tier with generous rate limits. Sign up at
https://console.groq.com/ to get GROQ_API_KEY.

This stub raises NotImplementedError until Phase B wires the SDK. The shape
matches `LLMClient` so Phase B can drop in the real implementation without
touching callers.
"""

from __future__ import annotations

from app.config import Settings
from app.llm.base import LLMClient, LLMNotConfiguredError, LLMRequest, LLMResponse


class GroqClient(LLMClient):
    provider_name = "groq"

    def __init__(self, settings: Settings):
        if not settings.groq_api_key:
            raise LLMNotConfiguredError(hint="GROQ_API_KEY is empty")
        self._api_key = settings.groq_api_key.get_secret_value()
        # SDK import deferred: `from groq import AsyncGroq`
        self._client = None  # populated lazily in Phase B

    async def generate(self, request: LLMRequest) -> LLMResponse:
        # TODO(phase-b): use AsyncGroq to call chat.completions.create
        raise NotImplementedError("GroqClient.generate wired in Phase B")


__all__ = ["GroqClient"]
