<template>
	<section>
		<!-- <v-card dark>
			<v-card-text>
				{{ headers }}
			</v-card-text>
		</v-card>
		<v-card dark>
			<v-card-text>
				{{ items ? items.length : "N/A" }}
			</v-card-text>
		</v-card>
		<v-card dark>
			<v-card-text>
				{{ filters }}
			</v-card-text>
		</v-card> -->
		<v-data-table
			:headers="headers"
			:items="items"
			:items-per-page="limit"
			item-key="advertiser"
			class="elevation-1"
			hide-default-footer
			:mobile-breakpoint="null"
		>
			<!-- ID -->
			<template v-slot:[`header.id`]="{ header }">
				<v-menu :close-on-content-click="false">
					<template v-slot:activator="{ on, attrs }">
						<div v-bind="attrs" v-on="on">
							{{ header.text.toUpperCase() }}
							<v-icon>mdi-chevron-down</v-icon>
						</div>
					</template>

					<v-list subheader>
						<v-subheader>Sort</v-subheader>

						<v-list-item>
							<v-text-field
								class="label-fixed no-top"
								ref="id"
								v-numeric
								v-model="filters.id"
								type="number"
								:placeholder="header.text"
								clearable
								@input="debounceInput"
							></v-text-field>
						</v-list-item>

						<v-divider></v-divider>

						<v-list-item>
							<v-radio-group
								v-model="options.order"
								@change="debounceInput"
							>
								<v-radio color="secondary" value="asc">
									<template v-slot:label>
										<div>Ascending</div>
									</template>
								</v-radio>
								<v-radio color="secondary" value="desc">
									<template v-slot:label>
										<div>Descending</div>
									</template>
								</v-radio>
							</v-radio-group>
						</v-list-item>
					</v-list>
				</v-menu>
			</template>

			<!-- ADVERTISER NAME -->
			<template v-slot:[`header.advertiser_name`]="{ header }">
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
								v-model="filters.advertiser_name"
								@input="debounceInput"
								type="text"
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
								@click="removeFilter('advertiser_name')"
							>
								Remove filter
							</v-btn>
						</v-list-item>
					</v-list>
				</v-menu>
			</template>

			<!-- CAMPAIGN NAME -->
			<template v-slot:[`header.name`]="{ header }">
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
								v-model="filters.name"
								@input="debounceInput"
								type="text"
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
								@click="removeFilter('name')"
							>
								Remove filter
							</v-btn>
						</v-list-item>
					</v-list>
				</v-menu>
			</template>

			<!-- BUDGET -->
			<template v-slot:[`header.budget`]="{ header }">
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
								v-model="filters.budget"
								@input="debounceInput"
								type="text"
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
								@click="removeFilter('budget')"
							>
								Remove filter
							</v-btn>
						</v-list-item>
					</v-list>
				</v-menu>
			</template>

			<!-- CAMPAIGN SPEND -->
			<template v-slot:[`header.spend`]="{ header }">
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
								v-model="filters.spend"
								@input="debounceInput"
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
								@click="removeFilter('spend')"
							>
								Remove filter
							</v-btn>
						</v-list-item>
					</v-list>
				</v-menu>
			</template>

			<!-- START DATE -->
			<template v-slot:[`header.start_date`]="{ header }">
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
								v-model="filters.start_date"
								@input="debounceInput"
								type="text"
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
								@click="removeFilter('start_date')"
							>
								Remove filter
							</v-btn>
						</v-list-item>
					</v-list>
				</v-menu>
			</template>

			<!-- END DATE -->
			<template v-slot:[`header.endDate`]="{ header }">
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
								v-model="filters.end_date"
								@input="debounceInput"
								type="text"
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
								@click="removeFilter('end_date')"
							>
								Remove filter
							</v-btn>
						</v-list-item>
					</v-list>
				</v-menu>
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
	import { debounce, isEmpty, isNull } from "lodash";
	import Vue from "vue";
	import {
		CampaingFilters,
		CampaingOptions,
	} from "../../../../interfaces/campaign";

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
			limit: {
				type: Number,
				default: 15,
			},
			options: {
				type: Object,
				default: function () {
					return {
						sort: "",
						order: "asc",
					} as CampaingOptions;
				},
			},
			filters_init: {
				type: Object,
				default: function () {
					return {
						name: undefined,
						budget: undefined,
						start_date: undefined,
						end_date: undefined,
						spend: undefined,
						active: undefined,
						automatic_allocation: undefined,
						alternative_id: undefined,
						advertiser_name: undefined,
						budget_type: undefined,
						currency_name: undefined,
						optimization_strategy_name: undefined,
						strategy_name: undefined,
						campaign_pacing_name: undefined,
						kpi_campaign_name: undefined,
						bid_shading_name: undefined,
						timezone_name: undefined,
						trafficker_name: undefined,
					} as CampaingFilters;
				},
			},
		},
		components: {},
		data: function () {
			return {
				radios: false,
				filters: this.filters_init,
			};
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

			getFilter(value: any): any {
				return !isNull(value) && !isEmpty(value) ? value : undefined;
			},

			debounceInput: debounce(function async(e) {
				this.emitParams();
			}, 500),

			emitParams() {
				this.$emit("update-params", {
					filters: (this as any).filters,
					options: (this as any).options,
				});
			},

			removeFilter(input: any) {
				(this as any).filters[input] = undefined;
				(this as any).emitParams();
			},
		},
	});
</script>