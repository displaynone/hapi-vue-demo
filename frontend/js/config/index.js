const apiURL = process.env.API_URL;

/**
 * Vue config data
 */
const config = {
	api: {
		url: apiURL,
		user: {
			auth: `${ apiURL }user/auth`,
			get: `${ apiURL }user/`,
			register: `${ apiURL }user/register`,
			activate: `${ apiURL }user/activate`,
			resendActivation: `${ apiURL }user/resend-activation`,
			resendPassword: `${ apiURL }user/resend-password`,
			resetPassword: `${ apiURL }user/reset-password`,
			avatar: `${ apiURL }user/avatar`,
			updateAvatar: `${ apiURL }user/avatar/update`,
		},
	},
	jwt: {
		storageKey: 'JWT',
	},
	i18n: {
		defaultLanguage: 'en',
		fallbackLanguage: 'en',
		supportedLanguages: [
			'en',
			'es',
		],
	},
};

export default config;
