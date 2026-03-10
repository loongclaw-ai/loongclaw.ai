---
title: "Configuration"
description: "Customize loongclaw settings"
path: "/docs/guides/configuration"
order: 2
---

# Configuration

Customize loongclaw settings.

## Configuration File

Located at `~/.claw/config.json`.

## Example Configuration

```json
{
  "model": "literati-7b",
  "temperature": 0.7,
  "top_p": 0.9,
  "context_length": 4096
}
```

## Environment Variables

- `CLAW_HOST` - Server host (default: 127.0.0.1)
- `CLAW_PORT` - Server port (default: 11434)
