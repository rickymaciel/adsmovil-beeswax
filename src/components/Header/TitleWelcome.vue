<template>
	<section
		class="d-lg-flex justify-space-between align-center align-items-center"
		:class="type"
	>
		<v-list-item>
			<v-list-item-content>
				<v-list-item-title>{{ $t(title) }}</v-list-item-title>
				<v-list-item-subtitle v-if="showSubtitle">
					{{ $t(subtitle) }}
				</v-list-item-subtitle>
			</v-list-item-content>
		</v-list-item>

		<template v-if="showSearcher">
			<Searcher />
		</template>
	</section>
</template>

<script lang="ts">
	import Vue from "vue";
	import Searcher from "../../components/Content/Searcher.vue";

	export default Vue.extend({
		name: "TitleWelcome",

		props: {
			title: {
				type: String,
				default: "welcomeMsg",
			},
			subtitle: {
				type: String,
				default: "welcomeMsgDashboard",
			},
			type: {
				type: String,
				default: "title-1",
			},
			showSubtitle: {
				type: Boolean,
				default: true,
			},
			showSearcher: {
				type: Boolean,
				default: false,
			},
		},

		components: { Searcher },

		data: () => ({}),

		created() {
			console.log("TitleWelcome", { type: this.type, title: this.title });
		},

		mounted() {},

		computed: {},

		methods: {},
	});
</script>
