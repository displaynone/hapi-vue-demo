<template>
	<section class="section">
		<div class="container">
			<h1 class="title">
				{{ $t( 'page.reset.title' ) }}
			</h1>
		</div>
		<div class="container">
			<div
				v-if="reset"
				class="column"
			>
				<p class="notification is-success">
					{{ $t( 'page.reset.confirmation' ) }}
				</p>
			</div>
			<div class="columns is-centered">
				<div
					class="column is-5-tablet is-4-desktop is-3-widescreen"
				>
					<div class="has-background-light form">
						<b-field
							:label="$t( 'page.reset.password' )"
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
							:label="$t( 'page.reset.repeatPassword' )"
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
						<div class="has-text-right">
							<b-button
								type="is-primary"
								@click="submit"
							>
								{{ $t( 'page.reset.reset' ) }}
							</b-button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import { required, sameAs, minLength } from 'vuelidate/lib/validators';

import { error } from '@/js/utils/notifications';
import ApiFectch from '@/js/utils/api';
import formValidation from '@/js/utils/formValidation';

export default {
	name: 'ResetPassword',
	// Form data
	data() {
		return {
			password: '',
			repeatPassword: '',
			reset: false,
			errors: {},
		};
	},
	validations: {
		password: {
			required,
			minLength: minLength( 8 ),
		},
		repeatPassword: {
			sameAsPassword: sameAs( 'password' ),
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
		// Resets password.
		submit: function() {
			if ( ! this.$v.$invalid ) {
				const api = new ApiFectch();
				this.reset = false;
				api.resetPassword( this.password, this.$route.params.token )
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
