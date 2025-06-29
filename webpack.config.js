// const webpack = require('webpack');
const { CLIENT_PORT } = require('./port_config');

require('dotenv').config();

module.exports = {
  entry: `${__dirname}/client/app/components/index.tsx`,
  output: {
    path: `${__dirname}/client/public`,
    filename: 'bundle.js',
  },
  mode: 'development',
  devServer: {
    static: {
      directory: `${__dirname}/client/public`,
    },
    compress: true,
    port: CLIENT_PORT,
  },
  module: {
    rules: [
      { test: /\.[jt]{1}sx?$/, use: 'babel-loader', exclude: /(node_modules)/ },
      { test: /\.css$/i, use: ['style-loader', 'css-loader'], exclude: /(node_modules)/ },
      { test: /\.s[ac]ss$/i, use: ['style-loader', 'css-loader', 'sass-loader'], exclude: /(node_modules)/ },
      { test: /\.(txt|jl)$/i, use: 'raw-loader', exclude: /(node_modules)/ },
    ],
  },
};
