import { 
  users, type User, type InsertUser,
  inquiries, type Inquiry, type InsertInquiry,
  categories, type Category, type InsertCategory,
  products, type Product, type InsertProduct,
  contactSettings, type ContactSettings, type InsertContactSettings
} from "@shared/schema";
import { drizzle } from 'drizzle-orm/node-postgres';
import { sql } from 'drizzle-orm';
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : false
});

// Test the connection
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

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
  private db: ReturnType<typeof drizzle>;

  constructor() {
    this.db = drizzle(pool);
  }

  // User methods implementation
  async getUser(id: number): Promise<User | undefined> {
    try {
      const result = await this.db.select().from(users).where(sql`${users.id} = ${id}`);
      return result[0];
    } catch (error) {
      console.error('Error in getUser:', error);
      throw error;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const result = await this.db.select().from(users).where(sql`${users.username} = ${username}`);
      return result[0];
    } catch (error) {
      console.error('Error in getUserByUsername:', error);
      throw error;
    }
  }

  async createUser(user: InsertUser): Promise<User> {
    try {
      const result = await this.db.insert(users).values(user).returning();
      return result[0];
    } catch (error) {
      console.error('Error in createUser:', error);
      throw error;
    }
  }

  // Inquiry methods implementation
  async createInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    try {
      const result = await this.db.insert(inquiries).values(inquiry).returning();
      return result[0];
    } catch (error) {
      console.error('Error in createInquiry:', error);
      throw error;
    }
  }

  async getInquiries(): Promise<Inquiry[]> {
    try {
      return await this.db.select().from(inquiries).orderBy(sql`${inquiries.createdAt} DESC`);
    } catch (error) {
      console.error('Error in getInquiries:', error);
      throw error;
    }
  }

  // Category methods implementation
  async createCategory(category: InsertCategory): Promise<Category> {
    try {
      const result = await this.db.insert(categories).values(category).returning();
      return result[0];
    } catch (error) {
      console.error('Error in createCategory:', error);
      throw error;
    }
  }

  async updateCategory(id: number, category: InsertCategory): Promise<Category> {
    try {
      const result = await this.db
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
      await this.db.delete(categories).where(sql`${categories.id} = ${id}`);
    } catch (error) {
      console.error('Error in deleteCategory:', error);
      throw error;
    }
  }

  async getCategories(): Promise<Category[]> {
    try {
      return await this.db.select().from(categories);
    } catch (error) {
      console.error('Error in getCategories:', error);
      throw error;
    }
  }

  async getCategoryById(id: number): Promise<Category | undefined> {
    try {
      const result = await this.db.select().from(categories).where(sql`${categories.id} = ${id}`);
      return result[0];
    } catch (error) {
      console.error('Error in getCategoryById:', error);
      throw error;
    }
  }

  // Product methods implementation
  async createProduct(product: InsertProduct): Promise<Product> {
    try {
      const result = await this.db.insert(products).values(product).returning();
      return result[0];
    } catch (error) {
      console.error('Error in createProduct:', error);
      throw error;
    }
  }

  async updateProduct(id: number, product: InsertProduct): Promise<Product> {
    try {
      const result = await this.db
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
      await this.db.delete(products).where(sql`${products.id} = ${id}`);
    } catch (error) {
      console.error('Error in deleteProduct:', error);
      throw error;
    }
  }

  async getProducts(): Promise<Product[]> {
    try {
      return await this.db.select().from(products);
    } catch (error) {
      console.error('Error in getProducts:', error);
      throw error;
    }
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    try {
      return await this.db.select()
        .from(products)
        .where(sql`${products.categoryId} = ${categoryId}`);
    } catch (error) {
      console.error('Error in getProductsByCategory:', error);
      throw error;
    }
  }

  async getProductById(id: number): Promise<Product | undefined> {
    try {
      const result = await this.db.select().from(products).where(sql`${products.id} = ${id}`);
      return result[0];
    } catch (error) {
      console.error('Error in getProductById:', error);
      throw error;
    }
  }

  // Contact Settings methods implementation
  async getContactSettings(): Promise<ContactSettings | undefined> {
    try {
      const result = await this.db.select().from(contactSettings).where(sql`${contactSettings.id} = 1`);
      return result[0];
    } catch (error) {
      console.error('Error in getContactSettings:', error);
      throw error;
    }
  }

  async updateContactSettings(settings: InsertContactSettings): Promise<ContactSettings> {
    try {
      // Always update the record with ID 1
      const [updated] = await this.db
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