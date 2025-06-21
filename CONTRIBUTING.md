# Contributing to Gold Phantom

Thank you for your interest in contributing! This guide will help you add new tools, understand the build process, and follow best practices for this project.

## 📋 **Code Standards**

Before contributing, please familiarize yourself with our code standards:

- **[Import Patterns and Tool Structure Standards](docs/IMPORT_AND_STRUCTURE_STANDARDS.md)** - Standardized patterns for imports and tool organization
- **[Component Catalog](docs/COMPONENT_CATALOG.md)** - Available shared components
- **[Usage Examples](docs/USAGE_EXAMPLES.md)** - Practical examples of component usage

## 🎨 **Component System**

The project includes a comprehensive set of standardized components that reduce boilerplate and ensure consistency across all tools.

### **Available Form Components**

Form components provide consistent styling, validation, and accessibility features:

```vue
<!-- Standard form field with validation and error handling -->
<FormField
  label="Field Label"
  id="fieldId"
  error="Error message"
  help="Help text"
>
  <UInput v-model="value" />
</FormField>

<!-- Number input field with min/max validation -->
<NumberField
  label="Level"
  id="level"
  :model-value="state.level"
  :min="1"
  :max="99"
  placeholder="Enter level"
  @update:model-value="(val) => (state.level = val)"
/>

<!-- Select dropdown field with options -->
<SelectField
  label="Category"
  id="category"
  :model-value="state.category"
  :items="categoryOptions"
  placeholder="Select category"
  @update:model-value="(val) => (state.category = val)"
/>

<!-- Text input field with consistent styling -->
<TextField
  label="Name"
  id="name"
  :model-value="state.name"
  placeholder="Enter name"
  @update:model-value="(val) => (state.name = val)"
/>

<!-- Form section for grouping related fields -->
<FormSection
  title="Section Title"
  description="Section description"
  layout="grid"
>
  <NumberField label="Field 1" id="field1" />
  <NumberField label="Field 2" id="field2" />
</FormSection>
```

### **Available Display Components**

Display components provide consistent data presentation and theming:

```vue
<!-- Summary card for displaying calculated results -->
<SummaryCard
  label="Total Cost"
  :value="totalCost"
  unit="Souls"
  subtitle="Calculation result"
  details="Based on current parameters"
  :theme="selectedTheme"
/>

<!-- Results table for tabular data display -->
<ResultsTable
  :columns="[
    { key: 'level', label: 'Level', format: 'number' },
    { key: 'cost', label: 'Cost', format: 'currency' },
  ]"
  :data="tableData"
  empty-message="No data available"
/>

<!-- Game badge for consistent game identification -->
<GameBadge game="ds1" size="md" />

<!-- Category chip for consistent category display -->
<CategoryChip category="calculator" size="md" />
```

### **Theme System**

The project uses a centralized theme system for consistent styling across all components:

```typescript
import {
  getRandomTheme,
  getThemeByIndex,
  THEME_COLORS,
} from "~/utils/themes/colorSystem";

// Get a random theme for visual variety
const theme = getRandomTheme();

// Get theme by index for consistent tool theming
const toolTheme = getThemeByIndex(toolIndex);

// Use theme properties for dynamic styling
const { border, text, iconBg, gradient, darkGradient } = theme;
```

## 🛠️ **Adding a New Tool**

### **Quick Start (Recommended)**

The easiest way to add a new tool is using the CLI, which handles all the boilerplate and structure automatically.

1. **Create a Tool Using the CLI:**

   ```bash
   # Simple tool for a specific game
   npm run create:tool -- "My New Tool Name" ds1

   # Complex tool with game-specific features
   npm run create:tool -- "My Complex Tool" ds1 --complex

   # Multi-game tool (creates structure for all games)
   npm run create:tool -- "My Multi-Game Tool" ds1 --multi-game
   ```

   The CLI automatically:

   - Creates the tool directory with proper game-based structure
   - Generates game-specific component files
   - Creates game-specific `tool.config.ts` configuration files
   - Updates the tools manifest
   - Provides next steps for development

2. **Customize Your Tool:**

   - Edit `components/Tools/YourToolName/GameComponents/[game]/index.vue` with your tool logic
   - Update the `components/Tools/YourToolName/GameComponents/[game]/tool.config.ts` with proper title and description
   - Add any additional components to the GameComponents directory
   - For multi-game tools, implement the tool for each game as needed

3. **Test Locally:**
   - Run `npm run dev` to start the development server
   - Visit `http://localhost:3000/tools/[game]/your-tool-name` to test your tool

### **Tool Creation Options**

#### **Simple Tool (Single Game)**

```bash
npm run create:tool -- "DS2 Covenant Calculator" ds2
```

- Creates tool for specific game only
- Simple structure with minimal boilerplate
- URL: `/tools/ds2/ds2-covenant-calculator`

#### **Complex Tool (Game-Specific Features)**

```bash
npm run create:tool -- "Weapon Upgrade Calculator" ds1 --complex
```

