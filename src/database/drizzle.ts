import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import * as schema from './schemas/schema';

export async function connectOrm() {
  try {
    console.log('aqui');
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL_LOCAL, // Para usar a URL completa
      ssl: {
        rejectUnauthorized: false, // Se necessário, desativa a verificação de certificados SSL
      },
    });

    const db = drizzle(pool, { schema });

    await migrate(db, { migrationsFolder: 'migrations' });

    return 'success';
  } catch (error) {
    return error;
  }
}
