<template>
	<v-card color="transparent" flat>
		<CreateTabs
			:current_tab="current_tab"
			:items="getItems"
			:vertical="true"
			:slider_size="4"
			custom_class="v-tab--targeting v-tab--fluid v-tab--justify-start ps-3 border"
			@update-selected-tab-index="updateSelectedTabIndex"
		></CreateTabs>
	</v-card>
</template>
<script lang="ts">
import CreateTabs from "../../../Create/createTabs.vue";
import Vue from "vue";
import { isEmpty, size } from "lodash";

export default Vue.extend({
	name: "NavTargeting",
	props: {
		current_tab: {
			type: Number,
			default: 0,
		},
		targeting: {
			type: Object,
			default: function () {
				return {};
			},
		},
	},
	components: { CreateTabs },
	data: () => ({}),
	created() {},
	async mounted() {},
	computed: {
		getItems() {
			return [
				{
					key: 0,
					tab: "App Site",
					disabled: false,
					count: this.getCountTargetingKeys("app_site"),
					src: require(`@/assets/icons/appsite_icon.png`),
				},
				{
					key: 1,
					tab: "Content",
					disabled: true,
					count: this.getCountTargetingKeys("content"),
					src: require(`@/assets/icons/content_icon.png`),
				},
				{
					key: 2,
					tab: "Environment",
					disabled: false,
					count: this.getCountTargetingKeys("environment"),
					src: require(`@/assets/icons/environment_icon.png`),
				},
				{
					key: 3,
					tab: "Exchange",
					disabled: false,
					count: this.getCountTargetingKeys("exchange"),
					src: require(`@/assets/icons/exchange_icon.png`),
				},

				{
					key: 4,
					tab: "Geo",
					disabled: false,
					count: this.getCountTargetingKeys("geo"),
					src: require(`@/assets/icons/geo_icon.png`),
				},
				{
					key: 5,
					tab: "Platform",
					disabled: false,
					count: this.getCountTargetingKeys("platform"),
					src: require(`@/assets/icons/platform_icon.png`),
				},
				{
					key: 6,
					tab: "Time",
					disabled: false,
					count: this.getCountTargetingKeys("time"),
					src: require(`@/assets/icons/time_icon.png`),
				},
			];
		},
	},
	methods: {
		updateSelectedTabIndex(index: number) {
			this.$emit("update-selected-tab-index", index);
		},
		getCountTargetingKeys(key: any): Number {
			const tk = this.targeting[key];

			if (isEmpty(tk)) return 0;

			const values: Array<any> = Object.values(tk).filter((t: any) => {
				return !isEmpty(t.targeting_terms);
			});

			return size(values);
		},
	},
});
</script>
