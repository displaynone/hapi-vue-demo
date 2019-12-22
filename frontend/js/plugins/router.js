import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/js/components/Home';
import Login from '@/js/components/user/Login';
import Account from '@/js/components/user/Account';
import Avatar from '@/js/components/user/Avatar';
import Logout from '@/js/components/user/Logout';
import Register from '@/js/components/user/Register';
import Activate from '@/js/components/user/Activate';
import ForgotPassword from '@/js/components/user/ForgotPassword';
import ResendActivation from '@/js/components/user/ResendActivation';
import ResetPassword from '@/js/components/user/ResetPassword';
import Storage from '@/js/utils/storage';
import { getTokenData } from '@/js/utils/jwt';

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
				roles: [ 'client', 'admin' ],
			},
		},
		{
			path: '/account/avatar',
			name: 'Avatar',
			component: Avatar,
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
		{
			path: '/register',
			name: 'Register',
			component: Register,
			meta: {
				auth: false,
			},
		},
		{
			path: '/activate/:token',
			name: 'Activate',
			component: Activate,
			meta: {
				auth: false,
			},
		},
		{
			path: '/forgot-password',
			name: 'ForgotPassword',
			component: ForgotPassword,
			meta: {
				auth: false,
			},
		},
		{
			path: '/resend-activation',
			name: 'ResendActivation',
			component: ResendActivation,
			meta: {
				auth: false,
			},
		},
		{
			path: '/reset-password/:token',
			name: 'ResetPassword',
			component: ResetPassword,
			meta: {
				auth: false,
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
			const userData = getTokenData( jwtToken );
			if ( !! to.meta.roles && ! to.meta.roles.includes( userData.role ) ) {
				next( '/' );
			}
		}
		next();
	} else {
		next();
	}
} );

export default router;
