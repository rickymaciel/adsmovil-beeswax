<template>
	<div class="d-lg-flex justify-lg-space-between">
		<div
			class="mb-2 d-flex justify-space-between align-center align-self-center"
		>
			<v-btn
				:to="to"
				class="me-4 mb-1"
				color="secondary"
				elevation="0"
				:medium="!$vuetify.breakpoint.mobile"
				:small="$vuetify.breakpoint.mobile"
				raised
				rounded
			>
				Create New
			</v-btn>

			<v-btn
				color="secondary"
				elevation="0"
				icon
				:medium="!$vuetify.breakpoint.mobile"
				:small="$vuetify.breakpoint.mobile"
				raised
				rounded
				class="ml-auto me-4 mb-1"
			>
				<img src="@/assets/icons/download_btn.png" alt="Tools" />
			</v-btn>

			<!-- <v-btn
				color="secondary"
				elevation="0"
				icon
				:medium="!$vuetify.breakpoint.mobile"
				:small="$vuetify.breakpoint.mobile"
				raised
				rounded
				class="me-4 mb-1"
			>
				<img src="@/assets/icons/bulk_btn.png" alt="Tools" />
			</v-btn> -->
		</div>

		<div
			class="mb-2 d-flex justify-space-between align-center align-self-center"
		>
			<v-btn
				class="me-4 mb-1"
				color="secondary"
				outlined
				elevation="0"
				:medium="!$vuetify.breakpoint.mobile"
				:small="$vuetify.breakpoint.mobile"
				raised
				rounded
			>
				Customize View
			</v-btn>

			<v-menu
				transition="slide-y-transition"
				offset-y
				:close-on-content-click="true"
			>
				<template v-slot:activator="{ on, attrs }">
					<v-btn
						class="ml-auto me-4 mb-1"
						color="secondary"
						outlined
						elevation="0"
						:medium="!$vuetify.breakpoint.mobile"
						:small="$vuetify.breakpoint.mobile"
						raised
						rounded
						v-bind="attrs"
						v-on="on"
					>
						{{ getSelectedLimit }}
						<v-icon dark>
							{{
								attrs["aria-expanded"] === "true"
									? "mdi-chevron-up"
									: "mdi-chevron-down"
							}}
						</v-icon>
					</v-btn>
				</template>

				<v-list>
					<v-list-item-group
						v-model="selected_limit_index"
						active-class="border"
						color="secondary"
					>
						<v-list-item
							active-class="border"
							color="secondary"
							v-for="item in show_rows"
							:key="item.value"
							@click="selecteLimit(item)"
						>
							<v-list-item-content>
								<v-list-item-title
									v-text="item.text"
								></v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list-item-group>
				</v-list>
			</v-menu>

			<!-- <v-menu
				transition="slide-y-transition"
				offset-y
				:close-on-content-click="true"
			>
				<template v-slot:activator="{ on, attrs }">
					<v-btn
						class="ml-auto me-4 mb-1"
						color="secondary"
						outlined
						elevation="0"
						:medium="!$vuetify.breakpoint.mobile"
						:small="$vuetify.breakpoint.mobile"
						raised
						rounded
						v-bind="attrs"
						v-on="on"
					>
						<v-icon dark class="me-1"> mdi-calendar </v-icon>
						Show Last 30 days
						<v-icon dark>
							{{
								attrs["aria-expanded"] === "true"
									? "mdi-chevron-up"
									: "mdi-chevron-down"
							}}
						</v-icon>
					</v-btn>
				</template>

				<v-list>
					<v-list-item-group
						v-model="selected_last_days_index"
						active-class="border"
						color="secondary"
					>
						<v-list-item active-class="border" color="secondary">
							<v-list-item-content>
								<v-list-item-title>
									Option 1
								</v-list-item-title>
							</v-list-item-content>
						</v-list-item>

						<v-list-item active-class="border" color="secondary">
							<v-list-item-content>
								<v-list-item-title>
									Option 1
								</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list-item-group>
				</v-list>
			</v-menu> -->
		</div>
	</div>
</template>

<script lang="ts">
	import { find } from "lodash";
	import Vue from "vue";

	export default Vue.extend({
		name: "Buttons",
		props: {
			limit: {
				type: Number,
				default: 25,
			},
			to: {
				type: String,
				default: "/",
			},
		},
		components: {},
		data: () => ({
			selected_limit_index: 0,
			selected_last_days_index: 0,
			show_rows: [],
		}),

		created() {
			this.show_rows = this.initShowRows();
		},

		mounted() {},

		computed: {
			getSelectedLimit() {
				return find(this.show_rows, { value: this.limit }).text;
			},
		},

		methods: {
			initShowRows() {
				return [
					{
						value: 25,
						text: "25 rows",
					},
					{
						value: 50,
						text: "50 rows",
					},
					{
						value: 100,
						text: "100 rows",
					},
				];
			},
			selecteLimit(item: { value: number }) {
				this.$emit("selected-limit", item.value);
			},
		},
	});
</script>
