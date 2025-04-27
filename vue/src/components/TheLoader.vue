<script setup lang="ts">
import { useLoader } from "@/composables/useLoader";

const { isLoading } = useLoader();
</script>

<template>
  <div
    v-if="isLoading"
    class="fixed z-50 inset-0 flex flex-col items-center justify-center bg-white opacity-75"
  >
    <p class="mt-4 text-carbon">
      Chargement en cours...
    </p>
  </div>
</template>
