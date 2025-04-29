<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";
import { TheButton } from "@/components/ui/button";
import { TheInput } from "@/components/ui/input";

import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"

const formSchema = toTypedSchema(zod.object({
	username: zod.string().min(2).max(50),
}));

const form = useForm({
	validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((values) => {
	console.log("Form submitted!", values);
});
</script>

<template>
	<form @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="username">
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <TheInput type="text" placeholder="shadcn" v-bind="componentField" />
        </FormControl>
        <FormDescription>
          This is your public display name.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <TheButton type="submit">
      Submit
    </TheButton>
  </form>
</template>
