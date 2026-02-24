---
description: Set up Planelo API key for Claude Code plugin
---

# Planelo Setup

Guide the user through setting up the Planelo API key for the Claude Code plugin.

## Setup Flow:

1. **Check if API key exists**: Try to run `planelo:list_projects` tool. If it succeeds, API key is already set.

2. **If API key is missing**:
   - Explain that they need a Planelo API key to use this plugin
   - Direct them to: https://planelo.app/settings/api (or their Planelo account settings)
   - Provide clear instructions:
     ```bash
     export PLANELO_API_KEY=your_api_key_here
     ```
   - For persistent setup, suggest adding to shell profile:
     ```bash
     # Add to ~/.zshrc or ~/.bashrc
     export PLANELO_API_KEY=your_api_key_here
     ```

3. **After setting the key**:
   - Ask them to restart Claude Code (`/clear` or close and reopen)
   - Once restarted, run `planelo:list_projects` to verify it works
   - Congratulate them and ask which project they want to work on

## Tips:
- Be encouraging and helpful
- Link directly to their Planelo settings page if possible
- Offer to help with the next steps (selecting project, etc.)
