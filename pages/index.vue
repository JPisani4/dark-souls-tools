<script setup lang="ts">
import ToolLayout from "~/components/Tools/Common/ToolLayout.vue";
import Home from "~/components/Home.vue";
</script>

<template>
  <!-- Use the standard tool layout for consistent structure -->
  <ToolLayout>
    <!-- Empty hero slot - hero content is handled by the Home component -->
    <template #hero />
    <!-- Empty sidebar slots - no sidebars needed for homepage -->
    <template #sidebar />
    <template #right-sidebar />
    <!-- Main homepage content -->
    <Home />
  </ToolLayout>
</template>
