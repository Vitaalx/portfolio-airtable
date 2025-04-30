<script setup lang="ts">
import { routerPageNameAdmin } from "@/domains/admin/router";
import TheLink from "./TheLink.vue";

const { ADMIN_PROJECTS_PAGE } = routerPageNameAdmin;
</script>
<template>
	<header class="sticky top-0 left-0 right-0 bg-black shadow-md z-10 text-white">
		<nav class="flex items-center justify-between p-4">
			<div class="text-lg font-bold">
				Portfolio - API Airtable
			</div>

			<ul class="flex space-x-4">
				<TheLink
					:to="ADMIN_PROJECTS_PAGE"
					label="Admin"
				/>
			</ul>
		</nav>
	</header>
</template>
