import Vue from 'vue';
import VueRouter from 'vue-router';
import Buefy from 'buefy';
import Vuelidate from 'vuelidate';

import 'buefy/dist/buefy.css';
import '@/assets/scss/main.scss';
import '@mdi/font/css/materialdesignicons.min.css';
import 'icons/styles.css';

import App from './components/App.vue';
import router from '@/js/plugins/router';
import i18n from '@/js/plugins/i18n';
import store from '@/js/store';
import User from '@/js/utils/user';
import { USER_SET_AVATAR, USER_SET_USERNAME } from './store/mutation-types';

Vue.use( VueRouter );
Vue.use( Buefy );
Vue.use( Vuelidate );

new Vue( {
	el: '#app',
	router,
	i18n,
	store,
	components: {
		App,
	},
	mounted: function() {
		const userData = new User().getCurrentUser();
		const { commit } = this.$store;
		if ( userData ) {
			if ( userData.username ) {
				commit( `user/${ USER_SET_AVATAR }`, new User().getAvatarURL( userData.username ) + '?cache=' + ( new Date() ) );
				commit( `user/${ USER_SET_USERNAME }`, userData.username );
			}
		}
	},
	render: ( c ) => c( 'app' ),
} );

// accept replacement modules
if ( module.hot ) {
	module.hot.accept();
}
