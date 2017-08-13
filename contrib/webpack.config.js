const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['react-hot-loader/patch', 'webpack-hot-middleware/client', './src/frontend/main'],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public/dist'),
    publicPath: '/dist/',
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
  },
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
      __DEVTOOLS__: process.env.DEVTOOLS === 'true',
      API_KEY: JSON.stringify(process.env.API_KEY),
      USER: JSON.stringify(process.env.USER),
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.template.html',
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.join(__dirname, 'src/sass'),
      },
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        loaders: ['react-hot-loader/webpack', 'awesome-typescript-loader'],
        exclude: path.resolve(__dirname, 'node_modules'),
        include: path.resolve(__dirname, 'src/frontend'),
      },
    ],
  },
};
