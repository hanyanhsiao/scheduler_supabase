// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss','nuxt-icon','@pinia/nuxt','@samk-dev/nuxt-vcalendar','nuxt-lazy-hydrate'],
  
  typescript: {
    typeCheck: true
  },
  devtools: { enabled: true },
  css: ['@/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},    
    }
  },
  build: {
    transpile: [
        '@fortawesome/fontawesome-svg-core',
        '@fortawesome/pro-solid-svg-icons',
        '@fortawesome/pro-regular-svg-icons',
        '@fortawesome/pro-light-svg-icons',
        '@fortawesome/free-brands-svg-icons'
    ]
  },
  runtimeConfig: {
    // Private keys are only available on the server
    apiSecret: '123',
    // Public keys that are exposed to the client
    public: {
      apiBase: 'https://e6f4-60-248-2-19.ngrok-free.app' 
    }
  }
})
