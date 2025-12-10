const webpack = require("webpack");
const path = require("path");
const fs = require("fs/promises");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const WebpackChunkHash = require("webpack-chunk-hash");
const { minify } = require("html-minifier-terser");
const { loadEnv } = require("./env");

const { context, entries, resolve, makeTsRule, makeScssRule } = require("./common");
const copyPatterns = require("./copyPatterns");

const minifyOptions = {
    collapseWhitespace: true,
    minifyJS: true,
};

module.exports = async () => {
    const envConfig = loadEnv();
    return {
        // webpack 4 only
        mode: "production",
        context,
        module: {
            rules: [
                makeTsRule(),
                makeScssRule({ minimize: true }),
            ],
        },
        resolve,
        entry: entries,
        output: {
            path: path.resolve(context, "dist/"),
            publicPath: "/",
            filename: "static/scripts/[name]-[chunkhash:8].js",
            // Use a modern hash to avoid OpenSSL legacy flags on Node 18+.
            hashFunction: "sha256",
        },
        devtool: false,
        externals: {
            jquery: "$",
        },
        plugins: [
            new HTMLWebpackPlugin({
                template: "Template.ejs",
                filename: "static/index.html",
                minify: minifyOptions,
                inject: false,
                templateParameters: {
                    errorTemplate: await minify((await fs.readFile(path.resolve(context, "error.html"))).toString(), minifyOptions),
                    unsupportedTemplate: await minify((await fs.readFile(path.resolve(context, "unsupported.html"))).toString(), minifyOptions),
                },
            }),
            // clean dist
            new CleanWebpackPlugin(
                ["dist/static/scripts", "dist/static/content", "dist/static/index.html", "dist/static/reset.html"],
                {
                    root: context,
                }
            ),
            new CopyWebpackPlugin(copyPatterns),
            new ExtractTextPlugin("static/content/[name]-[chunkhash:8].css"),
            new WebpackChunkHash({ algorithm: "md5" }),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new webpack.DefinePlugin({
                __APP_CONFIG__: JSON.stringify(envConfig),
            }),
        ],
        optimization: {
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        compress: {
                            pure_funcs: ["console.log"],
                        },
                        safari10: true,
                    },
                }),
            ],
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendors",
                        chunks: "all",
                    },
                },
            },
        },
    };
};

