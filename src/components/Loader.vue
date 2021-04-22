<template>
	<section v-if="isLoading">
		<v-overlay :value="isLoading">
			<v-progress-circular indeterminate size="64"></v-progress-circular>
		</v-overlay>
		<v-progress-linear
			:active="isLoading"
			:indeterminate="isLoading"
			absolute
			top
			color="secondary lighten-1"
		></v-progress-linear>
	</section>
</template>

<script lang="ts">
	export default {
		name: "Loader",
		props: {
			items: {
				type: Array,
				default: function () {
					return [];
				},
			},
		},

		data: function () {
			return {};
		},

		created() {},

		async mounted() {},

		computed: {
			isLoading(): Boolean {
				return this.$store.state.proccess.loading;
			},
		},
		methods: {},
	};
</script>
