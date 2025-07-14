#!/usr/bin/env ts-node

import fs from "fs-extra";
import path from "path";
import { execSync } from "child_process";

// Get tool name and game from command line arguments
const toolName = process.argv[2];
const gameId = process.argv[3] || "ds1";

if (!toolName) {
  console.error("❌ Please provide a tool name:");
  console.error('   npm run create:tool -- "My Tool Name" [game-id]');
  console.error('   npm run create:tool -- "My Tool Name" ds1');
  process.exit(1);
}

// Convert tool name to kebab-case for directory and slug
function toKebabCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Convert tool name to PascalCase for component name
function toPascalCase(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

const kebabName = toKebabCase(toolName);
const pascalName = toPascalCase(toolName);
const toolDir = path.resolve(process.cwd(), `components/Tools/${kebabName}`);

// Check if tool already exists
if (fs.existsSync(toolDir)) {
  console.error(`❌ Tool directory already exists: ${toolDir}`);
  process.exit(1);
}

// Create tool directory structure
fs.mkdirSync(toolDir, { recursive: true });

// Create GameComponents directory
const gameComponentsDir = path.join(toolDir, "GameComponents");
fs.mkdirSync(gameComponentsDir, { recursive: true });

// Create game-specific directory
const gameDir = path.join(gameComponentsDir, gameId);
fs.mkdirSync(gameDir, { recursive: true });

// Create Common directory for shared components
const commonDir = path.join(gameComponentsDir, "Common");
fs.mkdirSync(commonDir, { recursive: true });

// Tool component template
const toolComponentTemplate = `<script setup lang="ts">
import { computed } from "vue";
import { useToolLayout } from "~/composables/useToolLayout";
import { useSafeTheme } from "~/composables/useSafeTheme";
import HeroSection from "../../../Common/HeroSection.vue";
import FormSection from "../../../Common/forms/FormSection.vue";
import NumberField from "../../../Common/forms/NumberField.vue";
import type { GameData } from "~/types/game";
import type { Tool } from "~/types/tools/tool";
import type { ColorTheme } from "~/utils/themes/colorSystem";

interface Props {
  gameData: GameData;
  toolConfig?: Tool;
  theme?: ColorTheme;
  variant?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
});

const safeTheme = useSafeTheme(props.theme, props.variant);

// Get terminology from game config
const terminology = computed(() => props.gameData?.config?.terminology || {});

// Tool layout setup
const { selectedTheme } = useToolLayout({
  title: props.toolConfig?.title || "${toolName}",
  description: props.toolConfig?.description || "Description of what this tool does",
  iconPath: props.toolConfig?.icon || "i-heroicons-cube",
  enablePerformanceMonitoring: true,
});

// Tool-specific state
const state = reactive({
  // Add your form fields here
  exampleField: "",
});

// Tool-specific logic
const resetForm = () => {
  state.exampleField = "";
};

// Example computed values
const hasData = computed(() => state.exampleField.trim().length > 0);
</script>

<template>
  <!-- Hero Section -->
  <HeroSection
    v-if="gameData"
    :title="toolConfig?.title || '${toolName}'"
    :description="toolConfig?.description || 'Description of what this tool does'"
    :icon-path="toolConfig?.icon || 'i-heroicons-cube'"
    :theme="safeTheme"
    :game-data="gameData"
  />

  <!-- Tool Card -->
  <UCard>
    <template #header>
      <div class="flex items-center justify-center">
        <h2 class="text-lg font-semibold">${toolName}</h2>
      </div>
    </template>

    <div class="space-y-6">
      <!-- Input Fields -->
      <FormSection
        title="${toolName}"
        description="Enter your information below"
        :theme="safeTheme"
      >
        <NumberField
          label="Example Field"
          id="exampleField"
          :model-value="state.exampleField ? parseInt(state.exampleField) : undefined"
          placeholder="Enter a number..."
          :min="1"
          :max="100"
          :theme="safeTheme"
          @update:model-value="(val) => (state.exampleField = val?.toString() || '')"
        />
      </FormSection>

      <!-- Results Section -->
      <div v-if="hasData" class="space-y-4">
        <UCard>
          <template #header>
            <h3 class="text-md font-semibold">Results</h3>
          </template>
          <div class="p-4">
            <p class="text-gray-600 dark:text-gray-400">
              Your tool results will appear here...
            </p>
          </div>
        </UCard>
      </div>

      <!-- Clear Button -->
      <div class="flex justify-end">
        <UButton color="primary" variant="outline" @click.prevent="resetForm">
          <UIcon name="i-heroicons-x-mark" class="w-4 h-4 mr-1" />
          Clear
        </UButton>
      </div>
    </div>
  </UCard>
</template>
`;

// Tool config template
const toolConfigTemplate = `import type { ToolConfig } from "~/types/tools/tool";

export const config: ToolConfig = {
  title: "${toolName}",
  description: "Description of what this tool does for ${gameId}",
  icon: "i-heroicons-cube",
  category: "calculator",
  order: 1,
  tags: ["${kebabName}", "${gameId}", "calculator"],
  version: "1.0.0",
  author: "Gold Phantom",
  lastUpdated: "${new Date().toISOString().split("T")[0]}",
  gameCategory: "${gameId}",
  seo: {
    title: "${toolName} - Gold Phantom",
    description: "Description of what this tool does for ${gameId}",
    keywords: ["${kebabName}", "${gameId}", "calculator"],
    ogImage: "i-heroicons-cube",
  },
};
`;

// Common component template
const commonComponentTemplate = `<script setup lang="ts">
// Shared component for ${toolName}
// Add your shared logic here
</script>

<template>
  <div>
    <!-- Shared component content -->
  </div>
</template>
`;

// Write files
try {
  // Write game-specific index.vue
  fs.writeFileSync(path.join(gameDir, "index.vue"), toolComponentTemplate);
  console.log(`✅ Created GameComponents/${gameId}/index.vue`);

  // Write tool config
  fs.writeFileSync(path.join(gameDir, "tool.config.ts"), toolConfigTemplate);
  console.log(`✅ Created GameComponents/${gameId}/tool.config.ts`);

  // Write common component template
  fs.writeFileSync(
    path.join(commonDir, "SharedComponent.vue"),
    commonComponentTemplate
  );
  console.log(`✅ Created GameComponents/Common/SharedComponent.vue`);

  // Regenerate tools manifest
  console.log("🔄 Regenerating tools manifest...");
  execSync("npm run generate:tools", { stdio: "inherit" });
  console.log("✅ Tools manifest regenerated");

  console.log("\n🎉 Tool created successfully!");
  console.log(`📁 Location: ${toolDir}`);
  console.log(`🔗 URL: /tools/${gameId}/${kebabName}`);

  console.log("\nNext steps:");
  console.log(
    `1. Edit GameComponents/${gameId}/index.vue with your tool logic`
  );
  console.log(
    `2. Update GameComponents/${gameId}/tool.config.ts with proper title and description`
  );
  console.log(
    `3. Add any additional components to the GameComponents/Common directory`
  );
  console.log(
    `4. Test your tool at http://localhost:3000/tools/${gameId}/${kebabName}`
  );

  console.log("\n💡 Tip: All tool metadata is now managed in tool.config.ts");
} catch (error) {
  console.error("❌ Error creating tool:", error);
  process.exit(1);
}
