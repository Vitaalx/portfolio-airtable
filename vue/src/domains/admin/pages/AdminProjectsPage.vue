<script setup lang="ts">
import { useGetFetchAirtable } from "@/composables/useGetFetchAirtable";
import { ref } from "vue";
import { z } from "zod";
import TheSwitch from "@/components/ui/switch/TheSwitch.vue";
import { portfolioApiClient } from "@/lib/api-client";
import { useSonner } from "@/composables/useSonner";
import { useLoader } from "@/composables/useLoader";

const {
	sonnerError,
	sonnerMessage,
} = useSonner();

const { setLoading } = useLoader();

const {
	airtableRecords: projects,
	getRecords: getProjects,
	isLoading,
} = useGetFetchAirtable(
	"Project",
	{
		title: z.string(),
		status: z.enum(["Published", "Unpublished"]),
		image: z.string(),
		summary: z.object({
			value: z.string(),
		}),
	},
);

const inputRef = ref<HTMLInputElement | null>(null);

function handleSearch() {
	if (!inputRef.value) {
		return;
	}

	const keyword = inputRef.value.value;

	if (keyword === "") {
		getProjects();
	} else {
		projects.value = projects.value.filter(
			(project) => project.title.toLocaleLowerCase().startsWith(keyword.toLocaleLowerCase()),
		);
	}
}

async function toggleStatus(projectId: string, checked: boolean) {
	setLoading(true);
	const finalStatus = checked ? "Published" : "Unpublished";

	await portfolioApiClient.patch(
		"/projects/{projectId}",
		{
			params: {
				projectId,
			},
			body: {
				fields: {
					status: finalStatus,
				},
			},
		},
	).whenInformation(
		"project.updated",
		() => {
			sonnerMessage(`Le projet a été ${checked ? "publié" : "dépublié"} avec succès.`);
		},
	).whenInformation(
		"project.notfound",
		() => {
			sonnerError("Le projet n'existe pas.");
		},
	)
		.finally(() => {
			setLoading(false);
		});

	getProjects();
}
</script>
<template>
	<section class="min-h-screen py-12 px-6">
		<div class="max-w-7xl mx-auto">
			<div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
				<h1 class="text-3xl font-bold text-white">
					Projets ({{ projects.length }})
				</h1>

				<input
					class="bg-white/10 border border-white/20 w-full sm:w-96 rounded-lg p-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-400"
					ref="inputRef"
					type="text"
					placeholder="Rechercher un projet..."
					@input="handleSearch"
				>
			</div>

			<div
				v-if="!isLoading"
				class="overflow-x-auto bg-gray-900 shadow-lg rounded-xl ring-1 ring-white/10"
			>
				<table class="min-w-full divide-y divide-white/10">
					<thead class="bg-white/10">
						<tr>
							<th class="px-6 py-4 text-left text-sm font-semibold text-white/80">
								Image
							</th>

							<th class="px-6 py-4 text-left text-sm font-semibold text-white/80">
								Titre
							</th>

							<th class="px-6 py-4 text-left text-sm font-semibold text-white/80">
								Résumé
							</th>

							<th class="px-6 py-4 text-left text-sm font-semibold text-white/80">
								Status
							</th>
						</tr>
					</thead>

					<tbody class="divide-y divide-white/10">
						<tr
							v-for="project in projects"
							:key="project.id"
							class="hover:bg-white/10 transition duration-150"
						>
							<td class="px-6 py-4">
								<img
									:src="project.image"
									alt="Image projet"
									class="w-20 h-14 object-cover rounded-lg border border-white/10 shadow-sm"
								>
							</td>

							<td class="px-6 py-4 text-white font-medium">
								{{ project.title }}
							</td>

							<td class="px-6 py-4 text-white/80 max-w-sm truncate">
								{{ project.summary.value }}
							</td>

							<td class="px-6 py-4 flex gap-2">
								<TheSwitch
									:disabled="isLoading"
									class="cursor-pointer transition-colors"
									:model-value="project.status === 'Published'"
									@update:model-value="(value: boolean) => toggleStatus(project.id, value)"
									:class="project.status === 'Published'
										? 'data-[state=checked]:bg-green-500'
										: 'data-[state=unchecked]:bg-red-500'"
								/>

								<span
									class="text-sm font-medium"
								>
									{{ project.status === 'Published' ? 'Publié' : 'Non publié' }}
								</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<p
				v-if="!isLoading && projects.length === 0"
				class="text-center text-lg text-white/70 mt-8"
			>
				Aucun projet trouvé.
			</p>
		</div>
	</section>
</template>

