import { parseEnv } from "znv";
import { z } from "zod";

export const {
	DB_HOST,
	DB_USERNAME,
	DB_PASSWORD,
	DB_PORT,
	DB_NAME,
	JWT_SECRET_KEY,
} = parseEnv(process.env, {
	DB_HOST: z.string().nonempty(),
	DB_USERNAME: z.string().nonempty(),
	DB_PASSWORD: z.string().nonempty(),
	DB_PORT: z.number().positive(),
	DB_NAME: z.string().nonempty(),
	JWT_SECRET_KEY: z.string().nonempty(),
});
