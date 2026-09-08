"""Neon Postgres engine.

Free tier: 0.5 GB. Connection string lives in `DATABASE_URL`. Format:
`postgresql+asyncpg://<user>:<password>@<host>/<db>?sslmode=require`

Phase A: lazy import. The engine is built the first time it's requested, so
the app boots fine without a DATABASE_URL.
"""

from __future__ import annotations

from functools import lru_cache

from sqlalchemy.ext.asyncio import AsyncEngine, create_async_engine

from app.config import get_settings


@lru_cache(maxsize=1)
def get_engine() -> AsyncEngine | None:
    """Return a Neon-bound async engine, or None if DATABASE_URL is unset.

    SQLAlchemy raises loudly on a malformed URL, which is what we want at
    first use (not at boot).
    """
    settings = get_settings()
    if not settings.database_url:
        return None
    return create_async_engine(
        settings.database_url,
        pool_pre_ping=True,
        pool_size=5,
        max_overflow=10,
    )


def reset_engine_cache() -> None:
    """For tests."""
    get_engine.cache_clear()


__all__ = ["get_engine", "reset_engine_cache"]
