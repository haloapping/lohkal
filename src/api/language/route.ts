import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { eq, like, or, sql } from "drizzle-orm";
import { db } from "../../db/db";
import { languageSubmissionsTable, languagesTable } from "../../db/schema";
import { checkAuthorized } from "../../middleware/auth";
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
		middleware: checkAuthorized,
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
		let result;

		try {
			await db.transaction(async (tx) => {
				const reqBody = c.req.valid("json");
				const user = c.get("user");

				result = await tx
					.insert(languagesTable)
					.values({
						provinceId: reqBody.provinceId,
						name: reqBody.name,
						description: reqBody.description,
					})
					.returning();

				const languageId = result[0].id;
				await tx.insert(languageSubmissionsTable).values({
					userId: user.id,
					languageId: languageId,
				});
			});
		} catch (error) {
			return c.json({ error: error }, 400);
		}

		return c.json(result, 200);
	},
);

// search language by keyword
languageRoute.openapi(
	createRoute({
		method: "get",
		path: "/search",
		tags: tags,
		summary: "search language by keyword",
		description: "search language by keyword",
		request: {
			query: z.object({
				q: z.string(),
			}),
		},
		responses: {
			200: {
				description: "all result search by keyword",
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
			const q = c.req.query("q");
			const result = await db
				.select()
				.from(languagesTable)
				.where(
					or(
						like(sql`lower(${languagesTable.name})`, `%${q?.toLowerCase()}%`),
						like(
							sql`lower(${languagesTable.description})`,
							`%${q?.toLowerCase()}%`,
						),
					),
				);

			return c.json(result, 200);
		} catch (error) {
			return c.json({ error: error }, 400);
		}
	},
);

// get all languages
languageRoute.openapi(
	createRoute({
		middleware: checkAuthorized,
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
		middleware: checkAuthorized,
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
		middleware: checkAuthorized,
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
		middleware: checkAuthorized,
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
