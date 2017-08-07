import * as webpack from 'webpack';
import * as path from 'path';
import * as UnminifiedWebpackPlugin from 'unminified-webpack-plugin';
import * as TransferWebpackPlugin from 'transfer-webpack-plugin';

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
		path: path.resolve(__dirname, 'wwwroot'),
		filename: 'main.min.js'
	},
	externals: ['jquery', 'signalr', 'react', 'react-dom'],
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true
		}),
		new UnminifiedWebpackPlugin(),
		new TransferWebpackPlugin([
			{ from: 'jquery', to: 'lib/jquery' }

		], path.join(__dirname,  'node_modules'))
	]
};

export default config;