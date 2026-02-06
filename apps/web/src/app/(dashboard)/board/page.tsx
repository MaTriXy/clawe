"use client";

import {
  PageHeader,
  PageHeaderRow,
  PageHeaderTitle,
} from "@dashboard/page-header";
import {
  KanbanBoard,
  type KanbanTask,
  type KanbanColumnDef,
} from "@/components/kanban";

// Mock data for demonstration
const mockTasks: KanbanTask[] = [
  {
    id: "1",
    title: "How to Embed a Live ER Diagram Using ChartDB (Quick Guide)",
    description:
      "Write a comprehensive guide on embedding ER diagrams also have some more data please please",
    priority: "high",
    assignee: "Friday",
    subtasks: [
      {
        id: "1-1",
        title: "Research ChartDB documentation",
        priority: "medium",
        description: "Look for embedding options and examples",
        subtasks: [],
      },
      {
        id: "1-2",
        title: "Create code examples",
        priority: "medium",
        subtasks: [],
      },
      {
        id: "1-3",
        title: "Research ChartDB documentation",
        priority: "medium",
        description: "Look for embedding options and examples",
        subtasks: [],
      },
      {
        id: "1-4",
        title: "Create code examples",
        priority: "medium",
        subtasks: [],
      },
      {
        id: "1-5",
        title: "Research ChartDB documentation",
        priority: "medium",
        description: "Look for embedding options and examples",
        subtasks: [],
      },
      {
        id: "1-6",
        title: "Create code examples",
        priority: "medium",
        subtasks: [],
      },
    ],
  },
  {
    id: "2",
    title: "Find Competitor Backlinks",
    description: "Analyze competitor backlink profiles using azimutt.app",
    priority: "high",
    assignee: "Monday",
    subtasks: [],
  },
  {
    id: "3",
    title: "Check the Internal Linking Suggestions",
    priority: "medium",
    subtasks: [],
  },
  {
    id: "4",
    title: "Guest post for differ.blog",
    description: "Write and submit guest post",
    priority: "low",
    subtasks: [],
  },
  {
    id: "5",
    title: "Video Creation Intro walkthrough",
    priority: "medium",
    subtasks: [],
  },
  {
    id: "6",
    title: "Create f5 bot keywords",
    priority: "low",
    subtasks: [],
  },
  {
    id: "7",
    title: "Write Content on How to generate ERD from SQL",
    description: "Detailed tutorial with examples",
    priority: "high",
    assignee: "Friday",
    subtasks: [
      {
        id: "7-1",
        title: "Outline the article structure",
        priority: "high",
        subtasks: [],
      },
      {
        id: "7-2",
        title: "Create SQL examples",
        priority: "medium",
        subtasks: [],
      },
      {
        id: "7-3",
        title: "Add screenshots",
        priority: "low",
        subtasks: [],
      },
    ],
  },
];

// Split tasks by status (for demo, we'll distribute them)
const todoTasks = mockTasks.slice(0, 3);
const inProgressTasks = mockTasks.slice(3, 4);
const inReviewTasks = mockTasks.slice(4, 5);
const doneTasks = mockTasks.slice(5);

const columns: KanbanColumnDef[] = [
  {
    id: "pending",
    title: "To Do",
    variant: "todo",
    tasks: todoTasks,
  },
  {
    id: "in_progress",
    title: "In Progress",
    variant: "in-progress",
    tasks: inProgressTasks,
  },
  {
    id: "in_review",
    title: "In Review",
    variant: "in-review",
    tasks: inReviewTasks,
  },
  {
    id: "completed",
    title: "Done",
    variant: "done",
    tasks: doneTasks,
  },
];

const BoardPage = () => {
  return (
    <>
      <PageHeader>
        <PageHeaderRow>
          <PageHeaderTitle>Kanban Board</PageHeaderTitle>
        </PageHeaderRow>
      </PageHeader>

      <div className="min-h-0 flex-1">
        <KanbanBoard columns={columns} className="h-full" />
      </div>
    </>
  );
};

export default BoardPage;
