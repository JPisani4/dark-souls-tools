# Gold Phantom

A set of simple web tools for planning and optimizing your _Dark Souls_ playthrough.

## 🚀 **Quick Start**

### **For New Developers**

1. **Clone and install:**

   ```bash
   git clone <repository-url>
   cd dark-souls-tools
   npm install
   ```

2. **Start development:**

   ```bash
   npm run dev
   ```

3. **Create your first tool:**

   ```bash
   npm run create:tool -- "My New Tool" ds1
   ```

4. **Visit your tool:**
   ```
   http://localhost:3000/tools/ds1/my-new-tool
   ```

### **Project Structure**

```
dark-souls-tools/
├── components/          # Vue components
│   ├── Tools/          # Tool components
│   │   ├── Common/     # Shared components
│   │   │   ├── forms/  # Standardized form components
│   │   │   ├── display/# Display components
│   │   │   └── ui/     # UI components
│   │   └── [ToolName]/ # Individual tools
├── composables/        # Business logic
├── utils/
│   └── themes/         # Centralized theme system
├── docs/              # Documentation
├── types/             # TypeScript types
└── scripts/           # Build scripts
```

### **Key Documentation**

- **[Contributing Guide](CONTRIBUTING.md)** - Complete guide to adding new tools
- **[Development Guide](docs/DEVELOPMENT.md)** - Development patterns and best practices
- **[Component Catalog](docs/COMPONENT_CATALOG.md)** - Available shared components
- **[Usage Examples](docs/USAGE_EXAMPLES.md)** - Practical examples of component usage
- **[Import Standards](docs/IMPORT_AND_STRUCTURE_STANDARDS.md)** - Code organization guidelines

## 🛠️ **Features**

- **Soul level and weapon upgrade calculators**
- **Fast, responsive, and theme-aware UI**
- **Modular architecture with standardized components**
- **Comprehensive form component library**
- **Centralized theme system**
- **Plugin system for extensibility**
- **Comprehensive TypeScript support**
- **Automated tool creation and validation**

## 🏗️ **Architecture**

### **Component System**

- **Form Components**: Standardized form fields (`NumberField`, `SelectField`, `FormSection`)
- **Display Components**: Consistent data presentation (`SummaryCard`, `ResultsTable`)
- **UI Components**: Reusable UI elements (`GameBadge`, `CategoryChip`)
- **Layout System**: Consistent theming and structure via `ToolLayout`

### **Theme System**

- **Centralized Colors**: Single source of truth for all styling
- **Consistent Theming**: Automatic theme assignment and management
- **Easy Extension**: Simple to add new themes and colors

### **Business Logic**

- **Base Composables**: Common functionality via `useBaseTool`
- **Tool-Specific Logic**: Dedicated composables for each tool
- **Plugin System**: Extensible functionality without core modifications

### **Development Tools**

- **CLI Scaffolding**: Automated tool creation with standardized components
- **Type Safety**: Comprehensive TypeScript support
- **Validation**: Built-in tool validation and testing

## 🧩 **Available Tools**

- **Soul Level Calculator**: Calculate souls needed to reach specific levels
- **Weapon Upgrade Calculator**: Plan weapon upgrade paths and costs

## 🛠️ **Development**

### **Creating a New Tool**

```bash
# Simple tool creation
npm run create:tool -- "Tool Name" ds1

# Complex tool with advanced features
npm run create:tool -- "Complex Tool" ds1 --complex

# Multi-game tool
npm run create:tool -- "Multi-Game Tool" ds1 --multi-game
```

### **Using Standardized Components**

```vue
<script setup>
import {
  NumberField,
  SelectField,
  FormSection,
  SummaryCard,
} from "~/components";
</script>

<template>
  <FormSection title="Calculator" description="Enter your values">
    <NumberField
      label="Level"
      id="level"
      :model-value="state.level"
      :min="1"
      :max="99"
      @update:model-value="(val) => (state.level = val)"
    />
    <SelectField
      label="Category"
      id="category"
      :model-value="state.category"
      :items="categoryOptions"
      @update:model-value="(val) => (state.category = val)"
    />
  </FormSection>

  <SummaryCard
    label="Total Cost"
    :value="totalCost"
    unit="Souls"
    :theme="selectedTheme"
  />
</template>
```

### **Available Scripts**

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run generate:tools   # Update tools manifest
npm run validate:tools   # Validate tool structure
npm run test             # Run tests
npm run lint             # Lint code
npm run format           # Format code
```

## 🎨 **Technologies**

- **Frontend**: Nuxt 3, Vue 3, Tailwind CSS 4, Nuxt UI 3
- **Language**: TypeScript
- **Build Tools**: Vite, PostCSS
- **Testing**: Vitest
- **Linting**: ESLint, Prettier

## 🤝 **Contributing**

Contributions are welcome! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### **Development Workflow**

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes using standardized components**
4. **Add tests if applicable**
5. **Run validation**: `npm run validate:tools`
6. **Submit a pull request**

### **Code Style**

- **Components**: PascalCase naming
- **Composables**: camelCase with `use` prefix
- **Types**: camelCase
- **Files**: Follow established patterns
- **Use standardized components**: Prefer `NumberField` over custom form fields

## 📚 **Documentation**

- **[Contributing Guide](CONTRIBUTING.md)** - Complete guide to adding new tools
- **[Development Guide](docs/DEVELOPMENT.md)** - Development patterns and best practices
- **[Component Catalog](docs/COMPONENT_CATALOG.md)** - Available shared components
- **[Usage Examples](docs/USAGE_EXAMPLES.md)** - Practical examples of component usage
- **[Import Standards](docs/IMPORT_AND_STRUCTURE_STANDARDS.md)** - Code organization guidelines

## 🆘 **Getting Help**

- **Check existing tools** for examples and patterns
- **Review the Component Catalog** for available shared components
- **Look at the Development Guide** for best practices
- **Ask questions in issues** - the community is helpful!

## ⚖️ **Legal**

_Dark Souls_ is a registered trademark of BANDAI NAMCO ENTERTAINMENT INC. This project is not affiliated with or endorsed by BANDAI NAMCO.
