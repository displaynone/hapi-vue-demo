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
		},
	},
	jwt: {
		storageKey: 'JWT',
	},
};

export default config;
