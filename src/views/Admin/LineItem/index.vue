<template>
	<v-layout class="d-block ma-0 pa-0">
		<v-layout class="white d-block ma-0 pa-0">
			<LineItemHeader></LineItemHeader>
		</v-layout>
		<v-layout class="d-block ma-0 pa-0 pt-lg-4">
			<router-view></router-view>
		</v-layout>
	</v-layout>
</template>

<script lang="ts">
	import LineItemHeader from "./LineItemHeader.vue";
	import Vue from "vue";

	export default Vue.extend({
		name: "LineItems",
		props: {},
		components: { LineItemHeader },
		data: () => ({}),
		created() {},
		async mounted() {},
		computed: {},
		methods: {},
	});
</script>