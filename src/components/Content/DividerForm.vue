<template>
	<v-card
		class="grey lighten-3 d-flex justify-start align-center mt-4"
		elevation="0"
		flat
		tile
	>
		<v-card-title class="px-2">{{ name }}</v-card-title>
		<v-divider class="mt-3"></v-divider>
	</v-card>
</template>

<script lang="ts">
	export default {
		name: "DividerForm",
		props: {
			name: {
				type: String,
				default: "Divider",
			},
		},
		data: function () {
			return {};
		},
		mounted() {},
		computed: {},
		methods: {},
	};
</script>
