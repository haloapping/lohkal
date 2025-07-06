import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from "../../env";

const pool = new Pool({
	host: DB_HOST,
	user: DB_USERNAME,
	password: DB_PASSWORD,
	port: DB_PORT,
	database: DB_NAME,
	ssl: false,
});

export const db = drizzle(pool, { casing: "snake_case", logger: true });
