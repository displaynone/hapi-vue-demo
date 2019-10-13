<template>
	<section class="section">
		<div class="container">
			<h1 class="title">
				{{ $t( 'page.login.title' ) }}
			</h1>
		</div>
		<div class="container">
			<div class="columns is-centered">
				<div class="column is-5-tablet is-4-desktop is-3-widescreen">
					<div class="has-background-light login-form">
						<b-field
							:label="$t( 'page.login.username' )"
							:type="{ 'is-danger': !! errors.username }"
							:message="errors.username"
						>
							<b-input
								v-model="username"
								value=""
								maxlength="30"
								icon="account-circle-outline"
								@keyup.native.enter="submit"
								@input="validate( 'username' )"
							/>
						</b-field>
						<b-field
							:label="$t( 'page.login.password' )"
							:type="{ 'is-danger': !! errors.password }"
							:message="errors.password"
						>
							<b-input
								v-model="password"
								value=""
								type="password"
								icon="lock-outline"
								@keyup.native.enter="submit"
								@input="validate( 'password' )"
							/>
						</b-field>
						<div class="field">
							<b-checkbox v-model="remember">
								{{ $t( 'page.login.remember' ) }}
							</b-checkbox>
						</div>
						<div class="has-text-right">
							<b-button
								type="is-primary"
								@click="submit"
							>
								{{ $t( 'page.login.login' ) }}
							</b-button>
						</div>
					</div>
					<div class="has-text-right">
						<button
							class="button is-text is-small has-margin-top-1"
							@click="redirect"
						>
							{{ $t( 'page.login.forgot' ) }}
						</button>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import { required } from 'vuelidate/lib/validators';

import { error } from '@/js/utils/notifications';
import ApiFectch from '@/js/utils/api';
import Storage from '@/js/utils/storage';
import formValidation from '@/js/utils/formValidation';

export default {
	name: 'Login',
	// Form data and error messages if login fails
	data() {
		return {
			username: '',
			password: '',
			remember: true,
			errors: {},
		};
	},
	validations: {
		username: {
			required,
		},
		password: {
			required,
		},
	},
	methods: {
		/**
		 * Validates form
		 *
		 * @param {String} input Input name
		 */
		validate: function( input ) {
			this.errors = formValidation( input, this.$v );
		},
		// It logs in, using the backend API for authenticate the user data.
		// If user logs in, it saves the JWT token in the browser. If not, shows error message.
		submit: function() {
			if ( ! this.$v.$invalid ) {
				const api = new ApiFectch();
				api.auth( this.username, this.password )
					.then( response => {
						if ( response.statusCode === 401 ) {
							this.$router.push( 'resend-activation' );
						}
						const storage = new Storage( ! this.remember );
						if ( !! response.response && !! response.token ) {
							storage.setJWTToken( response.token );
							// `go` refreshes the page, so user data is updated
							this.$router.go( '/' );
						} else {
							storage.removeJWTToken();
							error( response.message );
						}
					} );
			} else {
				this.validate();
			}
		},
		// Redirects to another page
		redirect: function() {
			this.$router.push( 'forgot-password' );
		},
	},
};
</script>

<style lang="scss" scoped>
	.login-form {
		border-radius: 4px;
		padding: 0.75rem;
	}
</style>
