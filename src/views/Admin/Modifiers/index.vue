<template>
	<v-layout class="d-block ma-0 pa-0">
		<v-layout class="white d-block ma-0 pa-0">
			<ModifierHeader></ModifierHeader>
		</v-layout>
		<v-layout class="d-block ma-0 pa-0 pt-lg-4">
			<router-view></router-view>
		</v-layout>
	</v-layout>
</template>

<script lang="ts">
	import ModifierHeader from "./ModifierHeader.vue";
	import Vue from "vue";

	export default Vue.extend({
		name: "Modifiers",
		props: {},
		components: { ModifierHeader },
		data: () => ({}),
		created() {},
		async mounted() {},
		computed: {},
		methods: {},
	});
</script>
