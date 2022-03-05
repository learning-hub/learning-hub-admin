const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        _Component: path.resolve(__dirname, './src/components'),
        _Static: path.resolve(__dirname, './src/assets'),
        _Api: path.resolve(__dirname, './src/api'),
        _Page: path.resolve(__dirname, './src/views')
      }
    }
  },
  devServer: {
    proxy: {
      '/auth': {
        target: 'http://192.168.43.103:8080'
      },
      // '/judger': {
      //   target: 'http://172.20.10.7:3000'
      // }
      '/judger': {
        target: 'http://192.168.43.32:3000'
      }
    }
  }
}
