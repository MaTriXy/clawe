"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { useMemo, type ReactNode } from "react";

export const ConvexClientProvider = ({ children }: { children: ReactNode }) => {
  const convex = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!url) {
      // Return null during build or when Convex is not configured
      return null;
    }
    return new ConvexReactClient(url);
  }, []);

  if (!convex) {
    // Render children without Convex during build/SSR when not configured
    return <>{children}</>;
  }

  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
};
