import { defineConfig } from "drizzle-kit";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from "./env";
import "dotenv/config";

export default defineConfig({
	dialect: "postgresql",
	schema: "./src/db/schema.ts",
	migrations: {
		prefix: "timestamp",
	},
	out: "./drizzle",
	casing: "snake_case",
	dbCredentials: {
		host: DB_HOST || "localhost",
		user: DB_USERNAME || "postgres",
		password: DB_PASSWORD || "postgres",
		port: DB_PORT || 5432,
		database: DB_NAME || "lohkal",
		ssl: {
			rejectUnauthorized: false,
		},
	},
});
