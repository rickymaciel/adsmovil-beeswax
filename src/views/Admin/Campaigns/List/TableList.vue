<template>
	<section>
		<v-data-table
			:headers="headers"
			:items="filteredData"
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

			<!-- ADVERTISER NAME -->
			<template v-slot:[`header.advertiserName`]="{ header }">
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
								v-model="filter.advertiserName.value"
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
								@click="removeFilterAdvertiserName()"
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

			<!-- CAMPAIGN BUDGET -->
			<template v-slot:[`header.campaignBudget`]="{ header }">
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
								v-model="filter.campaignBudget.value"
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
								@click="removeFilterCampaignBudget()"
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
								v-model="filter.spend.value"
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
								@click="removeFilterSpend()"
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

			<!-- ASSOSIATED LINE ITEM -->
			<template v-slot:[`header.assosiateLineItem`]="{ header }">
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
								v-model="filter.assosiateLineItem.value"
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
			<template v-slot:[`header.budgetRemaining`]="{ header }">
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
		},
		components: {},
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
				advertiserName: {
					value: "",
					order: "asc",
				},
				campaignBudget: {
					value: "",
					order: "asc",
				},
				spend: {
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
				assosiateLineItem: {
					value: "",
					order: "asc",
				},
				budgetRemaining: {
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

				// filter by advertiser name
				if (!isNull(this.filter.advertiserName.value)) {
					this.filtered = this.filtered.filter(
						(item: { advertiserName: string }) => {
							return item.advertiserName
								.toLowerCase()
								.includes(
									this.filter.advertiserName.value.toLowerCase()
								);
						}
					);
				}

				// filter by campaign name
				if (!isNull(this.filter.name.value)) {
					this.filtered = this.filtered.filter(
						(item: { name: string }) => {
							return item.name
								.toLowerCase()
								.includes(this.filter.name.value.toLowerCase());
						}
					);
				}

				// filter by campaign budget
				if (!isNull(this.filter.campaignBudget.value)) {
					this.filtered = this.filtered.filter(
						(item: { campaignBudget: string }) => {
							return item.campaignBudget
								.toLowerCase()
								.includes(
									this.filter.campaignBudget.value.toLowerCase()
								);
						}
					);
				}

				// filter by campaign Spend
				if (!isNull(this.filter.spend.value)) {
					this.filtered = this.filtered.filter(
						(item: { spend: string }) => {
							return item.spend
								.toString()
								.toLowerCase()
								.includes(this.filter.spend.value.toLowerCase());
						}
					);
				}

				// filter by start date
				if (!isNull(this.filter.startDate.value)) {
					this.filtered = this.filtered.filter(
						(item: { startDate: string }) => {
							return item.startDate
								.toLowerCase()
								.includes(
									this.filter.startDate.value.toLowerCase()
								);
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

				// filter by assosiate line item
				if (!isNull(this.filter.assosiateLineItem.value)) {
					this.filtered = this.filtered.filter(
						(item: { assosiateLineItem: string }) => {
							return item.assosiateLineItem
								.toString()
								.toLowerCase()
								.includes(
									this.filter.assosiateLineItem.value.toLowerCase()
								);
						}
					);
				}

				// filter by budget remaining
				if (!isNull(this.filter.budgetRemaining.value)) {
					this.filtered = this.filtered.filter(
						(item: { budgetRemaining: string }) => {
							return item.budgetRemaining
								.toString()
								.toLowerCase()
								.includes(
									this.filter.budgetRemaining.value.toLowerCase()
								);
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
		},
	});
</script>