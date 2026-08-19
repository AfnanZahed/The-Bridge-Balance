"""LLM provider abstraction.

The backend never imports a provider SDK directly. All chat / translation /
personalization calls go through `LLMClient.generate(...)`, which delegates
to the provider selected by `LLM_PROVIDER` env var.

If `LLM_PROVIDER=none` (the default), the client raises
`LLMNotConfiguredError`, which the routers map to HTTP 503 with a link to
the provider docs.

See: docs/llm-providers.md (rendered from edu-site root) for the alternatives
table and free-tier links.
"""

from app.llm.base import (
    LLMClient,
    LLMMessage,
    LLMNotConfiguredError,
    LLMRequest,
    LLMResponse,
)
from app.llm.registry import get_llm_client

__all__ = [
    "LLMClient",
    "LLMMessage",
    "LLMNotConfiguredError",
    "LLMRequest",
    "LLMResponse",
    "get_llm_client",
]
