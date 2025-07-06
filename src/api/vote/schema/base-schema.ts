import { z } from "@hono/zod-openapi";

export const voteWordSchema = z.object({
	id: z.string().ulid(),
	voteById: z.string().ulid().openapi({ example: "0" }),
	wordId: z.string().ulid().openapi({ example: "" }),
	numberOfVote: z.number().positive().openapi({ example: 1 }),
	createdAt: z.number().positive().openapi({ example: 0 }),
	updatedAt: z.number().positive().openapi({ example: 0 }),
});
