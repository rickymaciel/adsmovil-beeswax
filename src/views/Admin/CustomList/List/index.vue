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
	import { isNull, isUndefined } from "lodash";
	import {
		CustomList,
		CustomListFilters,
		CustomListOptions,
		CustomListPaginated,
		CustomListResultPaginate,
	} from "../../../../interfaces/custom_list";

	export default Vue.extend({
		name: "Lists",
		props: {},
		components: { TableList, Buttons },
		data: () => ({
			title: "Lists",
			custom_list_paginated: {
				page: 1,
				limit: 15,
			} as CustomListPaginated,
		}),
		created() {},
		async mounted() {
			this.setLoading(true);
			await this.dispatchAll();
			this.setLoading(false);
		},
		computed: {
			getResultPaginate(): CustomListResultPaginate {
				return this.$store.state.custom_list.custom_list_result_paginate;
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
			async dispatchAll(
				custom_list_paginated: CustomListPaginated,
				filters?: CustomListFilters,
				options?: CustomListOptions
			) {
				return this.$store.dispatch(
					"custom_list/getPaginated",
					custom_list_paginated,
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
