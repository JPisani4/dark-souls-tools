# Component Catalog

This document provides a comprehensive guide to all shared components available in the Gold Phantom library. These components ensure consistency, reduce boilerplate, and provide a standardized development experience.

## 📁 **Component Structure**

Components are organized by purpose and functionality:

```
components/Tools/Common/
├── forms/           # Form components for data input
├── display/         # Display components for data presentation
├── ui/             # UI elements for consistent styling
├── layout/         # Layout components for structure
└── [core]          # Core components for tool functionality
```

## 🎨 **Theme System**

All components automatically integrate with the centralized theme system from `utils/themes/colorSystem.ts`. Components adapt to themes and provide consistent styling across the application.

### **Theme Properties**

Each theme provides these properties for consistent styling:

- `bg`: Background gradient classes for containers
- `icon`: Icon name for visual elements
- `text`: Text color classes for typography
- `border`: Border color classes for boundaries
- `iconBg`: Icon background color for badges and buttons
- `hoverBg`: Hover state background for interactive elements
- `gradient`: Light mode gradient for backgrounds
- `darkGradient`: Dark mode gradient for theme support

## 📝 **Form Components**

Form components provide consistent styling, validation, and accessibility features for data input.

### **FormField**

Base wrapper for all form fields with consistent styling and error handling.

```vue
<FormField
  label="Field Label"
  id="fieldId"
  error="Error message"
  help="Help text"
>
  <UInput v-model="value" />
</FormField>
```

**Props:**

- `label` (string, required): Field label for accessibility
- `id` (string, required): Field ID for form association
- `error` (string, optional): Error message to display
- `help` (string, optional): Help text for user guidance
- `size` (string, optional): Size variant for different contexts

### **NumberField**

Enhanced numeric input with validation, formatting, and accessibility features.

```vue
<NumberField
  label="Level"
  id="level"
  v-model="level"
  :min="1"
  :max="99"
  placeholder="Enter level"
/>
```

**Props:**

- `label` (string, required): Field label for accessibility
- `id` (string, required): Field ID for form association
- `modelValue` (number, optional): Current value for v-model support
- `min` (number, optional): Minimum allowed value
- `max` (number, optional): Maximum allowed value
- `step` (number, optional): Step increment for number input
- `placeholder` (string, optional): Placeholder text for guidance
- `theme` (ColorTheme, optional): Theme override for custom styling
- `error` (string, optional): Error message to display
- `help` (string, optional): Help text for user guidance

### **TextField**

Text input component with consistent styling and validation support.

```vue
<TextField label="Name" id="name" v-model="name" placeholder="Enter name" />
```

**Props:**

- `label` (string, required): Field label for accessibility
- `id` (string, required): Field ID for form association
- `modelValue` (string, optional): Current value for v-model support
- `placeholder` (string, optional): Placeholder text for guidance
- `theme` (ColorTheme, optional): Theme override for custom styling
- `error` (string, optional): Error message to display
- `help` (string, optional): Help text for user guidance

### **SelectField**

Dropdown select component with consistent styling and option management.

```vue
<SelectField
  label="Category"
  id="category"
  v-model="category"
  :options="[
    { value: 'weapon', label: 'Weapon' },
    { value: 'armor', label: 'Armor' },
  ]"
  placeholder="Select category"
/>
```

**Props:**

- `label` (string, required): Field label for accessibility
- `id` (string, required): Field ID for form association
- `modelValue` (string, optional): Current value for v-model support
- `options` (array, required): Array of {value, label} objects
- `placeholder` (string, optional): Placeholder text for guidance
- `valueKey` (string, optional): Key for value (default: "value")
- `labelKey` (string, optional): Key for label (default: "label")
- `theme` (ColorTheme, optional): Theme override for custom styling
- `error` (string, optional): Error message to display
- `help` (string, optional): Help text for user guidance

### **FormSection**

Groups related form fields with consistent spacing, styling, and organization.

```vue
<FormSection title="Weapon Information" description="Enter weapon details">
  <NumberField label="Level" id="level" v-model="level" />
  <SelectField label="Type" id="type" v-model="type" :options="types" />
</FormSection>
```

**Props:**

- `title` (string, required): Section title for organization
- `description` (string, optional): Section description for context
- `theme` (ColorTheme, optional): Theme override for custom styling

## 📊 **Display Components**

Display components provide consistent data presentation and theming for calculated results and information.

### **SummaryCard**

Displays summary information with consistent styling, theming, and formatting options.

```vue
<SummaryCard
  label="Total Cost"
  :value="totalCost"
  unit="Souls"
  subtitle="Calculation result"
  details="Level 10 → 20 (10 levels)"
  :theme="selectedTheme"
/>
```

