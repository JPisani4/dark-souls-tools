<script setup lang="ts">
import ToolLayout from "~/components/Tools/Common/ToolLayout.vue";
import Home from "~/components/Home.vue";
</script>

<template>
  <!-- Use the standard tool layout for consistent structure -->
  <ToolLayout
    title="Gold Phantom - Soulsborne Tools & Calculators"
    description="Essential Soulsborne tools and calculators for your playthrough. Calculate soul levels, weapon upgrades, and more for Dark Souls, Dark Souls 2, Dark Souls 3, Bloodborne, and Elden Ring."
    icon-path="/favicon.png"
  >
    <!-- Empty hero slot - hero content is handled by the Home component -->
    <template #hero />
    <!-- Empty sidebar slots - no sidebars needed for homepage -->
    <template #sidebar />
    <template #right-sidebar />
    <!-- Main homepage content -->
    <Home />
  </ToolLayout>
</template>
