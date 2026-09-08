"""LLM provider interface.

All concrete providers implement `LLMClient`. The interface is intentionally
narrow: a single `generate` method that takes a list of messages and returns
a single response. Streaming, tool-calling, and structured outputs are added
as separate optional methods in Phase B.
"""

from __future__ import annotations

from abc import ABC, abstractmethod
from dataclasses import dataclass, field


@dataclass(slots=True)
class LLMMessage:
    role: str  # "system" | "user" | "assistant"
    content: str


@dataclass(slots=True)
class LLMRequest:
    messages: list[LLMMessage]
    model: str | None = None
    temperature: float = 0.7
    max_tokens: int = 1024
    metadata: dict[str, str] = field(default_factory=dict)


@dataclass(slots=True)
class LLMResponse:
    text: str
    model: str
    provider: str
    input_tokens: int = 0
    output_tokens: int = 0
    raw: dict | None = None


class LLMNotConfiguredError(RuntimeError):
    """Raised when LLM_PROVIDER=none or the provider's credential is missing.

    Routers map this to HTTP 503 with a link to the provider documentation.
    """

    def __init__(self, hint: str | None = None):
        msg = (
            "LLM provider is not configured. Set LLM_PROVIDER and the matching "
            "credential in .env (see docs/llm-providers.md). "
            f"Hint: {hint}" if hint else
            "LLM provider is not configured. Set LLM_PROVIDER and the matching "
            "credential in .env (see docs/llm-providers.md)."
        )
        super().__init__(msg)
        self.hint = hint


class LLMClient(ABC):
    """Abstract LLM client. Implementations live in `app.llm.providers.*`."""

    provider_name: str = "abstract"

    @abstractmethod
    async def generate(self, request: LLMRequest) -> LLMResponse:
        """Generate a single completion. May raise LLMNotConfiguredError."""
        raise NotImplementedError

    async def health_check(self) -> bool:
        """Optional. Default: True if `generate` can theoretically run."""
        return True


__all__ = [
    "LLMClient",
    "LLMMessage",
    "LLMNotConfiguredError",
    "LLMRequest",
    "LLMResponse",
]
