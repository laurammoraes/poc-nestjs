import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import * as schema from './schemas/schema';

export async function connectOrm() {
  try {
    const pool = new Pool({
      host: 'localhost',
      port: 5444,
      user: 'poc-nestjs-postgresql',
      password: 'poc-nestjs-postgresql',
      database: 'poc-nestjs-postgresql',
      ssl: { rejectUnauthorized: false }, // Aceitar certificados autoassinados
    });

    const db = drizzle(pool, { schema });

    await migrate(db, { migrationsFolder: 'migrations' });

    return 'success';
  } catch (error) {
    return error;
  }
}
