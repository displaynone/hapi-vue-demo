const Confidence = require( 'confidence' );
const Config = require( './index' );

const criteria = {
	env: process.env.NODE_ENV,
};

const manifest = {
	server: {
		port: Config.get( '/port' ),
	},
};

const store = new Confidence.Store( manifest );

exports.get = function( key ) {
	return store.get( key, criteria );
};

exports.meta = function( key ) {
	return store.meta( key, criteria );
};
