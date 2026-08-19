"""Default provider: refuses every call.

Returned when `LLM_PROVIDER=none` (the shipped default). Lets the backend
boot and pass health checks without spending any tokens.
"""

from __future__ import annotations

from app.config import Settings
from app.llm.base import LLMClient, LLMNotConfiguredError, LLMRequest, LLMResponse


class NoneClient(LLMClient):
    provider_name = "none"

    def __init__(self, settings: Settings):
        self._settings = settings

    async def generate(self, request: LLMRequest) -> LLMResponse:
        raise LLMNotConfiguredError(
            hint="Set LLM_PROVIDER to one of: groq, gemini, together, ollama, deepseek, openai"
        )

    async def health_check(self) -> bool:
        # The backend is healthy; the *LLM feature* is just unavailable.
        return True


__all__ = ["NoneClient"]
