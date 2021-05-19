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
	import Buttons from "./Buttons.vue";
	import Vue from "vue";
	import { isNull, isUndefined } from "lodash";
	const moment = require('moment');

	export default Vue.extend({
		name: "CampaignList",
		props: {},
		components: { Buttons, TableList},
		data: () => ({
			title: "List",
		}),
		created() {},
		async mounted() {},
		computed: {
			getResultPaginate(): any {
				//return this.$store.state.campaign.result_paginate;
				return {
					current_page: 1,
					data: [],
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
				}
			},
			getEntities(): any[] {
				/*const result: any = this.getResultPaginate;
				if (
					isUndefined(result) ||
					isNull(result) ||
					isUndefined(result.data) ||
					isNull(result.data)
				) {
					return [];
				}*/
				return [
					{
						id: 1,
						advertiserName: "Advertiser Name 1",
						campaignName: "Campaign Name 1",
						campaignBudget: "100 (imps)",
						campaignSpent: 0.0,
						startDate: moment(new Date()).local().format('YYYY-MM-DD'),
						endDate: moment(new Date()).local().format('YYYY-MM-DD'),
						assosiateLineItem: 1,
						active: true,
						budgetRemaining: 100
					},
					{
						id: 2,
						advertiserName: "Advertiser Name 2",
						campaignName: "Campaign Name 2",
						campaignBudget: "200 (imps)",
						campaignSpent: 0.0,
						startDate: moment(new Date()).local().format('YYYY-MM-DD'),
						endDate: moment(new Date()).local().format('YYYY-MM-DD'),
						assosiateLineItem: 2,
						active: false,
						budgetRemaining: 200
					},
					{
						id: 3,
						advertiserName: "Advertiser Name 3",
						campaignName: "Campaign Name 3",
						campaignBudget: "300 (imps)",
						campaignSpent: 0.0,
						startDate: moment(new Date()).local().format('YYYY-MM-DD'),
						endDate: moment(new Date()).local().format('YYYY-MM-DD'),
						assosiateLineItem: 3,
						active: true,
						budgetRemaining: 300
					},
					{
						id: 4,
						advertiserName: "Advertiser Name 4",
						campaignName: "Campaign Name 4",
						campaignBudget: "400 (imps)",
						campaignSpent: 0.0,
						startDate: moment(new Date()).local().format('YYYY-MM-DD'),
						endDate: moment(new Date()).local().format('YYYY-MM-DD'),
						assosiateLineItem: 4,
						active: false,
						budgetRemaining: 400
					},
					{
						id: 5,
						advertiserName: "Advertiser Name 5",
						campaignName: "Campaign Name 5",
						campaignBudget: "500 (imps)",
						campaignSpent: 0.0,
						startDate: moment(new Date()).local().format('YYYY-MM-DD'),
						endDate: moment(new Date()).local().format('YYYY-MM-DD'),
						assosiateLineItem: 5,
						active: true,
						budgetRemaining: 500
					},
				];
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
						value: "advertiserName",
					},
					{
						text: "Campaign Name",
						align: "start",
						sortable: false,
						filterable: true,
						value: "campaignName",
					},
					{
						text: "Campaign Budget",
						align: "center",
						sortable: false,
						filterable: true,
						value: "campaignBudget",
					},
					{
						text: "Campaign Spent",
						align: "center",
						sortable: false,
						filterable: true,
						value: "campaignSpent",
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
				const entities = this.getEntities;

				if (isUndefined(entities) || isNull(entities)) return [];

				return entities.map((entity: any) => {
					return {
						id: entity.id,
						advertiserName: entity.advertiserName,
						campaignName: entity.campaignName,
						campaignBudget: entity.campaignBudget,
						campaignSpent: entity.campaignSpent,
						startDate: entity.startDate,
						endDate: entity.endDate,
						assosiateLineItem: entity.assosiateLineItem,
						active: entity.active,
						budgetRemaining: entity.budgetRemaining
					};
				});
			},
		},
		methods: {},
	});
</script>