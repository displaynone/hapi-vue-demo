/**
 * DB controller
 *
 * It uses Mongoose and "stores" it in the server and the request using `decorate`
 */
const mongoose = require( 'mongoose' );

exports.plugin = {
	name: 'db',
	register: async function( server, options ) {
		mongoose.connect( options.url, { useNewUrlParser: true } );
		const db = mongoose.connection;
		// eslint-disable-next-line
		db.on( 'error', console.error.bind( console, 'connection error:' ) );
		db.once( 'open', function() {
			server.decorate( 'server', 'db', mongoose );
			server.decorate( 'request', 'db', mongoose );
			// eslint-disable-next-line
			console.log( 'DB connected' );
		} );
	},
};
