"""Together AI provider stub.

Together gives a small free credit on signup. https://api.together.xyz/
"""

from __future__ import annotations

from app.config import Settings
from app.llm.base import LLMClient, LLMNotConfiguredError, LLMRequest, LLMResponse


class TogetherClient(LLMClient):
    provider_name = "together"

    def __init__(self, settings: Settings):
        if not settings.together_api_key:
            raise LLMNotConfiguredError(hint="TOGETHER_API_KEY is empty")
        self._api_key = settings.together_api_key.get_secret_value()
        self._client = None

    async def generate(self, request: LLMRequest) -> LLMResponse:
        raise NotImplementedError("TogetherClient.generate wired in Phase B")


__all__ = ["TogetherClient"]
