import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Server-side database connection
let db: ReturnType<typeof drizzle> | null = null;

export function getDatabase() {
  if (!db) {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is not set');
    }

    const client = postgres(connectionString);
    db = drizzle(client, { schema });
  }

  return db;
}

// Export schema and types
export * from './schema';
