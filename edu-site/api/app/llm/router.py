"""LLM introspection router.

Exposes:
  GET /llm/status     — which provider is configured, whether it's ready
  GET /llm/providers  — list of supported providers and their env-var names
"""

from __future__ import annotations

from fastapi import APIRouter

from app.config import LLMProvider, get_settings

router = APIRouter(prefix="/llm", tags=["llm"])


@router.get("/status")
async def status() -> dict:
    s = get_settings()
    return {
        "provider": s.llm_provider.value,
        "configured": s.llm_configured,
        "embedding_provider": s.embedding_provider.value,
        "is_production": s.is_production,
    }


@router.get("/providers")
async def providers() -> dict:
    """Static table — keeps the docs and the backend in sync."""
    return {
        "providers": [
            {
                "id": LLMProvider.groq.value,
                "free_tier": True,
                "env_var": "GROQ_API_KEY",
                "signup": "https://console.groq.com/",
                "notes": "Generous free tier; fast inference.",
            },
            {
                "id": LLMProvider.gemini.value,
                "free_tier": True,
                "env_var": "GEMINI_API_KEY",
                "signup": "https://aistudio.google.com/apikey",
                "notes": "15 RPM, 1M TPM free.",
            },
            {
                "id": LLMProvider.together.value,
                "free_tier": "credits",
                "env_var": "TOGETHER_API_KEY",
                "signup": "https://api.together.xyz/",
                "notes": "Free credits on signup; many open models.",
            },
            {
                "id": LLMProvider.ollama.value,
                "free_tier": True,
                "env_var": "OLLAMA_BASE_URL",
                "signup": "https://ollama.com/",
                "notes": "Self-hosted. No per-token cost; needs local RAM/VRAM.",
            },
            {
                "id": LLMProvider.deepseek.value,
                "free_tier": False,
                "env_var": "DEEPSEEK_API_KEY",
                "signup": "https://platform.deepseek.com/",
                "notes": "Very cheap; useful fallback.",
            },
            {
                "id": LLMProvider.openai.value,
                "free_tier": False,
                "env_var": "OPENAI_API_KEY",
                "signup": "https://platform.openai.com/",
                "notes": "Gated. Last resort — see ADR-0001.",
            },
        ]
    }


__all__ = ["router"]
