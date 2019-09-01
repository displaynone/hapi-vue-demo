<template>
	<header>
		<nav
			class="navbar"
			role="navigation"
			aria-label="main navigation"
		>
			<div class="navbar-brand">
				<a
					class="navbar-item"
					href="https://sentidoweb.com"
				>
					<img src="/assets/images/logo.svg">
				</a>

				<a
					role="button"
					class="navbar-burger burger"
					aria-label="menu"
					aria-expanded="false"
					:class="{ 'is-active' : showNav }"
					@click="showNav = !showNav"
				>
					<span aria-hidden="true" />
					<span aria-hidden="true" />
					<span aria-hidden="true" />
				</a>
			</div>

			<div :class="[ { 'is-active' : showNav }, 'navbar-menu' ]">
				<div class="navbar-start">
					<router-link
						class="navbar-item"
						to="/"
					>
						Home
					</router-link>
				</div>

				<div class="navbar-end">
					<div
						v-if="!isLogged"
						class="navbar-item"
					>
						<div
							class="buttons"
						>
							<router-link
								class="button is-light"
								to="/login"
							>
								Log in
							</router-link>
						</div>
					</div>
					<div
						v-if="isLogged"
						class="navbar-item has-dropdown is-hoverable"
					>
						<router-link
							to="/account"
							class="navbar-link"
						>
							<b-icon
								icon="account"
							/>
						</router-link>
						<div class="navbar-dropdown is-right">
							<router-link
								class="navbar-item"
								to="/logout"
							>
								Log out
							</router-link>
						</div>
					</div>
				</div>
			</div>
		</nav>
	</header>
</template>

<script>
import User from '@/js/utils/user';
const isLogged = new User().isLogged();

export default {
	data() {
		return {
			showNav: false,
			isLogged,
		};
	},
};
</script>
