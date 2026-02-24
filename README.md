# Planelo Plugins Marketplace

A marketplace of Claude Code plugins for Planelo project management.

## Available Plugins

### 🚀 [Planelo](./plugins/planelo/)

Seamlessly integrate Planelo project management into your Claude Code workflow. Manage projects, track tasks, and maintain project context without leaving your terminal.

**Features:**
- 🛒 Project management (list, create, edit, archive)
- ✅ Task & idea tracking
- 🧠 Project Brain integration for AI context
- 🤖 Intelligent Planelo Manager agent

---

## Installation

### Prerequisites
- **Claude Code** installed (`npm install -g @anthropic-ai/claude-code`)
- **Planelo API Key** (Get it from your Planelo account settings)

### Step 1: Add Marketplace

```bash
claude /plugin marketplace add Planelo/planelo-plugins
```

### Step 2: Install Plugin

```bash
claude /plugin install planelo@planelo-plugins
```

### Step 3: Set API Key

```bash
export PLANELO_API_KEY=your_api_key_here
```

Then restart Claude Code (`/clear` or exit and restart).

---

## Plugin Details

For detailed information about the Planelo plugin, see [plugins/planelo/README.md](./plugins/planelo/README.md)

---

## Repository Structure

```
planelo-plugins/
├── plugins/              # Anthropic-maintained plugins
│   └── planelo/
│       ├── .claude-plugin/
│       │   └── plugin.json
│       ├── .mcp.json
│       ├── agents/
│       ├── skills/
│       ├── mcp/
│       └── README.md
└── external_plugins/     # Third-party plugins (future)
```

---

## License

See each plugin's directory for license information.
