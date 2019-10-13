/**
 * Activates an user
 */
const Boom = require( '@hapi/boom' );
const Joi = require( '@hapi/joi' );
const User = require( '../../models/users' );
const Config = require( '../../config' );

module.exports = {
	method: 'POST',
	path: '/user/activate',
	options: {
		tags: [ 'api', 'user', 'activate' ],
		description: 'Server activate user',
		notes: 'Server activate user',
		auth: false,
		validate: {
			payload: Joi.object( {
				token: Joi.string().required(),
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
			const user = await User.findByActivationToken( request.payload.token );
			if ( ! user ) {
				return Boom.badData( __( 'Token not valid' ) );
			}
			if ( Date.now() - user.activation.time > Config.get( '/user/activation/expiration' ) ) {
				return Boom.badData( __( 'Token expired' ) );
			}
			user.activation = undefined;
			user.active = true;
			user.save();

			return h.response( {
				response: true,
				message: __( 'Your account is activate, please log in.' ),
			} );
		} catch ( error ) {
			return Boom.badImplementation( 'Error', { error } );
		}
	},
};
