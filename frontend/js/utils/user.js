import Config from '@/js/config';
import Storage from '@/js/utils/storage';
import { getTokenData } from '@/js/utils/jwt';

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
		return getTokenData( token );
	}

	/**
	 * Gets user avatar
	 *
	 * @param {string} username Username
	 * @returns {Promise}
	 */
	getAvatarURL( username ) {
		return `${ Config.api.user.avatar }/${ username }`;
	}
}

export default user;
