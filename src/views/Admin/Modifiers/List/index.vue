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
	import {
		Modifier,
		ModifierFilters,
		ModifierOptions,
		ResultPaginate,
	} from "../../../../interfaces/modifier";
	import { isNull, isUndefined } from "lodash";
	export default Vue.extend({
		name: "ModifiersList",
		props: {},
		components: { TableList, Buttons },
		data: () => ({
			title: "List",
		}),
		created() {},
		async mounted() {
			this.setLoading(true);
			const result = await this.dispatchAll();
			this.setLoading(false);
		},
		computed: {
			getResultPaginate(): ResultPaginate {
				//return this.$store.state.modifier.result_paginate;
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
							name: "Modifier 1",
							type: {
								id: 1,
								type: "Bid",
								description: "",
								extra: "",
							},
							created_at: new Date().toString(),
							updated_at: new Date().toString(),
							active: true,
							advertiser: {
								id: 1,
								external_id: 1,
								account_id: 1,
								name: "string",
								domain: "string",
								category_id: 1,
								app_bundle: "string",
								currency_id: 1,
								active: true,
								created_by: 1,
								updated_by: 1,
								deleted_by: "string",
								created_at: "string",
								updated_at: "string",
							},
							external_id: 1,
							alternative_id: 1,
							account_id: 1,
							advertiser_id: 1,
							modifier_type_id: 1,
							created_by: 1,
							updated_by: 1,
							deleted_by: "",
						},
					],
				};
			},
			getModifiers(): Modifier[] {
				/*const result: ResultPaginate = this.getResultPaginate;
														if (
															isUndefined(result) ||
															isNull(result) ||
															isUndefined(result.data) ||
															isNull(result.data)
														) {
															return [];
														}
														return result.data;*/
				return this.getResultPaginate.data;
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
			async dispatchAll(
				filters?: ModifierFilters,
				options?: ModifierOptions
			) {
				return this.$store.dispatch("modifier/getAll", filters, options, {
					root: true,
				});
			},
			toFormatDate(d: Date) {
				if (!d) {
					return "";
				}
				// Aquí sugiero que si hay un App Settings
				// tengamos la cadena de formato para fechas y/o Horas establecidas como parámetro global
				return this.moment(d).format("YYYY-MM-DD HH:mm:ss");
			},
		},
	});
</script>
