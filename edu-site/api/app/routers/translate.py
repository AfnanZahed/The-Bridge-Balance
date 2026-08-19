"""Per-chapter translation — Phase B stub."""

from __future__ import annotations

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

router = APIRouter(prefix="/translate", tags=["translate"])


class TranslateRequest(BaseModel):
    chapter_slug: str
    target_locale: str = Field(pattern=r"^[a-z]{2,3}(-[A-Z]{2})?$")
    content_md: str


class TranslateResponse(BaseModel):
    chapter_slug: str
    target_locale: str
    content_md: str
    cached: bool


@router.post("", response_model=TranslateResponse)
async def translate(req: TranslateRequest) -> TranslateResponse:
    raise HTTPException(
        status_code=501,
        detail="Per-chapter translation wires up in Phase B.",
    )


__all__ = ["router"]
