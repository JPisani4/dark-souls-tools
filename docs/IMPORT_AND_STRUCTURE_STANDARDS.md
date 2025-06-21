# Import Patterns and Tool Structure Standards

This document outlines the standardized patterns for imports and tool structure that have been implemented across the Dark Souls Tools codebase.

## 📦 Import Patterns

### Standard Import Order

All tool components should follow this consistent import order:

```typescript
// 1. Vue imports
import { computed, ref, watch } from "vue";

// 2. Composable imports (alphabetical order)
import { useSafeTheme } from "~/composables/useSafeTheme";
import { useToolLayout } from "~/composables/useToolLayout";
import { useYourToolLogic } from "~/composables/useYourToolLogic";

// 3. Type imports (alphabetical order)
import type { ColorTheme } from "~/utils/themes/colorSystem";
import type { GameData } from "~/types/game";
import type { Tool } from "~/types/tools/tool";

// 4. Shared components (alphabetical order)
import ErrorBoundary from "../../../Common/ErrorBoundary.vue";
import FormSection from "../../../Common/forms/FormSection.vue";
import HeroSection from "../../../Common/HeroSection.vue";
import NumberField from "../../../Common/forms/NumberField.vue";
import SelectField from "../../../Common/forms/SelectField.vue";
import SummaryCard from "../../../Common/display/SummaryCard.vue";

// 5. Tool-specific components
import YourToolComponent from "../Common/YourToolComponent.vue";
```

### Import Path Guidelines

- **Shared Components**: Use relative paths to `../../../Common/` for components in the main Common directory
- **Tool-Specific Components**: Use relative paths to `../Common/` for components specific to your tool
- **Composables and Types**: Use absolute paths with `~/` prefix
- **Vue Imports**: Use standard Vue imports

### Benefits

- **Predictable**: Developers know exactly where to find imports
- **Maintainable**: Consistent patterns across all tools
- **Readable**: Clear separation between different types of imports
- **IDE-friendly**: Better autocomplete and navigation

## 🏗️ Tool Structure Standards

### Standard Script Setup Structure

All tool components should follow this organized structure:

```vue
<script setup lang="ts">
// 1. Vue imports
import { computed } from "vue";

// 2. Composable imports
import { useSafeTheme } from "~/composables/useSafeTheme";
import { useToolLayout } from "~/composables/useToolLayout";
import { useYourToolLogic } from "~/composables/useYourToolLogic";

// 3. Type imports
import type { ColorTheme } from "~/utils/themes/colorSystem";
import type { GameData } from "~/types/game";
import type { Tool } from "~/types/tools/tool";

// 4. Shared components
import FormSection from "../../../Common/forms/FormSection.vue";
import HeroSection from "../../../Common/HeroSection.vue";
import NumberField from "../../../Common/forms/NumberField.vue";

// 5. Props and types
interface Props {
  gameData: GameData;
  toolConfig?: Tool;
  theme?: ColorTheme;
  variant?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
});

// 6. Theme setup
const safeTheme = useSafeTheme(props.theme, props.variant);

// 7. Tool layout
const { selectedTheme } = useToolLayout({
  title: props.toolConfig?.title || "Your Tool Name",
  description: props.toolConfig?.description || "Tool description",
  iconPath: props.toolConfig?.icon || "default-icon.png",
  enablePerformanceMonitoring: true,
});

// 8. Game terminology
const terminology = computed(() => props.gameData?.config?.terminology || {});

// 9. Tool-specific logic
const { state, results, actions, constants } = useYourToolLogic();

// 10. Computed properties
const formattedResults = computed(() => {
  // Format results for display
  return results.value.map((item) => ({
    ...item,
    formattedValue: formatNumber(item.value),
  }));
});
</script>
```

### Structure Benefits

- **Predictable**: Every tool follows the same order
- **Maintainable**: Easy to find and modify specific sections
- **Readable**: Clear separation of concerns
- **Consistent**: All tools look and feel the same
- **Debuggable**: Easy to trace issues to specific sections

## 📋 Implementation Checklist

When creating or updating tools, ensure you follow these standards:

### Import Standards

- [ ] Vue imports are first and grouped together
- [ ] Composable imports are alphabetical and grouped
- [ ] Type imports are alphabetical and grouped
- [ ] Shared component imports are alphabetical and grouped
- [ ] Tool-specific component imports are last
- [ ] All imports use consistent path patterns

### Structure Standards

- [ ] Props and types are defined early
- [ ] Theme setup follows immediately after props
- [ ] Tool layout setup follows theme setup
- [ ] Game terminology is computed from game data
- [ ] Tool-specific logic is clearly separated
- [ ] Computed properties are grouped together
- [ ] Clear section comments are included

### Code Quality

- [ ] No unused imports
- [ ] Consistent naming conventions
- [ ] Clear variable names
- [ ] Proper TypeScript typing
- [ ] Logical grouping of related code

## 🔄 Migration Guide

### For Existing Tools

1. **Reorganize imports** following the standard order
2. **Add section comments** to improve readability
3. **Group related code** into logical sections
4. **Maintain existing functionality** - no breaking changes
5. **Test thoroughly** to ensure nothing is broken

### For New Tools

1. **Follow the standard structure** from the beginning
2. **Use the established patterns** for consistency
3. **Reference existing tools** as examples
4. **Validate against these standards** before committing

## 📚 Examples

### Before (Inconsistent)

```typescript
import { computed } from "vue";
import { useToolLayout } from "~/composables/useToolLayout";
import SummaryCard from "../Common/SummaryCard.vue";
import { useSafeTheme } from "~/composables/useSafeTheme";
import type { GameData } from "~/types/game";
import HeroSection from "../../../Common/HeroSection.vue";

const props = withDefaults(defineProps<Props>(), { variant: "default" });
const safeTheme = useSafeTheme(props.theme, props.variant);
const terminology = computed(() => props.gameData?.config?.terminology || {});
const { selectedTheme } = useToolLayout({...});
```

### After (Standardized)

```typescript
// 1. Vue imports
import { computed } from "vue";

// 2. Composable imports
import { useSafeTheme } from "~/composables/useSafeTheme";
import { useToolLayout } from "~/composables/useToolLayout";

// 3. Type imports
import type { GameData } from "~/types/game";

// 4. Shared components
import HeroSection from "../../../Common/HeroSection.vue";
import SummaryCard from "../Common/SummaryCard.vue";

// 5. Props and types
const props = withDefaults(defineProps<Props>(), { variant: "default" });

// 6. Theme setup
const safeTheme = useSafeTheme(props.theme, props.variant);

// 7. Tool layout
const { selectedTheme } = useToolLayout({...});

// 8. Game terminology
const terminology = computed(() => props.gameData?.config?.terminology || {});
```

## 🎯 Benefits Summary

These standards provide:

- **Consistency**: All tools follow the same patterns
- **Maintainability**: Easy to understand and modify
- **Developer Experience**: Faster onboarding and development
- **Code Quality**: Better organization and readability
- **Team Collaboration**: Shared understanding of code structure

By following these standards, the codebase becomes more professional, maintainable, and developer-friendly.
