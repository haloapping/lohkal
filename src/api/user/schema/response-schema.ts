import { z } from "@hono/zod-openapi";

export const registerUserSchemaResp = z.object({
	id: z.string().ulid(),
	username: z.string(),
	email: z.string().email(),
	password: z.string(),
	photoProfile: z.string().url(),
	ccreatedAt: z.number().positive().openapi({ description: "", example: 123 }),
	updatedAt: z.number().positive().openapi({ description: "", example: 123 }),
});

export const loginUserSchemaResp = z.object({
	id: z.string().ulid(),
	username: z.string(),
	email: z.string().email(),
});
