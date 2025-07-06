import { z } from "@hono/zod-openapi";

export const getAllSubmissionProvincesResp = z.object({
	username: z.string(),
	email: z.string().email(),
	submitProvinces: z.array(z.string()),
});

export const getAllSubmissionLanguagesResp = z.object({
	username: z.string(),
	email: z.string().email(),
	submitLanguages: z.array(z.string()),
});

export const getAllSubmissionWordsResp = z.object({
	username: z.string(),
	email: z.string().email(),
	submitWords: z.array(z.string()),
});
