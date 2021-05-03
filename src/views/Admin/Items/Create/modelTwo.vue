<template>
	<v-container class="my-0">
		<v-layout column>
			<TableListModelTwo
				:headers="prepareTableHeaders"
				:items="prepareTableContent"
				:title="title"
			></TableListModelTwo>
		</v-layout>
	</v-container>
</template>

<script lang="ts">
	import TableListModelTwo from "./../List/TableListModelTwo.vue";
	import Vue from "vue";
	/*import {
		List,
		ResultPaginate,
	} from "../../../../interfaces/list";*/
	import { isNull, isUndefined } from "lodash";

	export interface ListItemModelTwo {
		id?: number;
		latitude?: string;
		longitude?: string;
		radius?: string;
		value?: string;
		name?: string;
		actions?:[]
	}

	export default Vue.extend({
		name: "ModelTwo",
		props: {},
		components: { TableListModelTwo },
		data: () => ({
			title: "Table List Model Two",
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
						latitude: "12.345",
						longitude: "54.321",
						radius: "0.5",
						value: "Value 1",
						name: "Item List 1",
						actions:["create", "edit", "delete"]
					},
					{
						id: 2,
						latitude: "12.345",
						longitude: "54.321",
						radius: "0.5",
						value: "Value 2",
						name: "Item List 2",
						actions:["create", "edit", "delete"]
					},
					{
						id: 3,
						latitude: "12.345",
						longitude: "54.321",
						radius: "0.5",
						value: "Value 3",
						name: "Item List 3",
						actions:["create", "edit", "delete"]
					}
				]
			},
			getLists(): ListItemModelTwo[] {
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
						text: "Latitude",
						align: "start",
						sortable: false,
						filterable: true,
						value: "latitude",
					},
					{
						text: "Longitude",
						align: "start",
						sortable: false,
						filterable: true,
						value: "longitude",
					},
					{
						text: "Radius",
						align: "start",
						sortable: false,
						filterable: true,
						value: "radius",
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

				return lists.map((item: ListItemModelTwo) => {
					return {
						id: item?.id,
						latitude: item?.latitude,
						longitude: item?.longitude,
						radius: item?.radius,
						value: item?.value,
						name: item?.name,
						actions: item?.actions
					};
				});
			},
		},
		methods: {},
	});
</script>