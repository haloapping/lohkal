import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { eq, like, or, sql } from "drizzle-orm";
import { db } from "../../db/db";
import { wordSubmissionsTable, wordsTable } from "../../db/schema";
import { checkAuthorized } from "../../middleware/auth";
import { baseWordSchema } from "./schema/base-schema";
import {
	addNewWordSchemaReq,
	updateWordByWordIdSchemaReq,
} from "./schema/request-schema";

export const wordRoute = new OpenAPIHono();
const tags = ["words"];

// add new word
wordRoute.openapi(
	createRoute({
		middleware: checkAuthorized,
		method: "post",
		path: "/",
		tags: tags,
		summary: "add new word",
		description: "add new word",
		request: {
			body: {
				content: {
					"application/json": {
						schema: addNewWordSchemaReq,
					},
				},
			},
		},
		responses: {
			200: {
				description: "add new word",
				content: {
					"application/json": { schema: baseWordSchema },
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
					.insert(wordsTable)
					.values({
						languageId: reqBody.languageId,
						word: reqBody.word,
						meaning: reqBody.meaning,
					})
					.returning();

				const wordId = result[0].id;
				await tx.insert(wordSubmissionsTable).values({
					userId: user.id,
					wordId: wordId,
				});
			});
		} catch (error) {
			return c.json({ error: error }, 400);
		}

		return c.json(result, 200);
	},
);

// search word by keyword
wordRoute.openapi(
	createRoute({
		method: "get",
		path: "/search",
		tags: tags,
		summary: "search word by keyword",
		description: "search word by keyword",
		request: {
			query: z.object({
				q: z.string(),
			}),
		},
		responses: {
			200: {
				description: "all word result search by keyword",
				content: {
					"application/json": { schema: z.array(baseWordSchema) },
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
				.from(wordsTable)
				.where(
					or(
						like(sql`lower(${wordsTable.word})`, `%${q?.toLowerCase()}%`),
						like(sql`lower(${wordsTable.meaning})`, `%${q?.toLowerCase()}%`),
					),
				);

			return c.json(result, 200);
		} catch (error) {
			return c.json({ error: error }, 400);
		}
	},
);

// get word by word id
wordRoute.openapi(
	createRoute({
		middleware: checkAuthorized,
		method: "get",
		path: "/:wordId",
		tags: tags,
		summary: "get word by word id",
		description: "get word by word id",
		request: {
			params: z.object({
				wordId: z.string().ulid(),
			}),
		},
		responses: {
			200: {
				description: "get word by word id",
				content: {
					"application/json": { schema: baseWordSchema },
				},
			},
			400: {
				description: "error",
			},
		},
	}),
	async (c) => {
		try {
			const wordId = c.req.param("wordId");
			const result = await db
				.select()
				.from(wordsTable)
				.where(eq(wordsTable.id, wordId));

			if (result.length === 0) {
				return c.json({ message: "word not found" }, 404);
			}

			return c.json(result, 200);
		} catch (error) {
			return c.json({ error: error }, 400);
		}
	},
);

// get all words by language id
wordRoute.openapi(
	createRoute({
		middleware: checkAuthorized,
		method: "get",
		path: "/:languageId",
		tags: tags,
		summary: "get all words by language id",
		description: "get all words by language id",
		request: {
			params: z.object({
				languageId: z.string().ulid(),
			}),
		},
		responses: {
			200: {
				description: "get all words by language id",
				content: {
					"application/json": {
						schema: z.object({
							count: z.number().positive(),
							data: z.array(baseWordSchema),
						}),
					},
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
				.from(wordsTable)
				.where(eq(wordsTable.languageId, languageId));

			return c.json({ count: result.length, data: result }, 200);
		} catch (error) {
			return c.json({ error: error }, 400);
		}
	},
);

// update word by word id
wordRoute.openapi(
	createRoute({
		middleware: checkAuthorized,
		method: "patch",
		path: "/:wordId",
		tags: tags,
		summary: "update word by word id",
		description: "update word by word id",
		request: {
			params: z.object({
				wordId: z.string().ulid(),
			}),
			body: {
				description: "request body",
				content: {
					"application/json": {
						schema: updateWordByWordIdSchemaReq,
					},
				},
			},
		},
		responses: {
			200: {
				description: "update word",
				content: {
					"application/json": { schema: baseWordSchema },
				},
			},
			400: {
				description: "error",
			},
		},
	}),
	async (c) => {
		try {
			const wordId = c.req.param("wordId");
			const reqBody = c.req.valid("json");
			const result = await db
				.update(wordsTable)
				.set({ ...reqBody, updatedAt: Math.floor(Date.now() / 1000.0) })
				.where(eq(wordsTable.id, wordId))
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
wordRoute.openapi(
	createRoute({
		middleware: checkAuthorized,
		method: "delete",
		path: "/:wordId",
		tags: tags,
		summary: "delete word by word id",
		description: "delete word by word id",
		request: {
			params: z.object({
				wordId: z.string().ulid(),
			}),
		},
		responses: {
			200: {
				description: "delete word",
				content: {
					"application/json": { schema: baseWordSchema },
				},
			},
			400: {
				description: "error",
			},
		},
	}),
	async (c) => {
		try {
			const wordId = c.req.param("wordId");
			const result = await db
				.delete(wordsTable)
				.where(eq(wordsTable.id, wordId))
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
