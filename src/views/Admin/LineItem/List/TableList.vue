<template>
	<section>
		<v-data-table
			:headers="headers"
			:items="items"
			:items-per-page="limit"
			item-key="lineitem"
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

			<!-- CAMPAIGN NAME -->
			<template v-slot:[`header.campaign_name`]="{ header }">
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
								v-model="filters.campaign_name"
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
								@click="removeFilter('campaign_name')"
							>
								Remove filter
							</v-btn>
						</v-list-item>
					</v-list>
				</v-menu>
			</template>

			<!-- LINE ITEM NAME -->
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

			<!-- LINE ITEM TYPE -->
			<template v-slot:[`header.line_item_type_name`]="{ header }">
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
								v-model="filters.line_item_type_name"
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
								@click="removeFilter('line_item_type_name')"
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
								@click="removeFilter('budget')"
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
			<template v-slot:[`header.end_date`]="{ header }">
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
			<template v-slot:[`header.assosiated_creatives`]="{ header }">
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
								v-model="filters.assosiated_creatives"
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
								@click="removeFilter('assosiated_creatives')"
							>
								Remove filter
							</v-btn>
						</v-list-item>
					</v-list>
				</v-menu>
			</template>

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
			<template v-slot:[`header.budget_remaining`]="{ header }">
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
								v-model="header.budget_remaining"
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
								@click="removeFilter('budget_remaining')"
							>
								Remove filter
							</v-btn>
						</v-list-item>
					</v-list>
				</v-menu>
			</template>

			<!-- WINNING -->
			<template v-slot:[`header.winning`]="{ header }">
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
								v-model="header.winning"
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
								@click="removeFilter('winning')"
							>
								Remove filter
							</v-btn>
						</v-list-item>
					</v-list>
				</v-menu>
			</template>

			<!-- BIDDING -->
			<template v-slot:[`header.bidding`]="{ header }">
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
								v-model="header.bidding"
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
								@click="removeFilter('bidding')"
							>
								Remove filter
							</v-btn>
						</v-list-item>
					</v-list>
				</v-menu>
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
							name: 'LineItemEdit',
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
		LineItemFilters,
		LineItemOptions,
	} from "../../../../interfaces/line_item";

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
				default: 25,
			},
			options: {
				type: Object,
				default: function () {
					return {
						sort: "",
						order: "asc",
					} as LineItemOptions;
				},
			},
			filters_init: {
				type: Object,
				default: function () {
					return {
						id: undefined,
						name: undefined,
						alternative_id: undefined,
						start_date: undefined,
						end_date: undefined,
						budget: undefined,
						daily_budget: undefined,
						fix_cpm: undefined,
						cpm_bid: undefined,
						target_ecpc: undefined,
						target_ctr: undefined,
						target_vcr: undefined,
						active: undefined,
						external_id: undefined,
						spend: undefined,
						created_by: undefined,
						updated_by: undefined,
						deleted_by: undefined,
						created_at: undefined,
						updated_at: undefined,
						deleted_at: undefined,
						account_id: undefined,
						advertiser_id: undefined,
						campaign_id: undefined,
						line_item_type_id: undefined,
						budget_type_id: undefined,
						strategy_id: undefined,
						bid_strategy_id: undefined,
						line_pacing_id: undefined,
						bid_shading_id: undefined,
						creative_method_id: undefined,
						advertiser_name: undefined,
						budget_type: undefined,
						campaign_name: undefined,
						line_item_type_name: undefined,
						strategy_name: undefined,
						line_pacing_name: undefined,
						bid_strategy_name: undefined,
						bid_shading_name: undefined,
						creative_method_name: undefined,
						budget_remaining: undefined,
						clicks: undefined,
						conversion_orders: undefined,
						conversion_value: undefined,
						conversions: undefined,
						cost_per_acquisition: undefined,
						cost_per_acquisition_usd: undefined,
						cpm: undefined,
						ctr: undefined,
						gross_margin: undefined,
						impressions: undefined,
						net_margin: undefined,
						update_date: undefined,
						vcpm: undefined,
						video_complete_percent: undefined,
						video_completes: undefined,
						video_plays: undefined,
						viewable_impressions: undefined,
						viewable_percent: undefined,
						clicks_lifetime: undefined,
						conversion_orders_lifetime: undefined,
						conversion_value_lifetime: undefined,
						conversions_lifetime: undefined,
						cost_per_acquisition_lifetime: undefined,
						cost_per_acquisition_lifetime_usd: undefined,
						cpm_lifetime: undefined,
						ctr_lifetime: undefined,
						gross_margin_lifetime: undefined,
						impressions_lifetime: undefined,
						net_margin_lifetime: undefined,
						spend_lifetime: undefined,
						vcpm_lifetime: undefined,
						video_complete_percent_lifetime: undefined,
						video_completes_lifetime: undefined,
						video_plays_lifetime: undefined,
						viewable_impressions_lifetime: undefined,
						viewable_percent_lifetime: undefined
					} as LineItemFilters;
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