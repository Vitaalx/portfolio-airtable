<script setup lang="ts">
import { RouterView } from "vue-router";
import TheButton from "./components/ui/button/TheButton.vue";

function click() {
	alert("HAH! You're dumb!");
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
