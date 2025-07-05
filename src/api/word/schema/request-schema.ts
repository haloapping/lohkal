import { z } from "@hono/zod-openapi";

export const addNewWordSchemaReq = z.object({
	languageId: z.string().ulid().nonempty().openapi({ example: "" }),
	word: z.string().nonempty().openapi({ example: "" }),
	meaning: z.string().nonempty().openapi({ example: "" }),
});

export const updateWordByWordIdSchemaReq = addNewWordSchemaReq.optional();
