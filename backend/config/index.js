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
		debug: { request: '*' },
	},
	website: {
		name: 'WP Desk',
		url: 'http://localhost:9999',
	},
	db: {
		url: process.env.MONGO_URL,
	},
	hash: {
		PASSWORD_HASH: 12,
	},
	auth: {
		jwt: {
			secret: process.env.JWT_SECRET,
		},
	},
	email: {
		smtp: {
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			secure: process.env.SMTP_SECURE,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD,
			},
		},
		from: process.env.SMTP_FROM,
	},
	user: {
		activation: {
			expiration: 3 * 24 * 60 * 60 * 1000, // 3 days
		},
		reset: {
			expiration: 3 * 60 * 60 * 1000, // 3 hours
		},
	},
	store: {
		path: {
			avatar: __dirname + '/../../storage/avatar/',
		},
	},
	frontend: {
		assets: {
			avatar: __dirname + '/../../frontend/assets/images/avatar.svg',
		},
	},
};

const store = new Confidence.Store( config );

exports.get = function( key ) {
	return store.get( key, criteria );
};

exports.meta = function( key ) {
	return store.meta( key, criteria );
};

