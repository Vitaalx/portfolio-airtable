<script setup lang="ts">
import { RouterView } from "vue-router";
import TheButton from "./components/ui/button/TheButton.vue";
import { projectSchema } from "@/schemas/project";

async function click() {
	await fetch("https://api.airtable.com/v0/appWVbhDdDZ3a6269/Project", {
		method: "GET",
		headers: {
			Authorization: "Bearer patJ8epPt3vOFC64I.500b60268567f964c9eb47826da3b45230ed9b50bcb8853f9dd138bb9e6b5da4",
			"Content-Type": "application/json",
		},
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		})
		.then((data: unknown) => {
			const projects = projectSchema.parse(data);
			projects.records.forEach((project) => {
				console.log(project.fields.summary.value);
			});
		});
}
</script>

<template>
  <div>
    <h1 class="text-red-500">
      Portfolio created with Airtable.
    </h1>

    <TheButton @click="click">
      Click me!
    </TheButton>
  </div>
  <RouterView />
</template>

<style scoped></style>
