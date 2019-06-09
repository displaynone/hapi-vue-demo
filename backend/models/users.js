/**
 * User model based on Mongoose
 */
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

// Mongoose schema
const userSchema = new mongoose.Schema( {
	userName: String,
	firstName: String,
	lastName: String,
	email: String,
	role: Schema.Types.ObjectId,
	isEnabled: Boolean,
	password: String,
	resetPassword: {
		hash: String,
		active: Boolean,
	},
} );

/**
 * User static model findAll
 *
 * @returns {array}
 */
userSchema.static( 'findAll', async function() {
	const result = await new Promise( ( resolve, reject ) => {
		this.model( 'User' ).find( {} ).exec( ( error, data ) => {
			if ( error ) {
				reject( error );
			}
			resolve( data );
		} );
	} );
	return result;
} );

const User = mongoose.model( 'User', userSchema );

module.exports = User;
