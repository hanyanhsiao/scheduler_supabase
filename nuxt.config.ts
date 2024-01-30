// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@pinia/nuxt',
    '@samk-dev/nuxt-vcalendar',
    'nuxt-lazy-hydrate',
    '@vee-validate/nuxt'
  ],

  typescript: {
    typeCheck: true
  },
  devtools: { enabled: false },
  css: ['@/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'] // import { defineStore as definePiniaStore } from 'pinia'
    ]
  },
  veeValidate: {
    // disable or enable auto imports
    autoImports: true
  },
  build: {
    transpile: [
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/pro-solid-svg-icons',
      '@fortawesome/pro-regular-svg-icons',
      '@fortawesome/pro-light-svg-icons',
      '@fortawesome/free-brands-svg-icons',
      'yup',
      '@vee-validate/rules'
      // 'property-expr' 部署時要新增，但開發時不行加!
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
  }
})
