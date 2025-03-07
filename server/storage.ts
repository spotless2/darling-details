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
    const result = await this.db.select().from(users).where(sql`${users.id} = ${id}`);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(sql`${users.username} = ${username}`);
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(user).returning();
    return result[0];
  }

  // Inquiry methods implementation
  async createInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    const result = await this.db.insert(inquiries).values(inquiry).returning();
    return result[0];
  }

  async getInquiries(): Promise<Inquiry[]> {
    return await this.db.select().from(inquiries).orderBy(sql`${inquiries.createdAt} DESC`);
  }

  // Category methods implementation
  async createCategory(category: InsertCategory): Promise<Category> {
    const result = await this.db.insert(categories).values(category).returning();
    return result[0];
  }

  async updateCategory(id: number, category: InsertCategory): Promise<Category> {
    const result = await this.db
      .update(categories)
      .set(category)
      .where(sql`${categories.id} = ${id}`)
      .returning();
    return result[0];
  }

  async deleteCategory(id: number): Promise<void> {
    await this.db.delete(categories).where(sql`${categories.id} = ${id}`);
  }

  async getCategories(): Promise<Category[]> {
    return await this.db.select().from(categories);
  }

  async getCategoryById(id: number): Promise<Category | undefined> {
    const result = await this.db.select().from(categories).where(sql`${categories.id} = ${id}`);
    return result[0];
  }

  // Product methods implementation
  async createProduct(product: InsertProduct): Promise<Product> {
    const result = await this.db.insert(products).values(product).returning();
    return result[0];
  }

  async updateProduct(id: number, product: InsertProduct): Promise<Product> {
    const result = await this.db
      .update(products)
      .set(product)
      .where(sql`${products.id} = ${id}`)
      .returning();
    return result[0];
  }

  async deleteProduct(id: number): Promise<void> {
    await this.db.delete(products).where(sql`${products.id} = ${id}`);
  }

  async getProducts(): Promise<Product[]> {
    return await this.db.select().from(products);
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return await this.db.select()
      .from(products)
      .where(sql`${products.categoryId} = ${categoryId}`);
  }

  async getProductById(id: number): Promise<Product | undefined> {
    const result = await this.db.select().from(products).where(sql`${products.id} = ${id}`);
    return result[0];
  }

  // Contact Settings methods implementation
  async getContactSettings(): Promise<ContactSettings | undefined> {
    const [settings] = await this.db.select().from(contactSettings).limit(1);
    return settings;
  }

  async updateContactSettings(settings: InsertContactSettings): Promise<ContactSettings> {
    const [existing] = await this.db.select().from(contactSettings).limit(1);
    if (existing) {
      const [updated] = await this.db
        .update(contactSettings)
        .set(settings)
        .where(sql`${contactSettings.id} = ${existing.id}`)
        .returning();
      return updated;
    } else {
      const [created] = await this.db
        .insert(contactSettings)
        .values(settings)
        .returning();
      return created;
    }
  }
}

export const storage = new DatabaseStorage();