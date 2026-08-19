---
sidebar_label: "4. Backend"
sidebar_position: 5
title: "04 — Backend"
description: "APIs, HTTP, REST, validation, middleware, logging."
keywords: [backend, api, http, rest, validation, middleware, logging]
chapter_state: "placeholder"
video_url: ""
---

# 04 — Backend

> **Core idea:** a backend is a contract. Inputs in, outputs out, errors named.

## Lecture outline

<!-- Placeholder shell. Paste the lecture outline here. -->

- [ ] HTTP: methods, status codes, headers, body
- [ ] REST: resources, routes, idempotency
- [ ] Validation: at the edge, never trust the input
- [ ] Middleware: auth, logging, rate limits, CORS
- [ ] Logging: structured, request-id correlated
- [ ] Reading a backend: route → handler → service → store

## Lecture content

> _Awaiting video lecture._

```text
[Lecture transcript goes here.]
```

## Worked example

```python
# FastAPI: a tiny endpoint with validation and logging
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class Note(BaseModel):
    title: str
    body: str

@app.post("/notes")
def create_note(note: Note):
    if len(note.title) > 200:
        raise HTTPException(status_code=422, detail="title too long")
    # ... persist + return
    return {"id": "new", "title": note.title}
```

## Check your understanding

1. What's the difference between `400` and `422`?
2. Why is validation at the edge safer than validation deep in the call stack?
3. Open any backend project. Trace one request from route handler to database.

## Further reading

- _To be added._
