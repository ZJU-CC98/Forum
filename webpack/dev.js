const webpack = require("webpack");
const path = require("path");
const fs = require("fs");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { loadEnv } = require("./env");

const { context, entries, resolve, makeTsRule, makeScssRule } = require("./common");
const copyPatterns = require("./copyPatterns");

const envConfig = loadEnv();

module.exports = {
    mode: "development",
    context,
    entry: entries,
    output: {
        path: path.resolve(context, "dist/"),
        // should use absolute path
        publicPath: "/",
        filename: "static/scripts/[name].js",
        // Use a modern hash to avoid OpenSSL legacy flags on Node 18+.
        hashFunction: "sha256",
    },

    module: {
        rules: [
            {
                // deprecated in webpack 5:
                // https://webpack.js.org/blog/2020-10-10-webpack-5-release/#deprecated-loaders
                test: /spatial\-watermark/,
                use: "null-loader",
            },
            makeTsRule({
                // speed up incremental builds; run typechecks separately
                transpileOnly: true,
                experimentalWatchApi: true,
                happyPackMode: true,
            }),
            makeScssRule(),
        ],
    },
    resolve,

    devtool: "eval-cheap-module-source-map",

    // enable webpack's in-memory cache for faster rebuilds
    cache: true,

    externals: {
        jquery: "$",
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: "Template.ejs",
            // place index.html at '/'
            filename: "index.html",
            inject: false,
            templateParameters: {
                errorTemplate: fs.readFileSync(path.resolve(context, "error.html")).toString(),
                unsupportedTemplate: fs.readFileSync(path.resolve(context, "unsupported.html")).toString(),
            },
        }),
        new ExtractTextPlugin("static/content/[name].css"),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        // Always copy vendor assets so externals resolve in dev server.
        new CopyWebpackPlugin(copyPatterns),
        new webpack.DefinePlugin({
            __APP_CONFIG__: JSON.stringify(envConfig),
        }),
    ],

    // webpack-dev-server config
    // "--hot" and "--inline" should be passed in package.json to enable HMR
    devServer: {
        // contentBase: path.resolve(__dirname, "dist"),
        historyApiFallback: true,
        port: 44303,
        host: "0.0.0.0",
    },
};

