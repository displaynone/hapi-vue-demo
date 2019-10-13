/**
 * Home route
 */
module.exports = {
	method: 'GET',
	path: '/',
	options: {
		tags: [ 'api', 'home' ],
		description: 'Server home',
		notes: 'Server home',
		auth: false,
	},

	/**
	 * Route handler
	 *
	 * @param {object} request
	 * @param {object} h Hapi object
	 * @returns {object}
	 */
	handler: async( request, h ) => { // eslint-disable-line
		return {};
	},
};
