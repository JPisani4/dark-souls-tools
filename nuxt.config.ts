import { tools } from "./tools";

export default defineNuxtConfig({
  site: {
    url: "https://www.goldphantom.com",
  },
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
  // Core modules: UI framework, tool generation, theme support, and SEO
  modules: [
    "@nuxt/ui",
    "./modules/generate-tools.ts",
    "@nuxtjs/color-mode",
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
    "@nuxt/image",
  ],
  css: ["~/assets/css/main.css"],
  ui: {
    colorMode: false, // Disabled in favor of custom theme system
  },
  // App configuration with comprehensive SEO and performance optimizations
  app: {
    head: {
      title: "Gold Phantom - Soulsborne Tools & Calculators",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Essential Soulsborne tools and calculators for your playthrough. Calculate soul levels, weapon upgrades, and more for Dark Souls, Dark Souls 2, Dark Souls 3, Bloodborne, and .",
        },
        { name: "author", content: "Gold Phantom" },
        { name: "robots", content: "index, follow" },
        { name: "theme-color", content: "#1e293b" },
        {
          name: "keywords",
          content:
            "dark souls, calculator, soul level, weapon upgrade, bloodborne, elden ring, souls games, gaming tools",
        },
        { name: "application-name", content: "Gold Phantom" },
        { name: "apple-mobile-web-app-title", content: "Gold Phantom" },
        { name: "apple-mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-status-bar-style", content: "default" },
        { name: "format-detection", content: "telephone=no" },
        { name: "mobile-web-app-capable", content: "yes" },
        { name: "msapplication-TileColor", content: "#1e293b" },
        { name: "msapplication-config", content: "/browserconfig.xml" },
        {
          "http-equiv": "Content-Security-Policy",
          content:
            "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.iconify.design; frame-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self';",
        },

        // Open Graph
        { property: "og:type", content: "website" },
        {
          property: "og:title",
          content: "Gold Phantom - Soulsborne Tools & Calculators",
        },
        {
          property: "og:description",
          content:
            "Essential Soulsborne tools and calculators for your playthrough. Calculate soul levels, weapon upgrades, and more.",
        },
        { property: "og:url", content: "https://www.goldphantom.com" },
        { property: "og:site_name", content: "Gold Phantom" },
        { property: "og:image", content: "/soulsborne-tools-hero.webp" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        {
          property: "og:image:alt",
          content: "Gold Phantom - Soulsborne Tools",
        },
        { property: "og:locale", content: "en_US" },

        // Twitter Card
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "Gold Phantom - Soulsborne Tools & Calculators",
        },
        {
          name: "twitter:description",
          content:
            "Essential Soulsborne tools and calculators for your playthrough. Calculate soul levels, weapon upgrades, and more.",
        },
        { name: "twitter:image", content: "/soulsborne-tools-hero.webp" },
        {
          name: "twitter:image:alt",
          content: "Gold Phantom - Soulsborne Tools",
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.png" },
        { rel: "apple-touch-icon", href: "/favicon.png" },
        { rel: "canonical", href: "https://www.goldphantom.com" },
        { rel: "manifest", href: "/manifest.json" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
        },
        { rel: "preload", as: "image", href: "/soulsborne-tools-hero.webp" },
        { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
        { rel: "dns-prefetch", href: "https://fonts.gstatic.com" },
      ],
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Person",
                "@id": "https://www.goldphantom.com/#person",
                name: "Gold Phantom",
                url: "https://www.goldphantom.com",
                description:
                  "Solo developer and maintainer of Soulsborne Tools, an open source project.",
                sameAs: ["https://github.com/JPisani4/dark-souls-tools"],
              },
              {
                "@type": "WebSite",
                "@id": "https://www.goldphantom.com/#website",
                url: "https://www.goldphantom.com",
                name: "Gold Phantom - Soulsborne Tools",
                description:
                  "Essential Soulsborne tools and calculators for your playthrough.",
                publisher: {
                  "@id": "https://www.goldphantom.com/#person",
                },
                potentialAction: {
                  "@type": "SearchAction",
                  target: {
                    "@type": "EntryPoint",
                    urlTemplate:
                      "https://www.goldphantom.com/tools?search={search_term_string}",
                  },
                  "query-input": "required name=search_term_string",
                },
              },
            ],
          }),
        },
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
    prerender: {
      routes: [
        "/",
        "/tools",
        ...tools.flatMap((tool) =>
          tool.gameCategories.map((game) => `/tools/${game}/${tool.slug}`)
        ),
      ],
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
  // SEO modules configuration
  robots: {
    rules: {
      UserAgent: "*",
      Allow: "/",
      Disallow: ["/admin", "/api", "/_nuxt", "/.well-known"],
      Sitemap: "https://www.goldphantom.com/sitemap.xml",
      Host: "https://www.goldphantom.com",
    },
    sitemap: "https://www.goldphantom.com/sitemap.xml",
  },
  sitemap: {
    exclude: ["/404", "/admin", "/api"],
    urls: [
      {
        loc: "/",
        lastmod: new Date().toISOString(),
        changefreq: "daily",
        priority: 1.0,
      },
      {
        loc: "/tools",
        lastmod: new Date().toISOString(),
        changefreq: "daily",
        priority: 0.9,
      },
    ],
  },
});
