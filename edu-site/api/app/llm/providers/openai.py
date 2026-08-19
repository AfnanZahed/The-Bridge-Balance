"""OpenAI provider stub — gated.

OpenAI is intentionally the LAST option. The platform's stance (see ADR-0001):
every other provider above is preferred first. Only enable OpenAI when:
  - a feature specifically requires a model only OpenAI serves,
  - or you've evaluated alternatives and confirmed cost/value.

Set `LLM_PROVIDER=openai` and `OPENAI_API_KEY=...` to use this provider.
"""

from __future__ import annotations

from app.config import Settings
from app.llm.base import LLMClient, LLMNotConfiguredError, LLMRequest, LLMResponse


class OpenAIClient(LLMClient):
    provider_name = "openai"

    def __init__(self, settings: Settings):
        if not settings.openai_api_key:
            raise LLMNotConfiguredError(hint="OPENAI_API_KEY is empty")
        self._api_key = settings.openai_api_key.get_secret_value()
        self._client = None  # populated lazily in Phase B

    async def generate(self, request: LLMRequest) -> LLMResponse:
        raise NotImplementedError("OpenAIClient.generate wired in Phase B")


__all__ = ["OpenAIClient"]
