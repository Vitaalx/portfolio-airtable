<script setup lang="ts">
import { TheCard, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TheBadge } from "@/components/ui/badge";
import { envs } from "@/envs";
import { useSonner } from "@/composables/useSonner";
import { useLikeItemLocalStorage } from "../composables/useLikeItemLocalStorage";
import { z } from "zod";

interface ProjectCard {
	id: string;
	studentCount: number;
	technologyCount: number;
	studentNames: string[];
	nbLikes: number;
	image: string;
	title: string;
	summary: {
		value: string;
	};
	status: "Published" | "Unpublished";
	technologyNames: string[];
	keywords: {
		value: string;
	};
}

interface ProjectCardProps {
	project: ProjectCard;
}

const postLikePayloadSchema = z.object({
	id: z.string(),
});

const props = defineProps<ProjectCardProps>();
const emit = defineEmits<(e: "on-liked") => void>();

const { sonnerMessage } = useSonner();

const {
	setLikeItem,
	deleteLikeItem,
	isLikedComputedValue,
	likeIdItem,
} = useLikeItemLocalStorage(props.project.id);

async function addLike() {
	if (isLikedComputedValue.value && likeIdItem.value) {
		await fetch(
			`${envs.VITE_AIRTABLE_BASE_URL}Like?records[]=${likeIdItem.value}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${envs.VITE_AIRTABLE_API_KEY}`,
				},
			},
		).then(
			(response) => {
				if (!response.ok) {
					sonnerMessage("Erreur lors de la suppression du like !");
					return;
				}
				return response.json();
			},
		).then(
			() => {
				void deleteLikeItem();
				sonnerMessage("Vous avez retiré votre like !");
			},
		);
	} else {
		await fetch(
			`${envs.VITE_AIRTABLE_BASE_URL}Like`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${envs.VITE_AIRTABLE_API_KEY}`,
				},
				body: JSON.stringify({
					fields: {
						project: [props.project.id],
					},
				}),
			},
		)
			.then(
				(response) => {
					if (!response.ok) {
						sonnerMessage("Erreur lors de l'ajout du like !");
						return;
					}
					return response.json();
				},
			)
			.then(
				(json) => {
					const {
						success,
						data: like,
						error,
					} = postLikePayloadSchema.safeParse(json);

					if (!success) {
						throw new Error(error.errors.shift()!.message);
					}

					setLikeItem(like.id);
					sonnerMessage("Vous avez aimé le projet !");
				},
			);
	}
	emit("on-liked");
}
</script>
<template>
	<TheCard class="w-full max-w-md shadow-md border p-0">
		<div class="flex flex-col h-full justify-between">
			<CardHeader class="space-y-1 px-4 pt-4">
				<img
					:src="props.project.image"
					alt="project image"
					class="w-full h-48 object-cover rounded-t-md"
				>

				<div class="flex justify-between items-center">
					<CardTitle class="text-lg font-semibold">
						{{ props.project.title }}
					</CardTitle>

					<TheBadge
						:variant="props.project.status === 'Published' ? 'default' : 'secondary'"
						:class="{
							'bg-green-100 text-green-800': props.project.status === 'Published',
							'bg-red-100 text-red-800': props.project.status === 'Unpublished',
						}"
					>
						{{ props.project.status }}
					</TheBadge>
				</div>
			</CardHeader>

			<CardContent class="px-4 pb-4 space-y-2 mt-4">
				<div class="flex flex-col gap-4">
					<CardDescription class="text-sm text-gray-600 line-clamp-3">
						{{ props.project.summary.value }}
					</CardDescription>

					<div class="flex flex-wrap gap-1 text-sm text-gray-500">
						<span
							v-for="tech in props.project.technologyNames"
							:key="tech"
							class="bg-muted px-2 py-1 rounded"
						>
							{{ tech }}
						</span>
					</div>

					<div class="flex justify-between items-center text-xs text-muted-foreground">
						<span>{{ props.project.studentCount }} étudiant(s)</span>

						<span> {{ props.project.technologyCount }} techno(s)</span>
					</div>

					<div class="text-xs text-muted-foreground">
						{{ props.project.keywords.value }}
					</div>
				</div>
			</CardContent>

			<CardFooter class="flex justify-between items-center px-4 pb-4 mt-4">
				<button
					@click="addLike"
					class="flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-full border transition duration-200 cursor-pointer"
					:class="isLikedComputedValue ? 'bg-gray-800 text-white border-transparent shadow' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-300'"
				>
					<span>{{ props.project.nbLikes }}</span>

					<span>❤️</span>
				</button>

				<p class="text-xs text-gray-400 truncate max-w-[50%] text-right">
					{{ props.project.studentNames.join(', ') }}
				</p>
			</CardFooter>
		</div>
	</TheCard>
</template>
