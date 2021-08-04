<template>
	<v-list>
		<!-- app_bundle_list -->
		<v-list-item>
			<TargetingTabItem
				:appLists="data_variables.app_bundle_list"
				:predicates="predicates"
				item_text="value"
				item_value="id"
				hint="App Bundle List"
				reference="app_bundle_list"
				placeholder="Select App Bundle List"
				label="App Bundle List"
				:targeting_key_data="app_site.app_bundle_list"
				@focus="getComboData('app_bundle_list')"
				@clear="clearHandler('app_bundle_list')"
				@remove-item="removeHandler('app_bundle_list', $event)"
			></TargetingTabItem>
		</v-list-item>

		<v-divider></v-divider>

		<!-- app_id_list -->
		<v-list-item>
			<TargetingTabItem
				:appLists="data_variables.app_id_list"
				:predicates="predicates"
				item_text="value"
				item_value="id"
				hint="App ID List"
				reference="app_id_list"
				placeholder="Select App ID List"
				label="App ID List"
				:targeting_key_data="app_site.app_id_list"
				@focus="getComboData('app_id_list')"
				@clear="clearHandler('app_id_list')"
				@remove-item="removeHandler('app_id_list', $event)"
			></TargetingTabItem>
		</v-list-item>

		<!-- app_name -->
		<v-list-item>
			<TargetingTabItemUnique
				:appLists="data_variables.app_name"
				:predicates="predicates"
				:attributeList="data_variables.app_name_attributes"
				item_text="value"
				item_value="id"
				hint="Search from the 100,000 most commonly seen values"
				reference="app_name"
				placeholder="Select App Name"
				label="App Name"
				:targeting_key_data="app_site.app_name"
				:search_input_sync="appNameTerm"
				:persistent_hint="true"
				:colapse_selection="true"
				@sync="syncData('app_name', $event)"
				@clear="clearHandler('app_name')"
				@remove-item="removeHandler('app_name', $event, true)"
			></TargetingTabItemUnique>
		</v-list-item>

		<v-divider></v-divider>

		<!-- deal_id el usuario puede cargar los id separados por coma.-->
		<v-list-item>
			<TargetingTabItemSplit
				:predicates="predicates"
				hint="Enter Deals as a comma-separated list, in the following format: <exchange_handle>/<deal_id>"
				reference="deal_id"
				placeholder="Add Deal Id"
				label="Deal Id"
				:targeting_key_data="app_site.deal_id"
				:persistent_hint="true"
				@blur="updateValues('deal_id', $event)"
				@enter="adComma('deal_id', $event)"
				@remove-item="removeHandler('deal_id', $event, true)"
			></TargetingTabItemSplit>
		</v-list-item>

		<v-divider></v-divider>

		<!-- deal_id_list -->
		<v-list-item>
			<TargetingTabItem
				:predicates="predicates"
				:appLists="data_variables.deal_id_list"
				item_text="value"
				item_value="id"
				hint="Deal Id List"
				reference="deal_id_list"
				placeholder="Select Deal Id List"
				label="Deal Id List"
				:targeting_key_data="app_site.deal_id_list"
				@focus="getComboData('deal_id_list')"
				@clear="clearHandler('deal_id_list')"
				@remove-item="removeHandler('deal_id_list', $event)"
			></TargetingTabItem>
		</v-list-item>

		<v-divider></v-divider>

		<!-- domain_list -->
		<v-list-item>
			<TargetingTabItem
				:predicates="predicates"
				:appLists="data_variables.domain_list"
				item_text="value"
				item_value="id"
				hint="Domain List"
				reference="domain_list"
				placeholder="Select Domain List"
				label="Domain List"
				:targeting_key_data="app_site.domain_list"
				@focus="getComboData('domain_list')"
				@clear="clearHandler('domain_list')"
				@remove-item="removeHandler('domain_list', $event)"
			></TargetingTabItem>
		</v-list-item>

		<v-divider></v-divider>

		<!-- placement_id Esta lista permitira el filtro por Placement ID, Site ID, Site Name -->
		<v-list-item>
			<TargetingTabItem
				:predicates="predicates"
				:appLists="data_variables.placement_id"
				item_text="value"
				item_value="id"
				hint="Placement Id"
				reference="placement_id"
				placeholder="Select Placement Id"
				label="Placement Id"
				:targeting_key_data="app_site.placement_id"
				@focus="getComboData('placement_id')"
				@clear="clearHandler('placement_id')"
				@remove-item="removeHandler('placement_id', $event)"
			></TargetingTabItem>
		</v-list-item>

		<v-divider></v-divider>

		<!-- publisher_id el usuario puede cargar los id separados por coma.-->
		<v-list-item>
			<TargetingTabItemSplit
				:predicates="predicates"
				hint="Enter Publisher ID as a comma-separated list"
				reference="publisher_id"
				placeholder="Add Publisher Id"
				label="Publisher Id"
				:targeting_key_data="app_site.publisher_id"
				:persistent_hint="true"
				@blur="updateValues('publisher_id', $event)"
				@enter="adComma('publisher_id', $event)"
				@remove-item="removeHandler('publisher_id', $event, true)"
			></TargetingTabItemSplit>
		</v-list-item>

		<v-divider></v-divider>

		<!-- publisher_id_list -->
		<v-list-item>
			<TargetingTabItem
				:predicates="predicates"
				:appLists="data_variables.publisher_id_list"
				item_text="value"
				item_value="id"
				hint="Publisher ID List"
				reference="publisher_id_list"
				placeholder="Select Publisher ID List"
				label="Publisher ID List"
				:targeting_key_data="app_site.publisher_id_list"
				@focus="getComboData('publisher_id_list')"
				@clear="clearHandler('publisher_id_list')"
				@remove-item="removeHandler('publisher_id_list', $event)"
			></TargetingTabItem>
		</v-list-item>

		<v-divider></v-divider>

		<!-- site -->
		<v-list-item>
			<TargetingTabItemUnique
				:predicates="predicates"
				:appLists="data_variables.site"
				:attributeList="data_variables.site_attributes"
				item_text="value"
				item_value="id"
				hint="Search from the 100,000 most commonly seen values"
				reference="site"
				placeholder="Select Site ID"
				label="Site ID"
				:targeting_key_data="app_site.site"
				:search_input_sync="siteTerm"
				:persistent_hint="true"
				:colapse_selection="true"
				@sync="syncData('site', $event)"
				@clear="clearHandler('site')"
				@remove-item="removeHandler('site', $event, true)"
			></TargetingTabItemUnique>
		</v-list-item>

		<v-divider></v-divider>

		<!-- site_list -->
		<v-list-item>
			<TargetingTabItem
				:predicates="predicates"
				:appLists="data_variables.site_list"
				item_text="value"
				item_value="id"
				hint="Site ID List"
				reference="site_list"
				placeholder="Select Site ID List"
				label="Site ID List"
				:targeting_key_data="app_site.site_list"
				@focus="getComboData('site_list')"
				@clear="clearHandler('site_list')"
				@remove-item="removeHandler('site_list', $event)"
			></TargetingTabItem>
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

