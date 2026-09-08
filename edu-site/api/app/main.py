"""FastAPI app factory.

Run with:    uvicorn app.main:app --reload --port 8000
"""

from __future__ import annotations

from fastapi import FastAPI

from app.config import get_settings
from app.llm import router as llm_router
from app.routers import chat, health, personalize, translate

settings = get_settings()


def create_app() -> FastAPI:
    app = FastAPI(
        title="The Bridge Balance API",
        version="0.1.0",
        description="Backend for The Bridge Balance — RAG chat, product catalog, auth.",
        docs_url="/docs" if not settings.is_production else None,
        redoc_url=None,
    )

    # Routers — only health is wired in Phase A. Others are stubs.
    app.include_router(health.router)
    app.include_router(chat.router)           # Phase B
    app.include_router(personalize.router)    # Phase B
    app.include_router(translate.router)      # Phase B
    app.include_router(llm_router.router)     # Provider introspection

    return app


app = create_app()
