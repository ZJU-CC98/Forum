"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webpack = require("webpack");
var path = require("path");
var UnminifiedWebpackPlugin = require("unminified-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var CleanWebpackPlugin = require("clean-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var config = {
    module: {
        rules: [
            { test: /\.tsx?$/, use: 'awesome-typescript-loader' },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({ use: [{ loader: 'css-loader', options: { minimize: true } }, 'sass-loader'] })
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    entry: ['./Main.tsx', './Site.scss'],
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'wwwroot'),
        filename: 'scripts/main.min.js'
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'react-router': 'ReactRouter',
        'react-router-dom': 'ReactRouterDOM',
        'redux': 'Redux',
        'react-redux': 'ReactRedux',
        'jquery': '$',
        'signalr': '$.connection',
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new UnminifiedWebpackPlugin(),
        new CleanWebpackPlugin(['wwwroot/scripts', 'wwwroot/content']),
        new CopyWebpackPlugin([
            { from: 'node_modules/jquery/dist', to: 'scripts/lib/jquery' },
            { from: 'node_modules/signalr', to: 'scripts/lib/signalr' },
            { from: 'node_modules/react/dist', to: 'scripts/lib/react' },
            { from: 'node_modules/react-dom/dist', to: 'scripts/lib/react-dom' },
            { from: 'node_modules/react-router/umd', to: 'scripts/lib/react-router' },
            { from: 'node_modules/react-router-dom/umd', to: 'scripts/lib/react-router-dom' },
            { from: 'node_modules/redux/dist', to: 'scripts/lib/redux' },
            { from: 'node_modules/react-redux/dist', to: 'scripts/lib/react-redux' },
            { from: 'node_modules/moment', to: 'scripts/lib/moment' },
            { from: 'node_modules/bootstrap/dist', to: 'scripts/lib/bootstrap' },
            { from: 'node_modules/es6-promise-polyfill', to: 'scripts/lib/es6-promise-polyfill' }
        ]),
        new ExtractTextPlugin('content/site.min.css')
    ]
};
exports.default = config;
//# sourceMappingURL=webpack.config.js.map