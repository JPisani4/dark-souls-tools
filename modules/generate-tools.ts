// modules/generate-tools.ts
// Nuxt module that automatically generates the tools manifest during build

import { execSync } from "node:child_process";
import { defineNuxtModule } from "@nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "generate-tools",
    configKey: "generateTools",
  },
  setup() {
    // Run tool generation script during Nuxt setup
    // This ensures the tools manifest is always up to date
    execSync("npm run generate:tools", { stdio: "inherit" });
  },
});
