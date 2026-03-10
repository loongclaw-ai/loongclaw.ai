---
title: "Generate"
description: "Generate completions"
path: "/docs/api/generate"
order: 1
---

# Generate

Generate a completion.

## Request

```bash
POST /api/generate
```

## Request Body

```json
{
  "model": "literati-7b",
  "prompt": "Your prompt here"
}
```

## Response

```json
{
  "model": "literati-7b",
  "response": "Generated text...",
  "done": true
}
```
