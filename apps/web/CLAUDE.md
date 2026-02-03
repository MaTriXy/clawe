# Web App

Next.js 16 with App Router.

## Commands

```bash
pnpm dev          # Dev server on port 3000
pnpm build        # Production build
pnpm check-types  # TypeScript check
```

## Structure

```
src/app/                              # App Router pages
src/app/api/                          # API routes (health, webhooks, integrations)
src/app/(dashboard)/                  # Dashboard routes (layout group)
src/app/(dashboard)/_components/      # Dashboard-wide components (use @dashboard/ alias)
src/components/                       # Global shared components
src/hooks/                            # Custom React hooks
src/providers/                        # Context providers (Convex, Query, Theme)
```

**Path aliases:**

- `@/*` → `src/*`
- `@dashboard/*` → `src/app/(dashboard)/_components/*`

## Data Fetching

### Convex (Core Data - Real-time)

Use for agents, tasks, messages - data that needs real-time sync:

```tsx
"use client";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

const agents = useQuery(api.agents.list); // Real-time subscribed
const createAgent = useMutation(api.agents.create);
```

- `useQuery` returns `undefined` while loading
- Data updates automatically - no cache invalidation needed

### React Query (External APIs)

Use for external service calls:

```tsx
"use client";
import { useQuery } from "@tanstack/react-query";

const { data } = useQuery({
  queryKey: ["external-data"],
  queryFn: () => fetch("https://api.example.com/data").then((r) => r.json()),
});
```

## Shared Types

Import DTO types from `@clawe/shared`:

```tsx
import type { Agent, Task, Message } from "@clawe/shared";
```

**Environment variables:**

- `NEXT_PUBLIC_CONVEX_URL` → Convex deployment URL

## Adding Routes

1. Create `app/(dashboard)/route-name/page.tsx`
2. Add nav item in `_components/dashboard-sidebar.tsx`:
   ```tsx
   { title: "Name", url: "/route-name", icon: IconName }
   ```

## Patterns

- Write clean, readable code - prioritize clarity over cleverness
- Extract reusable components when patterns repeat
- **Use strong typing** - use generic types from libraries (`useState<T>`); avoid `any` and `as` casts
- **Use shadcn Tooltip, not native `title`** - for hover hints, use `@clawe/ui/components/tooltip`
- Route groups: `(dashboard)/emails/` → URL is `/emails`
- Server components by default, add `"use client"` only when needed (required for Convex hooks)
- Pages export `default function`
- Content scrolls in ScrollArea, header stays fixed
- **Use hooks for side effects, not components** - never create components that return `null` just to run an effect; use a custom hook instead
- **Convex data** - no manual cache invalidation needed, data syncs automatically
- **React Query cache** - use `invalidateQueries` after mutations for API calls
- **Button loading states** - replace icon with `<Spinner />` from `@clawe/ui/components/spinner`, update text (e.g., "Creating..."), and disable
- **Conditional classNames** - always use `cn()` for merging classes: `cn(baseStyles, { "conditional-class": condition })`
- **Verify library APIs are current** - check official docs for deprecated/legacy patterns before implementing

## Component Structure

- **One component per file** - never put multiple components in the same file (includes page.tsx)
- **Page-specific components** - create `_components/` subdirectory in the route folder:
  ```
  app/(dashboard)/agents/
  ├── page.tsx
  └── _components/
      ├── agents-list.tsx
      ├── agent-card.tsx
      └── empty-state.tsx
  ```
- **Use const arrow functions** for components, not function declarations:

  ```tsx
  // ✓ Correct
  export const MyComponent = ({ ... }: Props) => { ... };

  // ✗ Incorrect
  export function MyComponent({ ... }) { ... }
  ```

- **Props typing** - use base types directly, only create named interface when adding custom props:

  ```tsx
  // ✓ No custom props - use base type directly
  export const PageHeader = ({
    className,
    children,
    ...props
  }: React.ComponentProps<"div">) => { ... };

  // ✓ Custom props - create interface
  export interface PageHeaderTabProps extends React.ComponentProps<"button"> {
    active?: boolean;
  }

  export const PageHeaderTab = ({ active, ...props }: PageHeaderTabProps) => { ... };

  // ✗ Don't create empty type aliases
  export type PageHeaderProps = React.ComponentProps<"div">;
  ```

- **Multi-component features**: Create a directory with an `index.ts` barrel export
  ```
  app/(dashboard)/_components/page-header/
  ├── page-header.tsx
  ├── page-header-row.tsx
  ├── page-header-title.tsx
  └── index.ts          # Re-exports all components
  ```
  Import with: `import { PageHeader } from "@dashboard/page-header"`

## Active Nav Styling

```
Light: text-yellow-600, hover bg-yellow-600/5
Dark:  text-amber-400, hover bg-amber-400/5
```
