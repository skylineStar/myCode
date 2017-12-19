//此文件第13行更改了入口文件

var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
	entry: utils.getEntries('./src/module/**/*.js'),
//entry: {
//	     index: './src/module/wb/wb_main.js',
//  gxOrder: './src/module/gx/gx_order_main.js',
//  gxUser: './src/module/gx/gx_user_main.js'
//},
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
//    {
//      test: /\.css$/,
////      loader: "style-loader!css-loader?modules&localIdentName=[name]-[local]-[hash:base64:5]"
//      loader: ['style-loader',{
//      	loader: 'css-loader',
//      	options:{
//      		'localIdentName':'[name]-[local]-[hash:base64:6]'
//      	}
//      }],
////      include: [resolve('src'), resolve('test')]
//    },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
