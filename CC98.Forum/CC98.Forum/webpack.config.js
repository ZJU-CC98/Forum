"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webpack = require("webpack");
var path = require("path");
var UnminifiedWebpackPlugin = require("unminified-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var CleanWebpackPlugin = require("clean-webpack-plugin");
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
        path: path.resolve(__dirname, 'wwwroot/scripts'),
        filename: 'main.min.js'
    },
    externals: ['jquery', 'signalr', 'react', 'react-dom', 'react-router', 'react-router-dom', 'redux', 'react-redux'],
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new UnminifiedWebpackPlugin(),
        new CleanWebpackPlugin(['wwwroot/scripts']),
        new CopyWebpackPlugin([
            { from: 'node_modules/jquery/dist', to: 'lib/jquery' },
            { from: 'node_modules/signalr', to: 'lib/signalr' },
            { from: 'node_modules/react/dist', to: 'lib/react' },
            { from: 'node_modules/react-dom/dist', to: 'lib/react-dom' },
            { from: 'node_modules/react-router/umd', to: 'lib/react-router' },
            { from: 'node_modules/react-router-dom/umd', to: 'lib/react-router-dom' },
            { from: 'node_modules/redux/dist', to: 'lib/redux' },
            { from: 'node_modules/react-redux/dist', to: 'lib/react-redux' }
        ])
    ]
};
exports.default = config;
//# sourceMappingURL=webpack.config.js.map