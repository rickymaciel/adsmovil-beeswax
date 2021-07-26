<template>
	<v-container class="my-0">
		<v-layout column>
			<!-- <v-card>option: {{ option }}</v-card>
			<v-card>filters: {{ filters }}</v-card> -->
			<Buttons
				:limit="paginated.limit"
				@selected-limit="selectedLimit"
				@download-list="handleDownload"
				to="/admin/users/create"
			></Buttons>
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
				:option="option"
				:filters="filters"
				@selected-option="selectedOption"
				@update-paginate="updatePaginate"
			></TableList>
		</v-layout>
	</v-container>
</template>

<script lang="ts">
	import TableList from "./TableList.vue";
	import Buttons from "../../Commons/Buttons.vue";
	import Vue from "vue";
	import {
		User,
		UserFilters,
	} from "../../../../interfaces/user";
	import {
		SortingOption,
		Paginated,
		ResultPaginate,
	} from "../../../../interfaces/paginated";
	import { isNull, isUndefined } from "lodash";
	import ParamService from "../../../../services/params-service";
	import i18n from "@/plugins/i18n";

	export default Vue.extend({
		name: "UserList",
		props: {},
		components: { TableList, Buttons },
		data: function () {
			return {
				title: "List",
				paginated: {
					page: 1,
					limit: 25,
				} as Paginated,
				filters: {},
				option: {
					sort: "",
					order: "asc",
				} as SortingOption,
			};
		},
		created() {},
		async mounted() {
			await this.getPaginated();
		},
		computed: {
			getFilters() {
				return this.filters;
			},
			getResultPaginate(): ResultPaginate {
				return this.$store.state.user.result_paginate;
			},
			getUsers(): User[] {
				const result: ResultPaginate = this.getResultPaginate;
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
						text: "ID",
						align: "center",
						sortable: false,
						api_sortable: true,

						filterable: true,
						value: "id",
						//width: "5%",
					},
					{
						text: i18n.t("users.fields.name"),
						align: "start",
						sortable: false,
						api_sortable: true,

						filterable: true,
						value: "name",
						//width: "20%",
					},
					{
						text: i18n.t("users.fields.last_name"),
						align: "start",
						sortable: false,
						api_sortable: true,

						filterable: true,
						value: "last_name",
						//width: "20%",
					},
					{
						text: "E-mail",
						align: "start",
						sortable: false,
						api_sortable: true,

						filterable: true,
						value: "email",
					},
					{
						text: i18n.t("users.fields.role"),
						align: "start",
						sortable: false,
						api_sortable: true,

						filterable: true,
						value: "role_description",
					},
					{
						text: i18n.t("common.fields.active"),
						align: "start",
						sortable: false,
						api_sortable: true,

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
				const users = this.getUsers;

				if (isUndefined(users) || isNull(users)) return [];

				return users.map((user: User) => {
					return {
						id: user.id,
						name: !!user.name ? user.name : 'N/A',
						last_name: !!user.last_name ? user.last_name : 'N/A',
						email: user.email,
						role_description: user.role_description,
						active: !!user.active						
					};
				});
			},
		},
		methods: {
			setLoading(_loading: Boolean) {
				this.$store.state.proccess.loading = _loading;
			},
			async getPaginated() {
				this.setLoading(true);
				await this.$store.dispatch(
					"user/paginated",
					await ParamService.getParams(
						this.paginated,
						this.filters,
						this.option
					),
					{
						root: true,
					}
				);
				this.setLoading(false);
			},
			updatePaginate(data: any) {
				this.paginated.page = data;
			},
			setFilter(params: { key: string | number, value: any }) {
				this.filters = {};
				this.filters[params.key] = typeof params.value !== "undefined" ? params.value : "";
			},
			async selectedOption(params: {option: SortingOption, filter: any}) {
				this.setFilter({key: params.option.sort, value: params.filter});
				this.updatePaginate(1);
				await this.updateParams({
					filters: this.filters,
					option: params.option,
				});
			},
			async selectedLimit(limit: number) {
				this.paginated.limit = limit;
				this.updatePaginate(1);
				await this.getPaginated();
			},
			async updateParams(params: {filters: UserFilters,option: SortingOption}) {
				this.filters = params.filters;
				this.option = params.option;
				this.updatePaginate(1);
				await this.getPaginated();
			},
			async handleDownload() {
				this.setLoading(true);
				await this.$store.dispatch(
					'user/download',
					await ParamService.getParams(
						this.paginated,
						this.filters,
						this.option
					),
					{root: true}					
				);
				this.setLoading(false);
			}
		},
		watch: {
			"paginated.page"(val, old) {
				if (val !== old) {
					this.getPaginated();
				}
			},
			filters(val, old) {},
		},
	});
</script>
