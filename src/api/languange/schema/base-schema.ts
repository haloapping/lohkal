import { z } from "@hono/zod-openapi";

export const baseLanguageSchema = z.object({
	id: z.string().ulid().openapi({ example: "" }),
	provinceId: z.string().ulid().openapi({ example: "" }),
	name: z.string().openapi({ example: "" }),
	description: z.string().nullable().openapi({ description: "", example: "" }),
	createdAt: z
		.number()
		.positive()
		.nullable()
		.openapi({ description: "", example: 123 }),
	updatedAt: z
		.number()
		.positive()
		.nullable()
		.openapi({ description: "", example: 123 }),
});
