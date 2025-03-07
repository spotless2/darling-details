import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertInquirySchema, insertCategorySchema, insertProductSchema, insertContactSettingsSchema } from "@shared/schema";
import { z } from "zod";

export function registerRoutes(app: Express): Server {
  const { requireAuth } = setupAuth(app);

  // Public routes
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/contact", async (req, res) => {
    try {
      const settings = await storage.getContactSettings();
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/inquiries", async (req, res) => {
    try {
      const inquiry = insertInquirySchema.parse(req.body);
      const result = await storage.createInquiry(inquiry);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ errors: error.errors });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  // Protected admin routes
  app.get("/api/admin/categories", requireAuth, async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/admin/categories", requireAuth, async (req, res) => {
    try {
      const category = insertCategorySchema.parse(req.body);
      const result = await storage.createCategory(category);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ errors: error.errors });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  app.put("/api/admin/categories/:id", requireAuth, async (req, res) => {
    try {
      const category = insertCategorySchema.parse(req.body);
      const result = await storage.updateCategory(Number(req.params.id), category);
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ errors: error.errors });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  app.delete("/api/admin/categories/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteCategory(Number(req.params.id));
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/admin/contact", requireAuth, async (req, res) => {
    try {
      const settings = await storage.getContactSettings();
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/admin/contact", requireAuth, async (req, res) => {
    try {
      const settings = insertContactSettingsSchema.parse(req.body);
      const result = await storage.updateContactSettings(settings);
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ errors: error.errors });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });


  // Products management
  app.get("/api/admin/products", requireAuth, async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/admin/products", requireAuth, async (req, res) => {
    try {
      const product = insertProductSchema.parse(req.body);
      const result = await storage.createProduct(product);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ errors: error.errors });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  app.put("/api/admin/products/:id", requireAuth, async (req, res) => {
    try {
      const product = insertProductSchema.parse(req.body);
      const result = await storage.updateProduct(Number(req.params.id), product);
      res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ errors: error.errors });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  app.delete("/api/admin/products/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteProduct(Number(req.params.id));
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Inquiries management
  app.get("/api/admin/inquiries", requireAuth, async (req, res) => {
    try {
      const inquiries = await storage.getInquiries();
      res.json(inquiries);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}