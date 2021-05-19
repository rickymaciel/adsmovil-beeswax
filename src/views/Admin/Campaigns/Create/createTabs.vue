<template>
	<v-tabs v-model="currentTab" slider-size="4" show-arrows>
		<v-tabs-slider color="secondary" size="4"></v-tabs-slider>
		<v-tab
			v-for="item in items"
			:key="item"
			class="v-tab v-tab--secondary"
			:disabled="item.toLowerCase() !== 'overview'"
		>
			{{ item }}
		</v-tab>
	</v-tabs>
</template>

<script lang="ts">
	import Vue from "vue";

	export default Vue.extend({
		name: "createTabs",
		props: {
			items: {
				type: Array,
				default: function () {
					return [];
				},
			},
			current_tab: {
				type: Number,
				default: 0,
			},
		},
		components: {},
		data: () => ({}),
		created() {},
		async mounted() {},
		computed: {
			currentTab: {
				set(val) {
					console.log("currentTab", { val: val });
					this.$emit("update-selected-tab-index", val);
				},
				get() {
					return this.current_tab;
				},
			},
		},
		methods: {},
	});
</script>
