<template>
	<v-list>
		<!-- city -->
		<v-list-item>
			<TabItem
				:appLists="data_variables.city"
				:attributeList="data_variables.city_attributes"
				item_text="value"
				item_value="id"
				hint="Filter City"
				reference="city"
				placeholder="Search City"
				label="City"
				:targeting_key_data="geo.city"
				:search_input_sync="cityTerm"
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
				@sync="syncData('city', $event)"
				@clear="clearHandler('city')"
				@remove-item="removeHandler('city', $event, true)"
			></TabItem>
		</v-list-item>

		<v-divider></v-divider>

		<!-- country -->
		<v-list-item>
			<TabItem
				:appLists="data_variables.country"
				:attributeList="data_variables.country_attributes"
				item_text="value"
				item_value="id"
				hint="Filter Country"
				reference="country"
				placeholder="Search Country"
				label="Country"
				:targeting_key_data="geo.country"
				:search_input_sync="countryTerm"
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
				@sync="syncData('country', $event)"
				@focus="getComboData('country')"
				@clear="clearHandler('country')"
				@remove-item="removeHandler('country', $event, true)"
			></TabItem>
		</v-list-item>

		<v-divider></v-divider>

		<!-- lat_long_list -->
		<v-list-item>
			<TargetingTabItem
				:appLists="data_variables.lat_long_list"
				item_text="value"
				item_value="id"
				hint="Lat Long List"
				reference="lat_long_list"
				placeholder="Search Lat Long List"
				label="Lat Long List"
				:targeting_key_data="geo.lat_long_list"
				:search_input_sync="latLongTerm"
				:persistent_hint="true"
				:colapse_selection="true"
				@focus="getComboData('lat_long_list')"
				@sync="syncData('lat_long_list', $event)"
				@clear="clearHandler('lat_long_list')"
				@remove-item="removeHandler('lat_long_list', $event)"
			></TargetingTabItem>
		</v-list-item>

		<v-divider></v-divider>

		<!-- region -->
		<v-list-item>
			<TabItem
				:appLists="data_variables.region"
				:attributeList="data_variables.region_attributes"
				item_text="value"
				item_value="id"
				hint="Region / State"
				reference="region"
				placeholder="Search Region / State"
				label="Region / State"
				:targeting_key_data="geo.region"
				:search_input_sync="regionTerm"
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
				:use_display_name="false"
				@sync="syncData('region', $event)"
				@focus="getComboData('region')"
				@clear="clearHandler('region')"
				@remove-item="removeHandler('region', $event, true)"
			></TabItem>
		</v-list-item>
	</v-list>
