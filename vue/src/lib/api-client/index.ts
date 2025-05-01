import { HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import type { CodegenRoutes } from "./types/duplojsTypesCodegen";
import { envs } from "@/envs";
import { useUserAdminInformation } from "@/domains/admin/composables/useUserAdminInformation";
import { useSonner } from "@/composables/useSonner";

export type PortfolioAPIClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

const { accessTokenItem } = useUserAdminInformation();
const { sonnerWarning } = useSonner();

export const portfolioApiClient = new HttpClient<PortfolioAPIClientRoute>({
	baseUrl: envs.VITE_API_BASE_URL,
})
	.setDefaultRequestParams({
		mode: "cors",
		headers: {
			get authorization() {
				return accessTokenItem.value ?? undefined;
			},
		},
	})
	.setInterceptor(
		"response",
		(response) => {
			if (response.information === "access.token.invalid") {
				sonnerWarning("Vous n'êtes plus connecté.");
				window.location.href = "/admin-panel/login";
			}
			return response;
		},
	);
