<template>
	<v-list>
		<!-- environment_type -->
		<v-list-item>
			<TabItem
				:appLists="data_variables.environment_type"
				:predicates="predicates"
				item_text="value"
				item_value="id"
				hint="Search Environment Type"
				reference="environment_type"
				placeholder="Search Environment Type"
				label="Environment Type"
				:targeting_key_data="environment.environment_type"
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
				@focus="getComboData('environment_type')"
				@clear="clearHandler('environment_type')"
				@remove-item="removeHandler('environment_type', $event, true)"
			></TabItem>
		</v-list-item>

		<v-divider></v-divider>

		<!-- topframe -->
		<v-list-item>
			<TabItem
				:appLists="data_variables.topframe"
				:predicates="predicates"
				item_text="value"
				item_value="id"
				hint="Search Top Frame"
				reference="topframe"
				placeholder="Search Top Frame"
				label="Top Frame"
				:targeting_key_data="environment.topframe"
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
				@focus="getComboData('topframe')"
				@clear="clearHandler('topframe')"
				@remove-item="removeHandler('topframe', $event, true)"
			></TabItem>
		</v-list-item>

		<v-divider></v-divider>

		<!-- video_api -->
		<v-list-item>
			<TabItem
				:appLists="data_variables.video_api"
				:predicates="predicates"
				:attributeList="data_variables.video_api_attributes"
				item_text="value"
				item_value="id"
				hint="Search API Framework"
				reference="video_api"
				placeholder="Search API Framework"
				label="API Framework"
				:targeting_key_data="environment.video_api"
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
				@focus="getComboData('video_api')"
				@clear="clearHandler('video_api')"
				@remove-item="removeHandler('video_api', $event, true)"
			></TabItem>
		</v-list-item>
	</v-list>
</template>
<script lang="ts">
import Vue from "vue";
import TabItem from "./tab_items/TabItem.vue";
import { isEmpty } from "lodash";

export default Vue.extend({
	name: "Environment",
	props: {
		environment: {
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
		tab: "environment",
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
						case "environment_type":
							params = {
								key: "extra",
								value: "description",
							};

							break;

						case "topframe":
							params = {
								key: "extra",
								value: "description",
							};

							break;

						case "video_api":
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
		async "environment.environment_type.value"(
			val: Array<any>,
			old: Array<any>
		) {
			await this.updateWatchByKey("environment_type", val, old, true);
		},
		async "environment.topframe.value"(val: Array<any>, old: Array<any>) {
			await this.updateWatchByKey("topframe", val, old, true);
		},
		async "environment.video_api.value"(val: Array<any>, old: Array<any>) {
			await this.updateWatchByKey("video_api", val, old, true);
		},
	},
});
</script>
