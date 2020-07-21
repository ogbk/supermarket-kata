// const webpack = require('webpack');
const { CLIENT_PORT } = require('./port_config');

require('dotenv').config();

module.exports = {
  entry: `${__dirname}/client/app/components/index.js`,
  output: {
    path: `${__dirname}/client/public`,
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: `${__dirname}/client/public`,
    port: CLIENT_PORT,
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader', exclude: /(node_modules)/ },
      { test: /\.css$/i, use: ['style-loader', 'css-loader'], exclude: /(node_modules)/ },
      { test: /\.s[ac]ss$/i, use: ['style-loader', 'css-loader', 'sass-loader'], exclude: /(node_modules)/ },
      { test: /\.(txt|jl)$/i, use: 'raw-loader', exclude: /(node_modules)/ },
    ],
  },
};

