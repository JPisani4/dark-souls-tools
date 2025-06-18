<script lang="ts">
import { defineComponent } from "vue";
const pageTitle = "Soul Level Calculator";

export default defineComponent({
  name: "SoulLevelCalculator",
  setup() {
    useSeoMeta({
      title: pageTitle,
      ogTitle: pageTitle,
      twitterTitle: pageTitle,
    });
    // You can define computed, reactive, refs, etc. here
    // For example:
    // const currentLevel = ref(1)
    // const soulsRequired = computed(() => currentLevel.value * 1000)

    return {
      // expose to template
    };
  },
});

export const meta = {
  title: "Soul Level Calculator",
  description: "Calculates number of souls needed to reach a specific level.",
};
</script>

<template>
  <UContainer>
    <section>
      <h1>Soul Level Calculator</h1>

      <p>Calculates number of souls needed to reach a specific level.</p>
    </section>
  </UContainer>
</template>
