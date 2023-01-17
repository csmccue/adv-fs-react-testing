/* eslint-disable no-undef */
const webpack = require('webpack');
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

require('dotenv').config();

// eslint-disable-next-line
module.exports = {
  entry: './src/index.jsx',
  output: {
    clean: true,
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlPlugin({ template: './src/index.html' }),
    new webpack.EnvironmentPlugin([
      'REACT_APP_SUPABASE_KEY',
      'REACT_APP_SUPABASE_URL',
    ]),
    new CopyPlugin({
      patterns: [{ from: 'public' }],
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
      React: 'react',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: {
                exportLocalsConvention: 'camelCase',
                // The localIdentName provides a template in which the class
                // names are mangled by CSS Modules. By default it is just a
                // random hash. Below, we use the file name ([name]) and the
                // class name ([local]) along with part of the hash. This allows
                // us to be able to see what classes are applied to what
                // elements in a human readable way.
                localIdentName: '[name]__[local]__[contenthash:base64:5]',
              },
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [
                  require('postcss-import')(),
                  require('autoprefixer')(),
                  require('postcss-nested')(),
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(jpeg|jpg|png|svg|gif)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
