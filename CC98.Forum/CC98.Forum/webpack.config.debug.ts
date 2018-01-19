import * as webpack from 'webpack';
import * as path from 'path';

import * as UnminifiedWebpackPlugin from 'unminified-webpack-plugin';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as CleanWebpackPlugin from 'clean-webpack-plugin';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';



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
        'url-join': 'urljoin',
        "react-thunk": "ReduxThunk",
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin(), // 简化 JS
		new UnminifiedWebpackPlugin(), // 提供调试用 JS 完整版
		new CleanWebpackPlugin(['wwwroot/static/scripts', 'wwwroot/static/content']), // 发布之前清理 wwwroot
		new CopyWebpackPlugin([// 将 node 库复制到发布目录
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
			{ from: 'node_modules/spectrum-colorpicker/spectrum.js', to: 'static/scripts/lib/spectrum/spectrum.js' },
            { from: 'node_modules/url-join/', to: 'static/scripts/lib/url-join/' },
            { from: 'node_modules/redux-thunk/dist/', to: 'static/scripts/lib/react-thunk/' },
            { from: 'node_modules/typesafe-actions/', to: 'static/scripts/lib/typesafe-actions/' },
		]),
		new ExtractTextPlugin('static/content/site.min.css')
	]
};

export default config;