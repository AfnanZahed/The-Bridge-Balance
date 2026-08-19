"""Phase A smoke tests."""

from __future__ import annotations

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_ok() -> None:
    r = client.get("/health")
    assert r.status_code == 200
    body = r.json()
    assert body["status"] == "ok"
    assert body["llm_provider"] == "none"  # default


def test_readiness_phase_a() -> None:
    r = client.get("/health/ready")
    assert r.status_code == 200
    body = r.json()
    assert body["status"] == "ready"
    assert body["checks"] == {"llm": False}


def test_llm_status_default() -> None:
    r = client.get("/llm/status")
    assert r.status_code == 200
    assert r.json()["provider"] == "none"
    assert r.json()["configured"] is False


def test_llm_providers_lists_all() -> None:
    r = client.get("/llm/providers")
    assert r.status_code == 200
    ids = [p["id"] for p in r.json()["providers"]]
    for expected in ("groq", "gemini", "together", "ollama", "deepseek", "openai"):
        assert expected in ids


def test_chat_returns_501() -> None:
    r = client.post("/chat", json={"message": "hello"})
    assert r.status_code == 501


def test_personalize_returns_501() -> None:
    r = client.post(
        "/personalize",
        json={"chapter_slug": "stage-01-spec-aware-vibe-engineering/01-foundations", "profile": {}},
    )
    assert r.status_code == 501


def test_translate_returns_501() -> None:
    r = client.post(
        "/translate",
        json={
            "chapter_slug": "stage-01-spec-aware-vibe-engineering/01-foundations",
            "target_locale": "ur",
            "content_md": "# Heading",
        },
    )
    assert r.status_code == 501
