<script setup lang="ts">
import { computed } from "vue";
import { Doughnut } from "vue-chartjs";
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	type ChartOptions,
	type ChartData,
} from "chart.js";
import { z } from "zod";
import { useGetFetchAirtable } from "@/composables/useGetFetchAirtable";

ChartJS.register(ArcElement, Tooltip, Legend);

const {
	airtableRecords: projects,
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
	},
);

const projectsChartData = computed<ChartData<"doughnut">>(() => ({
	labels: projects.value.map((project) => project.title),
	datasets: [
		{
			label: "Likes",
			data: projects.value.map((project) => project.nbLikes),
			backgroundColor: [
				"#A78BFA",
				"#5EEAD4",
				"#FCD34D",
				"#F472B6",
			],
			borderWidth: 1,
		},
	],
}));

const projectsChartOptions: ChartOptions<"doughnut"> = {
	responsive: true,
	plugins: {
		legend: {
			position: "bottom",
			labels: {
				color: "white",
				padding: 16,
			},
		},
	},
};

const INITIAL_ACCUMULATOR_VALUE = 0;

const totalLikes = computed(() => projects.value.reduce((acc, curr) => acc + curr.nbLikes, INITIAL_ACCUMULATOR_VALUE));
</script>
<template>
	<section class="min-h-screen bg-gradient-to-tr from-indigo-500 to-black flex flex-col gap-10 items-center text-white px-4 py-10">
		<h1 class="text-3xl font-bold text-center">
			Statistiques des projets
		</h1>

		<div
			v-if="isLoading"
			class="text-center text-lg"
		>
			Chargement des données...
		</div>

		<div
			v-else
			class="w-full max-w-2xl"
		>
			<Doughnut
				:data="projectsChartData"
				:options="projectsChartOptions"
			/>

			<div class="absolute inset-0 flex items-center justify-center pointer-events-none">
				<div class="text-center">
					<p class="text-sm uppercase tracking-wide opacity-70">
						Total de likes
					</p>

					<p class="text-2xl font-bold">
						{{ totalLikes }}
					</p>
				</div>
			</div>
		</div>
	</section>
</template>
