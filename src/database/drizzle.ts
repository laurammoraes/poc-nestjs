import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

export async  function connectOrm() {
    try {
        const pool = new Pool({
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
        });

        const db = drizzle(pool);

        return 'ok'
    } catch (error) {
        return error
    }

}
   
