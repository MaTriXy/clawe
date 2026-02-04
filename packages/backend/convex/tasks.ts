import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
  },
});

export const listByStatus = query({
  args: {
    status: v.union(
      v.literal("pending"),
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("failed"),
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("tasks")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .collect();
  },
});

export const listByAgent = query({
  args: { agentId: v.id("agents") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("tasks")
      .withIndex("by_agent", (q) => q.eq("assignedAgentId", args.agentId))
      .collect();
  },
});

export const listSubtasks = query({
  args: { parentTaskId: v.id("tasks") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("tasks")
      .withIndex("by_parent", (q) => q.eq("parentTaskId", args.parentTaskId))
      .collect();
  },
});

export const get = query({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    parentTaskId: v.optional(v.id("tasks")),
    metadata: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("tasks", {
      title: args.title,
      description: args.description,
      status: "pending",
      priority: args.priority,
      parentTaskId: args.parentTaskId,
      metadata: args.metadata,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const assign = mutation({
  args: {
    id: v.id("tasks"),
    agentId: v.id("agents"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      assignedAgentId: args.agentId,
      status: "in_progress",
      updatedAt: Date.now(),
    });
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("tasks"),
    status: v.union(
      v.literal("pending"),
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("failed"),
    ),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const updates: Record<string, unknown> = {
      status: args.status,
      updatedAt: now,
    };
    if (args.status === "completed") {
      updates.completedAt = now;
    }
    await ctx.db.patch(args.id, updates);
  },
});

export const update = mutation({
  args: {
    id: v.id("tasks"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    priority: v.optional(
      v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    ),
    metadata: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([, value]) => value !== undefined),
    );
    await ctx.db.patch(id, {
      ...filteredUpdates,
      updatedAt: Date.now(),
    });
  },
});

export const remove = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
