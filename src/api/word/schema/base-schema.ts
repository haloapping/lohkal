import { z } from "@hono/zod-openapi";

export const baseWordSchema = z.object({
	id: z.string().ulid().openapi({ example: "" }),
	languageId: z.string().ulid().openapi({ example: "" }),
	word: z.string().openapi({ example: "" }),
	meaning: z.string().openapi({ example: "" }),
	createdAt: z.number().positive().openapi({ example: 0 }),
	updatedAt: z.number().positive().openapi({ example: 0 }),
});