- Creates tool with game-specific logic support
- Includes terminology and mechanics abstractions
- URL: `/tools/ds1/weapon-upgrade-calculator`

#### **Multi-Game Tool (All Games)**

```bash
npm run create:tool -- "Soul Level Calculator" ds1 --multi-game
```

- Creates structure for all supported games
- Placeholder files for unimplemented games
- URLs: `/tools/[game]/soul-level-calculator` for each game

### **Manual Creation (Alternative)**

If you prefer to create tools manually, follow this structure:

1. **Create a Tool Directory:**

   - Add a new folder under `components/Tools/` (e.g., `components/Tools/MyNewTool/`).
   - Create `GameComponents/` subdirectory
   - Create a subdirectory for the game(s) you want to support (e.g., `GameComponents/ds1/`)
   - Add an `index.vue` file in each game directory as the entry point for your tool.

2. **Add Configuration:**

   - Create a `tool.config.ts` file in each game directory for tool configuration:

     ```ts
     import type { ToolConfig } from "~/types/tools/tool";

     export const config: ToolConfig = {
       title: "My Tool",
       description: "Description of what this tool does",
       category: "calculator",
       order: 1,
       tags: ["my-tool", "ds1"],
       seo: {
         title: "My Tool - Gold Phantom",
         description: "Description for SEO",
         keywords: ["my-tool", "ds1", "calculator"],
       },
     };
     ```

3. **Add Supporting Files:**

   - Add any supporting components in the GameComponents directory
   - Create shared components in GameComponents/Common/ if needed

4. **Generate the Tools Manifest:**
   - Run `npm run generate:tools` to update the `tools.ts` manifest. This step is required for your tool to appear in the app.

## Tool Structure

```
components/Tools/YourToolName/
├── GameComponents/
│   ├── ds1/
│   │   ├── index.vue          # DS1 specific component
│   │   └── tool.config.ts     # DS1-specific config
│   ├── ds2/
│   │   ├── index.vue          # DS2 specific component
│   │   └── tool.config.ts     # DS2-specific config
│   ├── Common/
│   │   ├── BaseFormFields.vue # Shared form logic
│   │   └── BaseResults.vue    # Shared results logic
│   └── ...                    # Other games
```

## URL Structure

The game-based architecture uses the following URL structure:

- **Single Game Tool**: `/tools/[game]/[tool-name]`

  - Example: `/tools/ds1/soul-level-calculator`
  - Example: `/tools/ds2/covenant-calculator`

- **Multi-Game Tool**: `/tools/[game]/[tool-name]` (same tool, different games)
  - Example: `/tools/ds1/weapon-upgrade-calculator`
  - Example: `/tools/ds2/weapon-upgrade-calculator`

## Game-Specific Development

### **Accessing Game Data**

```vue
<script setup lang="ts">
import type { GameData } from "~/types/game";

interface Props {
  gameData: GameData;
  toolConfig?: Tool;
}

const props = defineProps<Props>();

// Access game-specific configuration
const terminology = computed(() => props.gameData.config.terminology);
const mechanics = computed(() => props.gameData.config.mechanics);
const ui = computed(() => props.gameData.config.ui);
</script>
```

### **Game-Specific Terminology**

```vue
<template>
  <!-- Use game-specific labels -->
  <NumberField :label="terminology.level" id="level" />
  <NumberField :label="terminology.souls" id="souls" />
</template>
```

### **Game-Specific Logic**

```vue
<script setup lang="ts">
// Game-specific validation
const validation = computed(() => {
  const maxLevel = mechanics.value.maxLevel;
  // ... validation logic
});

// Game-specific UI features
const showRespecOption = computed(() => ui.value.showRespecOption);
</script>
```

## Build & Deployment

- The manifest is automatically generated before every Netlify build.
- For local static builds, run `npm run pregenerate && npm run generate` to ensure the manifest is up-to-date.

## Best Practices

- **Use standardized form components** (`NumberField`, `SelectField`, `FormSection`) for consistent UI
- **Use display components** (`SummaryCard`, `ResultsTable`) for results presentation
- **Use the centralized theme system** for consistent styling
- **Use composables** for business logic to keep components clean and DRY.
- **Use shared components** from `components/Tools/Common/` for consistent UI.
- **Keep Node.js-only code** in build scripts or Nuxt modules—never import Node.js modules in runtime or client code.
- **Use TypeScript** for all new code.
- **Write clear, concise meta descriptions** for each tool.
- **Use the CLI script** for consistent tool structure and reduced boilerplate.
- **Follow game-specific patterns** when creating multi-game tools.
- **Test tools across different games** to ensure consistency.

## Game Support

Currently supported games:

- **DS1**: Dark Souls: Remastered (fully implemented)
- **DS2**: Dark Souls II (structure ready, implementation pending)
- **DS3**: Dark Souls III (structure ready, implementation pending)
- **BB**: Bloodborne (structure ready, implementation pending)
- **ER**: Elden Ring (structure ready, implementation pending)

## Need Help?

Open an issue or pull request on [GitHub](https://github.com/JPisani4/dark-souls-tools) if you have questions or suggestions!
