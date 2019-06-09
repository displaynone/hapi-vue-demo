/**
 * Home route
 */
const User = require( '../models/users' );

const register = function( server, serverOptions ) { // eslint-disable-line
	server.route( {
		method: 'GET',
		path: '/',
		options: {
			tags: [ 'api', 'home' ],
			description: 'Server home',
			notes: 'Server home',
			auth: false,
		},

		/**
		 * Route handler
		 *
		 * @param {object} request
		 * @param {object} h Hapi object
		 * @returns {object}
		 */
		handler: async( request, h ) => { // eslint-disable-line
			try {
				const result = await User.findAll();
				return result;
			} catch ( error ) {
				return { error: 500 };
			}
		},
	} );
};

module.exports = {
	name: 'api-home',
	dependencies: [],
	register,
};
