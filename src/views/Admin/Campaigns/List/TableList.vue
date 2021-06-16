<template>
	<section>
		<v-data-table
			:headers="headers"
			:items="items"
			:items-per-page="perPage"
			item-key="advertiser"
			class="elevation-1"
			hide-default-footer
			:mobile-breakpoint="null"
		>
			<!-- ID -->
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

			<!-- ADVERTISER NAME -->
			<template v-slot:[`header.advertiser_name`]="{ header }">
				<Filterable
					field_name="advertiser_name"
					type="text"
					:filters="filters"
					:header="header"
					:option="option"
					@selected-option="selectedOption"
				></Filterable>
			</template>

			<!-- CAMPAIGN NAME -->
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

			<!-- BUDGET -->
			<template v-slot:[`header.budget`]="{ header }">
				<Filterable
					field_name="budget"
					type="number"
					:filters="filters"
					:header="header"
					:option="option"
					@selected-option="selectedOption"
				></Filterable>
			</template>

			<!-- CAMPAIGN SPEND -->
			<template v-slot:[`header.spend`]="{ header }">
				<Filterable
					field_name="spend"
					type="number"
					:filters="filters"
					:header="header"
					:option="option"
					@selected-option="selectedOption"
				></Filterable>
			</template>

			<!-- START DATE -->
			<template v-slot:[`header.start_date`]="{ header }">
				<Filterable
					field_name="start_date"
					type="text"
					:filters="filters"
					:header="header"
					:option="option"
					@selected-option="selectedOption"
				></Filterable>
			</template>

			<!-- END DATE -->
			<template v-slot:[`header.end_date`]="{ header }">
				<Filterable
					field_name="end_date"
					type="text"
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

			<!-- ASSOSIATED LINE ITEM -->
			<!-- <template v-slot:[`header.assosiateLineItem`]="{ header }">
				<v-menu :close-on-content-click="false">
					<template v-slot:activator="{ on, attrs }">
						<div v-bind="attrs" v-on="on">
							{{ header.text }}
							<v-icon>mdi-chevron-down</v-icon>
						</div>
					</template>

					<v-list subheader>
						<v-subheader>Filter</v-subheader>

						<v-list-item>
							<v-text-field
								class="label-fixed no-top"
								ref="id"
								v-model="filters.assosiateLineItem"
								type="number"
								:placeholder="header.text"
								clearable
							></v-text-field>
						</v-list-item>

						<v-divider></v-divider>

						<v-list-item>
							<v-btn
								color="secondary"
								elevation="2"
								block
								outlined
								rounded
								@click="removeFilterAssosiateLineItem()"
							>
								Remove filter
							</v-btn>
						</v-list-item>
					</v-list>
				</v-menu>
			</template> -->

			<!-- ACTIVE -->
			<template v-slot:[`item.active`]="{ item }">
				<strong class="d-flex" :class="getColor(item.active)">
					<v-icon :class="getColor(item.active)"
						>mdi-circle-medium</v-icon
					>
					{{ getActiveText(item.active) }}
				</strong>
			</template>

			<!-- BUDGET REMAINING -->
			<!-- <template v-slot:[`header.budgetRemaining`]="{ header }">
				<v-menu :close-on-content-click="false">
					<template v-slot:activator="{ on, attrs }">
						<div v-bind="attrs" v-on="on">
							{{ header.text }}
							<v-icon>mdi-chevron-down</v-icon>
						</div>
					</template>

					<v-list subheader two-line flat>
						<v-subheader>Filter</v-subheader>

						<v-list-item>
							<v-text-field
								class="label-fixed no-top"
								ref="id"
								v-model="header.budgetRemaining"
								type="number"
								:placeholder="header.text"
								clearable
							></v-text-field>
						</v-list-item>

						<v-divider></v-divider>

						<v-list-item>
							<v-btn
								color="secondary"
								elevation="2"
								block
								outlined
								rounded
								@click="removeFilterBudgetRemaining()"
							>
								Remove filter
							</v-btn>
						</v-list-item>
					</v-list>
				</v-menu>
			</template> -->

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
							name: 'CampaignEdit',
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

		<!-- PAGINATION -->
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
	import { isEmpty } from "lodash";
	import Vue from "vue";
	import Filterable from "../../../../components/Header/Tables/Filterable.vue";
	import { SortingOption } from "../../../../interfaces/paginated";

	export default Vue.extend({
		name: "TableList",
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
		components: { Filterable },
		data: function () {
			return {};
		},
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
				return active ? "Active" : "Inactive";
			},
			updatePaginate(data: Number) {
				this.$emit("update-paginate", data);
			},
			selectedOption(params: { option: SortingOption; filter: string }) {
				this.$emit("selected-option", {
					option: params.option,
					filter: params.filter,
				});
			},
		},
	});
</script>