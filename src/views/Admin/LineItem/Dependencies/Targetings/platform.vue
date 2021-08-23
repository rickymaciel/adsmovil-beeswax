<template>
	<v-list>
		<!-- browser -->
		<v-list-item>
			<TabItem
				:appLists="data_variables.browser"
				:predicates="predicates"
				item_text="value"
				item_value="id"
				hint="Add Browser"
				reference="browser"
				placeholder="Add Browser"
				label="Browser"
				:targeting_key_data="platform.browser"
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
				@focus="getComboData('browser')"
				@clear="clearHandler('browser')"
				@remove-item="removeHandler('browser', $event, true)"
			></TabItem>
		</v-list-item>

		<v-divider></v-divider>

		<!-- browser_version -->
		<v-list-item>
			<TabItem
				:appLists="data_variables.browser_version"
				:predicates="predicates"
				item_text="value"
				item_value="id"
				hint="Add Browser Version"
				reference="browser_version"
				placeholder="Add Browser Version"
				label="Browser Version"
				:targeting_key_data="platform.browser_version"
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
				@focus="getComboData('browser_version')"
				@clear="clearHandler('browser_version')"
				@remove-item="removeHandler('browser_version', $event, true)"
			></TabItem>
		</v-list-item>

		<v-divider></v-divider>

		<!-- carrier -->
		<v-list-item>
			<TabItem
				:appLists="data_variables.carrier"
				:predicates="predicates"
				item_text="value"
				item_value="id"
				hint="Add Carrier"
				reference="carrier"
				placeholder="Add Carrier"
				label="Carrier"
				:targeting_key_data="platform.carrier"
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
				@focus="getComboData('carrier')"
				@clear="clearHandler('carrier')"
				@remove-item="removeHandler('carrier', $event, true)"
			></TabItem>
		</v-list-item>

		<v-divider></v-divider>

		<!-- device_type -->
		<v-list-item>
			<TabItem
				:appLists="data_variables.device_type"
				:predicates="predicates"
				item_text="value"
				item_value="id"
				hint="Add device_type"
				reference="device_type"
				placeholder="Add device_type"
				label="device_type"
				:targeting_key_data="platform.device_type"
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
				@focus="getComboData('device_type')"
				@clear="clearHandler('device_type')"
				@remove-item="removeHandler('device_type', $event, true)"
			></TabItem>
		</v-list-item>

		<v-divider></v-divider>

		<!-- device_make -->
		<v-list-item>
			<TabItem
				:appLists="data_variables.device_make"
				:predicates="predicates"
				item_text="value"
				item_value="id"
				hint="Add Device Make"
				reference="device_make"
				placeholder="Add Device Make"
				label="Device Make"
				:targeting_key_data="platform.device_make"
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
				@focus="getComboData('device_make')"
				@clear="clearHandler('device_make')"
				@remove-item="removeHandler('device_make', $event, true)"
			></TabItem>
		</v-list-item>

		<v-divider></v-divider>

		<!-- device_model -->
		<v-list-item>
			<TabItem
				:appLists="data_variables.device_model"
				:predicates="predicates"
				item_text="value"
				item_value="id"
				hint="Add Device Mode"
				reference="device_model"
				placeholder="Add Device Mode"
				label="Device Mode"
				:targeting_key_data="platform.device_model"
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
				@focus="getComboData('device_model')"
				@clear="clearHandler('device_model')"
				@remove-item="removeHandler('device_model', $event, true)"
			></TabItem>
		</v-list-item>

		<v-divider></v-divider>

		<!-- device_screen_size -->
		<v-list-item>
			<TabItem
				:appLists="data_variables.device_screen_size"
				:predicates="predicates"
				item_text="value"
				item_value="id"
				hint="Add Device Screen Size"
				reference="device_screen_size"
				placeholder="Add Device Screen Size"
				label="Device Screen Size"
				:targeting_key_data="platform.device_screen_size"
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
				@focus="getComboData('device_screen_size')"
				@clear="clearHandler('device_screen_size')"
				@remove-item="removeHandler('device_screen_size', $event, true)"
			></TabItem>
		</v-list-item>

		<v-divider></v-divider>

		<!-- operating_system -->
		<v-list-item>
			<TabItem
				:appLists="data_variables.operating_system"
				:predicates="predicates"
				item_text="value"
				item_value="id"
				hint="Add Operatin System"
				reference="operating_system"
				placeholder="Add Operatin System"
				label="Operatin System"
				:targeting_key_data="platform.operating_system"
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
				@focus="getComboData('operating_system')"
				@clear="clearHandler('operating_system')"
				@remove-item="removeHandler('operating_system', $event, true)"
			></TabItem>
		</v-list-item>

		<v-divider></v-divider>

		<!-- operating_system_version -->
		<v-list-item>
			<TabItem
				:appLists="data_variables.operating_system_version"
				:predicates="predicates"
				item_text="value"
				item_value="id"
				hint="Add Operatin System Version"
				reference="operating_system_version"
				placeholder="Add Operatin System Version"
				label="Operatin System Version"
				:targeting_key_data="platform.operating_system_version"
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
				@focus="getComboData('operating_system_version')"
				@clear="clearHandler('operating_system_version')"
				@remove-item="
					removeHandler('operating_system_version', $event, true)
				"
			></TabItem>
		</v-list-item>
	</v-list>
