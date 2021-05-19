<template>
	<v-layout class="d-block ma-0 pa-0">
		<v-layout class="white d-block ma-0 pa-0">
			<CreativeHeader></CreativeHeader>
		</v-layout>
		<router-view></router-view>
	</v-layout>
</template>

<script lang="ts">
	import CreativeHeader from "./CreativeHeader.vue";
	import Vue from "vue";

	export default Vue.extend({
		name: "Creatives",
		props: {},
		components: { CreativeHeader },
		data: () => ({}),
		created() {},
		async mounted() {},
		computed: {},
		methods: {},
	});
</script>
