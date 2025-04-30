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
	<div class="min-h-screen flex items-center justify-center relative overflow-hidden">
		<form
			class="relative z-10 w-full max-w-md backdrop-blur-md bg-white/30 border border-white/20 rounded-2xl shadow-xl px-10 py-10 space-y-8"
			@submit.prevent="onSubmit"
		>
			<h2 class="text-3xl font-bold text-center text-white drop-shadow">
				Espace Admin
			</h2>

			<FormField
				v-slot="{ value, setValue }"
				name="email"
			>
				<FormItem>
					<FormLabel class="block mb-1 font-semibold text-white drop-shadow">
						Adresse e-mail
					</FormLabel>

					<FormControl>
						<TheInput
							id="email"
							type="email"
							placeholder="exemple@mail.com"
							:model-value="value"
							@update:model-value="setValue"
							class="w-full rounded-lg bg-white/80 text-gray-800 focus:ring-2 focus:ring-pink-400"
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
					<FormLabel class="block mb-1 font-semibold text-white drop-shadow">
						Mot de passe
					</FormLabel>

					<FormControl>
						<TheInput
							id="password"
							type="password"
							placeholder="••••••••"
							:model-value="value"
							@update:model-value="setValue"
							class="w-full rounded-lg bg-white/80 text-gray-800 focus:ring-2 focus:ring-pink-400"
							required
						/>
					</FormControl>

					<FormMessage />
				</FormItem>
			</FormField>

			<TheButton
				type="submit"
				class="w-full bg-black hover:bg-gray-800 transition-all text-white font-semibold py-2 rounded-xl shadow-md"
			>
				Se connecter
			</TheButton>
		</form>
	</div>
</template>

