const Config = require( '../config' );

const websiteName = Config.get( '/website/name' );

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
		handler: function( request, h ) { // eslint-disable-line
			return {
				message: `Welcome to ${ websiteName }`,
			};
		},
	} );
};

module.exports = {
	name: 'api-home',
	dependencies: [],
	register,
};
