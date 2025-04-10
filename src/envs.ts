import { config as importEnvFile } from "dotenv";
import { expand as expandEnv } from "dotenv-expand";
import { z } from "zod";

declare global {
	// eslint-disable-next-line @typescript-eslint/consistent-type-imports
	const ENV: (typeof import("./envs"))["default"];
}

for (const pathEnv of [".env.local", ".env"]) {
	expandEnv(
		importEnvFile({ path: pathEnv }),
	);
}

//@ts-expect-error var 'global' cause type error.
export default global.ENV = z
	.object({
		AIRTABLE_API_KEY: z.string(),
		AIRTABLE_BASE_URL: z.string(),
	})
	.readonly()
	.parse(process.env);
