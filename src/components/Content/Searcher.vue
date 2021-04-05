<template>
	<section :style="width">
		<v-text-field
			v-model="term"
			ref="term"
			class="searcher"
			:label="$t('Search')"
			clearable
			solo
			dense
			rounded
		>
			<template v-slot:prepend-inner>
				<v-btn icon medium>
					<img
						width="20"
						height="20"
						src="@/assets/icons/search_icon.png"
						alt="Search"
					/>
				</v-btn>
			</template>
			<template v-slot:append-outer>
				<v-btn icon medium>
					<img
						width="30"
						height="30"
						src="@/assets/icons/filter_btn.png"
						alt="Filter"
					/>
				</v-btn>
			</template>
		</v-text-field>
	</section>
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
			width() {
				switch (this.$vuetify.breakpoint.name) {
					case "xs":
						return "width: 100%";
					case "sm":
						return "width: 100%";
					case "md":
						return "width: 50%";
					case "lg":
						return "width: 40%";
					case "xl":
						return "width: 30%";
				}
			},
		},
		methods: {},
	};
</script>
