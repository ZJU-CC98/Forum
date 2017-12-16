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
            {
                test: /\.tsx?$/,
                use: 'awesome-typescript-loader'
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({ use: [{ loader: 'css-loader', options: { minimize: true } }, 'sass-loader'] })
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    entry: ['core-js/shim', './Main.tsx', './Site.scss'],
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
        'moment': 'moment',
        'editor.md': 'editormd',
        'codemirror': 'CodeMirror',
        '../node_modules/@aspnet/signalr-client/dist/src/index': 'signalR'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new UnminifiedWebpackPlugin(),
        new CleanWebpackPlugin(['wwwroot/scripts', 'wwwroot/content']),
        new CopyWebpackPlugin([
            { from: 'node_modules/jquery/dist', to: 'scripts/lib/jquery' },
            { from: 'node_modules/react/dist', to: 'scripts/lib/react' },
            { from: 'node_modules/react-dom/dist', to: 'scripts/lib/react-dom' },
            { from: 'node_modules/react-router/umd', to: 'scripts/lib/react-router' },
            { from: 'node_modules/react-router-dom/umd', to: 'scripts/lib/react-router-dom' },
            { from: 'node_modules/redux/dist', to: 'scripts/lib/redux' },
            { from: 'node_modules/react-redux/dist', to: 'scripts/lib/react-redux' },
            { from: 'node_modules/moment', to: 'scripts/lib/moment' },
            { from: 'node_modules/bootstrap/dist', to: 'scripts/lib/bootstrap' },
            { from: 'node_modules/es6-promise/dist', to: 'scripts/lib/es6-promise' },
            { from: 'node_modules/font-awesome', to: 'content/font-awesome' },
            { from: 'node_modules/moment', to: 'scripts/lib/moment' },
            { from: 'node_modules/editor.md', to: 'scripts/lib/editor.md/' },
            { from: 'node_modules/codemirror', to: 'scripts/lib/editor.md/lib/codemirror' },
            { from: 'node_modules/blueimp-canvas-to-blob/js', to: 'scripts/lib/blueimp-canvas-to-blob' },
            { from: 'node_modules/@aspnet/signalr-client/dist/browser', to: 'scripts/lib/signalr-client' },
            { from: 'spectrum/', to: 'scripts/lib/spectrum' },
        ]),
        new ExtractTextPlugin('content/site.min.css')
    ]
};
exports.default = config;
//# sourceMappingURL=webpack.config.js.map