<template>
	<v-container class="my-0">
		<v-layout column>
			<Buttons></Buttons>
		</v-layout>
	</v-container>
</template>

<script lang="ts">
	import Buttons from "./Buttons.vue";
	import Vue from "vue";

	export default Vue.extend({
		name: "CreativesList",
		props: {},
		components: { Buttons },
		data: () => ({
			title: "List",
		}),
		created() {},
		async mounted() {},
		computed: {},
		methods: {},
	});
</script>
