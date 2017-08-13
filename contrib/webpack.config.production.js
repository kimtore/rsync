const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./src/frontend/main'],
  output: {
    filename: 'bundle.min.js',
    path: path.join(__dirname, 'public/dist'),
    publicPath: '/dist/',
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
      __DEVTOOLS__: false,
      API_KEY: JSON.stringify(process.env.API_KEY),
      USER: JSON.stringify(process.env.USER),
    }),
    new webpack.IgnorePlugin(/(mobx-logger|mobx-react-devtools)/),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
    new ExtractTextPlugin({ filename: 'master.css', allChunks: true }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.template.html',
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css-loader!sass-loader'),
        include: path.join(__dirname, 'src/sass'),
      },
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        loader: 'awesome-typescript-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
        include: path.resolve(__dirname, 'src/frontend'),
      },
    ],
  },
};
