// modules/generate-tools.ts

import { execSync } from "node:child_process";
import { defineNuxtModule } from "@nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "generate-tools",
    configKey: "generateTools",
  },
  setup() {
    execSync("npm run generate:tools", { stdio: "inherit" });
  },
});
