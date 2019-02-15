const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ImageminPlugin = require("imagemin-webpack");
const imageminGifsicle = require("imagemin-gifsicle");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminPngquant = require("imagemin-pngquant");

module.exports = {
   mode: 'production',
   entry: './src/index.js',
   output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
   },
   optimization: {
      minimizer: [new UglifyJsPlugin()],
   },
   module: {
      rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
         },
         {
            test: /\.html$/,
            use: [{
               loader: 'html-loader',
               options: {
                  minimize: true
               }
            }]
         },
         {
            test: /\.(scss|css)$/,
            use: [
               'style-loader',
               MiniCssExtractPlugin.loader,
               'css-loader',
               'postcss-loader',
               'sass-loader'
               ]
         },
         {
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: [{
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
            use: [{
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
               removeViewBox: true,
            }}
      ),
      new HtmlWebpackInlineSVGPlugin({
         runPreEmit: true
      }),
      new MiniCssExtractPlugin({
         filename: '[name].css',
         chunkFilename: '[id].css'
      }),
      new ImageminPlugin({
         bail: false,
         cache: true,
         imageminOptions: {
            plugins: [
               imageminGifsicle({
                  interlaced: true
               }),
               imageminMozjpeg({
                  quality: 95
               }),
               imageminPngquant({})
            ]
         }
      })
   ],
};