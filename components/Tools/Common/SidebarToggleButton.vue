<template>
  <div
    :class="[
      'xl:hidden',
      position === 'right' ? 'flex justify-end' : 'flex justify-start',
    ]"
  >
    <UButton
      size="sm"
      variant="outline"
      @click="toggleSidebar"
      class="flex items-center gap-2"
    >
      <Icon
        :name="
          isMobileSidebarOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'
        "
        class="w-4 h-4"
      />
      <span>{{ isMobileSidebarOpen ? closeText : openText }}</span>
    </UButton>
  </div>
</template>

<script setup lang="ts">
import Icon from "~/components/Common/Icon.vue";
import { computed, withDefaults } from "vue";
import { useMobileSidebar } from "~/composables/useMobileSidebar";

interface Props {
  side: "left" | "right";
  position?: "left" | "right"; // Button position (defaults to same as sidebar side)
  openText?: string;
  closeText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  position: undefined, // Will default to the same as 'side'
  openText: "Open Sidebar",
  closeText: "Close Sidebar",
});

// Use the sidebar side for positioning if not explicitly set
const buttonPosition = computed(() => props.position || props.side);

// Mobile sidebar state
const { isMobileSidebarOpen, toggleSidebar } = useMobileSidebar(props.side);
</script>
