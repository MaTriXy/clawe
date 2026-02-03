"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@clawe/ui/components/button";
import { Input } from "@clawe/ui/components/input";
import { Label } from "@clawe/ui/components/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@clawe/ui/components/alert-dialog";
import { useSquad } from "@/providers/squad-provider";

export const DeleteSquad = () => {
  const { selectedSquad } = useSquad();
  const [confirmText, setConfirmText] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  if (!selectedSquad) {
    return null;
  }

  const canDelete = confirmText === selectedSquad.name;

  const handleDelete = () => {
    if (!canDelete) return;
    // TODO: Implement squad deletion
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setConfirmText("");
    }
  };

  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950/50">
      <div className="flex items-start gap-4">
        <div className="rounded-full bg-red-100 p-2 dark:bg-red-900">
          <AlertTriangle className="size-5 text-red-600 dark:text-red-400" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-red-900 dark:text-red-100">
            Delete squad
          </h3>
          <p className="text-muted-foreground mt-1 text-sm">
            Permanently delete this squad and all of its data, including agents
            and tasks. This action cannot be undone.
          </p>
          <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" className="mt-4">
                Delete squad
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete squad?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete{" "}
                  <span className="text-foreground font-semibold">
                    {selectedSquad.name}
                  </span>{" "}
                  and all of its agents and tasks. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="space-y-2">
                <Label htmlFor="confirm">
                  Type{" "}
                  <span className="font-semibold">{selectedSquad.name}</span> to
                  confirm
                </Label>
                <Input
                  id="confirm"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder={selectedSquad.name}
                  autoComplete="off"
                />
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={!canDelete}
                >
                  Delete squad
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};
