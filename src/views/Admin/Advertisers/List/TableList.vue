<template>
	<section>
		<v-data-table
			:headers="headers"
			:items="items"
			item-key="advertiser"
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

			<!-- category -->
			<template v-slot:[`header.category`]="{ header }">
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
								v-model="header.category"
								type="text"
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

						<v-divider></v-divider>

						<v-list-item>
							<v-btn
								color="secondary"
								elevation="2"
								block
								outlined
								rounded
							>
								Remove filter
							</v-btn>
						</v-list-item>
					</v-list>
				</v-menu>
			</template>

			<!-- domain -->
			<template v-slot:[`header.domain`]="{ header }">
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
								v-model="header.domain"
								type="text"
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

						<v-divider></v-divider>

						<v-list-item>
							<v-btn
								color="secondary"
								elevation="2"
								block
								outlined
								rounded
							>
								Remove filter
							</v-btn>
						</v-list-item>
					</v-list>
				</v-menu>
			</template>

			<!-- appbundle -->
			<template v-slot:[`header.appbundle`]="{ header }">
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
								v-model="header.appbundle"
								type="text"
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

						<v-divider></v-divider>

						<v-list-item>
							<v-btn
								color="secondary"
								elevation="2"
								block
								outlined
								rounded
							>
								Remove filter
							</v-btn>
						</v-list-item>
					</v-list>
				</v-menu>
			</template>

			<!-- currency -->
			<template v-slot:[`header.currency`]="{ header }">
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
								v-model="header.currency"
								type="text"
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

						<v-divider></v-divider>

						<v-list-item>
							<v-btn
								color="secondary"
								elevation="2"
								block
								outlined
								rounded
							>
								Remove filter
							</v-btn>
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
							name: 'AdvertiserEdit',
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
	import Vue from "vue";

	export default Vue.extend({
		name: "AdvertiserHeader",
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
				console.log("TableList::updatePaginate", data);
				this.$emit("update-paginate", data);
			},
			removeFilterName() {
				//this.filter.name.value = "";
			},
		},
	});
</script>
