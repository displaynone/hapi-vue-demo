const Glue = require( '@hapi/glue' );
const Manifest = require( './config/manifest' );

const options = {
	relativeTo: __dirname,
};

const startServer = async function() {
	try {
		const manifest = Manifest.get( '/' );
		const server = await Glue.compose( manifest, options );
		await server.start();
		console.log( 'hapi days!' ); // eslint-disable-line
	} catch ( err ) {
		console.error( err ); // eslint-disable-line
		process.exit( 1 );
	}
};

startServer();
