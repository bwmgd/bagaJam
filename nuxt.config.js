let plugins = []
let target = 'http://127.0.0.1:9000/' // 目标接口域名
if (process.env.NODE_ENV === 'production') {
  // plugins.push('transform-remove-console')
  target = 'https://service-g9r03zpd-1259310028.bj.apigw.tencentcs.com/release' // 目标接口域名
}
export default {
  // env: {
  //   STATIC_URL: ''
  // },
  /*
   ** Build configuration
   */
  build: {
    babel: {
      plugins
    },
    transpile: ['element-ui'],
    vendor: ['axios'],
    publicPath: './_nuxt/',
    assetsPublicPath: './',
    extend(config, {isDev}) {
      if (!isDev && process.env.STATIC_URL) {
        config.output.publicPath = './_nuxt/'
      }
    }
  },
  /*
   ** Headers of the page
   */
  head: {
    title: '八嘎酱',
    meta: [
      {charset: 'utf-8', lang: 'zh-CN',},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {
        hid: 'description',
        name: 'description',
        content: '八嘎酱-net'
      }
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: `${process.env.STATIC_URL || ''}/favicon.ico`}
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {color: '#fff'},
  /*
   ** Global CSS
   */
  css: ['element-ui/lib/theme-chalk/index.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {src: '~plugins/element-ui'}
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/axios'],
  axios: {
    proxy: true, // 表示开启代理
    prefix: '/api', // 表示给请求url加个前缀 /api
    credentials: true // 表示跨域请求时是否需要使用凭证
  },
  proxy: {
    '/api': {
      target: target, // 目标接口域名
      changeOrigin: true, // 表示是否跨域
      pathRewrite: {
        '^/api': '/', // 把 /api 替换成 /
      }
    },

  },
}
