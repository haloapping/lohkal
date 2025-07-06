import { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import { logger } from "hono/logger";
import { languageRoute } from "./api/language/route";
import { provinceRoute } from "./api/province/route";
import { submissionRoute } from "./api/submission/route";
import { userRoute } from "./api/user/route";
import { voteRoute } from "./api/vote/route";
import { wordRoute } from "./api/word/route";
import { configDocs, configGeneral } from "./config/app";

const app = new OpenAPIHono();

app.use(logger());

app.basePath("/");
app.route("/users", userRoute);
app.route("/provinces", provinceRoute);
app.route("/languages", languageRoute);
app.route("/words", wordRoute);
app.route("/submissions", submissionRoute);
app.route("/votes", voteRoute);

app
	.doc(configDocs.openapi, {
		openapi: "3.1.0",
		info: { ...configGeneral, version: "v1" },
	})
	.openAPIRegistry.registerComponent("securitySchemes", "Bearer", {
		type: "http",
		scheme: "bearer",
		in: "header",
		description: "Bearer token for authentication",
	});

app.get(
	"/",
	Scalar({ url: "/openapi.json", pageTitle: "LohKal API", theme: "purple" }),
);

export default app;
