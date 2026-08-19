"""Per-chapter personalization — Phase B stub."""

from __future__ import annotations

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

router = APIRouter(prefix="/personalize", tags=["personalize"])


class PersonalizeRequest(BaseModel):
    chapter_slug: str
    profile: dict = Field(
        description="Student profile: background, target role, hardware, etc."
    )


class PersonalizeResponse(BaseModel):
    chapter_slug: str
    content_md: str
    model: str


@router.post("", response_model=PersonalizeResponse)
async def personalize(req: PersonalizeRequest) -> PersonalizeResponse:
    raise HTTPException(
        status_code=501,
        detail="Per-chapter personalization wires up in Phase B.",
    )


__all__ = ["router"]
