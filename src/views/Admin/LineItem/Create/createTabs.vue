<template>
	<v-tabs
		v-model="currentTab"
		:vertical="vertical"
		:slider-size="slider_size"
		:show-arrows="true"
	>
		<v-tabs-slider :color="color" :size="slider_size"></v-tabs-slider>
		<v-tab
			v-for="(item, index) in items"
			:key="index"
			:class="custom_class"
			:disabled="item.disabled"
		>
			<v-btn v-if="item.src" icon medium>
				<img
					:lazy-src="item.src"
					:src="item.src"
					aspect-ratio="1"
					alt="Icon"
				/>
			</v-btn>
			<v-icon left v-if="item.icon" :color="color"> mdi-account </v-icon>
			{{ item.tab }}
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
			vertical: {
				type: Boolean,
				default: false,
			},
			custom_class: {
				type: String,
				default: "v-tab--targeting",
			},
			slider_size: {
				type: Number, 
				default: 4,
			},
			color: {
				type: String,
				default: "secondary",
			},
		},
		components: {},
		data: () => ({}),
		created() {},
		async mounted() {},
		computed: {
			currentTab: {
				set(val) {
					this.$emit("update-selected-tab-index", val);
				},
				get() {
					return this.current_tab;
				},
			},
		},
		methods: {
			getUrl(item: { src: String }) {
				return item.src;
			},
		},
	});
</script>
