<script lang="ts" setup>
import AdminFooter from "@/domains/admin/components/AdminFooter.vue";
import AdminHeader from "@/domains/admin/components/AdminHeader.vue";

</script>
<template>
	<AdminHeader />

	<main class="container mx-auto mt-16 p-4">
		<RouterView />
	</main>

	<AdminFooter />
</template>
