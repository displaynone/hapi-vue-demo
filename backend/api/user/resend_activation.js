/**
 * Resends activation email
 */
const Boom = require( '@hapi/boom' );
const Joi = require( '@hapi/joi' );
const User = require( '../../models/users' );
const Config = require( '../../config' );
const Email = require( '../../utils/email' );
const uuid = require( 'uuid/v1' );

module.exports = {
	method: 'POST',
	path: '/user/resend-activation',
	options: {
		tags: [ 'api', 'user', 'create' ],
		description: 'Server create user',
		notes: 'Server create user',
		auth: false,
		validate: {
			payload: Joi.object( {
				usernameOrEmail: Joi.string().required(),
			} ),
		},
	},

	/**
	 * Route handler
	 *
	 * @param {object} request
	 * @returns {object}
	 */
	handler: async( request ) => {
		const { __ } = request.i18n;
		try {
			// TODO: Add role
			const user = await User
				.findOne( {
					$or: [
						{ username: request.payload.usernameOrEmail },
						{ email: request.payload.usernameOrEmail },
					],
				} )
				.exec();
			if ( ! user ) {
				return Boom.badData( __( 'User doesn\'t exist' ) );
			}
			if ( user.activate ) {
				return Boom.badData( __( 'User already activated' ) );
			}

			user.activation = {
				token: uuid(),
				time: Date.now(),
			};
			user.save();

			const emailContent = request.templates.render( {
				file: '/emails/activate_account.hbs',
				data: {
					... user,
					activation_url: Config.get( '/website/url' ) + `/activate/${ user.activation.token }`,
				},
			} );
			const email = new Email();
			email.send( {
				to: user.email,
				subject: __( 'Activate your account' ), // Subject line
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
