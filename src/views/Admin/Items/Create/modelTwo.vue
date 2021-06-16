<template>
	<TableListModelTwo
		:headers="prepareTableHeaders"
		:items="prepareTableContent"
		:title="title"
		:customList="customList"
	></TableListModelTwo>
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
		actions?: [];
	}

	export default Vue.extend({
		name: "ModelTwo",
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
		components: { TableListModelTwo },
		data: () => ({
			title: "Table List Model Two",
		}),
		created() {},
		async mounted() {},
		computed: {
			getData() {
				this.items;
			},
			getLists(): any[] {
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
				const entities = this.items;
				
				if (isUndefined(entities) || isNull(entities)) return [];
				
				let result = entities.map((item: any) => {
					if( item?.list_item?.lat !== undefined && item?.list_item?.long !== undefined ){
						return {
							id: item?.id,
							latitude: item?.list_item?.lat,
							longitude: item?.list_item?.long,
							radius: item?.list_item?.radius_km,
							value: item?.value,
							name: item?.name,
							actions: [],
							active: item?.active,
							status: true,
						};
					}
				});
				
				return result.filter(e => {return e !== undefined});
			},
		},
		methods: {},
	});
</script>