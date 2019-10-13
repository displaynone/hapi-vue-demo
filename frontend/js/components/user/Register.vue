<template>
	<section class="section">
		<div class="container">
			<h1 class="title">
				{{ $t( 'page.register.title' ) }}
			</h1>
		</div>
		<div class="container">
			<div class="columns is-centered">
				<div
					v-if="registered"
					class="column has-background-light"
				>
					<p class="notification">
						{{ $t( 'page.register.confirmation' ) }}
					</p>
				</div>
				<div
					v-if="! registered"
					class="column is-5-tablet is-4-desktop is-3-widescreen has-background-light login-form"
				>
					<b-field
						:label="$t( 'page.register.username' )"
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
						:label="$t( 'page.register.password' )"
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
					<b-field
						:label="$t( 'page.register.repeatPassword' )"
						:type="{ 'is-danger': !! errors.repeatPassword }"
						:message="errors.repeatPassword"
					>
						<b-input
							v-model="repeatPassword"
							value=""
							type="password"
							icon="lock-outline"
							@keyup.native.enter="submit"
							@input="validate( 'repeatPassword' )"
						/>
					</b-field>
					<b-field
						:label="$t( 'page.register.email' )"
						:type="{ 'is-danger': !! errors.email }"
						:message="errors.email"
					>
						<b-input
							v-model="email"
							value=""
							icon="email-outline"
							native-type="email"
							@keyup.native.enter="submit"
							@input="validate( 'email' )"
						/>
					</b-field>
					<div class="has-text-right">
						<b-button
							type="is-primary"
							@click="submit"
						>
							{{ $t( 'page.register.register' ) }}
						</b-button>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import { required, minLength, sameAs, email } from 'vuelidate/lib/validators';

import ApiFectch from '@/js/utils/api';
import { error } from '@/js/utils/notifications';
import formValidation from '@/js/utils/formValidation';

export default {
	name: 'Register',
	// Form data and error messages if login fails
	data() {
		return {
			username: '',
			password: '',
			repeatPassword: '',
			email: '',
			errors: {},
			registered: false,
		};
	},
	validations: {
		username: {
			required,
			minLength: minLength( 4 ),
		},
		password: {
			required,
			minLength: minLength( 8 ),
		},
		repeatPassword: {
			sameAsPassword: sameAs( 'password' ),
		},
		email: {
			email,
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
		// Registers the user
		submit: function() {
			if ( ! this.$v.$invalid ) {
				const api = new ApiFectch();
				api.register( this.username, this.password, this.email )
					.then( response => {
						if ( response.error ) {
							error( response.message );
						} else {
							this.registered = true;
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
	.login-form {
		border-radius: 4px;
	}
</style>
