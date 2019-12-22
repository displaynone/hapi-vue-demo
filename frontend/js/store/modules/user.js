import { USER_SET_AVATAR, USER_SET_USERNAME } from '../mutation-types';

const state = {
	avatar: null,
	username: null,
};

const mutations = {
	/**
	 * Sets avatar
	 *
	 * @param {Object} mutationState Vuex state.
	 * @param {String} avatar Avatar string.
	 */
	[ USER_SET_AVATAR ]( mutationState, avatar ) {
		mutationState.avatar = avatar;
	},

	/**
	 * Sets username
	 *
	 * @param {Object} mutationState Vuex state.
	 * @param {String} username User name.
	 */
	[ USER_SET_USERNAME ]( mutationState, username ) {
		mutationState.username = username;
	},
};

export default {
	namespaced: true,
	state,
	mutations,
};
