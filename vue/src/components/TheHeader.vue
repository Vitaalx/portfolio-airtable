<script setup lang="ts">
import { RouterLink } from "vue-router";

</script>
<template>
	<header class="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
		<nav class="flex items-center justify-between p-4">
			<div class="text-lg font-bold">
				Portfolio - API Airtable
			</div>

			<ul class="flex space-x-4">
				<RouterLink
					to="/admin-panel"
					class="text-gray-700 hover:text-blue-500"
				>
					Admin
				</RouterLink>
			</ul>
		</nav>
	</header>
</template>
