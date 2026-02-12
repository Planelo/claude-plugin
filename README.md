# Planelo Claude Plugin

This plugin integrates Planelo project management into Claude Code.

## Features
- List projects and tasks
- Create and update tasks
- Manage project "brains" (context)
- Built-in MCP server for robust tool integration

## Installation

1. **Host the MCP Server**:
   If you want to run this on your server, copy the `mcp/` directory to your server, run `npm install`, and make sure you can run `node index.js`.

2. **Configure Claude Code**:
   Setting up the API key is easy. You can either set it as an environment variable or provide it when starting Claude:
   ```bash
   export PLANELO_API_KEY=your_key_here
   claude --plugin-dir /path/to/PlaneloClaudePlugin
   ```
   Or if you are hosting the MCP server elsewhere, you can configure it via MCP configuration.

## Usage

- `/planelo:status`: Get an overview of your projects.
- Use natural language to manage tasks, e.g., "Add a new task to IdeaHub: implement offline mode".
- Claude will automatically use the Planelo tools to help you manage your projects.

## Structure
- `.claude-plugin/plugin.json`: Plugin manifest.
- `mcp/`: Node.js MCP server implementation.
- `skills/`: Custom high-level skills.
