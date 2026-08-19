"""FastAPI dependencies (DB session, LLM client, etc.)."""

from __future__ import annotations

from collections.abc import Generator

from app.config import Settings, get_settings


def settings_dep() -> Settings:
    return get_settings()


# A real DB session dep is added in Phase B. For Phase A we only need config.
__all__: list[str] = ["settings_dep"]