</template>
<script lang="ts">
	import Vue from "vue";
	import CardTextField from "../../../../components/Content/CardTextField.vue";
	import CardAutocomplete from "../../../../components/Content/CardAutocomplete.vue";
	import CardSwitch from "../../../../components/Content/CardSwitch.vue";
	import TermList from "./termList.vue";
	import TermListUnique from "./termListUnique.vue";
	import TargetingTabItem from "./targetingTabItem.vue";
	import TargetingTabItemUnique from "./targetingTabItemUnique.vue";
	import TargetingTabItemSplit from "./targetingTabItemSplit.vue";
	import TabItem from "./tab_items/TabItem.vue";

	import { debounce, isString, isArray, isEmpty } from "lodash";

	export default Vue.extend({
		name: "AppSite",
		props: {
			geo: {
				type: Object,
				default: function () {},
			},
			data_variables: {
				type: Object,
				default: function () {
					return {};
				},
			},
		},
		components: {
			CardTextField,
			CardAutocomplete,
			CardSwitch,
			TermList,
			TermListUnique,
			TargetingTabItem,
			TargetingTabItemUnique,
			TargetingTabItemSplit,
			TabItem,
		},
		data: () => ({
			tab: "geo",
			countryTerm: null,
			cityTerm: null,
			regionTerm: null,
			latLongTerm: null,
		}),
		async created() {},
		async mounted() {},
		computed: {},
		methods: {
			itemIsArray(item: any) {
				return isArray(item);
			},

			itemIsString(item: any) {
				return isString(item);
			},

			setLoading(_loading: Boolean) {
				this.$store.state.proccess.loading_field = _loading;
			},
			getDisplayNameByID(key: string, id: any) {
				let displayName = "";

				const _data = this.data_variables[key].find(
					(app: any) => app.id === id
				);
				if (_data) {
					displayName = `${_data.value} (${id})`;
				}

				return displayName;
			},
			async getComboData(key: string) {
				try {
					let params = {};

					if (isEmpty(this.data_variables[key])) {
						switch (key) {
							case "city":
								params = {
									key: "prefix",
									value: "name",
								};

								break;

							case "country":
								params = {
									key: "prefix_3",
									value: "name",
								};

								break;

							case "lat_long_list":
								params = {
									key: "external_id",
									value: "name",
								};

								break;
						}

						this.setLoading(true);

						this.$emit("update-data-var", {
							tab: this.tab,
							key: key,
							params: params,
							data: await this.dispatchAppSiteByKey(key, params),
						});

						this.setLoading(false);
					}
				} catch (error) {
					console.error("getComboData", { key, error });
					this.setLoading(false);
				}
			},
			async updateValues(key: string, items: Array<string>) {
				this.$emit("update-item-unique", {
					tab: this.tab,
					key: key,
					items: items,
				});
			},
			adComma(key: any) {
				this.$emit("add-comma", {
					tab: this.tab,
					key: key,
				});
			},
			async dispatchSearchByTerm(params: any) {
				return this.$store.dispatch("targeting/getSearchByTerm", params);
			},
			async dispatchAppSiteByKey(key: String, object?: any) {
				return this.$store.dispatch("targeting/getAppSitesByKey", {
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
					case "city":
						this.cityTerm = term;

						break;

					case "country":
						this.countryTerm = term;

						break;

					case "region":
						this.regionTerm = term;

						break;

					case "lat_long_list":
						this.latLongTerm = term;

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
			async "geo.city.value"(val: Array<any>, old: Array<any>) {
				await this.updateWatchByKey("city", val, old, true);
			},
			async "geo.country.value"(val: Array<any>, old: Array<any>) {
				await this.updateWatchByKey("country", val, old, true);
			},
			async "geo.region.value"(val: Array<any>, old: Array<any>) {
				await this.updateWatchByKey("region", val, old, true);
			},
			async "geo.lat_long_list.value"(val: Array<any>, old: Array<any>) {
				await this.updateWatchByKey("lat_long_list", val, old);
			},

			cityTerm: debounce(async function (val: String, old: String) {
				if (val.length < 3) return;
				this.setLoading(true);
				this.$emit("update-data-var", {
					tab: this.tab,
					key: "city",
					data: await this.dispatchSearchByTerm({
						term: val,
						key: "city",
						by_attribute: this.geo.country.by_attribute,
						object: {
							key: "prefix",
							value: "name",
						},
					}),
				});

				this.setLoading(false);
			}, 500),

			countryTerm: debounce(async function (val: String, old: String) {
				if (val.length < 3) return;
				this.setLoading(true);
				this.$emit("update-data-var", {
					tab: this.tab,
					key: "country",
					data: await this.getAppNameByAtribute({
						term: val,
						by_attribute: this.geo.country.by_attribute,
					}),
				});

				this.setLoading(false);
			}, 500),

			regionTerm: debounce(async function (val: String, old: String) {
				if (val.length < 3) return;
				this.setLoading(true);
				this.$emit("update-data-var", {
					tab: this.tab,
					key: "region",
					data: await this.dispatchSearchByTerm({
						term: val,
						key: "region",
						by_attribute: this.geo.region.by_attribute,
						object: {
							key: "key",
							value: "name",
						},
					}),
				});

				this.setLoading(false);
			}, 500),
		},
	});
</script>
