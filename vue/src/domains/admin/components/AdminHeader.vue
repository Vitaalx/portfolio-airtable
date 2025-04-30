<script lang="ts" setup>
import { routerPageNameMain } from "@/domains/project/router";
import { routerPageNameAdmin } from "../router";
import { useUserAdminInformation } from "../composables/useUserAdminInformation";
import TheLink from "@/components/TheLink.vue";
import TheButton from "@/components/ui/button/TheButton.vue";
import { useRouter } from "vue-router";

const { ADMIN_PROJECTS_PAGE, ADMIN_LOGIN_PAGE } = routerPageNameAdmin;
const { HOME_PAGE } = routerPageNameMain;
const { isConnected, deleteAccessToken } = useUserAdminInformation();
const router = useRouter();

async function handleLogout() {
	deleteAccessToken();
	await router.push({ name: routerPageNameAdmin.ADMIN_LOGIN_PAGE });
}
</script>
<template>
	<header class="bg-black text-white p-6 shadow-md">
		<nav class="flex justify-between items-center">
			<TheLink
				class="text-2xl"
				:to="ADMIN_LOGIN_PAGE"
				label="Admin Panel"
			/>

			<div class="flex gap-6 items-center">
				<TheLink
					:to="HOME_PAGE"
					label="Accueil"
				/>

				<div
					v-if="!isConnected"
				>
					<TheLink
						:to="ADMIN_LOGIN_PAGE"
						label="Login"
					/>
				</div>

				<div
					v-else
					class="flex items-center justify-between w-[200px]"
				>
					<TheLink
						:to="ADMIN_PROJECTS_PAGE"
						label="Projets"
					/>

					<TheButton
						type="submit"
						class="bg-black hover:bg-gray-800 transition-all text-white font-semibold py-2 rounded-xl shadow-md"
						@click="handleLogout()"
					>
						Se déconnecter
					</TheButton>
				</div>
			</div>
		</nav>
	</header>
</template>

