---
title: "Spec Workflow"
description: "LoongClaw Spec advanced workflow definition and execution"
path: "/docs/spec"
order: 7
---

# Spec Workflow

Spec is LoongClaw's advanced workflow definition format, using JSON to describe complex execution flows.

## What is Spec

Spec (Specification) is one of LoongClaw's core concepts, used to define:

- **Execution Flow**: Describe the steps of task execution
- **Permission Control**: Define required Capabilities
- **Lifecycle Management**: Set TTL and approval policies
- **Routing Strategy**: Specify execution engine and adapter

## Spec Structure

A complete Spec contains the following main parts:

```json
{
  "pack": {
    "pack_id": "my-pack",
    "domain": "platform",
    "version": "0.1.0",
    "default_route": {
      "harness_kind": "EmbeddedPi",
      "adapter": "pi-local"
    },
    "allowed_connectors": ["webhook"],
    "granted_capabilities": ["InvokeConnector", "InvokeTool"]
  },
  "agent_id": "my-agent",
  "ttl_s": 120,
  "approval": {
    "mode": "disabled"
  },
  "operation": {
    "kind": "tool_search",
    "query": "openrouter",
    "limit": 8
  }
}
```

## Field Details

### pack Object

Defines the basic information of the workflow package:

| Field | Type | Description |
|-------|------|-------------|
| `pack_id` | string | Unique identifier for the workflow package |
| `domain` | string | Domain/namespace the package belongs to |
| `version` | string | Version number, following semantic versioning |
| `default_route` | object | Default execution routing configuration |
| `allowed_connectors` | array | List of allowed connectors |
| `granted_capabilities` | array | List of granted Capabilities |

### default_route Configuration

```json
{
  "default_route": {
    "harness_kind": "EmbeddedPi",
    "adapter": "pi-local"
  }
}
```

| Field | Description |
|-------|-------------|
| `harness_kind` | Execution engine type (EmbeddedPi/RemotePi, etc.) |
| `adapter` | Adapter name |

### agent_id

Unique identifier for the Agent, used for auditing and tracing.

```json
{
  "agent_id": "my-agent"
}
```

### ttl_s

Spec's lifecycle in seconds, automatically cleaned up after expiration.

```json
{
  "ttl_s": 120  // Expires after 2 minutes
}
```

### approval Configuration

Defines the approval policy:

```json
{
  "approval": {
    "mode": "disabled"           // Disable approval
    // or
    "mode": "manual",            // Manual approval
    "approvers": ["admin"],      // List of approvers
    "timeout_s": 60              // Approval timeout
  }
}
```

| Mode | Description |
|------|-------------|
| `disabled` | No approval needed, execute directly |
| `manual` | Requires manual approval |
| `auto` | Auto-approval (based on policy) |

### operation Object

Defines the operation to be executed:

```json
{
  "operation": {
    "kind": "tool_search",
    "query": "openrouter",
    "limit": 8
  }
}
```

## Supported Operation Types

| operation.kind | Description |
|----------------|-------------|
| `tool_search` | Search available tools |
| `runtime_extension` | Runtime extension testing |
| `programmatic_tool_call` | Programmatic tool call orchestration |

## Generate Spec Template

Use the `init-spec` command to generate templates:

```bash
# Generate default template
loongclawd init-spec

# Specify output path
loongclawd init-spec --output my-spec.json

# Specify operation type
loongclawd init-spec --operation tool_search
```

The generated template contains all required fields and default values.

## Execute Spec

### Basic Execution

```bash
loongclawd run-spec --spec examples/spec/tool-search.json
```

### Print Audit Logs

```bash
loongclawd run-spec --spec my-spec.json --print-audit
```

### Custom Parameters

```bash
# Specify working directory
loongclawd run-spec --spec my-spec.json --file-root /path/to/workdir

# Specify session
loongclawd run-spec --spec my-spec.json --session spec-session
```

## Example Specs

### Tool Search

```json
{
  "pack": {
    "pack_id": "tool-search-demo",
    "domain": "platform",
    "version": "0.1.0",
    "default_route": {
      "harness_kind": "EmbeddedPi",
      "adapter": "pi-local"
    },
    "allowed_connectors": ["webhook"],
    "granted_capabilities": ["InvokeConnector", "InvokeTool"]
  },
  "agent_id": "tool-search-agent",
  "ttl_s": 300,
  "approval": {
    "mode": "disabled"
  },
  "operation": {
    "kind": "tool_search",
    "query": "openrouter",
    "limit": 8,
    "include_deferred": true,
    "include_examples": true
  }
}
```

### Programmatic Tool Call

```json
{
  "pack": {
    "pack_id": "tool-call-demo",
    "domain": "automation",
    "version": "0.1.0",
    "default_route": {
      "harness_kind": "EmbeddedPi",
      "adapter": "pi-local"
    },
    "allowed_connectors": [],
    "granted_capabilities": ["InvokeTool"]
  },
  "agent_id": "tool-call-agent",
  "ttl_s": 60,
  "approval": {
    "mode": "disabled"
  },
  "operation": {
    "kind": "programmatic_tool_call",
    "tools": [
      {
        "name": "shell_exec",
        "arguments": {
          "command": "echo",
          "args": ["Hello from Spec"]
        }
      }
    ],
    "sequential": true,
    "continue_on_error": false
  }
}
```

