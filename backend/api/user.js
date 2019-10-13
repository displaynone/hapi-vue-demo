/**
 * User route
 */
const path = require( 'path' );
const fs = require( 'fs' );

/**
 * Register routes
 *
 * @param {Object} server Hapi Server
 */
const register = function( server ) {
	const normalizedPath = path.join( __dirname, 'user' );

	fs.readdirSync( normalizedPath ).forEach( file => {
		const route = require( './user/' + file );
		server.route( route );
	} );
};

module.exports = {
	name: 'api-user',
	dependencies: [],
	register,
};
