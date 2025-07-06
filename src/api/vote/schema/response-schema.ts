import { z } from "@hono/zod-openapi";
import { voteWordSchema } from "./base-schema";

export const voteWordResp = z.object({
	message: z.string(),
	data: voteWordSchema,
});
