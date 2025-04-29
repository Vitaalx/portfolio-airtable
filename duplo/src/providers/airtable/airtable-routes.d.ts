import { type AirtableProjectPayload, type ProjectStatus } from "./getProject";
import { type AirtableAdminUserPayload } from "./getUser";

/* eslint-disable @typescript-eslint/no-magic-numbers */
export type AirtableRoutes =
| {
	method: "GET";
	path: "/Admin";
	query: {
		filterByFormula: string;
	};
	response:
			| {
				code: 200;
				information: undefined;
				body: AirtableAdminUserPayload;
				ok: true;
			};
}
| {
	method: "PATCH";
	path: "/Project/{projectId}";
	params: {
		projectId: string;
	};
	body: {
		fields: {
			status: ProjectStatus;
		};
	};
	response:
			| {
				code: 200;
				information: string;
				body: AirtableProjectPayload;
				ok: true;
			};
}
| {
	method: "GET";
	path: "/Project/{projectId}";
	params: {
		projectId: string;
	};
	response:
			| {
				code: 200;
				information: undefined;
				body: AirtableProjectPayload;
				ok: true;
			}
			| {
				code: 404;
				information: undefined;
				body: {
					error: "NOT_FOUND";
				};
				ok: false;
			};
};

