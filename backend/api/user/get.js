/**
 * Route `/user`
 *
 * Returns a user data
 */
const Boom = require( '@hapi/boom' );
const Joi = require( '@hapi/joi' );
const User = require( '../../models/users' );
const Objects = require( '../../utils/objects' );

module.exports = {
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
};
