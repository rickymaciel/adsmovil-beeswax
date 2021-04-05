<template>
	<section
		class="d-lg-flex justify-space-between align-center align-items-center"
	>
		<v-breadcrumbs class="pa-0 mt-0 mb-3" :items="items">
			<template v-slot:divider>
				<v-icon>mdi-chevron-right</v-icon>
			</template>
		</v-breadcrumbs>
		<template v-if="showSearcher">
			<Searcher />
		</template>
	</section>
</template>

<script lang="ts">
	import Searcher from "../../components/Content/Searcher.vue";
	export default {
		name: "BreadCrumbs",
		props: {
			items: {
				type: Array,
				default: function () {
					return [];
				},
			},
			showSearcher: {
				type: Boolean,
				default: false,
			},
		},
		data: function () {
			return {
				message: null,
			};
		},
		components: { Searcher },
		mounted() {},
		computed: {},
		methods: {},
	};
</script>
