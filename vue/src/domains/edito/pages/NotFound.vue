<script setup lang="ts">
import TheButton from "@/components/ui/button/TheButton.vue";
import { routerPageNameMain } from "@/domains/project/router";
const { HOME_PAGE } = routerPageNameMain;
</script>

<template>
	<section class="min-h-screen flex flex-col items-center justify-center text-center px-4">
		<h1 class="text-3xl lg:text-4xl font-bold">
			Oups... cette page n'existe pas
		</h1>

		<p class="mt-4 lg:text-lg max-w-md text-muted-foreground">
			Il semble que vous ayez suivi un lien brisé ou que la page ait été déplacée.
		</p>

		<TheButton
			@click="$router.push({ name: HOME_PAGE })"
			size="lg"
			class="mt-8"
			as-child
		>
			<span>
				Retourner à l'accueil
			</span>
		</TheButton>
	</section>
</template>

