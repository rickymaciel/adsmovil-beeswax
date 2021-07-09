<template>
	<TableListModelOne
		:headers="prepareTableHeaders"
		:items="prepareTableContent"
		:title="title"
		:customList="customList"
	></TableListModelOne>
</template>

<script lang="ts">
	import TableListModelOne from "./../List/TableListModelOne.vue";
	import Vue from "vue";
	import { isNull, isUndefined } from "lodash";

	export interface ListItemModelOne {
		id?: number;
		value?: string;
		list_item?: string;
		name?: string;
		success?: boolean;// representa un estado que indicará si hay o no errores
		status?: boolean,
		message?: string,
		errors?: any[],
		actions?: any[];
	}

	export default Vue.extend({
		name: "ModelOne",
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
		components: { TableListModelOne },
		data: () => ({
			title: "Table List Model One",
		}),
		created() {},
		async mounted() {},
		computed: {
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
						text: "List Item",
						align: "start",
						sortable: false,
						filterable: true,
						value: "list_item",
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
						list_item: item?.list_item,
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