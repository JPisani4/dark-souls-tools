# Contributing to Dark Souls Tools

Thank you for your interest in contributing! This guide will help you add new tools, understand the build process, and follow best practices for this project.

## Adding a New Tool

1. **Create a Tool Directory:**

   - Add a new folder under `components/Tools/` (e.g., `components/Tools/MyNewTool/`).
   - Add an `Index.vue` file as the entry point for your tool.
   - Export a `meta` object from your `Index.vue` with at least a `title` and `description`:
     ```js
     export const meta = {
       title: "My New Tool",
       description: "A brief description of what this tool does.",
     };
     ```

2. **(Optional) Add Supporting Files:**

   - Add any supporting components or files in the same directory.

3. **Generate the Tools Manifest:**

   - Run `npm run generate:tools` to update the `tools.ts` manifest. This step is required for your tool to appear in the app.

4. **Test Locally:**
   - Run `npm run dev` to start the development server and verify your tool appears and works as expected.

## Build & Deployment

- The manifest is automatically generated before every Netlify build.
- For local static builds, run `npm run pregenerate && npm run generate` to ensure the manifest is up-to-date.

## Best Practices

- Use composables for business logic to keep components clean and DRY.
- Use shared components from `components/Tools/Common/` for consistent UI.
- Keep Node.js-only code in build scripts or Nuxt modules—never import Node.js modules in runtime or client code.
- Use TypeScript for all new code.
- Write clear, concise meta descriptions for each tool.

## Need Help?

Open an issue or pull request on [GitHub](https://github.com/JPisani4/dark-souls-tools) if you have questions or suggestions!
