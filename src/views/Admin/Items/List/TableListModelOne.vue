<template>
	<v-card elevation="0">
		<v-data-table
			:headers="headers"
			:items="records"
			item-key="modifier"
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

			<template v-slot:[`item.id`]="{ item }">
				<v-text-field
					v-model="item.id"
					:rules="itemIdRules"
					placeholder="Item ID"
					class="label-fixed"
					counter="255"
				></v-text-field>
			</template>

			<!-- LIST ITEM -->
			<template v-slot:[`header.listItem`]="{ header }">
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
								v-model="filter.listItem.value"
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
								@click="removeFilterListItem()"
							>
								Remove filter
							</v-btn>
						</v-list-item>
					</v-list>
				</v-menu>
			</template>
			
			<template v-slot:[`item.items`]="{ item }">
				<v-text-field
					v-model="item.items"
					:rules="itemsRules"
					placeholder="List Items"
					class="label-fixed"
					counter="255"
				></v-text-field>
			</template>

			<!-- VALUE -->
			<template v-slot:[`header.value`]="{ header }">
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
								v-model="filter.value.value"
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
								@click="removeFilterValue()"
							>
								Remove filter
							</v-btn>
						</v-list-item>
					</v-list>
				</v-menu>
			</template>

			<template v-slot:[`item.value`]="{ item }">
				<v-text-field
					v-model="item.value"
					:rules="valueRules"
					placeholder="Value"
					class="label-fixed"
					counter="255"
				></v-text-field>
			</template>

			<!-- LIST ITEM NAME -->
			<template v-slot:[`header.name`]="{ header }">
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
								v-model="filter.name.value"
								type="text"
								:placeholder="header.name"
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

			<template v-slot:[`item.name`]="{ item }">
				<v-text-field
					v-model="item.name"
					:rules="nameRules"
					placeholder="Name"
					class="label-fixed"
					counter="255"
				></v-text-field>
			</template>

			<template v-slot:[`item.actions`]="{ item, index }">
				<v-card-actions>
					<!-- Alert Icon Success -->
					<v-icon
						v-show="
							item.success !== undefined &&
							item.success
						"
						small
						style="color: rgb(66, 233, 66) !important"
					>
						mdi-check-circle
					</v-icon>

					<!-- Alert Icon Danger -->
					<v-icon
						v-show="
							item.success !== undefined &&
							item.success
						"
						small
						style="color: rgb(235, 67, 67) !important"
					>
						mdi-close-circle
					</v-icon>

					<!-- Actión Delete Item -->
					<v-btn
						color="secondary"
						elevation="0"
						medium
						raised
						rounded
						text
						icon
						@click="handleDelete(index)"
					>
						<v-icon small class="secondary--text">
							mdi-trash-can-outline
						</v-icon>
					</v-btn>
				</v-card-actions>
			</template>

		</v-data-table>

		<v-row no-gutters>
			<v-card-subtitle class="secondary--text mt-2">
				Total: {{ records.length }} items
			</v-card-subtitle>
		</v-row>

		<v-row no-gutters align="end" justify="end" class="pl-4 pb-4">
			<v-btn
				rounded
				color="secondary"
				class="ma-2 px-8"
				small
				@click="handleAddItem"
			>
				{{ $t("add list item") }}
			</v-btn>
			<v-btn
				rounded
				color="secondary"
				class="ma-2 px-8"
				small
				@click="handleSubmit"
			>
				{{ $t("save & exit") }}
			</v-btn>
			<v-btn
				rounded
				color="secondary"
				class="ma-2 px-8"
				small
				@click="handleCancel"
			>
				{{ $t("cancel") }}
			</v-btn>
		</v-row>
	</v-card>
</template>

<script lang="ts">
	import Vue from "vue";
	import { ListItemModelOne } from "./../Create/modelOne.vue";
	export default Vue.extend({
		name: "TableListModelOne",
		props: {
			headers: {
				type: Array,
				default: [],
			},
			items: {
				type: Array,
				default: [],
			},
			title: {
				type: String,
				default: "",
			},
		},
		components: {},
		data: () => ({
			records: Array,
			filter: {
				id: {
					value: "",
					order: "asc",
				},
				name: {
					value: "",
					order: "asc",
				},
				value: {
					value: "",
					order: "asc",
				},
				listItem: {
					value: "",
					order: "asc",
				},
			},
		}),

		created() {
			this.records = this.initialicerecords(this.items);
		},

		mounted() {
			this.records = this.initialicerecords(this.items);
		},

		computed: {
			filteredData() {
				this.filtered = this.items;
				return this.filtered;
			},
			itemsRules(){},
			itemIdRules(){},
			valueRules(){},
			nameRules(){},
		},

		methods: {
			initialicerecords(oldRecords) {
				const newRecords = oldRecords.map((r) => {
					return {
						...r,
						success: undefined,
					};
				});
				return newRecords;
			},
			async handleSubmit() {
				console.log("--- handleSubmit ---");
			},
			handleAddItem() {
				let item: ListItemModelOne;
				item = {
					id: undefined,
					value: undefined,
					items: [],
					name: undefined,
				};
				console.log("--- handleAddItem ---", item);
				
				this.records.push({
					...item,
					success: undefined,
				});
			},
			handleCancel() {
				console.log("--- handleCancel ---");
			},
			handleDelete(index) {
				console.log("--- handleDelete ---", index);
				this.records.splice(index, 1);
			},
			removeFilterName() {
				this.filter.name.value = "";
			},
			removeFilterValue() {
				this.filter.value.value = "";
			},
			removeFilterListItem() {
				this.filter.listItem.value = "";
			},
		},
	});
</script>