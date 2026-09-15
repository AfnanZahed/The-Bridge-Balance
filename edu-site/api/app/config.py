"""Application settings, loaded from environment / .env.

Single source of truth for config. Pydantic-settings validates types at boot,
so a missing or malformed env var crashes the process with a useful message
instead of failing deep in a request handler.
"""

from __future__ import annotations

from enum import StrEnum

from pydantic import Field, SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict


class AppEnv(StrEnum):
    development = "development"
    staging = "staging"
    production = "production"


class LLMProvider(StrEnum):
    """Allowed LLM providers.

    `none` is the default — the backend boots, health checks pass, but any
    chat/translation/personalization call returns 503 with a link to the
    provider documentation. This prevents the app from silently spending
    money on an unexpected provider.
    """

    none = "none"
    groq = "groq"
    gemini = "gemini"
    together = "together"
    ollama = "ollama"
    deepseek = "deepseek"
    openai = "openai"


class EmbeddingProvider(StrEnum):
    none = "none"
    huggingface = "huggingface"  # self-hosted sentence-transformers (free)
    openai = "openai"
    gemini = "gemini"


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # App
    app_env: AppEnv = AppEnv.development
    app_port: int = 8000
    app_log_level: str = "info"

    # Database
    database_url: str | None = None  # required only when Phase B+ ships

    # Vector search
    qdrant_url: str | None = None
    qdrant_api_key: SecretStr | None = None
    qdrant_collection: str = "bridge_balance_chapters"

    # LLM
    llm_provider: LLMProvider = LLMProvider.none
    groq_api_key: SecretStr | None = None
    gemini_api_key: SecretStr | None = None
    together_api_key: SecretStr | None = None
    deepseek_api_key: SecretStr | None = None
    openai_api_key: SecretStr | None = None
    ollama_base_url: str = "http://localhost:11434"

    # Embeddings
    embedding_provider: EmbeddingProvider = EmbeddingProvider.none
    embedding_model: str = "sentence-transformers/all-MiniLM-L6-v2"

    # Auth (Phase B)
    better_auth_secret: SecretStr | None = None
    better_auth_url: str = "http://localhost:8000"

    # Payments / storage / email (Phase C) — all optional, ignored until phase
    stripe_secret_key: SecretStr | None = None
    stripe_webhook_secret: SecretStr | None = None
    cloudflare_r2_access_key: SecretStr | None = None
    cloudflare_r2_secret_key: SecretStr | None = None
    cloudflare_r2_bucket: str | None = None
    resend_api_key: SecretStr | None = None
    inngest_event_key: SecretStr | None = None
    inngest_signing_key: SecretStr | None = None

    # Validation helpers
    @property
    def llm_configured(self) -> bool:
        """True only when LLM_PROVIDER is set AND its credential is present."""
        if self.llm_provider is LLMProvider.none:
            return False
        cred_map = {
            LLMProvider.groq: self.groq_api_key,
            LLMProvider.gemini: self.gemini_api_key,
            LLMProvider.together: self.together_api_key,
            LLMProvider.deepseek: self.deepseek_api_key,
            LLMProvider.openai: self.openai_api_key,
            LLMProvider.ollama: None,  # ollama is local; no key needed
        }
        cred = cred_map[self.llm_provider]
        return self.llm_provider is LLMProvider.ollama or cred is not None

    @property
    def is_production(self) -> bool:
        return self.app_env is AppEnv.production


_settings: Settings | None = None


def get_settings() -> Settings:
    """Cached settings instance.

    Settings are loaded once per process. Tests can override by setting the
    `BRIDGE_BALANCE_TESTING=1` env var and re-importing.
    """
    global _settings
    if _settings is None:
        _settings = Settings()
    return _settings


def reset_settings_cache() -> None:
    """For tests. Forces the next `get_settings()` call to re-read env."""
    global _settings
    _settings = None


__all__ = [
    "AppEnv",
    "EmbeddingProvider",
    "LLMProvider",
    "Settings",
    "get_settings",
    "reset_settings_cache",
]
