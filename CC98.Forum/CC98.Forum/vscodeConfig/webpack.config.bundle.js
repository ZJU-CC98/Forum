const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const merge = require("webpack-merge")

const devConfig = require("./webpack.config.vscode")

module.exports = merge(devConfig, {
    mode: "production",

    plugins: [
        new BundleAnalyzerPlugin(),
    ],
})