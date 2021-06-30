<template>
	<v-container class="my-0">
		<v-layout column>
			<!-- <v-card>option: {{ option }}</v-card>
			<v-card>filters: {{ filters }}</v-card> -->
			<Buttons
				:limit="paginated.limit"
				@selected-limit="selectedLimit"
				to="/admin/campaigns/create"
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
			></TableList>
		</v-layout>
	</v-container>
</template>

<script lang="ts">
	import TableList from "./TableList.vue";
	import Buttons from "../../Commons/Buttons.vue";
	import Vue from "vue";
	import { isNull, isUndefined } from "lodash";
	import {
		Campaign,
		CampaingOptions,
		ResultPaginate,
	} from "../../../../interfaces/campaign";
	import ParamService from "../../../../services/params-service";
	import { Paginated, SortingOption } from "../../../../interfaces/paginated";

	export default Vue.extend({
		name: "CampaignList",
		props: {},
		components: { Buttons, TableList },
		data: () => ({
			title: "List",
			paginated: {
				page: 1,
				limit: 25,
			} as Paginated,
			filters: {},
			option: {
				sort: "",
				order: "asc",
			} as SortingOption,
		}),
		created() {},
		async mounted() {
			await this.getPaginated();
		},
		computed: {
			getResultPaginate(): ResultPaginate {
				return this.$store.state.campaign.result_paginate;
			},
			getCampaigns(): Campaign[] {
				const result: ResultPaginate = this.getResultPaginate;
				if (
					isUndefined(result) ||
					isNull(result) ||
					isUndefined(result.data) ||
					isNull(result.data)
				) {
					return [];
				}
				return result.data.sort(function(a,b){return b.id-a.id});
			},
			prepareTableHeaders() {
				return [
					{
						text: "Id",
						align: "center",
						sortable: false,
						filterable: true,
						value: "id",
					},
					{
						text: "Advertiser Name",
						align: "start",
						sortable: false,
						filterable: true,
						value: "advertiser_name",
					},
					{
						text: "Campaign Name",
						align: "start",
						sortable: false,
						filterable: true,
						value: "name",
					},
					{
						text: "Campaign Budget",
						align: "center",
						sortable: false,
						filterable: true,
						value: "budget",
					},
					{
						text: "Campaign Spend",
						align: "center",
						sortable: false,
						filterable: true,
						value: "spend",
					},
					{
						text: "Start Date",
						align: "center",
						sortable: false,
						filterable: true,
						value: "start_date",
					},
					{
						text: "End Date",
						align: "center",
						sortable: false,
						filterable: true,
						value: "end_date",
					},
					{
						text: "Assosiate Line Item",
						align: "center",
						sortable: false,
						filterable: true,
						value: "assosiateLineItem",
					},
					{
						text: "Active",
						align: "start",
						sortable: false,
						filterable: true,
						value: "active",
					},
					{
						text: "Budget Remaining",
						align: "center",
						sortable: false,
						filterable: true,
						value: "budgetRemaining",
					},
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
				const entities = this.getCampaigns;

				if (isUndefined(entities) || isNull(entities)) return [];

				const result = entities.map((entity: Campaign) => {
					return {
						id: entity.id,
						advertiser_name: entity.advertiser_name,
						name: entity.name,
						budget: entity.budget,
						spend: entity.spend,
						start_date: this.moment(entity.start_date).format(
							"YYYY-MM-DD HH:mm:ss"
						),
						end_date: this.moment(entity.end_date).format(
							"YYYY-MM-DD HH:mm:ss"
						),
						assosiateLineItem: 100, // TODO REFACTORIZAR
						active: entity.active,
						budgetRemaining: entity.budget,
					};
				});

				return result;
			},
		},
		methods: {
			setLoading(_loading: Boolean) {
				this.$store.state.proccess.loading = _loading;
			},
			async getPaginated() {
				this.setLoading(true);
				await this.$store.dispatch(
					"campaign/paginated",
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
				this.paginated.page = data;
			},
			setFilter(params: { key: string | number; value: any }) {
				this.filters = {};
				this.filters[params.key] = params.value || "";
			},
			async selectedOption(params: {
				option: SortingOption;
				filter: string;
			}) {
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
				filters: CampaingOptions;
				option: SortingOption;
			}) {
				this.filters = params.filters;
				this.option = params.option;
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