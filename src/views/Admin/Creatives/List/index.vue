<template>
	<v-container class="my-0">
		<v-layout column>
			<Buttons
				:limit="paginated.limit"
				@selected-limit="selectedLimit"
				to="/admin/creatives/create"
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
import ParamService from "../../../../services/params-service";
import { CreativeFilters } from "../../../../interfaces/creative";
import { Paginated, SortingOption } from "../../../../interfaces/paginated";

export default Vue.extend({
	name: "CreativesList",
	props: {},
	components: { TableList, Buttons },
	data: () => ({
		title: "Creative List",
		paginated: { page: 1, limit: 25 } as Paginated,
		filters: {},
		options: {
			sort: "id",
			order: "desc",
		} as SortingOption,
	}),
	created() {},
	async mounted() {
		await this.getPaginated();
	},
	computed: {
		getResultPaginate(): any {
			return this.$store.state.creative.result_paginate;
		},
		getData(): any[] {
			const result: any = this.getResultPaginate;
			return this.hasData(result) ? result.data : [];
		},
		prepareTableHeaders() {
			return [
				{
					text: "Id",
					align: "start",
					sortable: false,
					api_sortable: true,
					filterable: true,
					value: "id",
				},
				{
					text: "Creative Name",
					align: "start",
					sortable: false,
					api_sortable: true,
					filterable: true,
					value: "name",
				},
				{
					text: "Size",
					align: "start",
					sortable: false,
					api_sortable: true,
					filterable: true,
					value: "creative_size_name",
				},
				{
					text: "Type",
					align: "start",
					sortable: false,
					api_sortable: true,
					filterable: true,
					value: "creative_type_name",
				},
				{
					text: "Line Items",
					align: "start",
					sortable: false,
					api_sortable: true,
					filterable: true,
					value: "line_associations",
				},
				{
					text: "Thumbail",
					align: "start",
					sortable: false,
					api_sortable: true,
					filterable: false,
					value: "thumbail",
				},
				{
					text: "Active",
					align: "start",
					sortable: false,
					api_sortable: true,
					filterable: true,
					value: "active",
				},
				{
					text: "",
					align: "start",
					sortable: false,
					api_sortable: true,
					value: "actions",
					width: "5%",
				},
			];
		},
		prepareTableContent() {
			const entities = this.getData;

			if (isUndefined(entities) || isNull(entities)) return [];

			return entities.map((entity: any) => {
				return {
					id: entity?.id,
					name: entity?.name,
					creative_size_name: entity?.creative_size_name,
					creative_type_name: entity?.type?.description,
					line_associations: entity?.line_associations?.length,
					thumbail: entity?.creative_thumbnail_url,
					active: entity?.active,
				};
			});
		},
	},
	methods: {
		setLoading(_loading: Boolean) {
			this.$store.state.proccess.loading = _loading;
		},
		hasData(result: { data: any }): Boolean {
			return (
				!isUndefined(result) &&
				!isNull(result) &&
				!isUndefined(result.data) &&
				!isNull(result.data)
			);
		},
		async getPaginated() {
			this.setLoading(true);
			await this.$store.dispatch(
				"creative/paginated",
				await ParamService.getParams(
					this.paginated,
					this.filters,
					this.options
				)
			);
			this.setLoading(false);
		},
		updatePaginate(data: any) {
			this.paginated.page = data;
		},
		async setFilter(params: { key: string | number; value: any }) {
			this.filters = {};
			this.filters[params.key] = !isUndefined(params.value)
				? params.value
				: "";
		},
		async selectedOption(params: { option: SortingOption; filter: any }) {
			await this.setFilter({
				key: params.option.sort,
				value: params.filter,
			});
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
			filters: CreativeFilters;
			option: SortingOption;
		}) {
			this.filters = params.filters;
			this.options = params.option;
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
