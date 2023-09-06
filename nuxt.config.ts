// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss','nuxt-icon','@pinia/nuxt','@samk-dev/nuxt-vcalendar','nuxt-lazy-hydrate'],
  
  typescript: {
    typeCheck: true
  },
  devtools: { enabled: false },
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
    // apiSecret: '123',
    // Public keys that are exposed to the client
    // 在伺服器端與客戶端都可以讀取得到
    public: {
      apiBase: 'http://172.20.10.2:3000' 
    }
  },
  
})
