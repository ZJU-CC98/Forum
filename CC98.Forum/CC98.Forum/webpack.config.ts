import * as webpack from 'webpack';
import * as path from 'path';
import * as UnminifiedWebpackPlugin from 'unminified-webpack-plugin';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as CleanWebpackPlugin from 'clean-webpack-plugin';

// ReSharper disable once InconsistentNaming
declare var __dirname;

const config: webpack.Configuration = {
	module: {
		rules: [
			{ test: /\.tsx?$/, use: 'awesome-typescript-loader' }
		]
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx']
	},
	entry: ['./Main.tsx'],
	devtool: 'source-map',
	output: {
		path: path.resolve(__dirname, 'wwwroot/scripts'),
		filename: 'main.min.js'
	},
	externals: ['jquery', 'signalr', 'react', 'react-dom', 'react-router', 'react-router-dom', 'redux', 'react-redux'],
	plugins: [
		new webpack.optimize.UglifyJsPlugin(), // 简化 JS
		new UnminifiedWebpackPlugin(), // 提供调试用 JS 完整版
		new CleanWebpackPlugin(['wwwroot/scripts']), // 发布之前清理 wwwroot
		new CopyWebpackPlugin([// 将 node 库复制到发布目录
			{ from: 'node_modules/jquery/dist', to: 'lib/jquery' },
			{ from: 'node_modules/signalr', to: 'lib/signalr' },
			{ from: 'node_modules/react/dist', to: 'lib/react' },
			{ from: 'node_modules/react-dom/dist', to: 'lib/react-dom' },
			{ from: 'node_modules/react-router/umd', to: 'lib/react-router' },
			{ from: 'node_modules/react-router-dom/umd', to: 'lib/react-router-dom' },
			{ from: 'node_modules/redux/dist', to: 'lib/redux' },
			{ from: 'node_modules/react-redux/dist', to: 'lib/react-redux' }

		])
	]
};

export default config;