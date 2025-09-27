// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  // Global page headers
  app: {
    head: {
      title: 'Annual Classic Car Show 2024',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Experience the finest collection of vintage and classic automobiles at the Annual Classic Car Show 2024.' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&display=swap', rel: 'stylesheet' },
        { href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css', rel: 'stylesheet' }
      ]
    }
  },

  // Global CSS
  css: [
    '~/assets/css/main.css'
  ],

  // Server-side rendering configuration
  ssr: true,

  // Nitro configuration for API routes
  nitro: {
    experimental: {
      wasm: true
    }
  }
})