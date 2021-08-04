<template>
	<section>
		<v-data-table
			:headers="headers"
			:items="filteredData"
			:items-per-page="perPage"
			item-key="creative"
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

			<!-- CREATIVE NAME -->
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

			<!-- SIZE -->
			<template v-slot:[`header.size`]="{ header }">
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
								v-model="filter.size.value"
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
								@click="removeFilterSize()"
							>
								Remove filter
							</v-btn>
						</v-list-item>
					</v-list>
				</v-menu>
			</template>

			<!-- TYPE -->
			<template v-slot:[`header.type`]="{ header }">
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
								v-model="filter.type.value"
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
								@click="removeFilterType()"
							>
								Remove filter
							</v-btn>
						</v-list-item>
					</v-list>
				</v-menu>
			</template>

			<!-- LINE ITEMS -->
			<template v-slot:[`header.lineItems`]="{ header }">
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
								v-model="filter.lineItems.value"
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
								@click="removeFilterLineItems()"
							>
								Remove filter
							</v-btn>
						</v-list-item>
					</v-list>
				</v-menu>
			</template>

			<!-- THUMBAILS -->
			<template v-slot:[`header.thumbail`]="{ header }">
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
								v-model="filter.thumbail.value"
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
								@click="removeFilterThumbail()"
							>
								Remove filter
							</v-btn>
						</v-list-item>
					</v-list>
				</v-menu>
			</template>

			<template v-slot:[`item.thumbail`]="{ item }">
				<v-card-actions>
					<v-img
						v-if="item.thumbail"
						style="borderradius: 5px"
						:lazy-src="item.thumbail"
						max-height="45"
						max-width="45"
						:src="item.thumbail"
					></v-img>
					<v-img
						v-else
						style="borderradius: 5px"
						lazy-src="https://picsum.photos/id/11/10/6"
						max-height="45"
						max-width="45"
						src="https://picsum.photos/id/11/500/300"
					></v-img>
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
							mdi-magnify-plus-outline
						</v-icon>
					</v-btn>
				</v-card-actions>
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
				v-model="currentPage"
				:length="getLength"
				@input="updatePaginate"
			></v-pagination>
		</div>
	</section>
</template>

<script lang="ts">
import { isEmpty, isNull, orderBy } from "lodash";
import Vue from "vue";

export default Vue.extend({
	name: "CreativesTable",
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
			size: {
				value: "",
				order: "asc",
			},
			type: {
				value: "",
				order: "asc",
			},
			lineItems: {
				value: "",
				order: "asc",
			},
			thumbail: {
				value: "",
				order: "asc",
			},
			active: {
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
		perPage() {
			return !isNaN(this.per_page) && isEmpty(this.per_page)
				? this.per_page
				: 25;
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
			if (!isNull(this.filter.name.value)) {
				this.filtered = this.filtered.filter(
					(item: { name: string }) => {
						return item.name
							.toLowerCase()
							.includes(this.filter.name.value.toLowerCase());
					}
				);
			}

			// filter by size
			/*if (!isNull(this.filter.size.value)) {
					this.filtered = this.filtered.filter(
						(item: { size: string }) => {
							return item.size
								.toLowerCase()
								.includes(this.filter.size.value.toLowerCase());
						}
					);
				}*/

			// filter by type
			/*if (!isNull(this.filter.type.value)) {
					this.filtered = this.filtered.filter(
						(item: { type: string }) => {
							return item.type
								.toLowerCase()
								.includes(this.filter.type.value.toLowerCase());
						}
					);
				}*/

			// filter by line items
			/*if (!isNull(this.filter.lineItems.value)) {
					this.filtered = this.filtered.filter(
						(item: { lineItems: string }) => {
							return item.lineItems.toString()
								.toLowerCase()
								.includes(this.filter.lineItems.value.toLowerCase());
						}
					);
				}*/

			// filter by thumbail
			/*if (!isNull(this.filter.thumbail.value)) {
					this.filtered = this.filtered.filter(
						(item: { thumbail: string }) => {
							return item.thumbail
								.toLowerCase()
								.includes(this.filter.thumbail.value.toLowerCase());
						}
					);
				}*/

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
		updatePaginate(data: Number) {
			this.$emit("update-paginate", data);
		},
		removeFilterName() {
			this.filter.name.value = "";
		},
		removeFilterSize() {
			this.filter.size.value = "";
		},
		removeFilterType() {
			this.filter.type.value = "";
		},
		removeFilterLineItems() {
			this.filter.lineItems.value = "";
		},
		removeFilterThumbail() {
			this.filter.thumbail.value = "";
		},
	},
});
</script>