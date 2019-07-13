const Confidence = require( 'confidence' );
const Dotenv = require( 'dotenv' );

Dotenv.config( { silent: true } );

// NODE_ENV is used in package.json for running development or production environment
const criteria = {
	env: process.env.NODE_ENV,
};

const config = {
	server: {
		port: process.env.PORT,
	},
	website: {
		name: 'WP Desk',
	},
	db: {
		url: process.env.MONGO_URL,
	},
	hash: {
		PASSWORD_HASH: 12,
	},
};

const store = new Confidence.Store( config );

exports.get = function( key ) {
	return store.get( key, criteria );
};

exports.meta = function( key ) {
	return store.meta( key, criteria );
};