import { debounce, isString, isArray, isEmpty } from "lodash";

export default Vue.extend({
	name: "AppSite",
	props: {
		app_site: {
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
		CardTextField,
		CardAutocomplete,
		CardSwitch,
		TermList,
		TermListUnique,
		TargetingTabItem,
		TargetingTabItemUnique,
		TargetingTabItemSplit,
	},
	data: () => ({
		tab: "app_site",
		appNameTerm: null,
		siteTerm: null,
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
		getDisplayNameByID(key: string, id: Number) {
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
				if (isEmpty(this.data_variables[key])) {
					this.setLoading(true);
					this.$emit("update-data-var", {
						tab: this.tab,
						key: key,
						data: await this.dispatchAppSiteByKey(key),
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
				case "app_name":
					this.appNameTerm = term;

					break;
				case "site":
					this.siteTerm = term;

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
		async "app_site.app_bundle_list.value"(
			val: Array<any>,
			old: Array<any>
		) {
			await this.updateWatchByKey("app_bundle_list", val, old);
		},
		async "app_site.app_id_list.value"(val: Array<any>, old: Array<any>) {
			await this.updateWatchByKey("app_id_list", val, old);
		},
		async "app_site.app_name.value"(val: Array<any>, old: Array<any>) {
			await this.updateWatchByKey("app_name", val, old, true);
		},
		async "app_site.deal_id_list.value"(val: Array<any>, old: Array<any>) {
			await this.updateWatchByKey("deal_id_list", val, old);
		},
		async "app_site.domain_list.value"(val: Array<any>, old: Array<any>) {
			await this.updateWatchByKey("domain_list", val, old);
		},
		async "app_site.placement_id.value"(val: Array<any>, old: Array<any>) {
			await this.updateWatchByKey("placement_id", val, old);
		},
		async "app_site.publisher_id_list.value"(
			val: Array<any>,
			old: Array<any>
		) {
			await this.updateWatchByKey("publisher_id_list", val, old);
		},
		async "app_site.site.value"(val: Array<any>, old: Array<any>) {
			await this.updateWatchByKey("site", val, old, true);
		},
		async "app_site.site_list.value"(val: Array<any>, old: Array<any>) {
			await this.updateWatchByKey("site_list", val, old);
		},

		appNameTerm: debounce(async function (val: String, old: String) {
			if (val.length < 3) return;
			this.setLoading(true);
			this.$emit("update-data-var", {
				tab: this.tab,
				key: "app_name",
				data: await this.getAppNameByAtribute({
					term: val,
					by_attribute: this.app_site.app_name.by_attribute,
				}),
			});

			this.setLoading(false);
		}, 500),

		siteTerm: debounce(async function (val: String, old: String) {
			if (val.length < 3) return;
			this.setLoading(true);
			this.$emit("update-data-var", {
				tab: this.tab,
				key: "site",
				data: await this.getSitesByAtribute({
					term: val,
					by_attribute: this.app_site.site.by_attribute,
				}),
			});

			this.setLoading(false);
		}, 500),
	},
});
</script>
