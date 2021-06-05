<template>
	<v-container class="my-0">
		<v-layout column>
			<Buttons
				:limit="paginated.limit"
				@selected-limit="selectedLimit"
				to="/admin/advertisers/create"
			></Buttons>
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
				@update-paginate="updatePaginate"
			></TableList>
		</v-layout>
	</v-container>
</template>

<script lang="ts">
	import TableList from "./TableList.vue";
	import Buttons from "../../Commons/Buttons.vue";
	import Vue from "vue";
	import {
		Advertiser,
		AdvertiserFilters,
		AdvertiserOptions,
		ResultPaginate,
		AdvertiserPaginated,
	} from "../../../../interfaces/advertiser";
	import { isNull, isUndefined } from "lodash";
	import ParamService from "../../../../services/params-service";

	export default Vue.extend({
		name: "AdvertiserList",
		props: {},
		components: { TableList, Buttons },
		data: () => ({
			title: "List",
			paginated: {
				page: 1,
				limit: 25,
			} as AdvertiserPaginated,
			filters: {} as AdvertiserFilters,
			options: {
				sort: "",
				order: "asc",
			} as AdvertiserOptions,
		}),
		created() {},
		async mounted() {
			await this.getPaginated();
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
			async getPaginated() {
				this.setLoading(true);
				await this.$store.dispatch(
					"advertiser/paginated",
					await ParamService.getParams(
						this.paginated,
						this.filters,
						this.options
					),
					{
						root: true,
					}
				);
				this.setLoading(false);
			},
			updatePaginate(data: any) {
				console.log("index::updatePaginate", data);
				this.paginated.page = data;
			},
			async selectedLimit(limit: number) {
				this.paginated.limit = limit;
				this.updatePaginate(1);
				await this.getPaginated();
			},
			async updateParams(params: {
				filters: AdvertiserFilters;
				options: AdvertiserOptions;
			}) {
				this.filters = params.filters;
				this.options = params.options;
				this.updatePaginate(1);
				await this.getPaginated();
			},
		},
		watch: {
			"paginated.page"(val, old) {
				if (val !== old) {
					this.getPaginated();
				}
			},
		},
	});
</script>
