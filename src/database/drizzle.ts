import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import * as schema from './schemas/schema';

<<<<<<< HEAD
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

=======

export async function connectOrm() {
  try {
    console.log('aqui')
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL_LOCAL,  // Para usar a URL completa
        ssl: {
          rejectUnauthorized: false,  // Se necessário, desativa a verificação de certificados SSL
        },
      });
      

    const db = drizzle(pool, { schema });

>>>>>>> f1fdca4cf98d8f4978953cbb85a837989bcd1bce
    await migrate(db, { migrationsFolder: 'migrations' });

    return 'success';
  } catch (error) {
    return error;
  }
}
