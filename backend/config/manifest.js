const Confidence = require( 'confidence' );
const Boom = require( '@hapi/boom' );
const Config = require( './index' );
const I18n = require( 'hapi-i18n' );

const criteria = {
	env: process.env.NODE_ENV,
};

const manifest = {
	server: {
		port: Config.get( '/server/port' ),
		routes: {
			cors: {
				origin: [ '*' ],
				credentials: true,
				exposedHeaders: [ 'Authorization' ],
			},
			validate: {
				failAction: async( request, h, err ) => {
					if ( process.env.NODE_ENV === 'production' ) {
						// In prod, log a limited error message and throw the default Bad Request error.
						// console.error( 'ValidationError:', err.message ); // eslint-disable-line no-console
						throw Boom.badRequest( `Invalid request payload input` );
					} else {
						// During development, log and respond with the full error.
						console.error( err ); // eslint-disable-line no-console
						throw err;
					}
				},
			},
		},
	},
	register: {
		plugins: [
			{
				plugin: './plugins/auth',
				options: Config.get( '/auth' ),
			},
			{
				plugin: './plugins/db',
				options: Config.get( '/db' ),
			},
			{
				plugin: './api/home',
			},
			{
				plugin: './api/user',
			},
			{
				plugin: I18n,
				options: {
					locales: [ 'en', 'es' ],
					directory: __dirname + '/../locales',
					languageHeaderField: 'content-language',
				},
			},
			{
				plugin: './plugins/templates',
			},
		],
	},
};

const store = new Confidence.Store( manifest );

exports.get = function( key ) {
	return store.get( key, criteria );
};

exports.meta = function( key ) {
	return store.meta( key, criteria );
};
