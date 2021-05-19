<template>
	<section>
		<v-data-table
			:headers="headers"
			:items="filteredData"
			item-key="lineItem"
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
								v-model="filter.id.value"
								type="number"
								:placeholder="header.text"
								clearable
							></v-text-field>
						</v-list-item>

						<v-divider></v-divider>

						<v-list-item>
							<v-radio-group v-model="filter.id.order">
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
			<template v-slot:[`header.campaignName`]="{ header }">
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
								v-model="filter.campaignName.value"
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
								@click="removeFilterCampaignName()"
							>
								Remove filter
							</v-btn>
						</v-list-item>
					</v-list>
				</v-menu>
			</template>

			<!-- LINE NAME -->
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
								v-model="filter.name.value"
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
								@click="removeFilterName()"
							>
								Remove filter
							</v-btn>
						</v-list-item>
					</v-list>
				</v-menu>
			</template>

			<!-- LINE ITEM TYPE -->
			<template v-slot:[`header.lineItemType`]="{ header }">
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
								v-model="filter.lineItemType.value"
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
								@click="removeFilterLineItemType()"
							>
								Remove filter
							</v-btn>
						</v-list-item>
					</v-list>
				</v-menu>
			</template>

			<!-- LINE ITEM BUDGET -->
			<template v-slot:[`header.lineItemBudget`]="{ header }">
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
								v-model="filter.lineItemBudget.value"
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
								@click="removeFilterLineItemBudget()"
							>
								Remove filter
							</v-btn>
						</v-list-item>
					</v-list>
				</v-menu>
			</template>

			<!-- START DATE -->
			<template v-slot:[`header.startDate`]="{ header }">
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
								v-model="filter.startDate.value"
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
								@click="removeFilterStartDate()"
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
								v-model="filter.endDate.value"
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
								@click="removeFilterEndDate()"
							>
								Remove filter
							</v-btn>
						</v-list-item>
					</v-list>
				</v-menu>
			</template>

			<!-- EASSOCIATED LI -->
			<template v-slot:[`header.associatedLI`]="{ header }">
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
								v-model="filter.associatedLI.value"
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
								@click="removeFilterAssociatedLI()"
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
			
			<!-- BUDGET REMAIN -->
			<template v-slot:[`header.budgetRemain`]="{ header }">
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
								v-model="filter.budgetRemain.value"
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
								@click="removeFilterBudgetRemain()"
							>
								Remove filter
							</v-btn>
						</v-list-item>
					</v-list>
				</v-menu>
			</template>

			<!-- WINNING N. -->
			<template v-slot:[`header.winningN`]="{ header }">
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
								v-model="filter.winningN.value"
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
								@click="removeFilterWinningN()"
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
								v-model="filter.bidding.value"
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
								@click="removeFilterBidding()"
							>
								Remove filter
							</v-btn>
						</v-list-item>
					</v-list>
				</v-menu>
			</template>

			<!-- ACTIONS -->
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
					>
						<v-icon small class="secondary--text">
							mdi-pencil
						</v-icon>
					</v-btn>
				</v-card-actions>
			</template>

		</v-data-table>

		<!-- PAGINATE --->
		<div v-if="items.length" class="text-center py-8">
			<v-pagination
				v-model="current_page"
				:length="getLength"
			></v-pagination>
		</div>

	</section>
</template>

