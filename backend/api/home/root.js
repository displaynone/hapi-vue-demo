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
	 * @returns {object}
	 */
	handler: async() => {
		return {};
	},
};
