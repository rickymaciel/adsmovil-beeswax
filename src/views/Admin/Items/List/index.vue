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
	import TableList from "./TableListModelOne.vue";
	import Buttons from "../List/Buttons.vue";
	import Vue from "vue";
	import {
		List,
		ListFilters,
		ListOptions,
		ResultPaginate,
	} from "../../../../interfaces/list";
	import { isNull, isUndefined, rest } from "lodash";
	import { list } from "@/api/custom_list/items/ListItemsAPI";

	export default Vue.extend({
		name: "Lists",
		props: {},
		components: { TableList, Buttons },
		data: () => ({
			title: "Lists",
		}),
		created() {},
		async mounted() {
			/*this.setLoading(true);
			const result = await this.dispatchAll();
			this.setLoading(false);*/
			const result = [];
		},
		computed: {
			getResultPaginate(): ResultPaginate {
				//return this.$store?.state?.lists?.result_paginate;
				return {
					current_page: 1,
					next_page_url: "",
					path: "",
					per_page: 10,
					prev_page_url: "",
					to: 11,
					total: 40,
					data: [
						{
							id: 1,
							name: "List 1",
							type: {name: "Type 1"},
							items: ["Item 1A","Item 2A","Item 3A"],
							active: true,
							actions:["create", "edit", "delete"]
						},
						{
							id: 2,
							name: "List 2",
							type: {name: "Type 2"},
							items: ["Item 2B","Item 2B","Item 2B"],
							active: false,
							actions:["create", "edit", "delete"]
						},
						{
							id: 3,
							name: "List 3",
							type: {name: "Type 3"},
							items: ["Item 3A","Item 3B","Item 3C"],
							active: true,
							actions:["create", "edit", "delete"]
						},
						{
							id: 4,
							name: "List 4",
							type: {name: "Type 4"},
							items: ["Item 4A","Item 4B","Item 4C"],
							active: false,
							actions:["create", "edit", "delete"]
						},
						{
							id: 5,
							name: "List 5",
							type: {name: "Type 5"},
							items: ["Item 5A","Item 5B","Item 5C"],
							active: true,
							actions:["create", "edit", "delete"]
						}
					],
				}
			},
			getLists(): List[] {
				/*const result: ResultPaginate = this.getResultPaginate;
				if (
					isUndefined(result) ||
					isNull(result) ||
					isUndefined(result?.data) ||
					isNull(result?.data)
				) {
					return [];
				}
				return result.data;*/
				return this.getResultPaginate.data;
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
						text: "List Type",
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
						value: "items",
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

				return lists.map((item: List) => {
					return {
						id: item?.id,
						name: item?.name,
						type: item?.type?.name,
						items: item?.items,
						active: item?.active,
						appbundle: item?.actions,
					};
				});
			},
		},
		methods: {
			setLoading(_loading: Boolean) {
				this.$store.state.proccess.loading = _loading;
			},
			async dispatchAll(
				filters?: ListFilters,
				options?: ListOptions
			) {
				return this.$store.dispatch("lists/getAll", filters, options, {
					root: true,
				});
			},
		},
	});
</script>
