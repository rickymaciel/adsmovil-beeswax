<template>
	<v-container class="my-0">
		<v-row no-gutters>
			<v-col cols="12" class="ma-0">
				<BreadCrumbs
					:items="breadCrumbItems"
					:showSearcher="true"
				></BreadCrumbs>
			</v-col>
			<v-col cols="12" class="ma-0">
				<TitleWelcome
					:title="getTitle"
					type="title-2"
					:showSubtitle="false"
					:showSearcher="false"
				></TitleWelcome>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
	import Vue from "vue";
	import TitleWelcome from "../../../../components/Header/TitleWelcome.vue";
	import BreadCrumbs from "../../../../components/Content/BreadCrumbs.vue";

	export default Vue.extend({
		name: "AdvertiserHeader",
		props: {
			breadCrumbItems: {
				type: Array,
				default: function () {
					return [];
				},
			},
			title: {
				type: String,
				default: "",
			},
		},
		components: {
			TitleWelcome,
			BreadCrumbs,
		},
		data: () => ({}),

		created() {},

		mounted() {},

		computed: {
			getTitle() {
				return this.title;
			},
		},

		methods: {},
	});
</script>
