import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupSession, setupAuthRoutes, isAuthenticated } from "./auth";
import { insertSavedOptionSchema, insertSearchHistorySchema, updateUserProfileSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup session and auth
  setupSession(app);
  await setupAuthRoutes(app);

  // User profile routes
  app.patch('/api/user/profile', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.session.userId;
      const validatedData = updateUserProfileSchema.parse(req.body);
      const updatedUser = await storage.updateUserProfile(userId, validatedData);
      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to update profile" });
      }
    }
  });

  // Saved options routes
  app.get('/api/saved-options', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.session.userId;
      const savedOptions = await storage.getSavedOptions(userId);
      res.json(savedOptions);
    } catch (error) {
      console.error("Error fetching saved options:", error);
      res.status(500).json({ message: "Failed to fetch saved options" });
    }
  });

  app.post('/api/saved-options', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.session.userId;
      const validatedData = insertSavedOptionSchema.parse({
        ...req.body,
        userId,
      });
      const savedOption = await storage.saveOption(validatedData);
      res.json(savedOption);
    } catch (error) {
      console.error("Error saving option:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to save option" });
      }
    }
  });

  app.delete('/api/saved-options/:optionId', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.session.userId;
      const { optionId } = req.params;
      await storage.removeSavedOption(userId, optionId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error removing saved option:", error);
      res.status(500).json({ message: "Failed to remove option" });
    }
  });

  app.get('/api/saved-options/:optionId/check', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.session.userId;
      const { optionId } = req.params;
      const isSaved = await storage.isSavedOption(userId, optionId);
      res.json({ isSaved });
    } catch (error) {
      console.error("Error checking saved option:", error);
      res.status(500).json({ message: "Failed to check option" });
    }
  });

  // Search history routes
  app.get('/api/search-history', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.session.userId;
      const history = await storage.getSearchHistory(userId);
      res.json(history);
    } catch (error) {
      console.error("Error fetching search history:", error);
      res.status(500).json({ message: "Failed to fetch search history" });
    }
  });

  app.post('/api/search-history', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.session.userId;
      const validatedData = insertSearchHistorySchema.parse({
        ...req.body,
        userId,
      });
      const history = await storage.saveSearchHistory(validatedData);
      res.json(history);
    } catch (error) {
      console.error("Error saving search history:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to save search history" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
