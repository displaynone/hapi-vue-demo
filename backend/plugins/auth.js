/**
 * Auth controller
 *
 * It uses JWT
 */
const jwt2 = require( 'hapi-auth-jwt2' );
const User = require( '../models/users' );

const validate = async function( decoded, request ) {
	const { settings } = request.route;
	if ( !! settings &&
		!! settings.app &&
		!! settings.app.roles &&
		! settings.app.roles.includes( decoded.role )
	) {
		return { isValid: false };
	}
	const user = await User.findByUUID( decoded.id );
	return { isValid: !! user && user.username === decoded.username };
};

exports.plugin = {
	name: 'auth',
	register: async function( server, options ) {
		await server.register( jwt2 );

		server.auth.strategy( 'jwt', 'jwt',
			{
				key: options.jwt.secret,
				validate: validate,
				verifyOptions: { algorithms: [ 'HS256' ] }, // pick a strong algorithm
			}
		);

		server.auth.default( 'jwt' );
	},
};
