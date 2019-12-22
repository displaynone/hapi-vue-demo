/**
 * Gets JWT data
 *
 * @param {Object} token Data
 * @returns {Object}
 */
export function getTokenData( token ) {
	if ( ! token ) {
		return null;
	}
	return JSON.parse( atob( token.split( '.' )[ 1 ] ) );
}
