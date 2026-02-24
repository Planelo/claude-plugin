---
description: Set up Planelo API key and configure the plugin for first use
argument-hint: "[api-key]"
allowed-tools: []
---

# Planelo Setup

Interactive guide to set up your Planelo API key and configure the plugin.

## Setup Steps

1. **Check Current Status**
   - If you already have `PLANELO_API_KEY` set in your environment, it will be recognized automatically.
   - You can verify this by checking if the Planelo Manager activates when you start a new session.

2. **Get Your API Key**
   - Go to your Planelo account: https://planelo.app/settings/api
   - Copy your API key from the settings

3. **Set the Environment Variable**

   **For Mac/Linux (temporary - lasts until terminal closes):**
   ```bash
   export PLANELO_API_KEY=your_api_key_here
   ```

   **For Mac/Linux (permanent - add to shell profile):**
   ```bash
   # Add this line to ~/.zshrc or ~/.bashrc
   export PLANELO_API_KEY=your_api_key_here

   # Then reload:
   source ~/.zshrc  # or source ~/.bashrc
   ```

   **For Windows (PowerShell):**
   ```powershell
   $env:PLANELO_API_KEY="your_api_key_here"
   ```

4. **Restart Claude Code**
   - Run `/clear` or close and reopen Claude Code
   - The Planelo Manager will activate automatically

5. **Verify Setup**
   - Start a new conversation in Claude Code
   - The Planelo Manager should greet you and ask about your projects
   - If you see project information, setup is complete! ✅

## Troubleshooting

- **"API key not found"**: Make sure you've set `PLANELO_API_KEY` and restarted Claude Code
- **Still not working?**: Double-check the API key by visiting https://planelo.app/settings/api
- **Multiple projects?**: The plugin will ask you which project to work on

## Next Steps

Once configured, you can:
- Ask Claude to "list my Planelo projects"
- Create new tasks by saying "add a task to track..."
- Update project status and track progress
- Use your project's Brain for AI context
