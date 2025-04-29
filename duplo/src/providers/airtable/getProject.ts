import { ZodAccelerator, type ZodSpace, zod } from "@duplojs/core";

export const statusTuple = ["Published", "Unpublished"] as const;

export type ProjectStatus = (typeof statusTuple)[number];

export const airtableProjectPayload = zod.object({
	id: zod.string(),
	createdTime: zod.string(),
	fields: zod.object({
		title: zod.string(),
		description: zod.string(),
		status: zod.enum(statusTuple),
		image: zod.string(),
		students: zod.string().array(),
		technologies: zod.string().array(),
		nbLikes: zod.number(),
		likes: zod.string().array(),
		summary: zod.object({
			state: zod.string(),
			errorType: zod.string(),
			value: zod.string(),
			isStale: zod.boolean(),
		}),
		keywords: zod.object({
			state: zod.string(),
			errorType: zod.string(),
			value: zod.string(),
			isStale: zod.boolean(),
		}),
		studentCount: zod.number(),
		technologyCount: zod.number(),
		technologyNames: zod.string().array(),
		studentNames: zod.string().array(),
	}),
});

export const projectPayloadBuildedSchema = ZodAccelerator.build(airtableProjectPayload);
export type AirtableProjectPayload = ZodSpace.infer<typeof airtableProjectPayload>;

export const condensedProjectPayloadSchema = zod.object({
	id: zod.string(),
	createdTime: zod.string(),
	fields: zod.object({
		title: zod.string(),
		description: zod.string(),
		status: zod.enum(statusTuple),
		image: zod.string(),
		nbLikes: zod.number(),
		studentCount: zod.number(),
		technologyCount: zod.number(),
	}),
});

export const condensedProjectPayloadBuildedSchema = ZodAccelerator.build(condensedProjectPayloadSchema);
export type Project = ZodSpace.infer<typeof condensedProjectPayloadSchema>;
