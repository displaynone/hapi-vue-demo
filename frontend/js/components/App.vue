<template>
	<div>
		<v-header />
		<router-view />
	</div>
</template>

<script>
import header from '@/js/components/layout/Header';

export default {
	name: 'App',
	components: {
		'v-header': header,
	},
};
</script>
