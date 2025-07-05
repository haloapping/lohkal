import { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import { logger } from "hono/logger";
import { languageRoute } from "./api/languange/route";
import { provinceRoute } from "./api/province/route";
import { userRoute } from "./api/user/route";
import { wordRoute } from "./api/word/route";
import { configDocs, configGeneral } from "./config/app";

const app = new OpenAPIHono();

app.use(logger());

app.basePath("/");
app.route("/users", userRoute);
app.route("/provinces", provinceRoute);
app.route("/languages", languageRoute);
app.route("/words", wordRoute);

app.doc(configDocs.openapi, {
	openapi: "3.1.0",
	info: { ...configGeneral, version: "v1" },
});

app.get(
	"/",
	Scalar({ url: "/openapi.json", pageTitle: "LohKal API", theme: "purple" }),
);

export default app;
