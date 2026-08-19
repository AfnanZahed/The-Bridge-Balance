---
sidebar_label: "2. Core Programming"
sidebar_position: 3
title: "02 — Core Programming (Python & JavaScript)"
description: "Variables, conditionals, loops, functions, file handling, error handling in Python and JavaScript."
keywords: [python, javascript, variables, loops, functions, error handling]
chapter_state: "placeholder"
video_url: ""
---

# 02 — Core Programming (Python & JavaScript)

> **Core idea:** the agent can write the code — your job is to read it and know when it's wrong.

## Lecture outline

<!-- Placeholder shell. Paste the lecture outline here. -->

- [ ] Variables, types, and assignment
- [ ] Conditionals (`if` / `else` / `switch`)
- [ ] Loops (`for` / `while`) and iteration
- [ ] Functions and parameters
- [ ] File handling (read / write / append)
- [ ] Error handling (try / except / catch)
- [ ] Reading code: the five things to scan first

## Lecture content

> _Awaiting video lecture._

```text
[Lecture transcript goes here.]
```

## Code snippets

```python
# Python: a function that reads a file safely
def read_file(path: str) -> str:
    try:
        with open(path, "r", encoding="utf-8") as f:
            return f.read()
    except FileNotFoundError:
        return ""
```

```javascript
// JavaScript: the same idea
async function readFile(path) {
  try {
    return await fs.promises.readFile(path, "utf8");
  } catch (err) {
    if (err.code === "ENOENT") return "";
    throw err;
  }
}
```

## Check your understanding

1. What's the difference between a `for` loop and a `while` loop? When do you pick one over the other?
2. Why is `try`/`except` better than ignoring errors silently?
3. Open any file in this repo. Identify the function signature, the loop, and the error handling.

## Further reading

- _To be added._
