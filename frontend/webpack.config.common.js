const webpack = require( 'webpack' );
const path = require( 'path' );
const VueLoaderPlugin = require( 'vue-loader/lib/plugin' );
const StyleLintPlugin = require( 'stylelint-webpack-plugin' );

function resolve( dir ) {
	return path.join( __dirname, '.', dir );
}

module.exports = {
	mode: 'production',
	entry: './js/main.js',
	output: {
		filename: 'js/main.js',
		publicPath: '/dist/',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
			{
				test: /\.css$/,
				use: [
					'css-loader',
					'sass-loader',
				],
			},
		],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new VueLoaderPlugin(),
		new StyleLintPlugin( {
			files: [ '**/*.{vue,htm,html,css,sss,less,scss,sass}' ],
		} ),
	],
	resolve: {
		extensions: [ '.js', '.vue', '.json' ],
		alias: {
			'@': resolve( '' ),
		},
	},
};
