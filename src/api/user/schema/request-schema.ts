import { z } from "@hono/zod-openapi";

export const registerUserSchemaReq = z
	.object({
		username: z.string().nonempty().openapi({ example: "apping" }),
		email: z
			.string()
			.email()
			.nonempty()
			.openapi({ example: "apping@jamil.com" }),
		photoProfile: z.string().url().optional().openapi({ example: "" }),
		password: z
			.string()
			.min(8, { message: "Password must be at least 8 characters long" })
			.refine((val) => /[A-Z]/.test(val), {
				message: "Password must contain at least one uppercase letter",
			})
			.refine((val) => /[a-z]/.test(val), {
				message: "Password must contain at least one lowercase letter",
			})
			.refine((val) => /[0-9]/.test(val), {
				message: "Password must contain at least one number",
			})
			.refine((val) => /[!@#$%^&*(),.?":{}|<>_\-\\[\];'/`~+=]/.test(val), {
				message: "Password must contain at least one punctuation character",
			})
			.openapi({ example: "s3cretP4ssw0rd!" }),
		confirmPassword: z
			.string()
			.min(8, { message: "Password must be at least 8 characters long" })
			.refine((val) => /[A-Z]/.test(val), {
				message: "Password must contain at least one uppercase letter",
			})
			.refine((val) => /[a-z]/.test(val), {
				message: "Password must contain at least one lowercase letter",
			})
			.refine((val) => /[0-9]/.test(val), {
				message: "Password must contain at least one number",
			})
			.refine((val) => /[!@#$%^&*(),.?":{}|<>_\-\\[\];'/`~+=]/.test(val), {
				message: "Password must contain at least one punctuation character",
			})
			.openapi({ example: "s3cretP4ssw0rd!" }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export const loginUserSchemaReq = z.object({
	username: z.string().nonempty().openapi({ example: "apping" }),
	email: z.string().email().nonempty().openapi({ example: "apping@jamil.com" }),
	password: z.string().nonempty().openapi({ example: "s3cretP4ssw0rd!" }),
});
