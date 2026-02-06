// Kanban's own task type (isolated from Convex)
export type KanbanTask = {
  id: string;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  assignee?: string;
  subtasks: KanbanTask[];
};

// Predefined column variants with built-in styling
export type ColumnVariant = "todo" | "in-progress" | "in-review" | "done";

export type KanbanColumnDef = {
  id: string;
  title: string;
  variant: ColumnVariant;
  tasks: KanbanTask[];
};

export type KanbanBoardProps = {
  columns: KanbanColumnDef[];
  className?: string;
};

// Variant styles (used internally by KanbanColumn)
export const columnVariants: Record<
  ColumnVariant,
  { badge: string; column: string }
> = {
  todo: {
    badge: "bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-300",
    column: "bg-gray-100 dark:bg-zinc-900",
  },
  "in-progress": {
    badge: "bg-blue-500 text-white",
    column: "bg-blue-50 dark:bg-blue-950/30",
  },
  "in-review": {
    badge: "bg-purple-500 text-white",
    column: "bg-purple-50 dark:bg-purple-950/30",
  },
  done: {
    badge: "bg-green-500 text-white",
    column: "bg-green-50 dark:bg-green-950/30",
  },
};
