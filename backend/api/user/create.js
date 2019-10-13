/**
 * Creates a new user
 */
const Boom = require( '@hapi/boom' );
const Joi = require( '@hapi/joi' );
const bcrypt = require( 'bcrypt' );
const uuid = require( 'uuid/v1' );
const User = require( '../../models/users' );
const Config = require( '../../config' );
const Email = require( '../../utils/email' );

module.exports = {
	method: 'POST',
	path: '/user/register',
	options: {
		tags: [ 'api', 'user', 'create' ],
		description: 'Server create user',
		notes: 'Server create user',
		auth: false,
		validate: {
			payload: Joi.object( {
				username: Joi.string().alphanum().min( 3 ).max( 20 ).required(),
				email: Joi.string().email().required(),
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
	handler: async( request, h ) => { // eslint-disable-line
		const { __ } = request.i18n;
		try {
			// TODO: Add role
			const user = await User
				.findOne( {
					$or: [
						{ username: request.payload.username },
						{ email: request.payload.email },
					],
				} )
				.exec();
			if ( user ) {
				return Boom.badData( __( 'User exists' ) );
			}
			const password = await bcrypt.hash( request.payload.password, Config.get( '/hash/PASSWORD_HASH' ) );
			const activation = {
				token: uuid(),
				time: Date.now(),
			};
			const userData = Object.assign( {}, request.payload, {
				password,
				active: false,
				activation,
			} );
			const newUser = await User.create( userData );

			if ( newUser ) {
				const emailContent = request.templates.render( {
					file: '/emails/activate_account.html',
					data: {
						... newUser,
						activation_url: Config.get( '/website/url' ) + `/activate/${ activation.token }`,
					},
				} );
				const email = new Email();
				email.send( {
					to: request.payload.email,
					subject: __( 'Activate your account' ), // Subject line
					html: emailContent,
				} );
			}

			return newUser ?
				{
					response: true,
					message: __( 'User created' ),
					userId: newUser.id,
				} :
				Boom.boomify( {
					response: false,
					message: __( 'There was an error during user creation' ),
				}, { statusCode: 400 } );
		} catch ( error ) {
			return Boom.badImplementation( 'Error', { error } );
		}
	},
};
