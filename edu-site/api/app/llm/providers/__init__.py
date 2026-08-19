"""LLM provider implementations.

Each module exports a single `LLMClient` subclass. To add a new provider:
1. Add an entry to `LLMProvider` in `app/config.py`.
2. Create `app/llm/providers/<name>.py` with a class implementing `LLMClient`.
3. Register it in `app/llm/registry.py`.
4. Add it to `.env.example` and `docs/llm-providers.md`.
"""
