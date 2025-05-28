import {
  users,
  savedOptions,
  searchHistory,
  type User,
  type InsertUser,
  type SavedOption,
  type InsertSavedOption,
  type SearchHistory,
  type InsertSearchHistory,
  type SignUpData,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";
import bcrypt from "bcryptjs";

export interface IStorage {
  // User operations
  getUserById(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(userData: SignUpData): Promise<User>;
  updateUserProfile(id: number, data: Partial<User>): Promise<User>;

  // Saved options operations
  getSavedOptions(userId: number): Promise<SavedOption[]>;
  saveOption(data: InsertSavedOption): Promise<SavedOption>;
  removeSavedOption(userId: number, optionId: string): Promise<void>;
  isSavedOption(userId: number, optionId: string): Promise<boolean>;

  // Search history operations
  getSearchHistory(userId: number): Promise<SearchHistory[]>;
  saveSearchHistory(data: InsertSearchHistory): Promise<SearchHistory>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUserById(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(userData: SignUpData): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const [user] = await db
      .insert(users)
      .values({
        username: userData.username,
        email: userData.email,
        passwordHash: hashedPassword,
        firstName: userData.firstName,
        lastName: userData.lastName,
      })
      .returning();
    return user;
  }

  async updateUserProfile(id: number, data: Partial<User>): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  // Saved options operations
  async getSavedOptions(userId: number): Promise<SavedOption[]> {
    return await db
      .select()
      .from(savedOptions)
      .where(eq(savedOptions.userId, userId))
      .orderBy(desc(savedOptions.createdAt));
  }

  async saveOption(data: InsertSavedOption): Promise<SavedOption> {
    const [savedOption] = await db
      .insert(savedOptions)
      .values(data)
      .returning();
    return savedOption;
  }

  async removeSavedOption(userId: number, optionId: string): Promise<void> {
    await db
      .delete(savedOptions)
      .where(
        and(eq(savedOptions.userId, userId), eq(savedOptions.optionId, optionId))
      );
  }

  async isSavedOption(userId: number, optionId: string): Promise<boolean> {
    const [result] = await db
      .select()
      .from(savedOptions)
      .where(
        and(eq(savedOptions.userId, userId), eq(savedOptions.optionId, optionId))
      );
    return !!result;
  }

  // Search history operations
  async getSearchHistory(userId: number): Promise<SearchHistory[]> {
    return await db
      .select()
      .from(searchHistory)
      .where(eq(searchHistory.userId, userId))
      .orderBy(desc(searchHistory.createdAt))
      .limit(10);
  }

  async saveSearchHistory(data: InsertSearchHistory): Promise<SearchHistory> {
    const [history] = await db
      .insert(searchHistory)
      .values(data)
      .returning();
    return history;
  }
}

export const storage = new DatabaseStorage();
