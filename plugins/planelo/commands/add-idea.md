---
description: Quickly add a new task or idea to your Planelo project
argument-hint: "<task-title> [priority: low|medium|high]"
---

# Add Planelo Idea

Quickly capture a new idea or task in Planelo.

## Usage

**Add a simple idea:**
```
/add-idea Fix login button styling
/add-idea Add dark mode support
```

**Add with priority:**
```
/add-idea Critical bug in payment system priority:high
/add-idea Research new testing framework priority:medium
```

## What This Does

- Creates a new task/idea in your active Planelo project
- Sets status to "idea" by default (can be changed)
- Sets priority (low/medium/high)
- Marks source as "Claude Plugin"
- Gives you confirmation with task ID

## Tips

- Use natural language - be descriptive
- If you need more details, add them after creation
- Tasks start as "idea", move to "in_progress" when you begin work
- Use `/mark-done` to complete tasks
