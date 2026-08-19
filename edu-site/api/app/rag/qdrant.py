"""Qdrant Cloud client + retrieval.

Free tier: 1 GB vectors, free forever. Get URL + API key from
https://cloud.qdrant.io/ → your cluster's "Data Plane" credentials.
"""

from __future__ import annotations

from dataclasses import dataclass
from functools import lru_cache

from qdrant_client import QdrantClient

from app.config import get_settings


@dataclass(slots=True)
class RetrievedChunk:
    chunk_id: str
    chapter_slug: str
    section_heading: str
    text: str
    score: float


@lru_cache(maxsize=1)
def get_qdrant() -> QdrantClient | None:
    settings = get_settings()
    if not settings.qdrant_url or not settings.qdrant_api_key:
        return None
    return QdrantClient(
        url=settings.qdrant_url,
        api_key=settings.qdrant_api_key.get_secret_value(),
    )


def reset_qdrant_cache() -> None:
    get_qdrant.cache_clear()


async def search(query_vector: list[float], top_k: int = 5) -> list[RetrievedChunk]:
    """Vector search over chapter chunks.

    Phase B: full implementation. Phase A: returns [] unless the qdrant
    client is configured.
    """
    client = get_qdrant()
    if client is None:
        return []
    # TODO(phase-b): real search.
    raise NotImplementedError("Qdrant search wires up in Phase B")


__all__ = ["RetrievedChunk", "get_qdrant", "search"]
