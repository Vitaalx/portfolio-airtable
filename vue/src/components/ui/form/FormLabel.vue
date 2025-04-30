<script lang="ts" setup>
import type { LabelProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { useFormField } from "./useFormField";
const props = defineProps<LabelProps & { class?: HTMLAttributes["class"] }>();

const { formItemId } = useFormField();
</script>

<template>
	<label
		:for="formItemId"
		:class="cn('data-[error=true]:text-destructive-foreground', props.class)"
	>
		<slot />
	</label>
</template>
