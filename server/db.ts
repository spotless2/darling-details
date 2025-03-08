import pkg from 'pg';
const { Pool } = pkg;
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Determine database connection configuration
let poolConfig: any;

if (process.env.DATABASE_URL) {
  // If DATABASE_URL is provided, use it (common in production environments)
  poolConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  };
} else {
  // Otherwise use individual connection parameters
  if (!process.env.PGHOST || !process.env.PGUSER || !process.env.PGPASSWORD || !process.env.PGDATABASE) {
    throw new Error("Database configuration environment variables are missing. Please check .env.example for required variables.");
  }

  poolConfig = {
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: parseInt(process.env.PGPORT || '5432'),
    ssl: process.env.NODE_ENV === 'production'
  };
}

// Create connection pool
const pool = new Pool(poolConfig);

// Add error handler
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

// Test the connection on startup
pool.connect().then((client) => {
  console.log('Database connection successful');
  client.release();
}).catch((err) => {
  console.error('Error connecting to the database:', err);
});

// Create drizzle database instance
export const db = drizzle(pool, { schema });