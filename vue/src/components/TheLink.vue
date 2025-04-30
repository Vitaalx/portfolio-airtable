<script setup lang="ts">
interface LinkProps {
	to: string;
	label: string;
}

const props = defineProps<LinkProps>();

console.log("TheLink", props.to, props.label);
</script>
<template>
	<RouterLink
		:to="{ name: props.to }"
		class="font-semibold text-white hover:text-blue-500 transition"
	>
		{{ props.label }}
	</RouterLink>
</template>
