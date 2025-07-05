import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { eq } from "drizzle-orm";
import { db } from "../../db/db";
import { languagesTable } from "../../db/schema";
import { baseLanguageSchema } from "./schema/base-schema";
import {
	addNewLanguageSchemaReq,
	updateLanguageByLanguageIdSchemaReq,
} from "./schema/request-schema";
import {
	addNewLanguageSchemaResp,
	getAllLanguageSchemaResp,
} from "./schema/response-schema";

export const languageRoute = new OpenAPIHono();
const tags = ["languages"];

// add new language
languageRoute.openapi(
	createRoute({
		method: "post",
		path: "/",
		tags: tags,
		summary: "add new new language",
		description: "add new language",
		request: {
			body: {
				content: {
					"application/json": {
						schema: addNewLanguageSchemaReq,
					},
				},
			},
		},
		responses: {
			200: {
				description: "add new language",
				content: {
					"application/json": { schema: addNewLanguageSchemaResp },
				},
			},
			400: {
				description: "error",
			},
		},
	}),
	async (c) => {
		try {
			const reqBody = c.req.valid("json");
			const result = await db
				.insert(languagesTable)
				.values({
					province_id: reqBody.provinceId,
					name: reqBody.name,
					description: reqBody.description,
				})
				.returning();

			return c.json(result, 201);
		} catch (error) {
			return c.json({ error: error }, 400);
		}
	},
);

// get all languages
languageRoute.openapi(
	createRoute({
		method: "get",
		path: "/",
		tags: tags,
		summary: "get all languages",
		description: "get all languages",
		responses: {
			200: {
				description: "get all languanges",
				content: {
					"application/json": { schema: getAllLanguageSchemaResp },
				},
			},
			400: {
				description: "error",
			},
		},
	}),
	async (c) => {
		try {
			const result = await db.select().from(languagesTable);

			return c.json({ count: result.length, data: result }, 200);
		} catch (error) {
			return c.json({ error: error }, 400);
		}
	},
);

// get language by id
languageRoute.openapi(
	createRoute({
		method: "get",
		path: "/:languageId",
		tags: tags,
		summary: "get language by language id",
		description: "get language by language id",
		request: {
			params: z.object({
				languageId: z.string().ulid(),
			}),
		},
		responses: {
			200: {
				description: "get all languanges",
				content: {
					"application/json": { schema: baseLanguageSchema },
				},
			},
			400: {
				description: "error",
			},
		},
	}),
	async (c) => {
		try {
			const languageId = c.req.param("languageId");
			const result = await db
				.select()
				.from(languagesTable)
				.where(eq(languagesTable.id, languageId));

			if (result.length === 0) {
				return c.json({ message: "languange not found" }, 404);
			}

			return c.json(result, 200);
		} catch (error) {
			return c.json({ error: error }, 400);
		}
	},
);

// update languange by language id
languageRoute.openapi(
	createRoute({
		method: "patch",
		path: "/:languageId",
		tags: tags,
		summary: "update language by language id",
		description: "update language by language id",
		request: {
			params: z.object({
				languageId: z.string().ulid(),
			}),
			body: {
				description: "request body",
				content: {
					"application/json": {
						schema: updateLanguageByLanguageIdSchemaReq,
					},
				},
			},
		},
		responses: {
			200: {
				description: "get all languanges",
				content: {
					"application/json": { schema: baseLanguageSchema },
				},
			},
			400: {
				description: "error",
			},
		},
	}),
	async (c) => {
		try {
			const languageId = c.req.param("languageId");
			const reqBody = c.req.valid("json");
			const result = await db
				.update(languagesTable)
				.set({ ...reqBody, updatedAt: Math.floor(Date.now() / 1000.0) })
				.where(eq(languagesTable.id, languageId))
				.returning();

			if (result.length === 0) {
				return c.json({ message: "language not found" }, 404);
			}

			return c.json(result, 200);
		} catch (error) {
			return c.json({ error: error }, 400);
		}
	},
);

// delete language by language id
languageRoute.openapi(
	createRoute({
		method: "delete",
		path: "/:languageId",
		tags: tags,
		summary: "delete language by language id",
		description: "delete language by language id",
		request: {
			params: z.object({
				languageId: z.string().ulid(),
			}),
		},
		responses: {
			200: {
				description: "get all languanges",
				content: {
					"application/json": { schema: baseLanguageSchema },
				},
			},
			400: {
				description: "error",
			},
		},
	}),
	async (c) => {
		try {
			const languageId = c.req.param("languageId");
			const result = await db
				.delete(languagesTable)
				.where(eq(languagesTable.id, languageId))
				.returning();

			if (result.length === 0) {
				return c.json({ message: "language not found" }, 404);
			}

			return c.json(result, 200);
		} catch (error) {
			return c.json({ error: error }, 400);
		}
	},
);
