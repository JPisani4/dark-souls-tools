export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  components: [
    { path: "~/components", extensions: ["vue"] },
    { path: "~/components/Tools", extensions: ["vue"] },
    { path: "~/components/Tools/SoulLevelCalculator", extensions: ["vue"] },
    { path: "~/components/Tools/WeaponUpgradeCalculator", extensions: ["vue"] },
  ],
  modules: ["@nuxt/ui", "./modules/generate-tools.ts", "@nuxtjs/color-mode"],
  css: ["~/assets/css/main.css"],
  ui: {
    colorMode: false,
  },
  app: {
    head: {
      title: "Dark Souls Tools",
      htmlAttrs: {
        lang: "en",
      },
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.jpg" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
        },
        { rel: "preload", as: "image", href: "/background.jpg" },
      ],
    },
  },
  colorMode: {
    classSuffix: "", // Optional: removes `-dark`/`-light` suffix on `html` class
    preference: "system", // default value of the preference
    fallback: "light", // fallback value if system preference is not available
  },
  // Performance optimizations
  nitro: {
    compressPublicAssets: true,
    minify: true,
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            "soul-costs": ["~/utils/soulCosts"],
            "ui-components": ["@nuxt/ui"],
          },
        },
      },
    },
  },
  experimental: {
    payloadExtraction: false,
  },
});
