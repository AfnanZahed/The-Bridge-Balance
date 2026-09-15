"""Provider registry.

Returns the LLMClient for the provider named in `LLM_PROVIDER`. Provider
modules are imported lazily so an unselected provider's SDK isn't required.

If `LLM_PROVIDER=none` (the default), the registry returns `NoneClient`,
which raises `LLMNotConfiguredError` on every call.
"""

from __future__ import annotations

from functools import lru_cache

from app.config import LLMProvider, Settings, get_settings
from app.llm.base import LLMClient


@lru_cache(maxsize=1)
def get_llm_client() -> LLMClient:
    """Return the active LLM client. Cached per process.

    Provider SDKs are imported lazily so that, e.g., a deployment that sets
    `LLM_PROVIDER=groq` does not require `google-genai` to be installed.
    """
    settings = get_settings()
    return _build(settings)


def _build(settings: Settings) -> LLMClient:
    from app.llm.providers.none import NoneClient
    from app.llm.providers.groq import GroqClient
    from app.llm.providers.gemini import GeminiClient
    from app.llm.providers.together import TogetherClient
    from app.llm.providers.ollama import OllamaClient
    from app.llm.providers.deepseek import DeepSeekClient
    from app.llm.providers.openai import OpenAIClient

    registry: dict[LLMProvider, type[LLMClient]] = {
        LLMProvider.none: NoneClient,
        LLMProvider.groq: GroqClient,
        LLMProvider.gemini: GeminiClient,
        LLMProvider.together: TogetherClient,
        LLMProvider.ollama: OllamaClient,
        LLMProvider.deepseek: DeepSeekClient,
        LLMProvider.openai: OpenAIClient,
    }
    provider_cls = registry[settings.llm_provider]
    return provider_cls(settings)


__all__ = ["get_llm_client"]
