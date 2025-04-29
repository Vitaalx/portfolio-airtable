<script lang="ts" setup>
import AdminFooter from "@/domains/admin/components/AdminFooter.vue";
import AdminHeader from "@/domains/admin/components/AdminHeader.vue";

</script>
<template>
  <AdminHeader />

  <main class="mt-24 bg-gray-100 min-h-screen-nh">
    <RouterView />
  </main>

  <AdminFooter />
</template>
