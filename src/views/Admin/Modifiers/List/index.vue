<template>
	<v-container class="my-0">
		<v-layout column>
			<Buttons
				:limit="paginated.limit"
				@selected-limit="selectedLimit"
				to="/admin/modifiers/create"
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
				:filters="filters"
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
	import {
		Modifier,
		ModifierFilters,
		ModifierOptions,
		ResultPaginate,
	} from "../../../../interfaces/modifier";
	import { isNull, isUndefined } from "lodash";
	import { Paginated, SortingOption } from "@/interfaces/paginated";
	import ParamService from "../../../../services/params-service";

	export default Vue.extend({
		name: "ModifiersList",
		props: {},
		components: { TableList, Buttons },
		data: () => ({
			title: "List",
			paginated: {
					page: 1,
					limit: 25,
				} as Paginated,
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
			getResultPaginate(): ResultPaginate {
				return this.$store.state.modifier.result_paginate;
			},
			getModifiers(): Modifier[] {
				const result: ResultPaginate = this.getResultPaginate;
				if (
					isUndefined(result) ||
					isNull(result) ||
					isUndefined(result.data) ||
					isNull(result.data)
				) {
					return [];
				}
				return result.data.sort(function(a,b){return b.id-a.id});;
				//return this.getResultPaginate.data;
			},
			prepareTableHeaders() {
				return [
					{
						text: "Id",
						align: "center",
						sortable: true,
						filterable: true,
						value: "id",
					},
					{
						text: "Name",
						align: "start",
						sortable: true,
						filterable: true,
						value: "name",
					},
					{
						text: "Update Date",
						align: "start",
						sortable: true,
						filterable: true,
						value: "updateDate",
					},
					{
						text: "Type",
						align: "start",
						sortable: true,
						filterable: true,
						value: "typeName",
					},
					{
						text: "Advertiser ID",
						align: "start",
						sortable: true,
						filterable: true,
						value: "advertiserId",
					},
					{
						text: "Active",
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
				const modifiers = this.getModifiers;

				if (isUndefined(modifiers) || isNull(modifiers)) return [];

				return modifiers.map((modifier: Modifier) => {
					return {
						id: modifier.id,
						name: modifier.name,
						//updateDate: modifier.updateDate.format("dd/MM/YYYY HH:mm:ss"),
						updateDate: this.toFormatDate(modifier.updated_at),
						typeName: modifier.type.type,
						advertiserId: modifier.advertiser.id,
						active: modifier.active,
					};
				});
			},
		},
		methods: {
			setLoading(_loading: Boolean) {
				this.$store.state.proccess.loading = _loading;
			},
			async getPaginated() {
				return this.$store.dispatch(
					"modifier/paginated",
					await ParamService.getParams(
						this.paginated,
						this.filters,
						this.options
					),
					{
						root: true,
					}
				);
			},
			toFormatDate(d: Date) {
				if (!d) {
					return "";
				}
				// Aquí sugiero que si hay un App Settings
				// tengamos la cadena de formato para fechas y/o Horas establecidas como parámetro global
				return this.moment(d).format("YYYY-MM-DD HH:mm:ss");
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
			async selectedLimit(limit: number) {
				this.paginated.limit = limit;
				this.updatePaginate(1);
				await this.getPaginated();
			},
			async updateParams(params: {
				filters: ModifierFilters;
				options: SortingOption;
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