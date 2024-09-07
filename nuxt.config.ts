// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  routeRules: {
    // prerender index route by default
    '/': { prerender: true },
  },

  ssr: false,
  css: ['~/node_modules/@nordhealth/css/lib/nord.css'],

  vite: {
    vue: {
      template: {
        compilerOptions: {
          // treat all tags with a dash as custom elements
          isCustomElement: (tag) => tag.includes('-')
        }
      }
    }
  },

  compatibilityDate: '2024-09-07',
});