<template>
	<v-list>
		<!-- inventory_source -->
		<v-list-item>
			<TabItem
				:appLists="data_variables.inventory_source"
				:predicates="predicates"
				:attributeList="data_variables.inventory_source"
				item_text="value"
				item_value="id"
				hint="Inventory Source"
				reference="inventory_source"
				placeholder="Select Inventory Source"
				label="Inventory Source"
				:targeting_key_data="exchange.inventory_source"
				:persistent_hint="true"
				:colapse_selection="true"
				:filterable="false"
				:searchable="true"
				:unique="true"
				:chips="true"
				:clearable="true"
				:deletable_chips="true"
				:dense="false"
				:multiple="true"
				:small_chips="true"
				@focus="getComboData('inventory_source')"
				@clear="clearHandler('inventory_source')"
				@remove-item="removeHandler('inventory_source', $event, true)"
			></TabItem>
		</v-list-item>

		<v-divider></v-divider>

		<!-- auction_type -->
		<v-list-item>
			<TabItem
				:appLists="data_variables.auction_type"
				:attributeList="data_variables.auction_type_attributes"
				item_text="value"
				item_value="id"
				hint="Filter Auction Type"
				reference="auction_type"
				placeholder="Filter Auction Type"
				label="Auction Type"
				:targeting_key_data="exchange.auction_type"
				:search_input_sync="inventorySourceTerm"
				:persistent_hint="true"
				:colapse_selection="true"
				:filterable="false"
				:searchable="true"
				:unique="true"
				:chips="true"
				:clearable="true"
				:deletable_chips="true"
				:dense="false"
				:multiple="true"
				:small_chips="true"
				:predicates="predicates"
				@focus="getComboData('auction_type')"
				@sync="syncData('auction_type', $event)"
				@clear="clearHandler('auction_type')"
				@remove-item="removeHandler('auction_type', $event, true)"
			></TabItem>
		</v-list-item>
	</v-list>
</template>
<script lang="ts">
import Vue from "vue";
import TabItem from "./tab_items/TabItem.vue";
import { isEmpty } from "lodash";

export default Vue.extend({
	name: "Exchange",
	props: {
		exchange: {
			type: Object,
			default: function () {},
		},
		data_variables: {
			type: Object,
			default: function () {
				return {};
			},
		},
		predicates: {
			type: Object,
			default: function () {
				return {};
			},
		},
	},
	components: {
		TabItem,
	},
	data: () => ({
		tab: "exchange",
		inventorySourceTerm: null,
		auctionTypeSourceTerm: null,
	}),
	async created() {},
	async mounted() {},
	computed: {},
	methods: {
		setLoading(_loading: Boolean) {
			this.$store.state.proccess.loading_field = _loading;
		},

		async getComboData(key: string) {
			try {
				let params = {};

				if (isEmpty(this.data_variables[key])) {
					switch (key) {
						case "inventory_source":
							params = {
								key: "external_id",
								value: "name",
							};

							break;

						case "auction_type":
							params = {
								key: "extra",
								value: "description",
							};

							break;
					}

					this.setLoading(true);

					this.$emit("update-data-var", {
						tab: this.tab,
						key: key,
						params: params,
						data: await this.dispatchTargetingKey(key, params),
					});

					this.setLoading(false);
				}
			} catch (error) {
				console.error("getComboData", { key, error });
				this.setLoading(false);
			}
		},
		// async dispatchSearchByTerm(params: any) {
		// 	return this.$store.dispatch("targeting/getSearchByTerm", params);
		// },
		async dispatchTargetingKey(key: String, object?: any) {
			return this.$store.dispatch("targeting/getTargetingKey", {
				key: key,
				object: object,
			});
		},
		async getAppNameByAtribute(params: {
			term: String;
			by_attribute: String;
		}) {
			return this.$store.dispatch(
				"targeting/getAppNameByAtribute",
				params
			);
		},
		async getSitesByAtribute(params: {
			term: String;
			by_attribute: String;
		}) {
			return this.$store.dispatch("targeting/getSitesByAtribute", params);
		},

		clearHandler(key: any) {
			this.$emit("clear-app-site", { tab: this.tab, key: key });
		},

		syncData(key: String, term: String) {
			switch (key) {
				case "inventory_source":
					this.inventorySourceTerm = term;

					break;

				case "auction_type":
					this.auctionTypeSourceTerm = term;

					break;
			}
		},

		removeHandler(key: any, value: any, is_unique: Boolean = false) {
			this.$emit(is_unique ? "remove-item-unique" : "remove-item", {
				tab: this.tab,
				key: key,
				value: value,
				is_unique: is_unique,
			});
		},

		async updateWatchByKey(
			key: String,
			val: Array<any>,
			old: Array<any>,
			is_unique: Boolean = false
		) {
			if (val.length > old.length) {
				const item = val.filter(function (o: any) {
					return !old.includes(o);
				});
				this.$emit(is_unique ? "add-item-unique" : "add-item", {
					tab: this.tab,
					key: key,
					value: item[0],
				});
			}
			if (val.length < old.length) {
				const item = old.filter(function (o: any) {
					return !val.includes(o);
				});
				this.$emit(is_unique ? "remove-item-unique" : "remove-item", {
					tab: this.tab,
					key: key,
					value: item[0],
				});
			}
		},
	},

	watch: {
		async "exchange.inventory_source.value"(
			val: Array<any>,
			old: Array<any>
		) {
			await this.updateWatchByKey("inventory_source", val, old, true);
		},
		async "exchange.auction_type.value"(val: Array<any>, old: Array<any>) {
			await this.updateWatchByKey("auction_type", val, old, true);
		},

		// inventorySourceTerm: debounce(async function (
		// 	val: String,
		// 	old: String
		// ) {
		// 	if (val.length < 3) return;
		// 	this.setLoading(true);
		// 	this.$emit("update-data-var", {
		// 		tab: this.tab,
		// 		key: "inventory_source",
		// 		data: await this.dispatchSearchByTerm({
		// 			term: val,
		// 			key: "inventory_source",
		// 			by_attribute: this.exchange.inventory_source.by_attribute,
		// 			object: {
		// 				key: "internal_id",
		// 				value: "name",
		// 			},
		// 		}),
		// 	});

		// 	this.setLoading(false);
		// },
		// 500),
	},
});
</script>
