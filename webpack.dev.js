const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const Visualizer = require('webpack-visualizer-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [new ErrorOverlayPlugin(), new Visualizer()],
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: './out',
    historyApiFallback: true,
    port: 3000
  },
});