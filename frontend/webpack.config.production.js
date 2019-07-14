const webpack = require( 'webpack' );
const merge = require( 'webpack-merge' );
const common = require( './webpack.config.common.js' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

module.exports = merge( common, {
	mode: 'production',
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new MiniCssExtractPlugin( {
			filename: './css/style.css',
		} ),
	],
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
				],
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
				],
			},
		],
	},
} );
