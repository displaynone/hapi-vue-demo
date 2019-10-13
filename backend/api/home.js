/**
 * Home route
 */
const path = require( 'path' );
const fs = require( 'fs' );

/**
 * Register routes
 *
 * @param {Object} server Hapi Server
 */
const register = function( server ) {
	const normalizedPath = path.join( __dirname, 'home' );

	fs.readdirSync( normalizedPath ).forEach( file => {
		const route = require( './home/' + file );
		server.route( route );
	} );
};

module.exports = {
	name: 'api-home',
	dependencies: [],
	register,
};
