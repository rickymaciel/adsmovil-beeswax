<template>
	<v-text-field
		v-model="term"
		ref="term"
		class="searcher"
		:label="$t('Search')"
		clearable
		solo
	>
		<template v-slot:prepend-inner>
			<v-btn icon medium>
				<img src="@/assets/icons/search_icon.png" alt="Search" />
			</v-btn>
		</template>
		<template v-slot:append-outer>
			<v-btn icon medium>
				<img
					width="36"
					height="36"
					src="@/assets/icons/filter_btn.png"
					alt="Filter"
				/>
			</v-btn>
		</template>
	</v-text-field>
</template>

<script lang="ts">
	export default {
		name: "Searcher",
		props: {
			items: {
				type: Array,
				default: function () {
					return [];
				},
			},
		},
		data: function () {
			return {
				term: "",
			};
		},
		mounted() {},
		computed: {
			isLoggedIn() {
				return this.$store.state.auth.loggedIn;
			},
		},
		methods: {},
	};
</script>
