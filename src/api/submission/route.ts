import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { eq, sql } from "drizzle-orm";
import { db } from "../../db/db";
import {
	provinceSubmissionsTable,
	provincesTable,
	usersTable,
} from "../../db/schema";
import { checkAuthorized } from "../../middleware/auth";
import { getAllSubmissionProvinces } from "./response-schema";

export const submissionRoute = new OpenAPIHono();
const tags = ["submissions"];

// get all province by submitter
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
				description: "add new language",
				content: {
					"application/json": {
						schema: getAllSubmissionProvinces,
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
					eq(provinceSubmissionsTable.userId, usersTable.id),
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
