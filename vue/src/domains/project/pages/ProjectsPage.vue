<script setup lang="ts">
import { useGetFetchAirtable } from "@/composables/useGetFetchAirtable";
import ProjectCard from "../components/ProjectCard.vue";
import { z } from "zod";
import { ref } from "vue";

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
		technologyNames: z.array(z.string()),
		studentCount: z.number(),
		technologyCount: z.number(),
		keywords: z.object({
			value: z.string(),
		}),
		nbLikes: z.number(),
		studentNames: z.array(z.string()),
		likes: z.string().array().nullable(),
	},
	{
		status: "Published",
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

</script>
<template>
	<section class="min-h-screen">
		<div class="flex flex-row justify-between items-center p-4">
			<h1 class="text-center text-3xl font-bold">
				Projets publiés ({{ projects.length }})
			</h1>

			<input
				class="border border-gray-300 w-100 rounded p-2"
				ref="inputRef"
				type="text"
				placeholder="Rechercher un projet..."
				@input="handleSearch"
			>
		</div>

		<template v-if="!isLoading">
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
				<ProjectCard
					v-for="project in projects"
					:key="project.id"
					:project="project"
					class="mb-4"
					@on-liked="getProjects"
				/>
			</div>
		</template>

		<template v-if="!isLoading && projects.length === 0">
			<p class="text-center text-lg">
				Aucun projet trouvé.
			</p>
		</template>
	</section>
</template>
