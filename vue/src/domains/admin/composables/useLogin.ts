import { useLoader } from "@/composables/useLoader";
import { useSonner } from "@/composables/useSonner";
import { portfolioApiClient } from "@/lib/api-client";
import { useUserAdminInformation } from "./useUserAdminInformation";
import { useRouter } from "vue-router";
import { routerPageNameAdmin } from "../router";

interface InputLogin {
	email: string;
	password: string;
}

export function useLogin() {
	const {
		setLoading,
	} = useLoader();
	const {
		sonnerError,
		sonnerMessage,
	} = useSonner();
	const {
		setAccessToken,
	} = useUserAdminInformation();
	const router = useRouter();

	async function login(input: InputLogin) {
		setLoading(true);
		await portfolioApiClient.post(
			"/authentication",
			{
				body: {
					email: input.email,
					password: input.password,
				},
			},
		).whenInformation(
			"user.logged",
			async(response) => {
				setAccessToken(response.body);
				sonnerMessage("Authentification avec succès ✅");
				await router.push({
					name: routerPageNameAdmin.ADMIN_PROJECTS_PAGE,
				});
			},
		).whenInformation(
			"user.notfound",
			() => sonnerError("Utilisation introuvable ❌"),
		)
			.whenInformation(
				"user.invalid.password",
				() => sonnerError("Mot de passe incorrect ❌"),
			)
			.finally(() => {
				setLoading(false);
			});
	}

	return {
		login,
	};
}
