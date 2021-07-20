<template>
	<section>
		<v-data-table
			:headers="headers"
			:items="items"
			:items-per-page="perPage"
			item-key="lists"
			class="elevation-1"
			hide-default-footer
			:mobile-breakpoint="null"
		>
			<!-- LABEL -->

			<!-- id -->
			<template v-slot:[`header.id`]="{ header }">
				<Filterable
					field_name="id"
					type="number"
					:filters="filters"
					:header="header"
					:option="option"
					@selected-option="selectedOption"
				></Filterable>
			</template>

			<!-- name -->
			<template v-slot:[`header.name`]="{ header }">
				<Filterable
					field_name="name"
					type="text"
					:filters="filters"
					:header="header"
					:option="option"
					@selected-option="selectedOption"
				></Filterable>
			</template>

			<!-- type_name -->
			<template v-slot:[`header.type_name`]="{ header }">
				<Filterable
					field_name="type_name"
					type="text"
					:filters="filters"
					:header="header"
					:option="option"
					@selected-option="selectedOption"
				></Filterable>
			</template>

			<!-- items -->
			<template v-slot:[`header.custom_list_items_count`]="{ header }">
				<Filterable
					field_name="custom_list_items_count"
					type="number"
					:filters="filters"
					:header="header"
					:option="option"
					@selected-option="selectedOption"
				></Filterable>
			</template>
			<!-- active -->
			<template v-slot:[`header.active`]="{ header }">
				<Filterable
					field_name="active"
					type="text"
					:filters="filters"
					:header="header"
					:option="option"
					:filter_by_active="true"
					@selected-option="selectedOption"
				></Filterable>
			</template>

			<!-- ITEMS -->

			<!-- active -->
			<template v-slot:[`item.active`]="{ item }">
				<strong class="d-flex" :class="getColor(item.active)">
					<v-icon :class="getColor(item.active)">mdi-circle-medium</v-icon>
					{{ getActiveText(item.active) }}
				</strong>
			</template>

			<template v-slot:[`item.actions`]="{ item }">
				<v-card-actions>
					<v-btn
						color="secondary"
						elevation="0"
						medium
						raised
						rounded
						text
						icon
						:to="{
							name: 'CustomListEdit',
							params: { id: item.id },
						}"
					>
						<v-icon small class="secondary--text">
							mdi-pencil
						</v-icon>
					</v-btn>
				</v-card-actions>
			</template>
		</v-data-table>
		<div v-if="items.length" class="text-center py-8">
			<v-pagination
				v-model="currentPage"
				:length="getLength"
				@input="updatePaginate"
			></v-pagination>
		</div>		
	</section>
</template>

<script lang="ts">
	import Filterable from "../../../../components/Header/Tables/Filterable.vue";
	import { SortingOption } from "@/interfaces/paginated";
	import { isEmpty } from "lodash";
	import i18n from "@/plugins/i18n";
	import Vue from "vue";

	export default Vue.extend({
		name: "ListsHeader",
		props: {
			current_page: { type: Number },
			next_page_url: { type: String },
			path: { type: String },
			per_page: { type: Number },
			prev_page_url: { type: String },
			to: { type: Number },
			total: { type: Number },
			headers: { type: Array, default: [] },
			items: { type: Array, default: [] },
			option: { type: Object, default: () => ({})},
			filters: { type: Object, default: () => ({})},
		},
		components: { Filterable },
		
		data: () => ({}),
		
		created() {},
		
		mounted() {},

		computed: {
			
			currentPage: {
				set(val) {
					this.$emit("update-current-page", val);
				},
				get() {
					return this.current_page;
				},
			},
			
			getLength() {
				return Math.ceil(this.total / this.per_page);
			},
			
			perPage() {
				return !isNaN(this.per_page) && isEmpty(this.per_page)
					? this.per_page
					: 25;
			},
		},

		methods: {
			getColor(active: Boolean) {
				return active ? "green--text" : "red--text";
			},
			getActiveText(active: Boolean) {
				return active ? i18n.t("common.fields.active") : i18n.t("common.fields.inactive");
			},
			updatePaginate(data: Number) {
				this.$emit("update-paginate", data);
			},
			selectedOption(params: { option: SortingOption, filter: any }) {
				this.$emit("selected-option", {option: params.option, filter: params.filter});
			},
		},
	});
</script>
