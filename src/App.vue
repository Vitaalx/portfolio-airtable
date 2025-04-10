<script setup lang="ts">
import { RouterView } from "vue-router";
import TheButton from "./components/ui/button/TheButton.vue";
import { projectSchema } from "@/schemas/project";
import { useGetFetchAirtable } from "./composables/useGetFetchAirtable";

const {
	fetchedData,
	getData,
} = useGetFetchAirtable("Project", projectSchema.array());

async function click() {
	await getData();
	console.log(fetchedData.value);
}
</script>

<template>
  <div>
    <h1 class="text-red-500">
      Portfolio created with Airtable.
    </h1>

    <div
      v-for="(project, index) in fetchedData"
      :key="index"
    >
      <p>{{ project.fields.description }}</p>
    </div>

    <TheButton @click="click">
      Click me!
    </TheButton>
  </div>
  <RouterView />
</template>

<style scoped></style>
