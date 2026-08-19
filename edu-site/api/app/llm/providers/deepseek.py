"""DeepSeek provider stub.

DeepSeek is dramatically cheaper than OpenAI; not free but close. Useful
fallback when free-tier providers throttle. https://platform.deepseek.com/
"""

from __future__ import annotations

from app.config import Settings
from app.llm.base import LLMClient, LLMNotConfiguredError, LLMRequest, LLMResponse


class DeepSeekClient(LLMClient):
    provider_name = "deepseek"

    def __init__(self, settings: Settings):
        if not settings.deepseek_api_key:
            raise LLMNotConfiguredError(hint="DEEPSEEK_API_KEY is empty")
        self._api_key = settings.deepseek_api_key.get_secret_value()
        self._client = None

    async def generate(self, request: LLMRequest) -> LLMResponse:
        raise NotImplementedError("DeepSeekClient.generate wired in Phase B")


__all__ = ["DeepSeekClient"]
