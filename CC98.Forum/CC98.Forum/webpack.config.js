"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webpack = require("webpack");
var path = require("path");
var UnminifiedWebpackPlugin = require("unminified-webpack-plugin");
var TransferWebpackPlugin = require("transfer-webpack-plugin");
var config = {
    module: {
        rules: [
            { test: /\.tsx?$/, use: 'awesome-typescript-loader' }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    entry: ['./Main.tsx'],
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'wwwroot'),
        filename: 'main.min.js'
    },
    externals: ['jquery', 'signalr', 'react', 'react-dom'],
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        }),
        new UnminifiedWebpackPlugin(),
        new TransferWebpackPlugin([
            { from: 'jquery', to: 'lib/jquery' }
        ], path.join(__dirname, 'node_modules'))
    ]
};
exports.default = config;
//# sourceMappingURL=webpack.config.js.map