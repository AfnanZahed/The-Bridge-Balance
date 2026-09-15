"""Google Gemini provider stub.

Gemini's free tier: 15 RPM, 1M TPM, 1500 RPD. Sign up at
https://aistudio.google.com/apikey to get GEMINI_API_KEY.

Implementation in Phase B.
"""

from __future__ import annotations

from app.config import Settings
from app.llm.base import LLMClient, LLMNotConfiguredError, LLMRequest, LLMResponse


class GeminiClient(LLMClient):
    provider_name = "gemini"

    def __init__(self, settings: Settings):
        if not settings.gemini_api_key:
            raise LLMNotConfiguredError(hint="GEMINI_API_KEY is empty")
        self._api_key = settings.gemini_api_key.get_secret_value()
        self._client = None

    async def generate(self, request: LLMRequest) -> LLMResponse:
        raise NotImplementedError("GeminiClient.generate wired in Phase B")


__all__ = ["GeminiClient"]
