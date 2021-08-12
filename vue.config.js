// webpack使用
module.exports = {
  assetsDir:'static',
  publicPath:'./',
  css: {
    loaderOptions: {
      scss: {
        // @/ 是 src/ 的别名
        // 注意：在 sass-loader v8 中，这个选项名是 "prependData"，其他是："additionalData"
        prependData: `@import "@/assets/scss/index.scss";` //引入全局变量
      }
    }
  },
  devServer: {
    // host: '42.193.121.151', // 设置主机地址
    // port: 8000, // 设置默认端口
    proxy: { // 设置代理
      // 拦截
      '/sys': {
        target: 'http://42.193.121.151:8000/sys', // 代理的目标URL地址
        ws: true, // 如果要代理 websockets
        changeOrigin: true, // 是否要将host地址更改为target地址
        pathRewrite: {
          '^/sys': '/'
        }
      },
      '/shop': {
        target: 'http://42.193.121.151:8000/shop', // 代理的目标URL地址
        ws: true, // 如果要代理 websockets
        changeOrigin: true, // 是否要将host地址更改为target地址
        pathRewrite: {
          '^/shop': '/'
        }
      },
      '/commonAction': {
        target: 'http://42.193.121.151:8000/commonAction', // 代理的目标URL地址
        ws: true, // 如果要代理 websockets
        changeOrigin: true, // 是否要将host地址更改为target地址
        pathRewrite: {
          '^/commonAction': '/'
        }
      },
    }
  }
}
