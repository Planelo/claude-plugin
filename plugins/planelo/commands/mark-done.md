---
description: Mark a task as complete in Planelo
argument-hint: "<task-id-or-title> [summary]"
---

# Mark Task Done

Mark a task or idea as complete in your Planelo project.

## Usage

**Mark by task ID:**
```
/mark-done abc123
/mark-done abc123 Added validation for email input
```

**Mark by task title (partial match):**
```
/mark-done "Fix login button"
```

## What This Does

- Sets task status to "done"
- Optionally adds a completion summary
- Records when the task was completed
- Updates your project progress

## Tips

- You can add a brief summary of what was accomplished
- Task ID is shown when you list ideas or create a task
- Summary helps track what was actually done
- Completed tasks stay in your project for reference
