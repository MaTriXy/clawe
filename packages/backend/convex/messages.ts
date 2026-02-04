import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 100;
    return await ctx.db
      .query("messages")
      .withIndex("by_created")
      .order("desc")
      .take(limit);
  },
});

export const listByAgent = query({
  args: {
    agentId: v.id("agents"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 100;
    return await ctx.db
      .query("messages")
      .withIndex("by_agent", (q) => q.eq("agentId", args.agentId))
      .order("desc")
      .take(limit);
  },
});

export const listByTask = query({
  args: {
    taskId: v.id("tasks"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 100;
    return await ctx.db
      .query("messages")
      .withIndex("by_task", (q) => q.eq("taskId", args.taskId))
      .order("desc")
      .take(limit);
  },
});

export const get = query({
  args: { id: v.id("messages") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    agentId: v.id("agents"),
    taskId: v.optional(v.id("tasks")),
    type: v.union(
      v.literal("chat"),
      v.literal("thought"),
      v.literal("action"),
      v.literal("result"),
      v.literal("error"),
    ),
    content: v.string(),
    metadata: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("messages", {
      agentId: args.agentId,
      taskId: args.taskId,
      type: args.type,
      content: args.content,
      metadata: args.metadata,
      createdAt: Date.now(),
    });
  },
});

export const remove = mutation({
  args: { id: v.id("messages") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const removeByAgent = mutation({
  args: { agentId: v.id("agents") },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_agent", (q) => q.eq("agentId", args.agentId))
      .collect();
    for (const message of messages) {
      await ctx.db.delete(message._id);
    }
  },
});

export const removeByTask = mutation({
  args: { taskId: v.id("tasks") },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_task", (q) => q.eq("taskId", args.taskId))
      .collect();
    for (const message of messages) {
      await ctx.db.delete(message._id);
    }
  },
});
