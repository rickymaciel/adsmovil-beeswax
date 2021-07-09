<template>
	<v-container class="my-0">
		<v-row no-gutters>
			<v-col cols="12" class="ma-0">
				<BreadCrumbs :showSearcher="true"></BreadCrumbs>
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
	import TitleWelcome from "../../../components/Header/TitleWelcome.vue";
	import BreadCrumbs from "../../../components/Content/BreadCrumbs.vue";
	import { last } from "lodash";

	export default Vue.extend({
		name: "UserHeader",
		props: {},
		components: {
			TitleWelcome,
			BreadCrumbs,
		},
		data: () => ({
			title: String,
		}),

		created() {},

		mounted() {},

		computed: {
			getTitle() {
				let self = this;
				const result: any = last(self.$route.matched);
				return result.meta.breadcrumb;
			},
		},

		methods: {},
	});
</script>
