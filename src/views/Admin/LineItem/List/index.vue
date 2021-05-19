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
	const moment = require('moment');

	export default Vue.extend({
		name: "LineItemList",
		props: {},
		components: { TableList, Buttons },
		data: () => ({
			title: "Line Item List",
		}),
		created() {},
		async mounted() {
			/*this.setLoading(true);
			const result = await this.dispatchAll();
			this.setLoading(false);*/
		},
		computed: {
			getResultPaginate(): any {
				//return this.$store.state.lineItem.result_paginate;
				return {
					current_page: 1,
					first_page_url: "",
					from: 0,
					last_page: 0,
					last_page_url: "",
					next_page_url: "",
					path: "",
					per_page: 25,
					prev_page_url: "",
					to: 2,
					total: 100,
					data: [
						{
							id: 1,
							campaignName: "Campaign Name 1",
							name: "Line Name 1",
							lineItemType: "100 (imps)",
							lineItemBudget: 1.0,
							startDate: moment(new Date()).local().format('YYYY-MM-DD'),
							endDate: moment(new Date()).local().format('YYYY-MM-DD'),
							associatedLI: 1,
							active: true,
							budgetRemain: "",
							winningN: "",
							bidding: "",
						},
						{
							id: 2,
							campaignName: "Campaign Name 2",
							name: "Line Name 2",
							lineItemType: "200 (imps)",
							lineItemBudget: 2.0,
							startDate: moment(new Date()).local().format('YYYY-MM-DD'),
							endDate: moment(new Date()).local().format('YYYY-MM-DD'),
							associatedLI: 2,
							active: true,
							budgetRemain: "",
							winningN: "",
							bidding: "",
						},
						{
							id: 3,
							campaignName: "Campaign Name 3",
							name: "Line Name 3",
							lineItemType: "300 (imps)",
							lineItemBudget: 3.0,
							startDate: moment(new Date()).local().format('YYYY-MM-DD'),
							endDate: moment(new Date()).local().format('YYYY-MM-DD'),
							associatedLI: 3,
							active: false,
							budgetRemain: "",
							winningN: "",
							bidding: "",
						},
						{
							id: 4,
							campaignName: "Campaign Name 4",
							name: "Line Name 4",
							lineItemType: "400 (imps)",
							lineItemBudget: 4.0,
							startDate: moment(new Date()).local().format('YYYY-MM-DD'),
							endDate: moment(new Date()).local().format('YYYY-MM-DD'),
							associatedLI: 4,
							active: true,
							budgetRemain: "",
							winningN: "",
							bidding: "",
						},
						{
							id: 5,
							campaignName: "Campaign Name 5",
							name: "Line Name 5",
							lineItemType: "500 (imps)",
							lineItemBudget: 5.0,
							startDate: moment(new Date()).local().format('YYYY-MM-DD'),
							endDate: moment(new Date()).local().format('YYYY-MM-DD'),
							associatedLI: 5,
							active: false,
							budgetRemain: "",
							winningN: "",
							bidding: "",
						},
					],
				}
			},
			getEntities(): any[] {
				const result: any = this.getResultPaginate;
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
					},
					{
						text: "Campaign Name",
						align: "start",
						sortable: false,
						filterable: true,
						value: "campaignName",
					},
					{
						text: "Line Name",
						align: "start",
						sortable: false,
						filterable: true,
						value: "name",
					},
					{
						text: "Line Item type",
						align: "center",
						sortable: false,
						filterable: true,
						value: "lineItemType",
					},
					{
						text: "Line Item Budget",
						align: "center",
						sortable: false,
						filterable: true,
						value: "lineItemBudget",
					},
					{
						text: "Start Date",
						align: "center",
						sortable: false,
						filterable: true,
						value: "startDate",
					},
					{
						text: "End Date",
						align: "center",
						sortable: false,
						filterable: true,
						value: "endDate",
					},
					{
						text: "Associated LI",
						align: "center",
						sortable: false,
						filterable: true,
						value: "associatedLI",
					},
					{
						text: "Active",
						align: "center",
						sortable: false,
						filterable: true,
						value: "active",
					},
					{
						text: "Budget Remain",
						align: "center",
						sortable: false,
						filterable: true,
						value: "budgetRemain",
					},
					{
						text: "Winning Now",
						align: "center",
						sortable: false,
						filterable: true,
						value: "winningN",
					},
					{
						text: "Bidding Now",
						align: "center",
						sortable: false,
						filterable: true,
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
						id: entity.id,
						campaignName: entity.campaignName,
						name: entity.name,
						lineItemType: entity.lineItemType,
						lineItemBudget: entity.lineItemBudget,
						startDate: entity.startDate,
						endDate: entity.endDate,
						associatedLI: entity.associatedLI,
						active: entity.active,
						budgetRemain: entity.budgetRemain,
						winningN: entity.winningN,
						bidding: entity.bidding,
					};
				});
			},
		},
		methods: {
			/*setLoading(_loading: Boolean) {
				this.$store.state.proccess.loading = _loading;
			},
			async dispatchAll(
				filters?: AdvertiserFilters,
				options?: AdvertiserOptions
			) {
				return this.$store.dispatch("lineItem/getAll", filters, options, {
					root: true,
				});
			},*/
		},
	});
</script>