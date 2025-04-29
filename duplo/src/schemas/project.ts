import { zod } from "@duplojs/core";

export const endpointProjectSchema = zod.object({
	id: zod.string(),
	fields: zod.object({
		title: zod.string(),
		status: zod.enum(["Published", "Unpublished"]),
		nbLikes: zod.number(),
	}),
	createdTime: zod.string(),
});
