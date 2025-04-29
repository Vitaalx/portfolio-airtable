import { HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import type { CodegenRoutes } from "./types/duplojsTypesCodegen";
import { envs } from "@/envs";
import { useUserAdminInformation } from "@/domains/admin/composables/useUserAdminInformation";

export type PortfolioAPIClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

const { accessToken } = useUserAdminInformation();

export const portfolioApiClient = new HttpClient<PortfolioAPIClientRoute>({
	baseUrl: envs.VITE_AIRTABLE_BASE_URL,
})
	.setDefaultRequestParams({
		mode: "cors",
		headers: {
			get authorization() {
				return accessToken.value ?? undefined;
			},
		},
	});
