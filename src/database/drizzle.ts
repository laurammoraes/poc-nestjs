import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import * as schema from './schemas/schema_ols';

let dbInstance: ReturnType<typeof drizzle>;

export async function connectOrm() {
  if (!dbInstance) {
    try {
      const pool = new Pool({
        connectionString: process.env.DATABASE_URL_LOCAL,
        ssl: {
          rejectUnauthorized: false,
        },
      });

      dbInstance = drizzle(pool, { schema });
      await migrate(dbInstance, { migrationsFolder: 'migrations' });
    } catch (error) {
      throw new Error(`Database connection failed: ${error.message}`);
    }
  }

  return dbInstance;
}
