<script setup lang="ts">
import TheLink from "@/components/TheLink.vue";
import { routerPageNameMain } from "@/domains/project/router";
const { HOME_PAGE } = routerPageNameMain;
</script>

<template>
	<section class="h-screen-nh flex flex-col items-center justify-center">
		<h1 class="text-3xl lg:text-5xl font-bold">
			Page non trouvée
		</h1>

		<p class="mt-4 text-base lg:text-lg font-medium opacity-50">
			Pas trouvée
		</p>

		<TheButton
			size="lg"
			class="mt-8 w-min"
			as-child
		>
			<TheLink
				:to="HOME_PAGE"
				label="Projet"
			/>
		</TheButton>
	</section>
</template>
