export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  // Auto-import components with specific exclusions for game-specific components
  components: [
    { path: "~/components", extensions: ["vue"] },
    {
      path: "~/components/Tools",
      extensions: ["vue"],
      ignore: ["**/GameComponents/**"], // Exclude game-specific components from auto-import
    },
    {
      path: "~/components/Tools/soul-level-calculator",
      extensions: ["vue"],
      ignore: ["**/GameComponents/**"],
    },
    {
      path: "~/components/Tools/weapon-upgrade-calculator",
      extensions: ["vue"],
      ignore: ["**/GameComponents/**"],
    },
    { path: "~/components/Tools/Common", extensions: ["vue"] },
  ],
  // Core modules: UI framework, tool generation, and theme support
  modules: ["@nuxt/ui", "./modules/generate-tools.ts", "@nuxtjs/color-mode"],
  css: ["~/assets/css/main.css"],
  ui: {
    colorMode: false, // Disabled in favor of custom theme system
  },
  // App configuration with SEO and performance optimizations
  app: {
    head: {
      title: "Gold Phantom",
      htmlAttrs: {
        lang: "en",
      },
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.png" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
        },
        { rel: "preload", as: "image", href: "/background.jpg" },
      ],
    },
  },
  // Theme configuration with system preference support
  colorMode: {
    classSuffix: "", // Removes `-dark`/`-light` suffix on `html` class
    preference: "system", // Default to system preference
    fallback: "light", // Fallback if system preference unavailable
  },
  // Server-side optimizations for production
  nitro: {
    compressPublicAssets: true,
    minify: true,
    experimental: {
      wasm: true,
    },
  },
  // Experimental features for modern build optimizations
  experimental: {
    payloadExtraction: false,
    treeshakeClientOnly: true,
    componentIslands: false,
  },
  // Import protection configuration
  imports: {
    // Allow imports from utils directory
    dirs: ["utils/**", "composables/**"],
    // Global imports that should be available
    global: true,
  },
  // Bundle analysis for performance monitoring
  build: {
    analyze: process.env.ANALYZE === "true",
  },
});
