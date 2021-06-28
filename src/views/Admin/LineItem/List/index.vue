<template>
	<v-container class="my-0">
		<v-layout column>
			<Buttons
				:limit="paginated.limit"
				@selected-limit="selectedLimit"
				to="/admin/lineitem/create"
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
				:filters_init="filters"
				:options="options"
				:limit="paginated.limit"
				@update-paginate="updatePaginate"
				@update-params="updateParams"
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
		LineItem,
		LineItemFilters,
		LineItemOptions,
		LineItemPaginated,
		ResultPaginate,
	} from "../../../../interfaces/line_item";
	import ParamService from "../../../../services/params-service";

	export default Vue.extend({
		name: "LineItemList",
		props: {},
		components: { Buttons, TableList },
		data: () => ({
			title: "List",
			paginated: { page: 1, limit: 25 } as LineItemPaginated,
			filters: {} as LineItemFilters,
			options: { sort: "", order: "asc" } as LineItemOptions,
		}),
		created() {},
		async mounted() {
			await this.getPaginated();
		},
		computed: {
			getResultPaginate(): ResultPaginate {
				return this.$store.state.line_item.result_paginate;
			},
			getEntities(): LineItem[] {
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
						filterable: false,
						value: "id",
					},
					{
						text: "Campaign Name",
						align: "start",
						sortable: false,
						filterable: false,
						value: "campaign_name",
					},
					{
						text: "Line Name",
						align: "start",
						sortable: false,
						filterable: false,
						value: "name",
					},
					{
						text: "Line Item Type",
						align: "center",
						sortable: false,
						filterable: false,
						value: "line_item_type_name",
					},
					{
						text: "Line Item Budget",
						align: "center",
						sortable: false,
						filterable: false,
						value: "budget",
					},
					{
						text: "Start Date",
						align: "center",
						sortable: false,
						filterable: false,
						value: "start_date",
					},
					{
						text: "End Date",
						align: "center",
						sortable: false,
						filterable: false,
						value: "end_date",
					},
					{
						text: "Assosiated Creatives",
						align: "center",
						sortable: false,
						filterable: false,
						value: "assosiated_creatives",
					},
					{
						text: "Active",
						align: "start",
						sortable: false,
						filterable: false,
						value: "active",
					},
					{
						text: "Budget Remaining",
						align: "center",
						sortable: false,
						filterable: false,
						value: "budget_remaining",
					},
					{
						text: "Winning N.",
						align: "center",
						sortable: false,
						filterable: false,
						value: "winning",
					},
					{
						text: "Bidding N.",
						align: "center",
						sortable: false,
						filterable: false,
						value: "bidding",
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
				const entities = this.getEntities;

				if (isUndefined(entities) || isNull(entities)) return [];

				const result = entities.map((entity: any) => {
					return {
						id: entity?.id,
						campaign_name: entity?.campaign_name,
						name: entity?.name,
						line_item_type_name: entity?.line_item_type_name ,
						budget: entity?.budget ? Number(entity?.budget) : undefined,
						start_date: entity?.start_date ? this.moment(entity?.start_date).format("YYYY-MM-DD HH:mm:ss") : undefined,
						end_date: entity?.end_date ? this.moment(entity.end_date).format("YYYY-MM-DD HH:mm:ss") : undefined,
						assosiated_creatives: entity?.assosiated_creatives ? Number(entity?.assosiated_creatives) : undefined, // TODO REFACTORIZAR
						active: entity?.active ? true : false,
						budget_remaining: entity?.budget_remaining ? Number(entity?.budget_remaining) : undefined,
						winning:  entity?.winning ? Number(entity?.winning) : undefined,
						bidding:  entity?.bidding ? Number(entity?.bidding) : undefined,

						// otros campos
						alternative_id: entity?.alternative_id,
						daily_budget: entity?.daily_budget,
						fix_cpm: entity?.fix_cpm,
						cpm_bid: entity?.cpm_bid,
						target_ecpc: entity?.target_ecpc,
						target_ctr: entity?.target_ctr,
						target_vcr: entity?.target_vcr,
						external_id: entity?.external_id,
						spend: entity?.spend,
						created_by: entity?.created_by,
						updated_by: entity?.updated_by,
						deleted_by: entity?.deleted_by,
						created_at: entity?.created_at,
						updated_at: entity?.updated_at,
						deleted_at: entity?.deleted_at,
						account_id: entity?.account_id,
						advertiser_id: entity?.advertiser_id,
						campaign_id: entity?.campaign_id,
						line_item_type_id: entity?.line_item_type_id,
						budget_type_id: entity?.budget_type_id,
						strategy_id: entity?.strategy_id,
						bid_strategy_id: entity?.bid_strategy_id,
						line_pacing_id: entity?.line_pacing_id,
						bid_shading_id: entity?.bid_shading_id,
						creative_method_id: entity?.creative_method_id,
						advertiser_name: entity?.advertiser_name,
						budget_type: entity?.budget_type,
						strategy_name: entity?.strategy_name,
						line_pacing_name: entity?.line_pacing_name,
						bid_strategy_name: entity?.bid_strategy_name,
						bid_shading_name: entity?.bid_shading_name,
						creative_method_name: entity?.creative_method_name,
						clicks: entity?.clicks,
						conversion_orders: entity?.conversion_orders,
						conversion_value: entity?.conversion_value,
						conversions: entity?.conversions,
						cost_per_acquisition: entity?.cost_per_acquisition,
						cost_per_acquisition_usd: entity?.cost_per_acquisition_usd,
						cpm: entity?.cpm,
						ctr: entity?.ctr,
						gross_margin: entity?.gross_margin,
						impressions: entity?.impressions,
						net_margin: entity?.net_margin,
						update_date: entity?.update_date,
						vcpm: entity?.vcpm,
						video_complete_percent: entity?.video_complete_percent,
						video_completes: entity?.video_completes,
						video_plays: entity?.video_plays,
						viewable_impressions: entity?.viewable_impressions,
						viewable_percent: entity?.viewable_percent,
						clicks_lifetime: entity?.clicks_lifetime,
						conversion_orders_lifetime: entity?.conversion_orders_lifetime,
						conversion_value_lifetime: entity?.conversion_value_lifetime,
						conversions_lifetime: entity?.conversions_lifetime,
						cost_per_acquisition_lifetime: entity?.cost_per_acquisition_lifetime,
						cost_per_acquisition_lifetime_usd: entity?.cost_per_acquisition_lifetime_usd,
						cpm_lifetime: entity?.cpm_lifetime,
						ctr_lifetime: entity?.ctr_lifetime,
						gross_margin_lifetime: entity?.gross_margin_lifetime,
						impressions_lifetime: entity?.impressions_lifetime,
						net_margin_lifetime: entity?.net_margin_lifetime,
						spend_lifetime: entity?.spend_lifetime,
						vcpm_lifetime: entity?.vcpm_lifetime,
						video_complete_percent_lifetime: entity?.video_complete_percent_lifetime,
						video_completes_lifetime: entity?.video_completes_lifetime,
						video_plays_lifetime: entity?.video_plays_lifetime,
						viewable_impressions_lifetime: entity?.viewable_impressions_lifetime,
						viewable_percent_lifetime: entity?.viewable_percent_lifetime
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
					"line_item/paginated",
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
			async selectedLimit(limit: number) {
				this.paginated.limit = limit;
				this.updatePaginate(1);
				await this.getPaginated();
			},
			async updateParams(params: {
				filters: LineItemFilters;
				options: LineItemOptions;
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