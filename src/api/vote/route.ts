import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { and, eq } from "drizzle-orm";
import { db } from "../../db/db";
import { voteWordsTable, wordsTable } from "../../db/schema";
import { checkAuthorized } from "../../middleware/auth";
import { voteWordResp } from "./schema/response-schema";

export const voteRoute = new OpenAPIHono();
const tags = ["votes"];

voteRoute.openapi(
	createRoute({
		middleware: checkAuthorized,
		method: "post",
		path: "/word/:wordId",
		tags: tags,
		summary: "vote word",
		description: "vote word",
		request: {
			params: z.object({
				wordId: z.string().ulid(),
			}),
		},
		responses: {
			200: {
				description: "response vote",
				content: {
					"application/json": { schema: voteWordResp },
				},
			},
			400: {
				description: "clien error",
			},
		},
	}),
	async (c) => {
		let result;
		let earlyResponse;

		try {
			await db.transaction(async (tx) => {
				const wordId = c.req.param("wordId");
				const user = c.get("user");

				// Check if word exists first
				const wordExists = await tx
					.select({ id: wordsTable.id })
					.from(wordsTable)
					.where(eq(wordsTable.id, wordId))
					.limit(1);

				if (wordExists.length === 0) {
					earlyResponse = c.json({ message: "word not found" }, 404);

					return;
				}

				// check user is ever to vote word
				const userVoteExist = await tx
					.select()
					.from(voteWordsTable)
					.where(
						and(
							eq(voteWordsTable.voteById, user.id),
							eq(voteWordsTable.wordId, wordId),
						),
					);

				console.log(userVoteExist);
				if (userVoteExist.length !== 0) {
					earlyResponse = c.json({ message: "you're voted" }, 200);

					return;
				}

				// Get current votes
				const votes = await tx
					.select({ numberOfVote: voteWordsTable.numberOfVote })
					.from(voteWordsTable)
					.where(eq(voteWordsTable.wordId, wordId))
					.limit(1);

				const numberOfVote = votes[0]?.numberOfVote ?? 0;

				// Insert or update vote
				result = await tx
					.insert(voteWordsTable)
					.values({
						voteById: user.id,
						wordId: wordId,
						numberOfVote: numberOfVote + 1,
					})
					.returning();
			});
		} catch (error) {
			return c.json({ error: error }, 400);
		}

		if (earlyResponse) {
			return earlyResponse;
		}

		return c.json(result, 200);
	},
);
