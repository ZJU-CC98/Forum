"use strict";
exports.__esModule = true;
var Webpack = require("webpack");
var path = require("path");
var HTMLWebpackPlugin = require("html-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var CleanWebpackPlugin = require("clean-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var config = {
    // webpack 4 only
    mode: "development",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'awesome-typescript-loader'
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'sass-loader'
                    ]
                })
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    entry: {
        main: './Main.tsx',
        css_blue: './Themes/wuteng_blue.scss',
        css_green: './Themes/forgive_green.scss',
        css_more_green: './Themes/deep_dark_green.scss',
        css_summer: './Themes/summer.scss',
        css_autumn_orange: './Themes/autumn_orange.scss',
        css_autumn_red: './Themes/autumn_red.scss',
        css_singleday: './Themes/singleday_pink.scss',
        css_mid_autumn:'./Themes/mid_autumn.scss',
        css_mid_autumn_light:'./Themes/mid_autumn_light.scss',
        css_light_snow_dark:'./Themes/light_snow_dark.scss',
        css_light_snow_light:'./Themes/light_snow_light.scss',
        css_spring_festival_dark:'./Themes/spring_festival_dark.scss',
        css_spring_festival_light:'./Themes/spring_festival_light.scss',
        css_qingming:'./Themes/qingming.scss',
        css_dragon_boat_festival:'./Themes/dragon_boat_festival.scss',
    },
    output: {
        path: path.resolve(__dirname, 'wwwroot/'),
        // should use absolute path
        publicPath: '/',
        filename: 'static/scripts/[name].js'
    },
    devtool: 'source-map',
    externals: {
        'jquery': '$',
    },
    plugins: [
        // generate index.html
        new HTMLWebpackPlugin({
            template: 'Template.ejs',
            filename: 'static/index.html',
            inject: false
        }),
        // clean wwwroot
        new CleanWebpackPlugin([
            'wwwroot/static/scripts',
            'wwwroot/static/content',
            'wwwroot/static/index.html'
        ]),
        new CopyWebpackPlugin([
            { from: 'node_modules/jquery/dist', to: 'static/scripts/lib/jquery/' },
            { from: 'node_modules/moment', to: 'static/scripts/lib/moment/' },
            { from: 'node_modules/font-awesome', to: 'static/content/font-awesome/' },
            { from: 'node_modules/spectrum-colorpicker/spectrum.js', to: 'static/scripts/lib/spectrum/spectrum.js' },
            { from: 'node_modules/dplayer/dist/DPlayer.min.css', to: 'static/content/DPlayer.min.css' },
            { from: 'node_modules/aplayer/dist/APlayer.min.css', to: 'static/content/APlayer.min.css' },
            { from: 'node_modules/hls.js/dist/hls.min.js', to: 'static/content/hls.min.js' },
        ]),
        new ExtractTextPlugin('static/content/[name].css'),
        new webpack.ContextReplacementPlugin(
            /moment[\\\/]locale$/,
            /(zh-cn)\.js/
        )
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    }
};
exports["default"] = config;
