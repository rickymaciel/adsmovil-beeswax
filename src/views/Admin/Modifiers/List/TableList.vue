<template>
	<section>
		<!-- <div class="pa-4 white--text red darken-2">
			Total: {{ items }}
		</div> -->
		<!-- <div class="pa-4 white--text grey darken-3">
			<div>filtered:</div>
			{{ filtered }}
		</div>
		<div class="pa-4 white--text grey darken-3">
			<div>items:</div>
			{{ items }}
		</div> -->
		<v-data-table
			:headers="headers"
			:items="items"
			:items-per-page="limit"
			item-key="modifiers"
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

			<!-- Update Date -->
			<template v-slot:[`header.updateDate`]="{ header }">
				<Filterable
					field_name="updated_at"
					type="text"
					:filters="filters"
					:header="header"
					:option="option"
					@selected-option="selectedOption"
				></Filterable>
			</template>

			<!-- Type -->
			<template v-slot:[`header.typeName`]="{ header }">
				<Filterable
					field_name="modifier_type_name"
					type="text"
					:filters="filters"
					:header="header"
					:option="option"
					@selected-option="selectedOption"
				></Filterable>
			</template>

			<!-- Advertiser ID -->
			<template v-slot:[`header.advertiserId`]="{ header }">
				<Filterable
					field_name="advertiser_id"
					type="text"
					:filters="filters"
					:header="header"
					:option="option"
					@selected-option="selectedOption"
				></Filterable>
			</template>

			<!-- active -->
			<template v-slot:[`item.active`]="{ item }">
				<strong class="d-flex" :class="getColor(item.active)">
					<v-icon :class="getColor(item.active)"
						>mdi-circle-medium</v-icon
					>
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
						disabled
						:to="{
							name: 'ModifiersEdit',
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
	import { ModifierOptions } from "@/interfaces/modifier";
	import Filterable from "../../../../components/Header/Tables/Filterable.vue";
	import { SortingOption } from "../../../../interfaces/paginated";
	import {
		isNull,
		orderBy,
	} from "lodash";
	import Vue from "vue";

	export default Vue.extend({
		name: "ModifiersHeader",
		props: {
			current_page: {
				type: Number,
			},
			next_page_url: {
				type: String,
			},
			path: {
				type: String,
			},
			per_page: {
				type: Number,
			},
			prev_page_url: {
				type: String,
			},
			to: {
				type: Number,
			},
			total: {
				type: Number,
			},
			headers: {
				type: Array,
				default: [],
			},
			items: {
				type: Array,
				default: [],
			},
			limit: {
				type: Number,
				default: 25,
			},
			option: {
				type: Object,
				default: function () {
					return {};
				},
			},
			filters: {
				type: Object,
				default: function () {
					return {};
				},
			},
		},
		components: {
			Filterable
		},
		data: () => ({
			radios: false,
			filter: {
				id: {
					value: "",
					order: "asc",
				},
				name: {
					value: "",
					order: "asc",
				},
				updateDate: {
					value: "",
					order: "asc",
				},
				typeName: {
					value: "",
					order: "asc",
				},
				advertiserId: {
					value: "",
					order: "asc",
				},
			},
			filtered: [],
		}),

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
		},

		methods: {
			getColor(active: Boolean) {
				return active ? "green--text" : "red--text";
			},

			getActiveText(active: Boolean) {
				return active ? "Active" : "Inactive";
			},

			updatePaginate(data: Number) {
				this.$emit("update-paginate", data);
			},

			selectedOption(params: { option: SortingOption; filter: any }) {
				this.$emit("selected-option", {
					option: params.option,
					filter: params.filter,
				});
			},
		},
	});
</script>