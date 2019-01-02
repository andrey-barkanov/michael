const path = require('path');
const webpack = require('webpack');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
  return {
    entry: {
      bundle: ['./src/index.tsx'],
      vendor: [
        'react',
        'react-dom',
        'react-router',
      ]
    },
    output: {
      path: path.resolve(__dirname, './_build'),
      filename: '[name]-[chunkhash].js',
      publicPath: env && env.NODE_ENV === 'production' ?   './' : '/',
    },
    devtool: 'source-map',
    devServer: {
      historyApiFallback: true
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "awesome-typescript-loader"
        },
        {
          test: /\.js$/,
          loader: "source-map-loader",
          enforce: "pre"
        },
        {
          use: ExtractTextWebpackPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                query: {
                  localIdentName: '[local]__[hash:base64:5]',
                  modules: true,
                },
              },
              {
                loader: 'resolve-url-loader',
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                  includePaths: [path.resolve(__dirname, './src/styles')],
                },
              },
            ],
          }),
          test: /\.sass$/,
        },
        {
          use: ExtractTextWebpackPlugin.extract({
            use: [
              {
                loader: 'css-loader',
              },
              {
                loader: 'resolve-url-loader',
              },
            ],
          }),
          test: /\.css$/,
        },
        {
          test: /fonts.+\.(eot|ttf|woff|woff2|svg)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name]-[hash].[ext]',
            },
          },
        },
        {
          test: /\.(jpe?g|png|gif|ico|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                limit: 10000,
                name: 'images/[hash].[ext]',
              },
            }
          ],
        },
      ]
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        types: path.resolve(__dirname, './src/types'),
        components: path.resolve(__dirname, './src/components'),
        utils: path.resolve(__dirname, './src/utils'),
        actions: path.resolve(__dirname, './src/data/actions'),
        service: path.resolve(__dirname, './src/data/service'),
        config: path.resolve(__dirname, './src/config.ts'),
        sharedConstants: path.resolve(__dirname, './src/constants'),
      }
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    plugins: [
      new ExtractTextWebpackPlugin({
        allChunks: true,
        filename: '[name]-[chunkhash].css',
      }),
      new webpack.EnvironmentPlugin(Object.keys(process.env)),
      new HtmlWebpackPlugin({
        hash: false,
        template: './index.html',
      }),
      new CopyWebpackPlugin([
        // { from: './assets/favicon.ico', to: 'favicon.ico' },
      ]),
      // new CompressionPlugin({
      //   asset: '[path].gz[query]',
      //   algorithm: 'gzip',
      //   test: /\.js$|\.css|\.ttf$/,
      //   threshold: 10240,
      //   minRatio: 0.8,
      // }),
    ]
  };
};
