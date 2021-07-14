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
				:filters_init="filters"
				:options="options"
				:limit="paginated.limit"
				@selected-option="selectedOption"
				@update-paginate="updatePaginate"
			></TableList>
		</v-layout>
	</v-container>
</template>

<script lang="ts">
	import TableList from "./TableList.vue";
	import Buttons from "../List/Buttons.vue";
	import Vue from "vue";
	import { isNull, isUndefined } from "lodash";
	import {
		CustomList,
		CustomListFilters,
		CustomListOptions,
		CustomListPaginated,
		CustomListResultPaginate,
	} from "../../../../interfaces/custom_list";
	import { SortingOption } from "@/interfaces/paginated";
	import ParamService from "../../../../services/params-service";

	export default Vue.extend({
		name: "Lists",
		props: {},
		components: { TableList, Buttons },
		data: () => ({
			title: "Lists",
			paginated: {
				page: 1,
				limit: 25
			} as CustomListPaginated,
			filters: {},
			options: {
				sort: "",
				order: "asc",
			} as SortingOption,
		}),
		created() {},
		async mounted() {
			await this.getPaginated();
		},
		computed: {
			getResultPaginate(): CustomListResultPaginate {
				return this.$store.state.custom_list.result_paginate;
			},
			getLists(): CustomList[] {
				const result: CustomListResultPaginate = this.getResultPaginate;
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
						text: "List Id",
						align: "center",
						sortable: false,
						filterable: true,
						value: "id",
					},
					{
						text: "List Name",
						align: "start",
						sortable: false,
						filterable: true,
						value: "name",
					},
					{
						text: "Type",
						align: "start",
						sortable: false,
						filterable: true,
						value: "type",
					},
					{
						text: "Associated List Items",
						align: "start",
						sortable: false,
						filterable: true,
						value: "external_id",
					},
					{
						text: "Active",
						align: "start",
						sortable: false,
						filterable: true,
						value: "active",
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
				const lists = this.getLists;
				if (isUndefined(lists) || isNull(lists)) return [];
				return lists.map((item: CustomList) => {
					return {
						id: item.id,
						name: item.name,
						type: item.type ? item.type.name : "",
						external_id: item.external_id,
						active: item.active,
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
					"custom_list/paginated",
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

			updatePaginate(data: any) {
				this.paginated.page = data;
			},

			async updateParams(params: {
				filters: CustomListFilters;
				options: CustomListOptions;
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
			filters(val, old) {
				console.log("index::watch:filters", { val: val, old: old });
			},
		},
	});
</script>