**Props:**

- `label` (string, required): Card label for identification
- `value` (number|string, required): Value to display
- `unit` (string, optional): Unit of measurement
- `subtitle` (string, optional): Subtitle text for context
- `details` (string, optional): Details text for additional information
- `icon` (string, optional): Icon name for visual enhancement
- `theme` (ColorTheme, optional): Theme override for custom styling
- `format` (string, optional): Format type ("number", "currency", "percentage")

### **ResultsTable**

Displays tabular data with consistent styling, pagination support, and empty state handling.

```vue
<ResultsTable
  :columns="[
    { key: 'level', label: 'Level', format: 'number' },
    { key: 'cost', label: 'Cost', format: 'number' },
  ]"
  :data="tableData"
  empty-message="No data available"
/>
```

**Props:**

- `columns` (array, required): Column definitions with key, label, and format
- `data` (array, required): Table data to display
- `empty-message` (string, optional): Message when no data is available
- `theme` (ColorTheme, optional): Theme override for custom styling

## 🎯 **UI Components**

UI components provide consistent visual elements and styling across the application.

### **GameBadge**

Displays game identification with consistent styling and theming.

```vue
<GameBadge game="ds1" size="md" />
```

**Props:**

- `game` (string, required): Game identifier (ds1, ds2, ds3, bb, er)
- `size` (string, optional): Size variant (sm, md, lg)

### **CategoryChip**

Displays category information with consistent styling and theming.

```vue
<CategoryChip category="calculator" size="md" />
```

**Props:**

- `category` (string, required): Category identifier
- `size` (string, optional): Size variant (sm, md, lg)

## 🔧 **Layout Components**

Layout components provide structure and organization for tool interfaces.

### **ToolLayout**

Main layout wrapper that provides responsive sidebar support and consistent structure.

```vue
<ToolLayout>
  <template #sidebar>
    <!-- Left sidebar content -->
  </template>
  <template #right-sidebar>
    <!-- Right sidebar content -->
  </template>
  <!-- Main content -->
</ToolLayout>
```

**Features:**

- Responsive sidebar system with mobile support
- Keyboard navigation (Escape to close sidebars)
- Automatic sidebar management
- Consistent spacing and structure

### **HeroSection**

Tool header component with title, description, and theming support.

```vue
<HeroSection
  title="Tool Title"
  description="Tool description"
  :theme="selectedTheme"
  variant="default"
/>
```

**Props:**

- `title` (string, required): Tool title
- `description` (string, required): Tool description
- `theme` (ColorTheme, optional): Theme for styling
- `variant` (string, optional): Display variant (default, homepage)

## 🛡️ **Utility Components**

Utility components provide specialized functionality for common use cases.

### **ErrorBoundary**

Error handling wrapper that catches and displays errors gracefully.

```vue
<ErrorBoundary @error="(err: Error) => handleError(err)">
  <ComponentThatMightError />
</ErrorBoundary>
```

**Features:**

- Catches JavaScript errors in child components
- Displays fallback UI when errors occur
- Provides error information for debugging
- Prevents entire tool from crashing

### **TotalCostDisplay**

Specialized component for displaying costs and souls with proper formatting.

```vue
<TotalCostDisplay :cost="totalCost" unit="Souls" :theme="selectedTheme" />
```

**Props:**

- `cost` (number, required): Cost to display
- `unit` (string, optional): Unit of measurement
- `theme` (ColorTheme, optional): Theme for styling

## 📋 **Usage Guidelines**

### **When to Use Each Component**

- **Form Components**: Use for any data input in tools
- **Display Components**: Use for showing calculated results and data
- **UI Components**: Use for consistent visual elements
- **Layout Components**: Use for tool structure and organization
- **Utility Components**: Use for specialized functionality

### **Theme Integration**

All components automatically use the theme system. To customize:

```vue
<script setup lang="ts">
import { getRandomTheme } from "~/utils/themes/colorSystem";

const selectedTheme = getRandomTheme();
</script>

<template>
  <NumberField label="Level" :theme="selectedTheme" v-model="level" />
</template>
```

### **Accessibility**

All components include proper accessibility features:

- ARIA labels and descriptions
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Error announcement

## 🔗 **Related Documentation**

- **[Usage Examples](USAGE_EXAMPLES.md)** - Practical examples of component usage
- **[Development Guide](DEVELOPMENT.md)** - Development patterns and best practices
- **[Import Standards](IMPORT_AND_STRUCTURE_STANDARDS.md)** - Code organization guidelines
