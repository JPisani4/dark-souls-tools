<template>
  <div
    v-if="showMetrics"
    class="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs font-mono z-50 max-w-xs"
  >
    <div class="font-bold mb-2">Performance Metrics</div>
    <div v-for="(metric, name) in metrics" :key="name" class="mb-1">
      <span class="text-green-400">{{ name }}:</span>
      <span class="text-yellow-400">{{ metric.avg.toFixed(1) }}ms</span>
      <span class="text-gray-400">({{ metric.count }})</span>
    </div>
    <div class="mt-2 pt-2 border-t border-gray-600">
      <div>Device: {{ deviceType }}</div>
      <div>Page Size: {{ pageSize }}</div>
      <div>Memory: {{ memoryUsage }}</div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: "PerformanceMonitor",
  props: {
    showMetrics: {
      type: Boolean,
      default: false,
    },
    metrics: {
      type: Object,
      default: () => ({}),
    },
    deviceType: {
      type: String,
      default: "Unknown",
    },
    pageSize: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    const memoryUsage = ref("Unknown");

    if (process.client && (performance as any).memory) {
      const updateMemory = () => {
        const mem = (performance as any).memory;
        const used = Math.round(mem.usedJSHeapSize / 1024 / 1024);
        const total = Math.round(mem.totalJSHeapSize / 1024 / 1024);
        memoryUsage.value = `${used}MB / ${total}MB`;
      };

      updateMemory();
      setInterval(updateMemory, 5000);
    }

    return {
      memoryUsage,
    };
  },
});
</script>
