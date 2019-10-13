<template>
	<section class="section">
		<div class="container">
			<h1 class="title">
				{{ $t( 'page.resend.title' ) }}
			</h1>
		</div>
		<div class="container">
			<div class="columns is-centered">
				<div class="column is-8-tablet is-6-desktop is-6-widescreen">
					<div class="has-background-light form">
						<b-field
							:label="$t( 'page.resend.username_or_email' )"
							:type="{ 'is-danger': !! errors.usernameOrEmail }"
							:message="errors.usernameOrEmail"
						>
							<b-input
								v-model="usernameOrEmail"
								value=""
								@keyup.native.enter="submit"
								@input="validate( 'usernameOrEmail' )"
							/>
						</b-field>
						<div class="has-text-right">
							<b-button
								type="is-primary"
								@click="submit"
							>
								{{ $t( 'page.resend.resend' ) }}
							</b-button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import { required } from 'vuelidate/lib/validators';

import ApiFectch from '@/js/utils/api';
import formValidation from '@/js/utils/formValidation';
import { success } from '@/js/utils/notifications';
import i18n from '@/js/plugins/i18n';

export default {
	name: 'ResendActivation',
	// Form data
	data() {
		return {
			usernameOrEmail: '',
			errors: {},
		};
	},
	validations: {
		usernameOrEmail: {
			required,
		},
	},
	methods: {
		/**
		 * Validates input data. If any error is found it adds it to `errors`
		 *
		 * @param {String} input Input name
		 */
		validate: function( input ) {
			this.errors = formValidation( input, this.$v );
		},
		// Sends activation email.
		submit: function() {
			if ( ! this.$v.$invalid ) {
				const api = new ApiFectch();
				api.resendActivation( this.usernameOrEmail )
					.then( () => {
						success( i18n.t( 'page.resend.success' ) );
					} );
			} else {
				this.validate();
			}
		},
	},
};
</script>

<style lang="scss" scoped>
	.form {
		border-radius: 4px;
		padding: 0.75rem;
	}
</style>
