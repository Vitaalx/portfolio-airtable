<script lang="ts" setup>
import { routerPageNameAdmin } from "../router";

const { PROJECTS_PAGE } = routerPageNameAdmin;

</script>
<template>
  <header>
    <nav>
      <ul class="flex space-x-4">
        <li>
          <router-link
            :to="{
              name: PROJECTS_PAGE
            }"
          >
            Projects
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>
