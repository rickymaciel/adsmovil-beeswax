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
	import { isNull, isUndefined, result } from "lodash";
	import {
		Campaing,
		CampaingFilters,
		CampaingOptions,
		ResultPaginate,
	} from "../../../../interfaces/campaing";

	export default Vue.extend({
		name: "CampaignList",
		props: {},
		components: { Buttons, TableList },
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
				return this.$store.state.campaign.result_paginate;
			},
			getCampaigns(): Campaing[] {
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
						value: "name",
					},
					{
						text: "Campaign Budget",
						align: "center",
						sortable: false,
						filterable: true,
						value: "campaignBudget",
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
				const entities = this.getCampaigns;

				if (isUndefined(entities) || isNull(entities)) return [];

				const result = entities.map((entity: Campaing) => {
					return {
						id: entity.id,
						advertiserName: entity.advertiser_name,
						name: entity.name,
						campaignBudget: entity.budget.toString(),
						spend: entity.spend,
						startDate: this.moment(entity.start_date).format(
							"YYYY-MM-DD HH:mm:ss"
						),
						endDate: this.moment(entity.end_date).format(
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
			async getPaginated(
				filters?: CampaingFilters,
				options?: CampaingOptions
			) {
				return this.$store.dispatch(
					"campaign/paginated",
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