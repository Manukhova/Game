var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, '');
var APP_DIR = path.resolve(__dirname, 'app');

module.exports = {
  context: APP_DIR,
  entry: './index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: APP_DIR + '/index.html'
    })
  ],
  resolve: {
    root: APP_DIR,
  },
  devServer: {
    contentBase: BUILD_DIR,
    inline: true,
    port: 5000
  }
};
