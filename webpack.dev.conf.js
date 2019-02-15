const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');

module.exports = {
   mode: 'development',
   entry: './src/index.js',
   output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
   },
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
         },
         {
            test: /\.html$/,
            use: [{
               loader: 'html-loader',
            }]
         },
         {
            test: /\.(scss|css)$/,
            use: [
               'style-loader',
               MiniCssExtractPlugin.loader,
               {
                  loader: 'css-loader',
                  options: {sourceMap: true}
               },
               {
                  loader: 'sass-loader',
                  options: {sourceMap: true}
               }
            ]
         },
         {
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: [
               {
                  loader: 'file-loader',
                  options: {
                     outputPath: 'img',
                     name: '[name].[ext]',
                  },
               }
            ]
         },
         {
            test: /\.(woff2|woff)$/,
            use: [
               {
                  loader: 'file-loader',
                  options: {
                     outputPath: 'fonts',
                     name: '[name].[ext]',
                  },
               },
            ],
         },
      ]
   },
   plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin(
         {template: './src/index.html',
            svgoConfig: {
               removeViewBox: true
         }}
      ),
      new MiniCssExtractPlugin({
         filename: '[name].css',
         chunkFilename: '[id].css'
      }),
      new webpack.SourceMapDevToolPlugin({}),
      new HtmlWebpackInlineSVGPlugin({
         runPreEmit: true,
         }),
   ],
   devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      overlay: true
   }

};