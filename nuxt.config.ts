// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
     '@nuxtjs/tailwindcss', 'nuxt-icon', '@pinia/nuxt', 'nuxt-vitest'
  ],
  app: {
    head: {
      script: [
        {
          async: true,
          src: "https://unpkg.com/@material-tailwind/html/scripts/ripple.js",
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      secret: process.env.FALSEUSER,
    }
  }
})
