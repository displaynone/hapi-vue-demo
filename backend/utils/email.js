/**
 * Email utilities
 *
 * @since 0.10.0
 */
const nodemailer = require( 'nodemailer' );
const Config = require( '../config' );

/**
 * Email class
 *
 * @since 0.10.0
 */
class Email {
	/**
	 * Constructor singleton
	 *
	 * @returns {Object}
	 */
	constructor() {
		if ( !! Email.instance ) {
			return Email.instance;
		}

		Email.instance = this;

		this.transport = nodemailer.createTransport( Config.get( '/email/smtp' ) );

		return this;
	}

	send( dataEmail ) {
		return this.transport.sendMail( {
			from: Config.get( '/email/from' ),
			... dataEmail,
		} );
	}
}

module.exports = Email;
