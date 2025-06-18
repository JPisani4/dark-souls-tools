// modules/generate-tools.ts

import { execSync } from "node:child_process";
import { defineNuxtModule } from "@nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "generate-tools",
    configKey: "generateTools",
  },
  setup() {
    console.log("🛠️  Generating tool manifest...");
    try {
      execSync("npm run generate:tools", { stdio: "inherit" });
      console.log("✅ Tool manifest generated");
    } catch (err) {
      console.error("❌ Failed to generate tool manifest:", err);
    }
  },
});
