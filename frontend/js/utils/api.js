import Config from '@/js/config';
import Storage from '@/js/utils/storage';

const browserLang = navigator.language.split( '-' )[ 0 ];

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
			headers: {
				'Content-Language': browserLang,
			},
			mode: 'cors',
		} ).then( response => {
			const auth = response.headers.get( 'Authorization' );
			if ( auth ) {
				return {
					response: true,
					token: auth,
				};
			}
			return response.json();
		} );
	}

	/**
	 * Gets user data
	 *
	 * @param {string} username Username
	 * @returns {Promise}
	 */
	getUser( username ) {
		return fetch( `${ Config.api.user.get }${ username }`, {
			method: 'GET',
			headers: {
				Authorization: new Storage().getJWTToken(),
				'Content-Language': browserLang,
			},
		} ).then( response => response.json() );
	}

	/**
	 * Register a new user
	 *
	 * @param {string} username User name
	 * @param {string} password Password
	 * @param {string} email Email
	 *
	 * @returns {Promise}
	 */
	register( username, password, email ) {
		return fetch( Config.api.user.register, {
			method: 'POST',
			body: JSON.stringify(
				{ username, password, email }
			),
			headers: {
				'Content-Language': browserLang,
			},
			mode: 'cors',
		} ).then( response => response.json() );
	}

	/**
	 * Activate user
	 *
	 * @param {string} token Token
	 *
	 * @returns {Promise}
	 */
	activate( token ) {
		return fetch( Config.api.user.activate, {
			method: 'POST',
			body: JSON.stringify(
				{ token }
			),
			headers: {
				'Content-Language': browserLang,
			},
			mode: 'cors',
		} ).then( response => response.json() );
	}

	/**
	 * Resend activation email
	 *
	 * @param {string} usernameOrEmail Username or email
	 *
	 * @returns {Promise}
	 */
	resendActivation( usernameOrEmail ) {
		return fetch( Config.api.user.resendActivation, {
			method: 'POST',
			body: JSON.stringify(
				{ usernameOrEmail }
			),
			headers: {
				'Content-Language': browserLang,
			},
			mode: 'cors',
		} ).then( response => response.json() );
	}

	/**
	 * Resend activation email
	 *
	 * @param {string} email Email
	 *
	 * @returns {Promise}
	 */
	resendPassword( email ) {
		return fetch( Config.api.user.resendPassword, {
			method: 'POST',
			body: JSON.stringify(
				{ email }
			),
			headers: {
				'Content-Language': browserLang,
			},
			mode: 'cors',
		} ).then( response => response.json() );
	}

	/**
	 * Reset password
	 *
	 * @param {string} password Password
	 * @param {string} token Token
	 *
	 * @returns {Promise}
	 */
	resetPassword( password, token ) {
		return fetch( Config.api.user.resetPassword, {
			method: 'POST',
			body: JSON.stringify(
				{ password, token }
			),
			headers: {
				'Content-Language': browserLang,
			},
			mode: 'cors',
		} ).then( response => response.json() );
	}
}

export default apiFetch;
