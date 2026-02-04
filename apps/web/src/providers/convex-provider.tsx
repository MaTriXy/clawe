"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import type { ReactNode } from "react";
import { getConfig } from "@/lib/api/config";

export const ConvexClientProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["config"],
    queryFn: getConfig,
    staleTime: Infinity, // Config doesn't change during session
    retry: false,
  });

  const client = useMemo(() => {
    if (data?.configured && data.config.convexUrl) {
      return new ConvexReactClient(data.config.convexUrl);
    }
    return null;
  }, [data]);

  // /setup/convex is the only page that works without Convex configured
  // (it's where you configure the Convex URL)
  if (pathname === "/setup/convex") {
    return <>{children}</>;
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <div className="text-center">
          <p className="text-destructive">Failed to initialize</p>
          <p className="text-muted-foreground text-sm">
            {error instanceof Error ? error.message : "Unknown error"}
          </p>
        </div>
      </div>
    );
  }

  // Needs Convex setup - redirect to setup
  if (!client) {
    router.replace("/setup/convex");
    return (
      <div className="flex min-h-svh items-center justify-center">
        <div className="text-muted-foreground">Redirecting to setup...</div>
      </div>
    );
  }

  // Ready - provide Convex context
  return <ConvexProvider client={client}>{children}</ConvexProvider>;
};
