const Glue = require( '@hapi/glue' );

const manifest = {
	server: {
		port: 3001,
	},
};

const options = {
	relativeTo: __dirname,
};

const startServer = async function() {
	try {
		const server = await Glue.compose( manifest, options );
		await server.start();
		console.log( 'hapi days!' ); // eslint-disable-line
	} catch ( err ) {
		console.error( err ); // eslint-disable-line
		process.exit( 1 );
	}
};

startServer();
