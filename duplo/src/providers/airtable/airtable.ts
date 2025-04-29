import { HttpClient } from "@duplojs/http-client";
import { envs } from "../../envs";
import { type AirtableRoutes } from "./airtable-routes";
import { condensedProjectPayloadSchema, type ProjectStatus } from "./getProject";
import { airtableAdminUserPayloadSchema } from "./getUser";

export class AirtableAPI {
	private static httpClient: HttpClient<AirtableRoutes>;

	public static getAdminUserByEmail(email: string) {
		return this.httpClient.get(
			"/Admin",
			{
				query: {
					filterByFormula: `email='${email}'`,
				},
			},
		).iWantExpectedResponse()
			.then(
				(response) => ({
					...response,
					body: airtableAdminUserPayloadSchema.parse(response.body),
				}),
			);
	}

	public static getProject(projectId: string) {
		return this.httpClient.get(
			"/Project/{projectId}",
			{
				params: {
					projectId,
				},
			},
		).iWantExpectedResponse()
			.then(
				(response) => ({
					...response,
					body: condensedProjectPayloadSchema.parse(response.body),
				}),
			);
	}

	public static updateProject(projectId: string, status: ProjectStatus) {
		return this.httpClient.patch(
			"/Project/{projectId}",
			{
				params: {
					projectId,
				},
				body: {
					fields: {
						status,
					},
				},
			},
		).iWantExpectedResponse()
			.then(
				(response) => ({
					...response,
					body: condensedProjectPayloadSchema.parse(response.body),
				}),
			);
	}

	static {
		this.httpClient = new HttpClient<AirtableRoutes>({
			baseUrl: envs.AIRTABLE_BASE_URL,
		})
			.setDefaultRequestParams({
				headers: {
					get authorization() {
						return `Bearer ${envs.AIRTABLE_API_KEY}`;
					},
				},
			});
	}
}
