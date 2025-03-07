import { 
  users, type User, type InsertUser,
  inquiries, type Inquiry, type InsertInquiry,
  categories, type Category, type InsertCategory,
  products, type Product, type InsertProduct,
  contactSettings, type ContactSettings, type InsertContactSettings
} from "@shared/schema";
import { db } from "./db";
import { sql } from 'drizzle-orm';

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Inquiry methods
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  getInquiries(): Promise<Inquiry[]>;

  // Category methods
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: number, category: InsertCategory): Promise<Category>;
  deleteCategory(id: number): Promise<void>;
  getCategories(): Promise<Category[]>;
  getCategoryById(id: number): Promise<Category | undefined>;

  // Product methods
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: InsertProduct): Promise<Product>;
  deleteProduct(id: number): Promise<void>;
  getProducts(): Promise<Product[]>;
  getProductsByCategory(categoryId: number): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;

  // Contact Settings methods
  getContactSettings(): Promise<ContactSettings | undefined>;
  updateContactSettings(settings: InsertContactSettings): Promise<ContactSettings>;
}

export class DatabaseStorage implements IStorage {
  // User methods implementation
  async getUser(id: number): Promise<User | undefined> {
    try {
      const result = await db.select().from(users).where(sql`${users.id} = ${id}`);
      return result[0];
    } catch (error) {
      console.error('Error in getUser:', error);
      throw error;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const result = await db.select().from(users).where(sql`${users.username} = ${username}`);
      return result[0];
    } catch (error) {
      console.error('Error in getUserByUsername:', error);
      throw error;
    }
  }

  async createUser(user: InsertUser): Promise<User> {
    try {
      const result = await db.insert(users).values(user).returning();
      return result[0];
    } catch (error) {
      console.error('Error in createUser:', error);
      throw error;
    }
  }

  // Inquiry methods implementation
  async createInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    try {
      const result = await db.insert(inquiries).values(inquiry).returning();
      return result[0];
    } catch (error) {
      console.error('Error in createInquiry:', error);
      throw error;
    }
  }

  async getInquiries(): Promise<Inquiry[]> {
    try {
      return await db.select().from(inquiries).orderBy(sql`${inquiries.createdAt} DESC`);
    } catch (error) {
      console.error('Error in getInquiries:', error);
      throw error;
    }
  }

  // Category methods implementation
  async createCategory(category: InsertCategory): Promise<Category> {
    try {
      const result = await db.insert(categories).values(category).returning();
      return result[0];
    } catch (error) {
      console.error('Error in createCategory:', error);
      throw error;
    }
  }

  async updateCategory(id: number, category: InsertCategory): Promise<Category> {
    try {
      const result = await db
        .update(categories)
        .set(category)
        .where(sql`${categories.id} = ${id}`)
        .returning();
      return result[0];
    } catch (error) {
      console.error('Error in updateCategory:', error);
      throw error;
    }
  }

  async deleteCategory(id: number): Promise<void> {
    try {
      await db.delete(categories).where(sql`${categories.id} = ${id}`);
    } catch (error) {
      console.error('Error in deleteCategory:', error);
      throw error;
    }
  }

  async getCategories(): Promise<Category[]> {
    try {
      return await db.select().from(categories);
    } catch (error) {
      console.error('Error in getCategories:', error);
      throw error;
    }
  }

  async getCategoryById(id: number): Promise<Category | undefined> {
    try {
      const result = await db.select().from(categories).where(sql`${categories.id} = ${id}`);
      return result[0];
    } catch (error) {
      console.error('Error in getCategoryById:', error);
      throw error;
    }
  }

  // Product methods implementation
  async createProduct(product: InsertProduct): Promise<Product> {
    try {
      const result = await db.insert(products).values(product).returning();
      return result[0];
    } catch (error) {
      console.error('Error in createProduct:', error);
      throw error;
    }
  }

  async updateProduct(id: number, product: InsertProduct): Promise<Product> {
    try {
      const result = await db
        .update(products)
        .set(product)
        .where(sql`${products.id} = ${id}`)
        .returning();
      return result[0];
    } catch (error) {
      console.error('Error in updateProduct:', error);
      throw error;
    }
  }

  async deleteProduct(id: number): Promise<void> {
    try {
      await db.delete(products).where(sql`${products.id} = ${id}`);
    } catch (error) {
      console.error('Error in deleteProduct:', error);
      throw error;
    }
  }

  async getProducts(): Promise<Product[]> {
    try {
      return await db.select().from(products);
    } catch (error) {
      console.error('Error in getProducts:', error);
      throw error;
    }
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    try {
      return await db.select()
        .from(products)
        .where(sql`${products.categoryId} = ${categoryId}`);
    } catch (error) {
      console.error('Error in getProductsByCategory:', error);
      throw error;
    }
  }

  async getProductById(id: number): Promise<Product | undefined> {
    try {
      const result = await db.select().from(products).where(sql`${products.id} = ${id}`);
      return result[0];
    } catch (error) {
      console.error('Error in getProductById:', error);
      throw error;
    }
  }

  // Contact Settings methods implementation
  async getContactSettings(): Promise<ContactSettings | undefined> {
    try {
      const result = await db.select().from(contactSettings).where(sql`${contactSettings.id} = 1`);
      return result[0];
    } catch (error) {
      console.error('Error in getContactSettings:', error);
      throw error;
    }
  }

  async updateContactSettings(settings: InsertContactSettings): Promise<ContactSettings> {
    try {
      const [updated] = await db
        .update(contactSettings)
        .set(settings)
        .where(sql`${contactSettings.id} = 1`)
        .returning();

      return updated;
    } catch (error) {
      console.error('Error in updateContactSettings:', error);
      throw error;
    }
  }
}

export const storage = new DatabaseStorage();