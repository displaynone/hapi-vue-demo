import Vue from 'vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

import App from './components/App.vue';

import '@/assets/scss/main.scss';

Vue.use( Buefy );

new Vue( {
	el: '#app',
	components: {
		App,
	},
	render: ( c ) => c( 'app' ),
} );

// accept replacement modules
if ( module.hot ) {
	module.hot.accept();
}
