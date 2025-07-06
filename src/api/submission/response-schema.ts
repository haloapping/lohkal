import { z } from "@hono/zod-openapi";

export const getAllSubmissionProvinces = z.object({
	username: z.string(),
	email: z.string().email(),
	submitProvinces: z.array(z.string()),
});
