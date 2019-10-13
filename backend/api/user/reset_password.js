/**
 * Reset password email
 */
const Boom = require( '@hapi/boom' );
const Joi = require( '@hapi/joi' );
const bcrypt = require( 'bcrypt' );
const User = require( '../../models/users' );
const Config = require( '../../config' );
const Email = require( '../../utils/email' );

module.exports = {
	method: 'POST',
	path: '/user/reset-password',
	options: {
		tags: [ 'api', 'user', 'reset' ],
		description: 'Server reset password',
		notes: 'Server reset password',
		auth: false,
		validate: {
			payload: Joi.object( {
				password: Joi.string().min( 8 ).required(),
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
	handler: async( request ) => {
		const { __ } = request.i18n;
		try {
			const user = await User.findByResetToken( request.payload.token );

			if ( ! user ) {
				return Boom.badData( __( 'User doesn\'t exist' ) );
			}
			if ( Date.now() - user.reset.time > Config.get( '/user/reset/expiration' ) ) {
				return Boom.badData( __( 'Token expired' ) );
			}

			const password = await bcrypt.hash( request.payload.password, Config.get( '/hash/PASSWORD_HASH' ) );
			user.password = password;
			user.reset = undefined;
			user.save();

			const emailContent = request.templates.render( {
				file: '/emails/reset_password.hbs',
				data: {},
			} );
			const email = new Email();
			email.send( {
				to: user.email,
				subject: __( 'Password Reset' ), // Subject line
				html: emailContent,
			} );

			return {
				response: true,
			};
		} catch ( error ) {
			return Boom.badImplementation( 'Error', { error } );
		}
	},
};
