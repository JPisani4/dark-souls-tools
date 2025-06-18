const baseURL = "/dark-souls-tools/";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "./modules/generate-tools.ts"],
  css: ["~/assets/css/main.css"],
  ui: {
    colorMode: false,
  },
  app: {
    baseURL,
    head: {
      title: "Dark Souls Tools",
      htmlAttrs: {
        lang: "en",
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "" }],
    },
  },
});
