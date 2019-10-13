/**
 * Reset password email
 */
const Boom = require( '@hapi/boom' );
const Joi = require( '@hapi/joi' );
const User = require( '../../models/users' );
const Config = require( '../../config' );
const Email = require( '../../utils/email' );
const uuid = require( 'uuid/v1' );

module.exports = {
	method: 'POST',
	path: '/user/resend-password',
	options: {
		tags: [ 'api', 'user', 'resend' ],
		description: 'Server resend password',
		notes: 'Server resend password',
		auth: false,
		validate: {
			payload: Joi.object( {
				email: Joi.string().email().required(),
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
			const user = await User
				.findOne( {
					email: request.payload.email,
				} )
				.exec();
			if ( ! user ) {
				return Boom.badData( __( 'User doesn\'t exist' ) );
			}

			user.reset = {
				token: uuid(),
				time: Date.now(),
			};
			user.save();

			const emailContent = request.templates.render( {
				file: '/emails/resend_password.hbs',
				data: {
					... user,
					activation_url: Config.get( '/website/url' ) + `/reset-password/${ user.reset.token }`,
				},
			} );
			const email = new Email();
			email.send( {
				to: user.email,
				subject: __( 'Reset your password' ), // Subject line
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
