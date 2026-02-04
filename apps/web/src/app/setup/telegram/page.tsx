"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useMutation as useConvexMutation } from "convex/react";
import { Button } from "@clawe/ui/components/button";
import { Input } from "@clawe/ui/components/input";
import { Label } from "@clawe/ui/components/label";
import { Progress } from "@clawe/ui/components/progress";
import { Spinner } from "@clawe/ui/components/spinner";
import { CheckCircle2 } from "lucide-react";
import { api } from "@clawe/backend";
import {
  validateTelegramToken,
  saveTelegramBotToken,
} from "@/lib/openclaw/actions";

const TOTAL_STEPS = 5;
const CURRENT_STEP = 4;

export default function TelegramPage() {
  const router = useRouter();
  const [botToken, setBotToken] = useState("");
  const [botUsername, setBotUsername] = useState<string | null>(null);

  const upsertChannel = useConvexMutation(api.channels.upsert);

  const mutation = useMutation({
    mutationFn: async (token: string) => {
      // First validate the token
      const probeResult = await validateTelegramToken(token);
      if (!probeResult.ok) {
        throw new Error(probeResult.error || "Invalid bot token");
      }

      // Save to OpenClaw config
      const saveResult = await saveTelegramBotToken(token);
      if (!saveResult.ok) {
        throw new Error(saveResult.error.message);
      }

      // Save to Convex
      await upsertChannel({
        type: "telegram",
        status: "connected",
        accountId: probeResult.bot?.username ?? undefined,
      });

      return probeResult.bot?.username ?? null;
    },
    onSuccess: (username) => {
      setBotUsername(username);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(botToken);
  };

  const handleSkip = () => {
    router.push("/setup/complete");
  };

  const handleContinue = () => {
    router.push("/setup/complete");
  };

  // Success state
  if (mutation.isSuccess) {
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

        {/* Success content */}
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
        </div>

        <h1 className="mb-3 text-3xl font-semibold tracking-tight">
          Telegram Connected
        </h1>
        <p className="text-muted-foreground mb-8">
          Your bot <span className="font-medium">@{botUsername}</span> is ready
          to receive messages.
        </p>

        <Button
          size="lg"
          variant="brand"
          className="w-full sm:w-auto"
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    );
  }

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

      {/* Header */}
      <h1 className="mb-3 text-3xl font-semibold tracking-tight">
        Connect Telegram
      </h1>
      <p className="text-muted-foreground mb-8">
        Enter your Telegram bot token to start receiving messages.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="bot-token">Bot Token</Label>
          <Input
            id="bot-token"
            type="password"
            placeholder="123456789:ABCDefGHijKLmnOPqrSTuvWxyZ"
            value={botToken}
            onChange={(e) => setBotToken(e.target.value)}
          />
          <p className="text-muted-foreground text-sm">
            Get your token from{" "}
            <a
              href="https://t.me/BotFather"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              @BotFather
            </a>{" "}
            on Telegram
          </p>
        </div>

        {mutation.error && (
          <p className="text-destructive text-sm">{mutation.error.message}</p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            type="submit"
            size="lg"
            variant="brand"
            className="w-full sm:w-auto"
            disabled={!botToken || mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <Spinner />
                Connecting...
              </>
            ) : (
              "Connect"
            )}
          </Button>
          <Button
            type="button"
            size="lg"
            variant="ghost"
            className="w-full sm:w-auto"
            onClick={handleSkip}
            disabled={mutation.isPending}
          >
            Skip for now
          </Button>
        </div>
      </form>
    </div>
  );
}
