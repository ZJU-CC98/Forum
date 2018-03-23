import * as webpack from 'webpack';
import * as path from 'path';

import * as UnminifiedWebpackPlugin from 'unminified-webpack-plugin';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as CleanWebpackPlugin from 'clean-webpack-plugin';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as HTMLWebpackPlugin from 'html-webpack-plugin';
import * as HTMLWebpackPluginRemove from 'html-webpack-plugin-remove';

// ReSharper disable once InconsistentNaming
declare var __dirname;

const config: webpack.Configuration = {
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
	entry: {
		main: './Main.tsx',
		css_green: './Themes/forgive_green.scss',
		css_blue: './Themes/wuteng_blue.scss',
		css_more_green: './Themes/deep_dark_green.scss',
		vendors: [
			'react', 
			'redux', 
			'react-dom', 
			'react-router', 
			'react-router-dom', 
			'react-redux', 
			'url-join', 
			'redux-thunk', 
			'blueimp-canvas-to-blob',
			'history',
			'whatwg-fetch',
			'aplayer',
			'dplayer',
			'es6-promise',
			'core-js/shim', 
		]
	},
	devtool: 'source-map',
	externals: {
		'jquery': '$',
		'moment': 'moment',
		'editor.md': 'editormd',
		'codemirror': 'CodeMirror',
	},
	output: {
		path: path.resolve(__dirname, 'wwwroot'),
		filename: 'static/scripts/[name]-[chunkhash:8]-min.js'
	},
	plugins: [
		new HTMLWebpackPlugin({ // 生成index.html
			template: 'Template.html',
			filename: 'static/index.html',
			chunks: ['main', 'vendors']
		}),
		new HTMLWebpackPluginRemove(/\.\./g), //index.html改用绝对路径
		new HTMLWebpackPluginRemove(/-min/g),  //debug环境使用完整版js
		new webpack.optimize.UglifyJsPlugin(), // 简化 JS
        new UnminifiedWebpackPlugin(), // 提供调试用 JS 完整版
		new CleanWebpackPlugin(['wwwroot/static/scripts', 'wwwroot/static/content', 'wwwroot/static/index.html']), // 发布之前清理 wwwroot
		new CopyWebpackPlugin([// 将 node 库复制到发布目录
			{ from: 'node_modules/jquery/dist', to: 'static/scripts/lib/jquery/' },
			{ from: 'node_modules/moment', to: 'static/scripts/lib/moment/' },
			{ from: 'node_modules/font-awesome', to: 'static/content/font-awesome/' },
			{ from: 'node_modules/moment', to: 'static/scripts/lib/moment/' },
			{ from: 'node_modules/editor.md', to: 'static/scripts/lib/editor.md/' },
			{ from: 'node_modules/codemirror', to: 'static/scripts/lib/editor.md/lib/codemirror/' },
			{ from: 'node_modules/spectrum-colorpicker/spectrum.js', to: 'static/scripts/lib/spectrum/spectrum.js' },
			{ from: 'node_modules/dplayer/dist/DPlayer.min.css', to: 'static/content/DPlayer.min.css' }
		]),
		new ExtractTextPlugin('static/content/[name].min.css'),
		new webpack.optimize.CommonsChunkPlugin({ name: 'vendors', filename: 'static/scripts/vendors-[chunkhash:8]-min.js' }),
	]
};

export default config;
