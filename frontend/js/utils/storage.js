import Config from '@/js/config';

/**
 * API methods for sesion/local storage.
 * Depending on `this.session` it saves only on `sessionStorage` or also in `localStorage`
 *
 * @since v0.8.0
 */
class storage {
	/**
	 * Constructor
	 *
	 * @param {boolean} session If stored only in session
	 */
	constructor( session = false ) {
		this.session = session;
	}

	/**
	 * It saves the token in the session (and local storage is this.session === false),
	 *
	 * @param {strig} token JWT token
	 */
	setJWTToken( token ) {
		sessionStorage.setItem( Config.jwt.storageKey, token );
		if ( ! this.session ) {
			localStorage.setItem( Config.jwt.storageKey, token );
		}
	}

	/**
	 * It gets a value from session storage or in local if session = false
	 *
	 * @returns {string}
	 */
	getJWTToken() {
		const sessionValue = sessionStorage.getItem( Config.jwt.storageKey );
		if ( sessionValue ) {
			return sessionValue;
		}
		if ( ! this.session ) {
			const storedValue = localStorage.getItem( Config.jwt.storageKey );
			return storedValue;
		}
		return null;
	}

	/**
	 * Removes JWT token from session and local storage
	 */
	removeJWTToken() {
		sessionStorage.removeItem( Config.jwt.storageKey );
		localStorage.removeItem( Config.jwt.storageKey );
	}
}

export default storage;
