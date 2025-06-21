# Usage Examples

This document provides practical examples of how to use the shared components in your Soulsborne Tools.

## 🎨 **Theme System Examples**

### Basic Theme Usage

```vue
<script setup>
import { getRandomTheme } from "~/utils/themes/colorSystem";

const selectedTheme = getRandomTheme();
</script>

<template>
  <SummaryCard
    label="Total Souls"
    :value="1000000"
    unit="Souls"
    :theme="selectedTheme"
  />
</template>
```

### Theme Provider Pattern

```vue
<script setup>
import { getRandomTheme } from "~/utils/themes/colorSystem";
import ThemeProvider from "~/components/Tools/Common/ui/ThemeProvider.vue";

const theme = getRandomTheme();
</script>

<template>
  <ThemeProvider :theme="theme" apply-background apply-text>
    <div class="p-6">
      <h2>Theme-aware content</h2>
      <p>This content automatically adapts to the theme</p>
    </div>
  </ThemeProvider>
</template>
```

## 📝 **Form Component Examples**

### Basic Form with Validation

```vue
<script setup>
import NumberField from "~/components/Tools/Common/forms/NumberField.vue";
import SelectField from "~/components/Tools/Common/forms/SelectField.vue";
import FormSection from "~/components/Tools/Common/forms/FormSection.vue";

const level = ref(10);
const weaponType = ref("sword");
const errors = ref({});

const weaponTypes = [
  { value: "sword", label: "Sword" },
  { value: "axe", label: "Axe" },
  { value: "spear", label: "Spear" },
];
</script>

<template>
  <FormSection
    title="Weapon Information"
    description="Enter your weapon details"
  >
    <NumberField
      label="Weapon Level"
      id="weaponLevel"
      v-model="level"
      :min="0"
      :max="15"
      :error="errors.level"
      placeholder="Enter level"
    />

    <SelectField
      label="Weapon Type"
      id="weaponType"
      v-model="weaponType"
      :options="weaponTypes"
      :error="errors.type"
      placeholder="Select weapon type"
    />
  </FormSection>
</template>
```

### Complex Form with Multiple Field Types

```vue
<script setup>
import NumberField from "~/components/Tools/Common/forms/NumberField.vue";
import TextField from "~/components/Tools/Common/forms/TextField.vue";
import TextareaField from "~/components/Tools/Common/forms/TextareaField.vue";
import CheckboxField from "~/components/Tools/Common/forms/CheckboxField.vue";
import SelectField from "~/components/Tools/Common/forms/SelectField.vue";
import FormSection from "~/components/Tools/Common/forms/FormSection.vue";

const form = reactive({
  name: "",
  level: 1,
  description: "",
  isRare: false,
  category: "",
});

const categories = [
  { value: "weapon", label: "Weapon" },
  { value: "armor", label: "Armor" },
  { value: "consumable", label: "Consumable" },
];
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <FormSection title="Basic Information">
      <TextField
        label="Item Name"
        id="name"
        v-model="form.name"
        placeholder="Enter item name"
        required
      />

      <NumberField
        label="Item Level"
        id="level"
        v-model="form.level"
        :min="1"
        :max="99"
        placeholder="Enter level"
      />
    </FormSection>

    <FormSection title="Additional Details">
      <TextareaField
        label="Description"
        id="description"
        v-model="form.description"
        placeholder="Enter item description"
        :rows="4"
      />

      <SelectField
        label="Category"
        id="category"
        v-model="form.category"
        :options="categories"
        placeholder="Select category"
      />

      <CheckboxField label="Rare Item" id="isRare" v-model="form.isRare" />
    </FormSection>
  </form>
</template>
```

## 📊 **Display Component Examples**

### Summary Cards

```vue
<script setup>
import SummaryCard from "~/components/Tools/Common/display/SummaryCard.vue";
import { getRandomTheme } from "~/utils/themes/colorSystem";

const theme = getRandomTheme();
const totalCost = 150000;
const materials = ["Titanite Shard", "Titanite Large Shard"];
</script>

<template>
  <div class="space-y-4">
    <!-- Cost Summary -->
    <SummaryCard
      label="Total Souls Required"
      :value="totalCost"
      unit="Souls"
      subtitle="Upgrade cost"
      details="Level 5 → 10 (5 levels)"
      :theme="theme"
    />

    <!-- Materials Summary -->
    <SummaryCard
      label="Materials Needed"
      :value="materials.length"
      unit="items"
      subtitle="Required materials"
      :details="materials.join(', ')"
      :theme="theme"
    />
  </div>
</template>
```

