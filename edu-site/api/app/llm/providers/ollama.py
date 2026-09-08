"""Ollama provider stub (self-hosted, free).

Ollama runs models locally. No API key, no per-token cost — but you need
enough RAM/VRAM. https://ollama.com/

Default OLLAMA_BASE_URL=http://localhost:11434.
"""

from __future__ import annotations

from app.config import Settings
from app.llm.base import LLMClient, LLMRequest, LLMResponse


class OllamaClient(LLMClient):
    provider_name = "ollama"

    def __init__(self, settings: Settings):
        self._base_url = settings.ollama_base_url
        self._client = None  # httpx.AsyncClient, created lazily in Phase B

    async def generate(self, request: LLMRequest) -> LLMResponse:
        raise NotImplementedError("OllamaClient.generate wired in Phase B")


__all__ = ["OllamaClient"]
