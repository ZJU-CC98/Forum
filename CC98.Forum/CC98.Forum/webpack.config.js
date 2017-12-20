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
        filename: 'static/scripts/main.min.js'
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
        'url-join': 'urljoin'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new UnminifiedWebpackPlugin(),
        new CleanWebpackPlugin(['wwwroot/static/scripts', 'wwwroot/static/content']),
        new CopyWebpackPlugin([
            { from: 'node_modules/jquery/dist', to: 'static/scripts/lib/jquery/' },
            { from: 'node_modules/react/dist', to: 'static/scripts/lib/react/' },
            { from: 'node_modules/react-dom/dist', to: 'static/scripts/lib/react-dom/' },
            { from: 'node_modules/react-router/umd', to: 'static/scripts/lib/react-router/' },
            { from: 'node_modules/react-router-dom/umd', to: 'static/scripts/lib/react-router-dom/' },
            { from: 'node_modules/redux/dist', to: 'static/scripts/lib/redux/' },
            { from: 'node_modules/react-redux/dist', to: 'static/scripts/lib/react-redux/' },
            { from: 'node_modules/moment', to: 'static/scripts/lib/moment/' },
            { from: 'node_modules/bootstrap/dist', to: 'static/scripts/lib/bootstrap/' },
            { from: 'node_modules/es6-promise/dist', to: 'static/scripts/lib/es6-promise/' },
            { from: 'node_modules/font-awesome', to: 'static/content/font-awesome/' },
            { from: 'node_modules/moment', to: 'static/scripts/lib/moment/' },
            { from: 'node_modules/editor.md', to: 'static/scripts/lib/editor.md/' },
            { from: 'node_modules/codemirror', to: 'static/scripts/lib/editor.md/lib/codemirror/' },
            { from: 'node_modules/blueimp-canvas-to-blob/js', to: 'static/scripts/lib/blueimp-canvas-to-blob/' },
            { from: 'node_modules/@aspnet/signalr-client/dist/browser', to: 'static/scripts/lib/signalr-client/' },
            { from: 'spectrum/', to: 'static/scripts/lib/spectrum/' },
            { from: 'node_modules/url-join/', to: 'static/scripts/lib/url-join/' },
            { from: 'node_modules/react-infinite-scroller/', to: 'static/scripts/lib/react-infinite-scroller/' }
        ]),
        new ExtractTextPlugin('static/content/site.min.css')
    ]
};
exports.default = config;
//# sourceMappingURL=webpack.config.js.map