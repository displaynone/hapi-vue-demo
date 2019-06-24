/**
 * User route
 */
const User = require( '../models/users' );
const Boom = require( '@hapi/boom' );
const Joi = require( '@hapi/joi' );
const bcrypt = require( 'bcrypt' );

const Config = require( '../config' );

const register = function( server, serverOptions ) { // eslint-disable-line
	/**
	 * Route `/user`
	 *
	 * Returns the current user
	 */
	server.route( {
		method: 'GET',
		path: '/user/{user?}',
		options: {
			tags: [ 'api', 'user', 'list' ],
			description: 'Server get user',
			notes: 'Server get user',
			auth: false,
			validate: {
				params: {
					user: Joi.string().alphanum().min( 3 ).max( 20 ),
				},
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
			try {
				if ( ! request.params.user ) {
					return {
						user: 'TODO', // TODO: add current user
					};
				}
				return await User.find( { userName: request.params.user } ).exec();
			} catch ( error ) {
				return Boom.badImplementation( 'Error', { error } );
			}
		},
	} );

	/**
	 * Creates a new
	 */
	server.route( {
		method: 'PUT',
		path: '/user',
		options: {
			tags: [ 'api', 'user', 'create' ],
			description: 'Server create user',
			notes: 'Server create user',
			auth: false,
			validate: {
				payload: {
					userName: Joi.string().alphanum().min( 3 ).max( 20 ).required(),
					email: Joi.string().email().required(),
					password: Joi.string().min( 8 ).required(),
				},
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
			try {
				// TODO: Add role
				const user = await User
					.findOne( {
						$or: [
							{ userName: request.payload.username },
							{ email: request.payload.email },
						],
					} )
					.exec();
				if ( user ) {
					return Boom.badData( 'User exists' );
				}
				const password = await bcrypt.hash( request.payload.password, Config.get( '/hash/PASSWORD_HASH' ) );
				const userData = Object.assign( {}, request.payload, { password } );
				const newUser = await User.create( userData );

				return newUser ?
					{
						response: true,
						message: 'User created',
						userId: newUser.id,
					} :
					Boom.boomify( {
						response: false,
						message: 'There was an error during user creation',
					}, { statusCode: 400 } );
			} catch ( error ) {
				return Boom.badImplementation( 'Error', { error } );
			}
		},
	} );
};

module.exports = {
	name: 'api-user',
	dependencies: [],
	register,
};
