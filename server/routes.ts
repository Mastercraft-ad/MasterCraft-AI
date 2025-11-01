import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertToolSchema, insertVoteSchema, insertCommentSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all tools with optional filtering and pagination
  app.get("/api/tools", async (req, res) => {
    try {
      const { category, sortBy, page = "1", limit = "12" } = req.query;
      
      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);
      const offset = (pageNum - 1) * limitNum;
      
      const tools = await storage.getTools({
        category: category as string | undefined,
        sortBy: sortBy as 'newest' | 'most-voted' | 'trending' | undefined,
        limit: limitNum,
        offset,
      });
      
      const total = await storage.getToolsCount(category as string | undefined);
      
      res.json({
        tools,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum),
        },
      });
    } catch (error) {
      console.error("Error fetching tools:", error);
      res.status(500).json({ error: "Failed to fetch tools" });
    }
  });

  // Get a single tool by ID
  app.get("/api/tools/:id", async (req, res) => {
    try {
      const tool = await storage.getTool(req.params.id);
      
      if (!tool) {
        return res.status(404).json({ error: "Tool not found" });
      }
      
      res.json(tool);
    } catch (error) {
      console.error("Error fetching tool:", error);
      res.status(500).json({ error: "Failed to fetch tool" });
    }
  });

  // Create a new tool
  app.post("/api/tools", async (req, res) => {
    try {
      const validatedData = insertToolSchema.parse(req.body);
      
      const tool = await storage.createTool(validatedData);
      
      res.status(201).json(tool);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid tool data", details: error.errors });
      }
      console.error("Error creating tool:", error);
      res.status(500).json({ error: "Failed to create tool" });
    }
  });

  // Update a tool
  app.patch("/api/tools/:id", async (req, res) => {
    try {
      const updates = req.body;
      
      const tool = await storage.updateTool(req.params.id, updates);
      
      if (!tool) {
        return res.status(404).json({ error: "Tool not found" });
      }
      
      res.json(tool);
    } catch (error) {
      console.error("Error updating tool:", error);
      res.status(500).json({ error: "Failed to update tool" });
    }
  });

  // Delete a tool
  app.delete("/api/tools/:id", async (req, res) => {
    try {
      await storage.deleteTool(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting tool:", error);
      res.status(500).json({ error: "Failed to delete tool" });
    }
  });

  // Get user's votes
  app.get("/api/votes/user/:userId", async (req, res) => {
    try {
      const votes = await storage.getUserVotes(req.params.userId);
      res.json(votes);
    } catch (error) {
      console.error("Error fetching user votes:", error);
      res.status(500).json({ error: "Failed to fetch votes" });
    }
  });

  // Toggle vote on a tool
  app.post("/api/tools/:toolId/vote", async (req, res) => {
    try {
      const { toolId } = req.params;
      const { userId } = req.body;
      
      if (!userId) {
        return res.status(400).json({ error: "userId is required" });
      }
      
      const existingVote = await storage.getVote(toolId, userId);
      
      if (existingVote) {
        await storage.deleteVote(toolId, userId);
        res.json({ voted: false });
      } else {
        const validatedData = insertVoteSchema.parse({ toolId, userId });
        await storage.createVote(validatedData);
        res.json({ voted: true });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid vote data", details: error.errors });
      }
      console.error("Error toggling vote:", error);
      res.status(500).json({ error: "Failed to toggle vote" });
    }
  });

  // Get comments for a tool
  app.get("/api/tools/:toolId/comments", async (req, res) => {
    try {
      const comments = await storage.getComments(req.params.toolId);
      res.json(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({ error: "Failed to fetch comments" });
    }
  });

  // Create a comment
  app.post("/api/tools/:toolId/comments", async (req, res) => {
    try {
      const { toolId } = req.params;
      const { userId, content } = req.body;
      
      const validatedData = insertCommentSchema.parse({ toolId, userId, content });
      
      const comment = await storage.createComment(validatedData);
      
      res.status(201).json(comment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid comment data", details: error.errors });
      }
      console.error("Error creating comment:", error);
      res.status(500).json({ error: "Failed to create comment" });
    }
  });

  // Delete a comment
  app.delete("/api/comments/:id", async (req, res) => {
    try {
      await storage.deleteComment(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting comment:", error);
      res.status(500).json({ error: "Failed to delete comment" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
