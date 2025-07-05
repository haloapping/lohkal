import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { eq } from "drizzle-orm";
import { db } from "../../db/db";
import { provincesTable } from "../../db/schema";
import { baseProvinceSchema } from "./schema/base-schema";
import {
	addNewProvinceSchemaReq,
	updateNewProvinceSchemaReq,
} from "./schema/request-schema";

export const provinceRoute = new OpenAPIHono();
const tags = ["provinces"];

// add new province
provinceRoute.openapi(
	createRoute({
		method: "post",
		path: "/",
		tags: tags,
		summary: "add new province",
		description: "add new province",
		request: {
			body: {
				content: {
					"application/json": {
						schema: addNewProvinceSchemaReq,
					},
				},
			},
		},
		responses: {
			200: {
				description: "add new language",
				content: {
					"application/json": { schema: baseProvinceSchema },
				},
			},
			400: {
				description: "clien error",
			},
		},
	}),
	async (c) => {
		try {
			const reqBody = c.req.valid("json");
			const result = await db
				.insert(provincesTable)
				.values({
					name: reqBody.name,
				})
				.returning();

			return c.json(result, 200);
		} catch (error) {
			return c.json({ error: error }, 400);
		}
	},
);

// get all provinces
provinceRoute.openapi(
	createRoute({
		method: "get",
		path: "/",
		tags: tags,
		summary: "get all provinces",
		description: "get all provinces",
		responses: {
			200: {
				description: "add new language",
				content: {
					"application/json": {
						schema: z.object({
							count: z.number(),
							data: baseProvinceSchema,
						}),
					},
				},
			},
			400: {
				description: "clien error",
			},
		},
	}),
	async (c) => {
		try {
			const result = await db.select().from(provincesTable);

			return c.json({ count: result.length, data: result }, 200);
		} catch (error) {
			return c.json({ error: error }, 400);
		}
	},
);

// get province by province id
provinceRoute.openapi(
	createRoute({
		method: "get",
		path: "/:provinceId",
		tags: tags,
		summary: "get province by province id",
		description: "get province by province id",
		request: {
			params: z.object({
				provinceId: z.string().ulid(),
			}),
		},
		responses: {
			200: {
				description: "get all languanges",
				content: {
					"application/json": { schema: baseProvinceSchema },
				},
			},
			400: {
				description: "error",
			},
		},
	}),
	async (c) => {
		try {
			const provinceId = c.req.param("provinceId");
			const result = await db
				.select()
				.from(provincesTable)
				.where(eq(provincesTable.id, provinceId));

			if (result.length === 0) {
				return c.json({ message: "languange not found" }, 404);
			}

			return c.json(result, 200);
		} catch (error) {
			return c.json({ error: error }, 400);
		}
	},
);

// update province by province id
provinceRoute.openapi(
	createRoute({
		method: "patch",
		path: "/:provinceId",
		tags: tags,
		summary: "update province by province id",
		description: "update province by province id",
		request: {
			params: z.object({
				provinceId: z.string().ulid(),
			}),
			body: {
				description: "request body",
				content: {
					"application/json": {
						schema: updateNewProvinceSchemaReq,
					},
				},
			},
		},
		responses: {
			200: {
				description: "get all provinces",
				content: {
					"application/json": { schema: baseProvinceSchema },
				},
			},
			400: {
				description: "error",
			},
		},
	}),
	async (c) => {
		try {
			const provinceId = c.req.param("provinceId");
			const reqBody = c.req.valid("json");
			const result = await db
				.update(provincesTable)
				.set({ name: reqBody.name, updatedAt: Math.floor(Date.now() / 1000.0) })
				.where(eq(provincesTable.id, provinceId))
				.returning();

			if (result.length === 0) {
				return c.json({ message: "province not found" }, 404);
			}

			return c.json(result, 200);
		} catch (error) {
			return c.json({ error: error }, 400);
		}
	},
);

// delete language by language id
provinceRoute.openapi(
	createRoute({
		method: "delete",
		path: "/:provinceId",
		tags: tags,
		summary: "delete province by province id",
		description: "delete province by province id",
		request: {
			params: z.object({
				provinceId: z.string().ulid(),
			}),
		},
		responses: {
			200: {
				description: "get all provinces",
				content: {
					"application/json": { schema: baseProvinceSchema },
				},
			},
			400: {
				description: "error",
			},
		},
	}),
	async (c) => {
		try {
			const provinceId = c.req.param("provinceId");
			const result = await db
				.delete(provincesTable)
				.where(eq(provincesTable.id, provinceId))
				.returning();

			if (result.length === 0) {
				return c.json({ message: "province not found" }, 404);
			}

			return c.json(result, 200);
		} catch (error) {
			return c.json({ error: error }, 400);
		}
	},
);
