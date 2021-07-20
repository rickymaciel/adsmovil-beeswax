<template>
	<v-card color="transparent" flat>
		<CreateTabs
			:current_tab="current_tab"
			:items="items"
			:vertical="true"
			:slider_size="4"
			custom_class="v-tab--targeting v-tab--fluid v-tab--justify-start ps-3 border"
			@update-selected-tab-index="updateSelectedTabIndex"
		></CreateTabs>
	</v-card>
</template>
<script lang="ts">
	import CreateTabs from "../Create/createTabs.vue";
	import Vue from "vue";

	export default Vue.extend({
		name: "NavTargeting",
		props: {
			current_tab: {
				type: Number,
				default: 0,
			},
		},
		components: { CreateTabs },
		data: () => ({
			items: [
				{
					key: 0,
					tab: "App Site",
					disabled: false,
					src: require(`@/assets/icons/appsite_icon.png`),
				},
				{
					key: 1,
					tab: "Content",
					disabled: false,
					src: require(`@/assets/icons/content_icon.png`),
				},
				{
					key: 2,
					tab: "Environment",
					disabled: false,
					src: require(`@/assets/icons/environment_icon.png`),
				},
				{
					key: 3,
					tab: "Exchange",
					disabled: false,
					src: require(`@/assets/icons/exchange_icon.png`),
				},

				{
					key: 4,
					tab: "Geo",
					disabled: false,
					src: require(`@/assets/icons/geo_icon.png`),
				},
				{
					key: 5,
					tab: "Platform",
					disabled: false,
					src: require(`@/assets/icons/platform_icon.png`),
				},
				{
					key: 6,
					tab: "Time",
					disabled: false,
					src: require(`@/assets/icons/time_icon.png`),
				},
			],
		}),
		created() {},
		async mounted() {},
		computed: {},
		methods: {
			updateSelectedTabIndex(index: number) {
				console.log("TargetingNav::updateSelectedTabIndex", {
					index: index,
				});
				this.$emit("update-selected-tab-index", index);
			},
		},
	});
</script>
