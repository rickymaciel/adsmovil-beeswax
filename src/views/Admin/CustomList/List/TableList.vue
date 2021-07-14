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
			item-key="lists"
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

			<!-- active -->
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
			</template>

			<!-- ITEMS -->

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
							name: 'ListsEdit',
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
	import { SortingOption } from "@/interfaces/paginated";
import { isNull, orderBy } from "lodash";
	import Vue from "vue";

	export default Vue.extend({
		name: "ListsHeader",
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

		// watch: {
		// 	"filter.id.order": function (data) {
		// 		this.filtered = this.filteredData;
		// 		console.log("watch:id:order", {
		// 			data: data,
		// 			list: this.filtered,
		// 			filter: this.filter,
		// 		});
		// 	},
		// },
	});
</script>
