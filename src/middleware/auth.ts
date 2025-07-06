import { eq } from "drizzle-orm";
import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";
import { JWT_SECRET_KEY } from "../../env";
import { db } from "../db/db";
import { usersTable } from "../db/schema";

type Env = {
	Variables: {
		user: {
			id: string;
			username: string;
			email: string;
		};
	};
};

type TokenPayload = {
	sub: {
		id: string;
		username: string;
		email: string;
	};
	role?: number;
	exp?: number;
};

export const checkAuthorized = createMiddleware<Env>(async (c, next) => {
	try {
		const authHeader = c.req.header("Authorization");
		if (!authHeader) {
			return c.json({ message: "Authorization header is required" }, 401);
		}

		const token = authHeader.split(" ")[1];
		if (!token) {
			return c.json({ message: "Token is required" }, 401);
		}

		const decodedPayload = (await verify(
			token,
			JWT_SECRET_KEY,
		)) as TokenPayload | null;

		if (!decodedPayload) {
			return c.json({ message: "Invalid token" }, 401);
		}

		const user = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.username, decodedPayload.sub.username));
		if (user.length === 0) {
			return c.json({ message: "User is no longer available" }, 401);
		}

		c.set("user", {
			id: decodedPayload.sub.id,
			username: decodedPayload.sub.username,
			email: decodedPayload.sub.email,
		});

		await next();
	} catch (error) {
		return c.json(
			{ message: "Failed to check authorized user", error: error },
			401,
		);
	}
});
