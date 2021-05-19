<template>
	<section>
		<ModelOne v-if="modelSelected == 'ModelOne'"></ModelOne>
		<ModelTwo v-else-if="modelSelected == 'ModelTwo'"></ModelTwo>
		<ModelTree v-else-if="modelSelected == 'ModelTree'"></ModelTree>
	</section>
</template>

<script lang="ts">
	import Vue from "vue";
	import { Type } from "../../../../interfaces/list";

	import ModelOne from "./modelOne.vue";
	import ModelTwo from "./modelTwo.vue";
	import ModelTree from "./modelTree.vue";

	export default Vue.extend({
		name: "CreateItem",
		props: {
			modelSelected: {
				type: String,
				default: undefined,
			},
		},
		components: { ModelOne, ModelTwo, ModelTree },
		data: () => ({
			title: "Create",
			viewModelOne: false,
			viewModelTwo: false,
			viewModelTree: false,
		}),
		created() {},
		async mounted() {},
		computed: {
			getTypes(): Type[] {
				return this.$store.state.list.types;
			},
		},
		methods: {},
	});
</script>
