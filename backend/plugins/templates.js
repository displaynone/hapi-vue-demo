/**
 * Handles templates rendering
 *
 * @since 0.10.0
 */

const fs = require( 'fs' );
const path = require( 'path' );
const Handlebars = require( 'handlebars' );

const defaultData = {
	heading: 'Some slogan <span>Interesting</span> and <span>Fun</span>',
};

class Templates {
	/**
	 * Constructor
	 *
	 * @param {object} server Hapi server
	 */
	constructor( server ) {
		server.ext( 'onRequest', ( request, h ) => {
			this.request = request;
			// Add translations to Handlebars
			Handlebars.registerHelper( 'i18n', function( options ) {
				const { __ } = request.i18n;
				return new Handlebars.SafeString( __( options.fn( this ) ) );
			} );
			return h.continue;
		} );
		this.templatePath = __dirname + '/../templates';
	}

	/**
	 * Reads a file content
	 *
	 * @param {String} filePath File path
	 * @returns {String}
	 */
	readFile( filePath ) {
		return fs.readFileSync( this.templatePath + filePath, 'utf8' );
	}

	/**
	 * Sets partial
	 *
	 * @param {String} dirPath Directory path
	 */
	setPartials( dirPath ) {
		const partialsPath = this.templatePath + dirPath + '/partials';
		fs.readdirSync( partialsPath ).forEach( file => {
			const partialSlug = file.replace( /^([^\.]+)\..*$/, '$1' );
			Handlebars.registerPartial( partialSlug, this.readFile( `${ dirPath }/partials/${ file }` ) );
		} );
	}

	/**
	 * Translates data
	 *
	 * @param {Object} data Data
	 * @returns {Object}
	 */
	translate( data ) {
		const { __ } = this.request.i18n;
		Object.keys( data ).forEach( key => data[ key ] = __( data[ key ] ) );
		return data;
	}

	/**
	 * Renders the template
	 *
	 * @param {Object} data Data
	 * @returns {String}
	 */
	render( data ) {
		try {
			if ( ! data.file ) {
				throw new Error( 'Template file missing' );
			}
			this.setPartials( path.dirname( data.file ) );
			const content = this.readFile( data.file );
			const template = Handlebars.compile( content );
			return template( Object.assign( this.translate( defaultData ), data.data ) );
		} catch ( error ) {
			console.log( error ); // eslint-disable-line
		}
		return '';
	}
}

exports.plugin = {
	name: 'templates',
	register: async function( server ) {
		const templates = new Templates( server );

		server.decorate( 'server', 'templates', templates );
		server.decorate( 'request', 'templates', templates );
	},
};
