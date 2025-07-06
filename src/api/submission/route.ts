import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { eq, sql } from "drizzle-orm";
import { db } from "../../db/db";
import {
	languageSubmissionsTable,
	languagesTable,
	provinceSubmissionsTable,
	provincesTable,
	usersTable,
	wordSubmissionsTable,
	wordsTable,
} from "../../db/schema";
import { checkAuthorized } from "../../middleware/auth";
import {
	getAllSubmissionLanguagesResp,
	getAllSubmissionProvincesResp,
	getAllSubmissionWordsResp,
} from "./response-schema";

export const submissionRoute = new OpenAPIHono();
const tags = ["submissions"];

// get all provinces by submitter
submissionRoute.openapi(
	createRoute({
		middleware: checkAuthorized,
		method: "get",
		path: "/province",
		tags: tags,
		summary: "get all provinces by submitter",
		description: "get all provinces by submitter",
		responses: {
			200: {
				description: "request body",
				content: {
					"application/json": {
						schema: getAllSubmissionProvincesResp,
					},
				},
			},
			400: {
				description: "clien error",
			},
		},
	}),
	async (c) => {
		const user = c.get("user");
		try {
			const result = await db
				.select({
					username: usersTable.username,
					email: usersTable.email,
					submitProvinces: sql<Array<string>>`COALESCE(
            json_agg(${provincesTable.name} ORDER BY ${provincesTable.name}),
            '[]'::json
          )`,
				})
				.from(usersTable)
				.leftJoin(
					provinceSubmissionsTable,
					eq(provinceSubmissionsTable.submitById, usersTable.id),
				)
				.leftJoin(
					provincesTable,
					eq(provinceSubmissionsTable.provinceId, provincesTable.id),
				)
				.where(eq(usersTable.id, user.id))
				.groupBy(usersTable.username, usersTable.email);

			return c.json({ result }, 200);
		} catch (error) {
			return c.json({ error: error }, 400);
		}
	},
);

// get all languages by submitter
submissionRoute.openapi(
	createRoute({
		middleware: checkAuthorized,
		method: "get",
		path: "/language",
		tags: tags,
		summary: "get all languages by submitter",
		description: "get all languages by submitter",
		responses: {
			200: {
				description: "request body",
				content: {
					"application/json": {
						schema: getAllSubmissionLanguagesResp,
					},
				},
			},
			400: {
				description: "clien error",
			},
		},
	}),
	async (c) => {
		const user = c.get("user");
		try {
			const result = await db
				.select({
					username: usersTable.username,
					email: usersTable.email,
					submitProvinces: sql<Array<string>>`COALESCE(
            json_agg(${languagesTable.name} ORDER BY ${languagesTable.name}),
            '[]'::json
          )`,
				})
				.from(usersTable)
				.leftJoin(
					languageSubmissionsTable,
					eq(languageSubmissionsTable.submitById, usersTable.id),
				)
				.leftJoin(
					languagesTable,
					eq(languageSubmissionsTable.languageId, languagesTable.id),
				)
				.where(eq(usersTable.id, user.id))
				.groupBy(usersTable.username, usersTable.email);

			return c.json({ result }, 200);
		} catch (error) {
			return c.json({ error: error }, 400);
		}
	},
);

// get all words by submitter
submissionRoute.openapi(
	createRoute({
		middleware: checkAuthorized,
		method: "get",
		path: "/word",
		tags: tags,
		summary: "get all words by submitter",
		description: "get all words by submitter",
		responses: {
			200: {
				description: "request body",
				content: {
					"application/json": {
						schema: getAllSubmissionWordsResp,
					},
				},
			},
			400: {
				description: "clien error",
			},
		},
	}),
	async (c) => {
		const user = c.get("user");
		try {
			const result = await db
				.select({
					username: usersTable.username,
					email: usersTable.email,
					submitWords: sql<Array<{ word: string; meaning: string }>>`COALESCE(
            json_agg(
              json_build_object(
                'word', ${wordsTable.word},
                'meaning', ${wordsTable.meaning}
              ) 
              ORDER BY ${wordsTable.word}
            ),
            '[]'::json
          )`,
				})
				.from(usersTable)
				.leftJoin(
					wordSubmissionsTable,
					eq(wordSubmissionsTable.submitById, usersTable.id),
				)
				.leftJoin(wordsTable, eq(wordSubmissionsTable.wordId, wordsTable.id))
				.where(eq(usersTable.id, user.id))
				.groupBy(usersTable.username, usersTable.email);

			return c.json({ result }, 200);
		} catch (error) {
			return c.json({ error: error }, 400);
		}
	},
);
