<template>
	<div id="activate">
		<section class="hero is-primary is-bold">
			<div class="hero-body">
				<div class="has-text-centered">
					<h1 class="title">
						{{ $t( 'page.activate.title' ) }}
					</h1>
				</div>
			</div>
		</section>
		<section class="section">
			<div class="container">
				<div class="tile is-ancestor">
					<div class="tile is-parent">
						<p
							v-if="loading"
							class="tile is-child notification"
						>
							{{ $t( 'page.activate.loading' ) }}
						</p>
						<p
							v-if="! error && ! loading"
							class="tile is-child notification is-success"
						>
							{{ message }}
						</p>
						<p
							v-if="error && ! loading"
							class="tile is-child notification is-danger"
						>
							{{ message }}
						</p>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import ApiFectch from '@/js/utils/api';

export default {
	name: 'Activate',
	data() {
		return {
			error: false,
			message: '',
			loading: true,
		};
	},
	/**
	 * Gets the token and activate the user
	 */
	created() {
		new ApiFectch()
			.activate( this.$route.params.token )
			.then( result => {
				this.loading = false;
				this.error = !! result.error;
				this.message = result.message;
			} );
	},
};
</script>

