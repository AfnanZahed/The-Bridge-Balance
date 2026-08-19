"""Health check. Always wired — the cheapest possible 'is the app alive' probe."""

from __future__ import annotations

from fastapi import APIRouter

from app.config import get_settings

router = APIRouter(tags=["health"])


@router.get("/health")
async def health() -> dict:
    s = get_settings()
    return {
        "status": "ok",
        "app_env": s.app_env.value,
        "llm_provider": s.llm_provider.value,
        "llm_configured": s.llm_configured,
    }


@router.get("/health/ready")
async def readiness() -> dict:
    """Readiness differs from liveness: it checks downstream services.

    Phase A: only the LLM provider's credential presence is checked. DB and
    vector search are added when they ship.
    """
    s = get_settings()
    return {
        "status": "ready",
        "checks": {
            "llm": s.llm_configured,
            # "db": False,         # Phase B
            # "qdrant": False,     # Phase B
        },
    }


__all__ = ["router"]
