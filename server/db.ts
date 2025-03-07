import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

// Required for Neon serverless driver
neonConfig.webSocketConstructor = ws;

// Create connection pool using individual environment variables
const pool = new Pool({ 
  host: process.env.PGHOST || 'localhost',
  user: process.env.PGUSER || 'admin',
  password: String(process.env.PGPASSWORD), // Explicitly convert to string
  database: process.env.PGDATABASE || 'darling_details',
  port: parseInt(process.env.PGPORT || '5432'),
  ssl: {
    rejectUnauthorized: false // Allow self-signed certificates
  },
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 2000, // How long to wait before timing out when connecting a new client
});

// Add error handler
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

// Test the connection on startup
pool.connect().then((client) => {
  console.log('Database connection successful');
  console.log('Connection details:', {
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT
  });
  client.release();
}).catch((err) => {
  console.error('Error connecting to the database:', err);
  console.error('Connection details:', {
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT
  });
});

// Create drizzle database instance
export const db = drizzle(pool, { schema });