const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/shx/',
  devServer: {
    port: 8080,
    proxy: 'https://www.hangyedaniu.com/'
  },
})