</template>
<script lang="ts">
import Vue from "vue";
import TabItem from "./tab_items/TabItem.vue";
import { isEmpty } from "lodash";

export default Vue.extend({
	name: "Platform",
	props: {
		platform: {
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
		tab: "platform",
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
						case "browser":
							params = {
								key: "extra",
								value: "description",
							};

							break;

						case "browser_version":
							params = {
								key: "key",
								value: "description",
							};

							break;

						case "carrier":
							params = {
								key: "extra",
								value: "description",
							};

							break;

						case "device_type":
							params = {
								key: "extra",
								value: "description",
							};

							break;

						case "device_make":
							params = {
								key: "extra",
								value: "description",
							};

							break;

						case "device_model":
							params = {
								key: "key",
								value: "description",
							};

							break;

						case "device_screen_size":
							params = {
								key: "key",
								value: "description",
							};

							break;

						case "operating_system":
							params = {
								key: "extra",
								value: "description",
							};

							break;

						case "operating_system_version":
							params = {
								key: "key",
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

		async dispatchTargetingKey(key: String, object?: any) {
			return this.$store.dispatch("targeting/getTargetingKey", {
				key: key,
				object: object,
			});
		},

		clearHandler(key: any) {
			this.$emit("clear-app-site", { tab: this.tab, key: key });
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
		async "platform.browser.value"(val: Array<any>, old: Array<any>) {
			await this.updateWatchByKey("browser", val, old, true);
		},
		async "platform.browser_version.value"(
			val: Array<any>,
			old: Array<any>
		) {
			await this.updateWatchByKey("browser_version", val, old, true);
		},
		async "platform.carrier.value"(val: Array<any>, old: Array<any>) {
			await this.updateWatchByKey("carrier", val, old, true);
		},
		async "platform.device_type.value"(val: Array<any>, old: Array<any>) {
			await this.updateWatchByKey("device_type", val, old, true);
		},
		async "platform.device_make.value"(val: Array<any>, old: Array<any>) {
			await this.updateWatchByKey("device_make", val, old, true);
		},
		async "platform.device_model.value"(val: Array<any>, old: Array<any>) {
			await this.updateWatchByKey("device_model", val, old, true);
		},
		async "platform.device_screen_size.value"(
			val: Array<any>,
			old: Array<any>
		) {
			await this.updateWatchByKey("device_screen_size", val, old, true);
		},
		async "platform.operating_system.value"(
			val: Array<any>,
			old: Array<any>
		) {
			await this.updateWatchByKey("operating_system", val, old, true);
		},
		async "platform.operating_system_version.value"(
			val: Array<any>,
			old: Array<any>
		) {
			await this.updateWatchByKey(
				"operating_system_version",
				val,
				old,
				true
			);
		},
	},
});
</script>
