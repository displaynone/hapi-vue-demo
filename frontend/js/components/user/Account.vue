<template>
	<div id="account">
		<section class="hero is-primary is-bold">
			<div class="hero-body">
				<div class="has-text-centered">
					<h1 class="title">
						{{ $t( 'page.account.title' ) }}
					</h1>
					<h2 class="subtitle">
						{{ $t( 'page.account.subtitle' ) }}
					</h2>
				</div>
			</div>
		</section>
		<section class="section">
			<div class="container">
				<div class="tile is-ancestor">
					<div class="tile is-parent">
						<p class="tile is-child notification">
							{{ $t( 'page.account.tile_title' ) }}
						</p>
					</div>
					<div class="is-2 avatar">
						<figure class="image is-128x128 has-background-grey-lighter">
							<img :src="avatar">
						</figure>
						<b-button
							size="is-small"
							icon-left="lead-pencil"
							class="avatar_editor"
							@click="editAvatar()"
						>
							{{ $t( 'page.account.edit' ) }}
						</b-button>
					</div>
					<div class="tile is-8 is-parent">
						<div class="tile is-child notification is-info">
							<ul id="data">
								<li
									v-for="( value, key ) in user"
									:key="key"
								>
									{{ $t( `page.account.field.${ key }` ) }} : {{ value }}
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<style lang="scss" scoped>
	.avatar {
		position: relative;

		&_editor {
			position: absolute;
			top: 0;
			right: 0;
		}
	}
</style>

<script>
import ApiFectch from '@/js/utils/api';
import User from '@/js/utils/user';

const user = new User();
const userData = user.getCurrentUser();

export default {
	name: 'Account',
	data() {
		return {
			user: {},
			avatar: user.getAvatarURL( userData.username ),
		};
	},
	/**
	 * Retrieve user data
	 */
	created() {
		new ApiFectch().getUser( userData.username )
			.then( response => this.user = response );
	},
	methods: {
		editAvatar: function() {
			this.$router.push( { name: 'Avatar' } );
		},
	},
};
</script>

