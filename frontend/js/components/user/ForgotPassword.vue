<template>
	<section class="section">
		<div class="container">
			<h1 class="title">
				{{ $t( 'page.forgot.title' ) }}
			</h1>
		</div>
		<div class="container">
			<div
				v-if="reset"
				class="column"
			>
				<p class="notification is-success">
					{{ $t( 'page.forgot.confirmation' ) }}
				</p>
			</div>
			<div class="columns is-centered">
				<div
					class="column is-5-tablet is-4-desktop is-3-widescreen"
				>
					<div class="has-background-light form">
						<b-field
							:label="$t( 'page.forgot.email' )"
							:type="{ 'is-danger': !! errors.email }"
							:message="errors.email"
						>
							<b-input
								v-model="email"
								value=""
								icon="email-outline"
								@keyup.native.enter="submit"
								@input="validate( 'email' )"
							/>
						</b-field>
						<div class="has-text-right">
							<b-button
								type="is-primary"
								@click="submit"
							>
								{{ $t( 'page.forgot.forgot' ) }}
							</b-button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';

import { error } from '@/js/utils/notifications';
import ApiFectch from '@/js/utils/api';
import formValidation from '@/js/utils/formValidation';

export default {
	name: 'ForgotPassword',
	// Form data
	data() {
		return {
			email: '',
			reset: false,
			errors: {},
		};
	},
	validations: {
		email: {
			email,
			required,
		},
	},
	methods: {
		validate: function( input ) {
			this.errors = formValidation( input, this.$v );
		},
		// Sends a reset password email.
		submit: function() {
			if ( ! this.$v.$invalid ) {
				const api = new ApiFectch();
				this.reset = false;
				api.resendPassword( this.email )
					.then( response => {
						if ( !! response.response ) {
							this.reset = true;
						} else {
							error( response.message );
						}
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
