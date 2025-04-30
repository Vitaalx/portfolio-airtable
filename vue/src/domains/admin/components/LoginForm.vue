<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";
import { TheButton } from "@/components/ui/button";
import {
	FormControl,
	FormField,
	FormLabel,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import TheInput from "@/components/ui/input/TheInput.vue";
import { useLogin } from "@/domains/admin/composables/useLogin";

const formSchema = toTypedSchema(zod.object({
	email: zod.string().email({
		message: "Adresse mail incorrect.",
	}),
	password: zod.string(),
}));

const {
	login,
} = useLogin();

const form = useForm({
	validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(
	async(values) => {
		await login({
			email: values.email,
			password: values.password,
		});
	},
);
</script>

<template>
	<form
		class="w-[500px] bg-white px-10 py-8 rounded-3xl shadow-lg space-y-8"
		@submit.prevent="onSubmit"
	>
		<h2 class="text-2xl font-bold text-center text-gray-800">
			Connexion
		</h2>

		<FormField
			v-slot="{ value, setValue }"
			name="email"
		>
			<FormItem>
				<FormLabel
					for="email"
					class="block mb-2 font-semibold text-gray-700"
				>
					Adresse e-mail
				</FormLabel>

				<FormControl>
					<TheInput
						id="email"
						type="email"
						placeholder="exemple@mail.com"
						:model-value="value"
						@update:model-value="setValue"
						class="w-full"
						required
					/>
				</FormControl>

				<FormMessage />
			</FormItem>
		</FormField>

		<FormField
			v-slot="{ value, setValue }"
			name="password"
		>
			<FormItem>
				<FormLabel
					for="password"
					class="block mb-2 font-semibold text-gray-700"
				>
					Mot de passe
				</FormLabel>

				<FormControl>
					<TheInput
						id="password"
						type="password"
						placeholder="••••••••"
						:model-value="value"
						@update:model-value="setValue"
						class="w-full"
						required
					/>
				</FormControl>

				<FormMessage />
			</FormItem>
		</FormField>

		<TheButton
			type="submit"
			class="w-full"
		>
			Se connecter
		</TheButton>
	</form>
</template>

