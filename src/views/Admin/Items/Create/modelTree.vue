<template>
	<TableListModelTree
		:headers="prepareTableHeaders"
		:items="prepareTableContent"
		:title="title"
	></TableListModelTree>
</template>

<script lang="ts">
	import TableListModelTree from "../List/TableListModelTree.vue";
	import Vue from "vue";
	/*import {
			List,
			ResultPaginate,
		} from "../../../../interfaces/list";*/
	import { isNull, isUndefined } from "lodash";

	export interface ListItemModelTree {
		id?: number;
		items?: string[];
		value?: string;
		name?: string;
		actions?: [];
	}

	export default Vue.extend({
		name: "ModelTree",
		props: {},
		components: { TableListModelTree },
		data: () => ({
			title: "Table List Model Tree",
		}),
		created() {},
		async mounted() {
			const result = [];
		},
		computed: {
			getData() {
				return [
					{
						id: 1,
						items: ["item 1", "item 2", "item 3"],
						value: "Value 1",
						name: "Item List 1",
						actions: ["create", "edit", "delete"],
					},
					{
						id: 2,
						items: ["item 1", "item 2", "item 3"],
						value: "Value 2",
						name: "Item List 2",
						actions: ["create", "edit", "delete"],
					},
					{
						id: 3,
						items: ["item 1", "item 2", "item 3"],
						value: "Value 3",
						name: "Item List 3",
						actions: ["create", "edit", "delete"],
					},
				];
			},
			getLists(): ListItemModelTree[] {
				/*const result: ResultPaginate = this.getData;
					if (
						isUndefined(result) ||
						isNull(result) ||
						isUndefined(result?.data) ||
						isNull(result?.data)
					) {
						return [];
					}
					return result.data;*/
				return this.getData;
			},
			prepareTableHeaders() {
				return [
					{
						text: "ID",
						align: "center",
						sortable: false,
						filterable: true,
						value: "id",
					},
					{
						text: "List Item",
						align: "start",
						sortable: false,
						filterable: true,
						value: "items",
					},
					{
						text: "Value",
						align: "start",
						sortable: false,
						filterable: true,
						value: "value",
					},
					{
						text: "List Item Name",
						align: "start",
						sortable: false,
						filterable: true,
						value: "name",
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

				return lists.map((item: ListItemModelTree) => {
					return {
						id: item?.id,
						items: item?.items,
						value: item?.value,
						name: item?.name,
						actions: item?.actions,
					};
				});
			},
		},
		methods: {},
	});
</script>