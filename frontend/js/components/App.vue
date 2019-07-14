<template>
	<header class="hero">
		<div class="hero-head">
			<h1>{{ title }}</h1>
		</div>
	</header>
</template>

<script>
export default {
	data() {
		return {
			title: "Demo site",
		};
	},
};
</script>

<style lang="scss" scoped>
	div {

		h1 {
			color: #fff;
		}
	}
</style>
