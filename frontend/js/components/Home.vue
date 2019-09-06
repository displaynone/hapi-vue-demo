<template>
	<section class="hero is-medium is-primary is-bold">
		<div class="hero-body">
			<div class="container has-text-centered">
				<h1 class="title">
					{{ $t( 'page.home.title' ) }}
				</h1>
				<h2 class="subtitle">
					{{ $t( 'page.home.subtitle' ) }}
				</h2>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'Home',
};
</script>

<style lang="scss" scoped>
	.home {
		padding: 2em;
	}
</style>
