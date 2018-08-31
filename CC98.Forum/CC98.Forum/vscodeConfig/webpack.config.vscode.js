const Webpack = require('webpack')
const path = require('path')
const HTMLWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {

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
        summer: './Themes/summer.scss'
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
        'editor.md': 'editormd',
        'codemirror': 'CodeMirror',
    },

    plugins: [
        // generate index.html
        new HTMLWebpackPlugin({
			template: 'Template.ejs',
            // place index.html at '/'
            filename: 'index.html',
			inject: false
		}),
        

        new CopyWebpackPlugin([
            // copy static/config file
            { from: 'wwwroot/static', to: 'static' },

            { from: 'node_modules/jquery/dist', to: 'static/scripts/lib/jquery/' },
            { from: 'node_modules/font-awesome', to: 'static/content/font-awesome/' },
            { from: 'node_modules/editor.md', to: 'static/scripts/lib/editor.md/' },
            { from: 'node_modules/codemirror', to: 'static/scripts/lib/editor.md/lib/codemirror/' },
            { from: 'node_modules/spectrum-colorpicker/spectrum.js', to: 'static/scripts/lib/spectrum/spectrum.js' },
            { from: 'node_modules/dplayer/dist/DPlayer.min.css', to: 'static/content/DPlayer.min.css' },
            { from: 'node_modules/aplayer/dist/APlayer.min.css', to: 'static/content/APlayer.min.css' }
        ]),

        new ExtractTextPlugin('static/content/[name].css'),
    ],

    // webpack-dev-server config
    // "--hot" and "--inline" should be passed in package.json to enable HMR
    devServer: {
        // contentBase: path.resolve(__dirname, "wwwroot"),
        historyApiFallback: true,
        open: true,

        // proxy: {
        //     '/1262843-1.flv': {
        //         target: 'http://file409.niconi.cc',
        //         changeOrigin: true,
        //     }
        // }
    },
}