<script lang="ts">
	import { isNull, orderBy } from "lodash";
	import Vue from "vue";

	export default Vue.extend({
		name: "LineItemTable",
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
		},
		components: {},
		data: () => ({
			radios: false,
			filter: {
				id: {
					value: "",
					order: "asc",
				},
				campaignName: {
					value: "",
					order: "asc",
				},
				name: {
					value: "",
					order: "asc",
				},
				lineItemType: {
					value: "",
					order: "asc",
				},
				lineItemBudget: {
					value: "",
					order: "asc",
				},
				startDate: {
					value: "",
					order: "asc",
				},
				endDate: {
					value: "",
					order: "asc",
				},
				associatedLI: {
					value: "",
					order: "asc",
				},
				active: {
					value: "",
					order: "asc",
				},
				budgetRemain: {
					value: "",
					order: "asc",
				},
				winningN: {
					value: "",
					order: "asc",
				},
				bidding: {
					value: "",
					order: "asc",
				},
			},
			filtered: [],
		}),

		created() {},

		mounted() {},

		computed: {
			getLength() {
				return Math.ceil(this.total / this.per_page);
			},

			getTotalFiltered() {
				return this.filtered.length;
			},

			filteredData() {
				this.filtered = this.items;
				
				// filter by id
				if (!isNull(this.filter.id.value)) {
					this.filtered = this.filtered.filter((item: { id: string }) => {
						return String(item.id)
							.toLowerCase()
							.includes(this.filter.id.value.toLowerCase());
					});
				}

				// filter by campaign name
				if (!isNull(this.filter.campaignName.value)) {
					this.filtered = this.filtered.filter(
						(item: { campaignName: string }) => {
							return item.campaignName
								.toLowerCase()
								.includes(this.filter.campaignName.value.toLowerCase());
						}
					);
				}

				// filter by line name
				if (!isNull(this.filter.name.value)) {
					this.filtered = this.filtered.filter(
						(item: { name: string }) => {
							return item.name
								.toLowerCase()
								.includes(this.filter.name.value.toLowerCase());
						}
					);
				}

				// filter by line item type
				if (!isNull(this.filter.lineItemType.value)) {
					this.filtered = this.filtered.filter(
						(item: { lineItemType: string }) => {
							return item.lineItemType
								.toLowerCase()
								.includes(this.filter.lineItemType.value.toLowerCase());
						}
					);
				}

				// filter by line item budget
				if (!isNull(this.filter.lineItemBudget.value)) {
					this.filtered = this.filtered.filter(
						(item: { lineItemBudget: string }) => {
							return item.lineItemBudget.toString()
								.toLowerCase()
								.includes(this.filter.lineItemBudget.value.toLowerCase());
						}
					);
				}

				// filter by start date
				if (!isNull(this.filter.startDate.value)) {
					this.filtered = this.filtered.filter(
						(item: { startDate: string }) => {
							return item.startDate
								.toLowerCase()
								.includes(this.filter.startDate.value.toLowerCase());
						}
					);
				}

				// filter by end date
				if (!isNull(this.filter.endDate.value)) {
					this.filtered = this.filtered.filter(
						(item: { endDate: string }) => {
							return item.endDate
								.toLowerCase()
								.includes(this.filter.endDate.value.toLowerCase());
						}
					);
				}

				// filter by associated LI
				if (!isNull(this.filter.associatedLI.value)) {
					this.filtered = this.filtered.filter(
						(item: { associatedLI: string }) => {
							return item.associatedLI.toString()
								.toLowerCase()
								.includes(this.filter.endDate.value.toLowerCase());
						}
					);
				}

				// filter by budget remain
				if (!isNull(this.filter.budgetRemain.value)) {
					this.filtered = this.filtered.filter(
						(item: { budgetRemain: string }) => {
							return item.budgetRemain
								.toLowerCase()
								.includes(this.filter.budgetRemain.value.toLowerCase());
						}
					);
				}

				// filter by wining N.
				if (!isNull(this.filter.winningN.value)) {
					this.filtered = this.filtered.filter(
						(item: { winningN: string }) => {
							return item.winningN
								.toLowerCase()
								.includes(this.filter.winningN.value.toLowerCase());
						}
					);
				}

				// filter by bidding
				if (!isNull(this.filter.bidding.value)) {
					this.filtered = this.filtered.filter(
						(item: { bidding: string }) => {
							return item.bidding
								.toLowerCase()
								.includes(this.filter.bidding.value.toLowerCase());
						}
					);
				}

				this.sorteredData();
				return this.filtered;
			},
		},

		methods: {
			sorteredData() {
				this.filtered = orderBy(
					this.filtered,
					["name"],
					[this.filter.name.order]
				);

				this.filtered = orderBy(
					this.filtered,
					["id"],
					[this.filter.id.order]
				);
			},
			getColor(active: Boolean) {
				return active ? "green--text" : "red--text";
			},
			getActiveText(active: Boolean) {
				return active ? "Active" : "Inactive";
			},
			removeFilterName() {
				this.filter.name.value = "";
			},
			removeFilterLineItemType() {
				this.filter.lineItemType.value = "";
			},
			removeFilterLineItemBudget() {
				this.filter.lineItemBudget.value = "";
			},
			removeFilterStartDate() {
				this.filter.startDate.value = "";
			},
			removeFilterEndDate() {
				this.filter.endDate.value = "";
			},
			removeFilterAssociatedLI() {
				this.filter.associatedLI.value = "";
			},
			removeFilterBudgetRemain() {
				this.filter.budgetRemain.value = "";
			},
			removeFilterWinningN() {
				this.filter.winningN.value = "";
			},
			removeFilterBidding() {
				this.filter.bidding.value = "";
			},
		},
	});
</script>