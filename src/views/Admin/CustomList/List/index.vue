<template>
	<v-container class="my-0">
		<v-layout column>
			<Buttons
				:limit="paginated.limit"
				@selected-limit="selectedLimit"
				to="/admin/custom_lists/create"
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
				@update-current-page="updateCurrentPage"
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
		CustomList,
		CustomListFilters,
		CustomListResultPaginate,
	} from "../../../../interfaces/custom_list";
	import i18n from "@/plugins/i18n";
	import ParamService from "../../../../services/params-service";
	import { Paginated, SortingOption } from "@/interfaces/paginated";

	export default Vue.extend({
		name: "Lists",
		props: {},
		components: { TableList, Buttons },
		data: () => ({
			title: "Lists",
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
				return result.data;
			},
			prepareTableHeaders() {
				return [
					{
						text: i18n.t("customList.fields.id"),
						align: "center",
						sortable: true,
						filterable: true,
						value: "id",
					},
					{
						text: i18n.t("customList.fields.name"),
						align: "start",
						sortable: true,
						filterable: true,
						value: "name",
					},
					{
						text: i18n.t("customList.fields.type"),
						align: "start",
						sortable: true,
						filterable: true,
						value: "type_name",
					},
					{
						text: i18n.t("customList.fields.items"),
						align: "start",
						sortable: true,
						filterable: false,
						value: "custom_list_items_count",
					},
					{
						text: i18n.t("common.fields.active"),
						align: "start",
						sortable: true,
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
						type_name: item.type_name,
						custom_list_items_count: item.custom_list_items_count,
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
				const params = await ParamService.getParams(this.paginated,this.filters,this.option);
				await this.$store.dispatch("custom_list/paginated", params, {root: true});
				this.setLoading(false);
			},			
			updatePaginate(data: any) {
				this.paginated.page = data;
			},
			setFilter(params: { key: string | number, value: any }) {
				this.filters = {};
				this.filters[params.key] = typeof params.value !== "undefined" ? params.value : "";
			},
			async updateParams(params: {filters: CustomListFilters, option: SortingOption}) {
				this.filters = params.filters;
				this.option = params.option;
				this.updatePaginate(1);
				await this.getPaginated();
			},
			async selectedLimit(limit: number) {
				this.paginated.limit = limit;
				this.updatePaginate(1);
				await this.getPaginated();
			},			
			async selectedOption(params: {option: SortingOption, filter: any}) {
				this.setFilter({ key: params.option.sort, value: params.filter });
				this.updatePaginate(1);
				await this.updateParams({
					filters: this.filters,
					option: params.option,
				});
			},
			async updateCurrentPage(page) {
				this.updatePaginate(page);
				await this.getPaginated();
			}
		},
		watch: {
			"paginated.page"(val, old) {
				if (val !== old) {
					this.getPaginated();
				}
			},
			filters(val, old) {},
		},		
	});
</script>
