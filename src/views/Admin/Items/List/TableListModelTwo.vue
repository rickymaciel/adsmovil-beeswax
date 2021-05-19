<template>
	<v-card elevation="0">
		<v-simple-table>
			<template v-slot:default>
				<thead>
					<tr>
						<th style="width: 10%">ID</th>
						<th style="width: 15%">Tatitude</th>
						<th style="width: 15%">Longitude</th>
						<th style="width: 10%">Radius</th>
						<th style="width: 10%">Value</th>
						<th style="width: 40%" colspan="2">List Item Name</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, index) in records" :key="index">
						<td class="py-0 my-0">
							<div class="d-flex justify-center ma-0 pa-0">
								<v-text-field
									v-model="records[index].id"
									ref="records[index].id"
									placeholder="Id"
									class="label-fixed py-0 my-0"
									hide-details="auto"
								></v-text-field>
							</div>
						</td>
						<td class="py-0 my-0">
							<div class="d-flex justify-center ma-0 pa-0">
								<v-text-field
									v-model="records[index].latitude"
									ref="records[index].latitude"
									placeholder="Latitude"
									class="label-fixed py-0 my-0"
									hide-details="auto"
								></v-text-field>
							</div>
						</td>
						<td class="py-0 my-0">
							<div class="d-flex justify-center ma-0 pa-0">
								<v-text-field
									v-model="records[index].longitude"
									ref="records[index].longitude"
									placeholder="Longitude"
									class="label-fixed py-0 my-0"
									hide-details="auto"
								></v-text-field>
							</div>
						</td>
						<td class="py-0 my-0">
							<div class="d-flex justify-center ma-0 pa-0">
								<v-text-field
									v-model="records[index].radius"
									ref="records[index].radius"
									placeholder="Radius"
									class="label-fixed py-0 my-0"
									hide-details="auto"
								></v-text-field>
							</div>
						</td>
						<td class="py-0 my-0">
							<div class="d-flex justify-center ma-0 pa-0">
								<v-text-field
									v-model="records[index].value"
									ref="records[index].value"
									placeholder="Value"
									class="label-fixed py-0 my-0"
									hide-details="auto"
								></v-text-field>
							</div>
						</td>
						<td class="py-0 my-0">
							<div class="d-flex justify-center ma-0 pa-0">
								<v-text-field
									v-model="records[index].name"
									ref="records[index].value"
									placeholder="List Item Name"
									class="label-fixed py-0 my-0"
									hide-details="auto"
								></v-text-field>
							</div>
						</td>

						<td class="py-0 my-0">
							<div
								class="d-flex justify-center ma-0 pa-0 box-btn-action-icon"
							>
								<!-- Alert Icon Success -->
								<v-icon
									v-show="
										records[index].success !== undefined &&
										records[index].success
									"
									small
									style="color: rgb(66, 233, 66) !important"
								>
									mdi-check-circle
								</v-icon>

								<!-- Alert Icon Danger -->
								<v-icon
									v-show="
										records[index].success !== undefined &&
										!records[index].success
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
									small
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
							</div>
						</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>

		<v-row no-gutters>
			<v-card-subtitle class="secondary--text mt-2">
				Total: {{ records.length }} items
			</v-card-subtitle>
		</v-row>

		<v-row no-gutters align="end" justify="end" class="pl-4 pb-4">
			<v-btn
				rounded
				color="secondary"
				class="mx-2 px-8"
				@click="handleAddItem"
			>
				{{ $t("add list item") }}
			</v-btn>
			<v-btn
				rounded
				color="secondary"
				class="mx-2 px-8"
				@click="handleSubmit"
			>
				{{ $t("save & exit") }}
			</v-btn>
			<v-btn
				rounded
				color="secondary"
				class="mx-2 px-8"
				@click="handleCancel"
			>
				{{ $t("cancel") }}
			</v-btn>
		</v-row>
	</v-card>
</template>

<script lang="ts">
	import Vue from "vue";
	import { ListItemModelTwo } from "./../Create/modelTwo.vue";
	export default Vue.extend({
		name: "TableListModelTwo",
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
		}),

		created() {},

		mounted() {
			this.records = this.initialicerecords(this.items);
		},

		computed: {},

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
				let item: ListItemModelTwo;
				item = {
					id: undefined,
					latitude: undefined,
					longitude: undefined,
					radius: undefined,
					value: undefined,
					name: undefined,
					actions: [],
				};
				this.records.push({
					...item,
					success: undefined,
				});
			},
			handleCancel() {
				console.log("--- handleCancel ---");
			},
			handleDelete(index) {
				this.records.splice(index, 1);
			},
		},
	});
</script>
