import { z } from "@hono/zod-openapi";

export const addNewLanguageSchemaReq = z.object({
	provinceId: z.string().ulid().openapi({ example: "" }),
	name: z.string().nonempty().openapi({ example: "" }),
	description: z.string().nonempty().openapi({ description: "", example: "" }),
});

export const updateLanguageByLanguageIdSchemaReq = z.object({
	provinceId: z.string().ulid().optional().openapi({ example: "" }),
	name: z.string().optional().openapi({ example: "" }),
	description: z.string().optional().openapi({ description: "", example: "" }),
});
