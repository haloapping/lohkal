import { z } from "@hono/zod-openapi";
import { baseLanguageSchema } from "./base-schema";

export const getAllLanguageSchemaResp = z.object({
	count: z.number().positive().openapi({ example: 1 }),
	data: z.array(baseLanguageSchema),
});

export const addNewLanguageSchemaResp = z.object({
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
