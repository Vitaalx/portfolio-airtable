<script lang="ts" setup>
import TheSonner from "@/components/ui/sonner/TheSonner.vue";
import AdminFooter from "@/domains/admin/components/AdminFooter.vue";
import AdminHeader from "@/domains/admin/components/AdminHeader.vue";

</script>
<template>
	<AdminHeader />

	<TheSonner />

	<div class="bg-gradient-to-tr from-indigo-500 to-black">
		<main class="container mx-auto min-h-screen text-white">
			<RouterView />
		</main>
	</div>

	<AdminFooter />
</template>
