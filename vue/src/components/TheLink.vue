<script setup lang="ts">
interface LinkProps {
	to: string;
	label: string;
}

const props = defineProps<LinkProps>();

</script>
<template>
	<RouterLink
		:to="{ name: props.to }"
		class="font-semibold hover:text-blue-500 transition"
	>
		{{ props.label }}
	</RouterLink>
</template>
