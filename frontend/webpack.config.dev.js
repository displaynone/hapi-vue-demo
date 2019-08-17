const webpack = require( 'webpack' );
const merge = require( 'webpack-merge' );
const common = require( './webpack.config.common.js' );

module.exports = merge( common, {
	mode: 'development',
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					'vue-style-loader',
					'css-loader',
					'sass-loader',
				],
			},
		],
	},
	devServer: {
		inline: true,
		hot: true,
		port: 9999,
		historyApiFallback: true,
	},
} );
