<template>
	<section class="section">
		<div class="container">
			<h1 class="title">
				Login
			</h1>
			<div class="columns is-centered">
				<div class="column is-5-tablet is-4-desktop is-3-widescreen has-background-light login-form">
					<b-field label="Username">
						<b-input
							value=""
							maxlength="30"
							icon="account-circle-outline"
						/>
					</b-field>
					<b-field label="Password">
						<b-input
							value=""
							type="password"
							icon="lock-outline"
						/>
					</b-field>
					<div class="field">
						<b-checkbox>Remember me</b-checkbox>
					</div>
					<div class="has-text-right">
						<b-button type="is-primary">
							Log in
						</b-button>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'Login',
};
</script>

<style lang="scss" scoped>
	.login-form {
		border-radius: 4px;
	}
</style>
