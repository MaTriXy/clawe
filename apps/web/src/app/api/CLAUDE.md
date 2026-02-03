# API Routes

Next.js API routes for external integrations, webhooks, and health checks. Core data operations are handled by Convex.

## Structure

```
api/
├── health/
│   └── route.ts        # Health check endpoint
├── webhooks/           # (future) Webhook handlers
│   └── {service}/
│       └── route.ts
└── CLAUDE.md           # This file
```

## Purpose

These API routes handle:

- **Health checks** - `/api/health` for orchestration and monitoring
- **Webhooks** - Receiving callbacks from external services (future)
- **External integrations** - APIs for external systems to interact with Clawe (future)

Core data (agents, tasks, messages) is managed by Convex, not these API routes.

## Conventions

### Route Handlers

Use the App Router convention with `route.ts` files:

```typescript
// app/api/health/route.ts
import { NextResponse } from "next/server";

export const GET = () => {
  return NextResponse.json({ status: "ok" });
};

export const POST = async (request: Request) => {
  const body = await request.json();
  // Handle POST request
  return NextResponse.json({ received: true });
};
```

### Response Format

Always return JSON responses:

```typescript
// Success
return NextResponse.json({ data: result });

// Error
return NextResponse.json({ error: "Something went wrong" }, { status: 400 });
```

### Webhook Handlers

For webhooks, verify signatures when applicable:

```typescript
// app/api/webhooks/stripe/route.ts
export const POST = async (request: Request) => {
  const signature = request.headers.get("stripe-signature");
  // Verify signature before processing
  // ...
};
```

## Code Style

- Use const arrow functions for handlers
- Use named exports (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`)
- Keep handlers thin - delegate complex logic to separate functions
- **Use strong typing** - type request bodies and responses

## Environment Variables

For webhook secrets and external API keys:

```bash
STRIPE_WEBHOOK_SECRET=whsec_...
GITHUB_WEBHOOK_SECRET=...
```

Access via `process.env.VARIABLE_NAME` in route handlers.
