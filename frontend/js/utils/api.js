import Config from '@/js/config';
import Storage from '@/js/utils/storage';

/**
 * API backend methods
 *
 * @since 0.8.0
 */
class apiFetch {
	/**
	 * Authenticate an user, if ok, JWT token is sent by the server in Authorization header
	 *
	 * @param {string} username User name
	 * @param {string} password Password
	 *
	 * @returns {Promise}
	 */
	auth( username, password ) {
		return fetch( Config.api.user.auth, {
			method: 'POST',
			body: JSON.stringify(
				{ username, password }
			),
			mode: 'cors',
		} ).then( response => {
			const auth = response.headers.get( 'Authorization' );
			if ( auth ) {
				return {
					response: true,
					token: auth,
				};
			}
			return {
				response: false,
				message: 'Username or password not valid',
			};
		} );
	}

	getUser( username ) {
		return fetch( `${ Config.api.user.get }${ username }`, {
			method: 'GET',
			headers: {
				Authorization: new Storage().getJWTToken(),
			},
		} ).then( response => response.json() );
	}
}

export default apiFetch;
