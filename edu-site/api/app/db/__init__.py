"""Database layer.

Phase A: skeleton. The Neon engine is built lazily on first use so that the
backend can boot without `DATABASE_URL` set. Phase B will add Alembic
migrations and session management.
"""

from app.db.neon import get_engine

__all__ = ["get_engine"]
