const webpack = require("webpack");
const path = require("path");
const fs = require("fs");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const { loadEnv } = require("./env");

const {
    context,
    resolve,
    makeTsRule,
    makeScssRule,
    getEntries,
    MiniCssExtractPlugin,
} = require("./common");
const copyPatterns = require("./copyPatterns");

const envConfig = loadEnv();

module.exports = {
    mode: "development",
    context,

    module: {
        rules: [
            {
                // deprecated in webpack 5:
                // https://webpack.js.org/blog/2020-10-10-webpack-5-release/#deprecated-loaders
                test: /spatial\-watermark/,
                use: "null-loader",
            },
            makeTsRule(),
            makeScssRule({ extract: true }),
        ],
    },
    resolve,

    entry: getEntries(),

    output: {
        path: path.resolve(context, "dist/"),
        // should use absolute path
        publicPath: "/",
        filename: "static/scripts/[name].js",
        // Use a modern hash to avoid OpenSSL legacy flags on Node 18+.
        hashFunction: "sha256",
    },

    devtool: "source-map",

    externals: {
        jquery: "$",
    },

    plugins: [
        // generate index.html
        new HTMLWebpackPlugin({
            template: "Template.ejs",
            filename: "static/index.html",
            inject: false,
            templateParameters: {
                errorTemplate: fs.readFileSync(path.resolve(context, "error.html")).toString(),
                unsupportedTemplate: fs.readFileSync(path.resolve(context, "unsupported.html")).toString(),
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
        new MiniCssExtractPlugin({
            filename: "static/content/[name]-[contenthash:8].css",
            chunkFilename: "static/content/[name]-[contenthash:8].css",
        }),
        new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /(zh-cn)\.js/),
        new webpack.DefinePlugin({
            __APP_CONFIG__: JSON.stringify(envConfig),
        }),
    ],
    optimization: {
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

