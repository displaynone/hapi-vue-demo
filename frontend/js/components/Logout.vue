<template>
	<section class="hero is-medium is-primary is-bold">
		<div class="hero-body">
			<div class="container has-text-centered">
				<h1 class="title">
					{{ message }}
				</h1>
				<h2 class="subtitle">
					Miss you 💛
				</h2>
			</div>
		</div>
	</section>
</template>

<script>
import User from '@/js/utils/user';

export default {
	name: 'Logout',
	// Dummy data
	data() {
		return {
			message: 'Bye',
		};
	},
	// After being created it logs out and go to home
	created() {
		new User().logout();
		// `go` instead of `push` because refreshing the page updates the user data
		// Maybe using vuex is a better way to do it, or not...
		this.$router.go( '/' );
	},
};
</script>

