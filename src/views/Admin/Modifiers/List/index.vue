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
			async getPaginated(
				filters?: ModifierFilters,
				options?: ModifierOptions
			) {
				return this.$store.dispatch(
					"modifier/paginated",
					filters,
					options,
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
		},
	});
</script>