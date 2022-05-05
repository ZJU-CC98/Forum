const webpack = require('webpack')
const path = require('path')
const HTMLWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
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
        main: './src/Main.tsx',
        css_blue: './src/Themes/wuteng_blue.scss',
        css_green: './src/Themes/forgive_green.scss',
        css_more_green: './src/Themes/deep_dark_green.scss',
        css_summer: './src/Themes/summer.scss',
        css_autumn_orange: './src/Themes/autumn_orange.scss',
        css_autumn_red: './src/Themes/autumn_red.scss',
        css_singleday: './src/Themes/singleday_pink.scss',
        css_mid_autumn:'./src/Themes/mid_autumn.scss',
        css_mid_autumn_light:'./src/Themes/mid_autumn_light.scss',
        css_light_snow_dark:'./src/Themes/light_snow_dark.scss',
        css_light_snow_light:'./src/Themes/light_snow_light.scss',
        css_spring_festival_dark:'./src/Themes/spring_festival_dark.scss',
        css_spring_festival_light:'./src/Themes/spring_festival_light.scss',
        css_zhongchun:'./src/Themes/zhongchun.scss',
        css_dragon_boat_festival:'./src/Themes/dragon_boat_festival.scss',
        css_qingming:'./src/Themes/qingming.scss',
    },

    output: {
        path: path.resolve(__dirname, 'public/'),
        // should use absolute path
        publicPath: '/',
        filename: 'scripts/[name].js'
    },

    devtool: 'source-map',

    externals: {
        'jquery': '$',
    },

    plugins: [
        // generate index.html
        new HTMLWebpackPlugin({
			template: 'src/Template.ejs',
            // place index.html at '/'
            filename: 'index.html',
			inject: false
		}),


        new CopyWebpackPlugin([
            // copy config file
            { from: 'public', to: '.' },

            { from: 'node_modules/jquery/dist', to: 'scripts/lib/jquery/' },
            { from: 'node_modules/font-awesome', to: 'content/font-awesome/' },
            { from: 'node_modules/spectrum-colorpicker/spectrum.js', to: 'scripts/lib/spectrum/spectrum.js' },
            { from: 'node_modules/dplayer/dist/DPlayer.min.css', to: 'content/DPlayer.min.css' },
            { from: 'node_modules/aplayer/dist/APlayer.min.css', to: 'content/APlayer.min.css' },
            { from: 'node_modules/hls.js/dist/hls.min.js', to: 'content/hls.min.js'},
        ]),

        new ExtractTextPlugin('content/[name].css'),

        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

    ],

    // webpack-dev-server config
    // "--hot" and "--inline" should be passed in package.json to enable HMR
    devServer: {
        // contentBase: path.resolve(__dirname, "public"),
        historyApiFallback: true,
        port: 8083,
        host: '0.0.0.0',

        // proxy: {
        //     '/1262843-1.flv': {
        //         target: 'http://file409.niconi.cc',
        //         changeOrigin: true,
        //     }
        // }
    },
}
