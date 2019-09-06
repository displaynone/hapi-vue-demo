import VueI18n from 'vue-i18n';
import Vue from 'vue';
import Config from '@/js/config';
import en from '@/lang/en.json';

Vue.use( VueI18n );

const browserLang = navigator.language.split( '-' )[ 0 ];

const i18n = new VueI18n( {
	locale: browserLang || Config.i18n.defaultLanguage,
	fallbackLocale: Config.i18n.fallbackLanguage,
	messages: { en },
} );

import( `@/lang/${ browserLang }.json` ).then( messages => {
	i18n.setLocaleMessage( browserLang, messages.default );
} );

export default i18n;
