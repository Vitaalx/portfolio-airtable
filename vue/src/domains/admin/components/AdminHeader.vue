<script lang="ts" setup>
import { routerPageNameMain } from "@/domains/project/router";
import { routerPageNameAdmin } from "../router";
import { useUserAdminInformation } from "../composables/useUserAdminInformation";

const { ADMIN_PROJECTS_PAGE, ADMIN_LOGIN_PAGE } = routerPageNameAdmin;
const { HOME_PAGE } = routerPageNameMain;
const { isConnected } = useUserAdminInformation();

</script>
<template>
	<header class="bg-gray-900 text-white px-6 py-4 shadow-md">
		<nav class="flex justify-between items-center max-w-7xl mx-auto">
			<RouterLink
				:to="{ name: ADMIN_LOGIN_PAGE }"
				class="text-2xl font-semibold text-white hover:text-gray-300 transition"
			>
				Admin Panel
			</RouterLink>

			<div class="flex gap-8">
				<RouterLink
					:to="{ name: HOME_PAGE }"
					class="text-gray-300 hover:text-white transition duration-200"
				>
					Accueil
				</RouterLink>

				<RouterLink
					v-if="isConnected"
					:to="{ name: ADMIN_PROJECTS_PAGE }"
					class="text-gray-300 hover:text-white transition duration-200"
				>
					Projets
				</RouterLink>
			</div>
		</nav>
	</header>
</template>

