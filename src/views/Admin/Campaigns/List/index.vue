<template>
	<v-container class="my-0">
		<v-layout column>
			<Buttons
				:limit="paginated.limit"
				@selected-limit="selectedLimit"
				@download-list="handleDownload"
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
				:option="options"
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
import { isNull, isUndefined } from "lodash";
import {
	Campaign,
	CampaingOptions,
	ResultPaginate,
} from "../../../../interfaces/campaign";
import ParamService from "../../../../services/params-service";
import { Paginated, SortingOption } from "../../../../interfaces/paginated";
import i18n from "@/plugins/i18n";

export default Vue.extend({
	name: "CampaignList",
	props: {},
	components: { Buttons, TableList },
	data: () => ({
		title: "List",
		paginated: { page: 1, limit: 25 } as Paginated,
		filters: {},
		options: { sort: "", order: "asc" } as SortingOption,
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
			return result.data;
		},
		prepareTableHeaders() {
			return [
				{
					text: i18n.t("campaign.fields.id"),
					align: "center",
					sortable: false,
					api_sortable: true,
					filterable: true,
					value: "id",
				},
				{
					text: i18n.t("campaign.fields.advertiser"),
					align: "start",
					sortable: false,
					api_sortable: true,
					filterable: true,
					value: "advertiser_name",
				},
				{
					text: i18n.t("campaign.fields.name"),
					align: "start",
					sortable: false,
					api_sortable: true,
					filterable: true,
					value: "name",
				},
				{
					text: i18n.t("campaign.fields.budget"),
					align: "center",
					sortable: false,
					api_sortable: true,
					filterable: true,
					value: "budget",
				},
				{
					text: i18n.t("campaign.fields.spend"),
					align: "center",
					sortable: false,
					api_sortable: true,
					filterable: true,
					value: "spend",
				},
				{
					text: i18n.t("campaign.fields.start_date"),
					align: "center",
					sortable: false,
					api_sortable: true,
					filterable: true,
					value: "start_date",
				},
				{
					text: i18n.t("campaign.fields.end_date"),
					align: "center",
					sortable: false,
					api_sortable: true,
					filterable: true,
					value: "end_date",
				},
				{
					text: i18n.t("campaign.fields.associated_lines"),
					align: "center",
					sortable: false,
					api_sortable: true,
					filterable: false,
					value: "line_items_count",
				},
				{
					text: i18n.t("campaign.fields.active"),
					align: "start",
					sortable: false,
					api_sortable: true,
					filterable: true,
					value: "active",
				},
				{
					text: i18n.t("campaign.fields.remaining_budget"),
					align: "center",
					sortable: false,
					api_sortable: true,
					filterable: true,
					value: "budget_remaining",
				},
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
					line_items_count: entity.line_items_count,
					active: entity.active,
					budget_remaining: entity.budget_remaining,
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
				{ root: true }
			);
			this.setLoading(false);
		},
		updatePaginate(data: any) {
			this.paginated.page = data;
		},
		setFilter(params: { key: string | number; value: any }) {
			this.filters = {};
			this.filters[params.key] =
				typeof params.value !== "undefined" ? params.value : "";
		},
		async selectedOption(params: { option: SortingOption; filter: any }) {
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
			this.options = params.option;
			this.updatePaginate(1);
			await this.getPaginated();
		},
		async handleDownload() {
			this.setLoading(true);
			await this.$store.dispatch(
				"campaign/download",
				await ParamService.getParams(
					this.paginated,
					this.filters,
					this.option
				),
				{ root: true }
			);
			this.setLoading(false);
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
