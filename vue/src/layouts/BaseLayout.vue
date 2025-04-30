<script lang="ts" setup>
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
</script>
<template>
	<TheHeader />

	<main class="container min-h-screen">
		<RouterView />
	</main>

	<TheFooter />
</template>
