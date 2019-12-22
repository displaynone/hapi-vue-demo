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
		const routes = require( './user/' + file );
		if ( routes.constructor !== Array ) {
			server.route( routes );
		} else {
			routes.forEach( route => server.route( route ) );
		}
	} );
};

module.exports = {
	name: 'api-user',
	dependencies: [],
	register,
};
