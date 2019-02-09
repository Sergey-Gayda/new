const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
const development = (process.env.npm_lifecycle_event == 'dev');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
   module: {
      rules: [
         {
            test: /\.txt$/,
            use: 'raw-loader'
         },
         {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ['@babel/preset-env'],
                  plugins: ['@babel/plugin-proposal-object-rest-spread']
               }
            }
         },
         {
            test: /\.scss$/,
            use: [
               development ? 'style-loader': ('style-loader', MiniCssExtractPlugin.loader),
               {
                  loader: 'css-loader',
                  options: {sourceMap: true}
               },
               {
                  loader: 'postcss-loader',
                  options: {plugins: [
                     require('autoprefixer')({
                        browsers: ['last 3 versions', '> 1%']
                     }),
                     require('cssnano')({
                        preset: [
                           'default', {
                              discardComments: {
                                 removeAll: true,
                              }
                           }
                        ]
                     })
                  ], sourceMap: true},
               },
               {
                  loader: 'sass-loader',
                  options: {sourceMap: true}
               }
            ]
         },
         {
            test: /\.css$/,
            use: [
               'style-loader',
               MiniCssExtractPlugin.loader,
               {
                  loader: 'css-loader',
                  options: {sourceMap: true}
               },
               {
                  loader: 'postcss-loader',
                  options: {sourceMap: true, config: {path: 'postcss.config.js'}}
               }
            ]
         }
      ]
   },
   plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
         template: './src/index.html'
      }),
      new HtmlWebpackInlineSVGPlugin({
         runPreEmit: true
      }),
      new MiniCssExtractPlugin({
         filename: '[name].css',
         chunkFilename: '[id].css'
      }),
      new webpack.DefinePlugin({
         'process.env': {
            NODE_ENV: JSON.stringify( process.env.NODE_ENV )
         }
      })
   ],
   devServer: {
      overlay: true
   }
};