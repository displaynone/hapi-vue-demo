const Confidence = require( 'confidence' );
const Config = require( './index' );

const criteria = {
	env: process.env.NODE_ENV,
};

const manifest = {
	server: {
		port: Config.get( '/server/port' ),
		routes: {
			cors: {
				origin: [ '*' ],
				credentials: true,
				exposedHeaders: [ 'Authorization' ],
			},
		},
	},
	register: {
		plugins: [
			{
				plugin: './plugins/auth',
				options: Config.get( '/auth' ),
			},
			{
				plugin: './plugins/db',
				options: Config.get( '/db' ),
			},
			{
				plugin: './api/home',
			},
			{
				plugin: './api/user',
			},
		],
	},
};

const store = new Confidence.Store( manifest );

exports.get = function( key ) {
	return store.get( key, criteria );
};

exports.meta = function( key ) {
	return store.meta( key, criteria );
};
