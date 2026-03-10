---
title: "Chat"
description: "Chat completions API"
path: "/docs/api/chat"
order: 2
---

# Chat

Generate chat completions.

## Request

```bash
POST /api/chat
```

## Request Body

```json
{
  "model": "literati-7b",
  "messages": [
    {"role": "user", "content": "Hello!"}
  ]
}
```

## Response

```json
{
  "model": "literati-7b",
  "message": {
    "role": "assistant",
    "content": "Hello! How can I help you today?"
  },
  "done": true
}
```
