/**
 * Object utilities
 *
 * @since 0.8.0
 */
const Objects = {
	/**
	 * Filters an object depending on a function
	 *
	 * @param {Object} obj Object
	 * @param {Function} predicate Filter function
	 * @returns {Object}
	 * @link https://stackoverflow.com/a/37616104/2103269
	 */
	filter: ( obj, predicate ) => Object.assign(
		...Object.keys( obj )
			.filter( key => predicate( key, obj[ key ] ) )
			.map( key => ( { [ key ]: obj[ key ] } ) ) ),
};

module.exports = Objects;
