// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: false,
  app: {
    baseURL: '/cornerstone3D-with-Nuxt3/'
  },
  vite:{
    resolve: {
      alias: {
        "@cornerstonejs/tools": "@cornerstonejs/tools/dist/umd/index.js"
      },
    },
  }
})
