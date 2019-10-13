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

Vue.use( VueRouter );
Vue.use( Buefy );
Vue.use( Vuelidate );

new Vue( {
	el: '#app',
	router,
	i18n,
	components: {
		App,
	},
	render: ( c ) => c( 'app' ),
} );

// accept replacement modules
if ( module.hot ) {
	module.hot.accept();
}
