---
sidebar_label: "5. Databases"
sidebar_position: 6
title: "05 — Databases"
description: "SQL vs NoSQL, PostgreSQL, MongoDB, Redis, graph databases."
keywords: [databases, sql, postgres, mongodb, redis, neo4j]
chapter_state: "placeholder"
video_url: ""
---

# 05 — Databases

> **Core idea:** the data shape picks the database. Don't pick the database first.

## Lecture outline

<!-- Placeholder shell. Paste the lecture outline here. -->

- [ ] SQL vs NoSQL: when each is right (and wrong)
- [ ] PostgreSQL: tables, indexes, transactions, JSONB
- [ ] MongoDB: documents, when schema-less is a feature
- [ ] Redis: cache, queue, ephemeral state
- [ ] Graph databases (Neo4j): relationships as first-class
- [ ] Reading a schema: start at the indexes, follow the foreign keys

## Lecture content

> _Awaiting video lecture._

```text
[Lecture transcript goes here.]
```

## Worked example

```sql
-- PostgreSQL: a notes table with a JSONB column for tags
CREATE TABLE notes (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID NOT NULL REFERENCES users(id),
    title       TEXT NOT NULL,
    body        TEXT NOT NULL,
    tags        JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX notes_user_id_idx ON notes(user_id);
CREATE INDEX notes_tags_gin    ON notes USING GIN (tags);
```

## Check your understanding

1. When is a document store better than a relational table?
2. Why does a GIN index make `tags @> '["x"]'` fast?
3. Open any database schema. Identify the primary keys, the indexes, and one relationship.

## Further reading

- _To be added._
