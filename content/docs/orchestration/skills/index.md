---
title: "Skills & ACP"
description: "External skills system and Agent Control Plane"
path: "/docs/orchestration/skills"
order: 8
---

# Skills & ACP

LoongClaw provides an external skills system and Agent Control Plane (ACP) for advanced workflows.

## External Skills

External skills extend LoongClaw's capabilities with custom functionality.

### Configuration

```toml
[external_skills]
enabled = false
require_download_approval = true
allowed_domains = []
blocked_domains = []
install_root = ""
auto_expose_installed = false
```

| Option | Default | Description |
|--------|---------|-------------|
| `enabled` | `false` | Enable external skills |
| `require_download_approval` | `true` | Require approval for downloads |
| `allowed_domains` | `[]` | Allowed skill domains |
| `blocked_domains` | `[]` | Blocked skill domains |
| `install_root` | - | Installation directory |
| `auto_expose_installed` | `false` | Auto-expose installed skills |

### Managing Skills

```bash
# List installed skills
loongclaw skills list

# Show skill details
loongclaw skills info <skill-id>

# Install skill from directory
loongclaw skills install ./my-skill

# Install bundled skill
loongclaw skills install-bundled browser-preview

# Remove skill
loongclaw skills remove <skill-id>
```

### Skills Policy

Manage the runtime policy for external skills:

```bash
# Show current policy
loongclaw skills policy get

# Update policy
loongclaw skills policy set \
  --enabled true \
  --allow-domain github.com \
  --approve-policy-update

# Reset to defaults
loongclaw skills policy reset --approve-policy-update
```

### Policy Options

| Flag | Description |
|------|-------------|
| `--enabled` | Enable/disable external skills |
| `--require-download-approval` | Require approval for downloads |
| `--auto-expose-installed` | Auto-expose installed skills |
| `--allow-domain` | Add allowed domain |
| `--clear-allowed-domains` | Clear allowed domains |
| `--block-domain` | Add blocked domain |
| `--clear-blocked-domains` | Clear blocked domains |

### Browser Preview

Enable browser preview functionality:

```bash
loongclaw skills enable-browser-preview
```

## Agent Control Plane (ACP)

ACP provides advanced orchestration for agent workflows.

### Configuration

```toml
[acp]
enabled = false
backend = ""
default_agent = "codex"
allowed_agents = []
max_concurrent_sessions = 10
session_idle_ttl_ms = 600000
startup_timeout_ms = 60000
turn_timeout_ms = 300000
bindings_enabled = false
emit_runtime_events = false
```

| Option | Default | Description |
|--------|---------|-------------|
| `enabled` | `false` | Enable ACP |
| `backend` | - | Backend ID |
| `default_agent` | `"codex"` | Default agent |
| `allowed_agents` | `[]` | Allowed agent IDs |
| `max_concurrent_sessions` | `10` | Maximum concurrent sessions |
| `session_idle_ttl_ms` | `600000` | Session idle timeout |
| `startup_timeout_ms` | `60000` | Startup timeout |
| `turn_timeout_ms` | `300000` | Turn timeout |
| `bindings_enabled` | `false` | Enable bindings |
| `emit_runtime_events` | `false` | Emit runtime events |

### ACP Dispatch

```toml
[acp.dispatch]
enabled = true
conversation_routing = "per_channel"
allowed_channels = []
allowed_account_ids = []
bootstrap_mcp_servers = []
working_directory = ""
```

### ACP Backends

Configure backend for ACP:

```toml
[acp.backends.acpx]
enabled = true

[acp.backends.acpx.mcp_server]
command = "/path/to/mcp-server"
args = []
env = {}
```

### Using ACP

Enable ACP in chat:

```bash
# Start chat with ACP
loongclaw chat --acp

# With event streaming
loongclaw chat --acp --acp-event-stream

# With MCP servers
loongclaw chat --acp --acp-bootstrap-mcp-server "http://localhost:8080/mcp"

# With working directory
loongclaw chat --acp --acp-cwd /path/to/project
```

### ACP Commands

```bash
# List ACP backends
loongclaw list-acp-backends --json

# List ACP sessions
loongclaw list-acp-sessions --json

# Show session status
loongclaw acp-status --session my-session

# Show observability data
loongclaw acp-observability --json

# Show event summary
loongclaw acp-event-summary --session my-session

# Evaluate dispatch policy
loongclaw acp-dispatch --channel telegram

# Run diagnostics
loongclaw acp-doctor --backend http
```

### Channel ACP Configuration

Enable ACP for specific channels:

```toml
[telegram.acp]
bootstrap_mcp_servers = []
working_directory = "/home/user/workspace"

[feishu.acp]
bootstrap_mcp_servers = []
working_directory = "/home/user/workspace"
```

## Runtime Snapshots

Create and restore runtime state for reproducibility.

### Create Snapshot

```bash
# Create snapshot
loongclaw runtime-snapshot \
  --label "baseline" \
  --output snapshot.json

# With experiment ID
loongclaw runtime-snapshot \
  --label "experiment-1" \
  --experiment-id "exp-001" \
  --output snapshot.json
```

### Restore Snapshot

```bash
# Preview restore (dry-run)
loongclaw runtime-restore --snapshot snapshot.json

# Apply restore
loongclaw runtime-restore --snapshot snapshot.json --apply
```

## Runtime Experiments

Track experiments and their results.

### Start Experiment

```bash
loongclaw runtime-experiment start \
  --snapshot baseline.json \
  --output experiment.json \
  --mutation-summary "Added feature X"
```

### Finish Experiment

```bash
loongclaw runtime-experiment finish \
  --run experiment.json \
  --result-snapshot result.json \
  --decision approve
```

### View Experiment

```bash
# Show experiment details
loongclaw runtime-experiment show --run experiment.json

# Compare with snapshot
loongclaw runtime-experiment compare --run experiment.json --snapshot baseline.json

# Restore experiment state
loongclaw runtime-experiment restore --run experiment.json --stage baseline --apply
```

## Runtime Capabilities

Propose and review capability changes.

### Propose Capability

```bash
loongclaw runtime-capability propose \
  --run experiment.json \
  --output capability.json \
  --target model
```

### Review Capability

```bash
loongclaw runtime-capability review \
  --candidate capability.json \
  --decision approve
```

### View Capability

```bash
loongclaw runtime-capability show --candidate capability.json
```

## Safe Lane

Monitor safe lane execution.

```bash
# Show event summary
loongclaw safe-lane-summary --session my-session

# JSON output
loongclaw safe-lane-summary --session my-session --json
```

## Troubleshooting

### Skills Not Loading

**Check:**
1. Skills enabled in configuration
2. Domain not blocked
3. Install path exists

```bash
loongclaw skills list --json
```

### ACP Not Working

**Check:**
1. ACP enabled in configuration
2. Backend configured
3. Run diagnostics

```bash
loongclaw acp-doctor --json
```

### Snapshot Restore Failed

**Check:**
1. Snapshot file exists and is valid
2. Target configuration is compatible
3. Use `--apply` flag to actually apply changes