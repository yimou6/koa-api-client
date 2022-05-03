const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './',
  transpileDependencies: true,
  devServer: {
    // 开发环境
    proxy: 'http://localhost:8000'
  }
})