### Data Tables

```vue
<script setup>
import ResultsTable from "~/components/Tools/Common/display/ResultsTable.vue";

const columns = [
  { key: "level", label: "Level", format: "number" },
  { key: "souls", label: "Souls Required", format: "number" },
  { key: "materials", label: "Materials", format: "text" },
];

const tableData = [
  { level: 1, souls: 1000, materials: "Titanite Shard" },
  { level: 2, souls: 2000, materials: "Titanite Shard" },
  { level: 3, souls: 3000, materials: "Titanite Large Shard" },
];
</script>

<template>
  <ResultsTable
    :columns="columns"
    :data="tableData"
    empty-message="No upgrade data available"
  />
</template>
```

### Empty States

```vue
<script setup>
import EmptyState from "~/components/Tools/Common/display/EmptyState.vue";
</script>

<template>
  <EmptyState
    title="No Results Found"
    description="Try adjusting your search criteria or filters to find what you're looking for."
    icon="i-heroicons-magnifying-glass"
  >
    <template #actions>
      <UButton color="primary" @click="clearFilters"> Clear Filters </UButton>
      <UButton variant="outline" @click="resetSearch"> Reset Search </UButton>
    </template>
  </EmptyState>
</template>
```

## 🎯 **UI Component Examples**

### Game Badges

```vue
<script setup>
import GameBadge from "~/components/Tools/Common/ui/GameBadge.vue";
</script>

<template>
  <div class="flex gap-2">
    <GameBadge game="ds1" />
    <GameBadge game="ds2" />
    <GameBadge game="ds3" />
    <GameBadge game="bb" />
    <GameBadge game="er" />
  </div>
</template>
```

### Category Chips

```vue
<script setup>
import CategoryChip from "~/components/Tools/Common/ui/CategoryChip.vue";
</script>

<template>
  <div class="flex gap-2">
    <CategoryChip category="calculator" />
    <CategoryChip category="database" />
    <CategoryChip category="planner" />
  </div>
</template>
```

## 🏗️ **Layout Component Examples**

### Complete Tool Layout

```vue
<script setup>
import ToolLayout from "~/components/Tools/Common/ToolLayout.vue";
import HeroSection from "~/components/Tools/Common/HeroSection.vue";
import { getRandomTheme } from "~/utils/themes/colorSystem";

const theme = getRandomTheme();
const gameData = {
  metadata: {
    id: "ds1",
    name: "Dark Souls",
    fullName: "Dark Souls: Remastered",
  },
};
</script>

<template>
  <ToolLayout>
    <template #hero>
      <HeroSection
        title="Weapon Calculator"
        description="Calculate weapon upgrade costs and requirements"
        icon-path="/weapon-icon.png"
        :theme="theme"
        :game-data="gameData"
      />
    </template>

    <template #sidebar>
      <div class="space-y-4">
        <h3>Filters</h3>
        <!-- Filter content -->
      </div>
    </template>

    <!-- Main content -->
    <div class="space-y-6">
      <!-- Your tool content here -->
    </div>
  </ToolLayout>
</template>
```

### Hero Section Variants

```vue
<script setup>
import HeroSection from "~/components/Tools/Common/HeroSection.vue";
import { getRandomTheme } from "~/utils/themes/colorSystem";

const theme = getRandomTheme();
</script>

<template>
  <!-- Default variant -->
  <HeroSection
    title="Default Hero"
    description="Standard hero section"
    :theme="theme"
  />

  <!-- Homepage variant -->
  <HeroSection
    title="Homepage Hero"
    description="Hero section for homepage"
    :theme="theme"
    variant="homepage"
  />
</template>
```

## 🔧 **Core Component Examples**

### Numeric Input with Validation

