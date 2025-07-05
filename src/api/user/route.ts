import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { eq } from "drizzle-orm";
import { sign } from "hono/jwt";
import { JWT_SECRET_KEY } from "../../../env";
import { db } from "../../db/db";
import { usersTable } from "../../db/schema";
import {
	loginUserSchemaReq,
	registerUserSchemaReq,
} from "./schema/request-schema";
import { registerUserSchemaResp } from "./schema/response-schema";

export const userRoute = new OpenAPIHono();
const tags = ["users"];

// register user
userRoute.openapi(
	createRoute({
		method: "post",
		path: "/register",
		tags: tags,
		summary: "register user",
		description: "register user",
		request: {
			body: {
				description: "request register",
				content: {
					"application/json": {
						schema: registerUserSchemaReq,
					},
				},
			},
		},
		responses: {
			200: {
				description: "user registered",
				content: {
					"application/json": {
						schema: z.object({
							message: z.string(),
							data: registerUserSchemaResp,
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
			const reqBody = c.req.valid("json");

			const hashPassword = await Bun.password.hash(reqBody.password, {
				algorithm: "bcrypt",
				cost: 4,
			});

			const result = await db
				.insert(usersTable)
				.values({ ...reqBody, password: hashPassword })
				.returning();

			return c.json({ message: "user is registered", data: result }, 201);
		} catch (error) {
			return c.json({ error: error }, 400);
		}
	},
);

// login user
userRoute.openapi(
	createRoute({
		method: "post",
		path: "/login",
		tags: tags,
		summary: "login user",
		description: "login user",
		request: {
			body: {
				description: "request login",
				content: {
					"application/json": {
						schema: loginUserSchemaReq,
					},
				},
			},
		},
		responses: {
			200: {
				description: "user login",
				content: {
					"application/json": {
						schema: z.object({
							token: z.string().jwt().nonempty(),
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
			const reqBody = c.req.valid("json");

			// check user exist in database
			const user = await db
				.select()
				.from(usersTable)
				.where(eq(usersTable.username, reqBody.username));

			if (user.length === 0) {
				return c.json({ message: "user not found" }, 404);
			}

			// check password is correct
			const isPasswordCorrect = await Bun.password.verify(
				reqBody.password,
				user[0].password,
			);

			if (!isPasswordCorrect) {
				return c.json({ message: "username or password not match" }, 404);
			}

			// generate jwt token
			const payload = {
				sub: {
					username: user[0].username,
					email: user[0].email,
				},
				role: "user",
				exp: Math.floor(Date.now() / 1000) + 60 * 25, // Token expires in 25 minutes
			};
			const token = await sign(payload, JWT_SECRET_KEY);

			return c.json({ token: token }, 201);
		} catch (error) {
			return c.json({ error: error }, 400);
		}
	},
);
