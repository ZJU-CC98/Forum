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
		'signalr': '$.connection'
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin(), // 简化 JS
		new UnminifiedWebpackPlugin(), // 提供调试用 JS 完整版
		new CleanWebpackPlugin(['wwwroot/scripts', 'wwwroot/content']), // 发布之前清理 wwwroot
		new CopyWebpackPlugin([// 将 node 库复制到发布目录
			{ from: 'node_modules/jquery/dist', to: 'scripts/lib/jquery' },
			{ from: 'node_modules/signalr', to: 'scripts/lib/signalr' },
			{ from: 'node_modules/react/dist', to: 'scripts/lib/react' },
			{ from: 'node_modules/react-dom/dist', to: 'scripts/lib/react-dom' },
			{ from: 'node_modules/react-router/umd', to: 'scripts/lib/react-router' },
			{ from: 'node_modules/react-router-dom/umd', to: 'scripts/lib/react-router-dom' },
			{ from: 'node_modules/redux/dist', to: 'scripts/lib/redux' },
			{ from: 'node_modules/react-redux/dist', to: 'scripts/lib/react-redux' }
		]),
		new ExtractTextPlugin('content/site.min.css')
	]
};

export default config;