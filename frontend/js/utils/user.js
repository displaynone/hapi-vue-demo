import Storage from '@/js/utils/storage';

/**
 * User methods
 *
 * @since 0.8.0
 */
class user {
	/**
	 * Returns if the user is logged
	 *
	 * @returns {boolean}
	 */
	isLogged() {
		return !! ( new Storage() ).getJWTToken();
	}

	/**
	 * Logs out an user
	 */
	logout() {
		new Storage().removeJWTToken();
	}

	/**
	 * Gets current user data from JWT token
	 *
	 * @returns {Object}
	 */
	getCurrentUser() {
		const token = new Storage().getJWTToken();
		if ( ! token ) {
			return null;
		}
		return JSON.parse(
			atob(
				token.split( '.' )[ 1 ]
			)
		);
	}
}

export default user;
