const webpack = require('webpack');
const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        'jquery': 'jquery'
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
       $: "jquery",
       jQuery: "jquery",
       jquery: "jquery",
       "window.jQuery": "jquery"
      })
     ]
  }
};