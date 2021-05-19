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
	import Buttons from "./Buttons.vue";
	import Vue from "vue";
	// import {
	// 	Advertiser,
	// 	AdvertiserFilters,
	// 	AdvertiserOptions,
	// 	ResultPaginate,
	// } from "../../../../interfaces/advertiser";
	import { isNull, isUndefined } from "lodash";

	export default Vue.extend({
		name: "CreativesList",
		props: {},
		components: { TableList, Buttons },
		data: () => ({
			title: "Creatives List",
		}),
		created() {},
		async mounted() {
			/*this.setLoading(true);
			const result = await this.dispatchAll();
			this.setLoading(false);*/
		},
		computed: {
			getResultPaginate(): any {
				//return this.$store.state.lineItem.result_paginate;
				return {
					current_page: 1,
					first_page_url: "",
					from: 0,
					last_page: 0,
					last_page_url: "",
					next_page_url: "",
					path: "",
					per_page: 25,
					prev_page_url: "",
					to: 2,
					total: 100,
					data: [
						{
							id: 1,
							name: "Creativo 320x480",
							size: "320x480",
							type: "Banner",
							lineItems: 1,
							thumbail: "URL_1",
							active: true,
						},
						{
							id: 2,
							name: "Creativo de prueba",
							size: "0x0",
							type: "Video",
							lineItems: 3,
							thumbail: "URL_2",
							active: false,
						},
						{
							id: 3,
							name: "Creativo Coca",
							size: "320x480",
							type: "Banner",
							lineItems: 1,
							thumbail: "URL_1",
							active: false,
						},
						{
							id: 4,
							name: "Creativo Test Drive",
							size: "720x480",
							type: "Content",
							lineItems: 5,
							thumbail: "URL_4",
							active: true,
						},
						{
							id: 5,
							name: "Palomitas de maíz",
							size: "240x140",
							type: "Footer",
							lineItems: 2,
							thumbail: "URL_5",
							active: true,
						},
					],
				}
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
				return result.data;
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
						id: entity.id,
						name: entity.name,
						size: entity.size,
						type: entity.type,
						lineItems: entity.lineItems,
						thumbail: entity.thumbail,
						active: entity.active,
					};
				});
			},
		},
		methods: {
			/*setLoading(_loading: Boolean) {
				this.$store.state.proccess.loading = _loading;
			},
			async dispatchAll(
				filters?: AdvertiserFilters,
				options?: AdvertiserOptions
			) {
				return this.$store.dispatch("lineItem/getAll", filters, options, {
					root: true,
				});
			},*/
		},
	});
</script>