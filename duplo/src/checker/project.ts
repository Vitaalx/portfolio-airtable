import { createChecker, createPresetChecker, makeResponseContract, NotFoundHttpResponse } from "@duplojs/core";
import { AirtableAPI } from "../providers/airtable/airtable";
import { match } from "ts-pattern";

export const projectExistChecker = createChecker("projectExist")
	.handler(
		async(input: string, output) => {
			const airtableResponse = await AirtableAPI.getProject(input);

			return match(airtableResponse)
				.with(
					{ code: 404 },
					() => output("project.notfound", null),
				)
				.with(
					{ code: 200 },
					(response) => output("project.found", response.body),
				)
				.exhaustive();
		},
	);

export const IWantProjectExistById = createPresetChecker(
	projectExistChecker,
	{
		result: "project.found",
		catch: () => new NotFoundHttpResponse("project.notfound"),
		indexing: "project",
	},
	makeResponseContract(NotFoundHttpResponse, "project.notfound"),
);
