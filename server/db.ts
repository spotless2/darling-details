import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";
import 'dotenv/config';

neonConfig.webSocketConstructor = ws;

// Validate database environment variables
const requiredEnvVars = ['PGUSER', 'PGHOST', 'PGPASSWORD', 'PGDATABASE', 'PGPORT'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingVars.join(', ')}. ` +
    'Please check your .env file and ensure all required variables are set.'
  );
}

// Create the connection URL from environment variables if DATABASE_URL is not provided
const connectionString = process.env.DATABASE_URL || 
  `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}` +
  `@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

// Initialize the connection pool
export const pool = new Pool({ 
  connectionString,
  connectionTimeoutMillis: 5000, // 5 seconds
  max: 20 // Maximum number of clients in the pool
});

// Initialize Drizzle with the pool and schema
export const db = drizzle({ client: pool, schema });

// Add error handling for the pool
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});