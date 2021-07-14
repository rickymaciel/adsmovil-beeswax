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
			paginated: {
				page: 1,
				limit: 25
			} as LineItemPaginated,
			filters: {} as LineItemFilters,
			options: {
				sort: "",
				order: "asc"
			} as LineItemOptions,
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
				return result.data.sort(function(a,b){return b.id-a.id});
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

				return entities.map((entity: any) => {
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
						bidding:  entity?.bidding ? Number(entity?.bidding) : undefined,};
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
					"line_item/paginated",
					{
						paginated: this.paginated,
						filters: this.filters,
						options: this.options
					},
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