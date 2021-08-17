<template>
	<v-container class="my-0">
		<v-layout column>
			<Buttons
				:limit="paginated.limit"
				@selected-limit="selectedLimit"
				@download-list="handleDownload"
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
				:option="option"
				:filters="filters"
				@selected-option="selectedOption"
				@update-paginate="updatePaginate"
			></TableList>
		</v-layout>
	</v-container>
</template>

<script lang="ts">
	import TableList from "./TableList.vue";
	import Buttons from "../../Commons/Buttons.vue";
	import Vue from "vue";
	import { Advertiser, AdvertiserFilters } from "../../../../interfaces/advertiser";
	import {
		SortingOption,
		Paginated,
		ResultPaginate,
	} from "../../../../interfaces/paginated";
	import { isNull, isUndefined } from "lodash";
	import ParamService from "../../../../services/params-service";
	import i18n from "@/plugins/i18n";

	export default Vue.extend({
		name: "AdvertiserList",
		props: {},
		components: { TableList, Buttons },
		data: function () {
			return {
				title: "List",
				paginated: {
					page: 1,
					limit: 25,
				} as Paginated,
				filters: {},
				option: {
					sort: "id",
					order: "desc",
				} as SortingOption,
			};
		},
		created() {},
		async mounted() {
			await this.getPaginated();
		},
		computed: {
			getFilters() {
				return this.filters;
			},
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
						text: i18n.t("advertisers.fields.id"),
						align: "center",
						sortable: false,
						api_sortable: true,
						filterable: true,
						value: "id",
						//width: "5%",
					},
					{
						text: i18n.t("advertisers.fields.name"),
						align: "start",
						sortable: false,
						api_sortable: true,
						filterable: true,
						value: "name",
						//width: "20%",
					},
					{
						text: i18n.t("common.fields.active"),
						align: "start",
						sortable: false,
						api_sortable: true,
						filterable: true,
						value: "active",
					},
					{
						text: i18n.t("advertisers.fields.category"),
						align: "start",
						sortable: false,
						api_sortable: true,
						filterable: true,
						value: "category",
					},
					{
						text: i18n.t("advertisers.fields.domain"),
						align: "start",
						sortable: false,
						api_sortable: true,
						filterable: true,
						value: "domain",
					},
					{
						text: i18n.t("advertisers.fields.appBundle"),
						align: "start",
						sortable: false,
						api_sortable: true,
						filterable: true,
						value: "app_bundle",
					},
					{
						text: i18n.t("advertisers.fields.currency"),
						align: "start",
						sortable: false,
						api_sortable: true,
						filterable: false,
						value: "currency",
					},
					,
					{
						text: "",
						align: "center",
						sortable: false,
						api_sortable: true,
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
						app_bundle: advertiser.app_bundle,
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
				console.log("--- Advertiser::getPaginated");
				this.setLoading(true);
				await this.$store.dispatch(
					"advertiser/paginated",
					await ParamService.getParams(
						this.paginated,
						this.filters,
						this.option
					),
					{
						root: true,
					}
				);
				this.setLoading(false);
			},
			updatePaginate(data: any) {
				this.paginated.page = data;
			},
			setFilter(params: { key: string | number; value: any }) {
				this.filters = {};
				this.filters[params.key] = typeof params.value !== "undefined" ? params.value : "";
			},
			async selectedOption(params: {option: SortingOption; filter: any;}) {
				this.setFilter({ key: params.option.sort, value: params.filter });
				this.updatePaginate(1);
				await this.updateParams({
					filters: this.filters,
					option: params.option,
				});
			},
			async selectedLimit(limit: number) {
				this.paginated.limit = limit;
				this.updatePaginate(1);
				await this.getPaginated();
			},
			async updateParams(params: {
				filters: AdvertiserFilters;
				option: SortingOption;
			}) {
				this.filters = params.filters;
				this.option = params.option;
				this.updatePaginate(1);
				await this.getPaginated();
			},
			async handleDownload() {
				this.setLoading(true);
				await this.$store.dispatch(
					'advertiser/download',
					await ParamService.getParams(
						this.paginated,
						this.filters,
						this.option
					),
					{root: true}					
				);
				this.setLoading(false);
			}
		},
		watch: {
			"paginated.page"(val, old) {
				if (val !== old) {
					this.getPaginated();
				}
			},
			filters(val, old) {
				console.log("index::watch:filters", { val: val, old: old });
			},
		},
	});
</script>
