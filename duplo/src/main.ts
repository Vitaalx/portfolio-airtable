import "@duplojs/node";
import { Duplo, useProcessBuilder, useRouteBuilder } from "@duplojs/core";
import { envs } from "./envs";
import "./routes";

const duplo = new Duplo({
    environment: envs.ENVIROMENT,
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
		() => console.log(`Duplo is running on http://${host}:${port}`),
	);