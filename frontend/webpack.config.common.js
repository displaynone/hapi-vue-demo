const webpack = require( 'webpack' );
const path = require( 'path' );
const VueLoaderPlugin = require( 'vue-loader/lib/plugin' );
const StyleLintPlugin = require( 'stylelint-webpack-plugin' );
const dotenv = require( 'dotenv' );

function resolve( dir ) {
	return path.join( __dirname, '.', dir );
}

/**
 * dotenv setting
 * @link https://medium.com/@trekinbami/using-environment-variables-in-react-6b0a99d83cf5
 */
const env = dotenv.config().parsed;

// reduce it to a nice object, the same as before
const envKeys = Object.keys( env ).reduce( ( prev, next ) => {
	prev[ `process.env.${ next }` ] = JSON.stringify( env[ next ] );
	return prev;
}, {} );

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
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				loader: 'file-loader',
			},
		],
	},
	plugins: [
		new webpack.DefinePlugin( envKeys ),
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
			icons: resolve( 'node_modules/vue-material-design-icons' ),
		},
	},
};
