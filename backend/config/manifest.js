const Confidence = require( 'confidence' );
const Config = require( './index' );

const criteria = {
	env: process.env.NODE_ENV,
};

const manifest = {
	server: {
		port: Config.get( '/server/port' ),
	},
	register: {
		plugins: [
			{
				plugin: './api/home',
			},
			{
				plugin: './plugins/db',
				options: Config.get( '/db' ),
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
