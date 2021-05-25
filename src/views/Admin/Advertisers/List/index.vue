<template>
	<v-container class="my-0">
		<v-layout column>
			<Buttons></Buttons>
		</v-layout>
		<v-layout column>
			<TableList
				:current_page="Number(getResultPaginate.current_page)"
				:next_page_url="String(getResultPaginate.next_page_url)"
				:path="String(getResultPaginate.path)"
				:per_page="Number(getResultPaginate.per_page)"
				:prev_page_url="String(getResultPaginate.prev_page_url)"
				:to="Number(getResultPaginate.to)"
				:total="Number(getResultPaginate.total)"
				:headers="prepareTableHeaders"
				:items="prepareTableContent"
			></TableList>
		</v-layout>
	</v-container>
</template>

<script lang="ts">
	import TableList from "./TableList.vue";
	import Buttons from "../List/Buttons.vue";
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
		components: { TableList, Buttons },
		data: () => ({
			title: "List",
		}),
		created() {},
		async mounted() {
			this.setLoading(true);
			await this.getPaginated();
			this.setLoading(false);
		},
		computed: {
			getResultPaginate(): ResultPaginate {
				return this.$store.state.advertiser.result_paginate;
			},
			getAdvertisers(): Advertiser[] {
				const result: ResultPaginate = this.getResultPaginate;
				if (
					isUndefined(result) ||
					isNull(result) ||
					isUndefined(result.data) ||
					isNull(result.data)
				) {
					return [];
				}
				return result.data;
			},
			prepareTableHeaders() {
				return [
					{
						text: "Id",
						align: "center",
						sortable: false,
						filterable: true,
						value: "id",
						//width: "5%",
					},
					{
						text: "Advertiser Name",
						align: "start",
						sortable: false,
						filterable: true,
						value: "name",
						//width: "20%",
					},
					{
						text: "Active",
						align: "start",
						sortable: false,
						filterable: true,
						value: "active",
					},
					{
						text: "Advertiser Category",
						align: "start",
						sortable: false,
						filterable: true,
						value: "category",
					},
					{
						text: "Advertiser Domain",
						align: "start",
						sortable: false,
						filterable: true,
						value: "domain",
					},
					{
						text: "Advertiser App Bundle",
						align: "start",
						sortable: false,
						filterable: true,
						value: "appbundle",
					},
					{
						text: "Default Currency",
						align: "start",
						sortable: false,
						filterable: true,
						value: "currency",
					},
					,
					{
						text: "",
						align: "center",
						sortable: false,
						value: "actions",
						width: "5%",
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
			setLoading(_loading: Boolean) {
				this.$store.state.proccess.loading = _loading;
			},
			async getPaginated(
				filters?: AdvertiserFilters,
				options?: AdvertiserOptions
			) {
				return this.$store.dispatch(
					"advertiser/paginated",
					filters,
					options,
					{
						root: true,
					}
				);
			},
		},
	});
</script>
