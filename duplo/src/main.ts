import "@duplojs/node";
import { Duplo, useProcessBuilder, useRouteBuilder } from "@duplojs/core";
import { envs } from "./envs";
import "./routes";

const duplo = new Duplo({
	environment: envs.ENVIRONMENT,
	host: envs.HOST,
	port: envs.PORT,
});

const { host, port } = duplo.config;

duplo.register(
	...useProcessBuilder.getAllCreatedProcess(),
	...useRouteBuilder.getAllCreatedRoute(),
);

await duplo
	.launch()
	.then(
		() => void console.log(`Duplo is running on http://${host}:${port}`),
	);
