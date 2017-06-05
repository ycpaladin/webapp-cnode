const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const baseUrl = path.join(__dirname, 'src');

module.exports = {
  entry: {
    index: path.join(baseUrl, './index.js'),
    vendors: ['react', 'redux', 'babel-polyfill'],
  },
  output: {
    path: path.join(__dirname, 'bundle'),
    filename: '/js/[name].js',
  },
  devServer: {
    historyApiFallback: true,
    // host: '192.168.10.68',
    hot: true,
    inline: true,
    progress: true,
    port: 9001,
  },
  devtool: 'sourcemap',
  module: {
    preLoaders: [{
      test: /\.js?$/,
      include: baseUrl,
      loader: 'eslint-loader',
    }],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel?presets[]=react&presets[]=es2015&presets[]=stage-0', //&plugins[]=transform-object-rest-spread

      },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css') },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass'),
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&minetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
      {
        test: /\.(png|jpg|ttf|svg)$/,
        loader: 'url?limit=1000000',
      },
    ],
  },
  jshint: {
    esnext: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('/assets/[name].css'),
    new webpack.optimize.CommonsChunkPlugin('vendors', '/js/vendors.js'),
    new HtmlWebPackPlugin({
      title: 'test app',
      chunks: ['vendors', 'index'],
      template: path.join(baseUrl, './index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
  ],
};