### Runtime Extension Test

```json
{
  "pack": {
    "pack_id": "runtime-ext-demo",
    "domain": "test",
    "version": "0.1.0",
    "default_route": {
      "harness_kind": "EmbeddedPi",
      "adapter": "pi-local"
    },
    "allowed_connectors": [],
    "granted_capabilities": ["RuntimeExtension"]
  },
  "agent_id": "runtime-ext-agent",
  "ttl_s": 180,
  "approval": {
    "mode": "disabled"
  },
  "operation": {
    "kind": "runtime_extension",
    "extension_id": "my-extension",
    "config": {
      "timeout_ms": 5000
    }
  }
}
```

## Workflow Orchestration

### Sequential Execution

```json
{
  "operation": {
    "kind": "programmatic_tool_call",
    "tools": [
      { "name": "tool_a", ... },
      { "name": "tool_b", ... },
      { "name": "tool_c", ... }
    ],
    "sequential": true
  }
}
```

### Parallel Execution

```json
{
  "operation": {
    "kind": "programmatic_tool_call",
    "tools": [
      { "name": "tool_a", ... },
      { "name": "tool_b", ... }
    ],
    "sequential": false
  }
}
```

### Conditional Execution

```json
{
  "operation": {
    "kind": "programmatic_tool_call",
    "tools": [
      {
        "name": "check_status",
        "arguments": { ... },
        "on_success": {
          "then": [{ "name": "proceed", ... }]
        },
        "on_failure": {
          "then": [{ "name": "handle_error", ... }]
        }
      }
    ]
  }
}
```

## Auditing and Tracing

Each Spec execution generates complete audit logs:

```bash
# View audit logs
loongclawd run-spec --spec my-spec.json --print-audit
```

Audit events include:

- **Lifecycle Events**: Created, started, completed, failed
- **Capability Checks**: Permission validation records
- **Tool Invocations**: Input and output of each tool call
- **State Changes**: Changes in Spec state

## Best Practices

### 1. Version Management

Use semantic versioning for Specs:

```json
{
  "pack": {
    "version": "1.2.3"  // Major.Minor.Patch
  }
}
```

### 2. Principle of Least Privilege

Only grant necessary Capabilities:

```json
{
  "pack": {
    "granted_capabilities": ["InvokeTool"]  // Don't grant unnecessary Capabilities
  }
}
```

### 3. Set Reasonable TTL

```json
{
  "ttl_s": 300  // Set appropriate lifecycle based on task complexity
}
```

### 4. Use Approval Workflow

Enable approval in production environments:

```json
{
  "approval": {
    "mode": "manual",
    "approvers": ["team-lead", "admin"],
    "timeout_s": 3600
  }
}
```

### 5. Modular Design

Break complex Specs into multiple small, reusable Specs.

## Troubleshooting

### Spec Validation Failed

```
error: invalid spec: missing required field 'pack.pack_id'
```

**Solution**: Check Spec format and ensure all required fields are filled.

### Capability Denied

```
error: capability denied: InvokeTool not granted
```

**Solution**: Add required Capability in `granted_capabilities`.

### Execution Timeout

```
error: spec execution timeout
```

**Solution**: Increase `ttl_s` value, or optimize operation logic.

### View Audit Logs

```bash
# Detailed audit information
loongclawd run-spec --spec my-spec.json --print-audit --verbose

# Save audit logs to file
loongclawd run-spec --spec my-spec.json --print-audit > audit.log 2>&1
```

## Advanced Usage

### Dynamic Spec Generation

Combine with scripts to dynamically generate Specs:

```bash
#!/bin/bash

QUERY=$1

cat > dynamic-spec.json << EOF
{
  "pack": {
    "pack_id": "dynamic-search",
    "domain": "platform",
    "version": "0.1.0",
    "default_route": {
      "harness_kind": "EmbeddedPi",
      "adapter": "pi-local"
    },
    "allowed_connectors": [],
    "granted_capabilities": ["InvokeTool"]
  },
  "agent_id": "dynamic-agent",
  "ttl_s": 60,
  "approval": {
    "mode": "disabled"
  },
  "operation": {
    "kind": "tool_search",
    "query": "${QUERY}",
    "limit": 10
  }
}
EOF

loongclawd run-spec --spec dynamic-spec.json
```

### Spec Template Reuse

Create base templates and inherit/override:

```json
// base-spec.json
{
  "pack": {
    "domain": "company-platform",
    "version": "1.0.0",
    "default_route": {
      "harness_kind": "EmbeddedPi",
      "adapter": "pi-local"
    }
  },
  "approval": {
    "mode": "manual",
    "approvers": ["manager"]
  }
}
```

```bash
# Merge templates using jq
jq -s '.[0] * .[1]' base-spec.json specific-operation.json > final-spec.json
```
