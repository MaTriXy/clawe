"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { Button } from "@clawe/ui/components/button";
import { Progress } from "@clawe/ui/components/progress";
import { CheckCircle2 } from "lucide-react";
import { api } from "@clawe/backend";

const TOTAL_STEPS = 5;
const CURRENT_STEP = 5;

export default function CompletePage() {
  const router = useRouter();
  const completeOnboarding = useMutation(api.settings.completeOnboarding);
  const hasCompleted = useRef(false);

  useEffect(() => {
    if (!hasCompleted.current) {
      hasCompleted.current = true;
      completeOnboarding();
    }
  }, [completeOnboarding]);

  return (
    <div className="flex flex-col">
      {/* Progress indicator */}
      <div className="mb-12">
        <Progress
          value={(CURRENT_STEP / TOTAL_STEPS) * 100}
          className="h-1 w-64"
          indicatorClassName="bg-brand"
        />
      </div>

      {/* Success icon */}
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
        <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
      </div>

      {/* Header */}
      <h1 className="mb-3 text-3xl font-semibold tracking-tight">
        You&apos;re all set!
      </h1>
      <p className="text-muted-foreground mb-8">
        Your AI agent is ready to go. You can now manage your tasks and
        communicate with your agent through Telegram.
      </p>

      {/* Action */}
      <Button
        size="lg"
        variant="brand"
        className="w-full sm:w-auto"
        onClick={() => router.push("/board")}
      >
        Go to Board
      </Button>
    </div>
  );
}
