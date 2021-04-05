<template>
	<v-layout class="d-block ma-0 pa-0">
		<v-layout class="white d-block ma-0 pa-0">
			<AdvertiserHeader
				:title="title"
				:breadCrumbItems="breadCrumbItems"
			></AdvertiserHeader>
		</v-layout>
		<v-layout class="d-block ma-0 pa-0 pt-lg-4">
			<v-container class="my-0">
				<v-layout column>
					<Buttons></Buttons>
				</v-layout>
			</v-container>
			<v-container class="my-0">
				<v-layout column>
					<TableList></TableList>
				</v-layout>
			</v-container>
		</v-layout>
	</v-layout>
</template>

<script lang="ts">
	import AdvertiserHeader from "./AdvertiserHeader.vue";
	import TableList from "./TableList.vue";
	import Buttons from "./Buttons.vue";
	import Vue from "vue";

	export default Vue.extend({
		name: "AdvertiserList",
		props: {},
		components: { AdvertiserHeader, TableList, Buttons },
		data: () => ({
			title: "Advertiser",
			breadCrumbItems: [],
		}),
		created() {
			this.breadCrumbItems = [
				{
					text: "Dashboard",
					disabled: false,
					href: "/admin/dashboard",
				},
				{
					text: "Adsvertiser",
					disabled: true,
					href: "/admin/advertisers/index",
				},
			];
		},
		mounted() {},
		computed: {},
		methods: {},
	});
</script>
