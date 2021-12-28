// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path')
// const { target } = require('./login')
const bundleAnalyzerReport = process.argv.includes('--report')
// const api = ['^/logout', '^/login', '^/dev', '^/api', '^/favicon.ico'].join('|')


module.exports = {
    build: {
        env: require('./prod.env'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: false,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport,
    },
    dev: {
        env: require('./dev.env'),
        port: 8092,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        // proxyTable: {
        //     '*': {
        //         target,
        //         changeOrigin: true,
        //         filter: pathname => pathname.match(api),
        //         secure: false
        //     }
        // },
        cssSourceMap: false
    }
}
