import i18n from '@/js/plugins/i18n';

/**
 * Validates input data. If any error is found it adds it to `errors`
 *
 * @param {String} input Input name
 * @param {Object} $v Vue validation object
 * @returns {Object}
 */
export default function( input, $v ) {
	const errors = {};
	const params = input ? [ input ] : Object.keys( $v.$params );
	params.forEach( param => {
		if ( $v[ param ].$invalid ) {
			errors[ param ] = i18n.t( `errors.${ param }` );
		} else {
			delete errors[ param ];
		}
	} );
	return errors;
}
