// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
  ],

  runtimeConfig: {
    stripeSecretKey: '',
    stripeWebhookSecret: '',
    public: {
      datocmsToken: '',
      stripePublishableKey: '',
    },
  },

  components: [
    { path: '~/components/App', pathPrefix: false },
    { path: '~/components/ui', pathPrefix: false },
    { path: '~/components/home', pathPrefix: false },
    { path: '~/components/about', pathPrefix: false },
    { path: '~/components/how', pathPrefix: false },
    { path: '~/components/shop', pathPrefix: false },
  ],

  css: ['~/assets/css/main.css'],

  colorMode: {
    classSuffix: '',
    preference: 'light',
    fallback: 'light',
    storageKey: 'esenza-color-mode',
  },

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    langDir: 'locales/',
    locales: [
      { code: 'en', language: 'en-US', file: 'en.json', name: 'English' },
      { code: 'ja', language: 'ja-JP', file: 'ja.json', name: '日本語' },
    ],
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'èSenza Japan — Italian Organic Mixes',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Premium Italian organic jar mixes. Crafted in Italy, enjoyed in Japan.',
        },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&family=Noto+Sans+JP:wght@400;500;700&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap',
        },
      ],
    },
  },
})
