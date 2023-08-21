// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss','nuxt-icon','@pinia/nuxt'],
  
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
  }
})
