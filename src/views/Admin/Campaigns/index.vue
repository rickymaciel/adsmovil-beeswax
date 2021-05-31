<template>
	<v-layout class="d-block">
		<v-layout class="white">
			<Header></Header>
		</v-layout>
		<v-layout class="grey lighten-3">
			<router-view></router-view>
		</v-layout>
	</v-layout>
</template>

<script lang="ts">
	import Header from "../Commons/Header.vue";
	import Vue from "vue";

	export default Vue.extend({
		name: "Campaigns",
		props: {},
		components: { Header },
		data: () => ({}),
		created() {},
		async mounted() {},
		computed: {},
		methods: {},
	});
</script>
