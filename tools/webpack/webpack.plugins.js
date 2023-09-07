const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { inDev } = require('./webpack.helpers');

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  inDev() && new webpack.HotModuleReplacementPlugin(),
  inDev() && new ReactRefreshWebpackPlugin(),
  new CopyPlugin({
    patterns: [{ from: 'apps/renderer/src/assets', to: 'assets' }],
  }),
].filter(Boolean);
