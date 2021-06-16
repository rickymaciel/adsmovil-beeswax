<template>
	<TableListModelTree
		:headers="prepareTableHeaders"
		:items="prepareTableContent"
		:title="title"
		:customList="customList"
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
		props: {
			customList: {
				type: Object,
				default: {},
			},
			items: {
				type: Array,
				default: [],
			},
		},
		components: { TableListModelTree },
		data: () => ({
			title: "Table List Model Tree",
		}),
		created() {},
		async mounted() {},
		computed: {
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
						value: "list_item_prefix",
					},
					{
						text: "",
						align: "start",
						sortable: false,
						filterable: true,
						value: "list_item_value",
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
				const entities = this.items;

				if (isUndefined(entities) || isNull(entities)) return [];

				return entities.map((item: any) => {
					return {
						id: item?.id,
						list_item_prefix: item?.list_item_prefix,
						list_item_prefix_text: item?.list_item_prefix_text,
						list_item_value: item?.list_item_value,
						value: item?.value,
						name: item?.name,
						actions: item?.actions,
						active: item?.active,
						status: true,
					};
				});
			},
		},
		methods: {},
	});
</script>