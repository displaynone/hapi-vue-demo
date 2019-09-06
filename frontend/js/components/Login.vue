<template>
	<section class="section">
		<div class="container">
			<h1 class="title">
				{{ $t( 'page.login.title' ) }}
			</h1>
			<div
				v-if="error"
				class="columns is-centered has-margin-bottom-2"
			>
				<b-notification
					class="column is-7-tablet is-6-desktop is-5-widescreen"
					type="is-danger"
					has-icon
					:aria-close-label="$t( 'common.notification.close' )"
					role="alert"
					size="is-small	"
				>
					{{ error }}
				</b-notification>
			</div>
		</div>
		<div class="container">
			<div class="columns is-centered">
				<div class="column is-5-tablet is-4-desktop is-3-widescreen has-background-light login-form">
					<b-field :label="$t( 'page.login.username' )">
						<b-input
							v-model="username"
							value=""
							maxlength="30"
							icon="account-circle-outline"
						/>
					</b-field>
					<b-field :label="$t( 'page.login.password' )">
						<b-input
							v-model="password"
							value=""
							type="password"
							icon="lock-outline"
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
			</div>
		</div>
	</section>
</template>

<script>
import ApiFectch from '@/js/utils/api';
import Storage from '@/js/utils/storage';

export default {
	name: 'Login',
	// Form data and error messages if login fails
	data() {
		return {
			username: '',
			password: '',
			remember: false,
			error: '',
		};
	},
	methods: {
		// It logs in, using the backend API for authenticate the user data.
		// If user logs in, it saves the JWT token in the browser. If not, shows error message.
		submit: function() {
			const api = new ApiFectch();
			api.auth( this.username, this.password )
				.then( response => {
					const storage = new Storage( ! this.remember );
					if ( !! response.response && !! response.token ) {
						storage.setJWTToken( response.token );
						this.error = false;
						// `go` refreshes the page, so user data is updated
						this.$router.go( '/' );
					} else {
						storage.removeJWTToken();
						this.error = response.message;
					}
				} );
		},
	},
};
</script>

<style lang="scss" scoped>
	.login-form {
		border-radius: 4px;
	}
</style>
