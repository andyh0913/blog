var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'client/public/bundle');
var APP_DIR = path.resolve(__dirname, 'client/src');

var config = {
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    publicPath: "/",
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: APP_DIR,
        loader: 'babel-loader'
      },
      {
          test: /\.(png|jpg)$/,
          loader: 'url-loader?limit=8192'
      },
      {
          test: /\.css$/,
          loaders: ['style-loader', 'css-loader']
      }
    ]
  }
};

module.exports = config;
