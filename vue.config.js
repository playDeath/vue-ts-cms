module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        views: '@/views',
        components: '@/components',
        asserts: '@/assets',
        router: '@/router',
        network: '@/network',
        store: '@/store',
        baseUI: '@/baseUI'
      }
    }
  }
}
