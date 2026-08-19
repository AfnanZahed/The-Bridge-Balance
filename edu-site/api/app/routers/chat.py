"""RAG chatbot — Phase B stub.

Phase A returns 501. The shape of the request/response is sketched here so
the frontend can develop against a stable contract.
"""

from __future__ import annotations

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

router = APIRouter(prefix="/chat", tags=["chat"])


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=4000)
    selected_text: str | None = Field(default=None, max_length=4000)
    conversation_id: str | None = None


class ChatCitation(BaseModel):
    chapter_slug: str
    section_heading: str
    excerpt: str


class ChatResponse(BaseModel):
    answer: str
    citations: list[ChatCitation] = []
    conversation_id: str


@router.post("", response_model=ChatResponse)
async def chat(req: ChatRequest) -> ChatResponse:
    raise HTTPException(
        status_code=501,
        detail=(
            "RAG chat wires up in Phase B. "
            "Need: Qdrant collection populated, LLM provider configured, "
            "embedding provider configured."
        ),
    )


__all__ = ["router"]
