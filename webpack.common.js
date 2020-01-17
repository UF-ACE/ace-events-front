const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: './src/entrypoint.js',
  output: {
    chunkFilename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'out'),
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'UF ACE',
      meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'},
      template: './public/index.html'
    }),
    new CleanWebpackPlugin(),
    new FaviconsWebpackPlugin('./public/favicon.png'),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          "file-loader"
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: 3
                }
              ],
              [
                '@babel/preset-react',
                {
                  useBuiltIns: true,
                }
              ]
            ],
            plugins: [
              "@babel/plugin-syntax-dynamic-import",
              [
                '@babel/plugin-transform-runtime',
                {
                  "corejs": 3,
                  "helpers": true,
                  "regenerator": true,
                  "useESModules": true,
                }
              ],
              [
                '@babel/plugin-proposal-object-rest-spread',
                {
                  useBuiltIns: true
                }
              ],
              '@babel/plugin-proposal-class-properties'
            ]
          }
        }
      }
    ]
  },
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};