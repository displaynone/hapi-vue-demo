<template>
	<section class="hero is-medium is-primary is-bold">
		<div class="hero-body">
			<div class="container has-text-centered">
				<h1 class="title">
					{{ message }}
				</h1>
				<h2 class="subtitle">
					Subtitle
				</h2>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'Home',
	data() {
		return {
			message: 'Home page',
		};
	},
};
</script>

<style lang="scss" scoped>
	.home {
		padding: 2em;
	}
</style>
