# AGENTS.md

## Project Direction

This project is part of Simple Work Tools, a small open-source tool series for freelancers, creators, and small studios.

The goal is to build low-friction, no-login, frontend-only tools that help users complete everyday administrative and communication tasks faster.

This project should remain focused only on the service scope confirmation generator.

## Product Boundary

This tool is not a contract generator.

This tool does not provide legal advice.

The generated content is only for communication and project scope confirmation.

## Do Not Add

Do not add these unless explicitly requested:

- login
- user accounts
- backend
- database
- AI API
- CRM features
- project management dashboard
- cloud sync
- online signature
- formal contract generation
- legal advice
- legal clause library
- multi-user collaboration
- complex template marketplace
- unnecessary animations
- heavy UI frameworks

## Language

The user interface should use Traditional Chinese.

## Design Style

Keep the design clean, practical, and document-like.

Prefer:

- white background
- dark gray text
- clear form fields
- printable document preview
- calm spacing
- simple lines
- A4-friendly output

Avoid over-designed startup styling, heavy gradients, complicated interactions, and excessive animation.

## Technical Direction

Use:

- Vite
- React
- TypeScript
- pure frontend
- localStorage
- print CSS

Avoid large dependencies unless necessary.

## Required Series Pattern

For Simple Work Tools, keep party information aligned:

- provider / client fields should use the same row structure
- blank fields should keep placeholder spacing in preview when needed

Include support and sharing information:

- share button
- copy share link
- Boba sponsor button

## Validation

Before finalizing changes, run:

```bash
npm run build
```

If lint is configured, run:

```bash
npm run lint
```

Do not introduce TypeScript errors, runtime errors for empty fields, or localStorage failures.
