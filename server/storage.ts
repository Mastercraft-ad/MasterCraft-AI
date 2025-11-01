import { db } from "./db";
import { users, tools, votes, comments } from "@shared/schema";
import { type User, type InsertUser, type Tool, type InsertTool, type Vote, type InsertVote, type Comment, type InsertComment } from "@shared/schema";
import { eq, desc, sql, and } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Tools
  getTools(options?: { category?: string; sortBy?: 'newest' | 'most-voted' | 'trending'; limit?: number; offset?: number }): Promise<Tool[]>;
  getTool(id: string): Promise<Tool | undefined>;
  createTool(tool: InsertTool): Promise<Tool>;
  updateTool(id: string, updates: Partial<InsertTool>): Promise<Tool | undefined>;
  deleteTool(id: string): Promise<void>;
  getToolsCount(category?: string): Promise<number>;
  
  // Votes
  getVote(toolId: string, userId: string): Promise<Vote | undefined>;
  createVote(vote: InsertVote): Promise<Vote>;
  deleteVote(toolId: string, userId: string): Promise<void>;
  getUserVotes(userId: string): Promise<Vote[]>;
  
  // Comments
  getComments(toolId: string): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;
  deleteComment(id: string): Promise<void>;
}

export class DbStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Tools
  async getTools(options: { category?: string; sortBy?: 'newest' | 'most-voted' | 'trending'; limit?: number; offset?: number } = {}): Promise<Tool[]> {
    const { category, sortBy = 'trending', limit = 50, offset = 0 } = options;
    
    let whereConditions = [eq(tools.status, 'approved')];
    
    if (category) {
      whereConditions.push(sql`${category} = ANY(${tools.categories})`);
    }
    
    const orderByClause = sortBy === 'newest' ? desc(tools.createdAt) : desc(tools.votes);
    
    return await db
      .select()
      .from(tools)
      .where(and(...whereConditions))
      .orderBy(orderByClause)
      .limit(limit)
      .offset(offset);
  }

  async getTool(id: string): Promise<Tool | undefined> {
    const result = await db.select().from(tools).where(eq(tools.id, id)).limit(1);
    return result[0];
  }

  async createTool(insertTool: InsertTool): Promise<Tool> {
    const result = await db.insert(tools).values(insertTool).returning();
    return result[0];
  }

  async updateTool(id: string, updates: Partial<InsertTool>): Promise<Tool | undefined> {
    const result = await db.update(tools).set(updates).where(eq(tools.id, id)).returning();
    return result[0];
  }

  async deleteTool(id: string): Promise<void> {
    await db.delete(tools).where(eq(tools.id, id));
  }

  async getToolsCount(category?: string): Promise<number> {
    let whereConditions = [eq(tools.status, 'approved')];
    
    if (category) {
      whereConditions.push(sql`${category} = ANY(${tools.categories})`);
    }
    
    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(tools)
      .where(and(...whereConditions));
      
    return Number(result[0]?.count || 0);
  }

  // Votes
  async getVote(toolId: string, userId: string): Promise<Vote | undefined> {
    const result = await db.select().from(votes)
      .where(and(eq(votes.toolId, toolId), eq(votes.userId, userId)))
      .limit(1);
    return result[0];
  }

  async createVote(insertVote: InsertVote): Promise<Vote> {
    const result = await db.insert(votes).values(insertVote).returning();
    
    await db.update(tools)
      .set({ votes: sql`${tools.votes} + 1` })
      .where(eq(tools.id, insertVote.toolId));
    
    return result[0];
  }

  async deleteVote(toolId: string, userId: string): Promise<void> {
    await db.delete(votes)
      .where(and(eq(votes.toolId, toolId), eq(votes.userId, userId)));
    
    await db.update(tools)
      .set({ votes: sql`${tools.votes} - 1` })
      .where(eq(tools.id, toolId));
  }

  async getUserVotes(userId: string): Promise<Vote[]> {
    return await db.select().from(votes).where(eq(votes.userId, userId));
  }

  // Comments
  async getComments(toolId: string): Promise<Comment[]> {
    return await db.select().from(comments)
      .where(eq(comments.toolId, toolId))
      .orderBy(desc(comments.createdAt));
  }

  async createComment(insertComment: InsertComment): Promise<Comment> {
    const result = await db.insert(comments).values(insertComment).returning();
    return result[0];
  }

  async deleteComment(id: string): Promise<void> {
    await db.delete(comments).where(eq(comments.id, id));
  }
}

export const storage = new DbStorage();
