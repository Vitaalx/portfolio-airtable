<script lang="ts" setup>
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
</script>
<template>
  <TheHeader />

  <main class="container mx-auto mt-16 p-4">
    <RouterView />
  </main>

  <TheFooter />
</template>
