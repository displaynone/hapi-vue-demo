import Vue from 'vue';
import VueRouter from 'vue-router';
import Buefy from 'buefy';

import 'buefy/dist/buefy.css';
import '@/assets/scss/main.scss';
import '@mdi/font/css/materialdesignicons.min.css';
import 'icons/styles.css';

import App from './components/App.vue';
import router from './router';

Vue.use( VueRouter );
Vue.use( Buefy );

new Vue( {
	el: '#app',
	router,
	components: {
		App,
	},
	render: ( c ) => c( 'app' ),
} );

// accept replacement modules
if ( module.hot ) {
	module.hot.accept();
}
