import { z } from "@hono/zod-openapi";

export const addNewProvinceSchemaReq = z.object({
	name: z.string().nonempty().openapi({ example: "Sulawesi Selatan" }),
});

export const updateNewProvinceSchemaReq = z.object({
	name: z.string().nonempty().openapi({ example: "Sulawesi Selatan" }),
});
