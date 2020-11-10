module.exports = {
  devServer: {
    port: 8080,
    disableHostCheck: true
  },
  publicPath: './'
}
// 容量を見るとき
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// const plugins = []
// const optimization = {}

// // comment line 6 to disable analyzer
// plugins.push(new BundleAnalyzerPlugin())

// module.exports = {
//   lintOnSave: false,
//   configureWebpack: {
//     plugins,
//     optimization
//   }
// }
