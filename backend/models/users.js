/**
 * User model based on Mongoose
 */
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

// Mongoose schema
const userSchema = new mongoose.Schema( {
	username: String,
	firstName: String,
	lastName: String,
	email: String,
	role: Schema.Types.ObjectId,
	active: Boolean,
	password: String,
	reset: {
		token: String,
		time: Date,
	},
	activation: {
		token: String,
		time: Date,
	},
	uuid: String, // JWT id
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

/**
 * Finds an user by username or email
 *
 * @returns {object}
 */
userSchema.static( 'findByUserOrEmail', async function( username, email ) {
	const result = await new Promise( ( resolve, reject ) => {
		this.model( 'User' )
			.findOne( {
				$or: [
					{ username: username },
					{ email: email },
				],
			} )
			.exec( ( error, data ) => {
				if ( error ) {
					reject( error );
				}
				resolve( data );
			} );
	} );
	return result;
} );

/**
 * Finds user by UUID
 *
 * @returns {object}
 */
userSchema.static( 'findByUUID', async function( uuid ) {
	const result = await new Promise( ( resolve, reject ) => {
		this.model( 'User' )
			.findOne( {
				uuid,
			} )
			.exec( ( error, data ) => {
				if ( error ) {
					reject( error );
				}
				resolve( data );
			} );
	} );
	return result;
} );

/**
 * Finds user by activation token
 *
 * @returns {object}
 */
userSchema.static( 'findByActivationToken', async function( token ) {
	const result = await new Promise( ( resolve, reject ) => {
		this.model( 'User' )
			.findOne( {
				'activation.token': token,
			} )
			.exec( ( error, data ) => {
				if ( error ) {
					reject( error );
				}
				resolve( data );
			} );
	} );
	return result;
} );

/**
 * Finds user by reset token
 */
userSchema.static( 'findByResetToken', async function( token ) {
	const result = await new Promise( ( resolve, reject ) => {
		this.model( 'User' )
			.findOne( {
				'reset.token': token,
			} )
			.exec( ( error, data ) => {
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
