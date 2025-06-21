# Development Guide

This guide provides essential information for developers working on the Gold Phantom project, including quick start instructions, project structure, and best practices.

## 🚀 **Quick Start**

1. **Create a tool using the CLI:**

   ```bash
   npm run create:tool -- "My Tool" ds1
   ```

2. **Edit the generated files:**

   - `components/Tools/MyTool/GameComponents/ds1/index.vue` - Main tool implementation
   - `components/Tools/MyTool/GameComponents/ds1/tool.config.ts` - Tool configuration

3. **Test your tool:**
   ```bash
   npm run dev
   # Visit: http://localhost:3000/tools/ds1/my-tool
   ```

## 📁 **Project Structure**

The project follows a game-based architecture where each tool can support multiple games:

```
components/Tools/
├── Common/                    # Shared components used across all tools
│   ├── ToolLayout.vue        # Main layout wrapper with responsive sidebars
│   ├── TotalCostDisplay.vue  # Cost display component with theming
│   ├── NumericInput.vue      # Number input component with validation
│   ├── ErrorBoundary.vue     # Error handling wrapper for tool components
│   ├── HeroSection.vue       # Tool header component with title/description
│   ├── forms/                # Standardized form components
│   ├── display/              # Data display components
│   └── ui/                   # Reusable UI elements
└── [tool-name]/              # Individual tool directory
    ├── tool.config.ts        # Tool configuration and metadata
    └── GameComponents/       # Game-specific implementations
        ├── ds1/              # Dark Souls: Remastered
        │   └── index.vue     # DS1 implementation
        ├── ds2/              # Dark Souls II (when implemented)
        │   └── index.vue     # DS2 implementation
        └── [game]/           # Additional games as needed
            └── index.vue     # Game-specific implementation
```

## 🔧 **Common Patterns**

### **Basic Tool Structure**

Every tool follows a consistent pattern using the shared layout system:

```vue
<script setup lang="ts">
import { useToolLayout } from "~/composables/useToolLayout";

// Initialize tool layout with theme and metadata
const { selectedTheme } = useToolLayout({
  title: "My Tool",
  description: "What my tool does",
});

// Reactive form state for tool inputs
const formState = reactive({ value: "" });
</script>

<template>
  <UCard>
    <UFormGroup label="Input">
      <UInput v-model="formState.value" />
    </UFormGroup>
  </UCard>
</template>
```

### **Using Shared Components**

The project provides several shared components to ensure consistency:

- **`TotalCostDisplay`** - Display costs/souls with proper formatting
- **`NumericInput`** - Number inputs with validation and accessibility
- **`ErrorBoundary`** - Error handling wrapper for graceful failures
- **`HeroSection`** - Tool header with title, description, and theming

### **Theme Integration**

All tools automatically integrate with the centralized theme system:

```vue
<script setup lang="ts">
import { getRandomTheme } from "~/utils/themes/colorSystem";

// Get a random theme for visual variety
const selectedTheme = getRandomTheme();
</script>

<template>
  <!-- Use theme properties for consistent styling -->
  <div :class="`border-l-4 ${selectedTheme.border}`">
    <h2 :class="selectedTheme.text">Tool Title</h2>
  </div>
</template>
```

## 🎮 **Adding Support for More Games**

To add support for additional games:

1. **Create the game directory structure:**

   ```bash
   mkdir -p components/Tools/YourTool/GameComponents/[game]
   ```

2. **Create the game implementation:**

   - Copy and adapt from existing game implementation
   - Update game-specific logic and terminology
   - Test with game-specific data

3. **Update tool configuration:**
   - Add the new game to `gameCategories` in `tool.config.ts`
   - Update any game-specific configuration

## ✅ **Best Practices**

1. **Use shared components** from `Common/` directory for consistency
2. **Keep tool logic simple and focused** - one tool, one purpose
3. **Test on different screen sizes** - the layout is responsive
4. **Follow existing naming conventions** for files and components
5. **Use the theme system** for consistent styling
6. **Implement proper error handling** with ErrorBoundary
7. **Add accessibility features** like ARIA labels and keyboard navigation

## 🧪 **Testing and Validation**

1. **Run tool validation:**

   ```bash
   npm run validate:tools
   ```

2. **Test tool generation:**

   ```bash
   npm run generate:tools
   ```

3. **Check for linting issues:**
   ```bash
   npm run lint
   ```

## 📚 **Need Help?**

- **Check existing tools** for examples and patterns
- **Look at `composables/`** for business logic patterns
- **Review the Component Catalog** for available shared components
- **Ask questions in issues** - the community is helpful!

## 🔗 **Related Documentation**

- **[Component Catalog](COMPONENT_CATALOG.md)** - Complete list of available components
- **[Usage Examples](USAGE_EXAMPLES.md)** - Practical examples of component usage
- **[Import Standards](IMPORT_AND_STRUCTURE_STANDARDS.md)** - Code organization guidelines
