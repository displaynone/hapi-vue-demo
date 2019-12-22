<template>
	<div id="account">
		<section class="hero is-primary is-bold">
			<div class="hero-body">
				<div class="has-text-centered">
					<h1 class="title">
						{{ $t( 'page.avatar.title' ) }}
					</h1>
					<h2 class="subtitle">
						{{ $t( 'page.avatar.subtitle' ) }}
					</h2>
				</div>
			</div>
		</section>
		<section class="section">
			<div class="container">
				<div class="tile is-ancestor">
					<div class="tile is-parent is-3 avatar">
						<figure class="image is-square has-background-grey-lighter">
							<img :src="avatar">
						</figure>
					</div>
					<div class="tile is-9 is-parent">
						<b-upload
							v-if="!imageUrl"
							v-model="dropFiles"
							multiple
							drag-drop
							class="tile is-12"
							@input="onDrop"
						>
							<section class="section">
								<div class="content has-text-centered">
									<p>
										<b-icon
											icon="upload"
											size="is-large"
										/>
									</p>
									<p>{{ $t( 'page.avatar.drop.message' ) }}</p>
								</div>
							</section>
						</b-upload>
						<div v-else>
							<div class="crop-container">
								<img
									ref="image"
									:src="imageUrl"
									@load.stop="initCropping"
								>
								<b-button
									type="is-primary"
									icon-left="crop"
									@click="submit"
								>
									{{ $t( 'page.avatar.drop.submit' ) }}
								</b-button>
								<b-button
									type="is-danger"
									icon-left="delete"
									@click="reset"
								>
									{{ $t( 'page.avatar.drop.reset' ) }}
								</b-button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<style lang="scss" scoped>
	@import "../../../node_modules/cropperjs/dist/cropper.css";

	.avatar {
		position: relative;

		figure {
			width: 100%;

			img {
				height: auto;
			}
		}
	}

	/deep/ .upload-draggable {
		width: 100%;
	}
</style>

<script>
import Cropper from 'cropperjs';

/**
 * @link https://codepen.io/raffo1234/pen/bZQXwZ
 */
import ApiFectch from '@/js/utils/api';
import User from '@/js/utils/user';
import { error, success } from '@/js/utils/notifications';
import { USER_SET_AVATAR } from '@/js/store/mutation-types';

const user = new User();
const userData = user.getCurrentUser();
const avatar = user.getAvatarURL( userData ? userData.username : null );

export default {
	name: 'Avatar',
	data() {
		return {
			user: {},
			avatar,
			dropFiles: [],
			imageUrl: undefined,
			cropper: undefined,
		};
	},
	computed: {
		imageFile: function() {
			return this.dropFiles.length ? this.dropFiles[ 0 ] : undefined;
		},
	},
	/**
	 * Retrieve user data
	 */
	created() {
		new ApiFectch().getUser( userData.username )
			.then( response => this.user = response );
	},
	methods: {
		/**
		 * Handles on drop event
		 *
		 * @param {Array} files Files
		 */
		onDrop: function( files ) {
			this.dropFiles = files;
			this.createFile();
		},
		/**
		 * Creates the image after dropping
		 */
		createFile() {
			if ( ! this.imageFile.type.match( 'image.*' ) ) {
				error( this.$i18n.t( 'page.avatar.errors.type' ) );
				return;
			}
			const reader = new FileReader();
			reader.onload = e => {
				this.imageUrl = e.target.result;
			};
			reader.readAsDataURL( this.imageFile );
		},
		/**
		 * Creates a new Cropper instance
		 */
		initCropping() {
			this.cropper = new Cropper(
				this.$refs.image,
				{
					aspectRatio: 1,
					autoCropArea: 1,
					viewMode: 1,
					movable: false,
					zoomable: false,
				},
			);
		},
		/**
		 * Resets cropping
		 */
		reset() {
			this.imageUrl = undefined;
			this.dropFiles = [];
		},
		/**
		 * Submits the image
		 *
		 * After cropping, uploads it to the server
		 */
		submit() {
			this.cropper
				.getCroppedCanvas( this.outputOptions )
				.toBlob( blob => {
					new ApiFectch()
						.updateAvatar( blob )
						.then( response => {
							if ( response.response ) {
								success( response.message );
								this.avatar = avatar + '?cache=' + new Date();
								this.$store.commit( `user/${ USER_SET_AVATAR }`, new User().getAvatarURL( userData.username ) + '?cache=' + ( new Date() ) );
							} else {
								error( response.message );
							}
						} );
				} );
		},
	},
};
</script>