```vue
<script setup>
import NumericInput from "~/components/Tools/Common/NumericInput.vue";

const value = ref(10);
</script>

<template>
  <NumericInput
    v-model="value"
    :min="1"
    :max="99"
    :step="1"
    placeholder="Enter value"
    aria-label="Level input"
  />
</template>
```

### Cost Display

```vue
<script setup>
import TotalCostDisplay from "~/components/Tools/Common/TotalCostDisplay.vue";
import { getRandomTheme } from "~/utils/themes/colorSystem";

const theme = getRandomTheme();
const totalCost = 50000;
</script>

<template>
  <TotalCostDisplay
    :cost="totalCost"
    label="Total Upgrade Cost"
    unit="Souls"
    subtitle="Level 5 → 10"
    details="5 levels to upgrade"
    :theme="theme"
  />
</template>
```

### Pagination

```vue
<script setup>
import CustomPagination from "~/components/Tools/Common/CustomPagination.vue";

const currentPage = ref(1);
const totalPages = ref(10);

const handlePageChange = (page) => {
  currentPage.value = page;
  // Load data for new page
};
</script>

<template>
  <CustomPagination
    :current-page="currentPage"
    :total-pages="totalPages"
    @update:current-page="handlePageChange"
  />
</template>
```

## 🎨 **Advanced Theming Examples**

### Custom Theme Override

```vue
<script setup>
import SummaryCard from "~/components/Tools/Common/display/SummaryCard.vue";

const customTheme = {
  bg: "from-red-500 to-red-600",
  icon: "i-heroicons-exclamation-triangle",
  text: "text-red-700",
  border: "border-red-500",
  iconBg: "bg-red-500",
  hoverBg: "hover:bg-red-600",
  gradient: "from-red-100 to-red-200",
  darkGradient: "dark:from-red-900 dark:to-gray-900",
};
</script>

<template>
  <SummaryCard label="Warning" value="Critical" :theme="customTheme" />
</template>
```

### Theme Variants

```vue
<script setup>
import NumberField from "~/components/Tools/Common/forms/NumberField.vue";

const theme = getRandomTheme();
</script>

<template>
  <!-- Default variant -->
  <NumberField
    label="Default Field"
    id="default"
    v-model="value"
    :theme="theme"
  />

  <!-- Unstyled variant -->
  <NumberField
    label="Unstyled Field"
    id="unstyled"
    v-model="value"
    :theme="theme"
    variant="unstyled"
  />
</template>
```

## 🔄 **Migration Examples**

### Before (Old Pattern)

```vue
<template>
  <UFormField label="Level">
    <UInput v-model="level" type="number" :min="1" :max="99" class="w-full" />
  </UFormField>

  <div class="bg-blue-500 text-white p-4 rounded">
    <span>Total: {{ cost }} Souls</span>
  </div>
</template>
```

### After (New Pattern)

```vue
<template>
  <NumberField label="Level" id="level" v-model="level" :min="1" :max="99" />

  <SummaryCard
    label="Total Cost"
    :value="cost"
    unit="Souls"
    :theme="selectedTheme"
  />
</template>
```

## 📚 **Best Practices**

1. **Always use shared components** for common patterns
2. **Pass themes consistently** through component trees
3. **Use FormSection** to group related form fields
4. **Leverage the theme system** for consistent styling
5. **Follow the component API** as documented
6. **Use proper TypeScript types** for all props
7. **Provide meaningful labels and IDs** for accessibility
8. **Handle errors gracefully** with error props
9. **Use empty states** when no data is available
10. **Test components** across different themes and variants

## 🐛 **Common Issues and Solutions**

### Theme Not Applying

```vue
<!-- ❌ Wrong -->
<SummaryCard :theme="{ bg: 'blue' }" />

<!-- ✅ Correct -->
<SummaryCard :theme="selectedTheme" />
```

### Form Validation Errors

```vue
<!-- ❌ Wrong -->
<NumberField label="Level" v-model="level" />

<!-- ✅ Correct -->
<NumberField label="Level" id="level" v-model="level" />
```

### Inconsistent Styling

```vue
<!-- ❌ Wrong -->
<div class="bg-blue-500 text-white p-4 rounded"></div>
```

These examples demonstrate the power and flexibility of the shared component library. Use them as a reference when building new tools or migrating existing ones.
