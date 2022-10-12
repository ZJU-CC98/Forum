"use strict";
exports.__esModule = true;
var webpack = require("webpack");
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
                // deprecated in webpack 5:
                // https://webpack.js.org/blog/2020-10-10-webpack-5-release/#deprecated-loaders
                test: /spatial\-watermark/,
                use: 'null-loader',
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader'
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
        //冬季
        css_blue: './Themes/wuteng_blue.scss',
        //春季（浅）
        css_green: './Themes/forgive_green.scss',
        //春季（深）
        css_more_green: './Themes/deep_dark_green.scss',
        //夏季
        css_summer: './Themes/summer.scss',
        //秋季（橙）
        css_autumn_orange: './Themes/autumn_orange.scss',
        //秋季（红）
        css_autumn_red: './Themes/autumn_red.scss',
        //双十一
        css_singleday: './Themes/singleday_pink.scss',
        //中秋（暗）
        css_mid_autumn_dark: './Themes/mid_autumn_dark.scss',
        //中秋（亮）
        css_mid_autumn_light: './Themes/mid_autumn_light.scss',
        //小雪（暗）
        css_light_snow_dark: './Themes/light_snow_dark.scss',
        //小雪（亮）
        css_light_snow_light: './Themes/light_snow_light.scss',
        //春节（暗）
        css_spring_festival_dark: './Themes/spring_festival_dark.scss',
        //春节（亮）
        css_spring_festival_light: './Themes/spring_festival_light.scss',
        //仲春
        css_zhongchun: './Themes/zhongchun.scss',
        //端午
        css_dragon_boat_festival: './Themes/dragon_boat_festival.scss',
        //清明
        css_qingming: './Themes/qingming.scss',
        //秋色之空（暗）
        css_autumn_2022_dark:'./Themes/autumn_2022_dark.scss',
        //秋色之空（亮）
        css_autumn_2022_light:'./Themes/autumn_2022_light.scss',
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
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
        // clean dist
        new CleanWebpackPlugin([
            'dist/static/scripts',
            'dist/static/content',
            'dist/static/index.html'
        ]),
        new CopyWebpackPlugin([
            { from: 'node_modules/jquery/dist', to: 'static/scripts/lib/jquery/' },
            { from: 'node_modules/moment', to: 'static/scripts/lib/moment/' },
            { from: 'node_modules/font-awesome', to: 'static/content/font-awesome/' },
            { from: 'node_modules/spectrum-colorpicker/spectrum.js', to: 'static/scripts/lib/spectrum/spectrum.js' },
            { from: 'node_modules/dplayer/dist/DPlayer.min.css', to: 'static/content/DPlayer.min.css' },
            { from: 'node_modules/dplayer/dist/DPlayer.min.css.map', to: 'static/content/DPlayer.min.css.map' },
            { from: 'node_modules/aplayer/dist/APlayer.min.css', to: 'static/content/APlayer.min.css' },
            { from: 'node_modules/aplayer/dist/APlayer.min.css.map', to: 'static/content/APlayer.min.css.map' },
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
