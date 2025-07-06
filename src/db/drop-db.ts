import { sql } from "drizzle-orm";
import { db } from "./db";

async function main() {
	await db.execute(sql`DROP SCHEMA public CASCADE;`);
	await db.execute(sql`CREATE SCHEMA public;`);
	await db.execute(sql`GRANT ALL ON SCHEMA public TO postgres;`);
	await db.execute(sql`GRANT ALL ON SCHEMA public TO public;`);

	console.log("drop schema is done");
}

main();
