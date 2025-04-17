<script setup lang="ts">
import { TheCard, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TheBadge } from "@/components/ui/badge";
import { envs } from "@/envs";
import { ref } from "vue";

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

const props = defineProps<ProjectCardProps>();
const emit = defineEmits<(e: "on-liked") => void>();

const isLikeClicked = ref(false);

async function addLike(projectId: string) {
	if (isLikeClicked.value) {
		return;
	}

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
					project: [projectId],
				},
			}),
		},
	);
	isLikeClicked.value = true;
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
        <div class="flex flex-col gap-">
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
          <div class="text-xs text-muted-foreground">
            {{ props.project.studentCount }} étudiant(s) • {{ props.project.technologyCount }} techno(s)
          </div>
          <div class="text-xs text-muted-foreground">
            {{ props.project.keywords.value }}
          </div>
        </div>
      </CardContent>

      <CardFooter class="flex justify-between items-center px-4 pb-4">
        <div
          class="text-sm p-1 rounded text-muted-foreground cursor-pointer"
          :class="{
            'bg-gray-200': isLikeClicked
          }"
          @click="addLike(props.project.id)"
        >
          {{ props.project.nbLikes }} ❤️
        </div>
        <div
          class="text-sm text-muted-foreground"
        >
          {{ props.project.studentNames.join(', ') }}
        </div>
      </CardFooter>
    </div>
  </TheCard>
</template>
