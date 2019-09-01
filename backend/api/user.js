/**
 * User route
 */
const User = require( '../models/users' );
const Boom = require( '@hapi/boom' );
const Joi = require( '@hapi/joi' );
const bcrypt = require( 'bcrypt' );
const JWT = require( 'jsonwebtoken' );
const Config = require( '../config' );
const uuid = require( 'uuid/v1' );
const Objects = require( '../utils/objects' );

const register = function( server, serverOptions ) { // eslint-disable-line
	/**
	 * Route `/user`
	 *
	 * Returns a user data
	 */
	server.route( {
		method: 'GET',
		path: '/user/{user?}',
		options: {
			tags: [ 'api', 'user', 'list' ],
			description: 'Server get user',
			notes: 'Server get user',
			auth: 'jwt',
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
				const userData = await User.findOne( { username: request.params.user } ).exec();
				return Objects.filter( userData.toJSON(), ( key ) => {
					return [ 'username', 'email' ].includes( key );
				} );
			} catch ( error ) {
				return Boom.badImplementation( 'Error', { error } );
			}
		},
	} );

	/**
	 * Creates a new user
	 */
	server.route( {
		method: 'PUT',
		path: '/user',
		options: {
			tags: [ 'api', 'user', 'create' ],
			description: 'Server create user',
			notes: 'Server create user',
			auth: 'jwt',
			validate: {
				payload: {
					username: Joi.string().alphanum().min( 3 ).max( 20 ).required(),
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
							{ username: request.payload.username },
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

	/**
	 * Authenticates an user
	 */
	server.route( {
		method: 'POST',
		path: '/user/auth',
		options: {
			tags: [ 'api', 'user', 'auth' ],
			description: 'Server authenticate user',
			notes: 'Server authenticate user',
			auth: false,
			validate: {
				payload: {
					username: Joi.string().alphanum().min( 3 ).max( 20 ).required(),
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
				const user = await User.findByUserOrEmail( request.payload.username, request.payload.email );
				if ( ! user ) {
					return Boom.badData( 'User or password incorrect' );
				}
				const isValidPassword = await bcrypt.compare( request.payload.password, user.password );
				if ( ! isValidPassword ) {
					return Boom.badData( 'User or password incorrect' );
				}

				const claims = {
					id: uuid(),
					exp: new Date().getTime() + ( 180 * 24 * 60 * 60 * 1000 ), // 3 months
					username: user.username,
				};

				user.uuid = claims.id;
				user.save();

				const token = JWT.sign( claims, Config.get( '/auth' ).jwt.secret ); // synchronous

				return h.response( {
					response: true,
					message: 'Check Auth Header for your Token',
				} ).header( 'Authorization', token );
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
