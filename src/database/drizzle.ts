import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import * as schema from './schemas/schema';

let dbInstance: ReturnType<typeof drizzle>;

export async function connectOrm() {
  try {
    
    if (!dbInstance) {
      const pool = new Pool({
        connectionString: process.env.DATABASE_URL_LOCAL,
        ssl: {
          rejectUnauthorized: false, 
        },
      });

      dbInstance = drizzle(pool, { schema });

      await migrate(dbInstance, { migrationsFolder: 'migrations' });
    }

    return dbInstance;
  } catch (error) {
    return error;
  }
}
