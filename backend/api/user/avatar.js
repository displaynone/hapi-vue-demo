/**
 * Updates user avatar
 */
const Boom = require( '@hapi/boom' );
const Joi = require( '@hapi/joi' );
const fs = require( 'fs' );
const path = require( 'path' );
const User = require( '../../models/users' );
const Config = require( '../../config' );

/**
 * Ensures that the directory exists, if not then creates it
 *
 * @param {String} filePath File path
 * @returns {Boolean}
 */
const ensureDirectoryExistence = filePath => {
	const dirname = path.dirname( filePath );
	if ( fs.existsSync( dirname ) ) {
		return true;
	}
	ensureDirectoryExistence( dirname );
	fs.mkdirSync( dirname );
};

/**
 * Updates an avatar route
 */
const routes = [];
routes.push( {
	method: 'POST',
	path: '/user/avatar/update',
	options: {
		tags: [ 'api', 'user', 'avatar' ],
		description: 'Server uploads user avatar',
		notes: 'Server uploads user avatar',
		auth: 'jwt',
		validate: {
			payload: Joi.object( {
				image: Joi.any().required(),
				type: Joi.string().regex( /image\/\w+/ ).required(),
			} ),
		},
	},

	/**
	 * Route handler
	 *
	 * @param {object} request
	 * @param {object} h
	 * @returns {object}
	 */
	handler: async( request, h ) => {
		const { __ } = request.i18n;
		const user = await User.findByUUID( request.auth.credentials.id );
		const extension = request.payload.type.replace( /image\/(\w+)$/, '$1' );
		const avatarSubPath = user.username.substr( 0, 2 ) + '/' + user.username + '.' + extension;
		const avatarPath = Config.get( '/store/path/avatar' ) + avatarSubPath;
		try {
			ensureDirectoryExistence( avatarPath );
			fs.writeFileSync( avatarPath, request.payload.image );
			user.avatar = avatarSubPath;
			user.save();
			return h.response( {
				response: true,
				message: __( 'Avatar updated.' ),
			} );
		} catch ( error ) {
			Boom.boomify( {
				response: false,
				message: __( 'There was an error when updating avatar' ),
			}, { statusCode: 400 } );
		}
		return {};
	},
} );

/**
 * Gets user avatar route
 */
routes.push( {
	method: 'GET',
	path: '/user/avatar/{username}',
	options: {
		tags: [ 'api', 'user', 'avatar' ],
		description: 'Server gets user avatar',
		notes: 'Server gets user avatar',
		auth: false,
		validate: {
			params: Joi.object( {
				username: Joi.string().alphanum().min( 3 ).max( 20 ).required(),
			} ),
		},
	},

	/**
	 * Route handler
	 *
	 * @param {object} request
	 * @param {object} h
	 * @returns {object}
	 */
	handler: async( request, h ) => {
		const user = await User.findByUserOrEmail( request.params.username, '' );
		const options = {
			mode: 'inline',
			confine: false,
		};

		if ( ! user || ! user.avatar ) {
			return h.file( Config.get( '/frontend/assets/avatar' ), options );
		}

		const filePath = Config.get( '/store/path/avatar' ) + user.avatar;
		return h.file( filePath, options );
	},
} );

module.exports = routes;
