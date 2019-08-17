import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/js/components/Home';
import Login from '@/js/components/Login';

Vue.use( Router );

export default new Router( {
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
		},
	],
} );
