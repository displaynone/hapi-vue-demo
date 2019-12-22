/**
 * Authenticates an user
 */
const Boom = require( '@hapi/boom' );
const Joi = require( '@hapi/joi' );
const bcrypt = require( 'bcrypt' );
const JWT = require( 'jsonwebtoken' );
const uuid = require( 'uuid/v1' );
const User = require( '../../models/users' );
const Config = require( '../../config' );

module.exports = {
	method: 'POST',
	path: '/user/auth',
	options: {
		tags: [ 'api', 'user', 'auth' ],
		description: 'Server authenticate user',
		notes: 'Server authenticate user',
		auth: false,
		validate: {
			payload: Joi.object( {
				username: Joi.string().alphanum().min( 3 ).max( 20 ).required(),
				password: Joi.string().min( 8 ).required(),
			} ),
		},
	},

	/**
	 * Route handler
	 *
	 * @param {object} request
	 * @param {object} h Hapi object
	 * @returns {object}
	 */
	handler: async( request, h ) => {
		const { __ } = request.i18n;
		try {
			const user = await User.findByUserOrEmail( request.payload.username, request.payload.email );
			if ( ! user ) {
				return Boom.badData( __( 'User or password incorrect' ) );
			}
			if ( ! user.active ) {
				return Boom.unauthorized( __( 'User not valid' ) );
			}
			const isValidPassword = await bcrypt.compare( request.payload.password, user.password );
			if ( ! isValidPassword ) {
				return Boom.badData( __( 'User or password incorrect' ) );
			}

			const claims = {
				id: uuid(),
				exp: new Date().getTime() + ( 180 * 24 * 60 * 60 * 1000 ), // 3 months
				username: user.username,
				role: user.role,
				avatar: user.avatar,
			};

			user.uuid = claims.id;
			user.save();

			const token = JWT.sign( claims, Config.get( '/auth' ).jwt.secret ); // synchronous

			return h.response( {
				response: true,
				message: __( 'Check Auth Header for your Token' ),
			} ).header( 'Authorization', token );
		} catch ( error ) {
			return Boom.badImplementation( 'Error', { error } );
		}
	},
};
