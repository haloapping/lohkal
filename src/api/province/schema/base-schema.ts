import { z } from "@hono/zod-openapi";

export const baseProvinceSchema = z.object({
	id: z.string().ulid().openapi({ example: "" }),
	name: z.string().openapi({ example: "" }),
	createdAt: z.number().positive().openapi({ example: 0 }),
	updatedAt: z.number().positive().openapi({ example: 0 }),
});
