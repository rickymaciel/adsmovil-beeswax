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
					<TableList
						:current_page="Number(getResultPaginate.current_page)"
						:next_page_url="getResultPaginate.next_page_url"
						:path="getResultPaginate.path"
						:per_page="Number(getResultPaginate.per_page)"
						:prev_page_url="getResultPaginate.prev_page_url"
						:to="Number(getResultPaginate.to)"
						:total="Number(getResultPaginate.total)"
						:headers="prepareTableHeaders"
						:desserts="prepareTableContent"
					></TableList>
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
	import {
		Advertiser,
		AdvertiserFilters,
		AdvertiserOptions,
		ResultPaginate,
	} from "../../../../interfaces/advertiser";
	import { isNull, isUndefined } from "lodash";

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
		async mounted() {
			const result = await this.dispatchAll();
			console.log("mounted:dispatchAll", { result: result });
		},
		computed: {
			getResultPaginate(): ResultPaginate {
				return this.$store.state.advertiser.result_paginate;
			},
			getAdvertisers(): Advertiser[] {
				if (
					isUndefined(this.$store.state.advertiser.result_paginate) ||
					isNull(this.$store.state.advertiser.result_paginate) ||
					isUndefined(
						this.$store.state.advertiser.result_paginate.data
					) ||
					isNull(this.$store.state.advertiser.result_paginate.data)
				) {
					return [];
				}
				return this.$store.state.advertiser.result_paginate.data;
			},
			prepareTableHeaders() {
				return [
					{
						text: "Id",
						align: "start",
						sortable: false,
						value: "id",
					},
					{
						text: "Advertiser Name",
						align: "start",
						sortable: false,
						value: "name",
					},
					{
						text: "Active",
						align: "start",
						sortable: false,
						value: "active",
					},
					{
						text: "Advertiser Category",
						align: "start",
						sortable: false,
						value: "category",
					},
					{
						text: "Advertiser Domain",
						align: "start",
						sortable: false,
						value: "domain",
					},
					{
						text: "Advertiser App Bundle",
						align: "start",
						sortable: false,
						value: "appbundle",
					},
					{
						text: "Default Currency",
						align: "start",
						sortable: false,
						value: "currency",
					},
					,
					{
						text: "Actions",
						align: "start",
						sortable: false,
						value: "actions",
					},
				];
			},
			prepareTableContent() {
				const advertisers = this.getAdvertisers;

				if (isUndefined(advertisers) || isNull(advertisers)) return [];

				return advertisers.map((advertiser: Advertiser) => {
					return {
						id: advertiser.id,
						name: advertiser.name,
						active: advertiser.active,
						category: advertiser.category.name,
						domain: advertiser.domain,
						appbundle: advertiser.app_bundle,
						currency: `${advertiser.currency.glyph} (${advertiser.currency.name})`,
					};
				});
			},
		},
		methods: {
			async dispatchAll(
				filters?: AdvertiserFilters,
				options?: AdvertiserOptions
			) {
				return this.$store.dispatch("advertiser/getAll", filters, options, {
					root: true,
				});
			},
		},
	});
</script>
