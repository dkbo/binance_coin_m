const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const webpack = require('webpack')
const filterGradient = require('postcss-filter-gradient')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const resolve = dir => path.join(__dirname, '../src', dir)

module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath:
            process.env.NODE_ENV === 'production'
                ? config.build.assetsPublicPath
                : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@': resolve(''),
            '@C': resolve('/components'),
            '@M': resolve('/store/modules'),
            '@V': resolve('/view'),
            '@API': resolve('/api'),
            '@UTIL': resolve('/util'),
            '@CSS': resolve(`../css`)
        }
    },
    module: {
        rules: [
            // {
            //     test: /\.(js|vue)$/,
            //     loader: 'eslint-loader',
            //     enforce: 'pre',
            //     // include: [resolve(''), resolve('../test')],
            //     exclude: [resolve('/node_modules')],
            //     options: {
            //         formatter: require('eslint-friendly-formatter')
            //     }
            // },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [/node_modules/],
                include: [resolve(''), resolve('../test')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 300000,
                    name: utils.assetsPath('img/[name].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 300000,
                    name: utils.assetsPath('fonts/[name].[ext]')
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.ProvidePlugin({
            // Promise: 'es6-promise',
            moment: 'moment',
            _M: resolve('/store/modules/mutations')
        }),
        new webpack.LoaderOptionsPlugin({
            vue: {
                postcss: [filterGradient()]
            }
        }),
        new webpack.ContextReplacementPlugin(/moment[\\/]locale$/, null),
    ]
}
