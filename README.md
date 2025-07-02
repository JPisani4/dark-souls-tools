# Gold Phantom

A set of simple, modular web tools for planning and optimizing your _Dark Souls_ playthrough.

## 🚀 Quick Start

```bash
git clone <repository-url>
cd dark-souls-tools
npm install
npm run dev
```

Visit: http://localhost:3000

## 🗂️ Project Structure

```
components/         # Vue components (shared & tool-specific)
composables/        # Business logic (Vue composables)
utils/              # Utility functions & themes
docs/               # (Removed, see this README)
types/              # TypeScript types
scripts/            # CLI/build scripts
```

## 🛠️ Creating a Tool

```bash
npm run create:tool -- "Tool Name" ds1
# Visit: http://localhost:3000/tools/ds1/tool-name
```

## 🧩 Using Shared Components

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
  <FormSection title="Calculator">
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
      :options="categoryOptions"
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

## 📜 Available Scripts

```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run create:tool      # Scaffold a new tool
npm run generate:tools   # Update tools manifest
npm run validate:tools   # Validate tool structure
npm run lint             # Lint code
npm run format           # Format code
```

## 🧑‍💻 Technologies

- Nuxt 3, Vue 3, Tailwind CSS 4, Nuxt UI 3
- TypeScript, Vite, PostCSS
- Vitest (testing), ESLint, Prettier

## 🤝 Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

### Workflow

1. Fork & branch
2. Use shared components & follow code style
3. Add tests if needed
4. Run `npm run validate:tools`
5. Submit a pull request

### Code Style

- Components: PascalCase
- Composables: camelCase with `use` prefix
- Types: camelCase
- Use shared components (e.g. `NumberField`)

## 🌐 SEO & Social Sharing

- Each tool/page sets a unique title, description, and Open Graph/Twitter meta tags for rich previews.
- Tool icons: square, min 1200x1200px, PNG preferred.
- See tool config for SEO fields.

## 📱 Mobile Performance

- Large dropdowns use native `<select>` on mobile for speed.
- Option caching is used for fast search/filtering.

---

For advanced details, see CONTRIBUTING.md.
