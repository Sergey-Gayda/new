const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
const noProd = (process.env.npm_lifecycle_event !== 'prod');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

// const imagemin = require('imagemin');
// const imageminOptipng = require('imagemin-optipng');
// const imageminWebp = require('imagemin-webp');
// const imageminSvgo = require('imagemin-svgo');
// const imageminMozjpeg = require('imagemin-mozjpeg');

module.exports = {
   module: {
      rules: [
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
               noProd ? 'style-loader': ('style-loader', MiniCssExtractPlugin.loader),
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

         // imagemin(['src/img/*.{jpg,png}'], 'dist/img', {
         //    use: [
         // imageminWebp({quality: 70})]
         // }),
         // imagemin(['src/img/*.png'], 'dist/img/', {
         //    use: [imageminOptipng({optimizationLevel: 1})]
         // }),
         // imagemin(['src/img/*.jpg'], 'dist/img/', {
         //    use: [
         //       imageminMozjpeg({quality: 70})
         //    ]
         // }),



         // imagemin(['src/img/*.svg'], 'dist/img/', {
         //    use: [
         //       imageminSvgo({
         //          plugins: [
         //             {removeViewBox: false}
         //          ]
         //       })
         //    ]
         // })

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
      }),
      new CopyWebpackPlugin([{
         from: 'src/img/', to: 'img',ignore: [ '*.svg' ]
      }])
   ],
   devServer: {
      contentBase: path.join(__dirname, 'dist'),
      port: 9000,
      overlay: true
   }
};
