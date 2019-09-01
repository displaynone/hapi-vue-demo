<template>
	<div id="account">
		<section class="hero is-primary is-bold">
			<div class="hero-body">
				<div class="has-text-centered">
					<h1 class="title">
						{{ message }}
					</h1>
					<h2 class="subtitle">
						Your data
					</h2>
				</div>
			</div>
		</section>
		<section class="section">
			<div class="container">
				<div class="tile is-ancestor">
					<div class="tile is-parent">
						<p class="tile is-child notification">
							Some content
						</p>
					</div>
					<div class="tile is-8 is-parent">
						<div class="tile is-child notification is-info">
							<ul id="data">
								<li
									v-for="( value, key ) in user"
									:key="key"
								>
									{{ key }} : {{ value }}
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
// Dummy component

import ApiFectch from '@/js/utils/api';
import User from '@/js/utils/user';

export default {
	name: 'Account',
	data() {
		return {
			message: 'Account',
			user: {},
		};
	},
	created() {
		const user = new User().getCurrentUser();
		new ApiFectch().getUser( user.username )
			.then( response => this.user = response );
	},
};
</script>

