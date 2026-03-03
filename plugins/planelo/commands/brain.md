---
description: Read or update your project's AI context (Project Brain)
argument-hint: "[read|update] [content]"
---

# Planelo Project Brain

Access your project's AI context for storing architectural decisions, technical notes, and important context.

## Usage

**Read project brain:**
```
/brain read
/brain
```

**Update project brain:**
```
/brain update We're using PostgreSQL for the database, Node.js for backend, React for frontend
```

**Add to existing brain:**
```
/brain update Previous context... NEW NOTE: Added payment integration with Stripe
```

## What Project Brain Stores

- Architectural decisions
- Technology stack notes
- Important context for AI
- Technical implementation details
- Setup instructions
- Known limitations or gotchas
- API specifications
- Integration notes

## Tips

- Brain content is private to your project
- Use it to maintain context across sessions
- Great for explaining why certain decisions were made
- Keep it updated as your project evolves
- Claude reads this before deep discussions to understand context

## Example

```
/brain update
Project: TestersHub
Stack: Node.js + Express (backend), React (frontend), PostgreSQL (database)
Key Features:
- Reward system for app testers
- Real-time notifications via Socket.io
- Multi-step onboarding flow
- App submission and review process

Important: Use 'Claude Plugin' as source for all database changes
```
