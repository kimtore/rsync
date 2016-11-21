const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'es5-shim',
    'babel-polyfill',
    './src/frontend/main'
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '..', 'web', 'core', 'static', 'dist')
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: [ 'style', 'css', 'sass' ],
        include: path.join(__dirname, 'src/sass'),
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.join(__dirname, 'src/frontend'),
        exclude: /(node_modules|bower_components)/
      }
    ]
  }
}
