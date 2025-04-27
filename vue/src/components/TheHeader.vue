<script setup lang="ts">
</script>
<template>
  <header class="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
    <nav class="flex items-center justify-between p-4">
      <div class="text-lg font-bold">
        Portfolio - API Airtable
      </div>
      <ul class="flex space-x-4">
        <li>
          <router-link
            to="/"
            class="text-gray-700 hover:text-blue-500"
          >
            Accueil
          </router-link>
        </li>
        <li>
          <router-link
            to="/projects"
            class="text-gray-700 hover:text-blue-500"
          >
            Projets
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>
