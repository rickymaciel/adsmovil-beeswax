<template>
	<v-card
		elevation="0"
		justify="start"
		align="center"
		class="grey lighten-3 py-4 my-4"
	>
		<!-- <v-card> creative: {{ creative }} </v-card> -->
		<!-- <v-card v-if="items"> items: {{ items }} </v-card> -->

		<v-container>
			<v-row
				no-gutters
				dense
				align="start"
				self="start"
				justify="start"
				fluid
			>
				<!-- Associated Line -->
				<v-col class="pe-lg-16 pa-0" cols="12" sm="12" md="12" lg="12">
					<v-data-table
						:headers="headers"
						:items="items"
						class="elevation-1"
						hide-default-footer
						:mobile-breakpoint="null"
					>
						<!-- ACTIVE -->
						<template v-slot:[`item.active`]="{ item }">
							<strong
								class="d-flex"
								:class="getColor(item.active)"
							>
								<v-icon :class="getColor(item.active)"
									>mdi-circle-medium</v-icon
								>
								{{ getActiveText(item.active) }}
							</strong>
						</template>
					</v-data-table>
				</v-col>
			</v-row>
		</v-container>
	</v-card>
</template>

<script lang="ts">
	import Vue from "vue";
	import TableList from "../List/TableList.vue";

	export default Vue.extend({
		name: "AssociatedLineList",
		props: {
			creative: {
				type: Object,
				default: function () {
					return {};
				},
			},
		},
		components: { TableList },
		data: () => ({
			headers: [
				{
					text: "ID",
					align: "start",
					value: "id",
				},
				{ text: "Line Item Id", value: "line_item_id" },
				// { text: "Line Item Name", value: "line_item_name" },
				{ text: "Line Item Active", value: "active" },
				{ text: "Start Date", value: "start_date" },
				{ text: "End Date", value: "end_date" },
			],
			items: [],
		}),
		created() {
			this.items = this.creative.line_associations;
		},
		mounted() {},
		computed: {
			getResultPaginate(): any {
				return this.$store.state.lineItem.result_paginate;
			},
		},
		methods: {
			getColor(active: Boolean) {
				return active ? "green--text" : "red--text";
			},
			getActiveText(active: Boolean) {
				return active ? "Active" : "Inactive";
			},
		},
	});
</script>
