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
	import Buttons from "../../Commons/Buttons.vue";
	import Vue from "vue";
	import { isNull, isUndefined } from "lodash";
	import ParamService from "../../../../services/params-service";
	import {
		CreativePaginated,
		CreativeFilters,
		CreativeOptions,
	} from "../../../../interfaces/creative";
	import { SortingOption } from "../../../../interfaces/paginated";

	export default Vue.extend({
		name: "CreativesList",
		props: {},
		components: { TableList, Buttons },
		data: () => ({
			title: "Creatives List",
			paginated: { page: 1, limit: 25 } as CreativePaginated,
			filters: {},
			options: {
				sort: "",
				order: "asc",
			} as SortingOption,
		}),
		created() {},
		async mounted() {
			this.setLoading(true);
			await this.getPaginated();
			this.setLoading(false);
		},
		computed: {
			getResultPaginate(): any {
				return this.$store.state.creative.result_paginate;
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
				return result.data.sort(function (a, b) {
					return a.id - b.id;
				});
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
						text: "Creative Name",
						align: "start",
						sortable: false,
						filterable: true,
						value: "name",
					},
					{
						text: "Size",
						align: "center",
						sortable: false,
						filterable: true,
						value: "size",
					},
					{
						text: "Type",
						align: "start",
						sortable: false,
						filterable: true,
						value: "type",
					},
					{
						text: "Line Items",
						align: "center",
						sortable: false,
						filterable: true,
						value: "lineItems",
					},
					{
						text: "Thumbail",
						align: "center",
						sortable: false,
						filterable: false,
						value: "thumbail",
					},
					{
						text: "Active",
						align: "center",
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
				const entities = this.getEntities;

				if (isUndefined(entities) || isNull(entities)) return [];

				return entities.map((entity: any) => {
					return {
						id: entity?.id,
						name: entity?.name,
						size: entity?.creative_size_name,
						type: entity?.type?.description,
						lineItems: entity?.line_associations?.length,
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

			async getPaginated() {
				this.setLoading(true);
				await this.$store.dispatch(
					"creative/paginated",
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
				filters: CreativeFilters;
				options: CreativeOptions;
			}) {
				this.filters = params.filters;
				this.options = params.options;
				this.updatePaginate(1);
				await this.getPaginated();
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