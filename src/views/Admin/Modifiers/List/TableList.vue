<template>
	<section>
		<!-- <div class="pa-4 white--text red darken-2">
			Total: {{ getTotalFiltered }}
		</div> -->
		<!-- <div class="pa-4 white--text grey darken-3">
			<div>filtered:</div>
			{{ filtered }}
		</div>
		<div class="pa-4 white--text grey darken-3">
			<div>filteredData:</div>
			{{ filteredData }}
		</div> -->
		<v-data-table
			:headers="headers"
			:items="filteredData"
			item-key="modifiers"
			class="elevation-1"
			hide-default-footer
			:mobile-breakpoint="null"
		>
			<!-- LABEL -->

			<!-- id -->
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

			<!-- name -->
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

			<!-- name -->
			<template v-slot:[`header.updateDate`]="{ header }">
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
								v-model="filter.updateDate.value"
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
								@click="removeFilterUpdateDate()"
							>
								Remove filter
							</v-btn>
						</v-list-item>
					</v-list>
				</v-menu>
			</template>

			<!-- name -->
			<template v-slot:[`header.typeName`]="{ header }">
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
								v-model="filter.typeName.value"
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
								@click="removeFilterTypeName()"
							>
								Remove filter
							</v-btn>
						</v-list-item>
					</v-list>
				</v-menu>
			</template>

			<!-- Advertiser ID -->
			<template v-slot:[`header.advertiserId`]="{ header }">
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
								v-model="filter.advertiserId.value"
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
								@click="removeFilterAdvertiserId()"
							>
								Remove filter
							</v-btn>
						</v-list-item>
					</v-list>
				</v-menu>
			</template>

			<!-- active 
			<template v-slot:[`header.active`]="{ header }">
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
							<v-radio-group v-model="radios">
								<v-radio color="secondary" value="asc">
									<template v-slot:label>
										<div>Active</div>
									</template>
								</v-radio>
								<v-radio color="secondary" value="desc">
									<template v-slot:label>
										<div>Inactive</div>
									</template>
								</v-radio>
							</v-radio-group>
						</v-list-item>
					</v-list>
				</v-menu>
			</template>-->

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

				// filter by name
				if (!isNull(this.filter.name.value)) {
					this.filtered = this.filtered.filter(
						(item: { name: string }) => {
							return item.name
								.toLowerCase()
								.includes(this.filter.name.value.toLowerCase());
						}
					);
				}

				// filter by update Date
				if (!isNull(this.filter.updateDate.value)) {
					this.filtered = this.filtered.filter(
						(item: { updateDate: string }) => {
							return item.updateDate
								.toLowerCase()
								.includes(this.filter.updateDate.value.toLowerCase());
						}
					);
				}

				// filter by type name
				if (!isNull(this.filter.typeName.value)) {
					this.filtered = this.filtered.filter(
						(item: { typeName: string }) => {
							return item.typeName
								.toLowerCase()
								.includes(this.filter.typeName.value.toLowerCase());
						}
					);
				}

				// filter by advertiser id
				/*if (!isNull(this.filter.advertiserId.value)) {
					this.filtered = this.filtered.filter(
						(item: { advertiserId: string }) => {
							return item.advertiserId
								.toLowerCase()
								.includes(this.filter.advertiserId.value.toLowerCase());
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
					["id"],
					[this.filter.id.order]
				);

				this.filtered = orderBy(
					this.filtered,
					["name"],
					[this.filter.name.order]
				);

				this.filtered = orderBy(
					this.filtered,
					["updateDate"],
					[this.filter.updateDate.order]
				);

				this.filtered = orderBy(
					this.filtered,
					["typeName"],
					[this.filter.typeName.order]
				);

				this.filtered = orderBy(
					this.filtered,
					["advertiserId"],
					[this.filter.advertiserId.order]
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
			removeFilterUpdateDate() {
				this.filter.updateDate.value = "";
			},
			removeFilterTypeName() {
				this.filter.typeName.value = "";
			},
			removeFilterAdvertiserId() {
				this.filter.advertiserId.value = "";
			},
		},
	});
</script>
