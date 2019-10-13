import { NotificationProgrammatic as Notification } from 'buefy';
import i18n from '@/js/plugins/i18n';

/**
 * Displays an error message
 *
 * @param {String} message Error message
 */
export function error( message ) {
	Notification.open( {
		type: 'is-danger',
		hasIcon: true,
		ariaCloseLabel: i18n.t( 'common.notification.close' ),
		role: 'alert',
		size: 'is-small',
		closable: false,
		autoClose: true,
		duration: 5000,
		position: 'is-top-right',
		message,
	} );
}

/**
 * Displays an success message
 *
 * @param {String} message Success message
 */
export function success( message ) {
	Notification.open( {
		type: 'is-success',
		hasIcon: true,
		ariaCloseLabel: i18n.t( 'common.notification.close' ),
		role: 'alert',
		size: 'is-small',
		closable: false,
		autoClose: true,
		duration: 5000,
		position: 'is-top-right',
		message,
	} );
}
