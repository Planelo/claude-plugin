# Planelo Claude Plugin 🚀

**Seamlessly integrate Planelo project management into your Claude Code workflow.**

This plugin empowers Claude to act as your intelligent project manager. It connects directly to your [Planelo](https://planelo.app/?ref=Github) account, allowing you to manage projects, track tasks, and maintain project context without ever leaving your terminal.

## ✨ Key Features

### 🛒 Project Management
*   **List & Select**: Automatically detects your projects. If you have only one, it auto-selects it. If you have multiple, it asks you which one to work on.
*   **Create & Edit**: Create new projects or update existing details (name, description, color) on the fly.
*   **Archive/Delete**: Remove projects you no longer need.

### ✅ Task & Idea Tracking
*   **Manage Ideas**: List tasks by status (`idea`, `in_progress`, `done`).
*   **Quick Add**: "Remind me to fix the login bug" -> creates a task immediately.
*   **Status Updates**: Move tasks through their lifecycle as you complete them in code.
*   **Cleanup**: Delete tasks that are no longer relevant.

### 🧠 Project Brain Integration
*   **Context Awareness**: Claude can read your project's "Brain" (AI context) to understand architectural decisions and notes.
*   **Knowledge Updates**: Tell Claude to "Update the brain with what we decided about the database," and it will save it to Planelo.

### 🤖 Intelligent Agent
*   **Proactive**: The `Planelo Manager` agent proactively checks for your API key and guides you through setup.
*   **Contextual**: All changes made via this plugin are marked with the source **"Claude Plugin"** in Planelo, so you know exactly where they came from.

---

## 📦 Installation

### Prerequisites
*   **Claude Code** installed (`npm install -g @anthropic-ai/claude-code`)
*   **Planelo API Key** (Get it from your Planelo settings)

### Option 1: Install via Marketplace (Recommended)
Add the Planelo marketplace to your Claude configuration:

```bash
claude /plugin marketplace add Planelo/claude-plugin
claude /plugin install planelo
```

### Option 2: Local Installation (For Development)
Clone this repository and install it directly:

```bash
git clone https://github.com/Planelo/claude-plugin.git
claude /plugin install ./claude-plugin
```

---

## ⚙️ Configuration

Before using the plugin, you must set your Planelo API key as an environment variable.

**Mac/Linux:**
```bash
export PLANELO_API_KEY=your_api_key_here
```

**Windows (PowerShell):**
```powershell
$env:PLANELO_API_KEY="your_api_key_here"
```

*Tip: Add this to your shell profile (`.zshrc` or `.bashrc`) to keep it persistent.*

---

## 💡 Usage Examples

Once installed, simply start talking to Claude about your projects. The `Planelo Manager` agent will activate automatically.

**Starting a session:**
> "Let's work on the iOS app today."
> *(Claude lists tasks for the iOS project)*

**Managing tasks:**
> "Add a new task to implement Dark Mode."
> "Mark the 'Fix crash' task as done."
> "What are my open tasks in the Marketing project?"

**Using Project Brain:**
> "What does the Project Brain say about our color palette?"
> "Update the brain: We are switching our primary database to PostgreSQL."

---

## 🛠 Troubleshooting

**"PLANELO_API_KEY is not set"**
*   Ensure you have exported the key in your terminal session before starting Claude.
*   Restart Claude (`/clear` or exit and restart) after setting the key.

**"Project not found"**
*   Ask Claude to `list projects` to see exactly what IDs and Names are available.

---

## 🏗 Architecture
This plugin uses the **Model Context Protocol (MCP)** to securely bridge Claude Code with the Planelo API.
*   **MCP Server**: Node.js based server (`mcp/index.js`)
*   **Agent**: Custom `Planelo Manager` persona (`agents/manager/AGENT.md`)
*   **Source**: [GitHub Repository](https://github.com/Planelo/claude-plugin)
