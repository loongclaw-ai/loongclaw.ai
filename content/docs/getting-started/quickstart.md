---
title: "Quick Start"
description: "Run your first model in 5 minutes"
path: "/docs/quickstart"
order: 2
---

# Quick Start

Pull your first model and start chatting.

## Pull a Model

```bash
claw pull literati-7b
```

## Start Chatting

```bash
claw run
```

## Try the API

```bash
curl http://localhost:11434/api/generate -d '{
  "model": "literati-7b",
  "prompt": "Hello, how are you?"
}'
```

## Next Steps

- Learn about [model management](/docs/guides/model-management)
- Explore the [API reference](/docs/api)
