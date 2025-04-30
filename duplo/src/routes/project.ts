import { makeResponseContract, OkHttpResponse, zod } from "@duplojs/core";
import { statusTuple } from "../providers/airtable/getProject";
import { IWantProjectExistById } from "../checker/project";
import { AirtableAPI } from "../providers/airtable/airtable";
import { endpointProjectSchema } from "../schemas/project";
import { useMustBeConnectedBuilder } from "../security/mustBeConnected";

useMustBeConnectedBuilder()
	.createRoute("PATCH", "/projects/{projectId}")
	.extract({
		params: {
			projectId: zod.string(),
		},
		body: zod.object({
			fields: zod.object({
				status: zod.enum(statusTuple),
			}),
		}),
	})
	.presetCheck(
		IWantProjectExistById,
		(pickup) => pickup("projectId"),
	)
	.handler(
		async(pickup) => {
			const { body, projectId } = pickup(["body", "projectId"]);

			console.log("duplo called");

			const airtableResponse = await AirtableAPI.updateProject(
				projectId,
				body.fields.status,
			);

			return new OkHttpResponse(
				"project.updated",
				airtableResponse.body,
			);
		},
		makeResponseContract(OkHttpResponse, "project.updated", endpointProjectSchema),
	);

useMustBeConnectedBuilder()
	.createRoute("GET", "/projects/{projectId}")
	.extract({
		params: {
			projectId: zod.string(),
		},
	})
	.presetCheck(
		IWantProjectExistById,
		(pickup) => pickup("projectId"),
	)
	.handler(
		(pickup) => {
			const project = pickup("project");

			return new OkHttpResponse(
				"project.found",
				project,
			);
		},
		makeResponseContract(OkHttpResponse, "project.found", endpointProjectSchema),
	);
