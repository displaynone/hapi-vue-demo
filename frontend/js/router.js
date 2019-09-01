import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/js/components/Home';
import Login from '@/js/components/Login';
import Account from '@/js/components/Account';
import Logout from '@/js/components/Logout';
import Storage from '@/js/utils/storage';

Vue.use( Router );

const router = new Router( {
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home,
		},
		{
			path: '/login',
			name: 'Login',
			component: Login,
			meta: {
				auth: false,
			},
		},
		{
			path: '/account',
			name: 'Account',
			component: Account,
			meta: {
				auth: true,
			},
		},
		{
			path: '/logout',
			name: 'Logout',
			component: Logout,
			meta: {
				auth: true,
			},
		},
	],
} );

router.beforeEach( ( to, from, next ) => {
	if ( !! to.meta ) {
		const storage = new Storage();
		const jwtToken = storage.getJWTToken();
		// Can't be logged
		if ( to.meta.auth === false ) {
			if ( jwtToken ) {
				next( '/' );
			}
		// Must be logged
		} else if ( to.meta.auth === true ) {
			if ( ! jwtToken ) {
				next( '/' );
			}
		}
		next();
	} else {
		next();
	}
} );

export default router;
